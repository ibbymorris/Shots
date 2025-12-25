import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface ToastProps {
  state: 'idle' | 'loading' | 'success';
}

const Toast: React.FC<ToastProps> = ({ state }) => {
  if (state === 'idle') return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 rounded-full px-5 py-3 flex items-center gap-3 min-w-max">
        {state === 'loading' ? (
          <div className="flex items-center gap-2.5">
            <Loader2 size={16} className="animate-spin text-black/40" />
            <span className="text-[14px] font-medium text-black">Copying to clipboard...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
             <div className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <Check size={12} className="text-white stroke-[4]" />
             </div>
             <span className="text-[14px] font-medium text-[#22c55e]">Copied to clipboard as .png</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;