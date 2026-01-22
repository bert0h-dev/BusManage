import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
    <html lang='es' className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
