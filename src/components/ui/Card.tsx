import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
  const baseStyles = 'bg-slate-800/40 p-6 rounded-lg border backdrop-filter backdrop-blur-[4px] border-border max-w-[600px]';
  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <div className={combinedClassName}>
      {title && (
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
} 