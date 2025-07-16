import React, { useState, Children, cloneElement, isValidElement } from 'react';
interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}
export function Tabs({
  defaultValue,
  children,
  className = ''
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return <div className={className}>
      {Children.map(children, child => {
      if (isValidElement(child)) {
        if (child.type === TabsList) {
          return cloneElement(child as React.ReactElement<any>, {
            activeTab,
            onTabChange: setActiveTab
          });
        }
        if (child.type === TabsContent) {
          return cloneElement(child as React.ReactElement<any>, {
            activeTab
          });
        }
      }
      return child;
    })}
    </div>;
}
interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}
export function TabsList({
  children,
  className = '',
  activeTab,
  onTabChange
}: TabsListProps) {
  return <div className={`inline-flex h-9 items-center justify-center rounded-lg p-1 ${className}`}>
      {Children.map(children, child => {
      if (isValidElement(child) && child.type === TabsTrigger) {
        return cloneElement(child as React.ReactElement<any>, {
          isActive: child.props.value === activeTab,
          onSelect: onTabChange
        });
      }
      return child;
    })}
    </div>;
}
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  isActive?: boolean;
  onSelect?: (value: string) => void;
  className?: string;
}
export function TabsTrigger({
  value,
  children,
  isActive,
  onSelect,
  className = ''
}: TabsTriggerProps) {
  return <button className={`relative mx-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7c3aed] text-white font-semibold shadow-[0_0_10px_rgba(139,92,246,0.5)] border border-[#a78bfa]' : 'text-gray-400 hover:text-white hover:bg-[#3333]'} ${className}`} onClick={() => onSelect && onSelect(value)}>
      {children}
    </button>;
}
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
  className?: string;
}
export function TabsContent({
  value,
  children,
  activeTab,
  className = ''
}: TabsContentProps) {
  if (value !== activeTab) return null;
  return <div className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 ${className}`}>
      {children}
    </div>;
}