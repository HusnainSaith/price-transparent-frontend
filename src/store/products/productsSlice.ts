import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  createProductAPI,
  createProductWithImageAPI,
  getUserProductsAPI,
  getProductByIdAPI,
  getPriceAnalysisAPI,
  triggerPriceSearchAPI,
} from './productsAPI';
import type {
  ProductsState,
  Product,
  CreateProductRequest,
  CreateProductWithImageRequest,
} from './types';

// Initial state
const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  priceAnalysis: null,
  priceHistory: [],
  loading: false,
  uploading: false,
  analyzing: false,
  error: null,
};

// Async Thunks

/**
 * Create product with text
 */
export const createProduct = createAsyncThunk<
  Product,
  CreateProductRequest,
  { rejectValue: string }
>(
  'products/create',
  async (data, { rejectWithValue }) => {
    try {
      return await createProductAPI(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create product');
    }
  }
);

/**
 * Create product with image
 */
export const createProductWithImage = createAsyncThunk<
  Product,
  CreateProductWithImageRequest,
  { rejectValue: string }
>(
  'products/createWithImage',
  async (data, { rejectWithValue }) => {
    try {
      return await createProductWithImageAPI(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to upload product');
    }
  }
);

/**
 * Fetch user products
 */
export const fetchUserProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserProductsAPI();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

/**
 * Fetch product by ID
 */
export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await getProductByIdAPI(id);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

/**
 * Get price analysis
 */
export const getPriceAnalysis = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  'products/getPriceAnalysis',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getPriceAnalysisAPI(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to get price analysis');
    }
  }
);

/**
 * Trigger price search
 */
export const triggerPriceSearch = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  'products/triggerPriceSearch',
  async (id, { rejectWithValue }) => {
    try {
      return await triggerPriceSearchAPI(id);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to trigger price search');
    }
  }
);

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Select product
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },

    // Clear selected product
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.priceAnalysis = null;
      state.priceHistory = [];
    },

    // Clear error
    clearProductsError: (state) => {
      state.error = null;
    },

    // Reset state
    resetProductsState: (state) => {
      state.products = [];
      state.selectedProduct = null;
      state.priceAnalysis = null;
      state.priceHistory = [];
      state.loading = false;
      state.uploading = false;
      state.analyzing = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create product';
      });

    // Create Product With Image
    builder
      .addCase(createProductWithImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(createProductWithImage.fulfilled, (state, action) => {
        state.uploading = false;
        state.products.unshift(action.payload);
        state.error = null;
      })
      .addCase(createProductWithImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload || 'Failed to upload product';
      });

    // Fetch User Products
    builder
      .addCase(fetchUserProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });

    // Fetch Product By ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch product';
      });

    // Get Price Analysis
    builder
      .addCase(getPriceAnalysis.pending, (state) => {
        state.analyzing = true;
        state.error = null;
      })
      .addCase(getPriceAnalysis.fulfilled, (state, action) => {
        state.analyzing = false;
        state.priceAnalysis = action.payload.priceAnalysis;
        state.priceHistory = action.payload.priceHistory;
        state.error = null;
      })
      .addCase(getPriceAnalysis.rejected, (state, action) => {
        state.analyzing = false;
        state.error = action.payload || 'Failed to get price analysis';
      });

    // Trigger Price Search
    builder
      .addCase(triggerPriceSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(triggerPriceSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.priceHistory = action.payload;
        state.error = null;
      })
      .addCase(triggerPriceSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to trigger price search';
      });
  },
});

// Export actions
export const {
  selectProduct,
  clearSelectedProduct,
  clearProductsError,
  resetProductsState,
} = productsSlice.actions;

// Export reducer
export default productsSlice.reducer;
