import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  ShoppingBag,
  AlertTriangle,
  Users,
  CheckCircle2,
  Sparkles,
  CheckCheck,
  Trash2,
  X,
  ChevronRight,
  Clock,
  Inbox,
  Check,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    removeNotification,
    clearAllNotifications,
  } = useAdmin();

  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    return true;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#FDF4EE] border border-[#C8906D]/30 flex items-center justify-center text-[#C8906D] shrink-0">
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
          </div>
        );
      case 'inventory':
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-300/40 flex items-center justify-center text-amber-700 shrink-0">
            <AlertTriangle className="w-4 h-4 stroke-[2]" />
          </div>
        );
      case 'subscriber':
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-300/40 flex items-center justify-center text-[#174A43] shrink-0">
            <Users className="w-4 h-4 stroke-[2]" />
          </div>
        );
      case 'shipping':
        return (
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-300/40 flex items-center justify-center text-teal-700 shrink-0">
            <CheckCircle2 className="w-4 h-4 stroke-[2]" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-300/40 flex items-center justify-center text-[#A95732] shrink-0">
            <Sparkles className="w-4 h-4 stroke-[2]" />
          </div>
        );
    }
  };

  const handleNotificationClick = (notif) => {
    if (!notif.read) {
      markNotificationAsRead(notif.id);
    }
    if (notif.link) {
      navigate(notif.link);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed left-4 right-4 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-full mt-2 sm:w-[410px] bg-white rounded-2xl shadow-2xl border border-[#DBC3A5]/40 overflow-hidden z-50 flex flex-col font-sans"
        >
          {/* Header */}
          <div className="p-4 sm:px-5 sm:py-4 bg-[#F9F6F0] border-b border-[#DBC3A5]/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#174A43] text-[#DBC3A5] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#174A43] tracking-wide">
                Notifications
              </h3>
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider bg-[#A95732] text-white rounded-full">
                  {unreadNotificationsCount} New
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1.5">
              {unreadNotificationsCount > 0 && (
                <button
                  type="button"
                  onClick={markAllNotificationsAsRead}
                  title="Mark all as read"
                  className="inline-flex items-center space-x-1 text-[11px] font-medium text-[#174A43] hover:text-[#A95732] bg-white hover:bg-stone-50 border border-[#DBC3A5]/40 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-[#A95732]" />
                  <span className="hidden sm:inline">Mark all read</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close notifications"
                className="p-1 rounded-lg text-stone-500 hover:text-[#174A43] hover:bg-stone-200/50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between bg-white text-xs">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-[#174A43] text-white shadow-2xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filter === 'unread'
                    ? 'bg-[#174A43] text-white shadow-2xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                Unread ({unreadNotificationsCount})
              </button>
            </div>

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearAllNotifications}
                className="text-[11px] text-stone-400 hover:text-red-600 transition-colors flex items-center space-x-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear tray</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-stone-100">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#F9F6F0] border border-[#DBC3A5]/40 flex items-center justify-center text-[#C8906D] mb-3">
                  <Inbox className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#174A43] mb-1">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                </h4>
                <p className="text-xs text-stone-500 max-w-[240px]">
                  {filter === 'unread'
                    ? 'You have reviewed all recent updates and alerts.'
                    : 'All atelier orders, stock updates, and patron alerts will appear here.'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`group relative p-3.5 sm:p-4 flex items-start space-x-3 transition-colors cursor-pointer ${
                    notif.read ? 'bg-white hover:bg-[#F9F6F0]/60' : 'bg-[#FDF9F5] hover:bg-[#F8EFE7]/80'
                  }`}
                >
                  {/* Type Icon */}
                  {getNotificationIcon(notif.type)}

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center space-x-2 mb-0.5">
                      <h4
                        className={`text-xs font-semibold truncate ${
                          notif.read ? 'text-stone-800' : 'text-[#174A43]'
                        }`}
                      >
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A95732] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed mb-1.5">
                      {notif.message}
                    </p>
                    <div className="flex items-center space-x-3 text-[10px] text-stone-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{notif.timestamp}</span>
                      </span>
                      {notif.link && (
                        <span className="text-[#A95732] group-hover:underline flex items-center">
                          View details
                          <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions (hover delete or mark read) */}
                  <div className="absolute right-3 top-3.5 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notif.read && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationAsRead(notif.id);
                        }}
                        title="Mark as read"
                        className="p-1 rounded text-stone-400 hover:text-emerald-700 hover:bg-stone-200/50"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notif.id);
                      }}
                      title="Remove notification"
                      className="p-1 rounded text-stone-400 hover:text-red-600 hover:bg-stone-200/50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-[#F9F6F0] border-t border-[#DBC3A5]/30 flex items-center justify-between text-xs">
            <span className="text-[11px] text-stone-500">Lumière Atelier Alert Center</span>
            <button
              type="button"
              onClick={() => {
                navigate('/admin/orders');
                onClose();
              }}
              className="text-[11px] font-semibold text-[#174A43] hover:text-[#A95732] flex items-center space-x-1"
            >
              <span>Go to Orders</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
