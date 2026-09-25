import React from 'react';
import { X, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const collectionDetails = {
  women: [
    {
      id: 101,
      name: 'The Emerald Noor Lehenga',
      price: 34500,
      craft: 'Mulberry silk with antique gold dabka embroidery',
      image: '/images/hero.jpg',
    },
    {
      id: 102,
      name: 'Terracotta Handwoven Banarasi Saree',
      price: 18900,
      craft: 'Pure katan silk with real zari border',
      image: '/images/women.jpg',
    },
  ],
  men: [
    {
      id: 201,
      name: 'Royal Emerald Silk Bandhgala',
      price: 24000,
      craft: 'Hand-tailored brocade with 24k gold plated buttons',
      image: '/images/men.jpg',
    },
  ],
  jewellery: [
    {
      id: 301,
      name: 'Heirloom Colombian Emerald & Polki Choker',
      price: 68000,
      craft: '22k hallmarked yellow gold with uncut diamonds & certified emeralds',
      image: '/images/jewellery.jpg',
    },
  ],
  accessories: [
    {
      id: 401,
      name: 'Artisanal Zardozi Velvet Minaudière',
      price: 8500,
      craft: 'Hand-embroidered metallic threads on forest green velvet',
      image: '/images/accessories.jpg',
    },
  ],
};

const CollectionModal = ({ selectedCategory, onClose, onAddToCart }) => {
  if (!selectedCategory) return null;

  const items = collectionDetails[selectedCategory.id] || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <div className="min-h-screen px-4 text-center flex items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-3xl bg-[#F9F6F0] rounded-2xl shadow-2xl overflow-hidden text-left relative z-10 border border-[#DBC3A5]/40"
          >
            {/* Header */}
            <div className="p-6 bg-[#174A43] text-white flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-sans tracking-widest text-[#DBC3A5] uppercase font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8906D]" />
                  <span>Curated Atelier Edit</span>
                </div>
                <h3 className="font-serif text-2xl text-white mt-1">
                  {selectedCategory.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content List */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <p className="text-sm font-sans text-[#383028]/80 leading-relaxed">
                {selectedCategory.description} Each silhouette is crafted on made-to-order basis with personalized sizing consultations available.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {items.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-xl overflow-hidden border border-[#DBC3A5]/40 shadow-sm flex flex-col group"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-serif text-base font-medium text-[#174A43]">
                          {prod.name}
                        </h4>
                        <p className="text-xs font-sans text-[#383028]/70 mt-1">
                          {prod.craft}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#DBC3A5]/20">
                        <span className="font-serif text-base font-semibold text-[#174A43]">
                          ₹{prod.price.toLocaleString()}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            onAddToCart({
                              id: prod.id,
                              name: prod.name,
                              price: prod.price,
                              category: selectedCategory.name,
                              image: prod.image,
                            });
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-[#A95732] hover:bg-[#8f4320] text-white text-xs font-sans font-medium uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-sm flex-shrink-0 whitespace-nowrap"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="whitespace-nowrap">Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#F9F6F0] border-t border-[#DBC3A5]/40 flex justify-between items-center text-xs text-[#383028]/70">
              <span>Bespoke sizing available upon request</span>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-sans uppercase tracking-widest text-[#174A43] font-semibold hover:underline"
              >
                Continue Browsing
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CollectionModal;
