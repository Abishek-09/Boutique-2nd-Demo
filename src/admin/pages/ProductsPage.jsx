import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Search,
  Check,
  AlertTriangle,
  Package,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Table from '../components/ui/Table';

const categories = [
  { id: 'women', label: "Women's Couture" },
  { id: 'men', label: "Gentlemen's Royal Edit" },
  { id: 'jewellery', label: 'Fine Jewellery' },
  { id: 'accessories', label: 'Artisanal Accessories' },
];

const presetImages = [
  { label: 'Emerald Woman (Hero)', url: '/images/hero.jpg' },
  { label: 'Terracotta Saree', url: '/images/women.jpg' },
  { label: 'Emerald Bandhgala', url: '/images/men.jpg' },
  { label: 'Polki Emerald Jewellery', url: '/images/jewellery.jpg' },
  { label: 'Artisanal Clutch', url: '/images/accessories.jpg' },
  { label: 'Folded Silk Fabric', url: '/images/story.jpg' },
];

const ProductsPage = () => {
  const { products, addProduct, editProduct, removeProduct, loading } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentProductId, setCurrentProductId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'women',
    stock: 10,
    image: '/images/hero.jpg',
    fabric: 'Pure Silk & Zari Weave',
    craft: 'Handcrafted Atelier Needlework',
  });
  const [imagePreview, setImagePreview] = useState('/images/hero.jpg');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete Confirmation Modal
  const [deleteProductTarget, setDeleteProductTarget] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setModalMode('add');
    setCurrentProductId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'women',
      stock: 10,
      image: '/images/hero.jpg',
      fabric: 'Pure Silk & Zari Weave',
      craft: 'Handcrafted Atelier Needlework',
    });
    setImagePreview('/images/hero.jpg');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setModalMode('edit');
    setCurrentProductId(product.id);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category,
      stock: product.stock !== undefined ? product.stock : 10,
      image: product.image,
      fabric: product.fabric || 'Pure Silk & Zari Weave',
      craft: product.craft || 'Handcrafted Atelier Needlework',
    });
    setImagePreview(product.image);
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      return;
    }
    setIsSubmitting(true);

    try {
      const categoryObj = categories.find((c) => c.id === formData.category);
      const payload = {
        ...formData,
        categoryName: categoryObj ? categoryObj.label : "Women's Couture",
        image: imagePreview,
      };

      if (modalMode === 'add') {
        await addProduct(payload);
      } else {
        await editProduct(currentProductId, payload);
      }
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteProductTarget) {
      await removeProduct(deleteProductTarget.id);
      setDeleteProductTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header: Title and Burnt Copper (#A95732) "Add New Product" Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8906D] font-semibold">
            <Package className="w-3.5 h-3.5" />
            <span>CATALOG INVENTORY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal tracking-tight mt-1">
            Product Management
          </h1>
        </div>

        {/* Action: "Add New Product" in Burnt Copper */}
        <Button
          variant="primary"
          icon={Plus}
          onClick={handleOpenAddModal}
          className="shadow-copper"
        >
          Add New Product
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-[#383028]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/40 text-xs font-sans focus:outline-none focus:border-[#C8906D]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-sans text-[#383028]/60 uppercase tracking-wider font-semibold">
            Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/40 text-xs font-sans text-[#174A43] focus:outline-none focus:border-[#C8906D]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table: Image (thumbnail), Name, Category, Price, Stock, Actions (Edit, Delete) */}
      <Table
        headers={['Image', 'Product Name', 'Category', 'Price', 'Stock Status', 'Actions']}
        loading={loading}
        colSpan={6}
        emptyMessage="No products match your search criteria."
      >
        {filteredProducts.map((product) => (
          <tr key={product.id} className="hover:bg-[#F9F6F0]/60 transition-colors">
            {/* Image (thumbnail) */}
            <td className="py-3 px-5">
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-14 object-cover rounded-lg shadow-sm border border-gray-200"
              />
            </td>

            {/* Name */}
            <td className="py-3 px-5">
              <div className="font-serif text-sm font-medium text-[#174A43]">
                {product.name}
              </div>
              <div className="text-[11px] font-sans text-[#383028]/60 line-clamp-1">
                {product.fabric || 'Pure Silk'}
              </div>
            </td>

            {/* Category */}
            <td className="py-3 px-5">
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider font-semibold bg-[#174A43]/10 text-[#174A43]">
                {product.categoryName || product.category}
              </span>
            </td>

            {/* Price */}
            <td className="py-3 px-5 font-serif font-semibold text-[#174A43]">
              ₹{Number(product.price).toLocaleString()}
            </td>

            {/* Stock */}
            <td className="py-3 px-5">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    (product.stock || 5) > 5 ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                  }`}
                />
                <span className="font-sans text-xs text-[#383028]/80 font-medium">
                  {product.stock !== undefined ? product.stock : 10} in atelier
                </span>
              </div>
            </td>

            {/* Actions: Edit, Delete */}
            <td className="py-3 px-5">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(product)}
                  className="p-1.5 rounded-lg text-[#174A43] hover:bg-[#174A43]/10 transition-colors"
                  aria-label={`Edit ${product.name}`}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteProductTarget(product)}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  aria-label={`Delete ${product.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Atelier Product' : 'Edit Product Silhouette'}
        subtitle="Provide complete couture attributes, pricing, and high-resolution imagery."
      >
        <form onSubmit={handleSaveProduct} className="space-y-5">
          <Input
            label="Product Name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Royal Emerald Brocade Sherwani"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43] mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DBC3A5]/60 text-sm font-sans text-[#383028] focus:outline-none focus:border-[#C8906D]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Price (INR ₹) *"
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="34500"
            />

            <Input
              label="Stock Quantity *"
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43] mb-1.5">
              Description (Textarea)
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed textile composition, zardozi embroidery techniques, styling advice..."
              className="w-full p-3.5 rounded-xl bg-white border border-[#DBC3A5]/60 text-sm font-sans text-[#383028] focus:outline-none focus:border-[#C8906D]"
            />
          </div>

          {/* Image Upload Area with Preview */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43] mb-1.5">
              Product Image &amp; Media Preview
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Image Preview Box */}
              <div className="sm:col-span-4">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Upload Input & Presets */}
              <div className="sm:col-span-8 space-y-3">
                <div className="border-2 border-dashed border-[#DBC3A5] rounded-xl p-4 text-center hover:bg-[#F9F6F0] transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-6 h-6 text-[#A95732] mx-auto mb-1" />
                  <p className="text-xs font-sans font-medium text-[#174A43]">
                    Click or drag &amp; drop high-res image
                  </p>
                  <p className="text-[10px] text-[#383028]/50 mt-0.5">
                    Supports JPG, PNG, WEBP (Max 5MB)
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#383028]/60 font-medium block mb-1">
                    Or select from curated atelier assets:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {presetImages.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => {
                          setImagePreview(preset.url);
                          setFormData((prev) => ({ ...prev, image: preset.url }));
                        }}
                        className={`text-[10px] p-1.5 rounded-lg border text-left truncate transition-colors ${
                          imagePreview === preset.url
                            ? 'bg-[#174A43] text-white border-[#174A43]'
                            : 'bg-white hover:bg-gray-50 border-gray-200 text-[#383028]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              loading={isSubmitting}
            >
              {modalMode === 'add' ? 'Save Product' : 'Update Changes'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteProductTarget}
        onClose={() => setDeleteProductTarget(null)}
        title="Confirm Removal"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-lg text-[#174A43]">
              Remove &ldquo;{deleteProductTarget?.name}&rdquo;?
            </h4>
            <p className="text-xs font-sans text-[#383028]/70 mt-1">
              This action will remove the silhouette from both the active storefront catalog and admin records.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteProductTarget(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Delete Silhouette
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsPage;
