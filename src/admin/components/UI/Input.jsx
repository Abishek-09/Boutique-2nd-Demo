import React from 'react';

const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43]"
        >
          {label}
        </label>
      )}

      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#383028]/40">
            <Icon className="w-4 h-4 stroke-[1.75]" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          className={`w-full py-2.5 px-3.5 ${
            Icon ? 'pl-10' : ''
          } rounded-xl bg-white border ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[#DBC3A5]/60 focus:border-[#C8906D] focus:ring-1 focus:ring-[#C8906D]'
          } text-sm font-sans text-[#383028] placeholder-[#383028]/35 transition-colors focus:outline-none ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs font-sans text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-xs font-sans text-[#383028]/60">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
