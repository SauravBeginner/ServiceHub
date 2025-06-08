import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resaleCategories, mockResaleItems } from '../data/mockData';
import { ResaleItem, ResaleFilters } from '../types';
import ResaleCard from '../components/ResaleCard';
import ResaleFilterSidebar from '../components/ResaleFilterSidebar';
import CategoryGrid from '../components/CategoryGrid';
import { Filter, Grid, List } from 'lucide-react';

const ResalePage: React.FC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ResaleFilters>({
    category: categoryId || '',
    pincode: '',
    city: '',
    priceRange: [0, 50000],
    condition: '',
    sortBy: 'rating',
    verified: false,
    negotiable: false
  });

  useEffect(() => {
    if (categoryId) {
      setFilters(prev => ({ ...prev, category: categoryId }));
    }
  }, [categoryId]);

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/resale/${categoryId}`);
  };

  const filteredItems = mockResaleItems.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.pincode && item.pincode !== filters.pincode) return false;
    if (filters.city && !item.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) return false;
    if (filters.condition && item.condition !== filters.condition) return false;
    if (filters.verified && !item.verified) return false;
    if (filters.negotiable && !item.negotiable) return false;
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (!categoryId) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Buy & Sell Marketplace</h1>
            <p className="text-xl text-gray-600">Find great deals on refurbished appliances and furniture</p>
          </div>
          
          <CategoryGrid 
            categories={resaleCategories}
            onCategorySelect={handleCategorySelect}
          />

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockResaleItems.slice(0, 6).map((item) => (
                <ResaleCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categoryName = resaleCategories.find(cat => cat.id === categoryId)?.name;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {categoryName ? `${categoryName} for Sale` : 'All Items for Sale'}
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 mr-8">
            <ResaleFilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={true}
              onClose={() => {}}
              categories={resaleCategories.map(cat => cat.id)}
            />
          </div>

          {/* Mobile Sidebar */}
          <ResaleFilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            categories={resaleCategories.map(cat => cat.id)}
          />

          {/* Results */}
          <div className="flex-1">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2' 
                  : 'grid-cols-1'
              }`}>
                {filteredItems.map((item) => (
                  <ResaleCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResalePage;