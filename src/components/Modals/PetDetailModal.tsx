import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Check, Phone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet } from '../../types';

interface PetDetailModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (petId: string) => void;
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({
  pet,
  isOpen,
  onClose,
  onToggleFavorite,
}) => {
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  if (!isOpen || !pet) return null;

  const handleInterest = () => {
    setInterestSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const handleClose = () => {
    setInterestSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh]">
        {/* Pet Image Banner */}
        <div className="relative h-56 w-full shrink-0">
          <img
            src={pet.photo}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite(pet.id)}
            className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              pet.isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 text-slate-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${pet.isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Info on Image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">{pet.name}</h3>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md">
                {pet.gender}
              </span>
            </div>
            <p className="text-xs text-white/80 font-medium">
              {pet.breed} • {pet.age}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {interestSubmitted ? (
            <div className="p-4 text-center space-y-3 bg-teal-50 rounded-2xl border border-teal-100">
              <div className="w-12 h-12 rounded-full bg-[#008779] text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="font-semibold text-slate-800 text-base">
                Interesse Registrado!
              </h4>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                Nossa equipe da Coordenação de Bem-Estar Animal de Araucária entrará em contato pelo WhatsApp cadastrado para agendar uma visita e entrevista.
              </p>
              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-[#008779] text-white rounded-xl font-medium text-xs shadow-xs"
              >
                Entendido
              </button>
            </div>
          ) : (
            <>
              {/* Health Badges */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-center">
                  <ShieldCheck className="w-4 h-4 text-[#008779] mx-auto mb-1" />
                  <p className="text-[10px] text-slate-500 font-normal">Vacinas</p>
                  <p className="text-xs font-medium text-[#008779]">100% Em Dia</p>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                  <Sparkles className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <p className="text-[10px] text-slate-500 font-normal">Castração</p>
                  <p className="text-xs font-medium text-emerald-700">Castrado(a)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-100 text-center">
                  <ShieldCheck className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
                  <p className="text-[10px] text-slate-500 font-normal">Microchip</p>
                  <p className="text-xs font-medium text-cyan-700">Registrado</p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-medium text-slate-700 mb-1.5">Características</h4>
                <div className="flex flex-wrap gap-1.5">
                  {pet.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-normal"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Story */}
              <div>
                <h4 className="text-xs font-medium text-slate-700 mb-1">História do Pet</h4>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {pet.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleInterest}
                className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-medium text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                Quero Adotar o(a) {pet.name}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
