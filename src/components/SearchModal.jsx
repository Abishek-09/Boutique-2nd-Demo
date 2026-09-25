import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const searchCatalog = [
  {
    id: 1,
    name: 'The Emerald Noor Lehenga',
    category: "Women's Couture",
    price: 34500,
    image: '/images/hero.jpg',
  },
  {
    id: 2,
    name: 'Terracotta Handwoven Banarasi Saree',
    category: "Women's Couture",
    price: 18900,
    image: '/images/women.jpg',
  },
  {
    id: 3,
    name: 'Royal Emerald Silk Bandhgala',
    category: "Gentlemen's Royal Edit",
    price: 24000,
    image: '/images/men.jpg',
  },
  {
    id: 4,
    name: 'Heirloom Colombian Emerald & Polki Choker',
    category: 'Fine Heirloom Jewellery',
    price: 68000,
    image: '/images/jewellery.jpg',
  },
  {
    id: 5,
    name: 'Artisanal Zardozi Velvet Minaudière Clutch',
    category: 'Artisanal Accessories',
    price: 8500,
    image: '/images/accessories.jpg',
  },
];

const popularTags = [
  'Emerald Lehengas',
  'Raw Silk Bandhgala',
  'Polki Choker',
  'Terracotta Saree',
  'Velvet Clutches',
];

const SearchModal = ({ isOpen, onClose, onAddToCart }) => {
  const [query, setQuery] = useState('');

  const filteredItems = query.trim()
    ? searchCatalog.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20 sm:pt-28">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#174A43] border border-[#DBC3A5]/40 rounded-2xl shadow-2xl overflow-hidden text-left relative z-10"
            >
              {/* Search Bar Input */}
              <div className="p-5 sm:p-6 border-b border-[#DBC3A5]/20 flex items-center space-x-4 bg-[#123632]">
                <Search className="w-6 h-6 text-[#C8906D] flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search collections, silhouettes, jewels..."
                  autoFocus
                  className="w-full bg-transparent text-white placeholder-[#DBC3A5]/50 text-base sm:text-lg font-sans focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-lg text-[#DBC3A5] hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Popular Tags */}
              <div className="p-6 bg-[#174A43]">
                {!query && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-sans tracking-widest text-[#DBC3A5] uppercase font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#C8906D]" />
                      <span>Popular Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setQuery(tag)}
                          className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-[#DBC3A5]/25 text-xs text-[#DBC3A5] font-sans transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results List */}
                {query && (
                  <div className="space-y-3">
                    <p className="text-xs text-[#DBC3A5]/80 font-sans tracking-wide">
                      Showing results for &ldquo;{query}&rdquo; ({filteredItems.length})
                    </p>

                    {filteredItems.length === 0 ? (
                      <div className="py-8 text-center text-[#DBC3A5]/60 text-sm">
                        No heirloom pieces found matching your query.
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                        {filteredItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-[#DBC3A5]/20 transition-all"
                          >
                            <div className="flex items-center space-x-3.5">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                              <div>
                                <h4 className="font-serif text-sm font-medium text-white">
                                  {item.name}
                                </h4>
                                <p className="text-xs font-sans text-[#DBC3A5]/80">
                                  {item.category}
                                </p>
                                <p className="text-xs font-serif font-semibold text-[#C8906D] mt-0.5">
                                  ₹{item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                onAddToCart && onAddToCart(item);
                                onClose();
                              }}
                              className="px-4 py-2 rounded-lg bg-[#A95732] hover:bg-[#8f4320] text-white text-xs font-sans font-medium uppercase tracking-wider transition-colors"
                            >
                              Add to Bag
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer Note */}
              <div className="p-4 bg-[#123632] border-t border-[#DBC3A5]/20 flex justify-between items-center text-[11px] text-[#DBC3A5]/70">
                <span>Press ESC or click outside to dismiss</span>
                <span className="text-[#C8906D]">LUMIÈRE ATELIER SEARCH</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
