import React, { useState } from 'react';
import { Check, PawPrint, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet } from '../../types';

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePet: (pet: Pet) => void;
  tutorName?: string;
}

const petAvatars: Record<string, string[]> = {
  Cachorro: [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&auto=format&fit=crop&q=80',
  ],
  Gato: [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=80',
  ],
  'Pássaro / Ave': [
    'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&auto=format&fit=crop&q=80',
  ],
  Coelho: [
    'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&auto=format&fit=crop&q=80',
  ],
  'Hamster / Roedor': [
    'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500&auto=format&fit=crop&q=80',
  ],
  'Outro': [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80',
  ],
};

export const AddPetModal: React.FC<AddPetModalProps> = ({
  isOpen,
  onClose,
  onSavePet,
  tutorName = 'Juliana Lima',
}) => {
  const [petType, setPetType] = useState('Cachorro');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState<'Macho' | 'Fêmea'>('Macho');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState(petAvatars.Cachorro[0]);

  if (!isOpen) return null;

  const handlePetTypeChange = (selected: string) => {
    setPetType(selected);
    const available = petAvatars[selected] || petAvatars.Outro;
    if (available && available.length > 0) {
      setPhoto(available[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let species: 'dog' | 'cat' | 'other' = 'other';
    if (petType === 'Cachorro') species = 'dog';
    else if (petType === 'Gato') species = 'cat';

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name: name.trim(),
      species,
      breed: breed.trim() || (petType === 'Cachorro' ? 'SRD (Vira-lata)' : petType === 'Gato' ? 'Siamês' : petType),
      gender,
      age: age.trim() || '2 anos',
      weight: weight.trim() || '10 kg',
      photo,
      tutorName,
      microchipped: true,
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

  const currentAvatars = petAvatars[petType] || petAvatars.Outro;

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
                {currentAvatars.map((avatarUrl, idx) => (
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

          {/* Select de Opções de Pets + Raça */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 block">
                Tipo do Pet *
              </label>
              <select
                value={petType}
                onChange={(e) => handlePetTypeChange(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] font-normal"
              >
                <option value="Cachorro">🐶 Cachorro</option>
                <option value="Gato">🐱 Gato</option>
                <option value="Pássaro / Ave">🦜 Pássaro / Ave</option>
                <option value="Coelho">🐰 Coelho</option>
                <option value="Hamster / Roedor">🐹 Hamster / Roedor</option>
                <option value="Réptil">🐢 Réptil</option>
                <option value="Cavalo / Equino">🐴 Cavalo / Equino</option>
                <option value="Outro">🐾 Outro Pet</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 block">
                Raça
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder={petType === 'Cachorro' ? 'Ex: Golden / SRD' : petType === 'Gato' ? 'Ex: Siamês / SRD' : 'Ex: Raça ou espécie'}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] font-normal"
              />
            </div>
          </div>

          {/* Gender & Age */}
          <div className="grid grid-cols-2 gap-2">
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
          </div>

          {/* Weight */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 block">
              Peso aproximado (kg)
            </label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ex: 12 kg"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#008779] font-normal"
            />
          </div>

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
