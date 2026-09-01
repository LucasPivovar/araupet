import React from 'react';
import { MapPin, Heart, Sparkles, Smartphone, Grid, Download } from 'lucide-react';
import { ScreenId } from '../types';

interface BrandSidebarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  viewMode: 'simulator' | 'gallery';
  onToggleViewMode: (mode: 'simulator' | 'gallery') => void;
}

export const BrandSidebar: React.FC<BrandSidebarProps> = ({
  currentScreen,
  onSelectScreen,
  viewMode,
  onToggleViewMode,
}) => {
  const screensList: { id: ScreenId; label: string; icon: string }[] = [
    { id: 'home', label: '1. Início', icon: '🏠' },
    { id: 'wallet', label: '2. Carteira Pet Digital', icon: '💳' },
    { id: 'telemed', label: '3. Veterinário 24h', icon: '🩺' },
    { id: 'vaccines', label: '4. Vacinação & Castração', icon: '💉' },
    { id: 'adoption', label: '5. Adoção Responsável', icon: '🐶' },
    { id: 'lostfound', label: '6. Desaparecidos', icon: '🗺️' },
    { id: 'partners', label: '7. Parceiros & Benefícios', icon: '🏷️' },
    { id: 'alerts', label: '8. Alertas & Notificações', icon: '🔔' },
  ];

  return (
    <aside className="w-full lg:w-84 xl:w-96 shrink-0 bg-white/95 backdrop-blur-md border-r border-slate-200/80 p-6 flex flex-col justify-between shadow-xl z-20 overflow-y-auto custom-scrollbar">
      {/* Top Brand Info */}
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#008779] to-[#26a69a] flex items-center justify-center shadow-lg shadow-[#008779]/20 text-white">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" className="opacity-40" />
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4.5 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-7.5 4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm6 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-3 2.5c-2.2 0-4-1.8-4-4 0-.55.45-1 1-1h6c.55 0 1 .45 1 1 0 2.2-1.8 4-4 4z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0f172a]">Arau</span>
              <span className="text-2xl font-bold tracking-tight text-[#008779]">Pet</span>
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Sistema de Saúde Animal
            </p>
          </div>
        </div>

        {/* Slogans */}
        <div className="space-y-1 pl-1 border-l-2 border-[#008779]/30">
          <p className="text-base font-medium text-slate-700 leading-snug">
            Cuidado que vira carinho.
          </p>
          <p className="text-base font-semibold text-[#008779] leading-snug">
            Cidade que cuida.
          </p>
        </div>

        {/* Location Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 text-[#008779] text-xs font-medium">
          <MapPin className="w-3.5 h-3.5" />
          <span>Araucária – PR</span>
        </div>

        {/* View Mode Switcher */}
        <div className="p-1 bg-slate-100 rounded-xl border border-slate-200 flex gap-1">
          <button
            onClick={() => onToggleViewMode('simulator')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'simulator'
                ? 'bg-white text-[#008779] shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Simulador App
          </button>
          <button
            onClick={() => onToggleViewMode('gallery')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'gallery'
                ? 'bg-[#008779] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" />
            Panorama (8 Telas)
          </button>
        </div>

        {/* Screen Navigator (for quick jumping) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider px-1">
            Navegação Direta no App
          </label>
          <div className="grid grid-cols-1 gap-1">
            {screensList.map((s) => {
              const active = currentScreen === s.id && viewMode === 'simulator';
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectScreen(s.id);
                    if (viewMode === 'gallery') onToggleViewMode('simulator');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                    active
                      ? 'bg-teal-50 border border-teal-200 text-[#008779] font-medium shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008779]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skyline Vector Illustration */}
        <div className="relative py-4 rounded-xl bg-gradient-to-b from-teal-50/50 to-emerald-50/80 border border-teal-100 overflow-hidden flex flex-col items-center justify-center text-center p-3">
          <div className="flex items-end justify-center gap-4 text-[#008779] mb-1">
            {/* Dog Silhouette */}
            <svg className="w-10 h-10 fill-current opacity-80" viewBox="0 0 24 24">
              <path d="M4 18v3h3v-3h10v3h3v-6l-4-5-1-4h-4l-1 3-3 2v4H4zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
            </svg>
            {/* Cat Silhouette */}
            <svg className="w-8 h-8 fill-current opacity-70" viewBox="0 0 24 24">
              <path d="M12 2c-.55 0-1 .45-1 1v1.1c-1.57.34-3 1.15-4.14 2.29-.44-.39-.99-.69-1.61-.83-.49-.11-.98-.05-1.39.17-.41.21-.69.58-.8 1.05-.11.49-.03 1 .22 1.41.25.42.66.72 1.15.83.62.14 1.25.07 1.81-.19C6.46 9.8 6 11.85 6 14c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.15-.46-4.2-1.24-5.07.56.26 1.19.33 1.81.19.49-.11.9-.41 1.15-.83.25-.41.33-.92.22-1.41-.11-.47-.39-.84-.8-1.05-.41-.22-.9-.28-1.39-.17-.62.14-1.17.44-1.61.83C15 4.25 13.57 3.44 12 3.1V3c0-.55-.45-1-1-1z" />
            </svg>
          </div>
          <p className="text-[11px] font-medium text-teal-800">
            Parque Cachoeira & Unidades de Saúde
          </p>
        </div>
      </div>

      {/* Footer Official Seal */}
      <div className="pt-6 border-t border-slate-200/80">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
          {/* Brasão Oficial Araucária */}
          <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-xs">
            <span className="text-xl">🏛️</span>
          </div>
          <div>
            <p className="text-[10px] font-normal text-slate-500">Uma iniciativa da</p>
            <p className="text-xs font-semibold text-slate-800 tracking-tight">Prefeitura de Araucária</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
