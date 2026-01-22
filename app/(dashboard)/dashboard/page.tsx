'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api/auth';
import { User } from '@/lib/types/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-xl'>Cargando...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <h1 className='text-xl font-bold'>Sistema de Autobuses</h1>
            </div>
            <div className='flex items-center gap-4'>
              <span className='text-gray-700'>
                Hola, {user?.name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700'
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          <div className='border-4 border-dashed border-gray-200 rounded-lg h-96 p-8'>
            <h2 className='text-2xl font-bold mb-4'>Bienvenido al Dashboard</h2>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-lg font-semibold mb-2'>
                Información del Usuario
              </h3>
              <dl className='space-y-2'>
                <div>
                  <dt className='text-sm font-medium text-gray-500'>Email:</dt>
                  <dd className='text-sm text-gray-900'>{user?.email}</dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-gray-500'>Nombre:</dt>
                  <dd className='text-sm text-gray-900'>{user?.name}</dd>
                </div>
                {user?.role && (
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>Rol:</dt>
                    <dd className='text-sm text-gray-900'>{user.role}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
