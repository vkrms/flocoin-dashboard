import React from 'react';
import { Upload } from 'lucide-react';
export function ImageUpload() {
  return <div className="border-2 border-dashed border-[#3f3f46] rounded-lg p-8 text-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mb-4">
          <Upload className="h-6 w-6 text-[#8B5CF6]" />
        </div>
        <h3 className="text-base font-medium mb-2">Upload Event Image</h3>
        <p className="text-sm text-gray-400 mb-4">
          Drag and drop or click to browse
        </p>
        <button className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7c3aed] rounded-md text-sm font-medium text-white transition-colors">
          Upload Event Image
        </button>
      </div>
    </div>;
}