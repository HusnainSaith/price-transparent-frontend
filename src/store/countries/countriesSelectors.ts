import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Base selector
const selectCountriesState = (state: RootState) => state.countries;

// Memoized selectors

/**
 * Select all countries
 */
export const selectAllCountries = createSelector(
  [selectCountriesState],
  (countries) => countries.countries
);

/**
 * Select selected country
 */
export const selectSelectedCountry = createSelector(
  [selectCountriesState],
  (countries) => countries.selectedCountry
);

/**
 * Select countries loading state
 */
export const selectCountriesLoading = createSelector(
  [selectCountriesState],
  (countries) => countries.loading
);

/**
 * Select countries error
 */
export const selectCountriesError = createSelector(
  [selectCountriesState],
  (countries) => countries.error
);

/**
 * Select country by ID
 */
export const selectCountryById = (id: number) =>
  createSelector([selectAllCountries], (countries) =>
    countries.find((country) => country.id === id)
  );

/**
 * Select e-commerce stores for selected country
 */
export const selectSelectedCountryStores = createSelector(
  [selectSelectedCountry],
  (country) => country?.ecommerceStores || []
);

/**
 * Select if countries are loaded
 */
export const selectCountriesLoaded = createSelector(
  [selectAllCountries],
  (countries) => countries.length > 0
);

/**
 * Select currency for selected country
 */
export const selectSelectedCountryCurrency = createSelector(
  [selectSelectedCountry],
  (country) => country?.currency || null
);
