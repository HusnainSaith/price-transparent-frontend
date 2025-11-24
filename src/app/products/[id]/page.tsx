'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/store/auth/authAPI';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  priceHistory: Array<{
    id: string;
    price: number;
    storeName: string;
    scrapedAt?: string;
    createdAt?: string;
  }>;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${params.id}`);
        setProduct(response.data.data || response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary p-8">
      <div className="text-light-text-primary dark:text-dark-text-primary">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary p-8">
      <div className="text-red-500">Error: {error}</div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary p-8">
      <div className="text-light-text-primary dark:text-dark-text-primary">Product not found</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
          {product.name}
        </h1>
      
        {product.imageUrl && (
          <img 
            src={product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:3002${product.imageUrl}`} 
            alt={product.name}
            className="w-64 h-64 object-cover rounded-lg mb-6"
          />
        )}
        
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
          {product.description}
        </p>
        
        <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary">
              Price History
            </h2>
            {(!product.priceHistory || product.priceHistory.length === 0) && (
              <button
                onClick={async () => {
                  try {
                    console.log('Searching prices for product:', params.id);
                    const response = await axiosInstance.post(`/products/${params.id}/add-sample-prices`);
                    console.log('Price search response:', response.data);
                    window.location.reload();
                  } catch (err: any) {
                    console.error('Failed to add sample prices:', err);
                    alert(`Failed to search prices: ${err.response?.data?.message || err.message || 'Unknown error'}`);
                  }
                }}
                className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-hover"
              >
                Search Prices
              </button>
            )}
          </div>
          
          {(product.priceHistory && product.priceHistory.length > 0) ? (
            <div className="space-y-4">
              {/* Price Summary */}
              <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">Lowest Price</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${Math.min(...product.priceHistory.map(p => Number(p.price))).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">Highest Price</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      ${Math.max(...product.priceHistory.map(p => Number(p.price))).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">Price Difference</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      ${(Math.max(...product.priceHistory.map(p => Number(p.price))) - Math.min(...product.priceHistory.map(p => Number(p.price)))).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Store Prices */}
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Note:</strong> "Buy Now" links will take you to the store's search results for this product. Look for the exact product match on the store page.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.priceHistory
                  .sort((a, b) => Number(a.price) - Number(b.price))
                  .map((price, index) => (
                  <div key={price.id} className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                    index === 0 ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 
                    'border-light-border dark:border-dark-border'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                          {price.storeName}
                        </h3>
                        {index === 0 && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Best Price
                          </span>
                        )}
                      </div>
                      <span className={`text-2xl font-bold ${
                        index === 0 ? 'text-green-600 dark:text-green-400' : 
                        'text-light-text-primary dark:text-dark-text-primary'
                      }`}>
                        ${Number(price.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-light-text-muted dark:text-dark-text-muted">
                        Updated: {new Date(price.scrapedAt || price.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                      <div className="flex flex-col items-end gap-1">
                        <a 
                          href={price.storeUrl || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-brand-primary hover:bg-brand-hover text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                        >
                          View on {price.storeName} →
                        </a>
                        <span className="text-xs text-light-text-muted dark:text-dark-text-muted">
                          {(() => {
                            try {
                              return price.storeUrl ? new URL(price.storeUrl).hostname : 'Direct link';
                            } catch {
                              return 'Store link';
                            }
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-light-text-muted dark:text-dark-text-muted mb-4">
                No price data available yet
              </p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Click "Add Sample Prices" to search prices across multiple stores
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}