import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const GlobalOfferBanner = () => {
  const { offerBanner } = useShop();
  const [dismissed, setDismissed] = useState(false);

  if (!offerBanner || !offerBanner.enabled || dismissed) {
    return null;
  }

  const bgColor = offerBanner.bgColor || '#C8906D';
  const bannerLink = offerBanner.link || '/offers';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: bgColor }}
        className="text-white relative z-50 overflow-hidden shadow-sm"
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14 py-2.5 flex items-center justify-between text-xs font-sans tracking-wider">
          {/* Subtle Left Accent Sparkle */}
          <div className="hidden sm:flex items-center space-x-1.5 opacity-80">
            <Sparkles className="w-3.5 h-3.5 text-[#F9F6F0]" />
            <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-white/90">
              LUMIÈRE ATELIER
            </span>
          </div>

          {/* Center Banner Message & Link */}
          <div className="flex-1 flex items-center justify-center text-center px-2">
            <Link
              to={bannerLink}
              className="inline-flex items-center space-x-2.5 group hover:opacity-95 transition-opacity"
            >
              {offerBanner.badgeText && (
                <span className="bg-black/20 backdrop-blur-sm border border-white/20 text-white font-bold text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {offerBanner.badgeText}
                </span>
              )}
              <span className="font-medium text-[11px] sm:text-xs tracking-wider text-white">
                {offerBanner.text || 'Festive Season Grandeur: Complimentary Gift on Orders Above ₹20,000'}
              </span>
              <span className="inline-flex items-center text-[10px] uppercase font-semibold text-[#F9F6F0] underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-all ml-1">
                <span>Explore Edit</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Right: Dismiss button */}
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-black/10 transition-colors focus:outline-none"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalOfferBanner;
