/**
 * Redux Auth Module Usage Example
 * 
 * This file demonstrates how to use the Redux auth module in your components.
 */

'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  loginUser,
  registerUser,
  logoutUser,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectUserFullName,
} from '@/store/auth';

export default function AuthExample() {
  const dispatch = useAppDispatch();
  
  // Selectors
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const fullName = useAppSelector(selectUserFullName);

  // Login handler
  const handleLogin = async () => {
    try {
      await dispatch(loginUser({
        email: 'test@example.com',
        password: 'password123',
      })).unwrap();
      console.log('Login successful!');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  // Register handler
  const handleRegister = async () => {
    try {
      await dispatch(registerUser({
        email: 'new@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        countryId: 1, // USA
      })).unwrap();
      console.log('Registration successful!');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  // Logout handler
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Redux Auth Example</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {isAuthenticated ? (
        <div>
          <p>Welcome, {fullName}!</p>
          <p>Email: {user?.email}</p>
          <p>Country: {user?.country?.name || 'Not selected'}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}
