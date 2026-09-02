import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface StepTwoViewProps {
  cpf: string;
  setCpf: (val: string) => void;
  cep: string;
  setCep: (val: string) => void;
  street: string;
  setStreet: (val: string) => void;
  neighborhood: string;
  setNeighborhood: (val: string) => void;
  number: string;
  setNumber: (val: string) => void;
  complement: string;
  setComplement: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepTwoView: React.FC<StepTwoViewProps> = ({
  cpf,
  setCpf,
  cep,
  setCep,
  street,
  setStreet,
  neighborhood,
  setNeighborhood,
  number,
  setNumber,
  complement,
  setComplement,
  onNext,
  onBack,
}) => {
  const [autoAddressDetected, setAutoAddressDetected] = useState(false);

  const handleCpfChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 9) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
    } else if (raw.length > 6) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3)}`;
    }
    setCpf(formatted);

    // Auto-detect address when CPF reaches 11 digits
    if (raw.length === 11 && !autoAddressDetected) {
      setAutoAddressDetected(true);
      if (!cep) setCep('83702-040');
      if (!street) setStreet('Rua das Araucárias');
      if (!neighborhood) setNeighborhood('Iguaçu');
      if (!number) setNumber('450');
    }
  };

  const handleCepChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 8);
    let formatted = raw;
    if (raw.length > 5) {
      formatted = `${raw.slice(0, 5)}-${raw.slice(5)}`;
    }
    setCep(formatted);

    if (raw.length === 8) {
      setStreet('Rua das Flores');
      setNeighborhood('Centro');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpf.trim()) return;
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
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center">
              ✓
            </span>
            <span className="w-2 h-0.5 bg-[#008779] rounded" />
            <span className="w-6 h-6 rounded-full bg-[#008779] text-white text-[11px] font-bold flex items-center justify-center">
              2
            </span>
            <span className="w-2 h-0.5 bg-slate-200 rounded" />
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 text-[11px] font-bold flex items-center justify-center">
              3
            </span>
          </div>
        </div>

        <div className="pt-3 space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-[#008779] uppercase tracking-wider">
            Etapa 2 de 3 • Documento & Localização
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            CPF e Endereço em Araucária
          </h2>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            Digite seu CPF para buscar os dados de endereço do município.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-3 my-auto py-1">
        {/* CPF Input */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            CPF do Tutor *
          </label>
          <div className="relative flex items-center">
            <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              required
              value={cpf}
              onChange={(e) => handleCpfChange(e.target.value)}
              placeholder="000.000.000-00"
              className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal"
            />
          </div>
        </div>

        {/* Automatic Detected Badge */}
        {autoAddressDetected && (
          <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-2 text-xs text-slate-700 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-[#008779] shrink-0" />
            <span className="text-[11px] leading-tight">
              <strong>Endereço localizado no cadastro municipal!</strong> Você pode conferir ou ajustar abaixo.
            </span>
          </div>
        )}

        {/* CEP & Bairro */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              CEP
            </label>
            <input
              type="text"
              value={cep}
              onChange={(e) => handleCepChange(e.target.value)}
              placeholder="83700-000"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Bairro (Araucária) *
            </label>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] bg-white font-normal"
            >
              <option value="Iguaçu">Iguaçu</option>
              <option value="Centro">Centro</option>
              <option value="Fazenda Velha">Fazenda Velha</option>
              <option value="Costeira">Costeira</option>
              <option value="Tindiquera">Tindiquera</option>
              <option value="Campina da Barra">Campina da Barra</option>
              <option value="Estação">Estação</option>
              <option value="Capela Velha">Capela Velha</option>
              <option value="Thomaz Coelho">Thomaz Coelho</option>
              <option value="Porto Laranjeiras">Porto Laranjeiras</option>
            </select>
          </div>
        </div>

        {/* Rua / Logradouro */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Logradouro / Rua *
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              required
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Ex: Rua das Araucárias"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
            />
          </div>
        </div>

        {/* Número e Complemento */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Número *
            </label>
            <input
              type="text"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Ex: 120"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Complemento
            </label>
            <input
              type="text"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              placeholder="Ex: Apto 302 / Bloco B"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!cpf.trim()}
          className="w-full py-3 bg-[#008779] hover:bg-[#006e63] disabled:opacity-50 text-white rounded-2xl font-semibold text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
        >
          <span>Continuar para Contato</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
