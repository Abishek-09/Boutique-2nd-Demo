import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAdmin } from '../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import ScrollToTop from '../../components/ScrollToTop';

const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { toast } = useAdmin();

  return (
    <div className="min-h-screen bg-[#F9F6F0] font-sans text-[#383028] flex flex-col selection:bg-[#C8906D] selection:text-white">
      <ScrollToTop />
      {/* Sidebar: Fixed Dark Emerald #174A43 */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Column with Desktop Sidebar offset */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Topbar: Ivory Mist #F9F6F0 with subtle shadow */}
        <Topbar onToggleMobileSidebar={() => setIsMobileOpen(true)} />

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Admin Action Feedback Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-20 right-6 sm:bottom-24 sm:right-8 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-xl text-white shadow-2xl border ${
              toast.type === 'error'
                ? 'bg-red-800 border-red-500/40'
                : 'bg-[#174A43] border-[#DBC3A5]/40'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
                toast.type === 'error' ? 'bg-red-600' : 'bg-[#C8906D]'
              }`}
            >
              {toast.type === 'error' ? (
                <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
            </div>
            <span className="text-xs font-sans tracking-wide font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
