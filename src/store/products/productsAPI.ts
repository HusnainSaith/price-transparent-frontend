import axiosInstance from '@/store/auth/authAPI';
import type { 
  Product, 
  CreateProductRequest, 
  CreateProductWithImageRequest,
  PriceHistory 
} from './types';

/**
 * Create product with text
 * POST /products
 */
export const createProductAPI = async (data: CreateProductRequest): Promise<Product> => {
  const response = await axiosInstance.post('/products', data);
  return response.data.data || response.data;
};

/**
 * Create product with image
 * POST /products/with-image
 */
export const createProductWithImageAPI = async (
  data: CreateProductWithImageRequest
): Promise<Product> => {
  const formData = new FormData();
  formData.append('image', data.image);
  formData.append('size', data.size);
  formData.append('categoryId', data.categoryId.toString());
  if (data.name) {
    formData.append('name', data.name);
  }

  const response = await axiosInstance.post('/products/with-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data || response.data;
};

/**
 * Get all user products
 * GET /products
 */
export const getUserProductsAPI = async (): Promise<Product[]> => {
  const response = await axiosInstance.get('/products');
  return response.data.data || response.data;
};

/**
 * Get product by ID
 * GET /products/:id
 */
export const getProductByIdAPI = async (id: string): Promise<Product> => {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return response.data.data || response.data;
};

/**
 * Delete product by ID
 * DELETE /products/:id
 */
export const deleteProductAPI = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};

/**
 * Get price analysis
 * GET /products/:id/price-analysis
 */
export const getPriceAnalysisAPI = async (id: string): Promise<any> => {
  const response = await axiosInstance.get(`/products/${id}/price-analysis`);
  return response.data;
};

/**
 * Trigger price search
 * POST /products/:id/search-prices
 */
export const triggerPriceSearchAPI = async (id: string): Promise<PriceHistory[]> => {
  const response = await axiosInstance.post<PriceHistory[]>(`/products/${id}/search-prices`);
  return response.data;
};
