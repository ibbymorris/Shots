import React, { useState } from 'react';
import TopBar from './components/TopBar';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Canvas from './components/Canvas';
import UpgradeModal from './components/UpgradeModal';
import MenuModal from './components/MenuModal';
import FeedbackModal from './components/FeedbackModal';
import TemplatesModal from './components/TemplatesModal';
import Toast from './components/Toast';
import Timeline from './components/Timeline'; // Import Timeline
import { AppState, BorderType } from './types';
import { GRADIENT_BACKGROUNDS } from './constants';
import { Minimize2 } from 'lucide-react';

function App() {
  const [appState, setAppState] = useState<AppState>({
    selectedStyle: 'default',
    borderRadius: 20,
    shadowOpacity: 40,
    background: GRADIENT_BACKGROUNDS[0],
    zoom: 100,
    uploadedImage: null,
    borderType: BorderType.Curved,
  });

  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false); // New state for timeline
  const [copyState, setCopyState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleCopy = () => {
    if (copyState === 'loading') return;
    
    setCopyState('loading');
    
    // Simulate clipboard operation delay
    setTimeout(() => {
        setCopyState('success');
        
        // Hide toast after a delay
        setTimeout(() => {
            setCopyState('idle');
        }, 2500);
    }, 800);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-background text-primary overflow-hidden p-1.5 gap-1.5 relative">
      {!isPreviewMode && (
        <TopBar 
            onOpenUpgrade={() => setIsUpgradeOpen(true)} 
            onOpenMenu={() => setIsMenuOpen(true)}
            onCopy={handleCopy}
            onTogglePreview={() => setIsPreviewMode(true)}
            onOpenFeedback={() => setIsFeedbackOpen(true)}
            onOpenTemplates={() => setIsTemplatesOpen(true)}
        />
      )}
      
      <div className="flex-1 flex gap-1.5 overflow-hidden relative">
        {/* Left Sidebar */}
        {!isPreviewMode && <LeftSidebar appState={appState} setAppState={setAppState} />}
        
        {/* Center Column: Canvas + Timeline Overlay */}
        <div className="flex-1 relative overflow-hidden rounded-xl">
            <Canvas appState={appState} isTimelineOpen={isTimelineOpen} />

            {/* Animate Button - Only show if timeline is closed */}
            {!isPreviewMode && !isTimelineOpen && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <button 
                        onClick={() => setIsTimelineOpen(true)}
                        className="flex items-center gap-2 bg-panel px-5 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 hover:scale-105 transition-transform cursor-pointer"
                    >
                        <img 
                            src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766509193/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNy45MDUgMjAuNTczYS42MTYuNjE2IDAgMCAxLTEuMjMgMCAuNjE0LjYxNCAwIDAgMSAxLjIzIDBtLS45MzEtMS42ODNhLjYxNi42M_cntu8h.svg" 
                            alt="Animate" 
                            className="w-5 h-5 opacity-60" 
                        />
                        <span className="text-[16px] font-semibold text-black tracking-tight">Animate</span>
                    </button>
                </div>
            )}

            {/* Timeline Component - Floating Overlay */}
            {isTimelineOpen && !isPreviewMode && (
                <div className="absolute bottom-4 left-4 right-4 z-40 animate-in slide-in-from-bottom-10 duration-300"> 
                    <Timeline onClose={() => setIsTimelineOpen(false)} />
                </div>
            )}
        </div>

        {/* Right Sidebar */}
        {!isPreviewMode && <RightSidebar appState={appState} setAppState={setAppState} />}
      </div>

      {/* Exit Preview Button */}
      {isPreviewMode && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
          <button 
            onClick={() => setIsPreviewMode(false)}
            className="flex items-center gap-2 bg-black/10 hover:bg-black/20 backdrop-blur-md text-black px-4 py-2 rounded-full font-medium transition-colors shadow-sm border border-black/5"
          >
            <Minimize2 size={16} />
            <span className="text-[14px]">Exit Preview</span>
          </button>
        </div>
      )}

      <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      <TemplatesModal isOpen={isTemplatesOpen} onClose={() => setIsTemplatesOpen(false)} />
      <Toast state={copyState} />
    </div>
  );
}

export default App;