import React from 'react';
import { ArrowRight } from 'lucide-react';
import onboardingIllustration from '../../assets/onboarding-illustration.png';

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
      <div className="flex flex-1 flex-col space-y-5">
        <div className="flex items-center justify-center pt-1">
          <h1 className="text-3xl font-extrabold font-montserrat tracking-tight leading-none">
            <span className="text-slate-800">Arau</span>
            <span className="text-[#008779]">Pet</span>
          </h1>
        </div>

        <div className="flex flex-1 flex-col justify-center space-y-5">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold leading-tight text-slate-900">
              Crie sua conta e acompanhe tudo do seu pet
            </h2>
            <p className="mx-auto max-w-xs text-sm font-normal leading-relaxed text-slate-500">
              Carteira digital, campanhas, adoção, suporte e serviços para tutores em um só lugar.
            </p>
          </div>

          <img
            src={onboardingIllustration}
            alt="Tutora com cachorro e gato"
            className="mx-auto h-[310px] w-full max-w-[360px] object-contain"
          />
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onStartOnboarding}
          className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-2xl font-semibold text-sm shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <span>Continuar</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onGoToLogin}
          className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 rounded-2xl font-medium text-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]"
        >
          <span>Já possuo uma conta?</span>
          <strong className="text-[#008779]">Entrar</strong>
        </button>
      </div>
    </div>
  );
};
