import React, { useState } from 'react';
import { ArrowRight, ExternalLink, KeyRound, Mail, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  defaultEmail = 'juliana.lima@email.com',
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008779] to-[#006e63] p-4.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Recuperar Senha</h3>
              <p className="text-xs text-teal-100 font-normal">Prefeitura de Araucária</p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              setIsSent(false);
            }}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!isSent ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Digite seu e-mail cadastrado no <strong>ArauPet</strong> para receber o link seguro de redefinição de senha.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 block">
                Seu E-mail Cadastrado
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-medium text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enviar Link de Recuperação</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-xs font-medium text-slate-500 hover:text-slate-800 pt-1"
            >
              Voltar para o Login
            </button>
          </form>
        ) : (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-teal-50 text-[#008779] rounded-full flex items-center justify-center mx-auto ring-8 ring-teal-50/50">
              <Mail className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-semibold text-slate-800">
                E-mail Enviado!
              </h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Enviamos as instruções e o link seguro de recuperação para:
              </p>
              <p className="text-xs font-semibold text-[#008779] bg-teal-50/80 px-3 py-1.5 rounded-lg border border-teal-100 inline-block">
                {email}
              </p>
            </div>

            <p className="text-[11px] text-slate-400 font-normal">
              Verifique sua caixa de entrada e spam nos próximos minutos.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.open(`mailto:${email}`);
                }}
                className="w-full py-2.5 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-medium text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir aplicativo de E-mail</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  onClose();
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-xs transition-colors"
              >
                Concluir e Voltar ao Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
