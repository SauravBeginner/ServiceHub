import React, { useState, useMemo } from 'react';
import { ServiceProvider, SearchFilters } from '../types';
import ServiceCard from './ServiceCard';
import FilterSidebar from './FilterSidebar';
import { Filter, Grid, List } from 'lucide-react';

interface ServiceListingProps {
  providers: ServiceProvider[];
  searchQuery: string;
  selectedCategory: string;
  pincode: string;
}

const ServiceListing: React.FC<ServiceListingProps> = ({
  providers,
  searchQuery,
  selectedCategory,
  pincode
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<SearchFilters>({
    category: selectedCategory,
    pincode: pincode,
    city: '',
    rating: 0,
    sortBy: 'rating',
    verified: false
  });

  const categories = Array.from(new Set(providers.map(p => p.category)));

  const filteredProviders = useMemo(() => {
    let filtered = providers.filter(provider => {
      // Search query filter
      if (searchQuery && !provider.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !provider.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !provider.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      // Category filter
      if (filters.category && provider.category !== filters.category) {
        return false;
      }

      // Pincode filter
      if (filters.pincode && provider.pincode !== filters.pincode) {
        return false;
      }

      // City filter
      if (filters.city && !provider.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }

      // Rating filter
      if (filters.rating && provider.rating < filters.rating) {
        return false;
      }

      // Verified filter
      if (filters.verified && !provider.verified) {
        return false;
      }

      return true;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [providers, searchQuery, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Services` : 'All Services'}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredProviders.length} {filteredProviders.length === 1 ? 'result' : 'results'} found
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
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={true}
            onClose={() => {}}
            categories={categories}
          />
        </div>

        {/* Mobile Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          categories={categories}
        />

        {/* Results */}
        <div className="flex-1">
          {filteredProviders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {filteredProviders.map((provider) => (
                <ServiceCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceListing;