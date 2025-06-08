import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage'));
const SearchResultsPage = React.lazy(() => import('./pages/SearchResultsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage'));
const RentalsPage = React.lazy(() => import('./pages/RentalsPage'));
const RentalDetailPage = React.lazy(() => import('./pages/RentalDetailPage'));
const ResalePage = React.lazy(() => import('./pages/ResalePage'));
const ResaleDetailPage = React.lazy(() => import('./pages/ResaleDetailPage'));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<SearchResultsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/rentals" element={<RentalsPage />} />
          <Route path="/rentals/:categoryId" element={<RentalsPage />} />
          <Route path="/rental/:rentalId" element={<RentalDetailPage />} />
          <Route path="/resale" element={<ResalePage />} />
          <Route path="/resale/:categoryId" element={<ResalePage />} />
          <Route path="/resale-item/:itemId" element={<ResaleDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;