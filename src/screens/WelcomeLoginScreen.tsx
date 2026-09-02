import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserPlus,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TopBar } from '../components/TopBar';
import loginIllustration from '../assets/login-illustration.png';

interface WelcomeLoginScreenProps {
  onLoginSuccess: () => void;
}

export const WelcomeLoginScreen: React.FC<WelcomeLoginScreenProps> = ({
  onLoginSuccess,
}) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [forgotNotice, setForgotNotice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('juliana.lima@email.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberAccess, setRememberAccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCpf, setRegCpf] = useState('');
  const [regNeighborhood, setRegNeighborhood] = useState('Centro');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      onLoginSuccess();
    }, 500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRegisterModal(false);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onLoginSuccess();
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden select-none relative">
      {/* Top Bar / Notch Area */}
      <TopBar showBack={false} transparent={true} darkIcons={true} />

      <div className="px-6 pt-4 pb-5 flex-1 flex flex-col max-w-md mx-auto w-full min-h-0 overflow-hidden">
        <div className="relative mb-4 flex flex-1 min-h-0 flex-col items-center justify-center overflow-hidden rounded-[28px] border border-teal-100/80 bg-gradient-to-b from-teal-50/90 via-white to-white shadow-inner">
          <div className="absolute left-4 top-8 h-16 w-16 rounded-full border border-teal-100 bg-white/60" />
          <div className="absolute right-4 bottom-8 h-20 w-20 rounded-full border border-teal-100 bg-white/70" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-extrabold font-montserrat tracking-tight leading-none inline-flex items-center justify-center">
              <span className="text-slate-800">Arau</span>
              <span className="text-[#008779]">Pet</span>
            </h1>
            <p className="text-[10px] font-semibold font-montserrat text-slate-400 tracking-widest uppercase mt-1">
              Saude e bem-estar animal
            </p>
          </div>

          <img
            src={loginIllustration}
            alt="Cão e gato com paisagem de Araucária"
            className="relative z-10 w-full max-w-[330px] h-[255px] object-contain mt-2"
          />
        </div>

        {/* Bottom Section: Login */}
        <div className="space-y-4 shrink-0">
          <form onSubmit={handleLogin} className="space-y-3.5">
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
                  className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal transition-all"
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
                  className="w-full pl-10 pr-10 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal transition-all"
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
                onClick={() => {
                  setForgotNotice(true);
                }}
                className="font-medium text-[#008779] hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

            {forgotNotice && (
              <div className="rounded-xl border border-teal-100 bg-teal-50 px-3 py-2 text-[11px] leading-relaxed text-slate-600">
                Enviamos as instrucoes de recuperacao para o e-mail informado.
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-medium text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="w-full py-2.5 bg-teal-50 hover:bg-teal-100/70 text-[#008779] border border-[#008779]/25 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Criar nova conta</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-[#008779] to-[#006e63] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Novo Cadastro</h3>
                  <p className="text-xs text-teal-100 font-normal">Crie seu acesso ao ArauPet</p>
                </div>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-5 space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ex: Juliana Lima"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">CPF</label>
                  <input
                    type="text"
                    required
                    value={regCpf}
                    onChange={(e) => setRegCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Bairro</label>
                  <select
                    value={regNeighborhood}
                    onChange={(e) => setRegNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] bg-white font-normal"
                  >
                    <option value="Centro">Centro</option>
                    <option value="Iguaçu">Iguaçu</option>
                    <option value="Fazenda Velha">Fazenda Velha</option>
                    <option value="Costeira">Costeira</option>
                    <option value="Tindiquera">Tindiquera</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-medium text-xs shadow-md transition-colors mt-2"
              >
                Cadastrar e Entrar no App
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
