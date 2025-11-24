import axiosInstance from '@/store/auth/authAPI';
import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';
import type { Country } from './types';

/**
 * Get all countries (public endpoint)
 * GET /countries
 */
export const getAllCountriesAPI = async (): Promise<Country[]> => {
  const response = await axios.get(`${API_CONFIG.BASE_URL}/countries`);
  return response.data.data || response.data;
};
