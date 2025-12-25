import React from 'react';
import { Play, RotateCw, ZoomIn, Search, Plus, X, Volume2, Layers } from 'lucide-react';

interface TimelineProps {
  onClose: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ onClose }) => {
  // Generate time markers
  const renderRuler = () => {
    return (
        <div className="flex h-5 w-full relative mb-1">
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-start h-full border-l border-black/5 relative group">
                    <span className="text-[9px] text-black/30 font-medium pl-1 leading-none">{i}:00</span>
                    <div className="flex w-full h-full mt-1">
                        <div className="flex-1 border-l border-black/5 h-1 self-end"></div>
                        <div className="flex-1 border-l border-black/5 h-2 self-end"></div>
                        <div className="flex-1 border-l border-black/5 h-1 self-end"></div>
                        <div className="flex-1 border-l border-black/5 h-1 self-end"></div>
                    </div>
                </div>
            ))}
        </div>
    );
  };

  return (
    <div className="w-full h-[210px] bg-panel rounded-[24px] shadow-2xl border border-black/5 flex flex-col overflow-hidden z-30">
        
        {/* Header Controls */}
        <div className="h-12 border-b border-black/5 flex items-center justify-between px-4 bg-white shrink-0">
            {/* Left: Add Animation */}
            <div className="flex-1 flex items-center justify-start">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-lg transition-colors group">
                    <div className="w-4 h-4 bg-white rounded-[4px] shadow-sm flex items-center justify-center border border-black/5">
                        <Plus size={10} className="text-black" strokeWidth={3} />
                    </div>
                    <span className="text-[12px] font-medium text-black/80 group-hover:text-black">Add Animation</span>
                </button>
            </div>

            {/* Center: Playback Controls */}
            <div className="flex items-center gap-4 justify-center flex-1">
                <button className="p-1.5 text-black/40 hover:text-black transition-colors">
                    <RotateCw size={16} />
                </button>
                <button className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                    <Play size={14} fill="white" className="text-white ml-0.5" />
                </button>
                <div className="flex items-center gap-1 min-w-[60px] justify-center font-variant-numeric tabular-nums">
                    <span className="text-[12px] font-medium text-black">0:00</span>
                    <span className="text-[12px] font-medium text-black/30">/ 0:10</span>
                </div>
            </div>

            {/* Right: Zoom & Close */}
            <div className="flex-1 flex items-center justify-end gap-4">
                 <div className="flex items-center gap-2">
                     <Search size={14} className="text-black/30" />
                     <div className="w-20 h-1 bg-black/10 rounded-full relative">
                         <div className="absolute left-0 top-0 h-full w-1/3 bg-black/30 rounded-full"></div>
                     </div>
                 </div>
                 <div className="w-px h-5 bg-black/10"></div>
                 <button 
                    onClick={onClose}
                    className="p-1.5 hover:bg-black/5 rounded-md text-black/40 hover:text-black transition-colors"
                >
                     <Volume2 size={16} />
                 </button>
            </div>
        </div>

        {/* Tracks Area */}
        <div className="flex-1 bg-[#fafafa] overflow-y-auto overflow-x-hidden p-3 relative scrollbar-hide">
             {/* Playhead Line */}
             <div className="absolute left-[120px] top-0 bottom-0 w-px bg-black/20 z-20 pointer-events-none">
                 <div className="absolute top-0 -translate-x-[5.5px] w-3 h-3 bg-black rounded-full border-2 border-white shadow-sm"></div>
             </div>

             <div className="flex flex-col gap-0.5 min-w-full">
                 
                 {/* Time Ruler */}
                 <div className="pl-[160px] w-full">
                     {renderRuler()}
                 </div>

                 {/* Animations Track */}
                 <div className="flex items-center w-full h-9 bg-white border border-black/5 rounded-lg relative">
                      <div className="absolute left-0 top-0 bottom-0 w-[160px] border-r border-black/5 flex items-center px-4 gap-2 bg-white rounded-l-lg z-10">
                          <Layers size={12} className="text-black/40" />
                          <span className="text-[11px] font-medium text-black/60">Animations</span>
                      </div>
                      <div className="flex-1 h-full pl-[160px] flex items-center justify-center">
                          <span className="text-[10px] font-medium text-black/20">Hover here to add Animation</span>
                      </div>
                 </div>

                 {/* Screenshot Track */}
                 <div className="flex items-center w-full h-12 bg-white border border-black/5 rounded-lg relative mt-1">
                      <div className="absolute left-0 top-0 bottom-0 w-[160px] border-r border-black/5 flex items-center px-4 gap-2 bg-white rounded-l-lg z-10">
                           <div className="w-4 h-4 bg-black/10 rounded flex items-center justify-center">
                                <img src="https://shots.so/image/mockup-icons/screenshot.png" className="w-3 h-3 opacity-50" alt="icon" />
                           </div>
                          <span className="text-[11px] font-medium text-black/60">Screenshot</span>
                      </div>
                      <div className="flex-1 h-full pl-[160px] p-1">
                           <div className="h-full bg-white border border-black/10 shadow-sm rounded flex items-center gap-2 p-1 w-[40%] ml-4 relative group cursor-pointer hover:border-black/20">
                               <div className="h-full aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden border border-black/5">
                                   <img src="https://shots.so/mockups/Screenshot/thumbs/1.png" className="w-full h-full object-cover" alt="thumb" />
                               </div>
                               <div className="flex flex-col justify-center">
                                   <span className="text-[9px] font-bold text-black/40 uppercase tracking-wider leading-none">Mockup</span>
                                   <span className="text-[10px] font-semibold text-black leading-tight">Screenshot</span>
                               </div>
                               
                               {/* Clip Handles */}
                               <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-black/10 rounded-full opacity-0 group-hover:opacity-100"></div>
                               <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-black/10 rounded-full opacity-0 group-hover:opacity-100"></div>
                           </div>
                      </div>
                 </div>

             </div>
        </div>

    </div>
  );
};

export default Timeline;