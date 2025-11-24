// Barrel export for categories module

// Types
export type { Category, CategoriesState } from './types';

// Actions
export {
  fetchCategories,
  fetchCategoryById,
  selectCategory,
  clearSelectedCategory,
  clearCategoriesError,
  resetCategoriesState,
} from './categoriesSlice';

// Selectors
export {
  selectAllCategories,
  selectSelectedCategory,
  selectCategoriesLoading,
  selectCategoriesError,
  selectCategoryById,
  selectSelectedCategorySizes,
  selectCategoriesLoaded,
} from './categoriesSelectors';

// Reducer
export { default as categoriesReducer } from './categoriesSlice';
