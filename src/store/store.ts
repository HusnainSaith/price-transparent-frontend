import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { userReducer } from './user';
import { categoriesReducer } from './categories';
import { countriesReducer } from './countries';
import { productsReducer } from './products';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    countries: countriesReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['auth/initialize/fulfilled'],
      },
    }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
