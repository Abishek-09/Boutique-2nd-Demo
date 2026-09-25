import axios from 'axios';
import { products as initialProducts } from '../../data/products';

// Create configured Axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Initial mock datasets stored in localStorage for full persistence
const initLocalStorage = () => {
  if (!localStorage.getItem('lumiere_admin_products')) {
    const enriched = initialProducts.map((p) => ({
      ...p,
      stock: Math.floor(Math.random() * 15) + 3,
    }));
    localStorage.setItem('lumiere_admin_products', JSON.stringify(enriched));
  }

  if (!localStorage.getItem('lumiere_admin_orders')) {
    const mockOrders = [
      {
        id: 'LUM-948123',
        customer: 'Princess Ananya Singh',
        email: 'ananya.singh@royalheritage.in',
        phone: '+91 98201 44821',
        date: '2026-09-24',
        amount: 34500,
        status: 'Delivered',
        items: [
          { name: 'The Emerald Noor Lehenga', qty: 1, price: 34500, image: '/images/hero.jpg' },
        ],
        shippingAddress: '12 Palace View Residences, Jaipur, Rajasthan 302001',
      },
      {
        id: 'LUM-882104',
        customer: 'Vikramaditya Roy',
        email: 'v.roy@mercantile.com',
        phone: '+91 98112 55902',
        date: '2026-09-23',
        amount: 24000,
        status: 'Shipped',
        items: [
          { name: 'Royal Emerald Brocade Bandhgala', qty: 1, price: 24000, image: '/images/men.jpg' },
        ],
        shippingAddress: 'Flat 4B, Malabar Hill Heights, Mumbai 400006',
      },
      {
        id: 'LUM-741982',
        customer: 'Meera Chawla',
        email: 'meera.chawla@coutureclub.org',
        phone: '+91 99304 88124',
        date: '2026-09-22',
        amount: 68000,
        status: 'Pending',
        items: [
          { name: 'Heirloom Colombian Emerald & Polki Choker', qty: 1, price: 68000, image: '/images/jewellery.jpg' },
        ],
        shippingAddress: 'Villa 18, Golf Links, New Delhi 110003',
      },
      {
        id: 'LUM-629401',
        customer: 'Devika Singhania',
        email: 'devika@singhaniacorp.in',
        phone: '+91 98450 11984',
        date: '2026-09-21',
        amount: 27400,
        status: 'Shipped',
        items: [
          { name: 'Terracotta Banarasi Katan Silk Saree', qty: 1, price: 18900, image: '/images/women.jpg' },
          { name: 'Artisanal Zardozi Velvet Minaudière Clutch', qty: 1, price: 8500, image: '/images/accessories.jpg' },
        ],
        shippingAddress: '7 Lavelle Road, Richmond Town, Bengaluru 560001',
      },
      {
        id: 'LUM-519283',
        customer: 'Karan Mehra',
        email: 'karan.mehra@atelierventures.com',
        phone: '+91 97171 99201',
        date: '2026-09-20',
        amount: 14500,
        status: 'Delivered',
        items: [
          { name: 'Emerald Heritage Silk Kurta & Stole', qty: 1, price: 14500, image: '/images/men.jpg' },
        ],
        shippingAddress: '15 Koregaon Park, Lane 3, Pune 411001',
      },
    ];
    localStorage.setItem('lumiere_admin_orders', JSON.stringify(mockOrders));
  }

  if (!localStorage.getItem('lumiere_admin_subscribers')) {
    const mockSubs = [
      { id: 1, email: 'evelyn.vogue@hauteluxury.com', date: '2026-09-25' },
      { id: 2, email: 'concierge.patron@tajpalaces.com', date: '2026-09-24' },
      { id: 3, email: 'trousseau.client@mehta-weddings.in', date: '2026-09-23' },
      { id: 4, email: 'alyssa.couture@harpersbazaar.co.uk', date: '2026-09-22' },
      { id: 5, email: 'rohan.kapoor@textileguild.in', date: '2026-09-20' },
      { id: 6, email: 'aditi.sharma@emeraldcollectors.com', date: '2026-09-18' },
    ];
    localStorage.setItem('lumiere_admin_subscribers', JSON.stringify(mockSubs));
  }

  if (!localStorage.getItem('lumiere_admin_cms')) {
    const defaultCMS = {
      heroTitle: 'Timeless Styles for Every You',
      heroSubtitle: 'Discover handcrafted elegance, designed for modern living.',
      heroButtonText: 'Shop Now',
      heroImage: '/images/hero.jpg',
      storyTitle: 'Crafted with Passion, Tailored for Eternity',
      storyParagraph: 'At LUMIÈRE, each garment is conceived as an enduring work of art. Born from a reverence for centuries-old hand-loom weaving and intricate zardozi needlework, our studio bridges heirloom traditions with effortless modern silhouettes.',
      storyImage: '/images/story.jpg',
    };
    localStorage.setItem('lumiere_admin_cms', JSON.stringify(defaultCMS));
  }
};

initLocalStorage();

// Admin API Services
export const adminService = {
  // Auth API
  async login(email, password) {
    if (email && password) {
      // Simulate real JWT token payload
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({ email, role: 'admin', exp: Date.now() + 86400000 })
      )}.sIgNaTuRe`;
      localStorage.setItem('admin_token', mockToken);
      localStorage.setItem(
        'admin_user',
        JSON.stringify({ name: 'Abishek / Lead Curator', email, role: 'Super Admin' })
      );
      return { token: mockToken, user: { name: 'Abishek / Lead Curator', email } };
    }
    throw new Error('Invalid email or password credentials.');
  },

  logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('admin_token');
  },

  getCurrentAdmin() {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Products API
  async getProducts() {
    const stored = localStorage.getItem('lumiere_admin_products');
    return stored ? JSON.parse(stored) : [];
  },

  async createProduct(productData) {
    const products = await this.getProducts();
    const newProduct = {
      ...productData,
      id: Date.now(),
      price: Number(productData.price),
      stock: Number(productData.stock || 5),
      image: productData.image || '/images/hero.jpg',
      tag: productData.tag || 'New',
    };
    const updated = [newProduct, ...products];
    localStorage.setItem('lumiere_admin_products', JSON.stringify(updated));
    return newProduct;
  },

  async updateProduct(id, productData) {
    const products = await this.getProducts();
    const updated = products.map((p) =>
      p.id === id ? { ...p, ...productData, price: Number(productData.price), stock: Number(productData.stock) } : p
    );
    localStorage.setItem('lumiere_admin_products', JSON.stringify(updated));
    return updated.find((p) => p.id === id);
  },

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    localStorage.setItem('lumiere_admin_products', JSON.stringify(filtered));
    return { success: true };
  },

  // Orders API
  async getOrders() {
    const stored = localStorage.getItem('lumiere_admin_orders');
    return stored ? JSON.parse(stored) : [];
  },

  async updateOrderStatus(id, newStatus) {
    const orders = await this.getOrders();
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    localStorage.setItem('lumiere_admin_orders', JSON.stringify(updated));
    return updated.find((o) => o.id === id);
  },

  // Subscribers API
  async getSubscribers() {
    const stored = localStorage.getItem('lumiere_admin_subscribers');
    return stored ? JSON.parse(stored) : [];
  },

  exportSubscribersCSV(subscribers) {
    const headers = ['Email Address', 'Date Subscribed'];
    const rows = subscribers.map((s) => [s.email, s.date]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lumiere_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // CMS Content API
  async getContent() {
    const stored = localStorage.getItem('lumiere_admin_cms');
    return stored ? JSON.parse(stored) : {};
  },

  async updateContent(cmsData) {
    localStorage.setItem('lumiere_admin_cms', JSON.stringify(cmsData));
    return cmsData;
  },
};

export default api;
