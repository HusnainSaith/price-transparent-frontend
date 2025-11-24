'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect, useRef } from 'react';
import { initializeAuth } from '@/store/auth';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      store.dispatch(initializeAuth());
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
