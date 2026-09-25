import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, Sparkles, Filter, X, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const categories = [
  { id: 'all', label: 'All Silhouettes' },
  { id: 'women', label: "Women's Couture" },
  { id: 'men', label: "Gentlemen's Royal Edit" },
  { id: 'jewellery', label: 'Fine Jewellery' },
  { id: 'accessories', label: 'Artisanal Accessories' },
];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { products, addToCart } = useShop();

  // Sync category if URL param changes
  React.useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchesSearch =
          !searchQuery ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'low-high') return a.price - b.price;
        if (sortBy === 'high-low') return b.price - a.price;
        return a.id - b.id;
      });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#F9F6F0] min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner / Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ATELIER ARCHIVE</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#174A43] font-normal tracking-tight mb-4">
            Curated Boutique Catalog
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#383028]/80 font-light leading-relaxed">
            Every piece is hand-selected and crafted with artisanal mastery. From royal brocades to heirloom Colombian emerald jewellery.
          </p>

          {searchQuery && (
            <div className="mt-4 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#174A43] text-white text-xs">
              <span>Search query: &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => {
                  searchParams.delete('search');
                  setSearchParams(searchParams);
                }}
                className="text-[#DBC3A5] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-8 border-b border-[#DBC3A5]/40 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
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
              <option value="featured">Atelier Curated</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-2xl border border-[#DBC3A5]/30">
            <Sparkles className="w-10 h-10 text-[#C8906D] mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-[#174A43]">No silhouettes found</h3>
            <p className="font-sans text-xs text-[#383028]/70 mt-1 max-w-sm mx-auto">
              Please try adjusting your category selection or clear your active search query.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#A95732] text-white text-xs uppercase tracking-wider font-sans font-medium"
            >
              View All Pieces
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden border border-[#DBC3A5]/40 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container with Actions */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                    {product.isNewArrival && (
                      <span className="px-2.5 py-1 rounded-md bg-[#C8906D] text-white text-[10px] font-sans font-bold uppercase tracking-widest shadow-md">
                        NEW
                      </span>
                    )}
                    {product.isOnOffer && (
                      <span className="px-2.5 py-1 rounded-md bg-[#A95732] text-white text-[10px] font-sans font-bold uppercase tracking-wider shadow-md">
                        SALE
                      </span>
                    )}
                    {!product.isNewArrival && !product.isOnOffer && product.tag && (
                      <span className="px-2.5 py-1 rounded-md bg-[#174A43]/85 backdrop-blur-md border border-[#DBC3A5]/30 text-[10px] uppercase tracking-widest text-[#DBC3A5] font-sans font-medium">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Quick Action Button */}
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="px-4 py-2 rounded-xl bg-white/95 text-[#174A43] hover:bg-[#174A43] hover:text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C8906D] font-medium">
                      {product.categoryName}
                    </span>
                    <h3 className="font-serif text-lg text-[#174A43] font-medium leading-snug mt-1 group-hover:text-[#A95732] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs font-sans text-[#383028]/70 mt-1 line-clamp-2 font-light">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DBC3A5]/25 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex flex-col min-w-0">
                      {product.isOnOffer && product.discountPrice ? (
                        <>
                          <span className="font-serif text-lg font-bold text-[#A95732] leading-none">
                            ₹{product.discountPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-[#A95732]/70 line-through font-sans mt-1">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-serif text-lg font-semibold text-[#174A43] leading-none">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-[#383028]/50 line-through font-sans mt-1">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-all duration-300 shadow-sm ring-1 ring-[#DBC3A5]/40 hover:scale-[1.02] flex-shrink-0 whitespace-nowrap"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="whitespace-nowrap">Add to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
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
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#174A43] shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="aspect-[3/4] bg-gray-100">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold">
                        {quickViewProduct.categoryName}
                      </span>
                      <h3 className="font-serif text-2xl text-[#174A43] font-normal mt-1">
                        {quickViewProduct.name}
                      </h3>
                      <p className="font-serif text-xl font-semibold text-[#A95732] mt-2">
                        ₹{quickViewProduct.price.toLocaleString()}
                      </p>

                      <p className="text-xs font-sans text-[#383028]/80 mt-4 leading-relaxed font-light">
                        {quickViewProduct.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#DBC3A5]/30 space-y-1 text-xs font-sans text-[#383028]/80">
                        <div><strong>Craft Technique:</strong> {quickViewProduct.craft}</div>
                        <div><strong>Fabric &amp; Weave:</strong> {quickViewProduct.fabric}</div>
                        <div><strong>Origin:</strong> Certified Handloom Guild, India</div>
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
                        <span>Add to Shopping Bag</span>
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

export default ShopPage;
