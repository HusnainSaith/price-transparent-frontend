/**
 * Categories Module Usage Example
 */

'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchCategories,
  selectCategory,
  selectAllCategories,
  selectSelectedCategory,
  selectCategoriesLoading,
  selectSelectedCategorySizes,
} from '@/store/categories';

export default function CategoriesExample() {
  const dispatch = useAppDispatch();
  
  const categories = useAppSelector(selectAllCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const loading = useAppSelector(selectCategoriesLoading);
  const sizes = useAppSelector(selectSelectedCategorySizes);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelectCategory = (category: any) => {
    dispatch(selectCategory(category));
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Product Categories</h1>
      
      {loading && <p>Loading categories...</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleSelectCategory(category)}
            className={`p-4 border rounded-lg cursor-pointer transition ${
              selectedCategory?.id === category.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{category.description}</p>
            <p className="text-xs text-gray-500">
              {category.sizes.length} sizes available
            </p>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            Selected: {selectedCategory.name}
          </h2>
          <p className="mb-4">{selectedCategory.description}</p>
          <div>
            <h3 className="font-semibold mb-2">Available Sizes:</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
