/**
 * Countries Module Usage Example
 */

'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchCountries,
  selectCountry,
  selectAllCountries,
  selectSelectedCountry,
  selectCountriesLoading,
  selectSelectedCountryStores,
  selectSelectedCountryCurrency,
} from '@/store/countries';

export default function CountriesExample() {
  const dispatch = useAppDispatch();
  
  const countries = useAppSelector(selectAllCountries);
  const selectedCountry = useAppSelector(selectSelectedCountry);
  const loading = useAppSelector(selectCountriesLoading);
  const stores = useAppSelector(selectSelectedCountryStores);
  const currency = useAppSelector(selectSelectedCountryCurrency);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Countries & E-commerce Stores</h1>
      
      {loading && <p>Loading countries...</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {countries.map((country) => (
          <div
            key={country.id}
            onClick={() => dispatch(selectCountry(country))}
            className={`p-4 border rounded-lg cursor-pointer transition ${
              selectedCountry?.id === country.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{country.name}</h3>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">{country.code}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Currency: {country.currency}</p>
            <p className="text-xs text-gray-500">
              {country.ecommerceStores.length} stores available
            </p>
          </div>
        ))}
      </div>

      {selectedCountry && (
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            🌍 {selectedCountry.name} ({selectedCountry.code})
          </h2>
          <p className="mb-4">💰 Currency: <strong>{currency}</strong></p>
          
          <div>
            <h3 className="font-semibold mb-3">🛒 E-commerce Stores ({stores.length}):</h3>
            <div className="grid grid-cols-2 gap-2">
              {stores.map((store, index) => (
                <div
                  key={index}
                  className="p-2 bg-white rounded border border-gray-200"
                >
                  <p className="text-sm font-mono">{store}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
