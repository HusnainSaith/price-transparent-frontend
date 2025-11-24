import type { User } from '@/store/auth/types';

// User module state
export interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
}

// API Request types
export interface UpdateCountryRequest {
  countryId: number;
}

// API Response types
export interface UserProfileResponse {
  user: User;
}

export interface UpdateCountryResponse {
  user: User;
}
