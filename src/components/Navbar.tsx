import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Home,
  Package,
  ShoppingBag,
  Grid3X3,
  Phone,
  User,
  MapPin,
  LogOut,
} from "lucide-react";
import { useFirebase } from "../context/Firebase";

interface NavbarProps {
  onSearch?: (query: string) => void;
  onLocationChange?: (pincode: string) => void;
}
const Navbar: React.FC<NavbarProps> = ({ onSearch, onLocationChange }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const locationPath = useLocation();
  const [location, setLocation] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useFirebase();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchActive(false);
    if (searchQuery.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(
          searchQuery
        )}&location=${encodeURIComponent(location)}`
      );
      if (onSearch) onSearch(searchQuery);
      if (onLocationChange && location) onLocationChange(location);
    }
  };

  const isActive = (path: string) => locationPath.pathname === path;

  const { logOut } = useFirebase();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/rentals", label: "Rentals", icon: Package },
    { path: "/resale", label: "Resale", icon: ShoppingBag },
    { path: "/categories", label: "Services", icon: Grid3X3 },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center h-16 ${
            searchActive ? "justify-center" : "justify-between"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center space-x-2 ${
              searchActive ? "hidden sm:flex" : "flex"
            }`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-900">
              ServiceHub
            </span>
          </Link>
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full flex">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for services, doctors, electricians..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchActive(true)}
                  onBlur={() => setSearchActive(false)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  // placeholder="Pincode"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-6 px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {/* Desktop Navigation */}
          {!searchActive && (
            <div className="hidden lg:flex items-center space-x-4">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Right side buttons */}
          {!searchActive && (
            <div className="hidden lg:flex items-center space-x-2">
              {!currentUser && (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
              {currentUser && (
                <>
                  <Link
                    to="/post-rental"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Post Item
                  </Link>
                  <button
                    onClick={logOut}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <LogOut />
                  </button>
                </>
              )}
            </div>
          )}
          {/* Mobile Search Bar */}
          <div className="md:hidden">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchActive(true)}
                  onBlur={() => setSearchActive(false)}
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

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/post-rental"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center mt-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Post Item
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
