import React from 'react';
import { X } from 'lucide-react';
interface TagProps {
  label: string;
  onRemove?: () => void;
}
export function Tag({
  label,
  onRemove
}: TagProps) {
  return <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#27272a] border border-[#3f3f46] rounded-md text-sm">
      {label}
      {onRemove && <button type="button" className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-[#3f3f46] transition-colors" onClick={onRemove} aria-label={`Remove ${label} tag`}>
          <X className="h-3 w-3" />
        </button>}
    </div>;
}