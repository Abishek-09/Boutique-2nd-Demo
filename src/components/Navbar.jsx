import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onOpenCart, onOpenSearch, cartCount = 2 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#collections' },
    { name: 'Collections', href: '#collections' },
    { name: 'About', href: '#our-story' },
    { name: 'Contact', href: '#newsletter' },
  ];

  return (
    <>
      {/* Top Banner / Announcement Bar */}
      <div className="bg-[#123632] text-[#DBC3A5] text-xs py-2 px-4 text-center font-medium tracking-widest uppercase border-b border-[#DBC3A5]/10">
        Complimentary Bespoke Consultation &amp; Worldwide Shipping on Orders Above ₹1,999
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#174A43] ${
          isScrolled ? 'shadow-luxury py-3 border-b border-[#DBC3A5]/15' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <a href="#home" className="group flex flex-col items-start focus:outline-none">
              <span className="font-serif text-2xl sm:text-3xl text-white tracking-[0.22em] font-medium uppercase group-hover:text-[#DBC3A5] transition-colors">
                LUMIERE
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#DBC3A5]/80 font-sans uppercase -mt-0.5">
                FASHION &amp; LIFESTYLE
              </span>
            </a>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-[#DBC3A5] text-sm tracking-widest uppercase font-sans font-normal transition-colors relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8906D] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right: Icons (Search, User, Shopping Cart) */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-white">
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search collection"
                className="p-1.5 text-white/90 hover:text-[#DBC3A5] hover:scale-105 transition-transform focus:outline-none"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              <button
                type="button"
                aria-label="User Account"
                className="hidden sm:block p-1.5 text-white/90 hover:text-[#DBC3A5] hover:scale-105 transition-transform focus:outline-none"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                aria-label="Shopping Cart"
                className="p-1.5 text-white/90 hover:text-[#DBC3A5] hover:scale-105 transition-transform focus:outline-none relative"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-[#A95732] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#174A43]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="md:hidden p-1.5 text-white hover:text-[#DBC3A5] focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#123632] border-t border-[#DBC3A5]/20 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white/90 hover:text-[#DBC3A5] text-base tracking-widest uppercase font-sans py-2 border-b border-[#DBC3A5]/10"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-2 flex items-center justify-between text-sm text-[#DBC3A5]">
                  <span>Atelier Concierge: +91 98765 43210</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
