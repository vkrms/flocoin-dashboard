import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export function Input({
  className = '',
  ...props
}: InputProps) {
  // Create a modified version of props without the value if it's "PA Color Festival"
  // This will allow the placeholder to show instead
  const modifiedProps = {
    ...props
  };
  if (modifiedProps.value === 'PA Color Festival') {
    delete modifiedProps.value;
  }
  // Special handling for capacity field
  if (props.id === 'capacity') {
    // Override the placeholder with "Attendance"
    modifiedProps.placeholder = 'Attendance';
    // If the value is the default "25", remove it to allow placeholder to show
    if (modifiedProps.value === '25') {
      delete modifiedProps.value;
    }
  }
  // Add min/max attributes for number inputs
  if (props.type === 'number') {
    modifiedProps.min = modifiedProps.min || '1';
    modifiedProps.max = modifiedProps.max || '100000'; // Increased max to accommodate larger capacities
  }
  // Determine width class based on input type
  const widthClass = props.type === 'number' ? 'w-32' : 'w-full'; // Increased width for number inputs
  return <input className={`flex h-9 ${widthClass} rounded-md border dark:border-[#3f3f46] light:border-gray-300 
                 dark:bg-[#27272a] light:bg-white px-3 py-2 text-sm 
                 dark:text-white light:text-gray-900 placeholder:dark:text-gray-400 placeholder:light:text-gray-500 
                 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-colors
                 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className}`} aria-label={props.placeholder || props.name || props.id || 'input'} {...modifiedProps} />;
}