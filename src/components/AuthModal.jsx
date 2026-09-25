import React, { useState } from 'react';
import { X, User, Mail, Lock, Sparkles, LogOut, CheckCircle2, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, login, logout, showToast } = useShop();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('Please enter both email and password.');
      return;
    }
    login({
      name: loginEmail.split('@')[0],
      email: loginEmail,
      tier: 'Lumière Privé Member',
      joinedDate: 'September 2026',
    });
    setIsAuthModalOpen(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      showToast('Please fill in all required registration fields.');
      return;
    }
    login({
      name: regName,
      email: regEmail,
      phone: regPhone,
      tier: 'Lumière Privé Member',
      joinedDate: 'September 2026',
    });
    setIsAuthModalOpen(false);
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <div className="min-h-screen px-4 text-center flex items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-[#174A43] border border-[#DBC3A5]/40 rounded-2xl shadow-2xl overflow-hidden text-left relative z-10 text-white"
          >
            {/* Header */}
            <div className="p-6 bg-[#123632] border-b border-[#DBC3A5]/20 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#C8906D]" />
                <h3 className="font-serif text-xl tracking-wider text-white">
                  {user ? 'Atelier Account' : 'Lumière Sanctuary'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="p-1 rounded-lg text-[#DBC3A5] hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {user ? (
              /* Authenticated User Profile View */
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#C8906D] flex items-center justify-center text-white text-xl font-serif">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-white capitalize">{user.name}</h4>
                    <p className="text-xs font-sans text-[#DBC3A5]">{user.email}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#A95732]/40 border border-[#DBC3A5]/30 text-[10px] uppercase tracking-wider text-[#DBC3A5]">
                      {user.tier}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#123632] border border-[#DBC3A5]/20 space-y-2 text-xs font-sans text-[#DBC3A5]">
                  <div className="flex justify-between">
                    <span>Member Since</span>
                    <span className="text-white">{user.joinedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Atelier Concierge Privilege</span>
                    <span className="text-[#C8906D]">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complimentary Tailoring</span>
                    <span className="text-[#C8906D]">Unlimited</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsAuthModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-[#DBC3A5]/30 text-white font-sans text-xs uppercase tracking-widest font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-[#C8906D]" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              /* Sign In / Register Tabs & Forms */
              <div className="p-6 sm:p-8">
                {/* Tabs */}
                <div className="flex border-b border-[#DBC3A5]/25 mb-6">
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className={`flex-1 pb-3 text-xs uppercase tracking-widest font-sans font-medium transition-colors ${
                      tab === 'login'
                        ? 'text-[#C8906D] border-b-2 border-[#C8906D]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab('register')}
                    className={`flex-1 pb-3 text-xs uppercase tracking-widest font-sans font-medium transition-colors ${
                      tab === 'register'
                        ? 'text-[#C8906D] border-b-2 border-[#C8906D]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {tab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="client@lumiere.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border border-[#DBC3A5]/30 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#C8906D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border border-[#DBC3A5]/30 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#C8906D]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-sans text-[#DBC3A5]/80 pt-1">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded bg-[#123632] border-[#DBC3A5]/40 text-[#A95732]" />
                        <span>Remember me</span>
                      </label>
                      <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link dispatched.'); }} className="text-[#C8906D] hover:underline">
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3.5 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all ring-1 ring-[#DBC3A5]/40"
                    >
                      Sign In to Lumière
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('guest.patron@lumiere.com');
                        setLoginPassword('luxury2026');
                      }}
                      className="w-full text-center text-[11px] font-sans text-[#DBC3A5]/60 hover:text-[#C8906D] pt-1"
                    >
                      Click to fill demo credentials
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="Lady Evelyn Montgomery"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border border-[#DBC3A5]/30 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#C8906D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="client@lumiere.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border border-[#DBC3A5]/30 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#C8906D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans mb-1.5">
                        Create Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border border-[#DBC3A5]/30 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#C8906D]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3.5 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all ring-1 ring-[#DBC3A5]/40"
                    >
                      Join Atelier Society
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="p-4 bg-[#123632] border-t border-[#DBC3A5]/20 flex items-center justify-center space-x-2 text-[11px] text-[#DBC3A5]/70">
              <Shield className="w-3.5 h-3.5 text-[#C8906D]" />
              <span>Privileged Data Encryption &amp; Discretion Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
