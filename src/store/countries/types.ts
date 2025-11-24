// Country type - matches backend entity
export interface Country {
  id: number;
  name: string;
  code: string;
  currency: string;
  ecommerceStores: string[];
}

// Countries module state
export interface CountriesState {
  countries: Country[];
  selectedCountry: Country | null;
  loading: boolean;
  error: string | null;
}
