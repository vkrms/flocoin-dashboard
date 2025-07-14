import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { EventForm } from './components/EventForm';
import { Menu, X } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  return <ThemeProvider>
      <div className="bg-[#09090b] dark:bg-[#09090b] light:bg-[#f8f9fa] h-screen flex flex-col text-gray-800 dark:text-white light:text-gray-800 font-sans">
        {/* Mobile header with menu button */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#1c1c1f] dark:bg-[#1c1c1f] light:bg-white sticky top-0 z-20 border-b border-[#27272a] dark:border-[#27272a] light:border-gray-200">
          <div className="flex items-center gap-2">
            {/* Show icon on all screen sizes */}
            <img src="/eventflo-icon.png" alt="eventflo icon" className="h-8 w-auto" />
            {/* Hide full logo on all screen sizes */}
            <img src="/eventflo-logo.png" alt="eventflo logo" className="h-8 w-auto hidden" />
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-[#27272a] dark:hover:bg-[#27272a] light:hover:bg-gray-100" aria-label="Toggle menu">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {/* Mobile sidebar overlay */}
          <div className={`fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
          {/* Sidebar - hidden by default on mobile, shown when sidebarOpen is true */}
          <div className={`fixed top-0 left-0 z-20 h-full ${sidebarCollapsed ? 'w-[70px]' : 'w-[240px]'} lg:relative lg:block transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <Sidebar onClose={() => setSidebarOpen(false)} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
          </div>
          {/* Main content */}
          <main className="flex-1 overflow-auto p-4 lg:p-8">
            <EventForm />
          </main>
        </div>
      </div>
    </ThemeProvider>;
}