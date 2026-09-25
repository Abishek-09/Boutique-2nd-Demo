import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminService } from '../admin/services/api';
import { products as fallbackProducts } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [products, setProducts] = useState(fallbackProducts);
  const [offerBanner, setOfferBanner] = useState({
    enabled: true,
    text: 'Festive Season Grandeur: Complimentary Silk Stole on Orders Above ₹20,000 | Code: LUMIERE20',
    link: '/offers',
    bgColor: '#C8906D',
    badgeText: 'FESTIVE SALE',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  });

  const refreshShopData = useCallback(async () => {
    try {
      const [prods, banner] = await Promise.all([
        adminService.getProducts(),
        adminService.getOfferBanner(),
      ]);
      if (prods && prods.length > 0) {
        setProducts(prods);
      }
      if (banner) {
        setOfferBanner(banner);
      }
    } catch (e) {
      console.error('Error fetching shop data:', e);
    }
  }, []);

  useEffect(() => {
    refreshShopData();

    // Listen to changes from Admin console
    const handleStorageChange = () => {
      refreshShopData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('lumiere-data-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('lumiere-data-updated', handleStorageChange);
    };
  }, [refreshShopData]);

  // Initial cart with sample boutique items for demo
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'The Emerald Noor Lehenga',
      category: "Women's Couture",
      price: 30400,
      originalPrice: 34500,
      quantity: 1,
      image: '/images/hero.jpg',
    },
    {
      id: 5,
      name: 'Artisanal Zardozi Velvet Minaudière Clutch',
      category: 'Artisanal Accessories',
      price: 6800,
      originalPrice: 8500,
      quantity: 1,
      image: '/images/accessories.jpg',
    },
  ]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const addToCart = (product, quantity = 1) => {
    const finalPrice =
      product.isOnOffer && product.discountPrice ? Number(product.discountPrice) : Number(product.price);
    const originalPrice = product.isOnOffer && product.discountPrice ? Number(product.price) : (product.originalPrice || null);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            price: finalPrice,
            originalPrice,
            quantity,
          },
        ];
      }
    });
    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from shopping bag.');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const login = (userData) => {
    setUser(userData);
    showToast(`Welcome back to Lumière, ${userData.name || 'valued guest'}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('You have been signed out.');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        user,
        login,
        logout,
        toastMessage,
        showToast,
        products,
        offerBanner,
        refreshShopData,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
