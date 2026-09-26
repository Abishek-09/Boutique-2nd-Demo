import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import NotificationDropdown from './NotificationDropdown';

const Topbar = ({ onToggleMobileSidebar, searchVal, onSearchChange }) => {
  const { adminUser, unreadNotificationsCount } = useAdmin();
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [internalSearch, setInternalSearch] = useState('');
  const notifRef = useRef(null);

  const currentSearch = searchVal !== undefined ? searchVal : internalSearch;

  const handleSearchChange = (val) => {
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setInternalSearch(val);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && currentSearch.trim()) {
      navigate(`/admin/products?search=${encodeURIComponent(currentSearch.trim())}`);
    }
  };

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsNotifOpen(false);
      }
    };

    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isNotifOpen]);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#F9F6F0] border-b border-gray-200/80 px-4 sm:px-8 flex items-center justify-between shadow-sm">
      {/* Left: Mobile Toggle & Global Quick Search */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 max-w-md">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Sidebar"
          className="lg:hidden p-2 rounded-xl text-[#174A43] hover:bg-white transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#383028]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={currentSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search orders, products, clients..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#DBC3A5]/50 text-xs font-sans text-[#383028] placeholder-[#383028]/40 focus:outline-none focus:border-[#C8906D] transition-colors shadow-2xs"
          />
        </div>
      </div>

      {/* Right: Notifications, Badge, & Admin Profile */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        {/* Notification Bell & Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            className={`p-2 rounded-xl transition-all relative cursor-pointer ${
              isNotifOpen
                ? 'bg-white text-[#C8906D] shadow-sm ring-1 ring-[#DBC3A5]/60'
                : 'text-[#174A43] hover:bg-white hover:text-[#C8906D]'
            }`}
            aria-label="Notifications"
            aria-expanded={isNotifOpen}
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#A95732] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#F9F6F0] shadow-2xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Dropdown Menu */}
          <NotificationDropdown
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
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
