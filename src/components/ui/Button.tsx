import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}
export function Button({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#a78bfa] disabled:pointer-events-none disabled:opacity-50';
  const variantStyles = {
    default: 'bg-[#8B5CF6] text-white hover:bg-[#7c3aed] shadow',
    outline: 'border dark:border-[#3f3f46] light:border-gray-300 bg-transparent dark:hover:bg-[#27272a] light:hover:bg-gray-100 dark:hover:text-white light:hover:text-gray-800',
    secondary: 'dark:bg-[#27272a] light:bg-gray-100 dark:text-white light:text-gray-800 dark:hover:bg-[#3f3f46] light:hover:bg-gray-200',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'dark:hover:bg-[#27272a] light:hover:bg-gray-100 dark:hover:text-white light:hover:text-gray-800'
  };
  const sizeStyles = {
    sm: 'h-8 rounded-md px-3 text-xs',
    default: 'h-9 px-4 py-2',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9'
  };
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  return <button className={combinedClassName} {...props}>
      {children}
    </button>;
}