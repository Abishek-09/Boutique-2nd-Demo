import React from 'react';
import { AlertCircle } from 'lucide-react';

const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  required,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#174A43]"
        >
          {label.replace(/\*$/, '')}
          {(required || label.includes('*')) && (
            <span className="text-[#C8906D] ml-1">*</span>
          )}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#383028]/40">
            <Icon className="w-4 h-4 stroke-[1.75]" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          required={required}
          className={`w-full py-2.5 px-3.5 ${
            Icon ? 'pl-10' : ''
          } rounded-xl bg-white border ${
            error
              ? 'border-[#C8906D] ring-1 ring-[#C8906D] focus:ring-[#C8906D]'
              : 'border-[#DBC3A5]/60 focus:border-[#174A43] focus:ring-2 focus:ring-[#174A43]/20'
          } text-sm font-sans text-[#383028] placeholder-[#383028]/35 transition-all duration-300 focus:outline-none ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs font-sans text-[#A95732] mt-1 flex items-center space-x-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs font-sans text-[#383028]/60 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
