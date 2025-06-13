import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const CategoriesPage = React.lazy(() => import("./pages/CategoriesPage"));
const SearchResultsPage = React.lazy(() => import("./pages/SearchResultsPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const ServiceDetailPage = React.lazy(() => import("./pages/ServiceDetailPage"));
const RentalsPage = React.lazy(() => import("./pages/RentalsPage"));
const RentalDetailPage = React.lazy(() => import("./pages/RentalDetailPage"));
const ResalePage = React.lazy(() => import("./pages/ResalePage"));
const ResaleDetailPage = React.lazy(() => import("./pages/ResaleDetailPage"));
const PostRentalPage = React.lazy(() => import("./pages/PostRentalPage"));
const PostResalePage = React.lazy(() => import("./pages/PostResalePage"));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route element={<Layout />}>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route
            path="/categories/:categoryId"
            element={<SearchResultsPage />}
          />
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

          {/* Public Route (only if NOT logged in) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected Route (only if logged in) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/post-rental" element={<PostRentalPage />} />
            <Route path="/post-resale" element={<PostResalePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
