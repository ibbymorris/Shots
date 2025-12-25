import React from 'react';
import { AppState, BorderType } from '../types';

interface CanvasProps {
  appState: AppState;
  isTimelineOpen?: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ appState, isTimelineOpen }) => {
  const { background, borderType, uploadedImage, selectedStyle, borderRadius, shadowOpacity, zoom } = appState;

  // Calculate border radius styles
  const getBorderRadius = () => {
    return `${borderRadius}px`;
  };

  // Simulate style changes (glass, outline, etc)
  const getContainerStyle = () => {
    let style: React.CSSProperties = {
        borderRadius: getBorderRadius(),
        boxShadow: `0 30px 60px -10px rgba(0, 0, 0, ${shadowOpacity / 100})`, // Dynamic shadow opacity
    };

    if (selectedStyle.includes('glass')) {
        style.backdropFilter = 'blur(24px)';
        style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
        style.border = '1px solid rgba(255, 255, 255, 0.3)';
    } else if (selectedStyle === 'outline') {
        style.border = '2px solid rgba(255, 255, 255, 0.8)';
        style.backgroundColor = 'transparent';
        style.boxShadow = 'none';
    } else {
        // Default style - mimicking the light card look
        style.backgroundColor = '#f4f4f5'; // Solid grey, no transparency
        if (uploadedImage) {
             style.backgroundColor = '#ffffff';
        }
    }

    return style;
  };

  const backgroundStyle: React.CSSProperties = {
    background: background.type === 'image' || background.type === 'unsplash' 
        ? `url(${background.value}) center/cover no-repeat` 
        : background.value
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl border border-transparent transition-all duration-300">
      {/* Canvas Area */}
      <div 
        className={`w-full h-full flex items-center justify-center relative bg-[#dcdcdc] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isTimelineOpen ? 'pb-[240px]' : 'pb-20'}`}
      >
        
        {/* The Mockup Preview Container - Gradient Background */}
        <div 
            className="relative transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] flex items-center justify-center overflow-hidden shadow-2xl"
            style={{
                // Enforce 16:9 Aspect Ratio driven by height to match "Default 16:9"
                aspectRatio: '16/9',
                height: isTimelineOpen ? '65%' : '85%',
                width: 'auto',
                maxWidth: '95%',
                maxHeight: '900px',
                
                borderRadius: '32px', 
                transform: `scale(${zoom / 100})`, 
                ...backgroundStyle
            }}
        >
            {/* The Device/Content Frame - Inner White Box */}
            <div 
                className="relative transition-all duration-300 w-[80%] aspect-[16/9] flex flex-col overflow-hidden"
                style={getContainerStyle()}
            >
                {uploadedImage ? (
                    <img src={uploadedImage} alt="Content" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                        
                        {/* Icons Cluster */}
                        <div className="relative w-40 h-16 flex items-center justify-center">
                             {/* Image Icon - Left Background */}
                             <img 
                                src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766526227/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTUuOSAzQzE4Ljk1IDMgMjEgNS4xNCAyMSA4LjMyNXY3LjM1QzIxIDE4Ljg1OSAxOC45NSAyMSAxNS44OTkgMjFoLTcuOEM1LjA0OSAyM_iscgpi.svg" 
                                className="absolute left-2 w-20 h-20 opacity-[0.15] transform -rotate-12 select-none" 
                                alt="Image" 
                                draggable={false}
                             />

                             {/* Video Icon - Right Background */}
                             <img 
                                src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766529935/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNC41OTkgMTguNWg4LjYyOGMxLjYxNiAwIDIuNi0uOTI4IDIuNi0yLjUxN1Y4LjAxNmMwLTEuNTg5LS44OTEtMi41MTYtMi40OTctMi41M_luzqwh.svg" 
                                className="absolute right-2 w-20 h-20 opacity-[0.15] transform rotate-12 select-none" 
                                alt="Video" 
                                draggable={false}
                             />

                             {/* Plus Button - Center Foreground */}
                             <div className="relative z-10 bg-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                                <img 
                                    src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766554853/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi45NyAxMS4xNmgzLjg4Yy40NiAwIC44My4zNy44My44M3MtLjM4LjgzLS44NC44M2gtMy44OXYzL_as3peh.svg" 
                                    className="w-7 h-7 brightness-0 invert select-none" 
                                    alt="Add" 
                                    draggable={false}
                                />
                             </div>
                        </div>

                        {/* Text */}
                        <div className="text-center space-y-1">
                            <h2 className="text-[42px] font-bold text-black/30 tracking-tight select-none">Drop or Paste</h2>
                            <p className="text-[20px] font-semibold text-black/20 select-none">Images & Videos</p>
                        </div>
                    </div>
                )}
                
                {/* Simulated Glass Reflection/Sheen if applicable */}
                {selectedStyle.includes('glass') && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none"></div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Canvas;