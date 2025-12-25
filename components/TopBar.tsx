import React, { useState, useRef, useEffect } from 'react';
import { Undo, Redo, RotateCcw, Command, Zap } from 'lucide-react';
import ExportMenu from './ExportMenu';
import ShortcutsMenu from './ShortcutsMenu';

interface TopBarProps {
  onOpenUpgrade?: () => void;
  onOpenMenu?: () => void;
  onCopy?: () => void;
  onTogglePreview?: () => void;
  onOpenFeedback?: () => void;
  onOpenTemplates?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onOpenUpgrade, onOpenMenu, onCopy, onTogglePreview, onOpenFeedback, onOpenTemplates }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const shortcutsRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
      if (shortcutsRef.current && !shortcutsRef.current.contains(event.target as Node)) {
        setShowShortcuts(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center gap-2 min-w-full">
      {/* Left: Logo & Templates */}
      <nav className="flex items-center justify-between h-11 px-1 bg-panel rounded-[14px] min-w-[260px] max-w-[260px] relative z-50 shadow-sm border border-black/5">
        <button 
            onClick={onOpenMenu}
            className="flex items-center justify-center gap-0.5 px-1 py-0.5 bg-transparent border-none text-primary cursor-pointer transition-all hover:opacity-80"
        >
          <img src="https://shots.so/image/shots-logo.png" alt="Shots Logo" className="h-[30px] w-auto mr-0.5" />
          <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766512216/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTcuMTc5IDEyLjE2OGEuOTUuOTUgMCAwIDAtLjI5My0uNjkyTDkuNjQ0IDQuMjgxQS45LjkgMCAwIDAgOC45NjQgNGMtLjU1IDAtLjk3M_hn4qih.svg" className="w-4 h-4 opacity-60" alt="Toggle" />
        </button>
        <div className="flex items-center gap-1.5 flex-1 justify-end">
          <button 
            onClick={onOpenTemplates}
            className="flex items-center justify-center flex-row-reverse gap-0.5 px-1 py-0.5 rounded-[10px] bg-transparent hover:bg-black/5 text-[15px] font-semibold text-primary transition-all"
          >
            <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766512216/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTcuMTc5IDEyLjE2OGEuOTUuOTUgMCAwIDAtLjI5My0uNjkyTDkuNjQ0IDQuMjgxQS45LjkgMCAwIDAgOC45NjQgNGMtLjU1IDAtLjk3M_hn4qih.svg" className="w-4 h-4 opacity-60" alt="Toggle" />
            <span>Templates</span>
            <img src="https://shots.so/image/templates-icon.png" alt="Templates" className="h-[30px] w-auto mr-0.5" />
          </button>
        </div>
      </nav>

      {/* Center: Offers & Actions */}
      <div className="flex flex-1 gap-2 p-1">
        <div className="flex flex-1 justify-start items-center gap-2">
          <button 
            onClick={onOpenUpgrade}
            className="flex flex-row-reverse items-center justify-center gap-0 px-1.5 py-1.5 rounded-[10px] bg-black/5 hover:bg-black/10 text-primary transition-colors"
          >
            <img 
              src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766512216/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTcuMTc5IDEyLjE2OGEuOTUuOTUgMCAwIDAtLjI5My0uNjkyTDkuNjQ0IDQuMjgxQS45LjkgMCAwIDAgOC45NjQgNGMtLjU1IDAtLjk3M_hn4qih.svg" 
              className="w-4 h-4 opacity-60" 
              alt="Arrow"
            />
            <div className="flex max-w-max">
              <span className="bg-[#ff2a2a] text-white rounded-full px-2.5 py-0.5 text-[15px] font-bold leading-5 mr-1.5 shadow-sm">40% OFF</span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center p-2 rounded-[9px] hover:bg-black/10 text-primary group relative">
            <Undo size={18} className="" />
            <div className="absolute top-[120%] opacity-0 group-hover:opacity-100 transition-opacity bg-panel border border-black/5 rounded-2xl px-3 py-1.5 text-[14px] font-semibold shadow-lg whitespace-nowrap z-50 pointer-events-none text-black">
              Undo <span className="ml-2 bg-black/5 text-black rounded text-xs px-1 font-bold">⌘Z</span>
            </div>
          </button>
          <button className="flex items-center justify-center p-2 rounded-[9px] hover:bg-black/10 text-primary group relative">
            <Redo size={18} className="" />
            <div className="absolute top-[120%] opacity-0 group-hover:opacity-100 transition-opacity bg-panel border border-black/5 rounded-2xl px-3 py-1.5 text-[14px] font-semibold shadow-lg whitespace-nowrap z-50 pointer-events-none text-black">
              Redo <span className="ml-2 bg-black/5 text-black rounded text-xs px-1 font-bold">⇧⌘Z</span>
            </div>
          </button>

          <div className="relative" ref={shortcutsRef}>
              <button 
                onClick={() => setShowShortcuts(!showShortcuts)}
                className={`flex items-center justify-center p-2 rounded-[9px] hover:bg-black/10 text-primary transition-colors ${showShortcuts ? 'bg-black/10' : ''}`}
              >
                <Command size={18} className="" />
              </button>
              {showShortcuts && <ShortcutsMenu />}
          </div>
          
          <div className="relative z-50 flex flex-col items-center">
            <div className="bg-panel rounded-full h-9 w-24 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-panel-active transition-colors shadow-sm border border-black/5">
              <span className="text-[14px] font-semibold text-black">Start Over</span>
            </div>
          </div>

          <button 
            onClick={onTogglePreview}
            className="flex items-center justify-center p-2 rounded-[10px] hover:bg-black/10 text-primary group relative"
          >
             <img 
                src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766509201/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjEuMTQ5IDEwLjQwN2MuNSAwIC44NTEtLjM3Mi44NTEtLjg1M1YzLjQ4NkMyMiAyLjU1IDIxLjQ0OSAyIDIwLjUwNyAyaC02LjA3Yy0uN_ikjtoi.svg" 
                alt="Preview" 
                className="w-[18px] h-[18px]" 
             />
             <div className="absolute top-[120%] opacity-0 group-hover:opacity-100 transition-opacity bg-panel border border-black/5 rounded-2xl px-3 py-1.5 text-[14px] font-semibold shadow-lg whitespace-nowrap z-50 pointer-events-none text-black">
              Preview
            </div>
          </button>

          <button 
            onClick={onOpenFeedback}
            className="flex items-center justify-center p-2 rounded-[10px] hover:bg-black/10 text-primary group relative"
          >
             <img 
                src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766509199/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjIuMDggNy4wNDl2Ny4yMTZjMCAyLjU2Ny0xLjQ0MiA0LjA0Mi00LjA0OSA0LjA0MmgtNi40NzVsLTMuMzI0IDIuOTk3Yy0uMzc2LjM0O_rljirb.svg" 
                alt="Feedback" 
                className="w-[18px] h-[18px]" 
             />
             <div className="absolute top-[120%] opacity-0 group-hover:opacity-100 transition-opacity bg-panel border border-black/5 rounded-2xl px-3 py-1.5 text-[14px] font-semibold shadow-lg whitespace-nowrap z-50 pointer-events-none text-black">
              Feedback
            </div>
          </button>

          <button 
            className="flex items-center justify-center p-2 rounded-[10px] hover:bg-black/10 text-primary group relative"
          >
             <Zap size={18} />
             <div className="absolute top-[120%] opacity-0 group-hover:opacity-100 transition-opacity bg-panel border border-black/5 rounded-2xl px-3 py-1.5 text-[14px] font-semibold shadow-lg whitespace-nowrap z-50 pointer-events-none text-black">
              Performance Mode
            </div>
          </button>
        </div>
        <div className="flex flex-1 justify-end items-center gap-2"></div>
      </div>

      {/* Right: Export & Actions */}
      <div className="relative min-w-[260px] max-w-[260px] h-11 flex justify-end z-50">
        <div className="w-full h-11 bg-panel rounded-[14px] flex items-center shadow-sm border border-black/5 p-1">
          {/* Main Export Button */}
          <button className="flex-1 h-full pl-2 pr-1 flex items-center gap-2 rounded-lg hover:bg-black/5 transition-colors group">
              <div className="w-5 h-5 flex-shrink-0 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
                      <path fill="currentColor" d="M12.058 22c-.631 0-1.087-.443-1.087-1.074V7.533l.134-3.303.684.241L7.72 8.998l-1.921 1.867c-.188.188-.47.295-.752.295C4.442 11.16 4 10.69 4 10.1c0-.282.106-.538.334-.793l6.919-6.932c.228-.241.51-.375.805-.375s.578.134.806.375l6.918 6.932c.228.255.335.511.335.793 0 .59-.443 1.06-1.047 1.06-.282 0-.564-.107-.752-.295l-1.921-1.867-4.084-4.527.699-.241.134 3.303v13.393c0 .631-.456 1.074-1.088 1.074" />
                  </svg>
              </div>
              <span className="text-[17px] font-semibold text-black capitalize tracking-tight leading-6">Export</span>
              <span className="text-black text-[13.5px] font-semibold ml-auto tracking-tight opacity-100">1x · PNG</span>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-black/10 mx-0.5"></div>

          {/* Copy Button */}
          <button 
              onClick={onCopy}
              className="w-9 h-full flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors flex-shrink-0"
          >
             <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766519635/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PGcgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMS44MiA2LjAyaC4yYy4xNiAwIC4zMi4wNi40My4xOGw0LjA3IDQuMjRjLjEuMTEuMTYuMjYuM_kur3xr.svg" className="w-5 h-5 text-black" alt="Copy" />
          </button>
          
          {/* Divider */}
          <div className="w-px h-6 bg-black/10 mx-0.5"></div>

          {/* Settings Toggle */}
          <div className="relative h-full flex-shrink-0" ref={exportRef}>
              <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className={`w-9 h-full flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors ${showExportMenu ? 'bg-black/5' : ''}`}
              >
                  <img src="https://res.cloudinary.com/ditco4c8e/image/upload/v1766519633/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI_PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy4zOCAxMy43YzEuNzEgMCAzLjExIDEuMzggMy4xMSAzLjA5IDAgMS43LTEuNCAzLjA9LTMuMTIgM_pg65jz.svg" className="w-5 h-5 text-black" alt="Settings" />
              </button>
              {showExportMenu && <ExportMenu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;