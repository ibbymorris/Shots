import React, { useState } from 'react';
import { X, Video, Plus } from 'lucide-react';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TemplatesModal: React.FC<TemplatesModalProps> = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'animated'>('all');

  if (!isOpen) return null;

  const FilterButton = ({ id, label, iconUrl }: { id: 'all' | 'image' | 'animated', label: string, iconUrl: string }) => (
    <button
      onClick={() => setActiveFilter(id)}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-medium transition-all duration-200
        ${activeFilter === id 
            ? 'bg-black text-white shadow-md scale-105' 
            : 'bg-white text-black hover:bg-black/5 border border-black/5'}
      `}
    >
      <img 
        src={iconUrl} 
        alt={label} 
        className={`w-4 h-4 transition-all ${activeFilter === id ? 'invert brightness-0' : 'opacity-80'}`} 
      />
      <span>{label}</span>
    </button>
  );

  const TemplateCard = ({ title, image, videoIcon, label }: { title: string, image: string, videoIcon?: boolean, label: string }) => (
    <div className="group cursor-pointer flex flex-col gap-3">
      <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        {/* Image */}
        <img src={image} alt={title} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>

        {/* Plus Icon (Top Right) */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                 <Plus size={16} className="text-[#ff2a2a] stroke-[3]" />
            </div>
        </div>

        {/* Video Icon (Bottom Left) */}
        {videoIcon && (
          <div className="absolute bottom-3 left-3 bg-black/20 backdrop-blur-md p-1.5 rounded-full">
             <Video size={14} className="text-white drop-shadow-sm" />
          </div>
        )}
      </div>
      
      {/* Label */}
      <span className="text-[13px] text-black/60 font-medium text-center group-hover:text-black transition-colors">{label}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[9999] flex justify-start p-3">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-lg transition-all duration-500 animate-in fade-in" 
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative w-[480px] h-full bg-[#f4f4f5] rounded-[24px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-left-[40px] fade-in duration-300 ease-[cubic-bezier(0.2,0,0,1)] border border-white/50 ring-1 ring-black/5">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 bg-[#f4f4f5] z-10 shrink-0">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-[24px] font-bold text-black tracking-tight">Templates</h2>
                <button 
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full transition-colors text-black/60"
                >
                    <X size={18} />
                </button>
            </div>
        </div>

        {/* Filters */}
        <div className="px-6 pb-6 pt-0 shrink-0">
            <div className="flex items-center gap-2">
                <FilterButton 
                    id="all" 
                    label="All" 
                    iconUrl="https://res.cloudinary.com/ditco4c8e/image/upload/v1766529937/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNy45MSAxMy40NmMxLjQxIDAgMi41NCAxLjE0IDIuNTQgMi41NnYzLjRjMCAxLjQxLTEuMTMgMi41Ni0yLjU0IDIuNTZINC41M2MtMS40I_lhvgwt.svg" 
                />
                <FilterButton 
                    id="image" 
                    label="Image" 
                    iconUrl="https://res.cloudinary.com/ditco4c8e/image/upload/v1766526227/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTUuOSAzQzE4Ljk1IDMgMjEgNS4xNCAyMSA4LjMyNXY3LjM1QzIxIDE4Ljg1OSAxOC45NSAyMSAxNS44OTkgMjFoLTcuOEM1LjA0OSAyM_iscgpi.svg" 
                />
                <FilterButton 
                    id="animated" 
                    label="Animated" 
                    iconUrl="https://res.cloudinary.com/ditco4c8e/image/upload/v1766529935/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNC41OTkgMTguNWg4LjYyOGMxLjYxNiAwIDIuNi0uOTI4IDIuNi0yLjUxN1Y4LjAxNmMwLTEuNTg5LS44OTEtMi41MTYtMi40OTctMi41M_luzqwh.svg" 
                />
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-10 scrollbar-hide">
          <div className="flex flex-col gap-8">
            
            {/* Section: Product promotion */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-black">Product promotion</h3>
                    <button className="bg-[#e4e4e7] hover:bg-[#d4d4d8] px-3 py-1 rounded-full text-[12px] font-medium text-black transition-colors">See all</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <TemplateCard 
                        title="Transforming Ideas" 
                        label="Screenshot"
                        image="https://shots.so/image/templates/promo-1.png"
                        videoIcon={true}
                    />
                    <TemplateCard 
                        title="Digital Design Studio" 
                        label="Screenshot"
                        image="https://shots.so/image/templates/promo-2.png"
                        videoIcon={true}
                    />
                </div>
            </div>

            {/* Section: Abstract Shapes */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-black">Abstract Shapes</h3>
                    <button className="bg-[#e4e4e7] hover:bg-[#d4d4d8] px-3 py-1 rounded-full text-[12px] font-medium text-black transition-colors">See all</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <TemplateCard 
                        title="iPhone 16 MLS" 
                        label="iPhone 16"
                        image="https://shots.so/image/templates/abstract-1.png"
                        videoIcon={true}
                    />
                    <TemplateCard 
                        title="Browser Blue" 
                        label="Browser"
                        image="https://shots.so/image/templates/abstract-2.png"
                        videoIcon={true}
                    />
                </div>
            </div>

             {/* Section: Realistic Desktop */}
             <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-black">Realistic Desktop</h3>
                    <button className="bg-[#e4e4e7] hover:bg-[#d4d4d8] px-3 py-1 rounded-full text-[12px] font-medium text-black transition-colors">See all</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <TemplateCard 
                        title="Design Tool Dark" 
                        label="Browser"
                        image="https://shots.so/image/templates/desktop-1.png"
                        videoIcon={false}
                    />
                    <TemplateCard 
                        title="Onboarding Light" 
                        label="Browser"
                        image="https://shots.so/image/templates/desktop-2.png"
                        videoIcon={false}
                    />
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesModal;