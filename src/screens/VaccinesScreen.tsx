import React, { useMemo, useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Bell, 
  ShieldCheck, 
  Syringe, 
  ChevronRight,
  ChevronDown,
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
  const [selectedType, setSelectedType] = useState<'vacinacao' | 'castracao'>(initialTab);
  const availableNeighborhoods = useMemo(
    () => Array.from(new Set(CAMPAIGN_LOCATIONS.map((loc) => loc.neighborhood))),
    []
  );
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(availableNeighborhoods[0]);
  const [scheduleLocationId, setScheduleLocationId] = useState<string | undefined>();
  const [remindersActive, setRemindersActive] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const filteredLocations = useMemo(
    () =>
      CAMPAIGN_LOCATIONS.filter((loc) => loc.neighborhood === selectedNeighborhood),
    [selectedNeighborhood]
  );

  const openScheduleForLocation = (locationId: string) => {
    setScheduleLocationId(locationId);
    setIsScheduleOpen(true);
  };

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
        {/* Featured Campaign Cards */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSelectedType('vacinacao')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedType === 'vacinacao'
                ? 'bg-[#008779] border-[#008779] text-white shadow-md shadow-[#008779]/20'
                : 'bg-white border-slate-300 text-slate-700 shadow-xs hover:border-slate-400'
            }`}
          >
            <Syringe className={`w-5 h-5 mb-2 ${selectedType === 'vacinacao' ? 'text-white' : 'text-[#008779]'}`} />
            <h3 className="text-xs font-semibold">Vacinação</h3>
            <p className={`text-[10px] leading-tight mt-0.5 ${selectedType === 'vacinacao' ? 'text-teal-50' : 'text-slate-400'}`}>
              Campanha antirrábica
            </p>
          </button>

          <button
            onClick={() => setSelectedType('castracao')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedType === 'castracao'
                ? 'bg-[#008779] border-[#008779] text-white shadow-md shadow-[#008779]/20'
                : 'bg-white border-slate-300 text-slate-700 shadow-xs hover:border-slate-400'
            }`}
          >
            <ShieldCheck className={`w-5 h-5 mb-2 ${selectedType === 'castracao' ? 'text-white' : 'text-[#008779]'}`} />
            <h3 className="text-xs font-semibold">Castração</h3>
            <p className={`text-[10px] leading-tight mt-0.5 ${selectedType === 'castracao' ? 'text-teal-50' : 'text-slate-400'}`}>
              Programa gratuito
            </p>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-semibold text-slate-800">Escolha o bairro</h4>
              <p className="text-[10px] text-slate-400 font-normal">
                As unidades aparecem conforme o bairro selecionado.
              </p>
            </div>
            <MapPin className="w-4 h-4 text-[#008779] shrink-0" />
          </div>
          <div className="relative">
            <select
              value={selectedNeighborhood}
              onChange={(event) => setSelectedNeighborhood(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-10 text-xs font-medium text-slate-700 outline-none transition-all focus:border-[#008779] focus:bg-white focus:ring-2 focus:ring-[#008779]/15"
            >
              {availableNeighborhoods.map((neighborhood) => (
                <option key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                {selectedType === 'vacinacao' ? 'Campanha Antirrábica 2025' : 'Programa Castramóvel 2025'}
              </h3>
              <p className="text-xs text-slate-500 font-normal leading-tight mt-1">
                {selectedType === 'vacinacao'
                  ? 'Proteja seu pet. Vacine contra a raiva.'
                  : 'Agende a avaliação para castração gratuita.'}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-700 shrink-0">
              Em andamento
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-[#008779]" />
            <span>{selectedType === 'vacinacao' ? '01/05 a 30/06/2025' : 'Agendas semanais por bairro'}</span>
          </div>
        </div>

        {/* Próximas Ações Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-medium text-slate-800">
              Unidades em {selectedNeighborhood}
            </h4>
            <span className="text-[11px] font-medium text-slate-400">
              {filteredLocations.length} {filteredLocations.length === 1 ? 'local' : 'locais'}
            </span>
          </div>

          {/* Locations List */}
          <div className="space-y-2">
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                onClick={() => openScheduleForLocation(loc.id)}
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
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#008779] mt-1">
                      Agendar neste local
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Distance */}
                <div className="flex items-center gap-1 text-[11px] font-normal text-slate-400 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{loc.distance}</span>
                </div>
              </div>
            ))}
            {filteredLocations.length === 0 && (
              <div className="p-4 rounded-2xl bg-white border border-dashed border-slate-200 text-center">
                <p className="text-xs font-medium text-slate-700">Nenhuma unidade para esse filtro</p>
                <p className="text-[10px] text-slate-400 font-normal mt-1">
                  Troque o bairro ou o tipo de atendimento.
                </p>
              </div>
            )}
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
          onClick={() => filteredLocations[0] && openScheduleForLocation(filteredLocations[0].id)}
          disabled={filteredLocations.length === 0}
          className="w-full py-3.5 bg-[#008779] hover:bg-[#006e63] disabled:bg-slate-300 disabled:shadow-none text-white rounded-2xl font-medium text-xs shadow-md shadow-[#008779]/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>{filteredLocations.length ? `Agendar em ${filteredLocations[0].name}` : 'Escolha outro bairro'}</span>
        </button>
      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        key={`${selectedType}-${scheduleLocationId ?? 'location'}`}
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        initialType={selectedType}
        initialLocationId={scheduleLocationId}
        lockLocation={true}
      />
    </div>
  );
};
