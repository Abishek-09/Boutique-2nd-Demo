import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredItems = query.trim()
    ? products.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.fabric.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTagClick = (tagQuery) => {
    setQuery(tagQuery);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Full-Screen Backdrop & Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#174A43]/95 backdrop-blur-xl transition-all"
        />

        <div className="relative min-h-screen z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16 text-white max-w-5xl mx-auto">
          {/* Top Bar with Brand & Close Button */}
          <div className="flex items-center justify-between pb-8 border-b border-[#DBC3A5]/20">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#C8906D]" />
              <span className="font-serif text-lg tracking-[0.2em] text-[#DBC3A5] uppercase">
                LUMIÈRE ATELIER SEARCH
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-[#DBC3A5]/30 text-white transition-all transform hover:rotate-90"
              aria-label="Close search overlay"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Full-Screen Search Bar Area */}
          <div className="my-auto py-10">
            <form onSubmit={handleSearchSubmit} className="relative max-w-3xl mx-auto">
              <div className="relative flex items-center border-b-2 border-[#DBC3A5]/50 focus-within:border-[#C8906D] transition-colors pb-4">
                <Search className="w-8 h-8 text-[#C8906D] mr-4 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search silhouettes, emerald jewels, silks, brocades..."
                  autoFocus
                  className="w-full bg-transparent text-white placeholder-white/40 font-serif text-2xl sm:text-3xl md:text-4xl focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-xs uppercase tracking-widest text-[#DBC3A5] hover:text-white px-3 py-1 bg-white/10 rounded-full"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Suggestions Chips */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-sans tracking-widest text-[#DBC3A5] uppercase mr-2 font-medium">
                  Curated Searches:
                </span>
                {['Emerald Lehenga', 'Brocade Bandhgala', 'Polki Choker', 'Banarasi Saree', 'Velvet Clutch'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-[#C8906D] hover:text-white border border-[#DBC3A5]/25 text-xs text-[#DBC3A5] font-sans transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

            {/* Live Filter Results */}
            {query && (
              <div className="mt-12 max-w-3xl mx-auto">
                <div className="flex justify-between items-center text-xs font-sans text-[#DBC3A5] uppercase tracking-wider mb-4 border-b border-[#DBC3A5]/20 pb-2">
                  <span>Found {filteredItems.length} matching pieces</span>
                  {filteredItems.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
                      }}
                      className="text-[#C8906D] hover:text-white flex items-center space-x-1"
                    >
                      <span>View in Shop</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {filteredItems.length === 0 ? (
                  <div className="text-center py-12 text-[#DBC3A5]/70">
                    <p className="font-serif text-xl text-white">No heirloom pieces found</p>
                    <p className="text-xs font-sans mt-2">
                      Try searching by fabric type such as &ldquo;silk&rdquo;, &ldquo;velvet&rdquo;, or &ldquo;emerald&rdquo;.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                    {filteredItems.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex items-center space-x-4 p-3.5 rounded-xl bg-white/5 border border-[#DBC3A5]/20 hover:border-[#C8906D] transition-all group"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="text-[10px] font-sans uppercase tracking-widest text-[#C8906D]">
                            {prod.categoryName}
                          </p>
                          <h4 className="font-serif text-sm font-medium text-white line-clamp-1 group-hover:text-[#DBC3A5]">
                            {prod.name}
                          </h4>
                          <p className="text-xs font-serif font-semibold text-white mt-1">
                            ₹{prod.price.toLocaleString()}
                          </p>
                          <button
                            type="button"
                            onClick={() => addToCart(prod)}
                            className="mt-2 text-[11px] font-sans uppercase tracking-wider text-[#DBC3A5] hover:text-white flex items-center space-x-1"
                          >
                            <ShoppingBag className="w-3 h-3 text-[#A95732]" />
                            <span>Add to Bag</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Bar Help Info */}
          <div className="pt-6 border-t border-[#DBC3A5]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#DBC3A5]/70 font-sans gap-2">
            <span>Press ESC or click close to dismiss</span>
            <span>Bespoke Styling Concierge: concierge@lumiere-couture.com</span>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
