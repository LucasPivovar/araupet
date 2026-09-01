import React from 'react';
import { ScreenId } from '../types';
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
import { Play, Eye, Sparkles } from 'lucide-react';

interface DesignGalleryViewProps {
  onSelectScreen: (screen: ScreenId) => void;
}

export const DesignGalleryView: React.FC<DesignGalleryViewProps> = ({
  onSelectScreen,
}) => {
  const screens = [
    {
      id: 'home' as ScreenId,
      title: '1. Início (Home)',
      tab: 'inicio' as const,
      component: <HomeScreen onNavigate={onSelectScreen} />,
    },
    {
      id: 'wallet' as ScreenId,
      title: '2. Carteira Pet Digital',
      tab: 'carteira' as const,
      component: <PetWalletScreen onBack={() => {}} />,
    },
    {
      id: 'telemed' as ScreenId,
      title: '3. Veterinário 24h (Telemedicina)',
      tab: 'servicos' as const,
      component: <TelemedicineScreen onBack={() => {}} />,
    },
    {
      id: 'vaccines' as ScreenId,
      title: '4. Vacinação & Castração',
      tab: 'servicos' as const,
      component: <VaccinesScreen onBack={() => {}} />,
    },
    {
      id: 'adoption' as ScreenId,
      title: '5. Adoção Responsável',
      tab: 'servicos' as const,
      component: <AdoptionScreen onBack={() => {}} />,
    },
    {
      id: 'lostfound' as ScreenId,
      title: '6. Perdidos & Encontrados',
      tab: 'servicos' as const,
      component: <LostFoundScreen onBack={() => {}} />,
    },
    {
      id: 'partners' as ScreenId,
      title: '7. Parceiros & Benefícios',
      tab: 'servicos' as const,
      component: <PartnersScreen onBack={() => {}} />,
    },
    {
      id: 'alerts' as ScreenId,
      title: '8. Alertas & Notificações',
      tab: 'alertas' as const,
      component: <AlertsScreen onBack={() => {}} onNavigate={onSelectScreen} />,
    },
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 overflow-y-auto bg-slate-900/40 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner Header */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 border border-slate-700/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider bg-[#008779] text-white uppercase">
                Design System & Telas Oficiais
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                8 Telas Fidelidade Pixel-Perfect
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mt-2">
              Visão Panorâmica do Aplicativo ArauPet
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Clique em qualquer tela abaixo para abrir no simulador interativo em tamanho real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectScreen('home')}
              className="px-5 py-2.5 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#008779]/20 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              Abrir Simulador Interativo
            </button>
          </div>
        </div>

        {/* Screens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {screens.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center group relative"
            >
              {/* Screen Title Tag */}
              <div className="mb-3 flex items-center justify-between w-full px-2">
                <span className="text-xs font-black text-slate-300 group-hover:text-white transition-colors">
                  {s.title}
                </span>
                <button
                  onClick={() => onSelectScreen(s.id)}
                  className="text-[10px] font-bold text-[#008779] hover:text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  Interagir
                </button>
              </div>

              {/* Phone Device with Hover Overlay */}
              <div className="relative cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]">
                <PhoneFrame isGalleryMode={true}>
                  {s.component}
                  <BottomNav
                    activeTab={s.tab}
                    onSelectTab={() => onSelectScreen(s.id)}
                    unreadAlertsCount={2}
                  />
                </PhoneFrame>

                {/* Hover overlay button */}
                <div
                  onClick={() => onSelectScreen(s.id)}
                  className="absolute inset-0 bg-black/40 rounded-[44px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs"
                >
                  <button className="px-4 py-2 bg-white text-slate-900 rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current text-[#008779]" />
                    Testar Esta Tela
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
