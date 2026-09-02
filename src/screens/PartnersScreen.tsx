import React, { useEffect, useState } from 'react';
import { Search, MapPin, Percent, ChevronRight, Star } from 'lucide-react';
import { Partner } from '../types';
import { PARTNERS } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { CouponModal } from '../components/Modals/CouponModal';
import partnersBannerVet from '../assets/partners-banner-vet.png';
import partnersBannerPharmacy from '../assets/partners-banner-pharmacy.png';
import partnersBannerGrooming from '../assets/partners-banner-grooming.png';

interface PartnersScreenProps {
  onBack: () => void;
}

export const PartnersScreen: React.FC<PartnersScreenProps> = ({ onBack }) => {
  const [partners] = useState<Partner[]>(PARTNERS);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const categories = [
    { id: 'Todos', label: 'Todos' },
    { id: 'clinica', label: 'Clínicas' },
    { id: 'petshop', label: 'Pet Shops' },
    { id: 'banho', label: 'Banho & Tosa' },
    { id: 'farmacia', label: 'Farmácias' },
  ];

  const filteredPartners = partners.filter((p) => {
    const matchesCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const heroSlides = [
    {
      title: 'Clínicas parceiras perto de você',
      description: 'Gere cupons para consultas, exames e atendimento veterinário.',
      image: partnersBannerVet,
      position: 'center center',
    },
    {
      title: 'Farmácias e pet shops com desconto',
      description: 'Encontre produtos, rações e cuidados com benefícios ativos.',
      image: partnersBannerPharmacy,
      position: 'center center',
    },
    {
      title: 'Banho e tosa na rede credenciada',
      description: 'Use filtros e gere um cupom antes do atendimento.',
      image: partnersBannerGrooming,
      position: 'center center',
    },
  ];

  const currentSlide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <TopBar
        title="Parceiros & Benefícios"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
      />

      {/* Main Content */}
      <div className="p-4 space-y-3.5">
        {/* Benefit Hero Slider */}
        <div className="relative min-h-[128px] rounded-2xl text-white overflow-hidden shadow-md shadow-[#008779]/20">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.title}
              src={slide.image}
              alt=""
              style={{ objectPosition: slide.position }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                activeSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#006e63]/95 via-[#008779]/80 to-[#00a896]/30" />

          <button
            type="button"
            onClick={() => setSelectedPartner(partners[activeSlide] ?? null)}
            className="relative z-10 flex min-h-[128px] w-full items-center text-left p-4"
          >
            <div className="space-y-1.5 max-w-[72%]">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider bg-white/20 uppercase backdrop-blur-xs">
                Rede credenciada
              </span>
              <h3 className="text-sm font-semibold leading-snug">
                {currentSlide.title}
              </h3>
              <p className="text-[11px] text-teal-100 font-normal leading-tight">
                {currentSlide.description}
              </p>
            </div>
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Mostrar destaque ${index + 1}`}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  setActiveSlide(index);
                }}
                className="h-4 w-4 rounded-full flex items-center justify-center transition-all active:scale-95"
              >
                <span
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlide === index ? 'w-4 bg-white shadow-sm' : 'w-1.5 bg-white/55'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar clínicas, pet shops, bairros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200/90 bg-white text-slate-800 shadow-2xs focus:outline-none focus:border-[#008779] font-normal transition-all"
          />
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#008779] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Partners Grid with Real Photos */}
        <div className="grid grid-cols-2 gap-2.5">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className="rounded-2xl bg-white border border-slate-100/90 shadow-xs hover:border-teal-200 transition-all overflow-hidden cursor-pointer group active:scale-[0.99] min-w-0"
            >
              {/* Partner Real Building/Storefront Photo Header */}
              <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Discount Tag */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-rose-500 text-white shadow-md flex items-center gap-1">
                  <Percent className="w-2.5 h-2.5 stroke-[2.5]" />
                  <span className="text-[10px] font-semibold">{partner.discount}</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-white text-[9px] font-medium flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span>{partner.rating.toFixed(1)}</span>
                </div>

                {/* Logo & Category on bottom left */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 max-w-[72%]">
                  <div className="w-7 h-7 rounded-lg bg-white shadow-md flex items-center justify-center text-sm border border-slate-100 shrink-0">
                    {partner.logo}
                  </div>
                  <span className="text-[10px] text-white/90 font-medium drop-shadow-sm truncate">
                    {partner.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-2.5 space-y-1.5">
                <h4 className="text-[12px] font-medium text-slate-800 group-hover:text-[#008779] transition-colors leading-tight truncate">
                  {partner.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-normal leading-tight truncate">
                  Válido para: <span className="text-slate-700 font-medium">{partner.discountTarget}</span>
                </p>

                <div className="space-y-1 pt-1.5 border-t border-slate-100/80 text-[10px]">
                  <div className="flex items-center gap-1 text-slate-400 font-normal min-w-0">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{partner.address}</span>
                  </div>
                  <span className="text-[#008779] font-medium group-hover:underline flex items-center justify-end gap-0.5">
                    <span>Ver cupom</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon Modal */}
      <CouponModal
        partner={selectedPartner}
        isOpen={!!selectedPartner}
        onClose={() => setSelectedPartner(null)}
      />
    </div>
  );
};
