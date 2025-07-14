import React from 'react';
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
export function Textarea({
  className = '',
  ...props
}: TextareaProps) {
  return <textarea className={`flex min-h-24 w-full rounded-md border dark:border-[#3f3f46] light:border-gray-300 
                 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 
                 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]
                 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />;
}