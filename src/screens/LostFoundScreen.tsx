import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Filter, 
  Phone, 
  Calendar, 
  AlertCircle,
  CheckCircle2,
  Navigation,
  Layers
} from 'lucide-react';
import { LostFoundPet } from '../types';
import { LOST_FOUND_PETS } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { NewReportModal } from '../components/Modals/NewReportModal';

interface LostFoundScreenProps {
  onBack: () => void;
}

export const LostFoundScreen: React.FC<LostFoundScreenProps> = ({ onBack }) => {
  const [viewMode, setViewMode] = useState<'mapa' | 'lista'>('mapa');
  const [pets, setPets] = useState<LostFoundPet[]>(LOST_FOUND_PETS);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleAddPet = (newPet: LostFoundPet) => {
    setPets([newPet, ...pets]);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-hidden relative">
      {/* Top Bar */}
      <TopBar
        title="Perdidos e Encontrados"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
        rightAction={
          <button 
            onClick={() => setIsReportOpen(true)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        }
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toggle View Mode Bar */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 shrink-0">
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setViewMode('mapa')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'mapa'
                  ? 'bg-[#008779] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mapa
            </button>
            <button
              onClick={() => setViewMode('lista')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'lista'
                  ? 'bg-[#008779] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lista
            </button>
          </div>
        </div>

        {viewMode === 'mapa' ? (
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Interactive Map View */}
            <div className="relative h-60 w-full bg-[#e5ebee] overflow-hidden shrink-0 border-b border-slate-200">
              {/* Map Vector Graphic (Streets, Rivers, Parks) */}
              <svg className="w-full h-full object-cover" viewBox="0 0 400 240">
                <rect width="400" height="240" fill="#e9eef2" />
                {/* Green Park Area (Parque Cachoeira) */}
                <path d="M 220 20 C 260 10, 310 30, 340 70 C 370 110, 350 160, 310 170 C 270 180, 230 140, 210 100 Z" fill="#d1fae5" />
                {/* River Passaúna */}
                <path d="M 0 180 Q 100 160, 180 200 T 360 220 T 400 210" fill="none" stroke="#bae6fd" strokeWidth="14" strokeLinecap="round" />
                {/* Streets Grid */}
                <path d="M 40 0 L 40 240 M 120 0 L 120 240 M 200 0 L 200 240 M 280 0 L 280 240 M 360 0 L 360 240" stroke="#ffffff" strokeWidth="6" />
                <path d="M 0 50 L 400 50 M 0 110 L 400 110 M 0 170 L 400 170" stroke="#ffffff" strokeWidth="6" />
                {/* Main Avenues */}
                <path d="M 0 110 Q 150 120, 260 90 T 400 60" fill="none" stroke="#fed7aa" strokeWidth="8" />
                <path d="M 180 0 L 180 240" stroke="#fed7aa" strokeWidth="7" />
              </svg>

              {/* User Center GPS Radar */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#008779]/20 pulse-radar flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#008779] ring-2 ring-white shadow-md" />
                </div>
              </div>

              {/* Pet Map Pins */}
              {/* Pin 1: Thor (Desaparecido) */}
              <div
                onClick={() => setSelectedPetId('lf-1')}
                className="absolute top-12 left-28 -translate-x-1/2 cursor-pointer transform hover:scale-110 transition-transform z-20 group"
              >
                <div className="w-8 h-8 rounded-full bg-rose-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
                  <span className="text-xs">🐾</span>
                </div>
                <div className="w-1.5 h-2 bg-rose-500 mx-auto -mt-0.5 rounded-b-full shadow-xs" />
              </div>

              {/* Pin 2: Mel (Encontrada) */}
              <div
                onClick={() => setSelectedPetId('lf-2')}
                className="absolute top-28 left-68 -translate-x-1/2 cursor-pointer transform hover:scale-110 transition-transform z-20 group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
                  <span className="text-xs">🐾</span>
                </div>
                <div className="w-1.5 h-2 bg-emerald-600 mx-auto -mt-0.5 rounded-b-full shadow-xs" />
              </div>

              {/* Floating Filtros Button */}
              <button className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md text-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-white active:scale-95 transition-all">
                <Filter className="w-3.5 h-3.5 text-[#008779]" />
                <span>Filtros</span>
              </button>
            </div>

            {/* Bottom Drawer / Pet Cards List */}
            <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto custom-scrollbar">
              {pets.slice(0, 2).map((p) => {
                const isDesaparecido = p.type === 'desaparecido';
                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-teal-200 transition-all flex items-center gap-3"
                  >
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                            isDesaparecido
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {isDesaparecido ? 'Desaparecido' : 'Encontrado'}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {p.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {p.species} • {p.breed}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {p.date}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {p.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 shrink-0 self-end mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{p.distance}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Lista Mode */
          <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
            {pets.map((p) => {
              const isDesaparecido = p.type === 'desaparecido';
              return (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800">{p.name}</h4>
                        <span
                          className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            isDesaparecido
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {isDesaparecido ? 'Desaparecido' : 'Encontrado'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{p.species} • {p.breed}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{p.date}</p>
                      <p className="text-[11px] text-slate-400">📍 {p.location} ({p.distance})</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">{p.description}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Contato: {p.contactPhone}</span>
                    <button
                      onClick={() => alert(`Ligando para ${p.contactPhone}...`)}
                      className="px-3 py-1 bg-[#008779] text-white rounded-lg text-xs font-bold"
                    >
                      Contatar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Report Modal */}
      <NewReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onAddPet={handleAddPet}
      />
    </div>
  );
};
