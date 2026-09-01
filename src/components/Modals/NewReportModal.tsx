import React, { useState } from 'react';
import { X, Camera, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LostFoundPet } from '../../types';

interface NewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPet: (pet: LostFoundPet) => void;
}

export const NewReportModal: React.FC<NewReportModalProps> = ({
  isOpen,
  onClose,
  onAddPet,
}) => {
  const [type, setType] = useState<'desaparecido' | 'encontrado'>('desaparecido');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('(41) 99876-5432');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPet: LostFoundPet = {
      id: `report-${Date.now()}`,
      name: name.trim() || (type === 'desaparecido' ? 'Pet Desaparecido' : 'Pet Encontrado'),
      type,
      species: 'Cachorro',
      breed: breed || 'SRD',
      gender: 'Macho',
      date: type === 'desaparecido' ? 'Desapareceu Hoje' : 'Encontrado Hoje',
      location: location || 'Centro, Araucária',
      distance: '0,5 km de você',
      photo: type === 'desaparecido'
        ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=400&auto=format&fit=crop&q=80',
      description: description || 'Pet avistado/perdido na região de Araucária.',
      contactPhone: contact,
      lat: -25.5925 + (Math.random() - 0.5) * 0.015,
      lng: -49.4080 + (Math.random() - 0.5) * 0.015,
    };

    onAddPet(newPet);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008779] to-[#006e63] p-4.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Cadastrar Alerta Pet</h3>
              <p className="text-xs text-teal-100 font-normal">Animais Desaparecidos & Encontrados</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Type Toggle */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Situação do Pet
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setType('desaparecido')}
                className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                  type === 'desaparecido'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                🔴 Desaparecido
              </button>
              <button
                type="button"
                onClick={() => setType('encontrado')}
                className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                  type === 'encontrado'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                🟢 Encontrado
              </button>
            </div>
          </div>

          {/* Pet Name */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Nome do Pet {type === 'encontrado' && '(se souber)'}
            </label>
            <input
              type="text"
              placeholder={type === 'desaparecido' ? 'Ex: Thor, Mel...' : 'Provisório / Não identificado'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
            />
          </div>

          {/* Breed & Location */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Raça / Porte
              </label>
              <input
                type="text"
                placeholder="Ex: SRD Médio"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Local / Bairro
              </label>
              <input
                type="text"
                placeholder="Ex: Bairro Iguaçu"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] font-normal"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Características e Detalhes
            </label>
            <textarea
              rows={2}
              placeholder="Coleira, cor do pelo, manchas, comportamento..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] resize-none font-normal"
            />
          </div>

          {/* Photo upload mock */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 text-center text-slate-500 hover:border-teal-400 cursor-pointer transition-colors bg-slate-50">
            <Camera className="w-5 h-5 mx-auto text-[#008779] mb-1" />
            <p className="text-[11px] font-medium text-slate-700">Adicionar Foto do Pet</p>
            <p className="text-[9px] text-slate-400">JPG, PNG até 5MB</p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-medium text-xs shadow-md transition-colors"
          >
            Publicar Alerta no Mapa
          </button>
        </form>
      </div>
    </div>
  );
};
