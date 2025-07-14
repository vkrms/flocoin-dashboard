import React from 'react';
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}
export function Label({
  children,
  className = '',
  ...props
}: LabelProps) {
  return <label className={`text-sm font-medium text-gray-200 ${className}`} {...props}>
      {children}
    </label>;
}