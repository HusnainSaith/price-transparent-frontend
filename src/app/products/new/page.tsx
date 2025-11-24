'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated, selectUser } from '@/store/auth';
import { fetchCategories, selectAllCategories, selectCategoriesLoading } from '@/store/categories';
import { ArrowLeft, Upload, Package, ChevronRight, CheckCircle } from 'lucide-react';
import axiosInstance from '@/store/auth/authAPI';

export default function NewProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectAllCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    size: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [priceSearching, setPriceSearching] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    dispatch(fetchCategories());
  }, [isAuthenticated, dispatch, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const formDataToSend = new FormData();
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      if (formData.name) {
        formDataToSend.append('name', formData.name);
      }
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('size', formData.size);

      const response = await axiosInstance.post('/products/with-image', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const product = response.data.data || response.data;
      setProductId(product.id);
      setStep(4);
      
      // Start price search
      setPriceSearching(true);
      try {
        await axiosInstance.post(`/products/${product.id}/add-sample-prices`);
      } catch (err) {
        console.error('Failed to add sample prices:', err);
      }
      setPriceSearching(false);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Category', completed: !!formData.categoryId },
    { number: 2, title: 'Size', completed: !!formData.size },
    { number: 3, title: 'Product Details', completed: !!(imageFile || formData.name) },
    { number: 4, title: 'Price Search', completed: !!productId }
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary bg-dots">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
            Add New Product
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Follow the steps to add a product and get transparent pricing
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  stepItem.completed ? 'bg-green-500 border-green-500 text-white' :
                  step === stepItem.number ? 'border-brand-primary text-brand-primary' :
                  'border-gray-300 text-gray-400'
                }`}>
                  {stepItem.completed ? <CheckCircle className="w-5 h-5" /> : stepItem.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  stepItem.completed ? 'text-green-600' :
                  step === stepItem.number ? 'text-brand-primary' :
                  'text-gray-400'
                }`}>
                  {stepItem.title}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 mx-4 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl p-6 sm:p-8 shadow-card">
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/50 rounded-lg text-error text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                Select Product Category
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setFormData({ ...formData, categoryId: category.id.toString(), size: '' });
                      setStep(2);
                    }}
                    className="p-4 border border-light-border dark:border-dark-border rounded-lg hover:border-brand-primary hover:bg-brand-primary/5 transition-all text-left"
                  >
                    <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                      {category.name}
                    </h3>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      {category.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Size Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                Select Size/Variant
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.find(c => c.id === Number(formData.categoryId))?.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setFormData({ ...formData, size });
                      setStep(3);
                    }}
                    className="p-3 border border-light-border dark:border-dark-border rounded-lg hover:border-brand-primary hover:bg-brand-primary/5 transition-all text-center"
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-brand-primary hover:text-brand-hover transition-colors"
              >
                ← Back to Categories
              </button>
            </div>
          )}

          {/* Step 3: Product Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                Product Details
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                  Upload Product Image (Recommended)
                </label>
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Product preview" className="w-full h-48 object-cover rounded-lg border" />
                    <button
                      onClick={() => { setImageFile(null); setImagePreview(''); }}
                      className="absolute top-2 right-2 px-3 py-1 bg-error text-white rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-light-border dark:border-dark-border rounded-lg cursor-pointer hover:border-brand-primary transition-colors">
                    <Upload className="w-10 h-10 text-light-text-muted dark:text-dark-text-muted mb-3" />
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      Click to upload product image
                    </p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                  Product Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-light-bg-input dark:bg-dark-bg-input border border-light-border dark:border-dark-border rounded-lg"
                  placeholder="e.g., iPhone 15 Pro, Nike Air Max"
                />
                <p className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1">
                  Leave empty to let AI analyze the image
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-light-border dark:border-dark-border rounded-lg"
                >
                  ← Back
                </button>
                <button
                  onClick={handleCreateProduct}
                  disabled={loading || (!imageFile && !formData.name)}
                  className="flex-1 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Creating Product...' : 'Create & Search Prices'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Price Search Results */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                🎉 Product Created Successfully!
              </h2>
              
              {priceSearching ? (
                <div className="py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    Searching prices across e-commerce stores...
                  </p>
                </div>
              ) : (
                <div className="py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                    Your product has been created and sample prices have been added.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => router.push(`/products/${productId}`)}
                      className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-lg"
                    >
                      View Price Analysis
                    </button>
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="px-6 py-3 border border-light-border dark:border-dark-border rounded-lg"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}