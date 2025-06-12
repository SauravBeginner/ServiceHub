import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, MapPin, User } from 'lucide-react';

interface NavbarProps {
  onSearch?: (query: string) => void;
  onLocationChange?: (pincode: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onLocationChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
      if (onSearch) onSearch(searchQuery);
      if (onLocationChange && location) onLocationChange(location);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              ServiceHub
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full flex">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for services, doctors, electricians..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pincode"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-24 px-4 py-2 pl-8 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
            <Link to="/rentals" className="text-gray-700 hover:text-blue-600 transition-colors">Rentals</Link>
            <Link to="/resale" className="text-gray-700 hover:text-blue-600 transition-colors">Buy/Sell</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">Home</Link>
              <Link to="/categories" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">Services</Link>
              <Link to="/rentals" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">Rentals</Link>
              <Link to="/resale" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">Buy/Sell</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">About</Link>
              <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">Login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;