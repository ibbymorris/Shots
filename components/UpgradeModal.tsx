import React, { useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Folder, ZoomIn, Video, Image, Zap } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[1000px] h-[90vh] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-50 p-2 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <div className="flex flex-col w-full pb-10">
            
            {/* Header Section */}
            <div className="flex flex-col gap-5 relative">
                {/* Video Cover */}
                <div className="w-full aspect-[2/1] relative overflow-hidden -mb-[120px] z-0">
                    <video 
                        src="https://shots.so/image/video-content/animation-demo3.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-center text-center px-5 gap-1.5 z-10">
                    <span className="bg-[#ff2a2a] text-white rounded-full px-3 py-1 text-[17px] font-medium tracking-tight shadow-sm">
                        End of Year Sale
                    </span>
                    <h2 className="text-[34px] font-medium leading-tight tracking-tight text-black mt-2">
                        Unlock the Full Power of Shots
                    </h2>
                    <p className="text-[17px] font-medium text-black/60 tracking-tight">
                        Videos, Zooms, Animations and Effortless Styles.
                    </p>
                </div>
            </div>

            {/* Slider Section */}
            <div className="w-full relative mt-8 mb-4">
                {/* Scroll Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-3 px-5 pb-4 scrollbar-hide snap-x snap-mandatory"
                >
                    {[
                        { title: "Highest Quality", desc: "Export 2K 60fps videos and 6K images.", img: "https://shots.so/image/upgrade/quality4.png" },
                        { title: "Video + Animation", desc: "Zoom, animate, and showcase with motion.", img: "https://shots.so/image/upgrade/video3.png" },
                        { title: "Scenes", desc: "Add 3D shapes and realistic shadows.", img: "https://shots.so/image/upgrade/shapes1.png" },
                        { title: "Magic Backgrounds", desc: "Generated from your image or video.", img: "https://shots.so/image/upgrade/magic2.png" },
                        { title: "VFX Effects", desc: "Apply grain, VHS, and cinematic filters.", img: "https://shots.so/image/upgrade/vfx3.png" },
                        { title: "Custom Watermark", desc: "Add your own branding to your content.", img: "https://shots.so/image/upgrade/watermark2.png" },
                    ].map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-[240px] aspect-[8.5/12] bg-black rounded-[20px] flex flex-col overflow-hidden relative snap-start">
                            <div className="flex-1 order-1 overflow-hidden" style={{ maskImage: 'linear-gradient(transparent, black 15%, black 80%, transparent)' }}>
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col order-2 gap-1.5 p-5 pt-2.5 pb-5 z-10">
                                <span className="text-[17px] font-medium text-white tracking-tight leading-none">{item.title}</span>
                                <p className="text-[16px] leading-[22px] font-medium text-white/60 tracking-tight">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-2.5 mt-2">
                    <button onClick={scrollLeft} className="p-2 bg-black/5 hover:bg-black/10 rounded-[9px] text-black transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={scrollRight} className="p-2 bg-black/5 hover:bg-black/10 rounded-[9px] text-black transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Pricing Toggles */}
            <div className="flex justify-center p-5">
                <div className="bg-[#f4f4f5] rounded-[50px] p-0.5 flex w-full max-w-[322px] relative gap-0.5">
                    <button className="flex-1 py-2 px-2.5 text-[15px] font-medium text-black/60 hover:text-black rounded-full transition-colors capitalize">7 day pass</button>
                    <button className="flex-1 py-2 px-2.5 text-[15px] font-medium text-black bg-white shadow-sm rounded-[10px] transition-colors capitalize relative z-10">month</button>
                    <button className="flex-1 py-2 px-2.5 text-[15px] font-medium text-black/60 hover:text-black rounded-full transition-colors capitalize">year</button>
                    
                    <div className="absolute -top-[12px] -right-[10px] bg-[#ff2a2a] text-white text-[12px] font-medium px-2 py-0.5 rounded-full border-2 border-white transform rotate-3 z-20 shadow-sm">
                        40% OFF
                    </div>
                </div>
            </div>

            {/* Plans */}
            <div className="flex flex-col items-center gap-5 p-5 w-full max-w-[460px] mx-auto">
                <div className="flex flex-row justify-center gap-5 w-full">
                    {/* Plus Plan */}
                    <div className="flex flex-col items-center gap-2 w-full text-center flex-1">
                        <span className="text-[11px] uppercase font-bold tracking-wide text-[#ffa724] invisible">Most popular</span>
                        <div className="w-[120px] aspect-[2.2] rounded-2xl relative grid place-items-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ff6432] via-[#ff0065] to-[#7b2eff] bg-[length:200%_100%] bg-left"></div>
                            <div className="absolute inset-y-0 -left-full w-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,transparent_50%)]"></div>
                            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://assets.shots.so/canvas/noise2.svg')]"></div>
                            <span className="relative z-10 text-white text-[34px] font-semibold tracking-tight">PLUS</span>
                        </div>
                        <span className="text-[14px] leading-[20px] tracking-tight text-black mt-1">All Shots features. <br/> Great for image content.</span>
                        <span className="bg-[#ff2a2a] text-white text-[12.5px] font-semibold rounded-lg px-1.5 py-0.5 my-1">20% Off End of Year</span>
                        <p className="flex items-center gap-1 text-[21px] font-medium tracking-tight">
                            <span className="text-[#ff2a2a] line-through decoration-[#ff2a2a] decoration-2 opacity-60 mr-1">£7</span>
                            <span>£5.6</span>
                            <span className="text-[14px] text-black/60 font-medium">/ month</span>
                        </p>
                        <button className="w-full bg-black text-white rounded-[14px] py-3.5 px-4 text-[15px] font-medium mt-1 hover:opacity-90 transition-opacity">
                            Get Started
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="flex flex-col items-center gap-2 w-full text-center flex-1">
                        <span className="text-[11px] uppercase font-bold tracking-wide text-[#ffa724]">Most popular</span>
                        <div className="w-[120px] aspect-[2.2] rounded-2xl relative grid place-items-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ff6432] via-[#ff0065] to-[#7b2eff] bg-[length:200%_100%] bg-right"></div>
                            <div className="absolute inset-y-0 -left-full w-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,transparent_50%)]"></div>
                            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://assets.shots.so/canvas/noise2.svg')]"></div>
                            <span className="relative z-10 text-white text-[34px] font-semibold tracking-tight">PRO</span>
                        </div>
                        <span className="text-[14px] leading-[20px] tracking-tight text-black mt-1">The Ultimate Power. <br/> Amazing for video content.</span>
                        <span className="bg-[#ff2a2a] text-white text-[12.5px] font-semibold rounded-lg px-1.5 py-0.5 my-1">20% Off End of Year</span>
                        <p className="flex items-center gap-1 text-[21px] font-medium tracking-tight">
                            <span className="text-[#ff2a2a] line-through decoration-[#ff2a2a] decoration-2 opacity-60 mr-1">£11</span>
                            <span>£8.8</span>
                            <span className="text-[14px] text-black/60 font-medium">/ month</span>
                        </p>
                        <button className="w-full bg-black text-white rounded-[14px] py-3.5 px-4 text-[15px] font-medium mt-1 hover:opacity-90 transition-opacity">
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-black/10 my-0"></div>

                {/* Feature Comparison */}
                <div className="w-full flex gap-5 py-5">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col gap-10">
                        <div className="flex flex-col items-center text-center gap-1.5">
                            <div className="flex items-center gap-1 text-black">
                                <Folder size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">Drafts & Folders</span>
                            <span className="text-[12.5px] text-black/60">Coming soon</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5">
                            <div className="flex items-center gap-1 text-black">
                                <ZoomIn size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">Animation & Zoom</span>
                            <span className="text-[12.5px] text-black/60">30 fps</span>
                            <span className="text-[12.5px] text-black/60">+ Parallax effects</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5">
                            <div className="flex items-center gap-1 text-black">
                                <Video size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">720p Video at 30 fps</span>
                            <span className="text-[12.5px] text-black/60">10 exports</span>
                            <span className="text-[12.5px] text-black/60">Up to 1 minute each</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5 opacity-0">
                             {/* Spacer for alignment */}
                             <div className="h-[32px]"></div>
                             <span>Hidden</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5">
                            <div className="flex items-center gap-1 text-black">
                                <Image size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">2x Image Quality</span>
                            <span className="text-[12.5px] text-black/60">4K Resolution</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5 opacity-0">
                             {/* Spacer */}
                             <div className="h-[32px]"></div>
                             <span>Hidden</span>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex flex-col gap-10">
                        <div className="flex flex-col items-center text-center gap-1.5">
                            <div className="flex items-center gap-1 text-black">
                                <Folder size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">Drafts & Folders</span>
                            <span className="text-[12.5px] text-black/60">Coming soon</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5">
                            <div className="flex items-center gap-1 text-black">
                                <ZoomIn size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">Animation & Zoom</span>
                            <span className="text-[12.5px] text-black/60">60 fps</span>
                            <span className="text-[12.5px] text-black/60">+ Parallax effects</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5">
                            <div className="flex items-center gap-1 text-black">
                                <Video size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">2K Video at 60 fps</span>
                            <span className="text-[12.5px] text-black/60">Unlimited exports</span>
                            <span className="text-[12.5px] text-black/60">Up to 3 minutes each</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5 relative">
                            {/* Dash indicator for feature included in PRO */}
                            <div className="absolute top-1/2 -left-6 w-[26px] h-[2px] bg-black"></div>
                            <div className="flex items-center gap-1 text-black">
                                <Zap size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">Transparent Video</span>
                            <span className="text-[12.5px] text-black/60">1080p at 45 fps (webm)</span>
                            <span className="text-[12.5px] text-black/60">Up to 20 seconds</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5">
                            <div className="flex items-center gap-1 text-black">
                                <Image size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">3x Image Quality</span>
                            <span className="text-[12.5px] text-black/60">6K Resolution</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1.5">
                            <div className="flex items-center gap-1 text-black">
                                <Zap size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[16px] font-medium text-black tracking-tight">2.5X Faster Exports</span>
                            <span className="text-[12.5px] text-black/60">Images & Videos</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center gap-5 p-5 pb-10 w-full max-w-[460px] mx-auto">
                <span className="text-[14px] text-black/60">Cancel anytime. Accepted payment methods:</span>
                <div className="flex flex-wrap justify-center gap-3">
                    <div className="w-[50px] aspect-[16/10] bg-white rounded-full overflow-hidden shadow-sm border border-black/5 flex items-center justify-center">
                        <img src="https://shots.so/image/payment-methods/card.png" className="w-full h-full object-cover" alt="Card" />
                    </div>
                    <div className="w-[50px] aspect-[16/10] bg-white rounded-full overflow-hidden shadow-sm border border-black/5 flex items-center justify-center">
                        <img src="https://shots.so/image/payment-methods/link.png" className="w-full h-full object-cover" alt="Link" />
                    </div>
                    <div className="w-[50px] aspect-[16/10] bg-white rounded-full overflow-hidden shadow-sm border border-black/5 flex items-center justify-center">
                        <img src="https://shots.so/image/payment-methods/apple_pay.png" className="w-full h-full object-cover" alt="Apple Pay" />
                    </div>
                    <div className="w-[50px] aspect-[16/10] bg-white rounded-full overflow-hidden shadow-sm border border-black/5 flex items-center justify-center">
                        <img src="https://shots.so/image/payment-methods/google_pay.png" className="w-full h-full object-cover" alt="Google Pay" />
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;