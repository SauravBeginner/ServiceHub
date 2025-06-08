import React from 'react';
import { Filter, X } from 'lucide-react';
import { RentalFilters } from '../types';

interface RentalFilterSidebarProps {
  filters: RentalFilters;
  onFiltersChange: (filters: RentalFilters) => void;
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
}

const RentalFilterSidebar: React.FC<RentalFilterSidebarProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onClose,
  categories
}) => {
  const handleFilterChange = (key: keyof RentalFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed lg:relative top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </h3>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.replace('-rental', '').replace('-', ' ').charAt(0).toUpperCase() + category.replace('-rental', '').replace('-', ' ').slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={filters.pincode}
                onChange={(e) => handleFilterChange('pincode', e.target.value)}
                placeholder="Enter pincode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                placeholder="Enter city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rent Range
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <select
                value={filters.condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            {/* Verified Filter */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.verified}
                  onChange={(e) => handleFilterChange('verified', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Verified Owners Only</span>
              </label>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalFilterSidebar;