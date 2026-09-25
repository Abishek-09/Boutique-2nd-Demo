import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { AdminProvider } from './admin/context/AdminContext';

// Customer Storefront Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import OffersPage from './pages/OffersPage';
import CollectionsPage from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';

// Admin Components & Pages
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
import DashboardPage from './admin/pages/DashboardPage';
import ProductsPage from './admin/pages/ProductsPage';
import OffersAdminPage from './admin/pages/OffersAdminPage';
import OrdersPage from './admin/pages/OrdersPage';
import ContentPage from './admin/pages/ContentPage';
import SubscribersPage from './admin/pages/SubscribersPage';

import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// Customer Storefront Layout Wrapper
function StorefrontLayout() {
  const { toastMessage } = useShop();

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#383028] flex flex-col selection:bg-[#C8906D] selection:text-white">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal />
      <AuthModal />

      {/* Storefront Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 sm:bottom-24 sm:right-8 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-xl bg-[#174A43] text-white shadow-2xl border border-[#DBC3A5]/40"
          >
            <div className="w-6 h-6 rounded-full bg-[#C8906D] flex items-center justify-center text-white flex-shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-sans tracking-wide font-light">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AdminProvider>
        <ShopProvider>
          <Routes>
            {/* Admin Authentication Screen */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Console Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="offers" element={<OffersAdminPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="content" element={<ContentPage />} />
                <Route path="subscribers" element={<SubscribersPage />} />
              </Route>
            </Route>

            {/* Customer Storefront Routes */}
            <Route element={<StorefrontLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
          </Routes>
        </ShopProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;
