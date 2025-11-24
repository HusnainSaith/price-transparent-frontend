import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllCategoriesAPI, getCategoryByIdAPI } from './categoriesAPI';
import type { CategoriesState, Category } from './types';

// Initial state
const initialState: CategoriesState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

// Async Thunks

/**
 * Fetch all categories
 */
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCategoriesAPI();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

/**
 * Fetch category by ID
 */
export const fetchCategoryById = createAsyncThunk<
  Category,
  number,
  { rejectValue: string }
>(
  'categories/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await getCategoryByIdAPI(id);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch category');
    }
  }
);

// Slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Select a category
    selectCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },

    // Clear selected category
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },

    // Clear error
    clearCategoriesError: (state) => {
      state.error = null;
    },

    // Reset state
    resetCategoriesState: (state) => {
      state.categories = [];
      state.selectedCategory = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch categories';
      });

    // Fetch Category By ID
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
        state.error = null;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch category';
      });
  },
});

// Export actions
export const {
  selectCategory,
  clearSelectedCategory,
  clearCategoriesError,
  resetCategoriesState,
} = categoriesSlice.actions;

// Export reducer
export default categoriesSlice.reducer;
