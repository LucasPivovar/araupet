import React from 'react';
import { ChevronLeft } from 'lucide-react';

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
    <div className={`w-full shrink-0 z-10 transition-colors ${transparent ? 'bg-transparent' : 'bg-white border-b border-slate-100/80'} ${className}`}>
      {/* Screen Title Bar */}
      {(title || showBack || rightAction) && (
        <div className="flex items-center justify-between px-4 py-3 min-h-[48px]">
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
                <ChevronLeft className="w-5 h-5 stroke-[2]" />
              </button>
            )}
          </div>

          {title && (
            <h1 className={`text-[15px] font-medium text-center truncate px-2 ${
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
