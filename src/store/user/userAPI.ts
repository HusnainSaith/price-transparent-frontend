import axiosInstance from '@/store/auth/authAPI';
import type { UserProfileResponse, UpdateCountryResponse } from './types';

/**
 * Get current user profile
 * GET /users/profile
 */
export const getUserProfileAPI = async (): Promise<UserProfileResponse> => {
  const response = await axiosInstance.get<UserProfileResponse>('/users/profile');
  return response.data;
};

/**
 * Update user's country
 * PUT /users/country
 */
export const updateUserCountryAPI = async (countryId: number): Promise<UpdateCountryResponse> => {
  const response = await axiosInstance.put<UpdateCountryResponse>('/users/country', { countryId });
  return response.data;
};
