import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_CONFIG } from '@/config/api.config';
import type { LoginCredentials, RegisterData, AuthResponse, ApiError } from './types';
import { getAuthToken } from '@/utils/cookies';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    console.log('Request token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An error occurred',
      statusCode: error.response?.status,
      error: error.response?.data?.error,
    };
    return Promise.reject(apiError);
  }
);

// Auth API functions

/**
 * Login with email and password
 */
export const loginAPI = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/login', credentials);
  console.log('Raw login API response:', response.data);
  return response.data.data || response.data;
};

/**
 * Register a new user
 */
export const registerAPI = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
  return response.data;
};

/**
 * Get current user profile (future endpoint)
 */
export const getCurrentUserAPI = async (): Promise<any> => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

/**
 * Export axios instance for use in other modules
 */
export default axiosInstance;
