import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  isGalleryMode?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  className = '',
  isGalleryMode = false,
}) => {
  return (
    <div
      className={`relative mx-auto bg-white rounded-[44px] shadow-2xl border-[8px] border-slate-900 overflow-hidden flex flex-col transition-all duration-300 ${
        isGalleryMode
          ? 'w-[320px] h-[670px] shrink-0 shadow-xl ring-1 ring-slate-200'
          : 'w-full max-w-[390px] h-[810px] shadow-2xl ring-1 ring-slate-800/10'
      } ${className}`}
      style={{
        boxShadow: isGalleryMode
          ? '0 20px 35px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'
          : '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0,0,0,0.1)',
      }}
    >
      {/* Top Speaker / Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-slate-950 rounded-full z-30 pointer-events-none flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-slate-800 ml-auto mr-3" />
      </div>

      {/* Screen Content */}
      <div className="relative w-full h-full flex flex-col bg-slate-50 overflow-hidden select-none">
        {children}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/30 rounded-full z-30 pointer-events-none" />
    </div>
  );
};
