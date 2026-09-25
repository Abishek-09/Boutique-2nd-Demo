import React, { useState } from 'react';
import { ArrowRight, Compass, Feather, Scissors, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OurStory = () => {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <>
      <section id="our-story" className="relative w-full bg-[#123632] overflow-hidden">
        <div className="w-full">
          {/* Full-width Split Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[680px] items-stretch">
            
            {/* Left Side: Forest Green (#123632) Background with Rich Typography */}
            <div className="lg:col-span-6 flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20 text-white relative z-10">
              
              {/* Subtle Atelier Crest / Icon */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2 text-xs font-sans tracking-[0.3em] text-[#C8906D] uppercase font-semibold mb-3"
              >
                <Feather className="w-4 h-4 text-[#C8906D]" />
                <span>OUR STORY</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight leading-[1.2] mb-6"
              >
                Crafted with Passion,{' '}
                <span className="italic font-normal text-[#DBC3A5]">Tailored for Eternity.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 text-[#DBC3A5]/85 font-sans font-light text-base sm:text-lg leading-relaxed max-w-xl"
              >
                <p>
                  At <strong className="font-serif text-white font-normal">LUMIÈRE</strong>, each garment is conceived as an enduring work of art. Born from a reverence for centuries-old hand-loom weaving and intricate zardozi needlework, our studio bridges heirloom traditions with effortless modern silhouettes.
                </p>
                <p className="text-sm sm:text-base text-white/70">
                  Every thread is spun from certified organic mulberry silks, ethically sourced linen, and precious metallic fibers. By working directly with fifth-generation master artisans across heritage textile hubs, we celebrate the human touch behind every silhouette.
                </p>
              </motion.div>

              {/* Atelier Pillars / Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-3 gap-4 py-8 border-y border-[#DBC3A5]/15 my-6 max-w-xl"
              >
                <div>
                  <p className="font-serif text-2xl sm:text-3xl text-white font-medium">100%</p>
                  <p className="text-[11px] font-sans text-[#DBC3A5] uppercase tracking-wider mt-1">Hand-Loomed Silk</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl text-[#C8906D] font-medium">45+</p>
                  <p className="text-[11px] font-sans text-[#DBC3A5] uppercase tracking-wider mt-1">Master Artisans</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl text-white font-medium">Zero</p>
                  <p className="text-[11px] font-sans text-[#DBC3A5] uppercase tracking-wider mt-1">Atelier Waste</p>
                </div>
              </motion.div>

              {/* CTA Button in Terracotta (#C8906D) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  type="button"
                  onClick={() => setShowStoryModal(true)}
                  className="group inline-flex items-center space-x-3 px-8 py-3.5 rounded-xl bg-[#C8906D] hover:bg-[#b57a55] text-white font-sans text-sm tracking-wider uppercase font-medium shadow-md transition-all duration-300 transform hover:-translate-y-0.5 ring-1 ring-[#DBC3A5]/40 hover:ring-white focus:outline-none"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </motion.div>

            </div>

            {/* Right Side: High-Quality Image of Folded Emerald Fabric with Delicate Flowers */}
            <div className="lg:col-span-6 relative min-h-[420px] sm:min-h-[500px] lg:min-h-[auto] overflow-hidden group">
              <motion.img
                initial={{ scale: 1.08, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                src="/images/story.jpg"
                alt="Folded luxury emerald fabric with gold threads and delicate white flowers at Lumiere atelier"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Subtle edge vignette */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#123632]/40 via-transparent to-black/20" />

              {/* Floating Atelier Seal */}
              <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center space-x-3 px-4 py-2.5 rounded-full bg-[#123632]/85 backdrop-blur-md border border-[#DBC3A5]/30 text-[#DBC3A5] text-xs font-sans tracking-widest uppercase">
                <Scissors className="w-4 h-4 text-[#C8906D]" />
                <span>Atelier Pure Craftsmanship</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Learn More Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full bg-[#123632] border border-[#DBC3A5]/30 rounded-2xl p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                type="button"
                onClick={() => setShowStoryModal(false)}
                className="absolute top-5 right-5 text-[#DBC3A5] hover:text-white text-xl p-1"
              >
                ✕
              </button>

              <div className="text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase mb-2">
                THE LUMIÈRE MANIFESTO
              </div>
              <h3 className="font-serif text-3xl text-white mb-4">
                The Heritage of Conscious Grandeur
              </h3>
              <div className="space-y-4 text-sm font-sans text-[#DBC3A5]/90 leading-relaxed font-light">
                <p>
                  Founded on the conviction that luxury should be slow, soulful, and intimately personal, Lumière curates couture pieces that transcend transient seasonal cycles.
                </p>
                <p>
                  Every collection begins with raw organic threads spun by hand. Master zardozi embroiderers spend up to 240 hours applying genuine metallic wire, seed pearls, and semi-precious emerald drops to a single lehenga or bandhgala.
                </p>
                <div className="p-4 rounded-xl bg-[#174A43] border border-[#DBC3A5]/20 flex items-center space-x-4 my-4">
                  <HeartHandshake className="w-8 h-8 text-[#C8906D] flex-shrink-0" />
                  <p className="text-xs text-white/90">
                    We pledge 5% of all atelier proceeds to educational scholarships for the artisan weaver communities across Rajasthan, Varanasi, and Kanchipuram.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowStoryModal(false)}
                  className="px-6 py-2.5 rounded-lg bg-[#C8906D] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#b57a55]"
                >
                  Close Manifesto
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OurStory;
