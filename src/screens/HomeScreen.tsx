import React from 'react';
import { 
  Bell, 
  Syringe, 
  Scissors, 
  Heart, 
  Search, 
  CreditCard, 
  Stethoscope, 
  Store, 
  ChevronRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ScreenId } from '../types';
import { CURRENT_USER } from '../data/mockData';
import { TopBar } from '../components/TopBar';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  unreadCount?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  unreadCount = 2,
}) => {
  const quickActions = [
    {
      id: 'vaccines',
      title: 'Vacinação',
      icon: Syringe,
      bgColor: 'bg-[#e8f6f5]',
      iconColor: 'text-[#008779]',
      screen: 'vaccines' as ScreenId,
    },
    {
      id: 'castracao',
      title: 'Castração',
      icon: Scissors,
      bgColor: 'bg-[#effbf6]',
      iconColor: 'text-[#10b981]',
      screen: 'vaccines' as ScreenId,
    },
    {
      id: 'adocao',
      title: 'Adoção',
      icon: Heart,
      bgColor: 'bg-[#fff6ec]',
      iconColor: 'text-[#f97316]',
      screen: 'adoption' as ScreenId,
    },
    {
      id: 'desaparecidos',
      title: 'Desaparecidos',
      icon: Search,
      bgColor: 'bg-[#f5f0ff]',
      iconColor: 'text-[#8b5cf6]',
      screen: 'lostfound' as ScreenId,
    },
    {
      id: 'carteira',
      title: 'Carteira\nDigital',
      icon: CreditCard,
      bgColor: 'bg-[#eaf8f5]',
      iconColor: 'text-[#0d9488]',
      screen: 'wallet' as ScreenId,
    },
    {
      id: 'vet24h',
      title: 'Veterinário\n24h',
      icon: Stethoscope,
      bgColor: 'bg-[#eef8ff]',
      iconColor: 'text-[#0284c7]',
      screen: 'telemed' as ScreenId,
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <TopBar
        showBack={false}
        transparent={true}
        darkIcons={true}
      />

      {/* Main Container */}
      <div className="px-5 pb-6 space-y-4">
        {/* User Greeting Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#008779]/20"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-[15px] font-medium text-slate-800 tracking-tight">
                  Olá, {CURRENT_USER.firstName}! 👋
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-normal">
                Que bom te ver por aqui!
              </p>
            </div>
          </div>

          {/* Bell button with unread count */}
          <button
            onClick={() => onNavigate('alerts')}
            className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all relative active:scale-95 shadow-xs"
            title="Ver alertas"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-rose-500 text-white text-[9px] font-medium rounded-full flex items-center justify-center ring-2 ring-white leading-none shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Telemedicina 24h Hero Banner */}
        <div 
          onClick={() => onNavigate('telemed')}
          className="relative rounded-2xl bg-gradient-to-br from-[#006e63] via-[#008779] to-[#029688] text-white p-4.5 overflow-hidden shadow-md shadow-[#008779]/20 cursor-pointer transform transition-all active:scale-[0.99] hover:shadow-lg"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="max-w-[58%] space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider bg-white/20 uppercase backdrop-blur-md">
                TELEMEDICINA PET 24H
              </span>
              <p className="text-xs text-teal-50 font-normal leading-relaxed">
                Atendimento veterinário gratuito onde você estiver.
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('telemed');
                }}
                className="mt-1 px-3 py-1.5 rounded-full bg-white text-[#008779] text-xs font-medium shadow-sm hover:bg-teal-50 transition-all flex items-center gap-1 active:scale-95"
              >
                <span>Falar com veterinário</span>
              </button>
            </div>

            {/* Dog Illustration / Photo with 24h badge */}
            <div className="relative w-26 h-26 shrink-0 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&auto=format&fit=crop&q=80"
                alt="Veterinário 24h"
                className="w-22 h-22 rounded-2xl object-cover ring-2 ring-white/40 shadow-md"
              />
              <div className="absolute -bottom-1 -left-1 bg-sky-500 text-white rounded-full p-1.5 shadow-md flex items-center justify-center ring-2 ring-white">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Acesso Rápido Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-slate-700 tracking-wide">
            Acesso rápido
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate(action.screen)}
                  className="p-3 rounded-2xl bg-white border border-slate-100/90 shadow-2xs hover:shadow-xs hover:border-teal-200 transition-all flex flex-col items-center justify-center text-center group active:scale-95 min-h-[92px]"
                >
                  <div className={`w-10 h-10 rounded-2xl ${action.bgColor} ${action.iconColor} flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4.5 h-4.5 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 leading-tight whitespace-pre-line group-hover:text-[#008779] transition-colors">
                    {action.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Parceiros e Benefícios Promo Card */}
        <div
          onClick={() => onNavigate('partners')}
          className="p-3.5 rounded-2xl bg-white border border-slate-100/90 shadow-2xs hover:border-teal-200 hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#e6f7f5] text-[#008779] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-medium text-slate-800 group-hover:text-[#008779] transition-colors">
                Parceiros & Benefícios
              </h4>
              <p className="text-[11px] text-slate-400 font-normal">
                Clínicas, pet shops, banho e tosa com descontos
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#008779] group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};
