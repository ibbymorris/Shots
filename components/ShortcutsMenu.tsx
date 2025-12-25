import React from 'react';

const ShortcutKey = ({ label, icon, wide }: { label?: string; icon?: React.ReactNode; wide?: boolean }) => (
  <div className={`
    h-6 min-w-[24px] bg-black text-white rounded-[6px] text-[13px] font-sans font-medium flex items-center justify-center shadow-sm
    ${wide ? 'px-2' : 'px-1'}
  `}>
    {icon || label}
  </div>
);

const Row = ({ label, keys }: { label: string, keys: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-[16px] text-black font-normal tracking-tight">{label}</span>
    <div className="flex items-center gap-1.5">
      {keys}
    </div>
  </div>
);

const Cmd = () => <ShortcutKey icon={<span>⌘</span>} />;
const Shift = () => <ShortcutKey icon={<span>⇧</span>} />;
const Key = ({ char, wide }: { char: string; wide?: boolean }) => <ShortcutKey label={char} wide={wide} />;

const ShortcutsMenu: React.FC = () => {
  return (
    <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[280px] bg-[#EEEEEE] rounded-[24px] shadow-2xl border border-black/5 p-5 flex flex-col gap-2 z-[60] animate-in fade-in zoom-in-95 duration-200 cursor-default">
        <h3 className="text-[20px] font-semibold text-black mb-2 tracking-tight">Shortcuts</h3>
        
        <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-black/40 uppercase tracking-wide mb-1.5">General</span>
            <Row label="Play / Pause" keys={<Key char="space" wide />} />
            <Row label="Undo" keys={<><Cmd /><Key char="Z" /></>} />
            <Row label="Redo" keys={<><Cmd /><Shift /><Key char="Z" /></>} />
            <Row label="Expand" keys={<><Cmd /><Key char="E" /></>} />
        </div>

        <div className="flex flex-col gap-0.5 mt-4">
            <span className="text-[11px] font-bold text-black/40 uppercase tracking-wide mb-1.5">Animation Editing</span>
            <Row label="Copy" keys={<><Cmd /><Key char="C" /></>} />
            <Row label="Cut" keys={<><Cmd /><Key char="X" /></>} />
            <Row label="Paste" keys={<><Cmd /><Key char="V" /></>} />
            <Row label="Duplicate" keys={<><Cmd /><Key char="D" /></>} />
            <Row label="Hide" keys={<><Cmd /><Shift /><Key char="H" /></>} />
            <Row label="Delete" keys={<Key char="delete" wide />} />
        </div>
    </div>
  );
};

export default ShortcutsMenu;