import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  Lock,
  Mail,
  UserPlus,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TopBar } from '../components/TopBar';
import loginIllustration from '../assets/login-illustration.png';
import prefeituraLogo from '../assets/prefeitura-araucaria-brasao.jpg';

interface WelcomeLoginScreenProps {
  onLoginSuccess: () => void;
}

export const WelcomeLoginScreen: React.FC<WelcomeLoginScreenProps> = ({
  onLoginSuccess,
}) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
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

      <div className="px-6 pt-3 pb-4 flex-1 flex flex-col max-w-md mx-auto w-full min-h-0 overflow-y-auto no-scrollbar">
        {/* Centered Prefeitura de Araucária with top padding */}
        <div className="flex items-center justify-center gap-2.5 pt-2 pb-1">
          <img
            src={prefeituraLogo}
            alt="Brasão da Prefeitura de Araucária"
            className="w-8 h-8 object-contain shrink-0"
          />
          <div className="text-left">
            <p className="text-[10px] font-normal text-slate-500 leading-tight">Prefeitura de</p>
            <h1 className="text-sm font-semibold text-slate-800 leading-none tracking-tight">
              Araucária
            </h1>
          </div>
        </div>

        {/* Card do Cachorro / Gato com ArauPet dentro */}
        <div className="relative mt-2 mb-3 flex justify-center shrink-0">
          <div className="absolute inset-x-1 top-0 bottom-0 rounded-[28px] bg-gradient-to-b from-teal-50/90 via-white to-teal-50/70 border border-teal-100/80 shadow-inner" />
          <div className="absolute left-2 top-8 h-14 w-14 rounded-full border border-teal-100 bg-white/60" />
          <div className="absolute right-3 bottom-8 h-16 w-16 rounded-full border border-teal-100 bg-white/70" />
          
          {/* ArauPet dentro do card */}
          <div className="absolute top-2.5 z-10 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-teal-100/90 shadow-2xs flex items-center gap-1">
            <span className="text-xs font-bold tracking-tight text-slate-800">Arau</span>
            <span className="text-xs font-bold tracking-tight text-[#008779]">Pet</span>
          </div>

          <img
            src={loginIllustration}
            alt="Cão e gato com paisagem de Araucária"
            className="relative w-full max-w-[320px] h-[250px] object-contain pt-5"
          />
        </div>

        {/* Bottom Section: Login */}
        <div className="space-y-3.5 shrink-0">
          <form onSubmit={handleLogin} className="space-y-3">
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
                onClick={() => alert('Instruções de recuperação de senha enviadas ao e-mail cadastrado!')}
                className="font-medium text-[#008779] hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

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

            <div className="flex items-center justify-center gap-1.5 text-center text-xs font-normal text-slate-500">
              <span>Bem-estar animal é responsabilidade de todos.</span>
              <Heart className="w-3.5 h-3.5 text-[#008779] fill-current shrink-0 inline" />
            </div>
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
                  <h3 className="font-bold text-base">Novo Cadastro</h3>
                  <p className="text-xs text-teal-100">Prefeitura de Araucária</p>
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
                <label className="text-xs font-bold text-slate-700 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ex: Juliana Lima"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">CPF</label>
                  <input
                    type="text"
                    required
                    value={regCpf}
                    onChange={(e) => setRegCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Bairro</label>
                  <select
                    value={regNeighborhood}
                    onChange={(e) => setRegNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] bg-white"
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
                className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-bold text-xs shadow-md transition-colors mt-2"
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
