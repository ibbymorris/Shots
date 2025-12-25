import React, { useState } from 'react';

const ExportMenu: React.FC = () => {
  const [format, setFormat] = useState<'PNG' | 'JPEG'>('PNG');
  const [quality, setQuality] = useState<'1x' | '2x' | '3x'>('1x');

  return (
    <div className="absolute top-[calc(100%+8px)] right-0 w-[280px] bg-white rounded-[20px] shadow-2xl border border-black/5 p-3 flex flex-col gap-3 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
      
      {/* Export Format Section */}
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-bold text-black/40 uppercase tracking-wide px-1">Export format</span>
        <div className="bg-[#f4f4f5] rounded-[12px] p-[3px] flex gap-[3px]">
          <button 
            onClick={() => setFormat('PNG')}
            className={`flex-1 flex flex-col items-center justify-center py-1 rounded-[9px] transition-all relative ${format === 'PNG' ? 'text-black' : 'text-black/50 hover:text-black/70'}`}
          >
             {format === 'PNG' && (
                 <div className="absolute inset-0 bg-white rounded-[9px] shadow-[0_3px_6px_-3px_rgba(0,0,0,0.2)]"></div>
             )}
             <span className="relative z-10 text-[15px] font-semibold leading-5">PNG</span>
          </button>
          <button 
            onClick={() => setFormat('JPEG')}
            className={`flex-1 flex flex-col items-center justify-center py-1 rounded-[9px] transition-all relative ${format === 'JPEG' ? 'text-black' : 'text-black/50 hover:text-black/70'}`}
          >
             {format === 'JPEG' && (
                 <div className="absolute inset-0 bg-white rounded-[9px] shadow-[0_3px_6px_-3px_rgba(0,0,0,0.2)]"></div>
             )}
             <span className="relative z-10 text-[15px] font-semibold leading-5">JPEG</span>
          </button>
        </div>
      </div>

      {/* Export Quality Section */}
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-bold text-black/40 uppercase tracking-wide px-1">Export quality</span>
        <div className="bg-[#f4f4f5] rounded-[12px] p-[3px] flex gap-[3px]">
            
            {/* 1x Button */}
            <button 
                onClick={() => setQuality('1x')}
                className={`flex-1 flex flex-col items-center justify-center py-2 rounded-[9px] transition-all relative gap-1.5 ${quality === '1x' ? 'text-black' : 'text-black/50 hover:text-black/70'}`}
            >
                 {quality === '1x' && (
                     <div className="absolute inset-0 bg-white rounded-[9px] shadow-[0_3px_6px_-3px_rgba(0,0,0,0.2)]"></div>
                 )}
                 <div className={`relative z-10 w-5 h-5 flex items-center justify-center ${quality === '1x' ? 'opacity-100' : 'opacity-50'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                         <path d="M7.706 19V7.153h-.049L4 9.676V7.619L7.686 5H9.83v14zM12 12.052 13.055 11l2.947 2.951L18.942 11l1.055 1.052-2.948 2.952 2.948 2.951L18.942 19l-2.94-2.944L13.055 19 12 17.955l2.947-2.951z" />
                    </svg>
                 </div>
                 <span className="relative z-10 text-[12px] font-semibold leading-none capitalize">FHD</span>
            </button>

            {/* 2x Button */}
            <button 
                onClick={() => setQuality('2x')}
                className={`flex-1 flex flex-col items-center justify-center py-2 rounded-[9px] transition-all relative gap-1.5 ${quality === '2x' ? 'text-black' : 'text-black/50 hover:text-black/70'}`}
            >
                 {quality === '2x' && (
                     <div className="absolute inset-0 bg-white rounded-[9px] shadow-[0_3px_6px_-3px_rgba(0,0,0,0.2)]"></div>
                 )}
                 <div className="absolute top-[3px] right-[3px] z-20">
                    <div className="w-4 h-4 relative flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                           <defs>
                                <linearGradient id="plusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="30%" stopColor="#ff6b39" />
                                    <stop offset="45%" stopColor="#ff1472" />
                                    <stop offset="75%" stopColor="#8844ff" />
                                </linearGradient>
                           </defs>
                           <path fill="url(#plusGrad)" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10h3v2h-3v3h-2v-3H8v-2h3V9h2z" transform="scale(0.8) translate(3,3)" />
                        </svg>
                    </div>
                 </div>
                 <div className={`relative z-10 w-5 h-5 flex items-center justify-center ${quality === '2x' ? 'opacity-100' : 'opacity-50'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M2.114 19v-1.47l4.848-4.877c1.832-1.832 2.243-2.557 2.243-3.626v-.019C9.195 7.7 8.203 6.765 6.809 6.765c-1.612 0-2.767 1.088-2.786 2.481v.058H2v-.058C2 6.784 4.089 5 6.781 5c2.643 0 4.533 1.66 4.533 3.884v.019c0 1.574-.735 2.691-3.207 5.134l-3.13 3.073v.086h6.556V19zM14 12.052 15.055 11l2.947 2.951L20.942 11l1.055 1.052-2.948 2.952 2.948 2.951L20.942 19l-2.94-2.944L15.055 19 14 17.955l2.947-2.951z" />
                    </svg>
                 </div>
                 <span className="relative z-10 text-[12px] font-semibold leading-none capitalize">4K</span>
            </button>

             {/* 3x Button */}
             <button 
                onClick={() => setQuality('3x')}
                className={`flex-1 flex flex-col items-center justify-center py-2 rounded-[9px] transition-all relative gap-1.5 ${quality === '3x' ? 'text-black' : 'text-black/50 hover:text-black/70'}`}
            >
                 {quality === '3x' && (
                     <div className="absolute inset-0 bg-white rounded-[9px] shadow-[0_3px_6px_-3px_rgba(0,0,0,0.2)]"></div>
                 )}
                 <div className="absolute top-[3px] right-[3px] z-20">
                    <div className="bg-white/70 backdrop-blur-md rounded-[5px] border-[0.5px] border-black/30 px-[3px] py-[1px] shadow-sm">
                        <span className="text-[9px] font-bold italic block leading-none bg-gradient-to-r from-[#ff6432] via-[#ff0065] to-[#7b2eff] bg-clip-text text-transparent">PRO</span>
                    </div>
                 </div>
                 <div className={`relative z-10 w-5 h-5 flex items-center justify-center ${quality === '3x' ? 'opacity-100' : 'opacity-50'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M6.976 19c-2.892 0-4.779-1.578-4.967-3.784L2 15.093h2.018l.01.104c.131 1.202 1.267 2.047 2.948 2.047 1.653 0 2.77-.921 2.77-2.235v-.019c0-1.53-1.108-2.385-2.92-2.385H5.183v-1.634h1.586c1.55 0 2.601-.91 2.601-2.169v-.018c0-1.306-.882-2.066-2.413-2.066-1.502 0-2.554.789-2.685 2.047l-.01.084H2.291l.009-.094C2.507 6.492 4.309 5 6.957 5c2.695 0 4.46 1.427 4.46 3.511v.019c0 1.681-1.201 2.808-2.854 3.155v.047c1.991.178 3.324 1.38 3.324 3.277v.019c0 2.319-2.038 3.972-4.911 3.972M14 12.052 15.055 11l2.947 2.951L20.942 11l1.055 1.052-2.948 2.952 2.948 2.951L20.942 19l-2.94-2.944L15.055 19 14 17.955l2.947-2.951z" />
                    </svg>
                 </div>
                 <span className="relative z-10 text-[12px] font-semibold leading-none capitalize">6K</span>
            </button>
        </div>
      </div>

      {/* Mockup Resolution */}
      <div className="border border-black/5 rounded-[10px] px-3 py-2.5 flex justify-between items-center bg-white">
        <span className="text-[12px] text-black/40 font-semibold tracking-tight">Output Resolution</span>
        <span className="text-[12px] text-black/60 font-semibold tracking-tight">1920 x 1440</span>
      </div>

    </div>
  );
};

export default ExportMenu;