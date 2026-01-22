'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authService } from '@/lib/api/auth';

export default function HomePage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Verificar si ya está autenticado
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        router.push('/dashboard');
      } else {
        setIsChecking(false);
      }
    };
    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-600 to-blue-800'>
      {/* Navbar */}
      <nav className='bg-white/10 backdrop-blur-lg border-b border-white/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center gap-2'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                />
              </svg>
              <span className='text-white text-xl font-bold'>Bus Manager</span>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={() => router.push('/login')}
                className='text-white hover:text-blue-100 transition-colors'
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => router.push('/register')}
                className='bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors'
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'>
        <div className='text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
            Sistema de Gestión de
            <span className='block text-blue-200'>Autobuses Inteligente</span>
          </h1>
          <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
            Administra tu flota de autobuses, rutas, conductores y más desde una
            plataforma centralizada y fácil de usar.
          </p>
          <div className='flex gap-4 justify-center'>
            <button
              onClick={() => router.push('/register')}
              className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg'
            >
              Comenzar ahora
            </button>
            <button
              onClick={() => router.push('/login')}
              className='bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors border-2 border-white/30'
            >
              Iniciar sesión
            </button>
          </div>
        </div>

        {/* Features */}
        <div className='mt-24 grid md:grid-cols-3 gap-8'>
          <div className='bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20'>
            <div className='bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-white mb-2'>
              Gestión de Flota
            </h3>
            <p className='text-blue-100'>
              Administra todos tus autobuses, su estado, mantenimiento y
              ubicación en tiempo real.
            </p>
          </div>

          <div className='bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20'>
            <div className='bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-white mb-2'>
              Control de Rutas
            </h3>
            <p className='text-blue-100'>
              Planifica y optimiza rutas, horarios y asignaciones de manera
              eficiente.
            </p>
          </div>

          <div className='bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20'>
            <div className='bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-white mb-2'>
              Gestión de Personal
            </h3>
            <p className='text-blue-100'>
              Administra conductores, horarios, permisos y desempeño de tu
              equipo.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className='mt-24 grid md:grid-cols-4 gap-8 text-center'>
          <div>
            <div className='text-4xl font-bold text-white mb-2'>500+</div>
            <div className='text-blue-200'>Autobuses gestionados</div>
          </div>
          <div>
            <div className='text-4xl font-bold text-white mb-2'>1000+</div>
            <div className='text-blue-200'>Rutas activas</div>
          </div>
          <div>
            <div className='text-4xl font-bold text-white mb-2'>99.9%</div>
            <div className='text-blue-200'>Uptime garantizado</div>
          </div>
          <div>
            <div className='text-4xl font-bold text-white mb-2'>24/7</div>
            <div className='text-blue-200'>Soporte técnico</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-blue-900/50 backdrop-blur-lg border-t border-white/10 mt-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='text-center text-blue-200'>
            <p>&copy; 2025 Bus Manager. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
