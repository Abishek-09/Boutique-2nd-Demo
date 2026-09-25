import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Save, Eye, Percent, Clock, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Table from '../components/UI/Table';

const colorPresets = [
  { label: 'Terracotta (Default)', hex: '#C8906D' },
  { label: 'Burnt Copper', hex: '#A95732' },
  { label: 'Deep Emerald', hex: '#174A43' },
  { label: 'Forest Green', hex: '#123632' },
  { label: 'Royal Crimson', hex: '#872323' },
];

const OffersAdminPage = () => {
  const { offerBanner, saveOfferBanner, products } = useAdmin();

  const [formData, setFormData] = useState({
    enabled: true,
    text: '',
    link: '/offers',
    bgColor: '#C8906D',
    badgeText: 'FESTIVE SALE',
    endDate: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (offerBanner) {
      setFormData({
        enabled: offerBanner.enabled ?? true,
        text: offerBanner.text || '',
        link: offerBanner.link || '/offers',
        bgColor: offerBanner.bgColor || '#C8906D',
        badgeText: offerBanner.badgeText || 'FESTIVE SALE',
        endDate: offerBanner.endDate ? offerBanner.endDate.slice(0, 16) : '',
      });
    }
  }, [offerBanner]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveOfferBanner(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const offerProducts = products.filter((p) => p.isOnOffer === true);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8906D] font-semibold">
            <Tag className="w-3.5 h-3.5" />
            <span>CAMPAIGNS &amp; PROMOTIONS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal tracking-tight mt-1">
            Offers &amp; Promotions
          </h1>
        </div>

        <Button
          type="button"
          variant="outline"
          icon={Eye}
          onClick={() => window.open('/offers', '_blank')}
        >
          View Offers Page (/offers)
        </Button>
      </div>

      {/* Global Offer Banner Configuration Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl text-[#174A43] font-medium">
              Global Site-Wide Offer Banner
            </h3>
            <p className="text-xs font-sans text-[#383028]/60 mt-0.5">
              Configures the announcement ribbon appearing at the very top of all customer-facing storefront pages.
            </p>
          </div>

          {/* Toggle: Enable Global Banner */}
          <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/40 hover:border-[#C8906D] transition-colors">
            <span className="text-xs font-sans font-semibold text-[#174A43]">
              {formData.enabled ? 'Banner Active' : 'Banner Inactive'}
            </span>
            <input
              type="checkbox"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="w-5 h-5 rounded text-[#A95732] focus:ring-[#A95732] cursor-pointer"
            />
          </label>
        </div>

        {/* Live Banner Preview Box */}
        <div className="space-y-2">
          <span className="text-xs font-sans uppercase tracking-wider font-semibold text-[#383028]/70 block">
            Live Storefront Top Banner Preview:
          </span>
          {formData.enabled ? (
            <div
              className="p-3 px-4 rounded-xl text-white text-xs font-sans font-medium flex items-center justify-between shadow-sm transition-colors"
              style={{ backgroundColor: formData.bgColor }}
            >
              <div className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] tracking-wider uppercase font-bold">
                  {formData.badgeText || 'OFFER'}
                </span>
                <span>{formData.text || 'Enter your promotion text below...'}</span>
              </div>
              <span className="text-[11px] underline uppercase tracking-wider font-semibold">
                Explore →
              </span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 text-xs font-sans text-center">
              Banner is currently disabled. Toggle &ldquo;Banner Active&rdquo; to publish.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <Input
            label="Banner Text *"
            required
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            placeholder="e.g. Festive Sale: Flat 20% Off Heirloom Silks"
            helperText="Keep message concise for desktop and mobile screens."
          />

          <Input
            label="Banner Link URL *"
            required
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="/offers"
            helperText="Destination URL when customer clicks the banner."
          />

          <Input
            label="Badge Tag Text"
            value={formData.badgeText}
            onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
            placeholder="e.g. LIMITED OFFER"
          />

          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43] mb-1.5">
              Countdown Target Date &amp; Time
            </label>
            <input
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DBC3A5]/60 text-xs font-sans text-[#383028] focus:outline-none focus:border-[#C8906D]"
            />
            <p className="text-[11px] font-sans text-[#383028]/60 mt-1">
              Drives the live countdown clock displayed on the &ldquo;/offers&rdquo; page.
            </p>
          </div>
        </div>

        {/* Color Picker: Background color of banner (default to Terracotta) */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43]">
            Banner Background Color
          </label>
          <div className="flex flex-wrap items-center gap-3">
            {colorPresets.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                onClick={() => setFormData({ ...formData, bgColor: preset.hex })}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-sans transition-all border ${
                  formData.bgColor === preset.hex
                    ? 'border-black ring-2 ring-[#C8906D] font-semibold'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-black/20"
                  style={{ backgroundColor: preset.hex }}
                />
                <span>{preset.label}</span>
              </button>
            ))}

            {/* Custom Hex Color Picker */}
            <div className="flex items-center space-x-2 bg-gray-50 p-1.5 px-3 rounded-xl border border-gray-200">
              <span className="text-xs font-sans text-[#383028]/70">Custom:</span>
              <input
                type="color"
                value={formData.bgColor}
                onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                className="w-7 h-7 rounded border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-[#174A43]">{formData.bgColor}</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Save}
            loading={isSaving}
            className="shadow-copper"
          >
            Save Global Promotion Settings
          </Button>
        </div>
      </form>

      {/* Active Promotional Products Snapshot */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-serif text-xl text-[#174A43] font-medium">
              Products Currently On Offer ({offerProducts.length})
            </h3>
            <p className="text-xs font-sans text-[#383028]/60 mt-0.5">
              These items are highlighted with strikethrough pricing on &ldquo;/offers&rdquo;.
            </p>
          </div>
          <span className="text-xs font-sans font-semibold text-[#A95732] bg-[#A95732]/10 px-3 py-1 rounded-full">
            Managed via Products Page
          </span>
        </div>

        <Table
          headers={['Silhouette', 'Category', 'Original Price', 'Offer Price', 'Discount']}
          colSpan={5}
          emptyMessage="No products are currently marked with isOnOffer: true."
        >
          {offerProducts.map((p) => (
            <tr key={p.id} className="hover:bg-[#F9F6F0]/60 transition-colors">
              <td className="py-3 px-5">
                <div className="flex items-center space-x-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-12 object-cover rounded-lg border border-gray-200"
                  />
                  <span className="font-serif text-sm font-medium text-[#174A43]">
                    {p.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5 text-xs font-sans uppercase tracking-wider text-[#383028]/70">
                {p.categoryName || p.category}
              </td>
              <td className="py-3 px-5 text-xs font-sans text-[#383028]/50 line-through">
                ₹{Number(p.price).toLocaleString()}
              </td>
              <td className="py-3 px-5 font-serif font-bold text-sm text-[#A95732]">
                ₹{Number(p.discountPrice || p.price).toLocaleString()}
              </td>
              <td className="py-3 px-5">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-sans font-bold bg-[#A95732] text-white">
                  -{p.discountPercentage || 20}% OFF
                </span>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default OffersAdminPage;
