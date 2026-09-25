import React from 'react';
import { ArrowRight, Sparkles, Feather } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collectionsList } from '../data/products';

const CollectionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F6F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIOS OF DISTINCTION</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#174A43] font-normal tracking-tight mb-4">
            The Lumière Collections
          </h1>
          <p className="font-sans text-base text-[#383028]/80 font-light leading-relaxed">
            Each collection represents a distinct chapter of our atelier’s creative odyssey—merging ancestral artisanal techniques with contemporary silhouettes.
          </p>
        </div>

        {/* Collections Detailed Showcase */}
        <div className="space-y-20 lg:space-y-28">
          {collectionsList.map((col, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={col.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Side */}
                <div className={`lg:col-span-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury border border-[#DBC3A5]/40 group bg-[#174A43]">
                    <img
                      src={col.image}
                      alt={col.fullName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-6 left-6">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#174A43]/90 backdrop-blur-md border border-[#DBC3A5]/40 text-xs font-sans uppercase tracking-widest text-[#DBC3A5]">
                        {col.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 text-white font-sans text-xs tracking-wider">
                      {col.count} Available on Order
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <div className="flex items-center space-x-2 text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold">
                    <Feather className="w-4 h-4 text-[#C8906D]" />
                    <span>COLLECTION 0{index + 1}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal leading-tight">
                    {col.fullName}
                  </h2>

                  <p className="font-sans text-base text-[#383028]/85 font-light leading-relaxed">
                    {col.description} Sourced directly from our family-run weaving cooperatives in Varanasi, Rajasthan, and Kashmir, each garment honors slow fashion principles and zero-waste craftsmanship.
                  </p>

                  <div className="p-4 rounded-2xl bg-white border border-[#DBC3A5]/40 space-y-2 text-xs font-sans text-[#383028]/80">
                    <div className="flex justify-between">
                      <span className="font-medium text-[#174A43]">Primary Materials:</span>
                      <span>Certified Raw Silks, 22K Gold, Velvet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#174A43]">Atelier Lead Time:</span>
                      <span>14 to 21 Working Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#174A43]">Customization:</span>
                      <span className="text-[#C8906D] font-medium">Bespoke Fit Available</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/shop?category=${col.routeParam}`)}
                      className="group inline-flex items-center space-x-3 px-8 py-3.5 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all ring-1 ring-[#DBC3A5]/40"
                    >
                      <span>Shop {col.name} Edit</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CollectionsPage;
