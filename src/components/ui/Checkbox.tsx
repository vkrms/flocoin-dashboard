import React from 'react';
import { Check } from 'lucide-react';
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  checked?: boolean;
  onChange?: () => void;
}
export function Checkbox({
  id,
  className = '',
  checked,
  onChange,
  ...props
}: CheckboxProps) {
  // Use either controlled (checked) or uncontrolled (defaultChecked) pattern
  const isChecked = checked !== undefined ? checked : props.defaultChecked;
  return <div className="relative flex items-center">
      <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={onChange} {...props} />
      <div onClick={onChange} className={`h-4 w-4 rounded border border-[#3f3f46] flex items-center justify-center cursor-pointer ${isChecked ? 'bg-[#8B5CF6] border-[#8B5CF6]' : 'bg-[#3333]'} ${className}`}>
        {isChecked && <Check className="h-3 w-3 text-white" />}
      </div>
    </div>;
}