import React from 'react';
import { ChevronLeft, Wifi, Battery, Signal } from 'lucide-react';

interface TopBarProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  darkIcons?: boolean;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  onBack,
  showBack = true,
  rightAction,
  transparent = false,
  darkIcons = true,
  className = '',
}) => {
  return (
    <div className={`w-full shrink-0 z-10 transition-colors ${transparent ? 'bg-transparent' : 'bg-white border-b border-slate-100'} ${className}`}>
      {/* iOS Status Bar */}
      <div className={`flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold select-none ${darkIcons ? 'text-slate-800' : 'text-white'}`}>
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
          <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
          <div className="flex items-center gap-0.5">
            <Battery className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Screen Title Bar */}
      {(title || showBack || rightAction) && (
        <div className="flex items-center justify-between px-4 py-2 min-h-[44px]">
          <div className="w-9 flex items-center justify-start">
            {showBack && onBack && (
              <button
                onClick={onBack}
                className={`p-1.5 -ml-1.5 rounded-full transition-all active:scale-95 ${
                  darkIcons
                    ? 'text-slate-700 hover:bg-slate-100'
                    : 'text-white hover:bg-white/20'
                }`}
                aria-label="Voltar"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
              </button>
            )}
          </div>

          {title && (
            <h1 className={`text-base font-bold text-center truncate px-2 ${
              darkIcons ? 'text-slate-800' : 'text-white'
            }`}>
              {title}
            </h1>
          )}

          <div className="w-9 flex items-center justify-end">
            {rightAction}
          </div>
        </div>
      )}
    </div>
  );
};
