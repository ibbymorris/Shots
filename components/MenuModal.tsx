import React from 'react';
import { X, MessageSquare, Heart, Smartphone } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
        <div className="flex items-center gap-3 px-6 pt-6 pb-4 bg-[#f4f4f5] z-10 shrink-0">
             <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full transition-colors text-black/60"
            >
                <X size={18} />
            </button>
            <div className="flex items-center gap-2">
                <img src="https://shots.so/image/shots-logo.png" alt="Shots" className="h-8 w-auto" />
                <span className="text-[19px] font-bold tracking-tight text-black">Shots</span>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 scrollbar-hide">
            
            {/* Cards Grid */}
            <div className="flex flex-wrap gap-4 w-full">
                
                {/* Huge Card - Unlock Power */}
                <div className="w-full relative bg-white rounded-[26px] p-4 flex flex-col justify-between gap-3 overflow-hidden border border-black/5 shadow-sm group cursor-pointer h-[300px]">
                    <div className="absolute top-4 left-4 z-20 bg-[#f4f4f5] px-3 py-1 rounded-full text-[12.5px] font-medium border border-black/5 text-black">
                        Now Available in Pounds 🇬🇧
                    </div>
                    <div className="z-10 mt-auto flex flex-col gap-1">
                        <span className="text-[17px] font-medium text-black">Unlock the Full Power of Shots</span>
                        <span className="text-[11px] text-black/60">Videos & zooms, animations, and effortless styles.</span>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <video 
                            src="https://shots.so/image/video-content/animation-demo5.mp4" 
                            autoPlay muted loop playsInline 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                    </div>
                </div>

                {/* Small Card - Login */}
                <div className="w-full bg-white rounded-[26px] p-4 flex items-center gap-4 border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors h-[80px]">
                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20" width="20" height="20">
                            <path fillRule="evenodd" d="M13.199 5.4c0-2.982-2.327-5.4-5.197-5.4S2.806 2.418 2.806 5.4s2.326 5.4 5.196 5.4 5.197-2.417 5.197-5.4m-3.048 8.15a26.4 26.4 0 0 0-4.28 0q-1.17.065-2.32.293c-1.67.312-2.749.89-3.202 1.78-.178.348-.27.736-.266 1.13.002.391.096.776.274 1.12.462.89 1.541 1.46 3.193 1.78q1.146.232 2.312.294.385 0 .796.053h1.31c.728 0 1.447 0 2.166-.08a16.4 16.4 0 0 0 2.311-.303c1.713-.302 2.748-.89 3.21-1.779a2.49 2.49 0 0 0 0-2.215c-.461-.89-1.54-1.441-3.192-1.78a17 17 0 0 0-2.312-.293" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[17px] font-medium text-black">Login</span>
                        <span className="text-[11px] text-black/60">Get back to your account</span>
                    </div>
                </div>

                {/* Small Card - Appearance */}
                <div className="w-full bg-white rounded-[26px] p-4 flex items-center gap-4 border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors h-[80px]">
                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M3.993 20.874c1.306 1.313 2.996 1.33 4.285.042 1.029-1.03 2.025-3.356 2.786-4.519l2.025 2.033c.619.628 1.373.628 1.958.025l.72-.719c.611-.619.602-1.322-.025-1.95L9.089 9.125c-.636-.627-1.347-.636-1.958-.025l-.719.72c-.603.602-.603 1.33.025 1.958l2.025 2.025c-1.155.761-3.473 1.757-4.511 2.786-1.28 1.289-1.271 2.988.042 4.285m2.235-1.088a1.04 1.04 0 0 1-1.038-1.038c0-.569.46-1.029 1.038-1.029.569 0 1.029.46 1.029 1.029s-.46 1.038-1.029 1.038m10.51-4.385 3.246-3.247c.929-.928.904-2.033-.041-2.995l-.427-.436c-.87 1.13-3.356 2.452-3.833 1.975-.075-.075-.083-.226.025-.343 1.013-1.012 1.674-2 1.825-3.606l-4.302-4.31c-.795-.795-2.175-.535-2.552.971-.527 2.142-1.004 3.389-1.523 4.418z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[17px] font-medium text-black">Appearance</span>
                        <span className="text-[11px] text-black/60">System</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-black/5 mx-2"></div>

                {/* Medium Card - Feedback */}
                <div className="w-[calc(50%-8px)] bg-white rounded-[26px] p-4 flex flex-col justify-between gap-2 border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors aspect-square">
                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-black">
                        <MessageSquare size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[17px] font-medium text-black leading-tight">Send feedback</span>
                        <span className="text-[11px] text-black/60">We read them all</span>
                    </div>
                </div>

                {/* Medium Card - What's New */}
                <div className="w-[calc(50%-8px)] bg-white rounded-[26px] p-4 flex flex-col justify-between gap-2 border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors aspect-square">
                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-black">
                        <Heart size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[17px] font-medium text-black leading-tight">What's new</span>
                        <span className="text-[11px] text-black/60">Learn about updates</span>
                    </div>
                </div>

                {/* Large Card - Mobile */}
                <div className="w-full bg-white rounded-[26px] p-4 flex flex-col justify-between gap-2 border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden relative aspect-[2/1]">
                    <div className="z-10 flex flex-col">
                        <span className="text-[17px] font-medium text-black">Get Shots Mobile</span>
                        <span className="text-[11px] text-black/60">Learn more</span>
                    </div>
                    <div className="absolute right-0 bottom-0 w-[50%] h-[120%]">
                        <img src="https://shots.so/image/menu/mobile-card2.png" alt="Mobile" className="w-full h-full object-contain object-bottom" />
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-black/5 mx-2"></div>

                {/* Large Card - Ads */}
                <div className="w-full bg-white rounded-[26px] p-4 flex flex-col justify-between gap-2 border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden relative aspect-[2/1]">
                    <div className="z-10 flex flex-col">
                        <span className="text-[17px] font-medium text-black">Advertise on Shots</span>
                        <span className="text-[11px] text-black/60">Get seen by creators & founders.</span>
                    </div>
                    <div className="absolute right-0 bottom-0 w-[40%] h-[100%]">
                        <img src="https://shots.so/image/menu/card.png" alt="Ad" className="w-full h-full object-contain object-right-bottom" />
                    </div>
                </div>

                {/* Tiny Card - Twitter */}
                <div className="w-[calc(50%-8px)] bg-white rounded-[26px] p-4 flex items-center gap-3 border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden h-[80px]">
                    <div className="flex flex-col z-10">
                        <span className="text-[17px] font-medium text-black">Twitter</span>
                        <span className="text-[11px] text-black/60">@ShotsAppHQ</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 text-black/5 pointer-events-none">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </div>

                {/* Tiny Card - Instagram */}
                <div className="w-[calc(50%-8px)] bg-white rounded-[26px] p-4 flex items-center gap-3 border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden h-[80px]">
                    <div className="flex flex-col z-10">
                        <span className="text-[17px] font-medium text-black">Instagram</span>
                        <span className="text-[11px] text-black/60">@ShotsAppHQ</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 text-black/5 pointer-events-none">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </div>

            </div>

            {/* Footer */}
            <div className="flex flex-col items-center gap-2 mt-4 pb-8">
                <div className="flex items-center gap-2">
                    <img src="https://shots.so/image/shots-logo.png" alt="Shots" className="h-16 w-auto" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[21px] font-medium tracking-tight text-black">Shots</span>
                    <span className="text-[11px] text-black/60">Version 1.4.7</span>
                    <span className="mt-2 bg-black/5 px-2 py-0.5 rounded-full text-[12px] font-semibold text-black/60 tracking-wider">BETA</span>
                </div>
                <div className="flex gap-4 mt-2">
                    <button className="flex items-center gap-1 text-black/60 hover:text-black transition-colors text-[12.5px] font-medium">
                        <span>Terms of service</span>
                    </button>
                    <button className="flex items-center gap-1 text-black/60 hover:text-black transition-colors text-[12.5px] font-medium">
                        <span>Privacy policy</span>
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default MenuModal;