import React from 'react';
import { ArrowRight, Sparkles, Feather, Scissors, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F6F0] min-h-screen">
      {/* Top Banner */}
      <section className="bg-[#123632] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.3em] text-[#C8906D] uppercase font-semibold mb-4">
              <Feather className="w-4 h-4 text-[#C8906D]" />
              <span>THE LUMIÈRE MANIFESTO</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.15] mb-4">
              The Heritage of Conscious Grandeur
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#DBC3A5]/90 font-light leading-relaxed mb-6">
              Founded on the belief that true luxury is slow, mindful, and steeped in human soul. We honor centuries of royal Indian textile arts while refining them for the modern cosmopolitan lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Split Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-sans tracking-[0.25em] text-[#A95732] uppercase font-semibold">
              OUR ATELIER GENESIS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal leading-tight mb-4">
              Reviving Ancient Weaves with Uncompromising Contemporary Precision
            </h2>
            <div className="space-y-4 font-sans text-base text-[#383028]/80 font-light leading-relaxed mb-6">
              <p>
                Lumière was founded in 2018 in Mumbai’s historic Colaba district. What began as a personal quest to preserve the endangered art of pure metal wire zardozi embroidery has grown into an internationally acclaimed haute couture sanctuary.
              </p>
              <p>
                Each creation represents up to 240 hours of meticulous hand-weaving. Our master weavers—many belonging to fifth-generation artisan families—work with natural mulberry silks, botanical dyes, and hand-beaten gold and silver filaments.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="px-8 py-3.5 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all duration-300 hover:scale-[1.02] ring-1 ring-[#DBC3A5]/40"
              >
                Explore The Archive
              </button>
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="px-6 py-3.5 rounded-xl border border-[#174A43]/30 text-[#174A43] hover:bg-[#174A43] hover:text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                Book Atelier Appointment
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury border border-[#DBC3A5]/40">
              <img
                src="/images/story.jpg"
                alt="Lumiere Master Craftsmanship and Silks"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars of Lumière */}
      <section className="bg-white py-16 md:py-24 border-y border-[#DBC3A5]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold">
              OUR SACRED COMMITMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#174A43] mt-2">
              The Four Pillars of the Atelier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Scissors,
                title: 'Heirloom Techniques',
                desc: 'Preserving ancient Marodi needlework, antique Dabka embroidery, and genuine metallic threads.',
              },
              {
                icon: HeartHandshake,
                title: 'Fair Guild Trade',
                desc: 'Paying 35% above fair-market wages and funding artisan family health & education funds.',
              },
              {
                icon: ShieldCheck,
                title: 'Zero Atelier Waste',
                desc: 'Every silk remnant is repurposed into bespoke potli pouches and keepsake garment casings.',
              },
              {
                icon: Sparkles,
                title: 'Lifetime Preservation',
                desc: 'Complimentary archival restoration and gold polishing for all Lumière couture pieces.',
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-[#F9F6F0] border border-[#DBC3A5]/30 space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#174A43] text-[#DBC3A5] flex items-center justify-center">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#174A43] font-medium">{pillar.title}</h3>
                  <p className="font-sans text-xs text-[#383028]/80 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
