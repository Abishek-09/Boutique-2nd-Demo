import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FileEdit,
  Users,
  Tag,
  LogOut,
  ExternalLink,
  Shield,
  Sparkles,
  X,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { logout, adminUser } = useAdmin();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Offers & Promotions', path: '/admin/offers', icon: Tag },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Content (CMS)', path: '/admin/content', icon: FileEdit },
    { name: 'Subscribers', path: '/admin/subscribers', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#174A43] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-2xl border-r border-[#DBC3A5]/20`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-[#DBC3A5]/15 flex items-center justify-between">
            <Link to="/admin" className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#C8906D]" />
                <span className="font-serif text-xl tracking-[0.2em] font-medium text-white uppercase">
                  LUMIERE
                </span>
              </div>
              <span className="text-[9px] tracking-[0.3em] text-[#DBC3A5] uppercase font-sans -mt-0.5">
                ADMIN CONSOLE
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-[#DBC3A5] hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 font-sans">
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-[#DBC3A5]/60">
              Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white/10 text-white border-l-4 border-[#C8906D] pl-3 shadow-inner'
                        : 'text-[#DBC3A5]/80 hover:text-white hover:bg-white/5 border-l-4 border-transparent pl-3'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 stroke-[1.75] flex-shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Customer Storefront & Logout */}
        <div className="p-4 border-t border-[#DBC3A5]/15 space-y-2">
          {/* Quick link to public boutique */}
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-sans text-[#DBC3A5] hover:text-white transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#C8906D]" />
              <span>Live Storefront</span>
            </span>
            <span className="text-[10px] bg-[#123632] px-2 py-0.5 rounded text-white">View</span>
          </Link>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-sans uppercase tracking-wider font-medium text-red-300 hover:text-white hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4 stroke-[1.75]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
