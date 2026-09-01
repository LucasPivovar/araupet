import React, { useState } from 'react';
import { Search, MapPin, Percent, ChevronRight, Store, Star, Award } from 'lucide-react';
import { Partner } from '../types';
import { PARTNERS } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { CouponModal } from '../components/Modals/CouponModal';

interface PartnersScreenProps {
  onBack: () => void;
}

export const PartnersScreen: React.FC<PartnersScreenProps> = ({ onBack }) => {
  const [partners] = useState<Partner[]>(PARTNERS);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

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
        {/* Benefit Hero Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#007063] via-[#008779] to-[#00a896] text-white p-4 overflow-hidden shadow-md flex items-center justify-between">
          <div className="space-y-1.5 max-w-[62%]">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider bg-white/20 uppercase backdrop-blur-xs">
              REDE CREDENCIADA ARAUCÁRIA
            </span>
            <h3 className="text-sm font-semibold leading-snug">
              Descontos exclusivos nos melhores parceiros
            </h3>
            <p className="text-[11px] text-teal-100 font-normal leading-tight">
              Apresente o cupom ou carteira digital em estabelecimentos conveniados.
            </p>
          </div>

          <div className="relative flex items-center">
            <img
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=200&auto=format&fit=crop&q=80"
              alt="Benefícios ArauPet"
              className="w-18 h-18 rounded-2xl object-cover ring-2 ring-white/40 shadow-md"
            />
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

        {/* Partners List with Real Photos */}
        <div className="space-y-3">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className="rounded-2xl bg-white border border-slate-100/90 shadow-xs hover:border-teal-200 transition-all overflow-hidden cursor-pointer group active:scale-[0.99]"
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
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-rose-500 text-white shadow-md flex items-center gap-1">
                  <Percent className="w-3 h-3 stroke-[2.5]" />
                  <span className="text-[11px] font-semibold">{partner.discount}</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{partner.rating.toFixed(1)}</span>
                </div>

                {/* Logo & Category on bottom left */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-md flex items-center justify-center text-base border border-slate-100">
                    {partner.logo}
                  </div>
                  <span className="text-[11px] text-white/90 font-medium drop-shadow-sm">
                    {partner.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[13px] font-medium text-slate-800 group-hover:text-[#008779] transition-colors">
                      {partner.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                      Válido para: <span className="text-slate-700 font-medium">{partner.discountTarget}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100/80 text-[11px]">
                  <div className="flex items-center gap-1 text-slate-400 font-normal truncate max-w-[210px]">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{partner.address}</span>
                  </div>
                  <span className="text-[#008779] font-medium shrink-0 group-hover:underline flex items-center gap-0.5">
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
