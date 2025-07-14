import React, { useEffect, useState, useRef, Children, isValidElement } from 'react';
import { ChevronDown, Check } from 'lucide-react';
interface SelectProps {
  children: React.ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
  'data-position'?: 'top' | 'bottom' | 'auto';
}
export function Select({
  children,
  defaultValue,
  onChange,
  'data-position': position = 'bottom'
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || '');
  const ref = useRef<HTMLDivElement>(null);
  const [dropDirection, setDropDirection] = useState<'top' | 'bottom'>('bottom');
  // Check available space and set dropdown direction when opening
  useEffect(() => {
    if (isOpen && ref.current && position === 'auto') {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const contentHeight = 200; // Approximate height of dropdown content
      if (spaceBelow < contentHeight && spaceAbove > spaceBelow) {
        setDropDirection('top');
      } else {
        setDropDirection('bottom');
      }
    } else if (position === 'top') {
      setDropDirection('top');
    } else {
      setDropDirection('bottom');
    }
  }, [isOpen, position]);
  // Handle clicks outside the select component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Handle escape key to close dropdown
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setIsOpen(false);
    if (onChange) {
      onChange(newValue);
    }
  };
  // Extract placeholder from SelectValue
  let placeholder = 'Category';
  Children.forEach(children, child => {
    if (isValidElement(child) && child.type === SelectTrigger) {
      Children.forEach(child.props.children, triggerChild => {
        if (isValidElement(triggerChild) && triggerChild.type === SelectValue) {
          placeholder = triggerChild.props.placeholder;
        }
      });
    }
  });
  // Find the selected item's display text
  let selectedItemText = '';
  Children.forEach(children, child => {
    if (isValidElement(child) && child.type === SelectContent) {
      Children.forEach(child.props.children, contentChild => {
        if (isValidElement(contentChild) && contentChild.type === SelectItem && contentChild.props.value === value) {
          selectedItemText = contentChild.props.children;
        }
      });
    }
  });
  // Filter and render children based on their type
  const triggerChild = Children.toArray(children).find(child => isValidElement(child) && child.type === SelectTrigger);
  const contentChild = Children.toArray(children).find(child => isValidElement(child) && child.type === SelectContent);
  return <div className="relative" ref={ref}>
      <div className="flex h-9 w-full items-center justify-between rounded-md 
                   dark:border-[#3f3f46] light:border-gray-300 border
                   dark:bg-[#27272a] light:bg-white px-3 py-2 text-sm 
                   dark:text-white light:text-gray-900 shadow-sm 
                   dark:hover:bg-[#2d2d33] light:hover:bg-gray-50 cursor-pointer" onClick={() => setIsOpen(!isOpen)} role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" tabIndex={0}>
        <div className="flex items-center">
          {value ? <>
              <span className="dark:text-gray-400 light:text-gray-500 mr-1">
                {placeholder}:
              </span>
              <span>{selectedItemText}</span>
            </> : <span>{placeholder}</span>}
        </div>
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && contentChild && <div className={`absolute ${dropDirection === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'} left-0 right-0 z-50`}>
          <div className="dark:bg-[#27272a] light:bg-white 
                       dark:border-[#3f3f46] light:border-gray-300 border
                       rounded-md py-1 shadow-md max-h-60 overflow-auto" role="listbox">
            {isValidElement(contentChild) && Children.map(contentChild.props.children, item => {
          if (isValidElement(item) && item.type === SelectItem) {
            const isSelected = item.props.value === value;
            return <div className={`px-3 py-2 text-sm cursor-pointer 
                                 dark:hover:bg-[#3f3f46] light:hover:bg-gray-100 
                                 flex items-center justify-between 
                                 ${isSelected ? 'bg-[#8B5CF6]/20 text-[#8B5CF6]' : 'dark:text-white light:text-gray-900'}`} onClick={e => {
              e.stopPropagation();
              handleValueChange(item.props.value);
            }} role="option" aria-selected={isSelected}>
                      <span>{item.props.children}</span>
                      {isSelected && <Check className="h-4 w-4 ml-2" />}
                    </div>;
          }
          return null;
        })}
          </div>
        </div>}
    </div>;
}
// These components are now simplified to be mostly for structure
export function SelectTrigger({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
export function SelectValue({
  placeholder
}: {
  placeholder: string;
}) {
  return <>{placeholder}</>;
}
export function SelectContent({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
export function SelectItem({
  value,
  children
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}