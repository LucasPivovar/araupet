import React, { useState } from 'react';
import { ScreenId, NavTabId } from '../types';
import { PhoneFrame } from '../components/PhoneFrame';
import { BottomNav } from '../components/BottomNav';
import { HomeScreen } from '../screens/HomeScreen';
import { PetWalletScreen } from '../screens/PetWalletScreen';
import { TelemedicineScreen } from '../screens/TelemedicineScreen';
import { VaccinesScreen } from '../screens/VaccinesScreen';
import { AdoptionScreen } from '../screens/AdoptionScreen';
import { LostFoundScreen } from '../screens/LostFoundScreen';
import { PartnersScreen } from '../screens/PartnersScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Sparkles, Maximize2, RotateCcw } from 'lucide-react';

interface InteractiveAppViewProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const InteractiveAppView: React.FC<InteractiveAppViewProps> = ({
  currentScreen,
  onNavigate,
}) => {
  // Map screen to bottom nav tab
  const getActiveTab = (): NavTabId => {
    switch (currentScreen) {
      case 'home':
        return 'inicio';
      case 'vaccines':
      case 'adoption':
      case 'lostfound':
      case 'partners':
      case 'telemed':
        return 'servicos';
      case 'wallet':
        return 'carteira';
      case 'alerts':
        return 'alertas';
      case 'profile':
        return 'perfil';
      default:
        return 'inicio';
    }
  };

  const handleSelectTab = (tab: NavTabId) => {
    switch (tab) {
      case 'inicio':
        onNavigate('home');
        break;
      case 'servicos':
        // If already in a service, stay or default to home/vaccines
        onNavigate('vaccines');
        break;
      case 'carteira':
        onNavigate('wallet');
        break;
      case 'alertas':
        onNavigate('alerts');
        break;
      case 'perfil':
        onNavigate('profile');
        break;
    }
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={onNavigate} />;
      case 'wallet':
        return <PetWalletScreen onBack={() => onNavigate('home')} />;
      case 'telemed':
        return <TelemedicineScreen onBack={() => onNavigate('home')} />;
      case 'vaccines':
        return <VaccinesScreen onBack={() => onNavigate('home')} />;
      case 'adoption':
        return <AdoptionScreen onBack={() => onNavigate('home')} />;
      case 'lostfound':
        return <LostFoundScreen onBack={() => onNavigate('home')} />;
      case 'partners':
        return <PartnersScreen onBack={() => onNavigate('home')} />;
      case 'alerts':
        return <AlertsScreen onBack={() => onNavigate('home')} onNavigate={onNavigate} />;
      case 'profile':
        return <ProfileScreen onBack={() => onNavigate('home')} onNavigate={onNavigate} />;
      default:
        return <HomeScreen onNavigate={onNavigate} />;
    }
  };

  const quickPills: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'wallet', label: 'Carteira' },
    { id: 'telemed', label: 'Telemedicina' },
    { id: 'vaccines', label: 'Vacinação' },
    { id: 'adoption', label: 'Adoção' },
    { id: 'lostfound', label: 'Perdidos' },
    { id: 'partners', label: 'Parceiros' },
    { id: 'alerts', label: 'Alertas' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 bg-slate-900/60 overflow-y-auto">
      {/* Top Floating Control Bar */}
      <div className="w-full max-w-xl mb-6 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-2 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1">
          {quickPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => onNavigate(pill.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                currentScreen === pill.id
                  ? 'bg-[#008779] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate('home')}
          title="Reiniciar Navegação"
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors shrink-0 ml-2"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Smartphone Device Simulator */}
      <div className="relative">
        <PhoneFrame isGalleryMode={false}>
          {renderActiveScreen()}
          {/* Persistent Bottom Bar (except in full video call) */}
          <BottomNav
            activeTab={getActiveTab()}
            onSelectTab={handleSelectTab}
            unreadAlertsCount={2}
          />
        </PhoneFrame>
      </div>

      {/* Simulator Guidance Info */}
      <p className="mt-4 text-xs font-medium text-slate-400 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#008779]" />
        <span>Aplicativo 100% interativo: clique nos botões, abas, agendamentos e chamadas.</span>
      </p>
    </div>
  );
};
