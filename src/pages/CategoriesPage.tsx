import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryGrid from '../components/CategoryGrid';
import { categories } from '../data/mockData';

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Categories</h1>
          <p className="text-lg text-gray-600">Browse all available service categories</p>
        </div>
        
        <CategoryGrid 
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;