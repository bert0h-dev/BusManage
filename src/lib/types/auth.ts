export interface AuthResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isActive: Boolean;
  staff: Staff | null;
}

export interface Staff {
  exployeeNumber: string;
  role: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
