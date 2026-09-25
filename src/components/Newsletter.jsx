import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  return (
    <section id="newsletter" className="relative w-full bg-[#123632] py-20 sm:py-24 lg:py-28 overflow-hidden text-white border-t border-[#DBC3A5]/15">
      
      {/* Left Edge: Subtle Line-Art Botanical Leaf Pattern */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:translate-x-0 w-48 sm:w-64 lg:w-80 pointer-events-none opacity-20 sm:opacity-25 select-none text-[#DBC3A5]">
        <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Botanical Stem */}
          <path d="M20 380 C 60 280, 80 160, 160 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Leaves along the branch */}
          <path d="M40 330 C 10 320, 0 280, 20 270 C 50 280, 55 310, 40 330 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M55 290 C 85 270, 120 280, 115 310 C 85 315, 65 300, 55 290 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          
          <path d="M70 230 C 30 220, 20 180, 50 170 C 80 180, 85 210, 70 230 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M85 190 C 120 170, 150 185, 145 215 C 115 220, 95 200, 85 190 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          
          <path d="M105 130 C 70 115, 65 80, 90 70 C 120 85, 120 115, 105 130 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M125 90 C 155 70, 185 85, 180 110 C 150 115, 135 100, 125 90 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />

          {/* Delicate leaf veins */}
          <line x1="20" y1="270" x2="40" y2="330" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <line x1="115" y1="310" x2="55" y2="290" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <line x1="50" y1="170" x2="70" y2="230" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        </svg>
      </div>

      {/* Right Edge: Subtle Line-Art Botanical Leaf Pattern */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-0 w-48 sm:w-64 lg:w-80 pointer-events-none opacity-20 sm:opacity-25 select-none text-[#DBC3A5] transform scale-x-[-1]">
        <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M20 380 C 60 280, 80 160, 160 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M40 330 C 10 320, 0 280, 20 270 C 50 280, 55 310, 40 330 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M55 290 C 85 270, 120 280, 115 310 C 85 315, 65 300, 55 290 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M70 230 C 30 220, 20 180, 50 170 C 80 180, 85 210, 70 230 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M85 190 C 120 170, 150 185, 145 215 C 115 220, 95 200, 85 190 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M105 130 C 70 115, 65 80, 90 70 C 120 85, 120 115, 105 130 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M125 90 C 155 70, 185 85, 180 110 C 150 115, 135 100, 125 90 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.3em] text-[#C8906D] uppercase font-semibold mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>THE LUMIÈRE SOCIETY</span>
        </motion.div>

        {/* Heading: Serif */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight mb-4"
        >
          Join Our Newsletter
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-sm sm:text-base text-[#DBC3A5]/85 max-w-xl mx-auto font-light leading-relaxed mb-8 sm:mb-10"
        >
          Be the first to receive invitations to private trunk showcases, seasonal bespoke lookbooks, and exclusive atelier privileges.
        </motion.p>

        {/* Interactive Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-2xl bg-[#174A43] border border-[#DBC3A5]/40 text-center shadow-luxury"
            >
              <CheckCircle className="w-10 h-10 text-[#C8906D] mx-auto mb-3" />
              <h3 className="font-serif text-2xl text-white font-normal mb-1">Welcome to Lumière</h3>
              <p className="text-sm font-sans text-[#DBC3A5]/90">
                A confirmation with your complimentary Autumn Lookbook invitation has been dispatched to <strong>{email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="mt-4 text-xs font-sans tracking-widest text-[#C8906D] hover:text-white uppercase underline"
              >
                Register another email
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 sm:bg-white/5 sm:p-1.5 sm:rounded-full sm:border sm:border-[#DBC3A5]/40 sm:backdrop-blur-md shadow-lg">
                
                {/* Email Input: rounded, transparent with border */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-[#DBC3A5]/60">
                    <Mail className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    aria-label="Email Address"
                    className="w-full pl-12 pr-4 py-3.5 sm:py-3 rounded-full sm:rounded-full bg-white/10 sm:bg-transparent border border-[#DBC3A5]/40 sm:border-0 text-white placeholder-[#DBC3A5]/60 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#C8906D] sm:focus:ring-0"
                  />
                </div>

                {/* CTA Subscribe Button in Burnt Copper (#A95732) */}
                <button
                  type="submit"
                  className="group px-8 py-3.5 rounded-full bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-medium shadow-copper transition-all duration-300 flex items-center justify-center space-x-2 ring-1 ring-[#DBC3A5]/40 hover:ring-white focus:outline-none"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {error && (
                <p className="mt-2 text-xs font-sans text-[#C8906D] text-left pl-4">
                  {error}
                </p>
              )}

              <p className="text-[11px] font-sans text-[#DBC3A5]/60 mt-4 tracking-wide">
                We honor your privacy. Unsubscribe at any time with a single click.
              </p>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default Newsletter;
