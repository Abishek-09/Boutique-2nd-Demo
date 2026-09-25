import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const CartDrawer = () => {
  const { cart, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[#F9F6F0] text-[#383028] shadow-2xl flex flex-col"
          >
            {/* Cart Header */}
            <div className="p-6 bg-[#174A43] text-white flex items-center justify-between border-b border-[#DBC3A5]/20">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5 text-[#DBC3A5]" />
                <h3 className="font-serif text-xl tracking-wide">Your Shopping Bag</h3>
                <span className="text-xs bg-[#A95732] px-2.5 py-0.5 rounded-full font-sans text-white font-medium">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="p-4 bg-[#123632] text-white border-b border-[#DBC3A5]/20 text-xs font-sans">
              <div className="flex justify-between items-center mb-1.5 text-[11px] text-[#DBC3A5]">
                <span>
                  {cartTotal >= freeShippingThreshold ? (
                    <span className="text-[#C8906D] font-medium">✓ You unlocked Complimentary Atelier Shipping!</span>
                  ) : (
                    <span>Add ₹{(freeShippingThreshold - cartTotal).toLocaleString()} more for Free Shipping</span>
                  )}
                </span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C8906D] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-[#174A43]/30 mx-auto mb-3" />
                  <p className="font-serif text-lg text-[#174A43]">Your bag is empty</p>
                  <p className="text-xs text-[#383028]/60 mt-1 font-sans">
                    Discover handcrafted heirloom silhouettes from our new arrivals.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="mt-6 px-6 py-2.5 rounded-lg bg-[#174A43] text-white text-xs uppercase tracking-widest font-sans font-medium hover:bg-[#123632] transition-colors"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex space-x-4 p-3.5 rounded-xl bg-white border border-[#DBC3A5]/40 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-medium text-[#174A43] line-clamp-1">
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#383028]/40 hover:text-[#A95732] p-0.5 ml-2 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs font-sans text-[#C8906D] uppercase tracking-wider mt-0.5">
                          {item.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#DBC3A5] rounded-md overflow-hidden bg-[#F9F6F0]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-0.5 text-xs text-[#174A43] hover:bg-[#DBC3A5]/30 font-medium"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-medium text-[#383028]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-0.5 text-xs text-[#174A43] hover:bg-[#DBC3A5]/30 font-medium"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-semibold text-[#174A43]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-[#DBC3A5]/40 space-y-4">
                <div className="space-y-1.5 text-sm font-sans">
                  <div className="flex justify-between text-[#383028]/70">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#383028]/70">
                    <span>Estimated Taxes &amp; Duties</span>
                    <span className="text-[#174A43] font-medium">Included</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-semibold text-[#174A43] pt-2 border-t border-[#DBC3A5]/20">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout button */}
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all flex items-center justify-center space-x-2 ring-1 ring-[#DBC3A5]/40 hover:ring-white"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-[#383028]/60 font-sans">
                  <ShieldCheck className="w-4 h-4 text-[#174A43]" />
                  <span>256-bit Encrypted Atelier Transaction</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CartDrawer;
