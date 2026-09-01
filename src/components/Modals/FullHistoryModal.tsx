import React from 'react';
import { X, ShieldCheck, Check, Calendar, Download, Award, FileText } from 'lucide-react';
import { Pet } from '../../types';

interface FullHistoryModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
}

export const FullHistoryModal: React.FC<FullHistoryModalProps> = ({
  pet,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const records = [
    {
      title: 'Vacina Antirrábica',
      date: '12/09/2024',
      validity: '12/09/2025',
      location: 'Campanha Municipal - Parque Cachoeira',
      vet: 'Dra. Paola Silveira • CRMV-PR 14.821',
      lot: 'Lote AR-9821-B',
      status: 'Válida',
    },
    {
      title: 'Vacina V10 Polivalente',
      date: '10/05/2025',
      validity: '10/05/2026',
      location: 'Vet Center Araucária',
      vet: 'Dr. Marcos Albuquerque • CRMV-PR 11.204',
      lot: 'Lote V10-7741',
      status: 'Válida',
    },
    {
      title: 'Vermifugação Completa (Drontal Plus)',
      date: '20/04/2025',
      validity: '20/08/2025',
      location: 'Administrado pelo Tutor',
      vet: 'Prescrição Clínica',
      lot: 'Lote DR-3320',
      status: 'Válida',
    },
    {
      title: 'Procedimento de Microchipagem',
      date: '15/02/2023',
      validity: 'Vitalício',
      location: 'Castramóvel Araucária - Costeira',
      vet: 'Equipe CCZ Araucária',
      lot: 'Chip ID 982 000 193 847 210',
      status: 'Vitalício',
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008779] to-[#006e63] p-4.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Histórico Clínico & Vacinal</h3>
              <p className="text-xs text-teal-100 font-normal">{pet.name} • {pet.breed}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {/* Microchip Badge */}
          <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs">
            <div>
              <p className="font-medium text-slate-800">Microchip Oficial</p>
              <p className="font-mono text-[11px] text-[#008779]">982 000 193 847 210</p>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#008779] text-white font-medium text-[10px]">
              Ativo
            </span>
          </div>

          {/* Timeline of vaccines */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-slate-700">Registros em Prontuário</h4>
            {records.map((r, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">{r.title}</span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {r.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-normal space-y-0.5">
                  <p>📅 <span className="font-medium text-slate-700">Aplicação:</span> {r.date} • <span className="font-medium text-slate-700">Validade:</span> {r.validity}</p>
                  <p>📍 {r.location}</p>
                  <p>👨‍⚕️ {r.vet}</p>
                  <p className="font-mono text-[10px] text-slate-400">{r.lot}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert('Download do Prontuário em PDF Oficial da Prefeitura de Araucária iniciado!')}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            Baixar Carteira Digital em PDF
          </button>
        </div>
      </div>
    </div>
  );
};
