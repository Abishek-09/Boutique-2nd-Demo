import React from 'react';
import { ArrowUp, Instagram, Facebook, Twitter, Pin as Pinterest, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const clientCare = [
    { name: 'Private Atelier Appointments', path: '/contact' },
    { name: 'Bespoke Sizing & Customization', path: '/contact' },
    { name: 'Silk Care & Preservation', path: '/about' },
    { name: 'Worldwide Shipping & Customs', path: '/contact' },
    { name: 'Heirloom Certificate Guarantee', path: '/about' },
  ];

  return (
    <footer className="bg-[#174A43] text-white py-16 md:py-24 border-t border-[#DBC3A5]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 md:pb-16 border-b border-[#DBC3A5]/15">
          
          {/* Left Column: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex flex-col items-start focus:outline-none">
              <span className="font-serif text-3xl sm:text-4xl text-white tracking-[0.22em] font-medium uppercase hover:text-[#DBC3A5] transition-colors">
                LUMIERE
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#DBC3A5]/80 font-sans uppercase">
                FASHION &amp; LIFESTYLE
              </span>
            </Link>

            <p className="font-sans text-sm text-[#DBC3A5]/85 max-w-sm font-light leading-relaxed pt-2">
              Elevating bespoke elegance &amp; mindful craftsmanship since 2018. Handcrafted couture, heirloom silks, and timeless living created in harmony with master artisan communities.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#DBC3A5]/80 font-sans">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C8906D] flex-shrink-0" />
                <span>Flagship Atelier: 14 Heritage Boulevard, Colaba, Mumbai</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C8906D] flex-shrink-0" />
                <span>Concierge: +91 (022) 8492-3400</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C8906D] flex-shrink-0" />
                <span>concierge@lumiere-couture.com</span>
              </div>
            </div>
          </div>

          {/* Center Column: Navigation & Client Care */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-serif text-base font-medium text-white tracking-wider mb-4 border-b border-[#DBC3A5]/20 pb-2">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {/* Action: Links navigate to respective pages */}
                    <Link
                      to={link.path}
                      className="font-sans text-xs uppercase tracking-widest text-[#DBC3A5]/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-base font-medium text-white tracking-wider mb-4 border-b border-[#DBC3A5]/20 pb-2">
                Client Care
              </h4>
              <ul className="space-y-2.5">
                {clientCare.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="font-sans text-xs text-[#DBC3A5]/80 hover:text-white transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Social Icons & Certificate Notice */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-serif text-base font-medium text-white tracking-wider border-b border-[#DBC3A5]/20 pb-2">
              Follow Our Atelier
            </h4>
            <p className="font-sans text-xs text-[#DBC3A5]/80 leading-relaxed font-light">
              Follow our visual diary for behind-the-scenes glimpses into our hand-weaving ateliers and private runway showcases.
            </p>

            {/* Action: Social icons open in a new tab */}
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Lumiere on Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-[#DBC3A5]/30 flex items-center justify-center text-[#DBC3A5] hover:text-white hover:bg-[#C8906D] hover:border-[#C8906D] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Lumiere on Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-[#DBC3A5]/30 flex items-center justify-center text-[#DBC3A5] hover:text-white hover:bg-[#C8906D] hover:border-[#C8906D] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Lumiere on Twitter"
                className="w-10 h-10 rounded-full bg-white/5 border border-[#DBC3A5]/30 flex items-center justify-center text-[#DBC3A5] hover:text-white hover:bg-[#C8906D] hover:border-[#C8906D] transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Lumiere on Pinterest"
                className="w-10 h-10 rounded-full bg-white/5 border border-[#DBC3A5]/30 flex items-center justify-center text-[#DBC3A5] hover:text-white hover:bg-[#C8906D] hover:border-[#C8906D] transition-all"
              >
                <Pinterest className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1.5 rounded-md bg-[#123632] border border-[#DBC3A5]/20 text-[11px] font-sans text-[#DBC3A5] tracking-wide">
                Certified Ethical Handloom Guild
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#DBC3A5]/70 font-sans gap-4 text-center">
          <p>© 2026 Lumière Atelier. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-[#DBC3A5]/30">•</span>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-[#DBC3A5]/30">•</span>
            <Link to="/collections" className="hover:text-white transition-colors">Atelier Lookbook</Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="group flex items-center space-x-2 text-[#DBC3A5] hover:text-white transition-colors"
          >
            <span>Top</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#A95732] transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
