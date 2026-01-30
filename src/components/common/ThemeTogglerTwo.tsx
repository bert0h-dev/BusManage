'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

export default function ThemeTogglerTwo() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='inline-flex size-14 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600'
    >
      <Moon size={20} className='hidden dark:block' />
      <Sun size={20} className='dark:hidden' />
    </button>
  );
}
