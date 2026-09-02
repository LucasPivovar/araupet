import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <div className="flex-1 flex flex-col justify-between py-3 text-center animate-in zoom-in-95 duration-300">
      <div className="space-y-4 my-auto">
        {/* Success Badge */}
        <div className="w-16 h-16 bg-emerald-100 text-[#008779] rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* User Avatar and Welcome */}
        <div className="space-y-3">
          <div className="relative inline-block">
            <img
              src={avatar}
              alt={fullName || 'Tutor ArauPet'}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-[#008779]/30 shadow-lg mx-auto"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full ring-2 ring-white flex items-center justify-center text-[10px] text-white">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold bg-teal-50 text-[#008779] border border-teal-200">
              Cidadão Oficial de Araucária
            </span>
            <h2 className="text-2xl font-bold text-slate-800">
              Conta criada com sucesso!
            </h2>
            <p className="text-sm font-semibold text-[#008779]">
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
