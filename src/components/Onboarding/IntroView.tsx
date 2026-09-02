import React from 'react';
import { ArrowRight } from 'lucide-react';
import loginIllustration from '../../assets/login-illustration.png';
import prefeituraLogo from '../../assets/prefeitura-araucaria-brasao.jpg';

interface IntroViewProps {
  onStartOnboarding: () => void;
  onGoToLogin: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({
  onStartOnboarding,
  onGoToLogin,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-300">
      {/* Header Prefeitura */}
      <div className="flex items-center justify-center gap-2.5 pt-1 pb-1">
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

      {/* Central Card with Illustration and ArauPet Logo */}
      <div className="relative my-3 flex flex-col items-center justify-center shrink-0">
        <div className="absolute inset-x-1 top-0 bottom-0 rounded-[28px] bg-gradient-to-b from-teal-50/90 via-white to-teal-50/70 border border-teal-100/80 shadow-inner" />
        <div className="absolute left-2 top-8 h-14 w-14 rounded-full border border-teal-100 bg-white/60" />
        <div className="absolute right-3 bottom-6 h-16 w-16 rounded-full border border-teal-100 bg-white/70" />

        {/* Logo ArauPet em Montserrat */}
        <div className="relative z-10 pt-7 pb-1 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-montserrat tracking-tight leading-none inline-flex items-center justify-center">
            <span className="text-slate-800">Arau</span>
            <span className="text-[#008779]">Pet</span>
          </h2>
          <p className="text-[10px] font-semibold font-montserrat text-slate-400 tracking-widest uppercase mt-1">
            Saúde e bem-estar animal
          </p>
        </div>

        <img
          src={loginIllustration}
          alt="Cão e gato com paisagem de Araucária"
          className="relative w-full max-w-[290px] h-[210px] object-contain mt-1"
        />
      </div>

      {/* Bottom Actions: Começar Onboarding ou Entrar */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onStartOnboarding}
          className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-2xl font-semibold text-sm shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <span>Criar minha conta</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onGoToLogin}
          className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 rounded-2xl font-medium text-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]"
        >
          <span>Já possuo uma conta?</span>
          <strong className="text-[#008779]">Entrar</strong>
        </button>
      </div>
    </div>
  );
};
