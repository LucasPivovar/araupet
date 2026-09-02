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
  const nameParts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || 'Juliana';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const displayName = [firstName, lastName].filter(Boolean).join(' ');
  const initials = `${firstName[0] ?? 'J'}${lastName[0] ?? firstName[1] ?? 'L'}`.toUpperCase();

  return (
    <div className="flex-1 flex flex-col justify-between py-8 text-center animate-in zoom-in-95 duration-300">
      <div className="space-y-4">
        <div className="space-y-3 pt-2">
          <div className="relative inline-block">
            <div
              aria-label={avatar ? displayName : 'Tutor ArauPet'}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#008779] bg-gradient-to-br from-[#008779] via-[#10b981] to-[#7dd3fc] text-3xl font-bold text-white shadow-xl ring-4 ring-teal-100"
            >
              {initials}
            </div>
            <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full ring-2 ring-white flex items-center justify-center text-xs text-white">
              ✓
            </span>
          </div>
          <p className="text-lg font-semibold text-[#008779]">
            {displayName}
          </p>

          <div className="space-y-1.5 pt-2">
            <h2 className="text-2xl font-bold text-slate-800">
              Conta criada com sucesso!
            </h2>
            <p className="text-xs text-slate-500 font-normal max-w-xs mx-auto pt-1">
              Seu acesso ao sistema de bem-estar animal e agendamentos está pronto.
            </p>
          </div>
        </div>
      </div>

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
