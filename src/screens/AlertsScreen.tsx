import React, { useState } from 'react';
import { 
  Check, 
  PawPrint, 
  Stethoscope, 
  Syringe, 
  Store, 
  MapPin, 
  ChevronRight,
  CheckCheck
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

  const categories = [
    { id: 'Todos', label: 'Todos' },
    { id: 'vacinacao', label: 'Vacinação' },
    { id: 'consultas', label: 'Consultas' },
    { id: 'geral', label: 'Geral' },
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
        return <PawPrint className="w-5 h-5 text-purple-600" />;
      case 'stethoscope':
        return <Stethoscope className="w-5 h-5 text-[#008779]" />;
      case 'vaccine':
        return <Syringe className="w-5 h-5 text-emerald-600" />;
      case 'shop':
        return <Store className="w-5 h-5 text-indigo-600" />;
      case 'location':
        return <MapPin className="w-5 h-5 text-sky-600" />;
      default:
        return <PawPrint className="w-5 h-5 text-[#008779]" />;
    }
  };

  const getAlertBg = (type: AlertNotification['iconType']) => {
    switch (type) {
      case 'paw':
        return 'bg-purple-50';
      case 'stethoscope':
        return 'bg-teal-50';
      case 'vaccine':
        return 'bg-emerald-50';
      case 'shop':
        return 'bg-indigo-50';
      case 'location':
        return 'bg-sky-50';
      default:
        return 'bg-teal-50';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-y-auto custom-scrollbar">
      {/* Top Bar */}
      <TopBar
        title="Alertas"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
        rightAction={
          <button
            onClick={handleMarkAllRead}
            className="text-[10px] font-bold text-[#008779] hover:text-[#006e63] whitespace-nowrap -mr-1"
          >
            Marcar todas como lidas
          </button>
        }
      />

      {/* Main Content */}
      <div className="p-4 space-y-3.5">
        {/* Filter Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#008779] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => handleClickAlert(alert)}
              className={`p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer group active:scale-[0.99] ${
                alert.isRead
                  ? 'bg-white border-slate-100/90'
                  : 'bg-white border-teal-200 shadow-xs ring-1 ring-teal-100'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-2xl ${getAlertBg(
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
                        ? 'font-bold text-slate-800'
                        : 'font-black text-slate-900'
                    }`}
                  >
                    {alert.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">
                    {alert.timeAgo}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {alert.description}
                </p>
              </div>

              {!alert.isRead && (
                <span className="w-2 h-2 rounded-full bg-[#008779] shrink-0 mt-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
