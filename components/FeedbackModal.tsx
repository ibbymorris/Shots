import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const emojis = [
    { id: 1, label: '🤬' },
    { id: 2, label: '😐' },
    { id: 3, label: '😏' },
    { id: 4, label: '😎' },
    { id: 5, label: '😍' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[420px] bg-white rounded-[32px] shadow-2xl p-7 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full transition-colors text-black/60 z-10"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col gap-1 mt-1">
          <h2 className="text-[22px] font-semibold text-black leading-tight tracking-tight">Send feedback,</h2>
          <span className="text-[22px] font-medium text-black/40 leading-tight tracking-tight">We read them all!</span>
        </div>

        {/* Emojis */}
        <div className="flex justify-between gap-2 px-1">
            {emojis.map((item) => (
                <button 
                    key={item.id}
                    onClick={() => setSelectedEmoji(item.id)}
                    className={`w-[56px] h-[56px] rounded-full flex items-center justify-center text-[32px] transition-all hover:scale-110 border border-transparent ${selectedEmoji === item.id ? 'bg-black/10 scale-110 shadow-inner' : 'bg-[#f4f4f5] hover:bg-[#e4e4e7]'}`}
                >
                    {item.label}
                </button>
            ))}
        </div>

        {/* Input Area */}
        <div className="flex flex-col gap-3 mt-1">
            <span className="text-[17px] font-medium text-black tracking-tight">How can we improve your experience?</span>
            <textarea 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback..."
                className="w-full h-[160px] bg-[#e4e4e7] rounded-[18px] p-4 text-[15px] resize-none outline-none placeholder:text-black/40 border border-transparent focus:border-black/5 text-black"
            />
        </div>

        {/* Submit Button */}
        <button 
            disabled={!feedback}
            className={`w-full h-12 rounded-[16px] font-medium text-[15px] transition-all mt-1 ${feedback ? 'bg-black text-white hover:opacity-90' : 'bg-[#a1a1aa] text-white cursor-not-allowed'}`}
        >
            Send Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;