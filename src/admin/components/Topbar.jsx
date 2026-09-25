import React from 'react';
import { Menu, Search, Bell, Sparkles, User } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Topbar = ({ onToggleMobileSidebar, searchVal = '', onSearchChange }) => {
  const { adminUser } = useAdmin();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#F9F6F0] border-b border-gray-200/80 px-4 sm:px-8 flex items-center justify-between shadow-sm">
      {/* Left: Mobile Toggle & Global Quick Search */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 max-w-md">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Sidebar"
          className="lg:hidden p-2 rounded-xl text-[#174A43] hover:bg-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#383028]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search orders, products, clients..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#DBC3A5]/50 text-xs font-sans text-[#383028] placeholder-[#383028]/40 focus:outline-none focus:border-[#C8906D] transition-colors shadow-2xs"
          />
        </div>
      </div>

      {/* Right: Notifications, Badge, & Admin Profile */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            className="p-2 rounded-xl text-[#174A43] hover:bg-white transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A95732] ring-2 ring-[#F9F6F0]" />
          </button>
        </div>

        <div className="h-6 w-[1px] bg-[#DBC3A5]/40 hidden sm:block" />

        {/* Admin Avatar & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-[#174A43] text-[#DBC3A5] flex items-center justify-center font-serif text-sm font-medium shadow-sm">
            {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
          </div>

          <div className="hidden sm:block text-left">
            <h4 className="text-xs font-semibold text-[#174A43] font-sans line-clamp-1">
              {adminUser?.name || 'Abishek / Lead Curator'}
            </h4>
            <span className="text-[10px] text-[#A95732] font-sans font-medium uppercase tracking-wider block">
              {adminUser?.role || 'Super Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
