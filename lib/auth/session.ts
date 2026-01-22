import { User } from '../types/auth';

const USER_KEY = 'user_data';

export const sessionManager = {
  // Guardar información del usuario de sessionStorage
  setUser: (user: User): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  // Obtener información del usuario
  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userData = sessionStorage.getItem(USER_KEY);
      if (userData) {
        try {
          return JSON.parse(userData) as User;
        } catch (error) {
          console.error('Error parsing user data:', error);
          return null;
        }
      }
    }
    return null;
  },

  // Actualizar información del usuario
  updateUser: (updates: Partial<User>): void => {
    const currentuser = sessionManager.getUser();
    if (currentuser) {
      const updatedUser = { ...currentuser, ...updates };
      sessionManager.setUser(updatedUser);
    }
  },

  // Limpiar información del usuario
  clearUser: (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(USER_KEY);
    }
  },

  // Verificar si hay un usuario en sesión
  hasUser: (): boolean => {
    return sessionManager.getUser() !== null;
  },

  // Obtener un campo especifico del usuario
  getUserField: <K extends keyof User>(field: K): User[K] | null => {
    const user = sessionManager.getUser();
    return user ? user[field] : null;
  },
};
