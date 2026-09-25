import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, Sparkles, Clock, Flame, Tag, X, ArrowRight, Percent } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const categories = [
  { id: 'all', label: 'All Promotions' },
  { id: 'women', label: "Women's Couture" },
  { id: 'men', label: "Gentlemen's Royal Edit" },
  { id: 'jewellery', label: 'Fine Jewellery' },
  { id: 'accessories', label: 'Artisanal Accessories' },
];

// Luxury Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center space-x-3 sm:space-x-4">
      {units.map((unit, idx) => (
        <div key={unit.label} className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex flex-col items-center">
            <div className="w-14 sm:w-18 h-14 sm:h-18 bg-black/40 backdrop-blur-md rounded-xl border border-[#DBC3A5]/30 flex items-center justify-center shadow-inner">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#F9F6F0]">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-sans tracking-widest text-[#DBC3A5]/80 uppercase mt-1.5 font-medium">
              {unit.label}
            </span>
          </div>
          {idx < units.length - 1 && (
            <span className="font-serif text-2xl text-[#C8906D] -mt-5 font-bold">:</span>
          )}
        </div>
      ))}
    </div>
  );
};

const OffersPage = () => {
  const { products, offerBanner, addToCart } = useShop();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('discount');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Target date for countdown (from global offer banner or fallback to 5 days ahead)
  const countdownDate = useMemo(() => {
    if (offerBanner?.endDate) {
      return new Date(offerBanner.endDate);
    }
    return new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  }, [offerBanner]);

  // Filter only products on offer
  const offerProducts = useMemo(() => {
    return products
      .filter((p) => p.isOnOffer === true)
      .filter((p) => activeCategory === 'all' || p.category === activeCategory)
      .sort((a, b) => {
        if (sortBy === 'discount') {
          const discA = a.discountPercentage || Math.round(((a.price - (a.discountPrice || a.price)) / a.price) * 100);
          const discB = b.discountPercentage || Math.round(((b.price - (b.discountPrice || b.price)) / b.price) * 100);
          return discB - discA;
        }
        if (sortBy === 'low-high') {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        }
        if (sortBy === 'high-low') {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        }
        return b.id - a.id;
      });
  }, [products, activeCategory, sortBy]);

  return (
    <div className="bg-[#F9F6F0] min-h-screen">
      {/* Hero Section: Bold, Premium Banner with Live Countdown Timer */}
      <section className="relative bg-[#123632] text-white overflow-hidden py-16 sm:py-24 border-b border-[#DBC3A5]/20">
        {/* Subtle royal pattern & radial gradient background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8906D_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#174A43] rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#A95732] rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#A95732]/25 border border-[#C8906D]/50 text-[#F9F6F0] text-[11px] font-sans tracking-[0.25em] uppercase font-semibold mb-5 shadow-lg"
          >
            <Flame className="w-4 h-4 text-[#C8906D] fill-[#C8906D]" />
            <span>
              {offerBanner?.badgeText || 'LIMITED TIME ATELIER PRIVILEGE'} &bull; UP TO 35% OFF
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white mb-4"
          >
            Limited Time: Exclusive Boutique Offers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-[#DBC3A5]/90 max-w-2xl mx-auto font-light leading-relaxed mb-8"
          >
            {offerBanner?.text
              ? offerBanner.text
              : 'Indulge in our rare seasonal curation. Handcrafted bridal couture, royal brocades, and certified precious jewellery at once-in-a-season privileges.'}
          </motion.p>

          {/* Urgency Live Countdown Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block bg-white/5 backdrop-blur-md border border-[#DBC3A5]/30 rounded-2xl p-5 sm:p-6 shadow-2xl"
          >
            <div className="flex items-center justify-center space-x-2 text-xs font-sans uppercase tracking-[0.2em] text-[#DBC3A5] font-semibold mb-3">
              <Clock className="w-4 h-4 text-[#C8906D]" />
              <span>Privilege Window Closes In</span>
            </div>
            <CountdownTimer targetDate={countdownDate} />
          </motion.div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Filter and Sort Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-8 border-b border-[#DBC3A5]/40 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#174A43] text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-[#383028]/80 border border-[#DBC3A5]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-3 self-end lg:self-center">
            <span className="text-xs uppercase tracking-wider text-[#383028]/70 font-sans font-medium">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white border border-[#DBC3A5]/40 text-xs font-sans text-[#174A43] focus:outline-none focus:ring-1 focus:ring-[#C8906D]"
            >
              <option value="discount">Highest Savings</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 4-Column Product Grid */}
        {offerProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/60 rounded-2xl border border-[#DBC3A5]/30">
            <Sparkles className="w-10 h-10 text-[#C8906D] mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-[#174A43]">No promotional items found in this section</h3>
            <p className="font-sans text-xs text-[#383028]/70 mt-1 max-w-sm mx-auto">
              Please check other categories or browse our complete atelier collection.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#A95732] text-white text-xs uppercase tracking-wider font-sans font-medium hover:bg-[#8f4320] transition-colors"
            >
              View All Offers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {offerProducts.map((product, index) => {
              const originalPrice = product.price;
              const discountPrice = product.discountPrice || originalPrice;
              const discountPercent =
                product.discountPercentage ||
                (originalPrice > discountPrice
                  ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
                  : 0);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#DBC3A5]/40 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col"
                >
                  {/* Image Container with Badges & Actions */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1.5 items-start">
                      {/* Sale Badge */}
                      <span className="px-2.5 py-1 rounded-md bg-[#A95732] text-white text-[10px] font-sans font-bold uppercase tracking-wider shadow-md">
                        {discountPercent > 0 ? `SAVE ${discountPercent}%` : 'SPECIAL OFFER'}
                      </span>

                      {product.isNewArrival && (
                        <span className="px-2 py-0.5 rounded-md bg-[#C8906D] text-white text-[9px] font-sans font-bold uppercase tracking-widest shadow-sm">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Quick View Action */}
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        type="button"
                        onClick={() => setQuickViewProduct(product)}
                        className="px-4 py-2 rounded-xl bg-white/95 text-[#174A43] hover:bg-[#174A43] hover:text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C8906D] font-medium">
                        {product.categoryName}
                      </span>
                      <h3 className="font-serif text-lg text-[#174A43] font-medium leading-snug mt-1 group-hover:text-[#A95732] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs font-sans text-[#383028]/70 mt-1 line-clamp-2 font-light">
                        {product.fabric || product.description}
                      </p>
                    </div>

                    {/* Price & Add to Bag: Original price strikethrough, discountPrice in bold Burnt Copper (#A95732) */}
                    <div className="pt-3 border-t border-[#DBC3A5]/25 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          {/* Discounted price in bold Burnt Copper */}
                          <span className="font-serif text-xl font-bold text-[#A95732]">
                            ₹{discountPrice.toLocaleString()}
                          </span>
                          {/* Original price crossed out in red/terracotta/muted */}
                          <span className="text-xs text-[#A95732]/70 line-through font-sans">
                            ₹{originalPrice.toLocaleString()}
                          </span>
                        </div>
                        {discountPercent > 0 && (
                          <span className="text-[10px] font-sans text-[#C8906D] font-medium block">
                            Flat {discountPercent}% Off Atelier Price
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-sm ring-1 ring-[#DBC3A5]/40"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <div className="min-h-screen px-4 flex items-center justify-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-[#F9F6F0] rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-[#DBC3A5]/40"
              >
                <button
                  type="button"
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#174A43] shadow-md focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="aspect-[3/4] bg-gray-100 relative">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#A95732] text-white text-[10px] font-sans font-bold uppercase tracking-wider shadow-md">
                        {quickViewProduct.discountPercentage
                          ? `${quickViewProduct.discountPercentage}% OFF`
                          : 'SPECIAL PROMOTION'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold">
                        {quickViewProduct.categoryName}
                      </span>
                      <h3 className="font-serif text-2xl text-[#174A43] font-normal mt-1">
                        {quickViewProduct.name}
                      </h3>

                      {/* Strikethrough original and bold Burnt Copper discountPrice */}
                      <div className="flex items-baseline space-x-2.5 mt-2">
                        <span className="font-serif text-2xl font-bold text-[#A95732]">
                          ₹{(quickViewProduct.discountPrice || quickViewProduct.price).toLocaleString()}
                        </span>
                        <span className="text-sm text-[#A95732]/70 line-through font-sans">
                          ₹{quickViewProduct.price.toLocaleString()}
                        </span>
                        {quickViewProduct.discountPercentage && (
                          <span className="text-xs bg-[#C8906D]/20 text-[#C8906D] px-2 py-0.5 rounded font-sans font-semibold">
                            {quickViewProduct.discountPercentage}% OFF
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-sans text-[#383028]/80 mt-4 leading-relaxed font-light">
                        {quickViewProduct.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#DBC3A5]/30 space-y-1 text-xs font-sans text-[#383028]/80">
                        {quickViewProduct.craft && (
                          <div>
                            <strong>Technique:</strong> {quickViewProduct.craft}
                          </div>
                        )}
                        {quickViewProduct.fabric && (
                          <div>
                            <strong>Fabric:</strong> {quickViewProduct.fabric}
                          </div>
                        )}
                        <div>
                          <strong>Availability:</strong> Limited Promotional Allocation
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className="w-full py-3.5 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all flex items-center justify-center space-x-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Shopping Bag (Special Privilege)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OffersPage;
