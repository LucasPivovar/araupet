import React from 'react';
import { ArrowRight, Calendar, User, ChevronLeft } from 'lucide-react';

interface StepOneViewProps {
  fullName: string;
  setFullName: (val: string) => void;
  birthDate: string;
  setBirthDate: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
  onGoToLogin: () => void;
}

export const StepOneView: React.FC<StepOneViewProps> = ({
  fullName,
  setFullName,
  birthDate,
  setBirthDate,
  onNext,
  onBack,
  onGoToLogin,
}) => {
  const handleBirthDateChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 8);
    let formatted = raw;
    if (raw.length > 4) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`;
    } else if (raw.length > 2) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setBirthDate(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-1 animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Stepper Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="p-1 -ml-1 rounded-full text-slate-500 hover:text-slate-800 flex items-center gap-1 text-xs font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-[#008779] text-white text-[11px] font-bold flex items-center justify-center">
              1
            </span>
            <span className="w-2 h-0.5 bg-slate-200 rounded" />
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 text-[11px] font-bold flex items-center justify-center">
              2
            </span>
            <span className="w-2 h-0.5 bg-slate-200 rounded" />
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 text-[11px] font-bold flex items-center justify-center">
              3
            </span>
          </div>
        </div>

        <div className="pt-4 space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-[#008779] uppercase tracking-wider">
            Etapa 1 de 3 • Dados Pessoais
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Conte um pouco sobre você
          </h2>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            Informe seu nome completo e sua data de nascimento para iniciarmos o cadastro de tutor.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 my-auto py-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Nome Completo *
          </label>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: Juliana Rocha Lima"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Data de Nascimento *
          </label>
          <div className="relative flex items-center">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              required
              value={birthDate}
              onChange={(e) => handleBirthDateChange(e.target.value)}
              placeholder="DD/MM/AAAA (ex: 14/08/1996)"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!fullName.trim()}
          className="w-full py-3 bg-[#008779] hover:bg-[#006e63] disabled:opacity-50 text-white rounded-2xl font-semibold text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-4"
        >
          <span>Continuar para Endereço</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pb-2">
        <button
          type="button"
          onClick={onGoToLogin}
          className="text-xs text-slate-500 font-normal hover:text-slate-800"
        >
          Já tem cadastro? <strong className="text-[#008779]">Fazer login</strong>
        </button>
      </div>
    </div>
  );
};
