import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Clock, PawPrint } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CampaignLocation } from '../../types';
import { CAMPAIGN_LOCATIONS } from '../../data/mockData';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'vacinacao' | 'castracao';
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  initialType = 'vacinacao',
}) => {
  const [type, setType] = useState<'vacinacao' | 'castracao'>(initialType);
  const [selectedLocation, setSelectedLocation] = useState<string>(CAMPAIGN_LOCATIONS[0].id);
  const [selectedTime, setSelectedTime] = useState<string>('09:30');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsSuccess(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const times = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '13:30', '14:00'];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008779] to-[#006e63] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Agendar Atendimento</h3>
              <p className="text-xs text-teal-100">Prefeitura de Araucária</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-[#008779] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-extrabold text-slate-800">
                Agendamento Confirmado!
              </h4>
              <p className="text-xs text-slate-500">
                O comprovante e o QR Code foram salvos na Carteira Digital da <strong>Mel</strong>.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 text-left text-xs space-y-1.5 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Serviço:</span>
                <span className="font-semibold text-slate-800 uppercase">{type === 'vacinacao' ? 'Vacinação Antirrábica' : 'Castração Gratuita'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Local:</span>
                <span className="font-semibold text-slate-800">USF Iguaçu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Horário:</span>
                <span className="font-semibold text-[#008779]">24 MAI às {selectedTime}</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-bold text-sm shadow-md transition-colors"
            >
              Concluir
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Service Toggle */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1.5">
                Tipo de Atendimento
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setType('vacinacao')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    type === 'vacinacao'
                      ? 'bg-white text-[#008779] shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  Vacinação
                </button>
                <button
                  type="button"
                  onClick={() => setType('castracao')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    type === 'castracao'
                      ? 'bg-white text-[#008779] shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  Castração
                </button>
              </div>
            </div>

            {/* Pet Selector */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1.5">
                Pet Selecionado
              </label>
              <div className="flex items-center gap-3 p-2.5 rounded-xl border border-teal-200 bg-teal-50/50">
                <img
                  src="https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=100&auto=format&fit=crop&q=80"
                  alt="Mel"
                  className="w-10 h-10 rounded-full object-cover border border-white"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Mel (Border Collie)</h4>
                  <p className="text-[10px] text-slate-500">Tutora: Juliana Lima • 18,5 kg</p>
                </div>
              </div>
            </div>

            {/* Location selector */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1.5">
                Escolha a Unidade / Ponto de Ação
              </label>
              <div className="space-y-1.5">
                {CAMPAIGN_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`w-full p-2.5 rounded-xl text-left border transition-all flex items-center justify-between text-xs ${
                      selectedLocation === loc.id
                        ? 'border-[#008779] bg-teal-50/60 font-semibold'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-800">{loc.name}</p>
                      <p className="text-[11px] text-slate-500">{loc.address}</p>
                    </div>
                    <span className="text-[11px] font-bold text-[#008779] bg-white px-2 py-0.5 rounded-md border border-teal-100">
                      {loc.dateStr}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1.5">
                Horário Disponível
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                      selectedTime === t
                        ? 'bg-[#008779] border-[#008779] text-white font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-bold text-sm shadow-md transition-colors mt-2"
            >
              Confirmar Agendamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
