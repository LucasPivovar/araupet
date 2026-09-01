import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Bell, 
  ChevronRight, 
  ShieldCheck, 
  Scissors, 
  Syringe, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { CAMPAIGN_LOCATIONS } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { ScheduleModal } from '../components/Modals/ScheduleModal';

interface VaccinesScreenProps {
  onBack: () => void;
  initialTab?: 'vacinacao' | 'castracao';
}

export const VaccinesScreen: React.FC<VaccinesScreenProps> = ({
  onBack,
  initialTab = 'vacinacao',
}) => {
  const [activeTab, setActiveTab] = useState<'vacinacao' | 'castracao'>(initialTab);
  const [remindersActive, setRemindersActive] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <TopBar
        title="Vacinação e Castração"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
      />

      {/* Main Content */}
      <div className="p-4 space-y-3.5">
        {/* Toggle Pill Buttons */}
        <div className="flex p-1 bg-slate-200/70 rounded-xl">
          <button
            onClick={() => setActiveTab('vacinacao')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'vacinacao'
                ? 'bg-[#008779] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vacinação
          </button>
          <button
            onClick={() => setActiveTab('castracao')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'castracao'
                ? 'bg-[#008779] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Castração
          </button>
        </div>

        {/* Featured Campaign Banner */}
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 max-w-[70%]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-800">
                  {activeTab === 'vacinacao' ? 'Campanha Antirrábica 2025' : 'Programa Castramóvel 2025'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-tight">
                {activeTab === 'vacinacao'
                  ? 'Proteja seu pet. Vacine contra a raiva.'
                  : 'Controle populacional e bem-estar gratuito.'}
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-[11px] font-medium text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-[#008779]" />
                <span>01/05 a 30/06/2025</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-700">
                Em andamento
              </span>
              <img
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=150&auto=format&fit=crop&q=80"
                alt="Campanha"
                className="w-14 h-14 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Próximas Ações Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-medium text-slate-800">
              Próximas ações perto de você
            </h4>
            <button
              onClick={() => setIsScheduleOpen(true)}
              className="text-[11px] font-medium text-[#008779] hover:underline"
            >
              Ver todas
            </button>
          </div>

          {/* Locations List */}
          <div className="space-y-2">
            {CAMPAIGN_LOCATIONS.slice(0, 3).map((loc) => (
              <div
                key={loc.id}
                onClick={() => setIsScheduleOpen(true)}
                className="p-3 rounded-2xl bg-white border border-slate-100/90 shadow-xs hover:border-teal-200 transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  {/* Date Badge */}
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/80 flex flex-col items-center justify-center text-center shrink-0 group-hover:bg-teal-50 group-hover:border-teal-200 transition-colors">
                    <span className="text-sm font-semibold text-slate-800 leading-none">
                      {loc.dateStr.split(' ')[0]}
                    </span>
                    <span className="text-[9px] font-medium text-[#008779] tracking-wider uppercase leading-none mt-0.5">
                      {loc.dateStr.split(' ')[1]}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-slate-400 font-normal">{loc.dayOfWeek}</p>
                    <h5 className="text-xs font-medium text-slate-800 group-hover:text-[#008779] transition-colors">
                      {loc.name}
                    </h5>
                    <p className="text-[11px] text-slate-500 font-normal truncate max-w-[170px]">
                      {loc.address}
                    </p>
                  </div>
                </div>

                {/* Distance */}
                <div className="flex items-center gap-1 text-[11px] font-normal text-slate-400 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{loc.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lembretes Card with Switch */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#008779] flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div className="max-w-[200px]">
              <h5 className="text-xs font-medium text-slate-800">Lembretes</h5>
              <p className="text-[10px] text-slate-400 font-normal leading-tight">
                Ative lembretes para campanhas e a saúde do seu pet.
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => setRemindersActive(!remindersActive)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
              remindersActive ? 'bg-[#008779]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                remindersActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Big Action Button */}
        <button
          onClick={() => setIsScheduleOpen(true)}
          className="w-full py-3.5 bg-[#008779] hover:bg-[#006e63] text-white rounded-2xl font-medium text-xs shadow-md shadow-[#008779]/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>Agendar atendimento</span>
        </button>
      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        initialType={activeTab}
      />
    </div>
  );
};
