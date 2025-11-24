// TypeScript types and interfaces for Auth module

export interface Country {
  id: number;
  name: string;
  code: string;
  currency: string;
  ecommerceStores?: string[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country: Country | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  countryId?: number;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}
