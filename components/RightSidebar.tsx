import React from 'react';
import { Smartphone, Monitor, Maximize } from 'lucide-react';
import { AppState } from '../types';

interface RightSidebarProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ appState, setAppState }) => {
  const handleZoomInteraction = (e: React.PointerEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    element.setPointerCapture(e.pointerId);

    const calculateAndSet = (clientX: number) => {
        const x = clientX - rect.left;
        const width = rect.width;
        // Range 25% to 150%
        const min = 25;
        const max = 150;
        const percentage = Math.min(Math.max(x / width, 0), 1);
        const val = Math.round(min + percentage * (max - min));
        
        setAppState(prev => ({ ...prev, zoom: val }));
    };

    calculateAndSet(e.clientX);

    const handlePointerMove = (moveEvent: PointerEvent) => {
        calculateAndSet(moveEvent.clientX);
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
        element.releasePointerCapture(upEvent.pointerId);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const zoomPercent = (appState.zoom - 25) / (150 - 25); // Normalize 0-1 for display

  // Mini representation of the "Drop or Paste" content for presets
  const MiniContent = () => (
     <div className="flex flex-col items-center justify-center w-full h-full transform scale-[0.6] opacity-60">
          <div className="flex items-center justify-center relative w-full h-10 mb-1">
                {/* Image Icon */}
                <div className="absolute left-[50%] transform -translate-x-[20px] -rotate-12">
                   <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766526227/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTUuOSAzQzE4Ljk1IDMgMjEgNS4xNCAyMSA4LjMyNXY3LjM1QzIxIDE4Ljg1OSAxOC45NSAyMSAxNS44OTkgMjFoLTcuOEM1LjA0OSAyM_iscgpi.svg" className="w-8 h-8 opacity-30 select-none" alt="" draggable={false} />
                </div>
                {/* Video Icon */}
                <div className="absolute left-[50%] transform translate-x-[20px] rotate-12">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766529935/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNC41OTkgMTguNWg4LjYyOGMxLjYxNiAwIDIuNi0uOTI4IDIuNi0yLjUxN1Y4LjAxNmMwLTEuNTg5LS44OTEtMi41MTYtMi40OTctMi41M_luzqwh.svg" className="w-8 h-8 opacity-30 select-none" alt="" draggable={false} />
                </div>
                {/* Plus */}
                <div className="relative z-10 bg-black rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766554853/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi45NyAxMS4xNmgzLjg4Yy40NiAwIC44My4zNy44My44M3MtLjM4LjgzLS44NC44M2gtMy44OXYzL_as3peh.svg" className="w-3 h-3 brightness-0 invert select-none" alt="" draggable={false} />
                </div>
          </div>
          <div className="flex flex-col items-center gap-1">
             <div className="text-[10px] font-semibold text-black/40 leading-none">Drop or Paste</div>
             <div className="text-[7px] font-medium text-black/20 leading-none">Images & Videos</div>
          </div>
     </div>
  );

  const presetBackgroundStyle = {
    background: appState.background.type === 'image' || appState.background.type === 'unsplash'
        ? `url(${appState.background.value}) center/cover`
        : appState.background.value
  };

  return (
    <div className="relative z-10 min-w-[260px] max-w-[260px] h-full bg-panel rounded-2xl flex flex-col overflow-hidden shadow-sm border border-black/5">
      <div className="p-2.5 flex flex-col gap-4 h-full">
        
        {/* Toggle Controls */}
        <div className="bg-panel-dim p-1 rounded-xl flex gap-1 shrink-0">
            <button className="flex-1 flex flex-col items-center justify-center p-1 rounded-[8px] bg-white text-black shadow-sm border border-black/5">
                <Smartphone size={18} className="opacity-100" />
            </button>
            <button className="flex-1 flex flex-col items-center justify-center p-1 rounded-[8px] hover:bg-black/5 text-black/50">
                <Monitor size={18} />
            </button>
            <button className="flex-1 flex flex-col items-center justify-center p-1 rounded-[8px] hover:bg-black/5 text-black/50">
                <Maximize size={18} />
            </button>
        </div>

        {/* Zoom Section */}
        <div className="flex flex-col gap-2 shrink-0">
            <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">Zoom</span>
            <div className="bg-panel-dim rounded-[14px] p-1 flex flex-col items-center">
                <div className="w-[208px] h-[156px] bg-panel-dim relative rounded-xl overflow-hidden mb-1 cursor-grab active:cursor-grabbing border border-black/5">
                    {/* Mini Map Representation */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#f0f0f0]">
                        <div 
                           className="w-[70%] h-[50%] bg-black/10 rounded-md transition-transform"
                           style={{ transform: `scale(${appState.zoom / 100})` }}
                        ></div>
                    </div>
                    {/* Viewport Box */}
                    <div className="absolute w-[40%] h-[40%] border-2 border-white rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] top-[30%] left-[30%] pointer-events-none"></div>
                </div>
                {/* Zoom Slider */}
                <div 
                    className="w-full h-[30px] rounded-lg relative flex items-center px-3 cursor-ew-resize touch-none select-none"
                    onPointerDown={handleZoomInteraction}
                >
                    <div 
                        className="absolute left-0 top-0 h-full bg-white border border-black/5 rounded-lg shadow-sm pointer-events-none"
                        style={{ width: `${zoomPercent * 100}%` }}
                    ></div>
                    <div 
                        className="absolute w-[2px] h-[18px] bg-black/20 rounded-full cursor-pointer hover:bg-black/40 transition-colors z-20"
                        style={{ left: `calc(${zoomPercent * 100}% - 1px)` }}
                    ></div>
                    <div className="w-full flex justify-between z-10 pointer-events-none relative">
                        <span className="text-[11px] text-black/40 font-semibold">Zoom</span>
                        <span className="text-[11px] text-black/40 font-semibold">{appState.zoom}%</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Layout Presets - Scrollable List */}
        <div className="flex flex-col gap-2 flex-1 overflow-hidden min-h-0">
             <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">Layout Presets</span>
             
             <div className="overflow-y-auto flex flex-col gap-2.5 pb-2 scrollbar-hide pr-1 h-full">
                
                {/* Ad Placeholder */}
                <div className="w-full aspect-[3/2] shrink-0 bg-panel rounded-xl overflow-hidden relative cursor-pointer border border-black/10 hover:border-black/20 transition-colors group">
                    <img src="https://shots.so/ad-content/ad-01.jpg" className="w-full h-full object-cover" alt="Ad" />
                    <div className="absolute top-1 right-1 bg-black/50 px-1 py-0.5 rounded text-[8px] font-bold text-white/90">AD</div>
                </div>

                {/* Preset 1: Default (Flat) */}
                <div className="w-full aspect-[3/2] shrink-0 rounded-xl cursor-pointer relative overflow-hidden ring-1 ring-black/5 hover:ring-black/20 transition-all group perspective-[800px]">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={presetBackgroundStyle}></div>
                    <div className="absolute inset-4 flex items-center justify-center">
                        <div className="w-full h-full bg-[#f4f4f5] rounded-lg shadow-xl flex items-center justify-center border border-white/40">
                             <MiniContent />
                        </div>
                    </div>
                    {/* Active State Indicator */}
                    <div className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none opacity-100"></div>
                </div>

                {/* Preset 2: Tilt Left */}
                <div className="w-full aspect-[3/2] shrink-0 rounded-xl cursor-pointer relative overflow-hidden ring-1 ring-black/5 hover:ring-black/20 transition-all group perspective-[800px]">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={presetBackgroundStyle}></div>
                    <div className="absolute inset-4 flex items-center justify-center">
                        <div 
                            className="w-[90%] h-[90%] bg-[#f4f4f5] rounded-lg shadow-xl flex items-center justify-center border border-white/40 transform transition-transform duration-300"
                            style={{ transform: 'rotateY(-20deg) rotateX(10deg)' }}
                        >
                             <MiniContent />
                        </div>
                    </div>
                </div>

                {/* Preset 3: Tilt Right */}
                <div className="w-full aspect-[3/2] shrink-0 rounded-xl cursor-pointer relative overflow-hidden ring-1 ring-black/5 hover:ring-black/20 transition-all group perspective-[800px]">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={presetBackgroundStyle}></div>
                    <div className="absolute inset-4 flex items-center justify-center">
                        <div 
                            className="w-[90%] h-[90%] bg-[#f4f4f5] rounded-lg shadow-xl flex items-center justify-center border border-white/40 transform transition-transform duration-300"
                            style={{ transform: 'rotateY(20deg) rotateX(10deg)' }}
                        >
                             <MiniContent />
                        </div>
                    </div>
                </div>

                 {/* Preset 4: Isometric */}
                 <div className="w-full aspect-[3/2] shrink-0 rounded-xl cursor-pointer relative overflow-hidden ring-1 ring-black/5 hover:ring-black/20 transition-all group perspective-[800px]">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={presetBackgroundStyle}></div>
                    <div className="absolute inset-4 flex items-center justify-center">
                        <div 
                            className="w-[85%] h-[85%] bg-[#f4f4f5] rounded-lg shadow-xl flex items-center justify-center border border-white/40 transform transition-transform duration-300"
                            style={{ transform: 'rotateX(45deg) rotateZ(-12deg) scale(0.9)' }}
                        >
                             <MiniContent />
                        </div>
                    </div>
                </div>

                {/* Preset 5: Floating */}
                 <div className="w-full aspect-[3/2] shrink-0 rounded-xl cursor-pointer relative overflow-hidden ring-1 ring-black/5 hover:ring-black/20 transition-all group perspective-[800px]">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={presetBackgroundStyle}></div>
                    <div className="absolute inset-4 flex items-center justify-center">
                         {/* Shadow */}
                        <div className="absolute w-[80%] h-[80%] bg-black/20 blur-md rounded-lg transform translate-y-4 translate-x-1"></div>
                        <div 
                            className="relative w-[90%] h-[90%] bg-[#f4f4f5] rounded-lg shadow-xl flex items-center justify-center border border-white/40 transform transition-transform duration-300 -translate-y-1"
                        >
                             <MiniContent />
                        </div>
                    </div>
                </div>

             </div>
        </div>

      </div>
    </div>
  );
};

export default RightSidebar;