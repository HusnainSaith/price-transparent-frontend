'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, selectAuthLoading, selectAuthError } from '@/store/auth';
import { fetchCountries, selectAllCountries, selectCountriesLoading } from '@/store/countries';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const countries = useAppSelector(selectAllCountries);
  const countriesLoading = useAppSelector(selectCountriesLoading);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    countryId: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Direct API test
    const testAPI = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/v1/countries');
        const data = await response.json();
        console.log('Direct API test:', data);
      } catch (error) {
        console.error('Direct API error:', error);
      }
    };
    testAPI();
    
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({
        ...formData,
        countryId: formData.countryId ? Number(formData.countryId) : undefined,
      })).unwrap();
      router.push('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg-primary dark:bg-dark-bg-primary px-4 py-8 sm:py-12 bg-dots">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
            TransparentPrice
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm sm:text-base">
            Create your free account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl p-6 sm:p-8 shadow-card">
          <h2 className="text-xl sm:text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
            Sign Up
          </h2>

          {error && (
            <div className="mb-6 p-3 sm:p-4 bg-error/10 border border-error/50 rounded-lg text-error text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-light-bg-input dark:bg-dark-bg-input border border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-light-bg-input dark:bg-dark-bg-input border border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="Enter your last name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-light-bg-input dark:bg-dark-bg-input border border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-light-bg-input dark:bg-dark-bg-input border border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted focus:outline-none focus:border-brand-primary transition-colors pr-12"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-light-text-muted dark:text-dark-text-muted hover:text-brand-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Country *
              </label>
              <select
                value={formData.countryId}
                onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                className="w-full px-4 py-3 bg-light-bg-input dark:bg-dark-bg-input border border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                disabled={countriesLoading}
                required
              >
                <option value="">Select a country</option>
                {(() => {
                  console.log('Countries in render:', countries, 'Type:', typeof countries, 'Array?', Array.isArray(countries));
                  console.log('Countries state keys:', countries ? Object.keys(countries) : 'null');
                  
                  // Handle if countries is nested in an object
                  const countriesArray = Array.isArray(countries) ? countries : 
                                       countries?.countries ? countries.countries :
                                       countries?.data ? countries.data : [];
                  
                  console.log('Final countries array:', countriesArray);
                  
                  return Array.isArray(countriesArray) && countriesArray.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ));
                })()}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-3.5 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Already have an account?{' '}
              <Link href="/login" className="text-brand-primary hover:text-brand-hover font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
