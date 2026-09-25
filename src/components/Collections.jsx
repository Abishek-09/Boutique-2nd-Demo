import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { collectionsList } from '../data/products';

const Collections = () => {
  const navigate = useNavigate();

  return (
    <section id="collections" className="bg-[#F9F6F0] py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Title (Serif) & View All -> */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-4 border-b border-[#DBC3A5]/40 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Portfolios</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#174A43] font-normal tracking-tight mb-4">
              Our Collections
            </h2>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center space-x-2 text-sm sm:text-base font-sans tracking-wider uppercase font-medium text-[#A95732] hover:text-[#174A43] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        {/* 4 Image Cards: Women, Men, Jewellery, Accessories */}
        {/* Action: Clicking a card navigates to /shop?category=women (filtered shop page) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {collectionsList.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative cursor-pointer"
              onClick={() => navigate(`/shop?category=${item.routeParam}`)}
            >
              {/* Card Container with smooth scale & rounded corners */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-soft group-hover:shadow-luxury transition-all duration-500 bg-[#174A43]">
                {/* Image with Framer Motion scale-up hover effect */}
                <motion.img
                  src={item.image}
                  alt={`Lumiere ${item.fullName}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Subtle dark gradient overlay at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-[#174A43]/80 backdrop-blur-md border border-[#DBC3A5]/30 text-[10px] uppercase tracking-widest text-[#DBC3A5] font-medium font-sans">
                    {item.tag}
                  </span>
                </div>

                {/* White text overlaid at the bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-white flex flex-col justify-end">
                  <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DBC3A5] mb-1 font-medium">
                    {item.count}
                  </span>
                  
                  <h3 className="font-serif text-2xl sm:text-2xl text-white font-normal tracking-wide group-hover:text-[#DBC3A5] transition-colors">
                    {item.name}
                  </h3>

                  <p className="font-sans text-xs text-white/75 mt-1 line-clamp-2 font-light opacity-90 transition-opacity">
                    {item.description}
                  </p>

                  {/* Explore button indicator */}
                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs tracking-wider uppercase font-medium text-white group-hover:text-[#DBC3A5] transition-colors">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Refined Gold Border Ring on hover */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-[#DBC3A5]/60 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Collections;
