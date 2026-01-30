import LoginForm from '@/components/auth/loginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Bus Manager - Sistema de Gestión de Autobuses',
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

export default function Login() {
  return <LoginForm />;
}
