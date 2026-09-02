import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  MapPin, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Plus, 
  Edit3,
  PawPrint,
  X,
  Camera
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { Pet, ScreenId } from '../types';

interface ProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
  pets: Pet[];
  onAddPet: (pet: Pet) => void;
  currentUser?: typeof CURRENT_USER;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack,
  onNavigate,
  pets,
  onAddPet,
  currentUser = CURRENT_USER,
}) => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'config'>('perfil');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [lostPetRadar, setLostPetRadar] = useState(true);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petSpecies, setPetSpecies] = useState<'dog' | 'cat'>('dog');
  const [petPhoto, setPetPhoto] = useState('');

  const defaultPetPhoto = petSpecies === 'dog'
    ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&auto=format&fit=crop&q=80';

  const handlePetPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPetPhoto(URL.createObjectURL(file));
  };

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
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
      description: 'Pet recém-cadastrado no perfil.',
      vaccinated: false,
      neutered: false,
      microchipped: false,
      tags: ['Novo cadastro'],
    };

    onAddPet(newPet);
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
        title={activeTab === 'perfil' ? 'Meu Perfil' : 'Configurações'}
        onBack={onBack}
        showBack={true}
        darkIcons={true}
        rightAction={
          <button 
            onClick={() => setActiveTab(activeTab === 'perfil' ? 'config' : 'perfil')}
            className={`p-1.5 rounded-full transition-colors ${
              activeTab === 'config' ? 'bg-[#008779] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Alternar Configurações"
          >
            <Settings className="w-5 h-5" />
          </button>
        }
      />

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Toggle Switch between Perfil and Configurações */}
        <div className="flex p-1 bg-slate-200/70 rounded-xl">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'perfil'
                ? 'bg-[#008779] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Meu Perfil
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'config'
                ? 'bg-[#008779] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Configurações</span>
          </button>
        </div>

        {activeTab === 'perfil' ? (
          /* Profile Tab Content */
          <>
            {/* User Profile Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#008779]/30"
                />
                <button
                  onClick={() => alert('Alterar foto de perfil')}
                  className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#008779] text-white flex items-center justify-center shadow-xs"
                >
                  <Edit3 className="w-2.5 h-2.5" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-slate-800 truncate">
                    {currentUser.name}
                  </h3>
                  <span className="text-[10px] font-medium bg-teal-100 text-[#008779] px-1.5 py-0.5 rounded">
                    Cidadão(ã) Araucária
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-normal truncate">{currentUser.email}</p>
                <p className="text-[11px] text-slate-500 font-normal flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#008779]" />
                  <span>{currentUser.city}</span>
                </p>
              </div>
            </div>

            {/* Meus Pets Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-slate-700">Meus Pets Cadastrados</h4>
                <button
                  onClick={() => setIsAddPetOpen(true)}
                  className="text-[11px] font-medium text-[#008779] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Pet
                </button>
              </div>

              <div className="space-y-2">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    onClick={() => onNavigate('wallet')}
                    className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-teal-200 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pet.photo}
                        alt={pet.name}
                        className="w-11 h-11 rounded-xl object-cover"
                      />
                      <div>
                        <h5 className="text-xs font-medium text-slate-800">{pet.name}</h5>
                        <p className="text-[11px] text-slate-400 font-normal">
                          {pet.breed} • <span className={`font-medium ${pet.vaccinesStatus === 'Em dia' ? 'text-emerald-600' : 'text-amber-600'}`}>{pet.vaccinesStatus}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#008779] bg-teal-50 px-2.5 py-1 rounded-lg">
                      Ver Carteira
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
              <button
                onClick={() => onNavigate('vaccines')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
              >
                <div className="flex items-center gap-3 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#008779]" />
                  <span className="text-xs font-normal">Agendamentos de Vacinas & Castração</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
              >
                <div className="flex items-center gap-3 text-slate-700">
                  <Settings className="w-4 h-4 text-[#008779]" />
                  <span className="text-xs font-normal">Configurações & Notificações</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('support')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
              >
                <div className="flex items-center gap-3 text-slate-700">
                  <HelpCircle className="w-4 h-4 text-[#008779]" />
                  <span className="text-xs font-normal">Suporte por Chat</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </>
        ) : (
          /* Configurações Tab Content */
          <div className="space-y-4">
            {/* Notificações Settings Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
              <h4 className="text-xs font-medium text-slate-800 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#008779]" />
                Notificações e Lembretes
              </h4>

              {/* Push Notifications */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-xs font-medium text-slate-700">Lembretes de Vacinação</p>
                  <p className="text-[10px] text-slate-400 font-normal">Avisos antes do vencimento das doses</p>
                </div>
                <button
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                    pushEnabled ? 'bg-[#008779]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      pushEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* WhatsApp Alerts */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <p className="text-xs font-medium text-slate-700">Alertas por WhatsApp</p>
                  <p className="text-[10px] text-slate-400 font-normal">Campanhas municipais no seu bairro</p>
                </div>
                <button
                  onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                  className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                    whatsappAlerts ? 'bg-[#008779]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      whatsappAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Lost Pet Radar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <p className="text-xs font-medium text-slate-700">Radar de Animais Desaparecidos</p>
                  <p className="text-[10px] text-slate-400 font-normal">Notificar se houver pet desaparecido em 3km</p>
                </div>
                <button
                  onClick={() => setLostPetRadar(!lostPetRadar)}
                  className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                    lostPetRadar ? 'bg-[#008779]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      lostPetRadar ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Informações Oficiais & CCZ */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2 text-xs">
              <h4 className="font-medium text-slate-800">Prefeitura de Araucária</h4>
              <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                Secretaria Municipal de Meio Ambiente • Divisão de Bem-Estar Animal
              </p>
              <p className="text-[11px] text-slate-500 font-normal">
                📍 Rua Ceará, 245 - Costeira | 📞 (41) 3642-0000
              </p>
              <p className="text-[10px] text-slate-400 font-normal pt-1">Versão 2.4.0 (Build Oficial 2026)</p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={() => onNavigate('login')}
          className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Sair da Conta</span>
        </button>
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
    </div>
  );
};
