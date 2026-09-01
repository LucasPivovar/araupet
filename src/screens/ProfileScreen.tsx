import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  ShieldCheck, 
  MapPin, 
  Heart, 
  Bell, 
  HelpCircle, 
  FileText, 
  LogOut, 
  ChevronRight, 
  Plus, 
  Lock, 
  Moon, 
  Smartphone, 
  Check, 
  Phone,
  Edit3,
  Sliders
} from 'lucide-react';
import { CURRENT_USER, MY_PET } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { ScreenId } from '../types';

interface ProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'config'>('perfil');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [lostPetRadar, setLostPetRadar] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

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
        <div className="flex p-1 bg-slate-200/80 rounded-xl">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'perfil'
                ? 'bg-[#008779] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Meu Perfil
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
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
                  src={CURRENT_USER.avatar}
                  alt={CURRENT_USER.name}
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
                  <h3 className="text-sm font-black text-slate-800 truncate">
                    {CURRENT_USER.name}
                  </h3>
                  <span className="text-[10px] font-bold bg-teal-100 text-[#008779] px-1.5 py-0.5 rounded">
                    Cidadã Araucária
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">{CURRENT_USER.email}</p>
                <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#008779]" />
                  <span>{CURRENT_USER.city}</span>
                </p>
              </div>
            </div>

            {/* Meus Pets Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700">Meus Pets Cadastrados</h4>
                <button
                  onClick={() => onNavigate('wallet')}
                  className="text-[11px] font-bold text-[#008779] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Pet
                </button>
              </div>

              <div
                onClick={() => onNavigate('wallet')}
                className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-teal-200 transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={MY_PET.photo}
                    alt={MY_PET.name}
                    className="w-11 h-11 rounded-xl object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{MY_PET.name}</h5>
                    <p className="text-[11px] text-slate-400">
                      {MY_PET.breed} • <span className="text-emerald-600 font-bold">{MY_PET.vaccinesStatus}</span>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-lg">
                  Ver Carteira
                </span>
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
                  <span className="text-xs font-semibold">Agendamentos de Vacinas & Castração</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
              >
                <div className="flex items-center gap-3 text-slate-700">
                  <Settings className="w-4 h-4 text-[#008779]" />
                  <span className="text-xs font-semibold">Configurações & Notificações</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => alert('Fale com a Coordenação de Bem-Estar Animal de Araucária pelo WhatsApp (41) 3642-0000')}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
              >
                <div className="flex items-center gap-3 text-slate-700">
                  <HelpCircle className="w-4 h-4 text-[#008779]" />
                  <span className="text-xs font-semibold">Central de Atendimento CCZ Araucária</span>
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
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#008779]" />
                Notificações e Lembretes
              </h4>

              {/* Push Notifications */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-xs font-semibold text-slate-700">Lembretes de Vacinação</p>
                  <p className="text-[10px] text-slate-400">Avisos antes do vencimento das doses</p>
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
                  <p className="text-xs font-semibold text-slate-700">Alertas por WhatsApp</p>
                  <p className="text-[10px] text-slate-400">Campanhas municipais no seu bairro</p>
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
                  <p className="text-xs font-semibold text-slate-700">Radar de Animais Perdidos</p>
                  <p className="text-[10px] text-slate-400">Notificar se houver pet perdido em 3km</p>
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

            {/* Segurança & Acesso */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#008779]" />
                Segurança e Acesso
              </h4>

              {/* Biometrics */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-xs font-semibold text-slate-700">Acesso por Biometria / Face ID</p>
                  <p className="text-[10px] text-slate-400">Entrar com segurança sem digitar senha</p>
                </div>
                <button
                  onClick={() => setBiometrics(!biometrics)}
                  className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                    biometrics ? 'bg-[#008779]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      biometrics ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Change Password */}
              <button
                onClick={() => alert('Link para alteração de senha enviado ao seu e-mail!')}
                className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-left"
              >
                <span className="text-xs font-semibold text-slate-700">Alterar Senha</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Gov.br Integration */}
              <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Conta Gov.br</span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded-md text-[10px]">
                  Vinculada
                </span>
              </div>
            </div>

            {/* Informações Oficiais & CCZ */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">Prefeitura de Araucária</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Secretaria Municipal de Meio Ambiente • Divisão de Bem-Estar Animal
              </p>
              <p className="text-[11px] text-slate-500">
                📍 Rua Ceará, 245 - Costeira | 📞 (41) 3642-0000
              </p>
              <p className="text-[10px] text-slate-400 pt-1">Versão 2.4.0 (Build Oficial 2026)</p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={() => onNavigate('login')}
          className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </div>
  );
};
