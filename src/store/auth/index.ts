// Barrel export for auth module

// Types
export type {
  User,
  Country,
  AuthState,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ApiError,
} from './types';

// Actions
export {
  loginUser,
  registerUser,
  logoutUser,
  initializeAuth,
  setCredentials,
  clearCredentials,
  clearError,
  updateUser,
} from './authSlice';

// Selectors
export {
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectIsInitialized,
  selectUserCountry,
  selectUserFullName,
  selectHasCountry,
} from './authSelectors';

// Reducer
export { default as authReducer } from './authSlice';

// API
export { default as axiosInstance } from './authAPI';
