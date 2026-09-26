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
  // Always initialize or merge product fields
  const storedProds = localStorage.getItem('lumiere_admin_products');
  if (!storedProds) {
    const enriched = initialProducts.map((p) => ({
      ...p,
      stock: Math.floor(Math.random() * 15) + 3,
    }));
    localStorage.setItem('lumiere_admin_products', JSON.stringify(enriched));
  } else {
    // Check if the new flags exist on stored items, else merge them
    const parsed = JSON.parse(storedProds);
    if (!parsed[0] || parsed[0].isNewArrival === undefined) {
      const merged = initialProducts.map((initP) => {
        const found = parsed.find((p) => p.id === initP.id);
        return {
          ...initP,
          stock: found?.stock || Math.floor(Math.random() * 15) + 3,
        };
      });
      localStorage.setItem('lumiere_admin_products', JSON.stringify(merged));
    }
  }

  if (!localStorage.getItem('lumiere_admin_orders')) {
    const mockOrders = [
      {
        id: 'LUM-948123',
        customer: 'Princess Ananya Singh',
        email: 'ananya.singh@royalheritage.in',
        phone: '+91 98201 44821',
        date: '2026-09-24',
        amount: 30400,
        status: 'Delivered',
        items: [
          { name: 'The Emerald Noor Lehenga', qty: 1, price: 30400, image: '/images/hero.jpg' },
        ],
        shippingAddress: '12 Palace View Residences, Jaipur, Rajasthan 302001',
      },
      {
        id: 'LUM-882104',
        customer: 'Vikramaditya Roy',
        email: 'v.roy@mercantile.com',
        phone: '+91 98112 55902',
        date: '2026-09-23',
        amount: 20400,
        status: 'Shipped',
        items: [
          { name: 'Royal Emerald Brocade Bandhgala', qty: 1, price: 20400, image: '/images/men.jpg' },
        ],
        shippingAddress: 'Flat 4B, Malabar Hill Heights, Mumbai 400006',
      },
      {
        id: 'LUM-741982',
        customer: 'Meera Chawla',
        email: 'meera.chawla@coutureclub.org',
        phone: '+91 99304 88124',
        date: '2026-09-22',
        amount: 57800,
        status: 'Pending',
        items: [
          { name: 'Heirloom Colombian Emerald & Polki Choker', qty: 1, price: 57800, image: '/images/jewellery.jpg' },
        ],
        shippingAddress: 'Villa 18, Golf Links, New Delhi 110003',
      },
      {
        id: 'LUM-629401',
        customer: 'Devika Singhania',
        email: 'devika@singhaniacorp.in',
        phone: '+91 98450 11984',
        date: '2026-09-21',
        amount: 25700,
        status: 'Shipped',
        items: [
          { name: 'Terracotta Banarasi Katan Silk Saree', qty: 1, price: 18900, image: '/images/women.jpg' },
          { name: 'Artisanal Zardozi Velvet Minaudière Clutch', qty: 1, price: 6800, image: '/images/accessories.jpg' },
        ],
        shippingAddress: '7 Lavelle Road, Richmond Town, Bengaluru 560001',
      },
      {
        id: 'LUM-519283',
        customer: 'Karan Mehra',
        email: 'karan.mehra@atelierventures.com',
        phone: '+91 97171 99201',
        date: '2026-09-20',
        amount: 11600,
        status: 'Delivered',
        items: [
          { name: 'Emerald Heritage Silk Kurta & Stole', qty: 1, price: 11600, image: '/images/men.jpg' },
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

  // Global Offer Banner Config
  if (!localStorage.getItem('lumiere_admin_banner')) {
    const defaultBanner = {
      enabled: true,
      text: 'Festive Season Grandeur: Complimentary Silk Stole on Orders Above ₹20,000 | Code: LUMIERE20',
      link: '/offers',
      bgColor: '#C8906D', // Terracotta default
      badgeText: 'FESTIVE SALE',
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days countdown
    };
    localStorage.setItem('lumiere_admin_banner', JSON.stringify(defaultBanner));
  }

  // Initial mock notifications
  if (!localStorage.getItem('lumiere_admin_notifications')) {
    const mockNotifications = [
      {
        id: 'notif-1',
        title: 'New High-Value Order #LUM-741982',
        message: 'Meera Chawla placed an order of ₹57,800 for Heirloom Polki Choker.',
        timestamp: '15m ago',
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        type: 'order',
        read: false,
        link: '/admin/orders',
      },
      {
        id: 'notif-2',
        title: 'Low Inventory Alert',
        message: 'Artisanal Zardozi Minaudière has only 2 units left in atelier stock.',
        timestamp: '45m ago',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        type: 'inventory',
        read: false,
        link: '/admin/products',
      },
      {
        id: 'notif-3',
        title: 'New VIP Patron Subscribed',
        message: 'evelyn.vogue@hauteluxury.com subscribed to private atelier previews.',
        timestamp: '2h ago',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        type: 'subscriber',
        read: false,
        link: '/admin/subscribers',
      },
      {
        id: 'notif-4',
        title: 'Consignment Dispatched #LUM-882104',
        message: 'Royal Emerald Brocade Bandhgala dispatched to Mumbai for Vikramaditya Roy.',
        timestamp: 'Yesterday',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        type: 'shipping',
        read: true,
        link: '/admin/orders',
      },
      {
        id: 'notif-5',
        title: 'Festive Campaign Active',
        message: 'Complimentary Silk Stole banner is live and running across store.',
        timestamp: '2d ago',
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        type: 'system',
        read: true,
        link: '/admin/offers',
      },
    ];
    localStorage.setItem('lumiere_admin_notifications', JSON.stringify(mockNotifications));
  }
};

initLocalStorage();

// Admin API Services
export const adminService = {
  // Auth API
  async login(email, password) {
    if (email && password) {
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

  // GET /api/products/new-arrivals (Fetches products where isNewArrival: true)
  async getNewArrivals() {
    const products = await this.getProducts();
    return products.filter((p) => p.isNewArrival === true);
  },

  // GET /api/products/offers (Fetches products where isOnOffer: true)
  async getOffers() {
    const products = await this.getProducts();
    return products.filter((p) => p.isOnOffer === true);
  },

  async createProduct(productData) {
    const products = await this.getProducts();
    const price = Number(productData.price);
    const isOnOffer = Boolean(productData.isOnOffer);
    let discountPrice = productData.discountPrice ? Number(productData.discountPrice) : null;
    let discountPercentage = productData.discountPercentage ? Number(productData.discountPercentage) : null;

    if (isOnOffer) {
      if (discountPrice && !discountPercentage && price > 0) {
        discountPercentage = Math.round(((price - discountPrice) / price) * 100);
      } else if (discountPercentage && !discountPrice && price > 0) {
        discountPrice = Math.round(price * (1 - discountPercentage / 100));
      }
    } else {
      discountPrice = null;
      discountPercentage = null;
    }

    const newProduct = {
      ...productData,
      id: Date.now(),
      price,
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : price,
      isNewArrival: Boolean(productData.isNewArrival),
      isOnOffer,
      discountPrice,
      discountPercentage,
      stock: Number(productData.stock || 5),
      image: productData.image || '/images/hero.jpg',
      tag: productData.isNewArrival ? 'New Arrival' : productData.tag || 'Atelier',
    };
    const updated = [newProduct, ...products];
    localStorage.setItem('lumiere_admin_products', JSON.stringify(updated));
    return newProduct;
  },

  async updateProduct(id, productData) {
    const products = await this.getProducts();
    const price = Number(productData.price);
    const isOnOffer = Boolean(productData.isOnOffer);
    let discountPrice = productData.discountPrice ? Number(productData.discountPrice) : null;
    let discountPercentage = productData.discountPercentage ? Number(productData.discountPercentage) : null;

    if (isOnOffer) {
      if (discountPrice && !discountPercentage && price > 0) {
        discountPercentage = Math.round(((price - discountPrice) / price) * 100);
      } else if (discountPercentage && !discountPrice && price > 0) {
        discountPrice = Math.round(price * (1 - discountPercentage / 100));
      }
    } else {
      discountPrice = null;
      discountPercentage = null;
    }

    const updated = products.map((p) =>
      p.id === id
        ? {
            ...p,
            ...productData,
            price,
            isNewArrival: Boolean(productData.isNewArrival),
            isOnOffer,
            discountPrice,
            discountPercentage,
            stock: Number(productData.stock),
          }
        : p
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

  // Global Offer Banner API: GET & PUT /api/admin/offers
  async getOfferBanner() {
    const stored = localStorage.getItem('lumiere_admin_banner');
    return stored
      ? JSON.parse(stored)
      : {
          enabled: true,
          text: 'Festive Season Grandeur: Complimentary Silk Stole on Orders Above ₹20,000 | Code: LUMIERE20',
          link: '/offers',
          bgColor: '#C8906D',
          badgeText: 'FESTIVE SALE',
          endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        };
  },

  async updateOfferBanner(bannerData) {
    localStorage.setItem('lumiere_admin_banner', JSON.stringify(bannerData));
    return bannerData;
  },

  // Notifications API
  async getNotifications() {
    let stored = localStorage.getItem('lumiere_admin_notifications');
    if (!stored) {
      initLocalStorage();
      stored = localStorage.getItem('lumiere_admin_notifications');
    }
    return stored ? JSON.parse(stored) : [];
  },

  async markNotificationRead(id) {
    const notifications = await this.getNotifications();
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem('lumiere_admin_notifications', JSON.stringify(updated));
    return updated;
  },

  async markAllNotificationsRead() {
    const notifications = await this.getNotifications();
    const updated = notifications.map((n) => ({ ...n, read: true }));
    localStorage.setItem('lumiere_admin_notifications', JSON.stringify(updated));
    return updated;
  },

  async deleteNotification(id) {
    const notifications = await this.getNotifications();
    const updated = notifications.filter((n) => n.id !== id);
    localStorage.setItem('lumiere_admin_notifications', JSON.stringify(updated));
    return updated;
  },

  async clearNotifications() {
    localStorage.setItem('lumiere_admin_notifications', JSON.stringify([]));
    return [];
  },

  async addNotification(notificationData) {
    const notifications = await this.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      createdAt: new Date().toISOString(),
      read: false,
      ...notificationData,
    };
    const updated = [newNotif, ...notifications];
    localStorage.setItem('lumiere_admin_notifications', JSON.stringify(updated));
    return updated;
  },
};

export default api;
