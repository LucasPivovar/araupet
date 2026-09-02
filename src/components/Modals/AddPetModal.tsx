import React, { useState } from 'react';
import { Camera, Check, PawPrint, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet } from '../../types';

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePet: (pet: Pet) => void;
  tutorName?: string;
}

export const AddPetModal: React.FC<AddPetModalProps> = ({
  isOpen,
  onClose,
  onSavePet,
  tutorName = 'Juliana Lima',
}) => {
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState<'Macho' | 'Fêmea'>('Macho');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [hasMicrochip, setHasMicrochip] = useState(true);
  const [photo, setPhoto] = useState(
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80'
  );

  if (!isOpen) return null;

  const dogAvatars = [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&auto=format&fit=crop&q=80',
  ];

  const catAvatars = [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name: name.trim(),
      species,
      breed: breed.trim() || (species === 'dog' ? 'SRD (Vira-lata)' : 'Siamês'),
      gender,
      age: age.trim() || '2 anos',
      weight: weight.trim() || '12 kg',
      photo,
      tutorName,
      microchipped: hasMicrochip,
      neutered: true,
      vaccinated: true,
      vaccinesStatus: 'Em dia',
      nextVaccine: 'Raiva (Out/2026)',
    };

    onSavePet(newPet);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    onClose();
    // Reset form
    setName('');
    setBreed('');
    setAge('');
    setWeight('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008779] to-[#006e63] p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <PawPrint className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Cadastrar Pet</h3>
              <p className="text-xs text-teal-100 font-normal">Carteira Digital ArauPet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 overflow-y-auto custom-scrollbar flex-1">
          {/* Species Selector */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Tipo do Pet *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSpecies('dog');
                  setPhoto(dogAvatars[0]);
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  species === 'dog'
                    ? 'border-[#008779] bg-teal-50/80 text-[#008779] shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>🐶</span>
                <span>Cachorro</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSpecies('cat');
                  setPhoto(catAvatars[0]);
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  species === 'cat'
                    ? 'border-[#008779] bg-teal-50/80 text-[#008779] shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>🐱</span>
                <span>Gato</span>
              </button>
            </div>
          </div>

          {/* Photo Picker */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Foto do Pet
            </label>
            <div className="flex items-center gap-2">
              <img
                src={photo}
                alt="Preview"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#008779]/30 shrink-0"
              />
              <div className="flex gap-1.5 overflow-x-auto py-1">
                {(species === 'dog' ? dogAvatars : catAvatars).map((avatarUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPhoto(avatarUrl)}
                    className={`relative rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      photo === avatarUrl ? 'border-[#008779] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={avatarUrl} alt="" className="w-9 h-9 object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Nome do Pet *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Thor, Mel, Bob..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/15 font-normal"
            />
          </div>

          {/* Breed & Gender */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 block">
                Raça
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder={species === 'dog' ? 'Ex: Golden / SRD' : 'Ex: Siamês / SRD'}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] font-normal"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 block">
                Sexo
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'Macho' | 'Fêmea')}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] font-normal"
              >
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>
          </div>

          {/* Age & Weight */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 block">
                Idade aproximada
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 2 anos"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] font-normal"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 block">
                Peso (kg)
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 14 kg"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] font-normal"
              />
            </div>
          </div>

          {/* Microchip Toggle */}
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="text-xs font-medium text-slate-700 block">Possui Microchip?</span>
              <span className="text-[10px] text-slate-400 font-normal">Identificação eletrônica Araucária</span>
            </div>
            <input
              type="checkbox"
              checked={hasMicrochip}
              onChange={(e) => setHasMicrochip(e.target.checked)}
              className="w-4 h-4 rounded text-[#008779] focus:ring-[#008779] accent-[#008779]"
            />
          </label>

          {/* Submit Button */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2.5 bg-[#008779] hover:bg-[#006e63] disabled:opacity-50 text-white rounded-xl font-medium text-xs shadow-md shadow-[#008779]/20 transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Pet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
