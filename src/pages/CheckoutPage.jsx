import React, { useState } from 'react';
import { ShieldCheck, Truck, ArrowRight, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

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

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingInfo.firstName || !shippingInfo.email || !shippingInfo.address) {
      showToast('Please fill in your complete shipping address.');
      return;
    }
    const generatedId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    clearCart();
    showToast(`Order ${generatedId} placed successfully.`);
  };

  if (orderComplete) {
    return (
      <div className="bg-[#F9F6F0] min-h-screen py-20 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white p-8 sm:p-12 rounded-3xl border border-[#DBC3A5]/40 shadow-luxury text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#174A43] text-[#DBC3A5] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold">
            ORDER CONFIRMED
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#174A43]">
            Thank You for Choosing Lumière
          </h2>

          <p className="font-sans text-sm text-[#383028]/80 leading-relaxed font-light">
            Your couture order <strong className="text-[#174A43] font-medium">{orderId}</strong> has been registered at our Mumbai master atelier. A signed Certificate of Authenticity and tracking details have been emailed to <strong>{shippingInfo.email}</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#DBC3A5]/30 text-xs font-sans text-[#383028]/70 space-y-1 text-left">
            <div><strong>Recipient:</strong> {shippingInfo.firstName} {shippingInfo.lastName}</div>
            <div><strong>Destination:</strong> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.pincode}</div>
            <div><strong>Atelier Caretaker:</strong> Master Tailor R. Sharma</div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="w-full py-4 rounded-xl bg-[#174A43] hover:bg-[#123632] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
          >
            Return to Boutique Catalog
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#F9F6F0] min-h-screen py-24 text-center px-4">
        <div className="max-w-md mx-auto space-y-4">
          <Sparkles className="w-12 h-12 text-[#C8906D] mx-auto" />
          <h2 className="font-serif text-3xl text-[#174A43]">Your Shopping Bag is Empty</h2>
          <p className="text-sm font-sans text-[#383028]/70">
            Please select your desired couture silhouettes before proceeding to checkout.
          </p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="mt-4 px-8 py-3.5 rounded-xl bg-[#A95732] text-white text-xs uppercase tracking-widest font-medium"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F6F0] min-h-screen py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 pb-4 border-b border-[#DBC3A5]/40">
          <span className="text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold">
            SAFE &amp; SECURE CHECKOUT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal mt-1">
            Complete Your Atelier Order
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Shipping Address */}
            <div className="p-8 rounded-3xl bg-white border border-[#DBC3A5]/40 shadow-soft space-y-5">
              <h3 className="font-serif text-xl text-[#174A43] font-medium border-b border-[#DBC3A5]/20 pb-3">
                1. Delivery Address &amp; Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  placeholder="Apartment, suite, residence..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.pincode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="p-8 rounded-3xl bg-white border border-[#DBC3A5]/40 shadow-soft space-y-4">
              <h3 className="font-serif text-xl text-[#174A43] font-medium border-b border-[#DBC3A5]/20 pb-3">
                2. Payment Method
              </h3>

              <div className="space-y-3">
                {[
                  { id: 'card', title: 'Credit / Debit Card (Visa, Mastercard, Amex)', desc: 'Bank-grade 256-bit encrypted checkout' },
                  { id: 'upi', title: 'UPI Instant Payment (Google Pay, PhonePe, Paytm)', desc: 'Instant authorization via UPI ID' },
                  { id: 'cod', title: 'Atelier Concierge Cash on Delivery', desc: 'Available for orders within metropolitan regions' },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start space-x-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingInfo.paymentMethod === m.id
                        ? 'border-[#C8906D] bg-[#F9F6F0]'
                        : 'border-[#DBC3A5]/30 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={shippingInfo.paymentMethod === m.id}
                      onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: m.id })}
                      className="mt-1 text-[#A95732]"
                    />
                    <div>
                      <span className="font-serif text-sm font-medium text-[#174A43] block">
                        {m.title}
                      </span>
                      <span className="text-xs text-[#383028]/60 font-sans block mt-0.5">
                        {m.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-white border border-[#DBC3A5]/40 shadow-luxury space-y-6 sticky top-28">
              <h3 className="font-serif text-2xl text-[#174A43] font-normal border-b border-[#DBC3A5]/20 pb-4">
                Order Summary
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-sm text-[#174A43] font-medium line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#C8906D] font-sans">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-serif text-sm font-semibold text-[#174A43]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-[#DBC3A5]/30 pt-4 text-xs font-sans text-[#383028]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Atelier Delivery</span>
                  <span className="text-[#174A43] font-medium">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes &amp; Duties</span>
                  <span className="text-[#174A43] font-medium">Included</span>
                </div>
                <div className="flex justify-between text-base font-serif font-semibold text-[#174A43] pt-3 border-t border-[#DBC3A5]/30">
                  <span>Total Payable</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all flex items-center justify-center space-x-2 ring-1 ring-[#DBC3A5]/40"
              >
                <span>Authorize &amp; Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-[#383028]/60 font-sans">
                <Lock className="w-3.5 h-3.5 text-[#174A43]" />
                <span>Encrypted 256-Bit SSL Atelier Protection</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CheckoutPage;
