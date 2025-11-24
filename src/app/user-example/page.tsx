/**
 * Redux User Module Usage Example
 * 
 * This demonstrates how to use the user module for profile management
 */

'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchUserProfile,
  updateUserCountry,
  selectUserProfile,
  selectUserLoading,
  selectUserError,
  selectUserUpdating,
  selectUserHasCountry,
} from '@/store/user';
import { selectIsAuthenticated } from '@/store/auth';

export default function UserProfileExample() {
  const dispatch = useAppDispatch();
  
  // Selectors
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profile = useAppSelector(selectUserProfile);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);
  const updating = useAppSelector(selectUserUpdating);
  const hasCountry = useAppSelector(selectUserHasCountry);

  // Fetch profile on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch]);

  // Handler to update country
  const handleCountryChange = async (countryId: number) => {
    try {
      await dispatch(updateUserCountry(countryId)).unwrap();
      console.log('Country updated successfully!');
    } catch (err) {
      console.error('Failed to update country:', err);
    }
  };

  if (!isAuthenticated) {
    return <div className="p-8">Please log in first</div>;
  }

  if (loading) {
    return <div className="p-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      {profile && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">Profile Information</h2>
            <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Country:</strong> {profile.country?.name || 'Not set'}</p>
            <p><strong>Currency:</strong> {profile.country?.currency || 'N/A'}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-3">Update Country</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleCountryChange(1)}
                disabled={updating}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                United States
              </button>
              <button
                onClick={() => handleCountryChange(2)}
                disabled={updating}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                United Kingdom
              </button>
              <button
                onClick={() => handleCountryChange(5)}
                disabled={updating}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                India
              </button>
            </div>
            {updating && <p className="mt-2 text-gray-600">Updating...</p>}
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">Status</h2>
            <p>Has Country: {hasCountry ? '✅ Yes' : '❌ No'}</p>
            <p>Country ID: {profile.country?.id || 'None'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
