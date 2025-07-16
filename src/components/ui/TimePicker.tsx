import React, { useEffect, useState, useRef } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
interface TimePickerProps {
  time?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  position?: 'top' | 'bottom' | 'auto';
}
export function TimePicker({
  time = '',
  onChange,
  placeholder = 'Select time',
  position = 'bottom'
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(time ? parseInt(time.split(':')[0]) : 12);
  const [selectedMinute, setSelectedMinute] = useState(time ? parseInt(time.split(':')[1]) : 0);
  const [period, setPeriod] = useState(selectedHour >= 12 ? 'PM' : 'AM');
  const ref = useRef<HTMLDivElement>(null);
  const [dropDirection, setDropDirection] = useState<'top' | 'bottom'>('bottom');
  useEffect(() => {
    if (isOpen && ref.current && position === 'auto') {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const contentHeight = 200; // Approximate height of time picker dropdown
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
  useEffect(() => {
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      setSelectedHour(hours);
      setSelectedMinute(minutes);
      setPeriod(hours >= 12 ? 'PM' : 'AM');
    }
  }, [time]);
  const formatTime = (hour: number, minute: number, ampm: string): string => {
    let displayHour = hour;
    if (ampm === 'PM' && hour < 12) displayHour += 12;
    if (ampm === 'AM' && hour === 12) displayHour = 0;
    return `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };
  const handleTimeSelect = () => {
    const formattedTime = formatTime(selectedHour, selectedMinute, period);
    setIsOpen(false);
    if (onChange) {
      onChange(formattedTime);
    }
  };
  const incrementHour = () => {
    setSelectedHour(prev => prev % 12 + 1);
  };
  const decrementHour = () => {
    setSelectedHour(prev => prev === 1 ? 12 : prev - 1);
  };
  const incrementMinute = () => {
    setSelectedMinute(prev => (prev + 5) % 60);
  };
  const decrementMinute = () => {
    setSelectedMinute(prev => (prev - 5 + 60) % 60);
  };
  const togglePeriod = () => {
    setPeriod(prev => prev === 'AM' ? 'PM' : 'AM');
  };
  const displayTime = selectedHour && selectedMinute !== undefined ? `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${period}` : placeholder;
  return <div ref={ref} className="relative">
      <div className="flex h-9 w-full items-center justify-between rounded-md border border-[#3f3f46] bg-[#3333] px-3 py-2 text-sm text-white shadow-sm cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span>{displayTime}</span>
        <Clock className="h-4 w-4 opacity-50" />
      </div>
      {isOpen && <div className={`absolute z-50 ${dropDirection === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'} bg-popover border border-border rounded-md shadow-lg p-4 w-56`}>
          <div className="flex justify-center items-center gap-4">
            {/* Hour picker */}
            <div className="flex flex-col items-center">
              <button onClick={incrementHour} className="p-1 rounded-full hover:bg-[#3f3f46]">
                <ChevronUp className="h-4 w-4" />
              </button>
              <div className="text-2xl font-medium w-12 text-center">
                {selectedHour.toString().padStart(2, '0')}
              </div>
              <button onClick={decrementHour} className="p-1 rounded-full hover:bg-[#3f3f46]">
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="text-2xl">:</div>
            {/* Minute picker */}
            <div className="flex flex-col items-center">
              <button onClick={incrementMinute} className="p-1 rounded-full hover:bg-[#3f3f46]">
                <ChevronUp className="h-4 w-4" />
              </button>
              <div className="text-2xl font-medium w-12 text-center">
                {selectedMinute.toString().padStart(2, '0')}
              </div>
              <button onClick={decrementMinute} className="p-1 rounded-full hover:bg-[#3f3f46]">
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            {/* AM/PM toggle */}
            <button onClick={togglePeriod} className="ml-2 px-2 py-1 rounded bg-[#3f3f46] hover:bg-[#4f4f56]">
              {period}
            </button>
          </div>
          <div className="mt-4 flex justify-between">
            <button onClick={() => {
          const now = new Date();
          setSelectedHour(now.getHours() > 12 ? now.getHours() - 12 : now.getHours() === 0 ? 12 : now.getHours());
          setSelectedMinute(Math.floor(now.getMinutes() / 5) * 5);
          setPeriod(now.getHours() >= 12 ? 'PM' : 'AM');
          handleTimeSelect();
        }} className="text-xs text-[#8B5CF6] hover:underline">
              Now
            </button>
            <div>
              <button onClick={() => setIsOpen(false)} className="text-xs text-gray-400 hover:underline mr-3">
                Cancel
              </button>
              <button onClick={handleTimeSelect} className="text-xs text-[#8B5CF6] hover:underline">
                Apply
              </button>
            </div>
          </div>
        </div>}
    </div>;
}