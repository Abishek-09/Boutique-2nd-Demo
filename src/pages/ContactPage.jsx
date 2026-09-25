import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2, Sparkles, Send, Loader2, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ContactPage = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bridal & Haute Couture Consultation',
    date: '',
    message: '',
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const validateField = (field, value) => {
    let err = '';
    if (field === 'name') {
      if (!value.trim()) err = 'Full name is required';
      else if (value.trim().length < 2) err = 'Name must be at least 2 characters';
    } else if (field === 'email') {
      if (!value.trim()) err = 'Email address is required';
      else if (!EMAIL_REGEX.test(value.trim())) err = 'Please enter a valid email address';
    } else if (field === 'phone') {
      const cleanPhone = value.replace(/\D/g, '');
      if (!value.trim()) err = 'Phone number is required';
      else if (cleanPhone.length < 10) err = 'Please enter a valid 10-digit phone number';
    }
    return err;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const isFormValid =
    formData.name.trim().length >= 2 &&
    EMAIL_REGEX.test(formData.email.trim()) &&
    formData.phone.replace(/\D/g, '').length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true });

    if (Object.values(newErrors).some(Boolean)) {
      showToast('Please correct the highlighted fields.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsBooked(true);
    showToast(`Atelier appointment request submitted for ${formData.name}.`);
  };

  return (
    <div className="bg-[#F9F6F0] min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.25em] text-[#C8906D] uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATELIER CONCIERGE</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#174A43] font-normal tracking-tight mb-4 leading-tight">
            Connect with Lumière
          </h1>
          <p className="font-sans text-base text-[#383028]/80 font-light leading-relaxed mb-6">
            Whether booking a private trunk show consultation or requesting bespoke customization, our concierge is at your service.
          </p>
        </div>

        {/* 2-Column Split: Contact Info & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#174A43] text-white shadow-luxury space-y-6">
              <h3 className="font-serif text-2xl text-white">The Flagship Atelier</h3>
              
              <div className="space-y-4 text-sm font-sans text-[#DBC3A5]/90">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-[#C8906D] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Lumière Haute Couture Salon</strong>
                    14 Heritage Boulevard, Near Gateway of India, Colaba, Mumbai 400001
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <Phone className="w-5 h-5 text-[#C8906D] flex-shrink-0" />
                  <span>+91 (022) 8492-3400 / +91 98765 43210</span>
                </div>

                <div className="flex items-center space-x-3.5">
                  <Mail className="w-5 h-5 text-[#C8906D] flex-shrink-0" />
                  <span>concierge@lumiere-couture.com</span>
                </div>

                <div className="flex items-start space-x-3.5 pt-3 border-t border-[#DBC3A5]/20">
                  <Clock className="w-5 h-5 text-[#C8906D] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-medium">Salon Visiting Hours</span>
                    Monday – Saturday: 10:30 AM – 8:00 PM IST<br />
                    Sunday: By Private Prior Appointment Only
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#DBC3A5]/40 space-y-3 shadow-soft">
              <h4 className="font-serif text-lg text-[#174A43]">Worldwide Virtual Styling</h4>
              <p className="text-xs font-sans text-[#383028]/70 leading-relaxed font-light">
                Residing outside India? Schedule a high-definition private video consultation with our Master Couturier to inspect silks, embroideries, and gem cuts in real time.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Appointment Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DBC3A5]/40 shadow-soft">
              {isBooked ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-[#C8906D] mx-auto" />
                  <h3 className="font-serif text-3xl text-[#174A43]">Atelier Consultation Requested</h3>
                  <p className="text-sm font-sans text-[#383028]/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Our Head Concierge will contact you within 4 business hours to confirm your private salon appointment.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsBooked(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: 'Bridal & Haute Couture Consultation',
                        date: '',
                        message: '',
                      });
                      setTouched({});
                      setErrors({});
                    }}
                    className="mt-4 px-6 py-3 rounded-xl bg-[#174A43] hover:bg-[#123632] text-white text-xs uppercase tracking-wider font-sans font-medium transition-all duration-300 hover:scale-[1.02]"
                  >
                    Schedule Another Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <h3 className="font-serif text-2xl text-[#174A43] font-normal mb-1">
                      Book a Private Appointment
                    </h3>
                    <p className="text-xs font-sans text-[#383028]/70 font-light mb-6">
                      Fill in your details below and our concierge will curate an exclusive viewing suite for you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                        Your Full Name <span className="text-[#C8906D] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="Princess Ananya Singh"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans text-[#383028] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#174A43] ${
                          touched.name && errors.name
                            ? 'border-[#C8906D] bg-[#FDF9F6]'
                            : 'border-[#DBC3A5]/50'
                        }`}
                      />
                      {touched.name && errors.name && (
                        <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                        Email Address <span className="text-[#C8906D] font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="client@lumiere.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans text-[#383028] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#174A43] ${
                          touched.email && errors.email
                            ? 'border-[#C8906D] bg-[#FDF9F6]'
                            : 'border-[#DBC3A5]/50'
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                        Phone Number <span className="text-[#C8906D] font-bold">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border text-sm font-sans text-[#383028] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#174A43] ${
                          touched.phone && errors.phone
                            ? 'border-[#C8906D] bg-[#FDF9F6]'
                            : 'border-[#DBC3A5]/50'
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-xs text-[#C8906D] mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans text-[#383028] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#174A43]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                      Consultation Category
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans text-[#383028] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#174A43]"
                    >
                      <option>Bridal &amp; Haute Couture Consultation</option>
                      <option>Gentlemen’s Bespoke Bandhgala Fitting</option>
                      <option>Fine Emerald &amp; Polki Jewellery Advisory</option>
                      <option>Virtual Atelier Video Showcase</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#174A43] font-sans font-medium mb-1.5">
                      Bespoke Notes / Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Share occasion details, color preferences, or specific collection inquiries..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/50 text-sm font-sans text-[#383028] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#174A43]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 rounded-xl bg-[#A95732] hover:bg-[#8f4320] text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-copper transition-all duration-300 flex items-center justify-center space-x-2 ring-1 ring-[#DBC3A5]/40 hover:ring-white ${
                      !isFormValid || isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Private Salon Appointment</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
