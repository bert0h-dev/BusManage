import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenManager = {
  // Guardar tokens
  setTokens: (accessToken: string, refreshToken: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      expires: 1 / 24, // 1 Hora
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      expires: 7, // 7 días
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  },

  // Obtener access token
  getAccessToken: (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  // Obtener refresh token
  getRefreshToken: (): string | undefined => {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  // Actualizar solo el access token
  setAccessToken: (accessToken: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      expires: 1 / 24, // 1 Hora
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  },

  // Limpiar todos los tokens
  clearTokens: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },

  // Verificar si hay sesión activa
  hasValidSession: (): boolean => {
    return !!Cookies.get(ACCESS_TOKEN_KEY) || !!Cookies.get(REFRESH_TOKEN_KEY);
  },
};
