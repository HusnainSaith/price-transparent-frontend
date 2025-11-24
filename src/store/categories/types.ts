// Category type - matches backend entity
export interface Category {
  id: number;
  name: string;
  description: string;
  sizes: string[];
}

// Categories module state
export interface CategoriesState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
}
