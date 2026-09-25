import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const collectionsData = [
  {
    id: 'women',
    name: 'Women',
    fullName: "Women's Haute Couture",
    count: '48 Designs',
    description: 'Handcrafted sarees, royal lehengas, and ethereal silhouettes.',
    image: '/images/women.jpg',
    tag: 'Bestseller',
  },
  {
    id: 'men',
    name: 'Men',
    fullName: "Gentlemen's Royal Edit",
    count: '24 Designs',
    description: 'Bespoke bandhgalas, tailored achkans, and embroidered kurtas.',
    image: '/images/men.jpg',
    tag: 'New Edition',
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    fullName: 'Fine Heirloom Jewellery',
    count: '32 Masterpieces',
    description: 'Natural Colombian emeralds, polki diamonds, and 22k gold.',
    image: '/images/jewellery.jpg',
    tag: 'Handcrafted',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    fullName: 'Artisanal Accessories',
    count: '19 Curations',
    description: 'Antique zardozi clutches, pashmina stoles, and heirloom brooches.',
    image: '/images/accessories.jpg',
    tag: 'Atelier Craft',
  },
];

const Collections = ({ onSelectCategory }) => {
  return (
    <section id="collections" className="bg-[#F9F6F0] py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Title (Serif) & View All -> */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 pb-4 border-b border-[#DBC3A5]/40 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Portfolios</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#174A43] font-normal tracking-tight">
              Our Collections
            </h2>
          </div>

          <a
            href="#collections"
            className="group inline-flex items-center space-x-2 text-sm sm:text-base font-sans tracking-wider uppercase font-medium text-[#A95732] hover:text-[#174A43] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </div>

        {/* 4-Column Image Grid with scale-up hover effect & subtle dark gradient overlay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {collectionsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative cursor-pointer"
              onClick={() => onSelectCategory && onSelectCategory(item)}
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
