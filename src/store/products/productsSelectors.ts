import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Base selector
const selectProductsState = (state: RootState) => state.products;

// Memoized selectors

/**
 * Select all products
 */
export const selectAllProducts = createSelector(
  [selectProductsState],
  (products) => products.products
);

/**
 * Select selected product
 */
export const selectSelectedProduct = createSelector(
  [selectProductsState],
  (products) => products.selectedProduct
);

/**
 * Select price analysis
 */
export const selectPriceAnalysis = createSelector(
  [selectProductsState],
  (products) => products.priceAnalysis
);

/**
 * Select price history
 */
export const selectPriceHistory = createSelector(
  [selectProductsState],
  (products) => products.priceHistory
);

/**
 * Select products loading state
 */
export const selectProductsLoading = createSelector(
  [selectProductsState],
  (products) => products.loading
);

/**
 * Select uploading state
 */
export const selectProductsUploading = createSelector(
  [selectProductsState],
  (products) => products.uploading
);

/**
 * Select analyzing state
 */
export const selectProductsAnalyzing = createSelector(
  [selectProductsState],
  (products) => products.analyzing
);

/**
 * Select products error
 */
export const selectProductsError = createSelector(
  [selectProductsState],
  (products) => products.error
);

/**
 * Select product by ID
 */
export const selectProductById = (id: string) =>
  createSelector([selectAllProducts], (products) =>
    products.find((product) => product.id === id)
  );

/**
 * Select if products are loaded
 */
export const selectProductsLoaded = createSelector(
  [selectAllProducts],
  (products) => products.length > 0
);

/**
 * Select lowest price from history
 */
export const selectLowestPrice = createSelector(
  [selectPriceHistory],
  (history) => {
    if (history.length === 0) return null;
    return Math.min(...history.map((h) => h.price));
  }
);

/**
 * Select highest price from history
 */
export const selectHighestPrice = createSelector(
  [selectPriceHistory],
  (history) => {
    if (history.length === 0) return null;
    return Math.max(...history.map((h) => h.price));
  }
);
