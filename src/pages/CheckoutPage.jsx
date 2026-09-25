import React, { useState } from 'react';
import { ShieldCheck, Truck, ArrowRight, CheckCircle2, Lock, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+ -]{10,15}$/;
const PIN_REGEX = /^[0-9]{5,6}$/;

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart, showToast } = useShop();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
  });

  const [touched, setTouched] = useState({
    firstName: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    state: false,
    pincode: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Field Validations
  const isFirstNameValid = shippingInfo.firstName.trim().length >= 2;
  const isEmailValid = EMAIL_REGEX.test(shippingInfo.email.trim());
  const isPhoneValid = PHONE_REGEX.test(shippingInfo.phone.trim());
  const isAddressValid = shippingInfo.address.trim().length >= 5;
  const isCityValid = shippingInfo.city.trim().length >= 2;
  const isStateValid = shippingInfo.state.trim().length >= 2;
  const isPincodeValid = PIN_REGEX.test(shippingInfo.pincode.trim());

  const isFormValid =
    isFirstNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isAddressValid &&
    isCityValid &&
    isStateValid &&
    isPincodeValid;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      state: true,
      pincode: true,
    });

    if (!isFormValid) return;

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900)); // Natural payment gateway delay
      const generatedId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setOrderComplete(true);
      clearCart();
      showToast(`Order ${generatedId} placed successfully.`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="bg-[#F9F6F0] min-h-screen py-16 md:py-24 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white p-8 sm:p-12 rounded-3xl border border-[#DBC3A5]/40 shadow-luxury text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#174A43] text-[#DBC3A5] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold">
            ORDER CONFIRMED
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#174A43] mb-4">
            Thank You for Choosing Lumière
          </h2>

          <p className="font-sans text-sm text-[#383028]/80 leading-relaxed font-light mb-6">
            Your couture order <strong className="text-[#174A43] font-medium">{orderId}</strong> has been registered at our Mumbai master atelier. A signed Certificate of Authenticity and tracking details have been emailed to <strong>{shippingInfo.email}</strong>.
          </p>

          <div className="p-5 rounded-2xl bg-[#F9F6F0] border border-[#DBC3A5]/30 text-xs font-sans text-[#383028]/70 space-y-1.5 text-left">
            <div><strong>Recipient:</strong> {shippingInfo.firstName} {shippingInfo.lastName}</div>
            <div><strong>Contact:</strong> {shippingInfo.phone}</div>
            <div><strong>Destination:</strong> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</div>
            <div><strong>Atelier Caretaker:</strong> Master Tailor R. Sharma</div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="w-full py-4 rounded-xl bg-[#174A43] hover:bg-[#123632] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]"
          >
            Return to Boutique Catalog
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#F9F6F0] min-h-screen py-16 md:py-24 text-center px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto space-y-4">
          <Sparkles className="w-12 h-12 text-[#C8906D] mx-auto" />
          <h2 className="font-serif text-3xl text-[#174A43] mb-4">Your Shopping Bag is Empty</h2>
          <p className="text-sm font-sans text-[#383028]/70 mb-6 leading-relaxed">
            Please select your desired couture silhouettes before proceeding to checkout.
          </p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="px-8 py-3.5 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:scale-[1.02]"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F6F0] min-h-screen py-16 md:py-24">
      {/* Standard Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 pb-4 border-b border-[#DBC3A5]/40">
          <span className="text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold">
            SAFE &amp; SECURE CHECKOUT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal tracking-tight mt-1 mb-4">
            Complete Your Atelier Order
          </h1>
          <p className="font-sans text-sm text-[#383028]/80 font-light leading-relaxed mb-6">
            Enter your destination details for bespoke insured delivery and certificate registration.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Delivery Address & Contact */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DBC3A5]/40 shadow-soft space-y-5">
              <h3 className="font-serif text-xl text-[#174A43] font-medium border-b border-[#DBC3A5]/20 pb-3 mb-4">
                1. Delivery Address &amp; Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                    First Name <span className="text-[#C8906D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.firstName}
                    onBlur={() => handleBlur('firstName')}
                    onChange={(e) => {
                      setShippingInfo({ ...shippingInfo, firstName: e.target.value });
                      if (!touched.firstName) handleBlur('firstName');
                    }}
                    placeholder="Evelyn"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans focus:outline-none transition-all duration-300 ${
                      touched.firstName && !isFirstNameValid
                        ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                        : 'border-[#DBC3A5]/50 focus:border-[#174A43] focus:ring-1 focus:ring-[#174A43]'
                    }`}
                  />
                  {touched.firstName && !isFirstNameValid && (
                    <p className="text-xs text-[#A95732] mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>First name is required (min 2 characters)</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    placeholder="Montgomery"
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans focus:outline-none focus:border-[#174A43] focus:ring-1 focus:ring-[#174A43] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                    Email Address <span className="text-[#C8906D]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onBlur={() => handleBlur('email')}
                    onChange={(e) => {
                      setShippingInfo({ ...shippingInfo, email: e.target.value });
                      if (!touched.email) handleBlur('email');
                    }}
                    placeholder="client@lumiere.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans focus:outline-none transition-all duration-300 ${
                      touched.email && !isEmailValid
                        ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                        : 'border-[#DBC3A5]/50 focus:border-[#174A43] focus:ring-1 focus:ring-[#174A43]'
                    }`}
                  />
                  {touched.email && !isEmailValid && (
                    <p className="text-xs text-[#A95732] mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>Valid email address required</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                    Phone Number <span className="text-[#C8906D]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onBlur={() => handleBlur('phone')}
                    onChange={(e) => {
                      setShippingInfo({ ...shippingInfo, phone: e.target.value });
                      if (!touched.phone) handleBlur('phone');
                    }}
                    placeholder="+91 98201 44821"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans focus:outline-none transition-all duration-300 ${
                      touched.phone && !isPhoneValid
                        ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                        : 'border-[#DBC3A5]/50 focus:border-[#174A43] focus:ring-1 focus:ring-[#174A43]'
                    }`}
                  />
                  {touched.phone && !isPhoneValid && (
                    <p className="text-xs text-[#A95732] mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>Valid 10-digit phone number required</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                  Street Address &amp; Suite <span className="text-[#C8906D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onBlur={() => handleBlur('address')}
                  onChange={(e) => {
                    setShippingInfo({ ...shippingInfo, address: e.target.value });
                    if (!touched.address) handleBlur('address');
                  }}
                  placeholder="14 Heritage Boulevard, Malabar Hill"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans focus:outline-none transition-all duration-300 ${
                    touched.address && !isAddressValid
                      ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                      : 'border-[#DBC3A5]/50 focus:border-[#174A43] focus:ring-1 focus:ring-[#174A43]'
                  }`}
                />
                {touched.address && !isAddressValid && (
                  <p className="text-xs text-[#A95732] mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>Complete street address is required</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                    City <span className="text-[#C8906D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onBlur={() => handleBlur('city')}
                    onChange={(e) => {
                      setShippingInfo({ ...shippingInfo, city: e.target.value });
                      if (!touched.city) handleBlur('city');
                    }}
                    placeholder="Mumbai"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans focus:outline-none transition-all duration-300 ${
                      touched.city && !isCityValid
                        ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                        : 'border-[#DBC3A5]/50 focus:border-[#174A43] focus:ring-1 focus:ring-[#174A43]'
                    }`}
                  />
                  {touched.city && !isCityValid && (
                    <p className="text-xs text-[#A95732] mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>City required</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                    State <span className="text-[#C8906D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.state}
                    onBlur={() => handleBlur('state')}
                    onChange={(e) => {
                      setShippingInfo({ ...shippingInfo, state: e.target.value });
                      if (!touched.state) handleBlur('state');
                    }}
                    placeholder="Maharashtra"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans focus:outline-none transition-all duration-300 ${
                      touched.state && !isStateValid
                        ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                        : 'border-[#DBC3A5]/50 focus:border-[#174A43] focus:ring-1 focus:ring-[#174A43]'
                    }`}
                  />
                  {touched.state && !isStateValid && (
                    <p className="text-xs text-[#A95732] mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>State required</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                    Postal PIN <span className="text-[#C8906D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.pincode}
                    onBlur={() => handleBlur('pincode')}
                    onChange={(e) => {
                      setShippingInfo({ ...shippingInfo, pincode: e.target.value });
                      if (!touched.pincode) handleBlur('pincode');
                    }}
                    placeholder="400006"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans focus:outline-none transition-all duration-300 ${
                      touched.pincode && !isPincodeValid
                        ? 'border-[#C8906D] ring-1 ring-[#C8906D]'
                        : 'border-[#DBC3A5]/50 focus:border-[#174A43] focus:ring-1 focus:ring-[#174A43]'
                    }`}
                  />
                  {touched.pincode && !isPincodeValid && (
                    <p className="text-xs text-[#A95732] mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>5 or 6 digits</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DBC3A5]/40 shadow-soft space-y-4">
              <h3 className="font-serif text-xl text-[#174A43] font-medium border-b border-[#DBC3A5]/20 pb-3 mb-4">
                2. Payment Selection
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl border border-[#174A43] bg-[#F9F6F0] cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={shippingInfo.paymentMethod === 'card'}
                      onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'card' })}
                      className="text-[#A95732]"
                    />
                    <div>
                      <span className="text-sm font-sans font-medium text-[#174A43] block">
                        Credit / Debit Card (Encrypted)
                      </span>
                      <span className="text-xs font-sans text-[#383028]/60">
                        Visa, Mastercard, American Express, RuPay
                      </span>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-[#174A43]/60" />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border border-[#DBC3A5]/40 hover:bg-[#F9F6F0]/60 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={shippingInfo.paymentMethod === 'upi'}
                      onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'upi' })}
                      className="text-[#A95732]"
                    />
                    <div>
                      <span className="text-sm font-sans font-medium text-[#174A43] block">
                        Instant UPI &amp; NetBanking
                      </span>
                      <span className="text-xs font-sans text-[#383028]/60">
                        Google Pay, PhonePe, Paytm, All Major Indian Banks
                      </span>
                    </div>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#C8906D]" />
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-white border border-[#DBC3A5]/40 shadow-luxury space-y-6">
              <h3 className="font-serif text-2xl text-[#174A43] font-medium border-b border-[#DBC3A5]/20 pb-4 mb-4">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="max-h-72 overflow-y-auto space-y-4 pr-1 divide-y divide-[#DBC3A5]/20">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-xl border border-[#DBC3A5]/30 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-[#174A43] truncate font-medium">
                        {item.name}
                      </h4>
                      <p className="text-xs font-sans text-[#383028]/60">Qty: {item.quantity}</p>
                      <p className="text-xs font-serif font-semibold text-[#A95732] mt-0.5">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="pt-4 border-t border-[#DBC3A5]/30 space-y-2.5 text-xs font-sans text-[#383028]/80">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} Silhouettes)</span>
                  <span className="font-medium text-[#174A43]">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Insured Bespoke Courier Delivery</span>
                  <span className="text-[#C8906D] font-medium uppercase tracking-wider">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Atelier Preservation Packaging</span>
                  <span className="text-[#C8906D] font-medium uppercase tracking-wider">INCLUDED</span>
                </div>
                <div className="pt-3 border-t border-[#DBC3A5]/40 flex justify-between items-baseline">
                  <span className="font-serif text-base font-semibold text-[#174A43]">Total Amount</span>
                  <span className="font-serif text-2xl font-bold text-[#A95732]">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA Button with Disabled State and Spinner */}
              <button
                type="submit"
                disabled={!isFormValid || isProcessing}
                className="w-full py-4 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all duration-300 ring-1 ring-[#DBC3A5]/40 hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Confirming Couture Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize &amp; Place Order &bull; ₹{cartTotal.toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] font-sans text-[#383028]/60">
                <Truck className="w-3.5 h-3.5 text-[#C8906D]" />
                <span>Express Insured White-Glove Dispatch</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CheckoutPage;
