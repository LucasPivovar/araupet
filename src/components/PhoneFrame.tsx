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
      {/* Screen Content */}
      <div className="relative w-full h-full flex flex-col bg-slate-50 overflow-hidden select-none">
        {children}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/20 rounded-full z-30 pointer-events-none" />
    </div>
  );
};
