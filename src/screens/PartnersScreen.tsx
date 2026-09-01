import React, { useState } from 'react';
import { Search, MapPin, Percent, ChevronRight, Store } from 'lucide-react';
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
    { id: 'banho', label: 'Banho e Tosa' },
    { id: 'farmacia', label: 'Farmácias' },
  ];

  const filteredPartners = partners.filter((p) => {
    const matchesCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <TopBar
        title="Parceiros e Benefícios"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
        rightAction={
          <button className="p-1 text-slate-600 hover:text-slate-900 rounded-full">
            <Search className="w-4 h-4" />
          </button>
        }
      />

      {/* Main Content */}
      <div className="p-4 space-y-3.5">
        {/* Benefit Hero Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#008779] to-[#00a896] text-white p-4 overflow-hidden shadow-md flex items-center justify-between">
          <div className="space-y-1 max-w-[62%]">
            <h3 className="text-sm font-extrabold leading-tight">
              Benefícios para você e seu pet!
            </h3>
            <p className="text-[11px] text-teal-50 font-medium leading-tight">
              Descontos e condições especiais em parceiros.
            </p>
          </div>

          <div className="relative flex items-center">
            <span className="text-2xl font-black text-amber-300 mr-2">%</span>
            <img
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=160&auto=format&fit=crop&q=80"
              alt="Pet Benefits"
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/30"
            />
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#008779] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Partners List */}
        <div className="space-y-2.5">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-teal-200 transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
            >
              {/* Partner Logo & Info */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-50 text-2xl flex items-center justify-center shrink-0 border border-teal-100/60 group-hover:scale-105 transition-transform">
                  {partner.logo}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#008779] transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {partner.categoryLabel}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{partner.distance}</span>
                  </div>
                </div>
              </div>

              {/* Discount Tag & Link */}
              <div className="flex flex-col items-end gap-1">
                <div className="text-right">
                  <span className="text-xs font-extrabold text-rose-500 block leading-tight">
                    {partner.discount}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400">
                    {partner.discountTarget}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#008779] hover:underline">
                  Ver detalhes
                </span>
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
