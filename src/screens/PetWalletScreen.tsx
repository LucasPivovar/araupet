import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  ShieldCheck, 
  ChevronRight, 
  QrCode, 
  CheckCircle2, 
  Calendar, 
  Activity,
  Heart,
  Scale,
  Pill
} from 'lucide-react';
import { Pet } from '../types';
import { MY_PET } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { FullHistoryModal } from '../components/Modals/FullHistoryModal';

interface PetWalletScreenProps {
  onBack: () => void;
}

export const PetWalletScreen: React.FC<PetWalletScreenProps> = ({ onBack }) => {
  const [showHistory, setShowHistory] = useState(false);
  const pet = MY_PET;

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <TopBar
        title="Carteira Pet Digital"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
        rightAction={
          <button 
            onClick={() => setShowHistory(true)}
            className="p-1 text-slate-600 hover:text-slate-900 rounded-full"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        }
      />

      {/* Main Container */}
      <div className="p-4 space-y-3.5">
        {/* Pet Profile Card (Dark Teal Gradient) */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#004d40] to-[#006e63] text-white p-4 overflow-hidden shadow-md">
          <div className="flex items-center gap-3.5">
            <img
              src={pet.photo}
              alt={pet.name}
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-white/30 shrink-0"
            />
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-semibold truncate">{pet.name}</h2>
                <span className="text-rose-300 font-medium text-sm">♀</span>
              </div>
              <p className="text-xs text-teal-100 font-normal">
                {pet.species === 'dog' ? 'Cachorro' : 'Gato'} • {pet.breed}
              </p>
              <p className="text-xs text-teal-200/80 font-normal">
                {pet.age}
              </p>
              <p className="text-[11px] text-teal-100/90 pt-0.5 font-normal">
                <span className="opacity-70">Tutor(a) </span>
                <span className="font-medium">{pet.tutorName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Situação Vacinal Card */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-700">Situação vacinal</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700">
                {pet.vaccinesStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-normal">
              Próxima vacina: <span className="font-medium text-slate-700">{pet.nextVaccine}</span>
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2]" />
          </div>
        </div>

        {/* QR Code da Carteira */}
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center space-y-2.5">
          <span className="text-xs font-medium text-slate-700">
            QR Code da Carteira
          </span>

          {/* Realistic High-Fidelity Styled QR Code */}
          <div className="p-3 rounded-2xl bg-white border-2 border-slate-900 shadow-sm relative flex items-center justify-center">
            {/* SVG QR Code Pattern */}
            <svg viewBox="0 0 100 100" className="w-32 h-32 text-slate-900 fill-current">
              {/* Corner 1 */}
              <rect x="5" y="5" width="26" height="26" rx="4" />
              <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="13" width="10" height="10" rx="1" />

              {/* Corner 2 */}
              <rect x="69" y="5" width="26" height="26" rx="4" />
              <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="77" y="13" width="10" height="10" rx="1" />

              {/* Corner 3 */}
              <rect x="5" y="69" width="26" height="26" rx="4" />
              <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="77" width="10" height="10" rx="1" />

              {/* QR Pattern Blocks */}
              <rect x="36" y="8" width="6" height="6" />
              <rect x="46" y="8" width="12" height="6" />
              <rect x="36" y="18" width="10" height="8" />
              <rect x="50" y="20" width="8" height="8" />
              <rect x="8" y="36" width="10" height="8" />
              <rect x="22" y="36" width="6" height="14" />
              <rect x="34" y="34" width="32" height="32" rx="4" fill="#008779" />
              <circle cx="50" cy="50" r="8" fill="white" />
              <rect x="70" y="36" width="12" height="6" />
              <rect x="70" y="46" width="22" height="8" />
              <rect x="70" y="58" width="8" height="12" />
              <rect x="36" y="70" width="10" height="8" />
              <rect x="50" y="70" width="18" height="6" />
              <rect x="36" y="82" width="22" height="10" />
              <rect x="70" y="76" width="8" height="14" />
              <rect x="82" y="76" width="10" height="14" />
            </svg>
          </div>

          <p className="text-[11px] text-slate-400 font-normal max-w-[220px]">
            Apresente este QR Code em atendimentos e serviços.
          </p>
        </div>

        {/* Resumo de Saúde (3 columns) */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2.5">
          <h4 className="text-xs font-medium text-slate-700">Resumo de saúde</h4>
          
          <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
            <div className="px-1 space-y-0.5">
              <p className="text-[10px] text-slate-400 font-normal">Peso</p>
              <p className="text-xs font-medium text-slate-800">{pet.weight}</p>
            </div>
            <div className="px-1 space-y-0.5">
              <p className="text-[10px] text-slate-400 font-normal">Última consulta</p>
              <p className="text-xs font-medium text-slate-800">{pet.lastVisit}</p>
            </div>
            <div className="px-1 space-y-0.5">
              <p className="text-[10px] text-slate-400 font-normal">Vermifugação</p>
              <p className="text-xs font-medium text-slate-800">{pet.dewormingDate}</p>
            </div>
          </div>
        </div>

        {/* Ver histórico completo link */}
        <button
          onClick={() => setShowHistory(true)}
          className="w-full py-2.5 text-center text-xs font-medium text-[#008779] hover:text-[#006e63] flex items-center justify-center gap-1 transition-colors"
        >
          <span>Ver histórico completo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* History Modal */}
      <FullHistoryModal
        pet={pet}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </div>
  );
};
