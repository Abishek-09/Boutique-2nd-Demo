import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    tag: 'NEW ARRIVALS',
    title: 'Timeless Styles for Every You',
    description: 'Discover handcrafted elegance, designed for modern living. Immerse yourself in the poetry of pure raw silks, exquisite zari embellishments, and artisanal silhouettes.',
    badge: 'Artisanal Hand-Loomed Silk',
    accent: '#C8906D',
  },
  {
    id: 2,
    tag: 'THE HERITAGE EDIT',
    title: 'The Royal Emerald Couturier',
    description: 'A celebration of ancestral craftsmanship and majestic emerald tones, meticulously tailored for life’s most cherished celebrations.',
    badge: 'Limited Atelier Edition',
    accent: '#174A43',
  },
  {
    id: 3,
    tag: 'FESTIVE COUTURE 2024',
    title: 'Poetry in Golden Threads',
    description: 'Where traditional hand-embroidery converges with contemporary drapery, creating modern heirlooms meant to be treasured for generations.',
    badge: 'Bespoke Heirloom Craft',
    accent: '#A95732',
  },
];

const Hero = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Auto-advance slide smoothly every 7s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#F9F6F0]">
      <div className="w-full">
        {/* Split Layout: Left side Warm Gradient, Right side Lifestyle Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[720px] items-stretch">
          
          {/* Left Column: Warm Gradient Background (Terracotta to Champagne) */}
          <div className="lg:col-span-6 relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 xl:p-20 bg-gradient-to-br from-[#C8906D] via-[#D3A889] to-[#DBC3A5] text-[#383028] shadow-inner overflow-hidden">
            
            {/* Subtle luxury ambient pattern overlay */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #383028 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}
            />

            {/* Top decorative badge */}
            <div className="relative z-10">
              <motion.div
                key={`tag-${slide.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-[#383028] shadow-sm mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#174A43]" />
                <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase">
                  {slide.tag}
                </span>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 my-auto py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${slide.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#123632] leading-[1.15] font-normal tracking-tight">
                    {slide.title}
                  </h1>

                  <p className="font-sans text-base sm:text-lg text-[#383028]/85 max-w-lg leading-relaxed font-light">
                    {slide.description}
                  </p>

                  {/* CTA Button with Burnt Copper & subtle gold/copper border line */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={onShopNow}
                      className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-[#A95732] hover:bg-[#914624] text-white font-sans text-sm tracking-wider uppercase font-medium shadow-copper transition-all duration-300 transform hover:-translate-y-0.5 ring-1 ring-[#DBC3A5]/60 hover:ring-[#F9F6F0] focus:outline-none"
                    >
                      <span>Shop Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>

                    <a
                      href="#collections"
                      className="inline-flex items-center space-x-2 text-sm uppercase tracking-wider font-medium text-[#174A43] hover:text-[#123632] px-4 py-3 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <span>View Lookbook</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Row: Carousel Dots */}
            <div className="relative z-10 pt-6 flex items-center justify-between border-t border-[#383028]/15 mt-4">
              <div className="flex items-center space-x-3">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full focus:outline-none ${
                      currentSlide === idx
                        ? 'w-8 h-2.5 bg-[#174A43]'
                        : 'w-2.5 h-2.5 bg-[#383028]/35 hover:bg-[#383028]/60'
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs font-sans tracking-widest text-[#383028]/70 uppercase">
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Right Column: Large Lifestyle Image of Woman in Emerald Ethnic Wear */}
          <div className="lg:col-span-6 relative min-h-[460px] sm:min-h-[540px] lg:min-h-[auto] bg-[#174A43] overflow-hidden group">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <img
                src="/images/hero.jpg"
                alt="Lumiere Haute Couture Model in Royal Emerald Green Ethnic Ensemble"
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Refined gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#174A43]/70 via-transparent to-black/20" />
            </motion.div>

            {/* Floating Luxury Detail Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-6 right-6 z-20"
            >
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                aria-label="Add to wishlist"
                className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#174A43] shadow-lg hover:scale-110 transition-transform"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#A95732] text-[#A95732]' : 'stroke-[1.75]'}`} />
              </button>
            </motion.div>

            {/* Bottom floating informational card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-auto sm:max-w-xs z-20 p-4 rounded-xl bg-[#174A43]/85 backdrop-blur-md border border-[#DBC3A5]/30 text-white shadow-luxury"
            >
              <div className="flex items-center space-x-2 text-[10px] text-[#DBC3A5] font-sans tracking-widest uppercase mb-1">
                <Shield className="w-3.5 h-3.5 text-[#C8906D]" />
                <span>Atelier Masterpiece</span>
              </div>
              <h4 className="font-serif text-base font-normal tracking-wide text-white">
                The Emerald Noor Lehenga
              </h4>
              <p className="text-xs text-[#DBC3A5]/80 font-sans mt-0.5">
                Pure mulberry silk with antique dabka &amp; marodi needlework.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
