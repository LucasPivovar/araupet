import React, { useState } from 'react';
import { SlidersHorizontal, Heart, ChevronRight, PawPrint } from 'lucide-react';
import { Pet } from '../types';
import { ADOPTION_PETS } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { PetDetailModal } from '../components/Modals/PetDetailModal';

interface AdoptionScreenProps {
  onBack: () => void;
}

export const AdoptionScreen: React.FC<AdoptionScreenProps> = ({ onBack }) => {
  const [pets, setPets] = useState<Pet[]>(ADOPTION_PETS);
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'Cães' | 'Gatos' | 'Outros'>('Todos');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const categories = ['Todos', 'Cães', 'Gatos', 'Outros'] as const;

  const toggleFavorite = (petId: string) => {
    setPets((prev) =>
      prev.map((p) => (p.id === petId ? { ...p, isFavorite: !p.isFavorite } : p))
    );
    if (selectedPet && selectedPet.id === petId) {
      setSelectedPet((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleOpenDetail = (pet: Pet) => {
    setSelectedPet(pet);
    setIsDetailOpen(true);
  };

  const filteredPets = pets.filter((p) => {
    if (activeCategory === 'Todos') return true;
    if (activeCategory === 'Cães') return p.species === 'dog';
    if (activeCategory === 'Gatos') return p.species === 'cat';
    if (activeCategory === 'Outros') return p.species === 'other';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <TopBar
        title="Adoção responsável"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
        rightAction={
          <button className="p-1 text-slate-600 hover:text-slate-900 rounded-full">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        }
      />

      {/* Main Content */}
      <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#008779] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2x2 Grid of Pets */}
          <div className="grid grid-cols-2 gap-2.5">
            {filteredPets.slice(0, 4).map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-2xl border border-slate-100/90 overflow-hidden shadow-2xs hover:shadow-xs hover:border-teal-200 transition-all flex flex-col"
              >
                {/* Photo with favorite button */}
                <div className="relative h-28 w-full bg-slate-100">
                  <img
                    src={pet.photo}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(pet.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors shadow-2xs"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        pet.isFavorite ? 'text-rose-500 fill-current' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Info and button */}
                <div className="p-2.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="text-xs font-medium text-slate-800">{pet.name}</h4>
                    <p className="text-[10px] text-slate-400 font-normal">
                      {pet.age} • {pet.gender}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenDetail(pet)}
                    className="w-full py-1.5 text-center text-[11px] font-medium text-[#008779] hover:bg-teal-50 rounded-lg border border-teal-200/70 transition-colors"
                  >
                    Ver perfil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Awareness Banner */}
        <div
          onClick={() => {
            if (filteredPets.length > 0) handleOpenDetail(filteredPets[0]);
          }}
          className="p-3 rounded-2xl bg-[#e6f7f5] border border-teal-200/80 flex items-center justify-between cursor-pointer hover:bg-teal-100/70 transition-colors mt-2"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#008779] text-white flex items-center justify-center shrink-0">
              <PawPrint className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-medium text-[#008779]">Quer adotar um amigo?</h5>
              <p className="text-[10px] text-teal-800 font-normal">
                Adoção responsável e gratuita em Araucária.
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#008779]" />
        </div>
      </div>

      {/* Pet Detail Modal */}
      <PetDetailModal
        pet={selectedPet}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};
