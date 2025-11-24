import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Base selector
const selectAuthState = (state: RootState) => state.auth;

// Memoized selectors

/**
 * Select current user
 */
export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

/**
 * Select JWT token
 */
export const selectToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

/**
 * Select authentication status
 */
export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

/**
 * Select loading state
 */
export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

/**
 * Select error message
 */
export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

/**
 * Select initialization status
 */
export const selectIsInitialized = createSelector(
  [selectAuthState],
  (auth) => auth.isInitialized
);

/**
 * Select user's country
 */
export const selectUserCountry = createSelector(
  [selectUser],
  (user) => user?.country || null
);

/**
 * Select user's full name
 */
export const selectUserFullName = createSelector(
  [selectUser],
  (user) => user ? `${user.firstName} ${user.lastName}` : null
);

/**
 * Select whether user has selected a country
 */
export const selectHasCountry = createSelector(
  [selectUserCountry],
  (country) => country !== null
);
