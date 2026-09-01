import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  User, 
  MapPin, 
  Heart, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TopBar } from '../components/TopBar';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('juliana.lima@email.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar select-none">
      {/* iOS Status Bar */}
      <TopBar showBack={false} transparent={true} darkIcons={true} />

      <div className="px-6 py-6 flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
        {/* Top Branding */}
        <div className="space-y-5 pt-2">
          {/* Logo & City Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#008779] to-[#26a69a] flex items-center justify-center shadow-md shadow-[#008779]/20 text-white">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" className="opacity-40" />
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4.5 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-7.5 4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm6 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-3 2.5c-2.2 0-4-1.8-4-4 0-.55.45-1 1-1h6c.55 0 1 .45 1 1 0 2.2-1.8 4-4 4z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-xl font-black tracking-tight text-slate-900">Arau</span>
                  <span className="text-xl font-black tracking-tight text-[#008779]">Pet</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Prefeitura de Araucária
                </p>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-[#008779] bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Araucária - PR
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Acesse sua conta
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Gerencie a carteira digital, agende vacinações e consulte o veterinário 24h.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-3.5 pt-1">
            {/* E-mail ou CPF */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                E-mail ou CPF
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="seu.email@exemplo.com ou CPF"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 transition-all"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Senha
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha de acesso"
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Options row */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#008779] focus:ring-[#008779] accent-[#008779]"
                />
                <span className="text-slate-600 font-medium">Lembrar-me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Instruções de recuperação de senha enviadas ao e-mail cadastrado!')}
                className="font-bold text-[#008779] hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-bold text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
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

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-semibold uppercase">
                ou acesse com
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Gov.br Button */}
            <button
              type="button"
              onClick={onLoginSuccess}
              className="w-full py-2.5 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2.5"
            >
              <span className="font-black text-blue-700 tracking-tight text-sm">gov.br</span>
              <span>Entrar com a conta Gov.br</span>
            </button>
          </form>
        </div>

        {/* Footer Register Link */}
        <div className="pt-6 pb-2 text-center border-t border-slate-200/80 mt-4">
          <p className="text-xs text-slate-500 font-medium">
            Ainda não tem cadastro?
            <button
              type="button"
              onClick={onNavigateRegister}
              className="font-bold text-[#008779] ml-1.5 hover:underline"
            >
              Cadastre-se aqui
            </button>
          </p>

          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mt-2 font-medium">
            <span>Cuidado que vira carinho. Cidade que cuida.</span>
            <Heart className="w-3 h-3 text-[#008779] fill-current inline" />
          </div>
        </div>
      </div>
    </div>
  );
};
