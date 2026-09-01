import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  Sparkles,
  Check,
  ChevronLeft,
  Dog
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TopBar } from '../components/TopBar';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onNavigateLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [neighborhood, setNeighborhood] = useState('Iguaçu');
  const [petName, setPetName] = useState('');
  const [petSpecies, setPetSpecies] = useState<'dog' | 'cat'>('dog');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const neighborhoods = [
    'Centro',
    'Iguaçu',
    'Fazenda Velha',
    'Costeira',
    'Tindiquera',
    'Campina da Barra',
    'Passaúna',
    'Boqueirão',
    'Porto Laranjeiras',
    'Capela Velha',
    'Thomaz Coelho',
    'Guajuvira'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Por favor, aceite os termos de uso para prosseguir.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onRegisterSuccess();
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar select-none">
      {/* Top Bar with Back Arrow */}
      <TopBar
        title="Criar Conta"
        onBack={onNavigateLogin}
        showBack={true}
        darkIcons={true}
      />

      <div className="px-6 py-4 flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
        <div className="space-y-4">
          {/* Header Branding */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#008779] to-[#26a69a] flex items-center justify-center shadow-md shadow-[#008779]/20 text-white shrink-0">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" className="opacity-40" />
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4.5 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-7.5 4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm6 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-3 2.5c-2.2 0-4-1.8-4-4 0-.55.45-1 1-1h6c.55 0 1 .45 1 1 0 2.2-1.8 4-4 4z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black text-slate-800">Arau</span>
                <span className="text-xl font-black text-[#008779]">Pet</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Prefeitura de Araucária • Cadastro Cidadão
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Cadastre-se no ArauPet
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Tenha a Carteira Digital do seu pet, agende vacinas gratuitas e acesse o veterinário 24h.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            {/* Nome Completo */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Nome Completo do Tutor(a)
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Juliana Lima"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                E-mail
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779]"
                />
              </div>
            </div>

            {/* CPF & WhatsApp */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">CPF</label>
                <input
                  type="text"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">WhatsApp</label>
                <div className="relative flex items-center">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(41) 99999-9999"
                    className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779]"
                  />
                </div>
              </div>
            </div>

            {/* Bairro em Araucária */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Bairro em Araucária - PR
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] appearance-none"
                >
                  {neighborhoods.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dados do Primeiro Pet */}
            <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#008779] flex items-center gap-1.5">
                  <Dog className="w-3.5 h-3.5" />
                  Cadastrar 1º Pet (Opcional)
                </span>
                <div className="flex gap-1 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setPetSpecies('dog')}
                    className={`px-2 py-0.5 rounded-md ${
                      petSpecies === 'dog' ? 'bg-[#008779] text-white' : 'bg-white text-slate-600'
                    }`}
                  >
                    Cão
                  </button>
                  <button
                    type="button"
                    onClick={() => setPetSpecies('cat')}
                    className={`px-2 py-0.5 rounded-md ${
                      petSpecies === 'cat' ? 'bg-[#008779] text-white' : 'bg-white text-slate-600'
                    }`}
                  >
                    Gato
                  </button>
                </div>
              </div>

              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Nome do seu pet (ex: Mel, Bob...)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-teal-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779]"
              />
            </div>

            {/* Senha */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Criar Senha de Acesso
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779]"
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

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 pt-1 text-[11px] text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-[#008779] focus:ring-[#008779] accent-[#008779]"
              />
              <span>
                Li e concordo com os Termos de Uso e com as Diretrizes de Bem-Estar Animal da Prefeitura de Araucária.
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-bold text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Concluir Cadastro</span>
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Login Link */}
        <div className="pt-4 pb-2 text-center border-t border-slate-200/80 mt-4">
          <p className="text-xs text-slate-500 font-medium">
            Já possui cadastro?
            <button
              type="button"
              onClick={onNavigateLogin}
              className="font-bold text-[#008779] ml-1.5 hover:underline"
            >
              Fazer Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
