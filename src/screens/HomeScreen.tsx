import React, { useEffect, useState } from 'react';
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
  PhoneCall
} from 'lucide-react';
import { ScreenId } from '../types';
import { CURRENT_USER } from '../data/mockData';
import homeBannerVet24 from '../assets/home-banner-vet24.png';
import homeBannerAdoption from '../assets/home-banner-adoption.png';
import homeBannerVaccine from '../assets/home-banner-vaccine.png';
import homeBannerPartners from '../assets/home-banner-partners.png';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  unreadCount?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  unreadCount = 2,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      id: 'telemed',
      label: 'Veterinário 24h',
      title: 'Atendimento gratuito para seu pet',
      description: 'Converse com um veterinário quando precisar.',
      action: 'Falar agora',
      screen: 'telemed' as ScreenId,
      image: homeBannerVet24,
      icon: PhoneCall,
      textSide: 'left',
      imagePosition: 'center 32%',
    },
    {
      id: 'adoption',
      label: 'Adoção responsável',
      title: 'Um novo amigo esperando por você',
      description: 'Veja pets acompanhados e prontos para adoção.',
      action: 'Ver adoção',
      screen: 'adoption' as ScreenId,
      image: homeBannerAdoption,
      icon: Heart,
      textSide: 'right',
      imagePosition: 'center center',
    },
    {
      id: 'partners',
      label: 'Benefícios',
      title: 'Descontos na rede parceira',
      description: 'Clínicas, pet shops, banho e tosa perto de você.',
      action: 'Ver cupons',
      screen: 'partners' as ScreenId,
      image: homeBannerPartners,
      icon: Store,
      textSide: 'right',
      imagePosition: 'center center',
    },
    {
      id: 'vaccines',
      label: 'Campanhas',
      title: 'Vacinação sempre em dia',
      description: 'Acompanhe datas e agende atendimento municipal.',
      action: 'Agendar',
      screen: 'vaccines' as ScreenId,
      image: homeBannerVaccine,
      icon: Syringe,
      textSide: 'left',
      imagePosition: 'center center',
    },
  ];

  const hero = heroSlides[activeSlide];
  const HeroIcon = hero.icon;
  const isTextRight = hero.textSide === 'right';

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

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
      title: 'Carteira Pet\nDigital',
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
      {/* Main Container with top safe padding */}
      <div className="px-5 pt-6 pb-6 space-y-4">
        {/* User Greeting Header */}
        <div className="flex items-center justify-between">
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

        {/* Main Hero Slider */}
        <div 
          onClick={() => onNavigate(hero.screen)}
          className="relative min-h-[178px] rounded-2xl overflow-hidden shadow-md shadow-[#008779]/20 cursor-pointer transform transition-all active:scale-[0.99] hover:shadow-lg"
        >
          {heroSlides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.image}
              alt=""
              style={{ objectPosition: slide.imagePosition }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          <div className={`relative z-10 flex min-h-[178px] items-center p-4.5 ${isTextRight ? 'justify-end text-slate-800' : 'justify-start text-white'}`}>
            <div className={`w-[58%] space-y-2 ${isTextRight ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase backdrop-blur-md ${
                isTextRight ? 'bg-[#008779]/10 text-[#008779]' : 'bg-white/20 text-white'
              }`}>
                {hero.label}
              </span>
              <h3 className={`text-[15px] font-semibold leading-tight transition-colors duration-500 ${isTextRight ? '' : 'drop-shadow-sm'}`}>
                {hero.title}
              </h3>
              <p className={`text-xs font-normal leading-relaxed transition-colors duration-500 ${isTextRight ? 'text-slate-500' : 'text-teal-50 drop-shadow-sm'}`}>
                {hero.description}
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(hero.screen);
                }}
                className={`mt-1 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-all inline-flex items-center gap-1 active:scale-95 ${
                  isTextRight
                    ? 'bg-[#008779] text-white hover:bg-[#006e63]'
                    : 'bg-white text-[#008779] hover:bg-teal-50'
                }`}
              >
                <span>{hero.action}</span>
              </button>
            </div>
          </div>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ver destaque ${index + 1}`}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  setActiveSlide(index);
                }}
                onClick={(event) => event.stopPropagation()}
                className="h-4 w-4 rounded-full flex items-center justify-center transition-all active:scale-95"
              >
                <span className={`h-1.5 rounded-full transition-all ${
                  index === activeSlide
                    ? 'w-4 bg-white shadow-sm'
                    : 'w-1.5 bg-white/55'
                }`} />
              </button>
            ))}
          </div>
          <div className={`absolute bottom-3 z-10 ${isTextRight ? 'left-4' : 'right-4'} bg-white/90 text-[#008779] rounded-full p-1.5 shadow-md flex items-center justify-center ring-2 ring-white/60`}>
            <HeroIcon className="w-3.5 h-3.5" />
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
