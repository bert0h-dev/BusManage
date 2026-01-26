'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSidebar } from '@/context/SidebarContext';
import {
  Bus,
  ChartNoAxesCombined,
  MapPinned,
  Tickets,
  Users,
  Map,
  Cog,
  ChevronDown,
  GitCommitHorizontal,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; new?: boolean }[];
};

const principalItems: NavItem[] = [
  {
    icon: <ChartNoAxesCombined size={32} />,
    name: 'Dashboard',
    path: '/',
  },
];

const operationItems: NavItem[] = [
  {
    icon: <Tickets size={32} />,
    name: 'Boletos',
    subItems: [
      {
        name: 'Venta',
        path: '/boletos/venta',
      },
      {
        name: 'Consulta',
        path: '/boletos/consulta',
      },
    ],
  },
  {
    icon: <MapPinned size={32} />,
    name: 'Recorridos',
    path: '/recorridos',
  },
  {
    icon: <Bus size={32} />,
    name: 'Flota',
    path: '/flota',
  },
  {
    icon: <Users size={32} />,
    name: 'Personal',
    path: '/personal',
  },
];

const configItems: NavItem[] = [
  {
    icon: <Map size={32} />,
    name: 'Rutas',
    path: '/rutas',
  },
  {
    icon: <Cog size={32} />,
    name: 'Sistema',
    path: '/sistema',
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: 'principal' | 'operation' | 'config',
  ) => (
    <ul className='flex flex-col gap-4'>
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? 'menu-item-active'
                  : 'menu-item-inactive'
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'lg:justify-start'
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? 'menu-item-icon-active'
                    : 'menu-item-icon-inactive'
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDown
                  size={60}
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? 'rotate-180 text-brand-500'
                      : ''
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive'
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className='overflow-hidden transition-all duration-300'
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : '0px',
              }}
            >
              <ul className='mt-2 space-y-1 ml-9'>
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? 'menu-dropdown-item-active'
                          : 'menu-dropdown-item-inactive'
                      }`}
                    >
                      {subItem.name}
                      <span className='flex items-center gap-1 ml-auto'>
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'principal' | 'operation' | 'config';
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ['principal', 'operation', 'config'].forEach((menuType) => {
      const items =
        menuType === 'principal'
          ? principalItems
          : menuType === 'operation'
            ? operationItems
            : configItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as 'principal' | 'operation' | 'config',
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeight) => ({
          ...prevHeight,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: 'principal' | 'operation' | 'config',
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? 'w-72.5'
            : isHovered
              ? 'w-72.5'
              : 'w-22.5'
        }
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
        }`}
      >
        <Link href='/'>
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className='dark:hidden'
                src='/public/images/logo/logo.svg'
                alt='Logo'
                width={150}
                height={40}
              />
              <Image
                className='hidden dark:block'
                src='/public/images/logo/logo-dark.svg'
                alt='Logo'
                width={150}
                height={40}
              />
            </>
          ) : (
            <>
              <Image
                className='dark:hidden'
                src='/public/images/logo/logo-icon.svg'
                alt='Logo'
                width={32}
                height={32}
              />
              <Image
                className='hidden dark:block'
                src='/public/images/logo/logo-icon-dark.svg'
                alt='Logo'
                width={32}
                height={32}
              />
            </>
          )}
        </Link>
      </div>
      <div className='flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar'>
        <nav className='mb-6'>
          <div className='flex flex-col gap-4'>
            {/* Principal */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  'Principal'
                ) : (
                  <GitCommitHorizontal size={32} />
                )}
              </h2>
              {renderMenuItems(principalItems, 'principal')}
            </div>
            {/* Operaciones */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  'Operaciones'
                ) : (
                  <GitCommitHorizontal size={32} />
                )}
              </h2>
              {renderMenuItems(operationItems, 'operation')}
            </div>
            {/* Configuración */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  'Configuración'
                ) : (
                  <GitCommitHorizontal size={32} />
                )}
              </h2>
              {renderMenuItems(configItems, 'config')}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
