import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ServiceListing from '../components/ServiceListing';
import { mockServiceProviders, categories } from '../data/mockData';

const SearchResultsPage: React.FC = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryId || '');

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {categoryName ? `${categoryName} Services` : searchQuery ? `Search Results for "${searchQuery}"` : 'All Services'}
        </h1>
        {location && (
          <p className="text-gray-600 mt-1">in {location}</p>
        )}
      </div>
      
      <ServiceListing
        providers={mockServiceProviders}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        pincode={location}
      />
    </div>
  );
};

export default SearchResultsPage;