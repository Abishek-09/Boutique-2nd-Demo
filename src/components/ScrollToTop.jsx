import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Automatically scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname, search]);

  // Show button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 p-1.5 rounded-full bg-[#174A43] hover:bg-[#123632] shadow-luxury border border-[#DBC3A5]/40 hover:border-[#C8906D] flex items-center justify-center transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#C8906D] cursor-pointer"
        >
          {/* Inner circle badge matching the symbol layout */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#DBC3A5]/20 group-hover:bg-[#C8906D]/30 flex items-center justify-center transition-colors">
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#DBC3A5] group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5 stroke-[2.2]" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
