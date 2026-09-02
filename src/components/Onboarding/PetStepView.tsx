import React from 'react';
import { ArrowRight, PawPrint, Plus } from 'lucide-react';
import { Pet } from '../../types';

interface PetStepViewProps {
  pets: Pet[];
  onOpenAddPetModal: () => void;
  onFinish: () => void;
}

export const PetStepView: React.FC<PetStepViewProps> = ({
  pets,
  onOpenAddPetModal,
  onFinish,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-1 text-center pb-2">
        <div className="w-12 h-12 bg-teal-50 text-[#008779] rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
          <PawPrint className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 pt-1">
          Cadastre seu pet
        </h2>
        <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-xs mx-auto">
          {pets.length === 0
            ? 'Vincule seu primeiro animal à sua Carteira Digital para ter acesso a vacinas, castração e telemedicina 24h.'
            : 'Veja os pets adicionados à sua carteira digital:'}
        </p>
      </div>

      {/* Pets List Preview or Empty State */}
      <div className="my-auto py-2 space-y-3">
        {pets.length === 0 ? (
          <div
            onClick={onOpenAddPetModal}
            className="p-5 rounded-3xl bg-gradient-to-b from-teal-50/70 to-white border-2 border-dashed border-teal-300/80 hover:border-[#008779] transition-all flex flex-col items-center justify-center text-center cursor-pointer shadow-xs group active:scale-[0.99]"
          >
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#008779] mb-2 group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              Cadastrar Primeiro Pet
            </h4>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Cachorro, gato ou outro pet
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[220px] overflow-y-auto custom-scrollbar">
            {pets.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-teal-500/20"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>{p.name}</span>
                      <span className="text-[10px] font-normal text-slate-500">
                        ({p.species === 'dog' ? 'Cachorro' : 'Gato'})
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-500 font-normal">
                      {p.breed} • {p.gender}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold text-[10px] rounded-md border border-emerald-200">
                  Cadastrado ✓
                </span>
              </div>
            ))}

            {/* Question Banner */}
            <div className="p-3 rounded-2xl bg-teal-50/80 border border-teal-200 text-center">
              <p className="text-xs font-semibold text-slate-800">
                Você possui mais algum pet?
              </p>
              <p className="text-[11px] text-slate-500 font-normal">
                Você pode cadastrar agora ou adicionar depois pela Carteira.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2.5 pt-2">
        {pets.length === 0 ? (
          <>
            <button
              type="button"
              onClick={onOpenAddPetModal}
              className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-2xl font-semibold text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Pet Agora</span>
            </button>

            <button
              type="button"
              onClick={onFinish}
              className="w-full py-2.5 bg-transparent text-slate-500 hover:text-slate-800 font-medium text-xs transition-colors"
            >
              Pular e cadastrar depois
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onOpenAddPetModal}
              className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 text-[#008779] border border-[#008779]/30 rounded-2xl font-semibold text-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar outro pet</span>
            </button>

            <button
              type="button"
              onClick={onFinish}
              className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-2xl font-semibold text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>Concluir e Acessar o App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
