import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Bus Manager - Sistema de Gestión de Autobuses',
  description:
    'Administra tu flota de autobuses, rutas, conductores y más desde una plataforma centralizada.',
  keywords: ['autobuses', 'gestión', 'transporte', 'rutas', 'conductores'],
  authors: [{ name: 'Bus Manager Team' }],
  openGraph: {
    title: 'Bus Manager - Sistema de Gestión de Autobuses',
    description: 'Administra tu flota de autobuses, rutas y conductores.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${inter.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
