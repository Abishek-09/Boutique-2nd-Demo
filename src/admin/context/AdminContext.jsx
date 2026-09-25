import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminService } from '../services/api';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => adminService.getCurrentAdmin());
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [cms, setCms] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [prods, ords, subs, cmsData] = await Promise.all([
        adminService.getProducts(),
        adminService.getOrders(),
        adminService.getSubscribers(),
        adminService.getContent(),
      ]);
      setProducts(prods);
      setOrders(ords);
      setSubscribers(subs);
      setCms(cmsData);
    } catch (err) {
      showToast('Error loading atelier data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminService.isAuthenticated()) {
      fetchAllData();
    }
  }, []);

  const login = async (email, password) => {
    const res = await adminService.login(email, password);
    setAdminUser(res.user);
    await fetchAllData();
    showToast(`Welcome to Lumière Atelier Command, ${res.user.name}`);
    return res;
  };

  const logout = () => {
    adminService.logout();
    setAdminUser(null);
    showToast('Signed out of admin dashboard');
  };

  // Product actions
  const addProduct = async (productData) => {
    try {
      const created = await adminService.createProduct(productData);
      setProducts((prev) => [created, ...prev]);
      showToast(`Product "${created.name}" created successfully.`);
      return created;
    } catch (err) {
      showToast('Failed to create product.', 'error');
      throw err;
    }
  };

  const editProduct = async (id, productData) => {
    try {
      const updated = await adminService.updateProduct(id, productData);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      showToast(`Product "${updated.name}" updated successfully.`);
      return updated;
    } catch (err) {
      showToast('Failed to update product.', 'error');
      throw err;
    }
  };

  const removeProduct = async (id) => {
    try {
      await adminService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Product removed from catalog.');
    } catch (err) {
      showToast('Failed to delete product.', 'error');
      throw err;
    }
  };

  // Order actions
  const changeOrderStatus = async (id, status) => {
    try {
      const updated = await adminService.updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      showToast(`Order ${id} status updated to ${status}.`);
      return updated;
    } catch (err) {
      showToast('Failed to update order status.', 'error');
      throw err;
    }
  };

  // CMS actions
  const saveCMS = async (newCms) => {
    try {
      const updated = await adminService.updateContent(newCms);
      setCms(updated);
      showToast('Frontend CMS content updated successfully.');
      return updated;
    } catch (err) {
      showToast('Failed to save CMS changes.', 'error');
      throw err;
    }
  };

  // Subscribers actions
  const exportSubscribers = () => {
    adminService.exportSubscribersCSV(subscribers);
    showToast('Subscribers CSV exported successfully.');
  };

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        login,
        logout,
        products,
        orders,
        subscribers,
        cms,
        loading,
        toast,
        showToast,
        addProduct,
        editProduct,
        removeProduct,
        changeOrderStatus,
        saveCMS,
        exportSubscribers,
        refreshData: fetchAllData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
