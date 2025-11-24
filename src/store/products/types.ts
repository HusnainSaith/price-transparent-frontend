import type { Category } from '@/store/categories/types';

// Product type
export interface Product {
  id: string;
  name: string;
  imageUrl: string | null;
  size: string;
  category: Category;
  createdAt: string;
}

// Price History
export interface PriceHistory {
  id: string;
  storeName: string;
  storeUrl: string;
  price: number;
  currency: string;
  isAvailable: boolean;
  scannedAt: string;
}

// Price Analysis
export interface PriceAnalysis {
  averagePrice: number;
  lowestPrice: number;
  highestPrice: number;
  priceVariation: number;
  recommendation: string;
}

// Products state
export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  priceAnalysis: PriceAnalysis | null;
  priceHistory: PriceHistory[];
  loading: boolean;
  uploading: boolean;
  analyzing: boolean;
  error: string | null;
}

// Create product request
export interface CreateProductRequest {
  name: string;
  size: string;
  categoryId: number;
}

// Create product with image request
export interface CreateProductWithImageRequest {
  image: File;
  size: string;
  categoryId: number;
  name?: string;
}
