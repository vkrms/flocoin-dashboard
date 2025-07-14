import React, { useState, Children, cloneElement, isValidElement } from 'react';
interface RadioGroupProps {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
  onChange?: (value: string) => void;
}
export function RadioGroup({
  defaultValue,
  children,
  className = '',
  onChange
}: RadioGroupProps) {
  const [value, setValue] = useState(defaultValue || '');
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  return <div className={className}>
      {Children.map(children, child => {
      if (!isValidElement(child)) return child;
      // If it's a direct div or container element
      if (child.type === 'div' || typeof child.type === 'string') {
        return cloneElement(child, {
          ...child.props,
          children: Children.map(child.props.children, nestedChild => {
            if (!isValidElement(nestedChild)) return nestedChild;
            // If it's a RadioGroupItem inside a container
            if (nestedChild.type === RadioGroupItem) {
              return cloneElement(nestedChild, {
                checked: nestedChild.props.value === value,
                onChange: () => handleValueChange(nestedChild.props.value)
              });
            }
            // If it's another container with potentially a RadioGroupItem deeper inside
            return cloneElement(nestedChild, {
              ...nestedChild.props,
              children: Children.map(nestedChild.props.children, deepChild => {
                if (isValidElement(deepChild) && deepChild.type === RadioGroupItem) {
                  return cloneElement(deepChild, {
                    checked: deepChild.props.value === value,
                    onChange: () => handleValueChange(deepChild.props.value)
                  });
                }
                return deepChild;
              })
            });
          })
        });
      }
      // If it's a direct RadioGroupItem
      if (child.type === RadioGroupItem) {
        return cloneElement(child, {
          checked: child.props.value === value,
          onChange: () => handleValueChange(child.props.value)
        });
      }
      return child;
    })}
    </div>;
}
interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
  id: string;
  checked?: boolean;
}
export function RadioGroupItem({
  value,
  id,
  checked,
  onChange,
  ...props
}: RadioGroupItemProps) {
  return <div className="relative flex items-center">
      <input id={id} type="radio" value={value} checked={checked} onChange={onChange} className="sr-only" {...props} />
      <div onClick={onChange as any} className={`h-4 w-4 rounded-full border border-gray-500 flex items-center justify-center cursor-pointer ${checked ? 'border-[#8B5CF6]' : 'bg-[#3a3a3a]'}`}>
        {checked && <div className="h-2 w-2 rounded-full bg-[#8B5CF6]" />}
      </div>
    </div>;
}