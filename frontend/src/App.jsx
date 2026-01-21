// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main App Layout
const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// App Component
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <AppLayout>
                  <Home />
                </AppLayout>
              }
            />
            <Route
              path="/products"
              element={
                <AppLayout>
                  <Products />
                </AppLayout>
              }
            />

            <Route
              path="/products/:id"
              element={
                <AppLayout>
                  <ProductDetails />
                </AppLayout>
              }
            />
            <Route
              path="/cart"
              element={
                <AppLayout>
                  <Cart />
                </AppLayout>
              }
            />
            <Route path="/login" element={<Login />} />

            {/* Protected Customer Routes */}
            <Route
              path="/customer-dashboard"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <AppLayout>
                    <CustomerDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Protected Vendor Routes */}
            <Route
              path="/vendor-dashboard"
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <AppLayout>
                    <VendorDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all - 404 */}
            <Route
              path="*"
              element={
                <AppLayout>
                  <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                      <p className="text-xl text-gray-400 mb-8">Page not found</p>
                      <a href="/" className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
                        Go Home
                      </a>
                    </div>
                  </div>
                </AppLayout>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;