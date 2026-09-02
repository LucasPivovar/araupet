import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail, ChevronLeft } from 'lucide-react';

interface LoginViewProps {
  onBack: () => void;
  onLogin: () => void;
  onForgotPassword: (email: string) => void;
  onGoToRegister: () => void;
  isLoading: boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onBack,
  onLogin,
  onForgotPassword,
  onGoToRegister,
  isLoading,
}) => {
  const [email, setEmail] = useState('juliana.lima@email.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberAccess, setRememberAccess] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex-1 flex flex-col py-1 animate-in fade-in duration-300">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-3">
        <button
          type="button"
          onClick={onBack}
          className="p-1.5 -ml-1.5 rounded-full text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-1 text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold font-montserrat text-slate-800">Arau</span>
          <span className="text-lg font-bold font-montserrat text-[#008779]">Pet</span>
        </div>
      </div>

      <div className="space-y-4 pt-16">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800">Bem-vindo(a) de volta!</h2>
          <p className="text-xs text-slate-500">
            Entre com seu e-mail ou CPF e sua senha de acesso.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              E-mail ou CPF
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com ou CPF"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Senha
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 rounded-full"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberAccess}
                onChange={(e) => setRememberAccess(e.target.checked)}
                className="w-4 h-4 rounded text-[#008779] focus:ring-[#008779] accent-[#008779]"
              />
              <span className="text-slate-600 font-normal">Lembrar-me</span>
            </label>

            <button
              type="button"
              onClick={() => onForgotPassword(email)}
              className="font-medium text-[#008779] hover:underline"
            >
              Esqueci minha senha
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-2xl font-semibold text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Entrar no ArauPet</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={onGoToRegister}
          className="text-xs text-slate-500 font-normal hover:text-slate-800"
        >
          Não tem uma conta? <strong className="text-[#008779] font-medium">Criar cadastro</strong>
        </button>
      </div>
    </div>
  );
};
