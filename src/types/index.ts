export type ScreenId = 
  | 'login'
  | 'register'
  | 'home' 
  | 'wallet' 
  | 'telemed' 
  | 'vaccines' 
  | 'adoption' 
  | 'lostfound' 
  | 'partners' 
  | 'alerts'
  | 'profile'
  | 'settings';

export type NavTabId = 'inicio' | 'servicos' | 'carteira' | 'alertas' | 'perfil';

export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed: string;
  age: string;
  gender: 'Macho' | 'Fêmea';
  photo: string;
  tutorName?: string;
  weight?: string;
  lastVisit?: string;
  dewormingDate?: string;
  vaccinesStatus?: 'Em dia' | 'Pendente' | 'Atrasada';
  nextVaccine?: string;
  qrCodeData?: string;
  description?: string;
  vaccinated?: boolean;
  neutered?: boolean;
  microchipped?: boolean;
  isFavorite?: boolean;
  tags?: string[];
}

export interface CampaignLocation {
  id: string;
  dateStr: string; // e.g. "24 MAI"
  dayOfWeek: string; // "Sábado • 8h às 14h"
  name: string; // "USF Iguaçu"
  address: string; // "Rua Iguaçu, 283 - Iguaçu"
  distance: string; // "1,2 km"
  lat: number;
  lng: number;
  availableDoses: number;
  status: 'disponivel' | 'poucas_vagas' | 'lotado';
}

export interface LostFoundPet {
  id: string;
  name: string;
  type: 'desaparecido' | 'encontrado';
  species: string;
  breed: string;
  gender: 'Macho' | 'Fêmea';
  date: string;
  location: string;
  distance: string;
  photo: string;
  description: string;
  contactPhone: string;
  lat: number;
  lng: number;
}

export interface Partner {
  id: string;
  name: string;
  category: 'clinica' | 'petshop' | 'banho' | 'farmacia';
  categoryLabel: string;
  distance: string;
  discount: string;
  discountTarget: string;
  logo: string;
  address: string;
  phone: string;
  rating: number;
  benefits: string[];
}

export interface AlertNotification {
  id: string;
  title: string;
  description: string;
  category: 'vacinacao' | 'consultas' | 'geral' | 'parceiros' | 'perdidos';
  timeAgo: string;
  isRead: boolean;
  actionScreen?: ScreenId;
  iconType: 'paw' | 'stethoscope' | 'vaccine' | 'shop' | 'location';
}
