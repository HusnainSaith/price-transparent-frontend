'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated, selectIsInitialized, selectUser } from '@/store/auth';
import { fetchUserProducts, selectAllProducts, selectProductsLoading } from '@/store/products';
import { Plus, Package, TrendingDown, DollarSign } from 'lucide-react';

// Skeleton Loading Component
const SkeletonCard = () => (
  <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1">
        <div className="h-4 bg-light-bg-input dark:bg-dark-bg-input rounded w-24 mb-2 shimmer" />
        <div className="h-8 bg-light-bg-input dark:bg-dark-bg-input rounded w-16 shimmer" />
      </div>
      <div className="w-12 h-12 bg-light-bg-input dark:bg-dark-bg-input rounded-lg shimmer" />
    </div>
  </div>
);

const ProductCardSkeleton = () => (
  <div className="border border-light-border dark:border-dark-border rounded-lg p-4 animate-pulse">
    <div className="h-5 bg-light-bg-input dark:bg-dark-bg-input rounded w-3/4 mb-3 shimmer" />
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-light-bg-input dark:bg-dark-bg-input rounded w-1/2 shimmer" />
      <div className="h-4 bg-light-bg-input dark:bg-dark-bg-input rounded w-1/3 shimmer" />
    </div>
    <div className="h-9 bg-light-bg-input dark:bg-dark-bg-input rounded shimmer" />
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsInitialized);
  const user = useAppSelector(selectUser);
  const products = useAppSelector(selectAllProducts);
  const loading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/login');
    }
  }, [isInitialized, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProducts());
    }
  }, [isAuthenticated, dispatch]);

  if (!isInitialized || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary bg-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Manage your products and track prices across stores
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl hover:shadow-md transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-1">
                      Total Products
                    </p>
                    <p className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
                      {products.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-brand-primary" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl hover:shadow-md transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-1">
                      Total Savings
                    </p>
                    <p className="text-3xl font-bold text-success">
                      ${Math.round(Math.random() * 500)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-success" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl hover:shadow-md transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-1">
                      Avg Price Saved
                    </p>
                    <p className="text-3xl font-bold text-brand-primary">
                      {products.length > 0 ? Math.round((Math.random() * 15) + 5) : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-brand-primary" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Products Section */}
        <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl p-6 shadow-md animate-fade-in-up animation-delay-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Your Products
            </h2>
            <Link
              href="/products/new"
              className="inline-flex items-center px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary/10 rounded-full mb-4 animate-bounce-subtle">
                <Package className="w-10 h-10 text-brand-primary" />
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-lg">
                No products yet. Start by adding your first product!
              </p>
              <Link
                href="/products/new"
                className="inline-flex items-center px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white rounded-lg transition-colors shadow-md"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="border border-light-border dark:border-dark-border rounded-lg p-4 hover:border-brand-primary transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary line-clamp-2 flex-1 group-hover:text-brand-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium">Category:</span> {product.category.name}
                    </p>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium">Size:</span> {product.size}
                    </p>
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="block text-center py-2 px-4 bg-brand-primary hover:bg-brand-hover text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    View Prices
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
