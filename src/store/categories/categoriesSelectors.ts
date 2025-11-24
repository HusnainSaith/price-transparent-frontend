import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Base selector
const selectCategoriesState = (state: RootState) => state.categories;

// Memoized selectors

/**
 * Select all categories
 */
export const selectAllCategories = createSelector(
  [selectCategoriesState],
  (categories) => categories.categories
);

/**
 * Select selected category
 */
export const selectSelectedCategory = createSelector(
  [selectCategoriesState],
  (categories) => categories.selectedCategory
);

/**
 * Select categories loading state
 */
export const selectCategoriesLoading = createSelector(
  [selectCategoriesState],
  (categories) => categories.loading
);

/**
 * Select categories error
 */
export const selectCategoriesError = createSelector(
  [selectCategoriesState],
  (categories) => categories.error
);

/**
 * Select category by ID
 */
export const selectCategoryById = (id: number) =>
  createSelector([selectAllCategories], (categories) =>
    categories.find((cat) => cat.id === id)
  );

/**
 * Select sizes for selected category
 */
export const selectSelectedCategorySizes = createSelector(
  [selectSelectedCategory],
  (category) => category?.sizes || []
);

/**
 * Select if categories are loaded
 */
export const selectCategoriesLoaded = createSelector(
  [selectAllCategories],
  (categories) => categories.length > 0
);
