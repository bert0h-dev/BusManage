'use client';

import { ChevronDown, CircleUserRound, DoorOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className='relative'>
      <button
        onClick={toggleDropdown}
        className='flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle'
      >
        <span className='mr-3 overflow-hidden rounded-full h-11 w-11'>
          <Image
            width={44}
            height={44}
            src='/images/user/owner.jpg'
            alt='User'
          />
        </span>

        <span className='block mr-1 font-medium text-theme-sm'>Usuario</span>

        <ChevronDown
          size={20}
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className='absolute right-0 mt-4.25 flex w-65 flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark'
      >
        {/* Información del usuario */}
        <div>
          <span className='block font-medium text-gray-700 text-theme-sm dark:text-gray-400'>
            Usuario
          </span>
          <span className='mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400'>
            usuario@correo.com
          </span>
        </div>

        {/* Submenu de usuario */}
        <ul className='flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800'>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag='a'
              href='/profile'
              className='flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'
            >
              <CircleUserRound size={24} />
              Editar perfil
            </DropdownItem>
          </li>
        </ul>

        {/* Logout */}
        <Link
          href='/signin'
          className='flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'
        >
          <DoorOpen size={24} />
          Sign out
        </Link>
      </Dropdown>
    </div>
  );
}
