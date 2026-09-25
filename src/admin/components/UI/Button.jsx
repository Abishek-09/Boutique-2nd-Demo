import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#174A43] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs space-x-1.5',
    md: 'px-4 py-2.5 text-sm space-x-2',
    lg: 'px-6 py-3 text-sm tracking-wide uppercase font-semibold space-x-2.5',
  };

  const variantStyles = {
    // Primary: Burnt Copper (#A95732)
    primary:
      'bg-[#A95732] hover:bg-[#8f4320] text-white shadow-copper hover:shadow-md ring-1 ring-[#DBC3A5]/40',
    // Secondary: Dark Emerald (#174A43)
    secondary:
      'bg-[#174A43] hover:bg-[#123632] text-white shadow-sm ring-1 ring-[#DBC3A5]/25',
    // Outline: Champagne / Espresso border
    outline:
      'bg-white border border-[#DBC3A5] hover:bg-[#F9F6F0] text-[#174A43] shadow-sm',
    // Ghost
    ghost:
      'bg-transparent hover:bg-[#174A43]/5 text-[#174A43]',
    // Danger: Soft crimson
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
