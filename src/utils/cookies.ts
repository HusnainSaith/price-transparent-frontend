import Cookies from 'js-cookie';
import type { User } from '@/store/auth/types';

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // 7 days (matching backend JWT expiration)
  path: '/',
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
};

// Cookie keys
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

/**
 * Save authentication token to cookies
 */
export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  console.log('Setting token to localStorage:', token);
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  console.log('Token set, verifying:', localStorage.getItem(AUTH_TOKEN_KEY));
};

/**
 * Get authentication token from cookies
 */
export const getAuthToken = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  console.log('Getting token from localStorage:', token);
  return token || undefined;
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Save user data to cookies
 */
export const setAuthUser = (user: User): void => {
  Cookies.set(AUTH_USER_KEY, JSON.stringify(user), COOKIE_OPTIONS);
};

/**
 * Get user data from cookies
 */
export const getAuthUser = (): User | null => {
  const userStr = Cookies.get(AUTH_USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Remove user data from cookies
 */
export const removeAuthUser = (): void => {
  Cookies.remove(AUTH_USER_KEY, { path: '/' });
};

/**
 * Clear all auth-related data
 */
export const clearAuthCookies = (): void => {
  removeAuthToken();
  removeAuthUser();
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};

/**
 * Check if user is authenticated based on cookie presence
 */
export const hasAuthToken = (): boolean => {
  return !!getAuthToken();
};
