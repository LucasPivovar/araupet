import React from 'react';
import { Home, LayoutGrid, CreditCard, Bell, User } from 'lucide-react';
import { NavTabId } from '../types';

interface BottomNavProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  unreadAlertsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadAlertsCount = 2,
}) => {
  const tabs: { id: NavTabId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'servicos', label: 'Serviços', icon: LayoutGrid },
    { id: 'carteira', label: 'Carteira', icon: CreditCard },
    { id: 'alertas', label: 'Alertas', icon: Bell },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="w-full shrink-0 bg-white border-t border-slate-100 py-1.5 px-3 flex items-center justify-around z-20 shadow-lg shadow-slate-200/50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const isWallet = tab.id === 'carteira';

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 active:scale-90 relative ${
              isActive
                ? 'text-[#008779]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isWallet
                  ? isActive
                    ? 'bg-[#008779] text-white shadow-md shadow-[#008779]/25'
                    : 'bg-white border border-slate-200 text-slate-500 shadow-xs'
                  : ''
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.8]'}`} />
              {tab.id === 'alertas' && unreadAlertsCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-rose-500 text-white text-[9px] font-medium rounded-full flex items-center justify-center ring-2 ring-white leading-none shadow-xs">
                  {unreadAlertsCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-1 transition-all ${
              isActive ? 'font-medium text-[#008779]' : 'font-medium text-slate-500'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
