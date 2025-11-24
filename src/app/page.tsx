'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/auth';
import { ArrowRight, Shield, DollarSign, TrendingDown, Search, Eye, Package } from 'lucide-react';

export default function HomePage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-light-text-primary dark:text-dark-text-primary">
              Discover{' '}
              <span className="text-brand-primary">Transparent</span>
              <br className="hidden sm:block" />
              Product Prices
            </h1>
            
            <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-10">
              Compare prices across top e-commerce stores instantly. Get AI-powered insights and never overpay again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-brand-primary hover:bg-brand-hover rounded-lg transition-colors shadow-md"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-light-text-primary dark:text-dark-text-primary bg-light-bg-card dark:bg-dark-bg-card dark:border-dark-border hover:bg-blue-600 rounded-lg transition-colors shadow-md"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-light-text-primary dark:text-dark-text-primary bg-light-bg-card dark:bg-dark-bg-card dark:border-dark-border hover:bg-blue-600 rounded-lg transition-colors shadow-md"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              Why Choose TransparentPrice?
            </h2>
            <p className="text-base sm:text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Powered by AI and real-time data from the world's leading e-commerce platforms
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card rounded-xl border border-light-border dark:border-dark-border hover:border-brand-primary transition-colors shadow-card">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Smart Search
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Upload product images or enter names. Our AI finds the best matches across multiple stores.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card rounded-xl border border-light-border dark:border-dark-border hover:border-brand-primary transition-colors shadow-card">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Real-Time Prices
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Get up-to-date pricing from Amazon, Walmart, Flipkart, and more. All in one place.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card rounded-xl border border-light-border dark:border-dark-border hover:border-brand-primary transition-colors shadow-card">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Best Deals
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                AI-powered analysis identifies the lowest prices and best value recommendations instantly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card rounded-xl border border-light-border dark:border-dark-border hover:border-brand-primary transition-colors shadow-card">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Trusted Data
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Verified pricing from official sources. No hidden fees or misleading information.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card rounded-xl border border-light-border dark:border-dark-border hover:border-brand-primary transition-colors shadow-card">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Full Transparency
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                See complete price comparisons, availability, and store ratings side-by-side.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card rounded-xl border border-light-border dark:border-dark-border hover:border-brand-primary transition-colors shadow-card">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Easy Integration
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Simple workflow: select country, choose category, upload product, get prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-brand-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Saving Money?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            Join thousands of smart shoppers who compare prices before they buy.
          </p>
          {!isAuthenticated && (
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-brand-primary  hover:bg-blue-600 rounded-lg transition-colors shadow-lg"
            >
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
