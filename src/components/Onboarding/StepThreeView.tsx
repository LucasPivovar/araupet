import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, Eye, EyeOff, Lock, Mail, Phone } from 'lucide-react';

interface StepThreeViewProps {
  phone: string;
  setPhone: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (val: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isRegistering: boolean;
}

export const StepThreeView: React.FC<StepThreeViewProps> = ({
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  termsAccepted,
  setTermsAccepted,
  onSubmit,
  onBack,
  isRegistering,
}) => {
  const [showRegPassword, setShowRegPassword] = useState(false);

  const handlePhoneChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 6) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    } else if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    } else if (raw.length > 0) {
      formatted = `(${raw}`;
    }
    setPhone(formatted);
  };

  return (
    <div className="flex-1 flex flex-col py-1 animate-in fade-in slide-in-from-right-4 duration-200">
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
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center">
              ✓
            </span>
            <span className="w-2 h-0.5 bg-emerald-500 rounded" />
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center">
              ✓
            </span>
            <span className="w-2 h-0.5 bg-[#008779] rounded" />
            <span className="w-6 h-6 rounded-full bg-[#008779] text-white text-[11px] font-bold flex items-center justify-center">
              3
            </span>
          </div>
        </div>

        <div className="pt-4 space-y-1.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-[#008779] uppercase tracking-wider">
            Etapa 3 de 3 • Contato & Segurança
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Criar Acesso e Contato
          </h2>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            Informe seu WhatsApp e defina sua senha segura para acessar o aplicativo.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-3 pt-5">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Celular / WhatsApp *
          </label>
          <div className="relative flex items-center">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(41) 99876-5432"
              className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            E-mail *
          </label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Senha *
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type={showRegPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 dígitos"
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] font-normal"
              />
              <button
                type="button"
                onClick={() => setShowRegPassword(!showRegPassword)}
                className="absolute right-2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Confirmar Senha *
            </label>
            <input
              type={showRegPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] font-normal"
            />
          </div>
        </div>

        <label className="flex items-start gap-2 pt-1 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded text-[#008779] focus:ring-[#008779] accent-[#008779]"
          />
          <span className="text-[11px] text-slate-500 font-normal leading-tight">
            Declaro que resido em Araucária e concordo com os Termos de Uso e Privacidade do ArauPet.
          </span>
        </label>

        <button
          type="submit"
          disabled={isRegistering || !email.trim() || !password.trim()}
          className="w-full py-3 bg-[#008779] hover:bg-[#006e63] disabled:opacity-50 text-white rounded-2xl font-semibold text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
        >
          {isRegistering ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Criar Minha Conta</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
