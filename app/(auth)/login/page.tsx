'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api/auth';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formClientData, setFormClientData] = useState({
    email: '',
    password: '',
  });
  const [formAdminData, setFormAdminData] = useState({
    noEmp: '',
    password: '',
  });
  const [errorClient, setErrorClient] = useState('');
  const [errorAdmin, setErrorAdmin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('client');
  const [remember, setRemember] = useState(false);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorAdmin('');
    setIsLoading(true);

    try {
      await authService.login(formClientData);
      router.push('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al iniciar sesión';
      setErrorAdmin(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorClient('');
    setIsLoading(true);

    try {
      await authService.login(formClientData);
      router.push('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al iniciar sesión';
      setErrorClient(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminChance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormAdminData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormClientData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='m-0 min-h-screen flex font-sans'>
      <div className='grid lg:grid-cols-2 grid-cols-1 min-h-screen w-full'>
        {/* Left Side - Brand */}
        <div className='hidden lg:flex bg-gradient-to-br from-blue-800 to-blue-600 text-white flex-col justify-center items-center p-16 relative overflow-hidden'>
          <div className='relative z-10 text-center max-w-lg'>
            <div className='flex items-center justify-center gap-4 mb-8'>
              <div className='w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-5xl shadow-2xl'>
                🚌
              </div>
            </div>
            <div className='text-2xl font-bold mb-4'>Bus Manager</div>
            <div className='text-xl opacity-95 mb-12'>
              Tu viaje, nuestro camino
            </div>

            <div className='text-left flex flex-col gap-4'>
              <div className='flex items-center gap-4 text-lg'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl'>
                  ⚡
                </div>
                <span>Gestión integral de transporte</span>
              </div>

              <div className='flex items-center gap-4 text-lg'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl'>
                  📊
                </div>
                <span>Reportes en tiempo real</span>
              </div>

              <div className='flex items-center gap-4 text-lg'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl'>
                  🎫
                </div>
                <span>Venta de boletos 24/7</span>
              </div>

              <div className='flex items-center gap-4 text-lg'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl'>
                  🔒
                </div>
                <span>Seguro y confiable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className='bg-white flex flex-col justify-center p-8 lg:p-16'>
          <div className='max-w-md w-full mx-auto'>
            <div className='mb-12'>
              <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                Bienvenido
              </h1>
              <p className='text-base text-gray-500'>
                Ingresa a tu cuenta para continuar
              </p>
            </div>

            <div className='flex gap-4 mb-8 border-b-2 border-gray-200'>
              <div
                className={`tab-btn flex-1 py-4 text-center font-semibold cursor-pointer border-b-3 -mb-0.5 transition-all ${activeTab === 'client' ? 'active text-blue-600 border-blue-600' : 'text-gray-500 border-transparent'}`}
                onClick={() => switchTab('client')}
              >
                Cliente
              </div>
              <div
                className={`tab-btn flex-1 py-4 text-center font-semibold cursor-pointer border-b-3 -mb-0.5 transition-all ${activeTab === 'admin' ? 'active text-blue-600 border-blue-600' : 'text-gray-500 border-transparent'}`}
                onClick={() => switchTab('admin')}
              >
                Administrador
              </div>
            </div>

            {/* Client Login */}
            <div
              className={`tab-content ${activeTab === 'client' ? 'fade-in' : 'hidden'}`}
            >
              <form onSubmit={handleClientSubmit}>
                {errorClient && (
                  <div className='mb-6'>
                    <div className='bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded'>
                      {errorClient}
                    </div>
                  </div>
                )}

                <div className='mb-6'>
                  <label
                    htmlFor='email'
                    className='block font-semibold text-gray-700 mb-2 text-sm'
                  >
                    Email
                  </label>
                  <div className='relative'>
                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl'>
                      📧
                    </span>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      required
                      value={formClientData.email}
                      onChange={handleClientChange}
                      className='w-full py-3.5 px-4 pl-12 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-vlue-600 focus:ring-4 focus:ring-blue-100'
                      placeholder='correo@ejemplo.com'
                    />
                  </div>
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='password'
                    className='block font-semibold text-gray-700 mb-2 text-sm'
                  >
                    Contraseña
                  </label>
                  <div className='relative'>
                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl'>
                      🔑
                    </span>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      required
                      value={formClientData.password}
                      onChange={handleClientChange}
                      className='w-full py-3.5 px-4 pl-12 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-vlue-600 focus:ring-4 focus:ring-blue-100'
                      placeholder='••••••••'
                    />
                  </div>
                </div>

                <div className='flex justify-between items-center mb-8 text-sm'>
                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      id='remember'
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className='w-4.5 h-4.5 cursor-pointer'
                    />
                    <label htmlFor='remember' className='cursor-pointer'>
                      Recordarme
                    </label>
                  </div>
                  <Link
                    href='/forgot-password'
                    className='text-blue-600 font-semibold hover:underline'
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-gradient-to-br from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold text-lg cursor-pointer transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40 active:translate-y-0'
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>

                <div className='text-center mt-8 text-gray-500'>
                  ¿No tienes cuenta?{' '}
                  <Link
                    href='/register'
                    className='text-blue-600 font-semibold hover:underline'
                  >
                    Regístrate aquí
                  </Link>
                </div>
              </form>
            </div>

            {/* Admin Login */}
            <div
              className={`tab-content ${activeTab === 'admin' ? 'fade-in' : 'hidden'}`}
            >
              <form onSubmit={handleAdminSubmit}>
                {errorAdmin && (
                  <div className='mb-6'>
                    <div className='bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded'>
                      {errorAdmin}
                    </div>
                  </div>
                )}

                <div className='mb-6'>
                  <label
                    htmlFor='noEmp'
                    className='block font-semibold text-gray-700 mb-2 text-sm'
                  >
                    Número de empleado
                  </label>
                  <div className='relative'>
                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl'>
                      👤
                    </span>
                    <input
                      id='noEmp'
                      name='noEmp'
                      type='noEmp'
                      required
                      value={formAdminData.noEmp}
                      onChange={handleAdminChance}
                      className='w-full py-3.5 px-4 pl-12 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-vlue-600 focus:ring-4 focus:ring-blue-100'
                      placeholder='EMP-001'
                    />
                  </div>
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='password'
                    className='block font-semibold text-gray-700 mb-2 text-sm'
                  >
                    Contraseña
                  </label>
                  <div className='relative'>
                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl'>
                      🔑
                    </span>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      required
                      value={formAdminData.password}
                      onChange={handleAdminChance}
                      className='w-full py-3.5 px-4 pl-12 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-vlue-600 focus:ring-4 focus:ring-blue-100'
                      placeholder='••••••••'
                    />
                  </div>
                </div>

                <div className='flex justify-between items-center mb-8 text-sm'>
                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      id='remember'
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className='w-4.5 h-4.5 cursor-pointer'
                    />
                    <label htmlFor='remember' className='cursor-pointer'>
                      Recordarme
                    </label>
                  </div>
                  <Link
                    href='/remember-admin'
                    className='text-blue-600 font-semibold hover:underline'
                  >
                    Recuperar acceso
                  </Link>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-gradient-to-br from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold text-lg cursor-pointer transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40 active:translate-y-0'
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>

                <div className='text-center mt-8 text-sm'>
                  🔒 Acceso restringido solo para personal autorizado
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
