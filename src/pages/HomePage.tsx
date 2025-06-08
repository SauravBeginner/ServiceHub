import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryGrid from '../components/CategoryGrid';
import { categories, rentalCategories, resaleCategories } from '../data/mockData';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleRentalCategorySelect = (categoryId: string) => {
    navigate(`/rentals/${categoryId}`);
  };

  const handleResaleCategorySelect = (categoryId: string) => {
    navigate(`/resale/${categoryId}`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Local Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Connect with trusted professionals in your area
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="What service do you need?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
              />
              <button 
                onClick={() => handleSearch(searchQuery)}
                className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Search Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <CategoryGrid 
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />

      {/* Rental Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Rental Services</h2>
            <p className="text-lg text-gray-600">Rent appliances and furniture at affordable rates</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {rentalCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleRentalCategorySelect(category.id)}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-green-200"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-green-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/rentals')}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              View All Rentals
            </button>
          </div>
        </div>
      </div>

      {/* Resale Marketplace Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Buy & Sell Marketplace</h2>
            <p className="text-lg text-gray-600">Find great deals on refurbished appliances and furniture</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {resaleCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleResaleCategorySelect(category.id)}
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-purple-200"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/resale')}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              View All Items
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ServiceHub?</h2>
            <p className="text-lg text-gray-600">We make finding reliable services simple and trustworthy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">Find services by category, location, or specific needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">All service providers are verified and rated by customers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Connect</h3>
              <p className="text-gray-600">Connect instantly with service providers via call or email</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;