import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Mail, LifeBuoy, Settings, ChevronLeft, ChevronRight, PlusCircle, ChevronDown } from 'lucide-react';
interface SidebarProps {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}
export function Sidebar({
  onClose,
  collapsed = false,
  onToggleCollapse
}: SidebarProps) {
  return <aside className={`h-full bg-[#18181b] dark:bg-[#18181b] light:bg-white border-r border-[#27272a] dark:border-[#27272a] light:border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'lg:w-[70px]' : 'lg:w-[240px]'}`}>
      <div className="flex h-16 items-center justify-center border-b border-[#27272a] dark:border-[#27272a] light:border-gray-200 px-4">
        {collapsed ? <img src="/eventflo-icon.png" alt="eventflo icon" className="h-8 w-auto" /> : <div className="flex items-center gap-2">
            <img src="/eventflo-logo.png" alt="eventflo logo" className="h-8 w-auto flex-shrink-0" />
          </div>}
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={onClose} collapsed={collapsed} />
          <NavItem icon={<Calendar size={20} />} label="Events" active onClick={onClose} collapsed={collapsed} subItems={[{
          label: 'Create Event',
          active: true
        }, {
          label: 'Active Events',
          active: false
        }]} />
          <NavItem icon={<Mail size={20} />} label="Email" onClick={onClose} collapsed={collapsed} />
          <NavItem icon={<LifeBuoy size={20} />} label="Support" onClick={onClose} collapsed={collapsed} />
          <NavItem icon={<Settings size={20} />} label="Settings" onClick={onClose} collapsed={collapsed} />
        </nav>
      </div>
      <div className="border-t border-[#27272a] dark:border-[#27272a] light:border-gray-200 p-4 space-y-3">
        <button className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md bg-[#8B5CF6] hover:bg-[#7c3aed] text-white transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <PlusCircle size={16} />
          {!collapsed && <span>New Event</span>}
        </button>
        <button onClick={onToggleCollapse} className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md hover:bg-[#27272a] dark:hover:bg-[#27272a] light:hover:bg-gray-100 text-gray-400 hover:text-white dark:hover:text-white light:hover:text-gray-800 transition-colors ${collapsed ? 'justify-center' : ''}`}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>;
}
interface SubItemProps {
  label: string;
  active: boolean;
}
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
  subItems?: SubItemProps[];
}
function NavItem({
  icon,
  label,
  active,
  onClick,
  collapsed = false,
  subItems
}: NavItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    if (subItems && subItems.length > 0 && !collapsed) {
      setIsOpen(!isOpen);
    } else if (onClick) {
      onClick();
    }
  };
  return <div className="space-y-1">
      <div className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${collapsed ? 'justify-center' : ''} ${active ? 'bg-[#8B5CF6]/20 dark:bg-[#8B5CF6]/20 light:bg-[#8B5CF6]/20 text-white dark:text-white light:text-gray-800' : 'text-gray-400 hover:bg-[#27272a] dark:hover:bg-[#27272a] light:hover:bg-gray-100 hover:text-white dark:hover:text-white light:hover:text-gray-800'}`} onClick={handleClick} title={collapsed ? label : undefined}>
        {icon}
        {!collapsed && <>
            <span className="text-sm font-medium flex-1">{label}</span>
            {subItems && subItems.length > 0 && <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
          </>}
        {active && !collapsed && !subItems && <div className="ml-auto w-1.5 h-5 bg-[#8B5CF6] rounded-full"></div>}
      </div>
      {/* Submenu items */}
      {!collapsed && subItems && subItems.length > 0 && isOpen && <div className="pl-9 space-y-1">
          {subItems.map((item, index) => <div key={index} className={`flex items-center px-3 py-1.5 rounded-md cursor-pointer transition-colors ${item.active ? 'bg-[#8B5CF6]/20 dark:bg-[#8B5CF6]/20 light:bg-[#8B5CF6]/20 text-white dark:text-white light:text-gray-800' : 'text-gray-400 hover:bg-[#27272a] dark:hover:bg-[#27272a] light:hover:bg-gray-100 hover:text-white dark:hover:text-white light:hover:text-gray-800'}`}>
              <span className="text-sm">{item.label}</span>
              {item.active && <div className="ml-auto w-1.5 h-4 bg-[#8B5CF6] rounded-full"></div>}
            </div>)}
        </div>}
    </div>;
}