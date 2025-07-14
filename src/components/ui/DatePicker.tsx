import React, { useEffect, useState, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
interface DatePickerProps {
  date?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  position?: 'top' | 'bottom' | 'auto';
}
export function DatePicker({
  date = '',
  onChange,
  placeholder = 'Select date',
  position = 'bottom'
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(date ? new Date(date) : null);
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const ref = useRef<HTMLDivElement>(null);
  const [dropDirection, setDropDirection] = useState<'top' | 'bottom'>('bottom');
  useEffect(() => {
    if (isOpen && ref.current && position === 'auto') {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const contentHeight = 350; // Approximate height of calendar
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
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
    const formattedDate = formatDate(date);
    if (onChange) {
      onChange(formattedDate);
    }
  };
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();
      days.push(<div key={`day-${day}`} className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-sm
            ${isSelected ? 'bg-[#8B5CF6] text-white' : 'hover:bg-[#3f3f46]'}`} onClick={() => handleDateSelect(date)}>
          {day}
        </div>);
    }
    return days;
  };
  return <div ref={ref} className="relative">
      <div className="flex h-9 w-full items-center justify-between rounded-md border border-[#3f3f46] bg-[#27272a] px-3 py-2 text-sm text-white shadow-sm cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedDate ? formatDate(selectedDate) : placeholder}</span>
        <Calendar className="h-4 w-4 opacity-50" />
      </div>
      {isOpen && <div className={`absolute z-50 ${dropDirection === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'} bg-[#27272a] border border-[#3f3f46] rounded-md shadow-lg p-3 w-64`}>
          <div className="flex items-center justify-between mb-4">
            <button onClick={previousMonth} className="p-1 rounded-full hover:bg-[#3f3f46]">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="font-medium">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button onClick={nextMonth} className="p-1 rounded-full hover:bg-[#3f3f46]">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map(day => <div key={day} className="h-8 w-8 flex items-center justify-center text-xs text-gray-400">
                {day}
              </div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          <div className="mt-4 flex justify-between">
            <button onClick={() => {
          const today = new Date();
          handleDateSelect(today);
        }} className="text-xs text-[#8B5CF6] hover:underline">
              Today
            </button>
            <button onClick={() => setIsOpen(false)} className="text-xs text-gray-400 hover:underline">
              Cancel
            </button>
          </div>
        </div>}
    </div>;
}