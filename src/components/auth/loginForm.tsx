'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/lib/api/auth';
import {
  LoginSchema,
  defaultLoginValues,
  type LoginSchemaType,
} from '@/schema/LoginSchema';
import { DynamicIcon } from 'lucide-react/dynamic';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Checkbox from '@/components/form/input/Checkbox';
import Button from '@/components/ui/button/Button';

export default function LoginForm() {
  const router = useRouter();
  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultLoginValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginSchemaType) => {
    setError('');
    setIsLoading(true);

    try {
      await authService.login(data);
      router.push('/');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al iniciar sesión.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col flex-1 lg:w-1/2 w-full'>
      <div className='flex flex-col justify-center flex-1 w-full max-w-md mx-auto'>
        <div>
          <div className='mb-5 sm:mb-8'>
            <h1 className='mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md'>
              Bienvenido
            </h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Ingresa a tu cuenta para continuar
            </p>
          </div>
        </div>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-6'>
                {/* Número de empleado o correo */}
                <div>
                  <Label>
                    Número de empleado o correo{' '}
                    <span className='text-error-500'>*</span>{' '}
                  </Label>
                  <div className='relative'>
                    <Input
                      type='email'
                      placeholder='EMP-001'
                      className='pl-15.5'
                    />
                    <span className='absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400'>
                      <DynamicIcon name='user' size={24} />
                    </span>
                  </div>
                </div>
                {/* Contraseña */}
                <div>
                  <Label>
                    Contraseña <span className='text-error-500'>*</span>{' '}
                  </Label>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Contraseña'
                      className='pl-15.5'
                    />
                    <span className='absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400'>
                      <DynamicIcon name='key-round' size={24} />
                    </span>
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2'
                    >
                      {showPassword ? (
                        <DynamicIcon name='eye' size={24} />
                      ) : (
                        <DynamicIcon name='eye-off' size={24} />
                      )}
                    </span>
                  </div>
                </div>
                {/* Recordar y Recordar contraseña */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className='block font-normal text-gray-700 text-theme-sm dark:text-gray-400'>
                      Recordarme
                    </span>
                  </div>
                  <Link
                    href='/reset-password'
                    className='text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400'
                  >
                    Recuperar acceso
                  </Link>
                </div>
                {/* Boton de inicio de sesión */}
                <div>
                  <Button className='w-full' size='sm' disabled={isLoading}>
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
