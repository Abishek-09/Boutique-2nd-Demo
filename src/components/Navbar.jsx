import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, ArrowRight, Flame } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import GlobalOfferBanner from './GlobalOfferBanner';

const Navbar = () => {
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsAuthModalOpen, user } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Offers', path: '/offers', isOffer: true },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Global Offer Promotion Ribbon (Managed by Admin) */}
      <GlobalOfferBanner />

      {/* Top Banner / Complimentary Shipping Bar */}
      <div className="bg-[#123632] text-[#DBC3A5] text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-widest uppercase border-b border-[#DBC3A5]/10">
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
            <Link to="/" className="group flex flex-col items-start focus:outline-none">
              <span className="font-serif text-2xl sm:text-3xl text-white tracking-[0.22em] font-medium uppercase group-hover:text-[#DBC3A5] transition-colors">
                LUMIERE
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#DBC3A5]/80 font-sans uppercase -mt-0.5">
                FASHION &amp; LIFESTYLE
              </span>
            </Link>

            {/* Center: React Router Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs lg:text-sm tracking-widest uppercase font-sans font-normal transition-colors relative py-1 flex items-center space-x-1.5 group ${
                      isActive ? 'text-[#DBC3A5]' : 'text-white/90 hover:text-[#DBC3A5]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {link.isOffer && (
                        <span className="relative flex items-center ml-1">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#C8906D] opacity-75"></span>
                          <span className="relative inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-sans font-bold bg-[#A95732] text-white tracking-wider uppercase shadow-xs">
                            Hot
                          </span>
                        </span>
                      )}
                      <span
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C8906D] transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right: Actions (Search, User, Shopping Cart) */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-white">
              {/* Action: Search opens full-screen overlay */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search bar"
                className="p-1.5 text-white/90 hover:text-[#DBC3A5] hover:scale-105 transition-transform focus:outline-none"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Action: User opens Login/Register modal */}
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                aria-label="Open Account Modal"
                className="p-1.5 text-white/90 hover:text-[#DBC3A5] hover:scale-105 transition-transform focus:outline-none relative"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
                {user && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C8906D]" />
                )}
              </button>

              {/* Action: Cart opens slide-out side drawer */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label="Open Shopping Bag"
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
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between text-base tracking-widest uppercase font-sans py-2 border-b border-[#DBC3A5]/10 ${
                        isActive ? 'text-[#DBC3A5] font-medium' : 'text-white/90 hover:text-[#DBC3A5]'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    {link.isOffer && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-sans font-bold bg-[#A95732] text-white tracking-wider uppercase">
                        Hot Offer
                      </span>
                    )}
                  </NavLink>
                ))}
                
                <div className="pt-2 flex items-center justify-between text-xs text-[#DBC3A5]">
                  <span>Concierge: +91 (022) 8492-3400</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
