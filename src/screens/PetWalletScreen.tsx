import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Plus,
  PawPrint,
  Camera,
  X,
} from 'lucide-react';
import { Pet } from '../types';
import { CURRENT_USER, MY_PET } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { FullHistoryModal } from '../components/Modals/FullHistoryModal';

interface PetWalletScreenProps {
  onBack: () => void;
  pets?: Pet[];
  onAddPet?: (pet: Pet) => void;
}

export const PetWalletScreen: React.FC<PetWalletScreenProps> = ({
  onBack,
  pets = [MY_PET],
  onAddPet,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petSpecies, setPetSpecies] = useState<'dog' | 'cat'>('dog');
  const [petPhoto, setPetPhoto] = useState('');
  const pet = pets.find((item) => item.id === selectedPetId) || pets[0] || MY_PET;
  const isSelectingPet = selectedPetId === null;

  const defaultPetPhoto = petSpecies === 'dog'
    ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&auto=format&fit=crop&q=80';

  const handleBack = () => {
    if (selectedPetId) {
      setSelectedPetId(null);
      return;
    }

    onBack();
  };

  const handlePetPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPetPhoto(URL.createObjectURL(file));
  };

  const handleAddPet = (event: React.FormEvent) => {
    event.preventDefault();

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name: petName.trim(),
      species: petSpecies,
      breed: petBreed.trim() || 'SRD',
      age: 'Cadastro novo',
      gender: 'Macho',
      photo: petPhoto || defaultPetPhoto,
      tutorName: CURRENT_USER.name,
      vaccinesStatus: 'Pendente',
      nextVaccine: 'Avaliar na primeira visita',
      description: 'Pet recém-cadastrado na carteira.',
      vaccinated: false,
      neutered: false,
      microchipped: false,
      tags: ['Novo cadastro'],
    };

    onAddPet?.(newPet);
    setSelectedPetId(newPet.id);
    setPetName('');
    setPetBreed('');
    setPetSpecies('dog');
    setPetPhoto('');
    setIsAddPetOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <TopBar
        title={isSelectingPet ? 'Meus Pets' : 'Carteira Pet Digital'}
        onBack={handleBack}
        showBack={true}
        darkIcons={true}
      />

      {/* Main Container */}
      <div className="p-4 space-y-3.5">
        {isSelectingPet ? (
          <>
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-slate-800">Escolha o pet</h2>
              <p className="text-xs text-slate-500 font-normal">
                Acesse a carteira digital de um pet ou cadastre um novo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {pets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedPetId(item.id)}
                  className="min-h-[196px] overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-xs transition-all hover:border-teal-200 active:scale-[0.99]"
                >
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="h-32 w-full object-cover"
                  />
                  <div className="space-y-1 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold text-slate-800">{item.name}</h3>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#008779]" />
                    </div>
                    <p className="truncate text-[11px] font-normal text-slate-500">
                      {item.species === 'dog' ? 'Cachorro' : 'Gato'} • {item.breed}
                    </p>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      item.vaccinesStatus === 'Em dia'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.vaccinesStatus}
                    </span>
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setIsAddPetOpen(true)}
                className="min-h-[196px] rounded-2xl border border-dashed border-teal-300 bg-teal-50/60 p-3 text-center shadow-xs transition-all hover:bg-teal-50 active:scale-[0.99] flex flex-col items-center justify-center gap-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#008779] shadow-xs">
                  <Plus className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#008779]">Novo pet</h3>
                  <p className="mt-0.5 text-[11px] font-normal text-slate-500">
                    Cadastrar na carteira
                  </p>
                </div>
              </button>
            </div>

            <div className="rounded-2xl border border-teal-100 bg-white p-3.5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#008779]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-slate-800">Carteira Pet Digital</h4>
                  <p className="text-[10px] font-normal leading-tight text-slate-400">
                    QR Code, situação vacinal e histórico de saúde por pet.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {isAddPetOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-[#008779] to-[#006e63] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <PawPrint className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Adicionar Pet</h3>
                  <p className="text-xs text-teal-100">Cadastro rápido</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddPetOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPet} className="p-5 space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1.5">Foto do pet</label>
                <label className="group relative flex min-h-[112px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-teal-300 bg-teal-50/50 transition-all hover:bg-teal-50 active:scale-[0.99]">
                  {petPhoto ? (
                    <>
                      <img
                        src={petPhoto}
                        alt="Prévia da foto do pet"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative z-10 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-medium text-[#008779] shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                        Trocar foto
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#008779] shadow-xs">
                        <Camera className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#008779]">Adicionar foto do pet</p>
                        <p className="text-[10px] font-normal text-slate-400">
                          Toque para abrir a câmera ou escolher imagem
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePetPhotoChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Nome do pet</label>
                <input
                  type="text"
                  required
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Ex: Mel, Thor, Luna..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Espécie</label>
                  <select
                    value={petSpecies}
                    onChange={(e) => setPetSpecies(e.target.value as 'dog' | 'cat')}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779] bg-white"
                  >
                    <option value="dog">Cachorro</option>
                    <option value="cat">Gato</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Raça</label>
                  <input
                    type="text"
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    placeholder="SRD"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#008779] hover:bg-[#006e63] text-white rounded-xl font-medium text-xs shadow-md transition-colors"
              >
                Salvar pet
              </button>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      <FullHistoryModal
        pet={pet}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </div>
  );
};
