import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CollectionsPage from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';

import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

function AppContent() {
  const { toastMessage } = useShop();

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#383028] flex flex-col selection:bg-[#C8906D] selection:text-white">
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Sticky Header with navigation links and actions */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>

      {/* Footer with links and external social tabs */}
      <Footer />

      {/* Action: Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Action: Full-Screen Overlay Search Bar */}
      <SearchModal />

      {/* Action: Login / Register Modal */}
      <AuthModal />

      {/* Toast Notification for Form Submissions & Actions */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-xl bg-[#174A43] text-white shadow-2xl border border-[#DBC3A5]/40"
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
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </Router>
  );
}

export default App;
