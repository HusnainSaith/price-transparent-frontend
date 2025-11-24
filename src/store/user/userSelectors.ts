import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Base selector
const selectUserState = (state: RootState) => state.user;

// Memoized selectors

/**
 * Select user profile
 */
export const selectUserProfile = createSelector(
  [selectUserState],
  (user) => user.profile
);

/**
 * Select user loading state
 */
export const selectUserLoading = createSelector(
  [selectUserState],
  (user) => user.loading
);

/**
 * Select user error
 */
export const selectUserError = createSelector(
  [selectUserState],
  (user) => user.error
);

/**
 * Select user updating state
 */
export const selectUserUpdating = createSelector(
  [selectUserState],
  (user) => user.updating
);

/**
 * Select if user has a country
 */
export const selectUserHasCountry = createSelector(
  [selectUserProfile],
  (profile) => profile?.country !== null && profile?.country !== undefined
);

/**
 * Select user's country ID
 */
export const selectUserCountryId = createSelector(
  [selectUserProfile],
  (profile) => profile?.country?.id || null
);
