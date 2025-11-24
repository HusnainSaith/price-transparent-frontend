import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfileAPI, updateUserCountryAPI } from './userAPI';
import { updateUser as updateAuthUser } from '@/store/auth';
import type { UserState } from './types';
import type { User } from '@/store/auth/types';

// Initial state
const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
  updating: false,
};

// Async Thunks

/**
 * Fetch user profile
 */
export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserProfileAPI();
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

/**
 * Update user country
 */
export const updateUserCountry = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>(
  'user/updateCountry',
  async (countryId, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateUserCountryAPI(countryId);
      
      // Update auth state as well to keep them in sync
      dispatch(updateAuthUser(response.user));
      
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update country');
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Clear error
    clearUserError: (state) => {
      state.error = null;
    },
    
    // Reset user state
    resetUserState: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      state.updating = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch User Profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      });

    // Update User Country
    builder
      .addCase(updateUserCountry.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUserCountry.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserCountry.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || 'Failed to update country';
      });
  },
});

// Export actions
export const { clearUserError, resetUserState } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
