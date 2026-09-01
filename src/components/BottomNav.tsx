import React from 'react';
import { Home, LayoutGrid, CreditCard, Bell, User } from 'lucide-react';
import { NavTabId, ScreenId } from '../types';

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
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
              {tab.id === 'alertas' && unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </div>
            <span className={`text-[10px] mt-1 transition-all ${
              isActive ? 'font-bold text-[#008779]' : 'font-medium text-slate-500'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
