import React, { useState } from 'react';
import { 
  Check, 
  PawPrint, 
  Stethoscope, 
  Syringe, 
  Store, 
  MapPin, 
  ChevronRight,
  CheckCheck,
  Bell
} from 'lucide-react';
import { AlertNotification, ScreenId } from '../types';
import { ALERTS_DATA } from '../data/mockData';
import { TopBar } from '../components/TopBar';

interface AlertsScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  onBack,
  onNavigate,
}) => {
  const [alerts, setAlerts] = useState<AlertNotification[]>(ALERTS_DATA);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const categories = [
    { id: 'Todos', label: 'Todos', count: alerts.length },
    { id: 'vacinacao', label: 'Vacinação', count: alerts.filter((a) => a.category === 'vacinacao').length },
    { id: 'consultas', label: 'Consultas', count: alerts.filter((a) => a.category === 'consultas').length },
    { id: 'perdidos', label: 'Desaparecidos', count: alerts.filter((a) => a.category === 'perdidos').length },
    { id: 'geral', label: 'Geral', count: alerts.filter((a) => a.category === 'geral').length },
  ];

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const handleClickAlert = (alert: AlertNotification) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alert.id ? { ...a, isRead: true } : a))
    );
    if (alert.actionScreen) {
      onNavigate(alert.actionScreen);
    }
  };

  const filteredAlerts = alerts.filter((a) => {
    if (activeCategory === 'Todos') return true;
    return a.category === activeCategory;
  });

  const getAlertIcon = (type: AlertNotification['iconType']) => {
    switch (type) {
      case 'paw':
        return <PawPrint className="w-4 h-4 text-purple-600" />;
      case 'stethoscope':
        return <Stethoscope className="w-4 h-4 text-[#008779]" />;
      case 'vaccine':
        return <Syringe className="w-4 h-4 text-emerald-600" />;
      case 'shop':
        return <Store className="w-4 h-4 text-indigo-600" />;
      case 'location':
        return <MapPin className="w-4 h-4 text-rose-500" />;
      default:
        return <PawPrint className="w-4 h-4 text-[#008779]" />;
    }
  };

  const getAlertBg = (type: AlertNotification['iconType']) => {
    switch (type) {
      case 'paw':
        return 'bg-purple-50 border border-purple-100';
      case 'stethoscope':
        return 'bg-teal-50 border border-teal-100';
      case 'vaccine':
        return 'bg-emerald-50 border border-emerald-100';
      case 'shop':
        return 'bg-indigo-50 border border-indigo-100';
      case 'location':
        return 'bg-rose-50 border border-rose-100';
      default:
        return 'bg-teal-50 border border-teal-100';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <TopBar
        title="Alertas & Avisos"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] font-medium text-[#008779] hover:text-[#006e63] whitespace-nowrap -mr-1"
            >
              Marcar lidas
            </button>
          ) : undefined
        }
      />

      {/* Main Content */}
      <div className="p-4 space-y-3.5">
        {/* Status Counter Banner */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-100/90 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#008779] flex items-center justify-center shrink-0">
              <Bell className="w-4.5 h-4.5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-800">
                  {unreadCount > 0 ? `${unreadCount} não ${unreadCount === 1 ? 'lido' : 'lidos'}` : 'Tudo lido'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                  {alerts.length} alertas no total
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                Notificações oficiais e lembretes de saúde do ArauPet
              </p>
            </div>
          </div>
        </div>

        {/* Filter Categories with dynamic count */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#008779] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/70 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                activeCategory === cat.id ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs font-normal">
              Nenhum alerta encontrado nesta categoria.
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => handleClickAlert(alert)}
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer group active:scale-[0.99] ${
                  alert.isRead
                    ? 'bg-white border-slate-100/90 shadow-xs'
                    : 'bg-white border-teal-200/90 shadow-xs ring-1 ring-teal-100/80'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-xl ${getAlertBg(
                    alert.iconType
                  )} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                >
                  {getAlertIcon(alert.iconType)}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs ${
                        alert.isRead
                          ? 'font-medium text-slate-700'
                          : 'font-semibold text-slate-900'
                      }`}
                    >
                      {alert.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-normal whitespace-nowrap ml-2">
                      {alert.timeAgo}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    {alert.description}
                  </p>
                </div>

                {!alert.isRead && (
                  <span className="w-2 h-2 rounded-full bg-[#008779] shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
