import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesBar from './components/FeaturesBar';
import Collections from './components/Collections';
import OurStory from './components/OurStory';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import CollectionModal from './components/CollectionModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Initial cart items for a premium demonstration
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'The Emerald Noor Lehenga',
      category: "Women's Couture",
      price: 34500,
      quantity: 1,
      image: '/images/hero.jpg',
    },
    {
      id: 5,
      name: 'Artisanal Zardozi Velvet Minaudière Clutch',
      category: 'Artisanal Accessories',
      price: 8500,
      quantity: 1,
      image: '/images/accessories.jpg',
    },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from shopping bag.');
  };

  const handleShopNow = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#383028] flex flex-col selection:bg-[#C8906D] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
      />

      {/* Hero Section */}
      <main className="flex-grow">
        <Hero onShopNow={handleShopNow} />

        {/* Features Trust Bar */}
        <FeaturesBar />

        {/* Collections Section */}
        <Collections onSelectCategory={(cat) => setSelectedCategory(cat)} />

        {/* Our Story Split Section */}
        <OurStory />

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Cart Slide-Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Collection Details Modal */}
      <CollectionModal
        selectedCategory={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
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

export default App;
