import React, { useState } from 'react';
import { X, User, Mail, Lock, Sparkles, LogOut, CheckCircle2, Shield, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, login, logout, showToast } = useShop();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [isLoading, setIsLoading] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginTouched, setLoginTouched] = useState({ email: false, password: false });

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regTouched, setRegTouched] = useState({ name: false, email: false, password: false });

  // Login Validation Checks
  const isLoginEmailValid = EMAIL_REGEX.test(loginEmail.trim());
  const isLoginPasswordValid = loginPassword.length >= 8;
  const isLoginFormValid = isLoginEmailValid && isLoginPasswordValid;

  // Register Validation Checks
  const isRegNameValid = regName.trim().length >= 2;
  const isRegEmailValid = EMAIL_REGEX.test(regEmail.trim());
  const isRegPasswordValid = regPassword.length >= 8;
  const isRegFormValid = isRegNameValid && isRegEmailValid && isRegPasswordValid;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginTouched({ email: true, password: true });
    if (!isLoginFormValid) return;

    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 600)); // Smooth UX transition
      login({
        name: loginEmail.split('@')[0],
        email: loginEmail,
        tier: 'Lumière Privé Member',
        joinedDate: 'September 2026',
      });
      setIsAuthModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegTouched({ name: true, email: true, password: true });
    if (!isRegFormValid) return;

    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      login({
        name: regName,
        email: regEmail,
        phone: regPhone,
        tier: 'Lumière Privé Member',
        joinedDate: 'September 2026',
      });
      setIsAuthModalOpen(false);
    } finally {
      setIsLoading(false);
    }
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
            transition={{ duration: 0.3 }}
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
                className="p-1 rounded-lg text-[#DBC3A5] hover:text-white hover:bg-white/10 transition-colors"
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
                  <div className="flex justify-between items-center">
                    <span>Member Since</span>
                    <span className="text-white">{user.joinedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Atelier Concierge Privilege</span>
                    <span className="text-[#C8906D]">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
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
                  className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-[#DBC3A5]/30 text-white font-sans text-xs uppercase tracking-widest font-medium flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.02]"
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
                  <form onSubmit={handleLoginSubmit} noValidate className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans font-medium mb-1.5">
                        Email Address <span className="text-[#C8906D]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onBlur={() => setLoginTouched((prev) => ({ ...prev, email: true }))}
                          onChange={(e) => {
                            setLoginEmail(e.target.value);
                            if (!loginTouched.email) setLoginTouched((p) => ({ ...p, email: true }));
                          }}
                          placeholder="client@lumiere.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border text-white placeholder-white/40 text-sm font-sans focus:outline-none transition-all duration-300 ${
                            loginTouched.email && !isLoginEmailValid
                              ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                              : 'border-[#DBC3A5]/30 focus:border-[#C8906D]'
                          }`}
                        />
                      </div>
                      {loginTouched.email && !isLoginEmailValid && (
                        <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>Valid email required (e.g., patron@domain.com)</span>
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans font-medium mb-1.5">
                        Password <span className="text-[#C8906D]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={loginPassword}
                          onBlur={() => setLoginTouched((prev) => ({ ...prev, password: true }))}
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                            if (!loginTouched.password) setLoginTouched((p) => ({ ...p, password: true }));
                          }}
                          placeholder="••••••••••••"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border text-white placeholder-white/40 text-sm font-sans focus:outline-none transition-all duration-300 ${
                            loginTouched.password && !isLoginPasswordValid
                              ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                              : 'border-[#DBC3A5]/30 focus:border-[#C8906D]'
                          }`}
                        />
                      </div>
                      {loginTouched.password && !isLoginPasswordValid && (
                        <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>Password must be at least 8 characters long</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs font-sans text-[#DBC3A5]/80 pt-1">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded bg-[#123632] border-[#DBC3A5]/40 text-[#A95732]" />
                        <span>Remember me</span>
                      </label>
                      <a
                        href="#forgot"
                        onClick={(e) => {
                          e.preventDefault();
                          showToast('Password reset link dispatched to your email.');
                        }}
                        className="text-[#C8906D] hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      disabled={!isLoginFormValid || isLoading}
                      className="w-full mt-4 py-3.5 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all duration-300 ring-1 ring-[#DBC3A5]/40 hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <span>Sign In to Lumière</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('guest.patron@lumiere.com');
                        setLoginPassword('luxury2026');
                        setLoginTouched({ email: true, password: true });
                      }}
                      className="w-full text-center text-[11px] font-sans text-[#DBC3A5]/60 hover:text-[#C8906D] pt-1 transition-colors"
                    >
                      Click to autofill demo credentials
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} noValidate className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans font-medium mb-1.5">
                        Full Name <span className="text-[#C8906D]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={regName}
                          onBlur={() => setRegTouched((prev) => ({ ...prev, name: true }))}
                          onChange={(e) => {
                            setRegName(e.target.value);
                            if (!regTouched.name) setRegTouched((p) => ({ ...p, name: true }));
                          }}
                          placeholder="Lady Evelyn Montgomery"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border text-white placeholder-white/40 text-sm font-sans focus:outline-none transition-all duration-300 ${
                            regTouched.name && !isRegNameValid
                              ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                              : 'border-[#DBC3A5]/30 focus:border-[#C8906D]'
                          }`}
                        />
                      </div>
                      {regTouched.name && !isRegNameValid && (
                        <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>Full name is required (minimum 2 letters)</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans font-medium mb-1.5">
                        Email Address <span className="text-[#C8906D]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onBlur={() => setRegTouched((prev) => ({ ...prev, email: true }))}
                          onChange={(e) => {
                            setRegEmail(e.target.value);
                            if (!regTouched.email) setRegTouched((p) => ({ ...p, email: true }));
                          }}
                          placeholder="evelyn@manor.co.uk"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border text-white placeholder-white/40 text-sm font-sans focus:outline-none transition-all duration-300 ${
                            regTouched.email && !isRegEmailValid
                              ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                              : 'border-[#DBC3A5]/30 focus:border-[#C8906D]'
                          }`}
                        />
                      </div>
                      {regTouched.email && !isRegEmailValid && (
                        <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>Valid email required (e.g., patron@domain.com)</span>
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#DBC3A5] font-sans font-medium mb-1.5">
                        Password <span className="text-[#C8906D]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={regPassword}
                          onBlur={() => setRegTouched((prev) => ({ ...prev, password: true }))}
                          onChange={(e) => {
                            setRegPassword(e.target.value);
                            if (!regTouched.password) setRegTouched((p) => ({ ...p, password: true }));
                          }}
                          placeholder="Minimum 8 characters"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#123632] border text-white placeholder-white/40 text-sm font-sans focus:outline-none transition-all duration-300 ${
                            regTouched.password && !isRegPasswordValid
                              ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                              : 'border-[#DBC3A5]/30 focus:border-[#C8906D]'
                          }`}
                        />
                      </div>
                      {regTouched.password && !isRegPasswordValid && (
                        <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>Password must be at least 8 characters long</span>
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!isRegFormValid || isLoading}
                      className="w-full mt-4 py-3.5 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all duration-300 ring-1 ring-[#DBC3A5]/40 hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Creating Sanctuary Profile...</span>
                        </>
                      ) : (
                        <span>Join Lumière Sanctuary</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
