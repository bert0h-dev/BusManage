'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeContentType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContentType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Valida si cuenta con el tema guardado en el local storage del navegador.
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    // Si no encuentra tema guardado, revisa la preferencia del sistema o usa 'light' por defecto.
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Se inicializa el tema
    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Valida si el tema se ha inicializado para guardarlo en el local storage
    // Para igual agregar la class al documento que le corresponde
    if (isInitialized) {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, isInitialized]);

  // Funcion que permite el cambio de tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  //Se retorna el provider del tema
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
