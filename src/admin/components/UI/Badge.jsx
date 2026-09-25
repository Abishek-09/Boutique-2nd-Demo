import React from 'react';

const Badge = ({ children, status = 'default', className = '' }) => {
  const normalized = (status || children || '').toString().toLowerCase();

  let styles = 'bg-gray-100 text-gray-700 border-gray-200';

  if (normalized.includes('delivered') || normalized.includes('active') || normalized.includes('published')) {
    styles = 'bg-emerald-50 text-[#174A43] border-emerald-200/60';
  } else if (normalized.includes('shipped') || normalized.includes('processing')) {
    // Terracotta (#C8906D) highlight
    styles = 'bg-[#C8906D]/15 text-[#C8906D] border-[#C8906D]/30';
  } else if (normalized.includes('pending') || normalized.includes('hold')) {
    // Burnt Copper (#A95732)
    styles = 'bg-[#A95732]/10 text-[#A95732] border-[#A95732]/25';
  } else if (normalized.includes('cancelled') || normalized.includes('failed')) {
    styles = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider border ${styles} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {children}
    </span>
  );
};

export default Badge;
