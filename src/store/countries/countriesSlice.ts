import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllCountriesAPI } from './countriesAPI';
import type { CountriesState, Country } from './types';

// Initial state
const initialState: CountriesState = {
  countries: [],
  selectedCountry: null,
  loading: false,
  error: null,
};

// Async Thunks

/**
 * Fetch all countries
 */
export const fetchCountries = createAsyncThunk<
  Country[],
  void,
  { rejectValue: string }
>(
  'countries/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCountriesAPI();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch countries');
    }
  }
);

// Slice
const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    // Select a country
    selectCountry: (state, action: PayloadAction<Country>) => {
      state.selectedCountry = action.payload;
    },

    // Clear selected country
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
    },

    // Clear error
    clearCountriesError: (state) => {
      state.error = null;
    },

    // Reset state
    resetCountriesState: (state) => {
      state.countries = [];
      state.selectedCountry = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Countries
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.error = null;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch countries';
      });
  },
});

// Export actions
export const {
  selectCountry,
  clearSelectedCountry,
  clearCountriesError,
  resetCountriesState,
} = countriesSlice.actions;

// Export reducer
export default countriesSlice.reducer;
