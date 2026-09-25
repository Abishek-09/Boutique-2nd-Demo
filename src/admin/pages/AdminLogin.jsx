import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Shield, Sparkles, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Button from '../components/UI/Button';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const isPasswordValid = password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isFormValid) {
      setError('Please provide valid admin email and password credentials.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = () => {
    setEmail('admin@lumiere-couture.com');
    setPassword('atelier-master-2026');
    setTouched({ email: true, password: true });
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#123632] flex items-center justify-center p-4 selection:bg-[#A95732] selection:text-white relative overflow-hidden">
      {/* Subtle luxury ambient pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #DBC3A5 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Top return link to customer store */}
        <div className="mb-6 flex justify-between items-center text-xs font-sans text-[#DBC3A5]">
          <Link to="/" className="inline-flex items-center space-x-1.5 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique Storefront</span>
          </Link>
          <span className="text-[#C8906D] font-mono text-[11px]">v2.4 SECURE</span>
        </div>

        {/* Login Card */}
        <div className="bg-[#174A43] border border-[#DBC3A5]/40 rounded-3xl p-8 sm:p-10 shadow-2xl text-white">
          <div className="text-center space-y-2 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#C8906D] flex items-center justify-center text-white mx-auto shadow-md">
              <Shield className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h1 className="font-serif text-3xl text-white font-normal tracking-wide pt-2 mb-4">
              LUMIÈRE ADMIN
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#DBC3A5]/80 font-sans mb-6">
              ATELIER MANAGEMENT PORTAL
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-900/50 border border-red-500/50 text-red-200 text-xs font-sans flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-300" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} noValidate className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#DBC3A5] mb-1.5">
                Admin Email <span className="text-[#C8906D]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!touched.email) setTouched((p) => ({ ...p, email: true }));
                  }}
                  placeholder="curator@lumiere-couture.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#123632] border text-white placeholder-white/30 text-sm font-sans focus:outline-none transition-all duration-300 ${
                    touched.email && !isEmailValid
                      ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                      : 'border-[#DBC3A5]/40 focus:border-[#C8906D]'
                  }`}
                />
              </div>
              {touched.email && !isEmailValid && (
                <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Valid admin email required</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#DBC3A5] mb-1.5">
                Password <span className="text-[#C8906D]">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#DBC3A5]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onBlur={() => setTouched((p) => ({ ...p, password: true }))}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!touched.password) setTouched((p) => ({ ...p, password: true }));
                  }}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#123632] border text-white placeholder-white/30 text-sm font-sans focus:outline-none transition-all duration-300 ${
                    touched.password && !isPasswordValid
                      ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                      : 'border-[#DBC3A5]/40 focus:border-[#C8906D]'
                  }`}
                />
              </div>
              {touched.password && !isPasswordValid && (
                <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Password must be at least 8 characters</span>
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                disabled={!isFormValid || loading}
                className="w-full text-xs font-semibold"
              >
                Access Atelier Console
              </Button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={autofillDemo}
                className="text-[11px] font-sans text-[#DBC3A5]/70 hover:text-white underline transition-colors"
              >
                Click to autofill curator demo credentials
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs font-sans text-[#DBC3A5]/50">
          Encrypted 256-Bit SSL Atelier Session &bull; Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
