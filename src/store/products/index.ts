// Barrel export for products module

// Types
export type {
  Product,
  PriceHistory,
  PriceAnalysis,
  ProductsState,
  CreateProductRequest,
  CreateProductWithImageRequest,
} from './types';

// Actions
export {
  createProduct,
  createProductWithImage,
  fetchUserProducts,
  fetchProductById,
  getPriceAnalysis,
  triggerPriceSearch,
  selectProduct,
  clearSelectedProduct,
  clearProductsError,
  resetProductsState,
} from './productsSlice';

// Selectors
export {
  selectAllProducts,
  selectSelectedProduct,
  selectPriceAnalysis,
  selectPriceHistory,
  selectProductsLoading,
  selectProductsUploading,
  selectProductsAnalyzing,
  selectProductsError,
  selectProductById,
  selectProductsLoaded,
  selectLowestPrice,
  selectHighestPrice,
} from './productsSelectors';

// Reducer
export { default as productsReducer } from './productsSlice';
