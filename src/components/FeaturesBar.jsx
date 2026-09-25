import React from 'react';
import { Award, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    subtitle: 'Handpicked Products',
    detail: 'Certified natural silks & artisanal fabrics',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    subtitle: 'On Orders Above ₹1,999',
    detail: 'Insured worldwide bespoke delivery',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    subtitle: 'Hassle Free',
    detail: 'Complimentary 14-day exchange concierge',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    subtitle: '100% Safe',
    detail: 'Bank-grade 256-bit encrypted checkout',
  },
];

const FeaturesBar = () => {
  return (
    <section className="bg-[#F9F6F0] border-y border-[#DBC3A5]/40 py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                /* Action: Hovering over a badge slightly lifts it (CSS transform) */
                className="group flex items-start space-x-4 p-5 rounded-2xl bg-white/70 hover:bg-white border border-[#DBC3A5]/30 hover:border-[#C8906D]/60 shadow-sm hover:shadow-luxury transform hover:-translate-y-2 transition-all duration-300 cursor-default"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#174A43]/5 border border-[#174A43]/10 flex items-center justify-center text-[#174A43] group-hover:bg-[#174A43] group-hover:text-[#DBC3A5] transition-all duration-300">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                
                <div className="space-y-0.5">
                  <h3 className="font-serif text-lg font-medium text-[#174A43] tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-[#A95732] font-semibold">
                    {item.subtitle}
                  </p>
                  <p className="font-sans text-xs text-[#383028]/60 font-light pt-0.5">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;
