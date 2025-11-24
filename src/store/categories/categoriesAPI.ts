import axiosInstance from '@/store/auth/authAPI';
import type { Category } from './types';

/**
 * Get all categories
 * GET /categories
 */
export const getAllCategoriesAPI = async (): Promise<Category[]> => {
  const response = await axiosInstance.get('/categories');
  return response.data.data || response.data;
};

/**
 * Get category by ID
 * GET /categories/:id
 */
export const getCategoryByIdAPI = async (id: number): Promise<Category> => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data.data || response.data;
};
