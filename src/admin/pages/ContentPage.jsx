import React, { useState, useEffect } from 'react';
import { FileEdit, Save, Upload, Sparkles, Image as ImageIcon, Eye } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ContentPage = () => {
  const { cms, saveCMS } = useAdmin();

  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroButtonText: '',
    heroImage: '/images/hero.jpg',
    storyTitle: '',
    storyParagraph: '',
    storyImage: '/images/story.jpg',
  });

  const [heroImagePreview, setHeroImagePreview] = useState('/images/hero.jpg');
  const [storyImagePreview, setStoryImagePreview] = useState('/images/story.jpg');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (cms && Object.keys(cms).length > 0) {
      setFormData(cms);
      if (cms.heroImage) setHeroImagePreview(cms.heroImage);
      if (cms.storyImage) setStoryImagePreview(cms.storyImage);
    }
  }, [cms]);

  const handleHeroImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, heroImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoryImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoryImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, storyImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveCMS({
        ...formData,
        heroImage: heroImagePreview,
        storyImage: storyImagePreview,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8906D] font-semibold">
            <FileEdit className="w-3.5 h-3.5" />
            <span>DYNAMIC STOREFRONT CMS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal tracking-tight mt-1">
            Content Management
          </h1>
        </div>

        <Button
          type="button"
          variant="outline"
          icon={Eye}
          onClick={() => window.open('/', '_blank')}
        >
          Preview Live Storefront
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Hero Section Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl text-[#174A43] font-medium">
                Hero Section Configuration
              </h3>
              <p className="text-xs font-sans text-[#383028]/60 mt-0.5">
                Front-page entrance headline, subtext, CTA button label, and primary model imagery.
              </p>
            </div>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#174A43]/10 text-[#174A43]">
              Landing Page Hero
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Hero Title *"
                required
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                placeholder="Timeless Styles for Every You"
              />

              <Input
                label="Hero Subtitle *"
                required
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                placeholder="Discover handcrafted elegance, designed for modern living."
              />

              <Input
                label="Hero Button Text *"
                required
                value={formData.heroButtonText}
                onChange={(e) => setFormData({ ...formData, heroButtonText: e.target.value })}
                placeholder="Shop Now"
              />
            </div>

            {/* Hero Image Upload & Preview */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43]">
                Hero Showcase Image
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                    <img
                      src={heroImagePreview}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="sm:col-span-7">
                  <div className="border-2 border-dashed border-[#DBC3A5] rounded-xl p-4 text-center hover:bg-[#F9F6F0] transition-colors relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-5 h-5 text-[#A95732] mx-auto mb-1" />
                    <p className="text-xs font-sans font-medium text-[#174A43]">
                      Upload New Hero Image
                    </p>
                    <p className="text-[10px] text-[#383028]/50 mt-0.5">
                      JPG, PNG, WEBP (Portrait 3:4)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Our Story Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl text-[#174A43] font-medium">
                Our Story Section Configuration
              </h3>
              <p className="text-xs font-sans text-[#383028]/60 mt-0.5">
                The atelier heritage narrative, artisan manifesto, and craftsmanship backdrop.
              </p>
            </div>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#123632]/10 text-[#123632]">
              Heritage Section
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Story Title *"
                required
                value={formData.storyTitle}
                onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
                placeholder="Crafted with Passion, Tailored for Eternity"
              />

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43] mb-1.5">
                  Story Paragraph (Textarea) *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.storyParagraph}
                  onChange={(e) => setFormData({ ...formData, storyParagraph: e.target.value })}
                  placeholder="Detailed narrative honoring slow fashion, master weavers, and sustainable silk traditions..."
                  className="w-full p-3.5 rounded-xl bg-white border border-[#DBC3A5]/60 text-sm font-sans text-[#383028] focus:outline-none focus:border-[#C8906D]"
                />
              </div>
            </div>

            {/* Story Image Upload & Preview */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43]">
                Atelier Craft Image
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                    <img
                      src={storyImagePreview}
                      alt="Story Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="sm:col-span-7">
                  <div className="border-2 border-dashed border-[#DBC3A5] rounded-xl p-4 text-center hover:bg-[#F9F6F0] transition-colors relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleStoryImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-5 h-5 text-[#A95732] mx-auto mb-1" />
                    <p className="text-xs font-sans font-medium text-[#174A43]">
                      Upload New Story Image
                    </p>
                    <p className="text-[10px] text-[#383028]/50 mt-0.5">
                      High-resolution macro fabric/atelier photo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action: "Save Changes" button triggers PUT request */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Save}
            loading={isSaving}
            className="shadow-copper"
          >
            Save Changes to Storefront CMS
          </Button>
        </div>

      </form>
    </div>
  );
};

export default ContentPage;
