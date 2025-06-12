import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage'));
const SearchResultsPage = React.lazy(() => import('./pages/SearchResultsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const PhoneLoginPage = React.lazy(() => import('./pages/PhoneLoginPage'));
const VerifyPhonePage = React.lazy(() => import('./pages/VerifyPhonePage'));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage'));
const RentalsPage = React.lazy(() => import('./pages/RentalsPage'));
const RentalDetailPage = React.lazy(() => import('./pages/RentalDetailPage'));
const ResalePage = React.lazy(() => import('./pages/ResalePage'));
const ResaleDetailPage = React.lazy(() => import('./pages/ResaleDetailPage'));
const PostRentalPage = React.lazy(() => import('./pages/PostRentalPage'));
const PostResalePage = React.lazy(() => import('./pages/PostResalePage'));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route element={<Layout />}>
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
          {/* <Route path="/phone-login" element={<PhoneLoginPage />} />
            <Route path="//verify-phone" element={<VerifyPhonePage />} />
            <Route path="/google-login" element={<GoogleLogin />} /> */}
          <Route path="/post-rental" element={<ProtectedRoute><PostRentalPage /></ProtectedRoute>} />
          <Route path="/post-resale" element={<ProtectedRoute><PostResalePage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;