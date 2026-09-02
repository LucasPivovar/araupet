import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuccessViewProps {
  fullName: string;
  avatar: string;
  onNext: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  fullName,
  avatar,
  onNext,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between py-4 text-center animate-in zoom-in-95 duration-300">
      <div className="space-y-4 my-auto">
        {/* User Avatar and Welcome */}
        <div className="space-y-3">
          <div className="relative inline-block">
            <img
              src={avatar}
              alt={fullName || 'Tutor ArauPet'}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-[#008779]/30 shadow-lg mx-auto"
            />
            <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full ring-2 ring-white flex items-center justify-center text-xs text-white">
              ✓
            </span>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold bg-teal-50 text-[#008779] border border-teal-200">
              Cidadão Oficial de Araucária
            </span>
            <h2 className="text-2xl font-bold text-slate-800">
              Conta criada com sucesso!
            </h2>
            <p className="text-base font-semibold text-[#008779]">
              {fullName.trim() || 'Juliana Lima'}
            </p>
            <p className="text-xs text-slate-500 font-normal max-w-xs mx-auto pt-1">
              Seu acesso ao sistema de bem-estar animal e agendamentos está pronto.
            </p>
          </div>
        </div>
      </div>

      {/* Next Action */}
      <div className="space-y-2 pt-4">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-3.5 bg-[#008779] hover:bg-[#006e63] text-white rounded-2xl font-semibold text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <span>Próximo: Cadastrar meu Pet</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
