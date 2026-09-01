import { Pet, CampaignLocation, LostFoundPet, Partner, AlertNotification } from '../types';

export const CURRENT_USER = {
  name: 'Juliana R. S. Lima',
  firstName: 'Juliana',
  email: 'juliana.lima@email.com',
  city: 'Araucária - PR',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const MY_PET: Pet = {
  id: 'pet-mel',
  name: 'Mel',
  gender: 'Fêmea',
  species: 'dog',
  breed: 'Border Collie',
  age: '3 anos e 2 meses',
  photo: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600&auto=format&fit=crop&q=80',
  tutorName: 'Juliana R. S. Lima',
  weight: '18,5 kg',
  lastVisit: '10/05/2025',
  dewormingDate: '20/04/2025',
  vaccinesStatus: 'Em dia',
  nextVaccine: 'Raiva - 12/09/2025',
  qrCodeData: 'ARAUPET-BR-PR-2025-MEL-BC772',
  description: 'Dócil, muito ativa e companheira. Microchipada pela Prefeitura de Araucária.',
  vaccinated: true,
  neutered: true,
  microchipped: true,
  tags: ['Microchipada', 'Castrada', 'Vacinada', 'Porte Médio']
};

export const ADOPTION_PETS: Pet[] = [
  {
    id: 'adopt-1',
    name: 'Amora',
    species: 'dog',
    breed: 'SRD (Caramelo)',
    age: '1 ano',
    gender: 'Fêmea',
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80',
    description: 'Amora é extremamente carinhosa, sociável com outros cães e adora crianças. Resgatada no bairro Costeira.',
    vaccinated: true,
    neutered: true,
    microchipped: true,
    isFavorite: false,
    weight: '14 kg',
    tags: ['Brincalhona', 'Sociável', 'Castrada', 'Vacinada']
  },
  {
    id: 'adopt-2',
    name: 'Toby',
    species: 'cat',
    breed: 'SRD (Tigrado Cinza)',
    age: '2 anos',
    gender: 'Macho',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80',
    description: 'Toby é calmo, adora um carinho no queixo e passa a tarde tomando sol. Adaptado a apartamento.',
    vaccinated: true,
    neutered: true,
    microchipped: true,
    isFavorite: true,
    weight: '4,2 kg',
    tags: ['Calmo', 'Dorminhoco', 'Castrado', 'FIV/FELV Negativo']
  },
  {
    id: 'adopt-3',
    name: 'Fred',
    species: 'dog',
    breed: 'SRD (Terrier Mix)',
    age: '8 meses',
    gender: 'Macho',
    photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80',
    description: 'Fred é cheio de energia, adora passear no Parque Cachoeira e aprender truques rápidos.',
    vaccinated: true,
    neutered: true,
    microchipped: true,
    isFavorite: false,
    weight: '9,8 kg',
    tags: ['Filhote', 'Energético', 'Castrado', 'Porte Médio']
  },
  {
    id: 'adopt-4',
    name: 'Luna',
    species: 'cat',
    breed: 'SRD (Tricolor)',
    age: '1 ano',
    gender: 'Fêmea',
    photo: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=80',
    description: 'Luna tem olhos verdes expressivos, é curiosa e muito dócil. Resgatada no centro de Araucária.',
    vaccinated: true,
    neutered: true,
    microchipped: true,
    isFavorite: false,
    weight: '3,6 kg',
    tags: ['Afetuosa', 'Castrada', 'Vacinada', 'Apartamento']
  },
  {
    id: 'adopt-5',
    name: 'Pipoca',
    species: 'dog',
    breed: 'Poodle Mix',
    age: '2 anos',
    gender: 'Fêmea',
    photo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=80',
    description: 'Pequena e companheira, ideal para lares tranquilos ou pessoas idosas.',
    vaccinated: true,
    neutered: true,
    microchipped: true,
    isFavorite: false,
    weight: '6 kg',
    tags: ['Porte Pequeno', 'Dócil', 'Castrada']
  },
  {
    id: 'adopt-6',
    name: 'Simba',
    species: 'cat',
    breed: 'SRD Amarelo',
    age: '6 meses',
    gender: 'Macho',
    photo: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=500&auto=format&fit=crop&q=80',
    description: 'Filhote brincalhão, ronrona sem parar e convive bem com outros gatos.',
    vaccinated: true,
    neutered: true,
    microchipped: true,
    isFavorite: false,
    weight: '2,8 kg',
    tags: ['Filhote', 'Brincalhão', 'Vacinado']
  }
];

export const CAMPAIGN_LOCATIONS: CampaignLocation[] = [
  {
    id: 'loc-1',
    dateStr: '24 MAI',
    dayOfWeek: 'Sábado • 8h às 14h',
    name: 'USF Iguaçu',
    address: 'Rua Iguaçu, 283 - Iguaçu',
    distance: '1,2 km',
    lat: -25.591,
    lng: -49.405,
    availableDoses: 240,
    status: 'disponivel'
  },
  {
    id: 'loc-2',
    dateStr: '31 MAI',
    dayOfWeek: 'Sábado • 8h às 14h',
    name: 'Parque Cachoeira',
    address: 'Av. das Araucárias, 4500',
    distance: '2,7 km',
    lat: -25.582,
    lng: -49.395,
    availableDoses: 450,
    status: 'disponivel'
  },
  {
    id: 'loc-3',
    dateStr: '07 JUN',
    dayOfWeek: 'Sábado • 8h às 14h',
    name: 'USF Tindiquera',
    address: 'R. Almirante Tamandaré, 500',
    distance: '3,5 km',
    lat: -25.602,
    lng: -49.418,
    availableDoses: 180,
    status: 'disponivel'
  },
  {
    id: 'loc-4',
    dateStr: '14 JUN',
    dayOfWeek: 'Sábado • 8h às 14h',
    name: 'USF Costeira',
    address: 'Rua Pedro de Alcântara Meira, 122',
    distance: '4,1 km',
    lat: -25.615,
    lng: -49.388,
    availableDoses: 300,
    status: 'disponivel'
  }
];

export const LOST_FOUND_PETS: LostFoundPet[] = [
  {
    id: 'lf-1',
    name: 'Thor',
    type: 'desaparecido',
    species: 'Cachorro',
    breed: 'SRD',
    gender: 'Macho',
    date: 'Desapareceu em 19/05',
    location: 'Rua das Flores, Iguaçu',
    distance: '1,4 km',
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80',
    description: 'Thor usa coleira azul, atende pelo nome e tem mancha branca no peito. Muito dócil.',
    contactPhone: '(41) 99876-5432',
    lat: -25.592,
    lng: -49.408
  },
  {
    id: 'lf-2',
    name: 'Mel',
    type: 'encontrado',
    species: 'Cachorra',
    breed: 'SRD',
    gender: 'Fêmea',
    date: 'Encontrada em 18/05',
    location: 'Rua Ceará, Centro',
    distance: '2,1 km',
    photo: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=400&auto=format&fit=crop&q=80',
    description: 'Encontrada acolhida temporariamente na Rua Ceará próximo à panificadora. Porte médio, dócil.',
    contactPhone: '(41) 98765-4321',
    lat: -25.588,
    lng: -49.401
  },
  {
    id: 'lf-3',
    name: 'Bidu',
    type: 'desaparecido',
    species: 'Cachorro',
    breed: 'Schnauzer Mix',
    gender: 'Macho',
    date: 'Desapareceu em 17/05',
    location: 'Bairro Fazenda Velha',
    distance: '3,2 km',
    photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=80',
    description: 'Idoso, pelagem cinza, precisa de medicação contínua para os olhos.',
    contactPhone: '(41) 99123-4567',
    lat: -25.578,
    lng: -49.390
  }
];

export const PARTNERS: Partner[] = [
  {
    id: 'partner-1',
    name: 'Vet Center Araucária',
    category: 'clinica',
    categoryLabel: 'Clínica Veterinária',
    distance: '1,1 km',
    discount: '10% OFF',
    discountTarget: 'consultas',
    logo: '🏥',
    address: 'Av. Victor do Amaral, 1420 - Centro',
    phone: '(41) 3642-1000',
    rating: 4.9,
    benefits: ['10% em consultas clínicas', '5% em cirurgias eletivas', 'Plantão 24h']
  },
  {
    id: 'partner-2',
    name: 'Pet Show',
    category: 'petshop',
    categoryLabel: 'Pet Shop',
    distance: '1,6 km',
    discount: '5% OFF',
    discountTarget: 'em ração',
    logo: '🐾',
    address: 'Rua Manoel Ribas, 412 - Fazenda Velha',
    phone: '(41) 3643-2200',
    rating: 4.8,
    benefits: ['5% OFF em todas as rações super premium', 'Entrega grátis acima de R$ 90']
  },
  {
    id: 'partner-3',
    name: 'Banho & Cia',
    category: 'banho',
    categoryLabel: 'Banho e Tosa',
    distance: '2,2 km',
    discount: '15% OFF',
    discountTarget: 'no banho',
    logo: '🛁',
    address: 'Rua São Vicente de Paulo, 890 - Iguaçu',
    phone: '(41) 3642-8877',
    rating: 4.9,
    benefits: ['15% OFF no pacote mensal', 'Hidratação de ozônio cortesia na primeira visita']
  },
  {
    id: 'partner-4',
    name: 'FarmaPet',
    category: 'farmacia',
    categoryLabel: 'Farmácia Veterinária',
    distance: '2,4 km',
    discount: '5% OFF',
    discountTarget: 'medicamentos',
    logo: '💊',
    address: 'Rua Agrimensor Carlos Hasselman, 230 - Fazenda Velha',
    phone: '(41) 3642-5544',
    rating: 4.7,
    benefits: ['5% OFF em antipulgas e vermífugos', 'Manipulação com sabores atrativos']
  }
];

export const ALERTS_DATA: AlertNotification[] = [
  {
    id: 'alert-1',
    title: 'Campanha Antirrábica',
    description: 'A campanha está acontecendo! Leve seu pet para vacinar.',
    category: 'vacinacao',
    timeAgo: '08:30',
    isRead: false,
    actionScreen: 'vaccines',
    iconType: 'paw'
  },
  {
    id: 'alert-2',
    title: 'Consulta concluída',
    description: 'Resumo de consulta com a Dra. Paola está disponível.',
    category: 'consultas',
    timeAgo: 'Ontem 14:22',
    isRead: false,
    actionScreen: 'telemed',
    iconType: 'stethoscope'
  },
  {
    id: 'alert-3',
    title: 'Lembrete de vacina',
    description: 'Não esqueça! Vacina da raiva da Mel vence em 12/09/2025.',
    category: 'vacinacao',
    timeAgo: '18/05',
    isRead: true,
    actionScreen: 'wallet',
    iconType: 'vaccine'
  },
  {
    id: 'alert-4',
    title: 'Novo parceiro',
    description: 'Pet Show está com 5% OFF em rações. Aproveite!',
    category: 'geral',
    timeAgo: '17/05',
    isRead: true,
    actionScreen: 'partners',
    iconType: 'shop'
  },
  {
    id: 'alert-5',
    title: 'Pet encontrado',
    description: 'Há um pet que pode ser o seu! Veja no mapa.',
    category: 'perdidos',
    timeAgo: '15/05',
    isRead: true,
    actionScreen: 'lostfound',
    iconType: 'location'
  }
];
