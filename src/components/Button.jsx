// src/components/Button.jsx
import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-gray-50',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary/5',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}