import { api } from './axios';
import { tokenManager } from '../auth/token';
import { sessionManager } from '../auth/session';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
} from '../types/auth';
import { use } from 'react';

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const dataResponse: AuthResponse = response.data;
    const { accessToken, refreshToken, user } = dataResponse.data;

    // Guardar tokens y usuario
    tokenManager.setTokens(accessToken, refreshToken);
    sessionManager.setUser(user);

    return dataResponse;
  },

  // Register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    const dataResponse: AuthResponse = response.data;
    const { accessToken, refreshToken, user } = dataResponse.data;

    // Guardar tokens y usuario
    tokenManager.setTokens(accessToken, refreshToken);
    sessionManager.setUser(user);

    return dataResponse;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Siempre termina limpiando los tokens locales y datos del usuario
      tokenManager.clearTokens();
      sessionManager.clearUser();
    }
  },

  // Obtener usuario actual
  getCurrentUser: async (): Promise<User> => {
    // Primero intentar obtener del sessionStorage
    const cachedUser = sessionManager.getUser();
    if (cachedUser) {
      return cachedUser;
    }

    // Si no está en caché, hacer petición al servidor
    const response = await api.get<User>('/auth/me');
    const user = response.data;

    // Guardar en sessionStorage para futuras consultas
    sessionManager.setUser(user);

    return user;
  },

  // Verificar si esta autenticado
  isAuthenticated: (): boolean => {
    return tokenManager.hasValidSession();
  },
};
