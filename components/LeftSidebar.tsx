import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus, Upload, Box, Circle, Square, Type, Aperture, Droplet, Ban, Layers, Shapes, Grid, Palette, Smartphone, Tablet, Laptop, Monitor, Watch, Instagram, Twitter, Youtube, Dribbble, ArrowRightLeft, RectangleHorizontal, Pin, ExternalLink, EyeOff, Scan } from 'lucide-react';
import { MOCKUP_STYLES, BACKGROUND_CATEGORIES, SOLID_BACKGROUNDS, GRADIENT_BACKGROUNDS, IMAGE_BACKGROUNDS, BackgroundCategory } from '../constants';
import { AppState, BorderType, BackgroundOption, MockupStyle } from '../types';

interface LeftSidebarProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ appState, setAppState }) => {
  const [activeTab, setActiveTab] = useState<'mockup' | 'frame'>('mockup');
  const [showDeviceMenu, setShowDeviceMenu] = useState(false);
  const [showFrameMenu, setShowFrameMenu] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close menus when switching tabs
  useEffect(() => {
    setShowDeviceMenu(false);
    setShowFrameMenu(false);
  }, [activeTab]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAppState(prev => ({ ...prev, uploadedImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStyleChange = (style: string) => {
    setAppState(prev => ({ ...prev, selectedStyle: style }));
  };

  const handleBorderTypeChange = (type: BorderType) => {
    let newRadius = appState.borderRadius;
    if (type === BorderType.Sharp) newRadius = 0;
    if (type === BorderType.Curved) newRadius = 20;
    if (type === BorderType.Round) newRadius = 40;
    
    setAppState(prev => ({ ...prev, borderType: type, borderRadius: newRadius }));
  };

  const handleBackgroundChange = (bg: BackgroundOption) => {
    setAppState(prev => ({ ...prev, background: bg }));
  };
  
  const handleDeviceSelect = (deviceName: string) => {
      setShowDeviceMenu(false);
  };

  const handleFrameSelect = (frameName: string) => {
      setShowFrameMenu(false);
  };

  const toggleSection = (id: string) => {
      setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Slider Logic
  const handleSliderInteraction = (e: React.PointerEvent<HTMLDivElement>, type: 'radius' | 'opacity') => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    element.setPointerCapture(e.pointerId);

    const calculateAndSet = (clientX: number) => {
        const x = clientX - rect.left;
        const width = rect.width;
        const percentage = Math.min(Math.max(x / width, 0), 1);
        
        if (type === 'radius') {
            const maxRadius = 60;
            const val = Math.round(percentage * maxRadius);
            setAppState(prev => ({ ...prev, borderRadius: val, borderType: val === 0 ? BorderType.Sharp : BorderType.Curved }));
        } else if (type === 'opacity') {
            const val = Math.round(percentage * 100);
            setAppState(prev => ({ ...prev, shadowOpacity: val }));
        }
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


  const renderDeviceMenu = () => (
      <div className="flex flex-col h-full animate-in fade-in duration-300 bg-panel w-full">
          {/* Filters */}
          <div className="px-3 pb-4 pt-1 flex items-center gap-2 overflow-x-auto scrollbar-hide flex-shrink-0 w-full">
             <button className="bg-black text-white h-10 px-5 rounded-full text-[13px] font-semibold min-w-max hover:opacity-90 transition-opacity">All</button>
             <button className="bg-panel-dim w-10 h-10 flex items-center justify-center rounded-xl text-black hover:bg-black/10 transition-colors flex-shrink-0"><Smartphone size={18} /></button>
             <button className="bg-panel-dim w-10 h-10 flex items-center justify-center rounded-xl text-black hover:bg-black/10 transition-colors flex-shrink-0"><Tablet size={18} /></button>
             <button className="bg-panel-dim w-10 h-10 flex items-center justify-center rounded-xl text-black hover:bg-black/10 transition-colors flex-shrink-0"><Laptop size={18} /></button>
             <button className="bg-panel-dim w-10 h-10 flex items-center justify-center rounded-xl text-black hover:bg-black/10 transition-colors flex-shrink-0"><Monitor size={18} /></button>
             <button className="bg-panel-dim w-10 h-10 flex items-center justify-center rounded-xl text-black hover:bg-black/10 transition-colors flex-shrink-0"><Watch size={18} /></button>
          </div>

          {/* Grid Content */}
          <div className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-hide">
              {/* Essentials */}
              <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center justify-between px-1">
                      <span className="text-[15px] font-bold text-black tracking-tight">Essentials</span>
                      <button className="bg-panel-dim px-2.5 py-1 rounded-full text-[11px] font-semibold text-black hover:bg-black/5 transition-colors">See all</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                      {/* Screenshot Card */}
                      <div className="bg-[#f4f4f5] p-3.5 rounded-[24px] flex flex-col gap-3 cursor-pointer group hover:bg-gray-200 transition-colors border border-transparent hover:border-black/5" onClick={() => handleDeviceSelect('Screenshot')}>
                          <div className="flex flex-col gap-0.5">
                              <span className="text-[14px] font-bold text-black leading-none">Screenshot</span>
                              <span className="text-[11px] text-black/40 font-semibold">Adapts to media</span>
                          </div>
                          <div className="aspect-square w-full flex items-center justify-center my-1">
                              <img src="https://shots.so/mockups/Screenshot/thumbs/1.png" className="w-[85%] shadow-md rounded-md transform group-hover:scale-105 transition-transform duration-300" alt="Screenshot" />
                          </div>
                          <div className="flex gap-1 mt-auto pt-1">
                              <div className="w-7 h-5 bg-black/5 rounded-md border border-black/5"></div>
                              <div className="w-7 h-5 bg-black/5 rounded-md border border-black/5"></div>
                              <div className="w-7 h-5 bg-black/5 rounded-md border border-black/5"></div>
                              <div className="px-1.5 h-5 bg-black/5 rounded-md border border-black/5 text-[9px] flex items-center justify-center text-black/50 font-bold ml-auto">+9</div>
                          </div>
                      </div>

                      {/* Browser Card */}
                      <div className="bg-[#f4f4f5] p-3.5 rounded-[24px] flex flex-col gap-3 cursor-pointer group hover:bg-gray-200 transition-colors border border-transparent hover:border-black/5" onClick={() => handleDeviceSelect('Browser')}>
                          <div className="flex flex-col gap-0.5">
                              <span className="text-[14px] font-bold text-black leading-none">Browser</span>
                              <span className="text-[11px] text-black/40 font-semibold">Adapts to media</span>
                          </div>
                          <div className="aspect-square w-full flex items-center justify-center my-1">
                              <img src="https://shots.so/mockups/Browser/thumbs/1.png" className="w-[95%] shadow-md rounded-md transform group-hover:scale-105 transition-transform duration-300" alt="Browser" />
                          </div>
                           <div className="flex gap-1 mt-auto pt-1">
                              <div className="w-7 h-5 bg-black/5 rounded-md border border-black/5"></div>
                              <div className="w-7 h-5 bg-black/5 rounded-md border border-black/5"></div>
                              <div className="w-7 h-5 bg-black/5 rounded-md border border-black/5"></div>
                              <div className="px-1.5 h-5 bg-black/5 rounded-md border border-black/5 text-[9px] flex items-center justify-center text-black/50 font-bold ml-auto">+3</div>
                          </div>
                      </div>
                  </div>
              </div>

               {/* iPhone Lineup */}
               <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1">
                      <span className="text-[15px] font-bold text-black tracking-tight">iPhone 17 Lineup</span>
                      <button className="bg-panel-dim px-2.5 py-1 rounded-full text-[11px] font-semibold text-black hover:bg-black/5 transition-colors">See all</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                       {/* iPhone 17 */}
                      <div className="bg-[#f4f4f5] p-3.5 rounded-[24px] flex flex-col gap-3 cursor-pointer group hover:bg-gray-200 transition-colors border border-transparent hover:border-black/5" onClick={() => handleDeviceSelect('iPhone 17')}>
                          <div className="flex items-start justify-between">
                              <div className="flex flex-col gap-0.5">
                                  <span className="text-[14px] font-bold text-black leading-none">iPhone 17</span>
                              </div>
                              <span className="bg-black text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-[4px] tracking-wide">New</span>
                          </div>
                          <div className="aspect-square w-full flex items-center justify-center relative py-2">
                               {/* Placeholder for iPhone */}
                              <div className="w-[45%] h-full bg-[#1a1a1a] rounded-[18px] shadow-lg border-[3px] border-gray-700 transform group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                                  <div className="absolute top-2 w-full flex justify-center"><div className="w-1/3 h-3 bg-black rounded-full"></div></div>
                              </div>
                          </div>
                          <div className="mt-auto">
                               <span className="text-[11px] text-black/40 font-semibold">402 / 874</span>
                          </div>
                      </div>

                       {/* iPhone 17 Air */}
                      <div className="bg-[#f4f4f5] p-3.5 rounded-[24px] flex flex-col gap-3 cursor-pointer group hover:bg-gray-200 transition-colors border border-transparent hover:border-black/5" onClick={() => handleDeviceSelect('iPhone 17 Air')}>
                          <div className="flex items-start justify-between">
                              <div className="flex flex-col gap-0.5">
                                  <span className="text-[14px] font-bold text-black leading-none">iPhone 17 Air</span>
                              </div>
                              <span className="bg-black text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-[4px] tracking-wide">New</span>
                          </div>
                          <div className="aspect-square w-full flex items-center justify-center relative py-2">
                               <div className="w-[45%] h-full bg-[#e5e5e5] rounded-[18px] shadow-lg border-[3px] border-[#d4d4d4] transform group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                                   <div className="absolute top-2 w-full flex justify-center"><div className="w-1/3 h-3 bg-black/20 rounded-full"></div></div>
                               </div>
                          </div>
                          <div className="mt-auto">
                               <span className="text-[11px] text-black/40 font-semibold">402 / 912</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );

  const renderBackgroundSection = (category: BackgroundCategory) => {
      const isExpanded = expandedSections[category.id];
      // If expanded, show all. If not, show first 3.
      const visibleItems = isExpanded ? category.items : category.items.slice(0, 3);
      const shouldShowButton = category.items.length > 3;
      
      // Changed: Use rectangular aspect ratio for ALL categories including solid/gradient
      const aspectClass = 'aspect-[3/2]';

      return (
        <div key={category.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-semibold text-black/80">{category.label}</span>
                    {category.badge && (
                        <span className="bg-black text-white text-[9px] px-1.5 py-0.5 rounded font-bold">{category.badge}</span>
                    )}
                </div>
                {category.linkText && (
                    <a href={category.linkUrl} className="flex items-center gap-0.5 text-[10px] font-semibold text-black/40 hover:text-black/60 transition-colors">
                        {category.linkText}
                        <ExternalLink size={8} />
                    </a>
                )}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
                {visibleItems.map((bg) => (
                    <button 
                        key={bg.id}
                        onClick={() => handleBackgroundChange(bg)}
                        className={`w-full ${aspectClass} rounded-[10px] relative overflow-hidden group transition-all hover:scale-105 ${appState.background.id === bg.id ? 'ring-2 ring-primary/50 ring-offset-2 ring-offset-panel' : ''}`}
                    >
                        {bg.type === 'solid' && (
                             <div className="absolute inset-0" style={{ background: bg.value }}></div>
                        )}
                        {bg.type === 'gradient' && (
                             <div className="absolute inset-0" style={{ background: bg.value }}></div>
                        )}
                        {(bg.type === 'image' || bg.type === 'unsplash') && (
                             <img src={bg.value} className="w-full h-full object-cover" alt="bg" />
                        )}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[10px]"></div>
                    </button>
                ))}

                {/* Expansion Button */}
                {!isExpanded && shouldShowButton && (
                    <button 
                        onClick={() => toggleSection(category.id)}
                        className={`w-full ${aspectClass} rounded-[10px] bg-[#27272a] hover:bg-black text-white flex items-center justify-center transition-colors shadow-sm`}
                    >
                        <ChevronDown size={18} />
                    </button>
                )}

                {/* Collapse Button (at the end if expanded) */}
                {isExpanded && shouldShowButton && (
                    <button 
                        onClick={() => toggleSection(category.id)}
                        className={`w-full ${aspectClass} rounded-[10px] bg-[#f4f4f5] hover:bg-[#e4e4e7] text-black/60 flex items-center justify-center transition-colors border border-black/5`}
                    >
                        <ChevronUp size={18} />
                    </button>
                )}
            </div>
        </div>
      );
  };

  const renderFrameMenu = () => {
    // Reusing the same helper components
    const AspectRatioButton = ({ ratio, label }: { ratio: string, label: string }) => {
        const [w, h] = ratio.split(':').map(Number);
        const maxDim = 24;
        const scale = maxDim / Math.max(w, h);
        const width = w * scale;
        const height = h * scale;

        return (
            <button 
                className="flex flex-col items-center justify-center gap-2 p-2 bg-panel-dim rounded-[14px] hover:bg-black/5 transition-colors group aspect-square"
                onClick={() => handleFrameSelect(label)}
            >
                <div className="w-8 h-8 flex items-center justify-center">
                    <div 
                        style={{ width: `${width}px`, height: `${height}px` }} 
                        className="bg-black/10 border border-black/10 rounded-[2px] group-hover:bg-black/20 transition-colors"
                    ></div>
                </div>
                <span className="text-[11px] font-semibold text-black/60">{label}</span>
            </button>
        );
    };

    const SocialPreset = ({ icon: Icon, label, sub, color }: { icon: any, label: string, sub: string, color: string }) => (
        <button 
            className="flex flex-col items-center justify-center gap-2 p-2 bg-panel-dim rounded-[14px] hover:bg-black/5 transition-colors aspect-[3/4]"
            onClick={() => handleFrameSelect(label)}
        >
             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm`} style={{ backgroundColor: color }}>
                <Icon size={16} />
             </div>
             <div className="flex flex-col items-center gap-0.5">
                 <span className="text-[11px] font-semibold text-black">{label}</span>
                 <span className="text-[9px] font-medium text-black/40">{sub}</span>
             </div>
        </button>
    );

    return (
      <div className="flex flex-col h-full animate-in fade-in duration-300 bg-panel w-full">
          {/* Inputs */}
          <div className="px-3 pb-4 pt-1 flex items-center gap-2">
               <div className="relative flex-1 group">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-black/30 group-hover:text-black/50 transition-colors">W</span>
                 <input className="w-full bg-panel-dim rounded-[10px] py-2 pl-7 pr-2 text-[14px] font-semibold text-black outline-none border border-transparent focus:border-black/5 transition-all text-center" defaultValue="1920" />
               </div>
               <div className="relative flex-1 group">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-black/30 group-hover:text-black/50 transition-colors">H</span>
                 <input className="w-full bg-panel-dim rounded-[10px] py-2 pl-7 pr-2 text-[14px] font-semibold text-black outline-none border border-transparent focus:border-black/5 transition-all text-center" defaultValue="1440" />
               </div>
               <button className="w-9 h-9 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-[10px] text-black/60 transition-colors">
                   <ArrowRightLeft size={14} />
               </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-hide flex flex-col gap-6">
               <div className="grid grid-cols-3 gap-2">
                    <AspectRatioButton ratio="16:9" label="16:9" />
                    <AspectRatioButton ratio="3:2" label="3:2" />
                    <AspectRatioButton ratio="4:3" label="4:3" />
                    <AspectRatioButton ratio="5:4" label="5:4" />
                    <AspectRatioButton ratio="1:1" label="1:1" />
                    <AspectRatioButton ratio="4:5" label="4:5" />
                    <AspectRatioButton ratio="3:4" label="3:4" />
                    <AspectRatioButton ratio="2:3" label="2:3" />
                    <AspectRatioButton ratio="9:16" label="9:16" />
               </div>
               <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-1">
                        <Instagram size={14} className="text-[#E1306C]" />
                        <span className="text-[13px] font-semibold text-black">Instagram</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <SocialPreset icon={Instagram} label="Post" sub="1:1" color="#E1306C" />
                        <SocialPreset icon={Instagram} label="Portrait" sub="4:5" color="#E1306C" />
                        <SocialPreset icon={Instagram} label="Story" sub="9:16" color="#E1306C" />
                    </div>
               </div>
               {/* Twitter */}
               <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-1">
                        <Twitter size={14} className="text-[#1DA1F2]" />
                        <span className="text-[13px] font-semibold text-black">Twitter</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <SocialPreset icon={Twitter} label="Tweet" sub="16:9" color="#1DA1F2" />
                        <SocialPreset icon={Twitter} label="Cover" sub="3:1" color="#1DA1F2" />
                    </div>
               </div>
               {/* Youtube */}
               <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-1">
                        <Youtube size={14} className="text-[#FF0000]" />
                        <span className="text-[13px] font-semibold text-black">YouTube</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <SocialPreset icon={Youtube} label="Banner" sub="16:9" color="#FF0000" />
                        <SocialPreset icon={Youtube} label="Thumbnail" sub="16:9" color="#FF0000" />
                        <SocialPreset icon={Youtube} label="Video" sub="16:9" color="#FF0000" />
                    </div>
               </div>
               {/* Pinterest */}
               <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-1">
                        <Pin size={14} className="text-[#E60023]" />
                        <span className="text-[13px] font-semibold text-black">Pinterest</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <SocialPreset icon={Pin} label="Long" sub="10:21" color="#E60023" />
                        <SocialPreset icon={Pin} label="Optimal" sub="2:3" color="#E60023" />
                        <SocialPreset icon={Pin} label="Square" sub="1:1" color="#E60023" />
                    </div>
               </div>
               {/* Dribbble */}
               <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-1">
                        <Dribbble size={14} className="text-[#EA4C89]" />
                        <span className="text-[13px] font-semibold text-black">Dribbble</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <SocialPreset icon={Dribbble} label="Shot" sub="4:3" color="#EA4C89" />
                    </div>
               </div>
               {/* Appstore */}
               <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-1">
                        <Smartphone size={14} className="text-[#007AFF]" />
                        <span className="text-[13px] font-semibold text-black">Appstore</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <SocialPreset icon={Smartphone} label="iPhone 6.5&quot;" sub="1284:2778" color="#007AFF" />
                        <SocialPreset icon={Smartphone} label="iPhone 5.5&quot;" sub="1242:2208" color="#007AFF" />
                        <SocialPreset icon={Smartphone} label="iPad Pro 12.9&quot;" sub="2048:2732" color="#007AFF" />
                        <SocialPreset icon={Smartphone} label="iPhone 6.5&quot;" sub="2778:1284" color="#007AFF" />
                        <SocialPreset icon={Smartphone} label="iPhone 5.5" sub="2208:1242" color="#007AFF" />
                        <SocialPreset icon={Smartphone} label="iPad Pro 12.9&quot;" sub="2732:2048" color="#007AFF" />
                         <SocialPreset icon={Monitor} label="Mac" sub="16:10" color="#007AFF" />
                    </div>
               </div>
          </div>
      </div>
    );
  }

  const renderMockupContent = () => (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Media Section */}
      <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">media</span>
          <div className="flex flex-col gap-2 w-full">
              {/* Rectangle in a Rectangle Layout */}
              {/* Outer grey container */}
             <div 
                className="w-full h-[120px] bg-[#f4f4f5] rounded-[24px] flex items-center justify-center border border-transparent"
             >
                 {/* Inner white container (The Trigger) */}
                 <div 
                    className="w-[80px] h-[60px] bg-white rounded-[16px] shadow-sm border border-black/5 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => fileInputRef.current?.click()}
                 >
                     {appState.uploadedImage ? (
                         <img src={appState.uploadedImage} className="w-full h-full object-contain rounded-[14px] p-1.5" alt="Uploaded" />
                     ) : (
                         <Plus size={24} className="text-black opacity-80" strokeWidth={2} />
                     )}
                 </div>
             </div>
             <span className="text-[11px] text-black/40 text-center font-semibold mt-1">Drop media or click to choose</span>
          </div>
          <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*,video/*" 
              onChange={handleFileUpload}
          />
      </div>

      {/* Style Section */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">style</span>
        <div className="grid grid-cols-3 gap-2">
          {MOCKUP_STYLES.map((style) => (
            <div 
              key={style.id} 
              className={`flex flex-col items-center cursor-pointer group`}
              onClick={() => handleStyleChange(style.id)}
            >
              <div className={`w-full aspect-[4/3] bg-[#dcdcdc] rounded-[11px] overflow-hidden relative mb-1.5 outline outline-1 ${appState.selectedStyle === style.id ? 'outline-primary/50 outline-offset-2' : 'outline-transparent'}`}>
                  <img src={style.previewUrl} alt={style.name} className="w-full h-full object-cover" />
              </div>
              <span className={`text-[11px] font-semibold truncate w-full text-center ${appState.selectedStyle === style.id ? 'text-black/80' : 'text-black/60 group-hover:text-black/80'}`}>{style.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border Section */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">Border</span>
        <div className="flex bg-panel-dim p-1 gap-1 rounded-xl">
          {[
              { type: BorderType.Sharp, icon: Square, label: 'Sharp' },
              { type: BorderType.Curved, icon: Box, label: 'Curved' }, 
              { type: BorderType.Round, icon: Circle, label: 'Round' }
          ].map((item) => (
              <button 
                  key={item.type}
                  onClick={() => handleBorderTypeChange(item.type)}
                  className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${appState.borderType === item.type ? 'bg-white shadow-sm text-black border border-black/5' : 'text-black/50 hover:bg-black/5'}`}
              >
                  <item.icon size={18} strokeWidth={2.5} />
                  <span className="text-[11px] font-semibold">{item.label}</span>
              </button>
          ))}
        </div>
        
        {/* Radius Slider */}
        <div 
            className="h-[30px] rounded-lg bg-panel-dim relative flex items-center px-3 cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => handleSliderInteraction(e, 'radius')}
        >
           <div 
             className="absolute left-0 top-0 h-full bg-white border border-black/5 rounded-lg shadow-sm pointer-events-none"
             style={{ width: `${(appState.borderRadius / 60) * 100}%` }}
           ></div>
           <div 
             className="absolute w-[2px] h-[18px] bg-black/20 rounded-full cursor-pointer hover:bg-black/40 transition-colors z-20"
             style={{ left: `calc(${(appState.borderRadius / 60) * 100}% - 1px)` }}
           ></div>
           <div className="w-full flex justify-between z-10 pointer-events-none relative">
              <span className="text-[11px] text-black/40 font-semibold">Radius</span>
              <span className="text-[11px] text-black/40 font-semibold">{appState.borderRadius}</span>
           </div>
        </div>
      </div>

      {/* Shadow Section */}
      <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">Shadow</span>
          <div className="grid grid-cols-4 gap-2">
              {['none', 'spread', 'hug', 'adaptive'].map((shadow) => (
                  <div key={shadow} className="flex flex-col items-center cursor-pointer group">
                      <div className="w-full aspect-square bg-panel-dim rounded-[11px] overflow-hidden mb-1.5 relative">
                          <img src={`https://shots.so/image/shadow-modes/shadow-${shadow}.jpeg`} alt={shadow} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] font-semibold capitalize text-black/60">{shadow}</span>
                  </div>
              ))}
          </div>
           
           {/* Opacity Slider */}
           <div 
             className="h-[30px] rounded-lg bg-panel-dim relative flex items-center px-3 cursor-ew-resize touch-none select-none"
             onPointerDown={(e) => handleSliderInteraction(e, 'opacity')}
           >
               <div 
                 className="absolute left-0 top-0 h-full bg-white border border-black/5 rounded-lg shadow-sm pointer-events-none"
                 style={{ width: `${appState.shadowOpacity}%` }}
               ></div>
               <div 
                 className="absolute w-[2px] h-[18px] bg-black/20 rounded-full cursor-pointer hover:bg-black/40 transition-colors z-20"
                 style={{ left: `calc(${appState.shadowOpacity}% - 1px)` }}
               ></div>
               <div className="w-full flex justify-between z-10 pointer-events-none relative">
                  <span className="text-[11px] text-black/40 font-semibold">Opacity</span>
                  <span className="text-[11px] text-black/40 font-semibold">{appState.shadowOpacity}</span>
               </div>
           </div>
      </div>

      {/* Adjust Light */}
      <div className="flex justify-center py-2">
          <button className="flex items-center gap-2 text-[13px] font-semibold text-black/60 hover:text-black transition-colors">
              <Scan size={16} />
              <span>Adjust Light</span>
          </button>
      </div>

      {/* Visibility */}
      <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">Visibility</span>
           <button className="w-full h-12 bg-panel-dim rounded-xl flex items-center justify-center gap-2 hover:bg-black/5 transition-colors text-black">
              <EyeOff size={18} />
              <span className="text-[14px] font-semibold">Hide Mockup</span>
          </button>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">Details</span>
          <div className="bg-panel-dim rounded-xl p-3 flex flex-col gap-2 border border-black/5">
              <div className="flex justify-between items-center">
                  <span className="text-[11px] font-medium text-black/40">Device</span>
                  <span className="text-[11px] font-semibold text-black/60">Screenshot</span>
              </div>
               <div className="flex justify-between items-center">
                  <span className="text-[11px] font-medium text-black/40">Screen pixels</span>
                  <span className="text-[11px] font-semibold text-black/60">Adapts to media</span>
              </div>
          </div>
      </div>
    </div>
  );

  const renderFrameContent = () => (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
        {/* Effects & Watermark */}
        <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">effects & watermark</span>
            <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center justify-center gap-1.5 bg-panel-dim h-14 rounded-xl hover:bg-black/5 transition-colors">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766525007/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtNi43NDggMjEuMzM5IDUuNzQ4LTMuMzIyYzEuMjA4LS43MTEgMi4zODMtMS40NDUgMy40OTQtMi4yNDN2NS40ODloMS40NTZWMTJjMC0uN_w6xlzo.svg" className="w-[18px] h-[18px] opacity-80" alt="Portrait" />
                    <span className="text-[11px] text-black/60 font-medium">Portrait</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 bg-panel-dim h-14 rounded-xl hover:bg-black/5 transition-colors">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766525013/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTIuMDAyIDIxLjVjMy45MDMgMCA2LjUwMi0yLjU0MyA2LjUwMi02LjM1MyAwLTEuODc2LS43MzItMy43NDMtMS4yODUtNC45OTEtMS4wM_hds6ew.svg" className="w-[18px] h-[18px] opacity-80" alt="Watermark" />
                    <span className="text-[11px] text-black/60 font-medium">Watermark</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 bg-panel-dim h-14 rounded-xl hover:bg-black/5 transition-colors">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766525030/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTcuODM0IDYuMTY1djEuNDU2aDEuNDY3VjYuMTY1em0tMS40NTYgMS40NTZ2MS40NTZoMS40NTZWNy42MjF6bS0xLjQ2NyAxLjQ1NnYxL_azqli3.svg" className="w-[18px] h-[18px] opacity-80" alt="Bg Effects" />
                    <span className="text-[11px] text-black/60 font-medium">Bg Effects</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 bg-panel-dim h-14 rounded-xl hover:bg-black/5 transition-colors">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766525364/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTIgMjBjLjI4MSAwIC41MDEtLjE5Ny41NDEtLjQ5My42Ni01Ljc0IDEuMzI1LTYuNDA5IDYuOTUtNi45NzYuMjk4LS4wMjUuNTA5LS4yN_fkkzoa.svg" className="w-[18px] h-[18px] opacity-80" alt="VFX" />
                    <span className="text-[11px] text-black/60 font-medium">VFX</span>
                </button>
            </div>
        </div>

        {/* Scene */}
        <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">Scene</span>
            <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center justify-center gap-2 group">
                    <div className="w-full aspect-[16/9] bg-panel-dim rounded-lg flex items-center justify-center border border-black/5 group-hover:border-black/10">
                        <Ban size={20} className="text-black/40" />
                    </div>
                    <span className="text-[11px] font-semibold text-black/60">None</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 group">
                    <div className="w-full aspect-[16/9] bg-panel-dim rounded-lg overflow-hidden border border-black/5 group-hover:border-black/10">
                        <img src="https://shots.so/image/shadow-scene.png" className="w-full h-full object-cover" alt="shadow" />
                    </div>
                    <span className="text-[11px] font-semibold text-black/60">Shadow</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 group">
                    <div className="w-full aspect-[16/9] bg-panel-dim rounded-lg overflow-hidden border border-black/5 group-hover:border-black/10">
                        <img src="https://shots.so/image/shapes-scene.png" className="w-full h-full object-cover" alt="shapes" />
                    </div>
                    <span className="text-[11px] font-semibold text-black/60">Shapes</span>
                </button>
            </div>
        </div>

        {/* Background Section - New Layout */}
        <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase font-bold tracking-wider text-black/40">Background</span>
            
            {/* Type Selector (Transparent/Color/Image/Unsplash shortcuts) */}
            <div className="grid grid-cols-4 gap-2">
                <button className="flex flex-col items-center justify-center gap-1.5 bg-panel-dim aspect-square rounded-xl hover:bg-black/5 transition-colors">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766525370/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiPjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0idXJsKCN0cmFuc3BhcmVud_alxjrq.svg" className="w-[18px] h-[18px] opacity-80" alt="Transparent" />
                    <span className="text-[11px] font-semibold text-black/60 truncate w-full text-center px-1">Trans..</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 bg-panel-dim aspect-square rounded-xl hover:bg-black/5 transition-colors">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766525400/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtMTQuNDM4IDEwLjYwOS0zLjU0MiAzLjU1OWMtLjMxNi4zMTUtLjcxOS40MjUtMS4wNTEuMDczLS4zNC0uMzc3LS4yNjktLjcyNC4wODgtM_dtuzeb.svg" className="w-[18px] h-[18px] opacity-80" alt="Color" />
                    <span className="text-[11px] font-semibold text-black/60 truncate w-full text-center px-1">Color</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 bg-panel-dim aspect-square rounded-xl hover:bg-black/5 transition-colors">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766526227/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTUuOSAzQzE4Ljk1IDMgMjEgNS4xNCAyMSA4LjMyNXY3LjM1QzIxIDE4Ljg1OSAxOC45NSAyMSAxNS44OTkgMjFoLTcuOEM1LjA0OSAyM_iscgpi.svg" className="w-[18px] h-[18px] opacity-80" alt="Image" />
                    <span className="text-[11px] font-semibold text-black/60 truncate w-full text-center px-1">Image</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 bg-panel-dim aspect-square rounded-xl hover:bg-black/5 transition-colors">
                    <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766526228/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTUuNyAxMC44NDVIMjJWMjJIMlYxMC44NDVoNi4yOTl2NS41NzZIMTUuN3pNMTUuNyAySDguMjk5djUuNTc2SDE1Ljd6Ii8_PC9zdmc_pb0bj1.svg" className="w-[18px] h-[18px] opacity-80" alt="Unsplash" />
                    <span className="text-[11px] font-semibold text-black/60 truncate w-full text-center px-1">Unspl..</span>
                </button>
            </div>

            {/* Magic Backgrounds */}
            <div className="flex flex-col gap-2">
                <div className="w-full bg-[#f4f4f5] rounded-[22px] p-4 relative overflow-hidden group cursor-pointer border border-transparent hover:border-black/5 transition-all">
                    <div className="relative z-10 flex flex-col items-start gap-1 mr-16">
                         <div className="flex items-center gap-1.5">
                            <span className="text-[18px] font-bold text-black tracking-tight">Magic</span>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
                                <path d="M14 2L15.5 8.5L22 10L15.5 11.5L14 18L12.5 11.5L6 10L12.5 8.5L14 2Z" fill="#FF5D5D" />
                                <path d="M5 16L6 19.5L9.5 20.5L6 21.5L5 25L4 21.5L0.5 20.5L4 19.5L5 16Z" fill="#C084FC" />
                                <path d="M22 17L22.8 19.2L25 20L22.8 20.8L22 23L21.2 20.8L19 20L21.2 19.2L22 17Z" fill="#FDA4AF" />
                            </svg>
                         </div>
                         <p className="text-[12px] font-semibold text-black/50 leading-[1.3] text-left">
                            Uses media in your mockup to generate magic backgrounds
                         </p>
                    </div>

                    {/* Images */}
                    <div className="absolute top-1/2 right-[-10px] -translate-y-1/2 w-[80px] h-[80px]">
                         <div className="absolute top-0 right-[25px] w-[56px] aspect-[4/3] bg-black rounded-[6px] shadow-sm transform -rotate-12 border-[2px] border-white overflow-hidden z-10 ring-1 ring-black/5">
                              <img src="https://shots.so/image/magic-preview2.jpeg" className="w-full h-full object-cover" alt="magic" />
                         </div>
                         <div className="absolute bottom-[5px] right-[10px] w-[56px] aspect-[4/3] bg-black rounded-[6px] shadow-lg transform rotate-6 border-[2px] border-white overflow-hidden z-20 ring-1 ring-black/5">
                              <img src="https://shots.so/image/magic-preview1.jpeg" className="w-full h-full object-cover" alt="magic" />
                         </div>
                    </div>
                </div>
            </div>

            {/* Dynamic Background Categories */}
            {BACKGROUND_CATEGORIES.map(renderBackgroundSection)}

        </div>
    </div>
  );

  const isMenuOpen = (showDeviceMenu && activeTab === 'mockup') || (showFrameMenu && activeTab === 'frame');

  return (
    <div 
        className={`relative z-10 h-full bg-panel rounded-2xl flex flex-col overflow-hidden shadow-sm border border-black/5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${isMenuOpen ? 'min-w-[350px] w-[350px]' : 'min-w-[260px] w-[260px]'}`}
    >
      {/* Tabs */}
      <div className="flex items-center justify-between p-2 bg-panel z-50">
        <div className="flex flex-1 items-center gap-1 bg-panel-dim p-1 rounded-xl">
          <button 
            className={`flex-1 py-1.5 text-[14px] font-semibold rounded-lg transition-all ${activeTab === 'mockup' ? 'bg-white text-primary shadow-sm border border-black/5' : 'text-black/40 hover:text-black/70'}`}
            onClick={() => setActiveTab('mockup')}
          >
            Mockup
          </button>
          <button 
            className={`flex-1 py-1.5 text-[14px] font-semibold rounded-lg transition-all ${activeTab === 'frame' ? 'bg-white text-primary shadow-sm border border-black/5' : 'text-black/40 hover:text-black/70'}`}
            onClick={() => setActiveTab('frame')}
          >
            Frame
          </button>
        </div>
      </div>

      {showDeviceMenu && activeTab === 'mockup' && renderDeviceMenu()}
      {showFrameMenu && activeTab === 'frame' && renderFrameMenu()}
      
      {!isMenuOpen && (
        <>
            {/* Selectors (Always Visible) */}
            <div className="px-2 pb-4 relative z-50">
                {activeTab === 'mockup' ? (
                    <button 
                        onClick={() => setShowDeviceMenu(true)}
                        className="w-full h-12 bg-panel-dim rounded-xl flex items-center px-3 gap-3 hover:bg-black/5 transition-colors border border-black/5"
                    >
                        <img src="https://shots.so/image/mockup-icons/screenshot.png" className="h-8 w-auto" alt="device" />
                        <div className="flex flex-col items-start flex-1 overflow-hidden">
                            <p className="text-[14px] font-semibold truncate w-full text-left text-black">Screenshot</p>
                            <span className="text-[11px] text-black/40 font-semibold">Adapts to media</span>
                        </div>
                        <ChevronDown size={14} className="text-black/40" />
                    </button>
                ) : (
                    <button 
                        onClick={() => setShowFrameMenu(true)}
                        className="w-full h-12 bg-panel-dim rounded-xl flex items-center px-3 gap-3 hover:bg-black/5 transition-colors border border-black/5"
                    >
                        <div className="w-8 h-8 flex items-center justify-center bg-black/5 rounded-lg border border-black/5">
                            <RectangleHorizontal size={18} className="text-black/60" />
                        </div>
                        <div className="flex flex-col items-start flex-1 overflow-hidden">
                            <p className="text-[14px] font-semibold truncate w-full text-left text-black">Default 4:3</p>
                            <span className="text-[11px] text-black/40 font-semibold">1920 x 1440</span>
                        </div>
                        <ChevronDown size={14} className="text-black/40" />
                    </button>
                )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-2.5 pb-4 scrollbar-hide">
                {activeTab === 'mockup' ? renderMockupContent() : renderFrameContent()}
            </div>
        </>
      )}
    </div>
  );
};

export default LeftSidebar;