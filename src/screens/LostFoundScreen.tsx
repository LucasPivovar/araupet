import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  MapPin, 
  Filter, 
  Phone, 
  Calendar, 
  Navigation,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  LocateFixed,
  Share2,
  X
} from 'lucide-react';
import L from 'leaflet';
import { LostFoundPet } from '../types';
import { LOST_FOUND_PETS } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { NewReportModal } from '../components/Modals/NewReportModal';

interface LostFoundScreenProps {
  onBack: () => void;
}

export const LostFoundScreen: React.FC<LostFoundScreenProps> = ({ onBack }) => {
  const [viewMode, setViewMode] = useState<'mapa' | 'lista'>('mapa');
  const [pets, setPets] = useState<LostFoundPet[]>(LOST_FOUND_PETS);
  const [filterType, setFilterType] = useState<'todos' | 'desaparecido' | 'encontrado'>('todos');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<LostFoundPet | null>(LOST_FOUND_PETS[0]);
  const [mapLayer, setMapLayer] = useState<'standard' | 'satellite'>('standard');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const ARAUCARIA_COORDS: [number, number] = [-25.5925, -49.4080];

  const handleAddPet = (newPet: LostFoundPet) => {
    setPets([newPet, ...pets]);
    setSelectedPet(newPet);
  };

  const filteredPets = pets.filter((p) => {
    if (filterType === 'todos') return true;
    return p.type === filterType;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (viewMode !== 'mapa' || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: ARAUCARIA_COORDS,
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Add clean CartoDB Voyager tiles (Google Maps-like aesthetic)
      const tileUrl = mapLayer === 'satellite'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      const tiles = L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      tileLayerRef.current = tiles;

      // Add a slight delay to invalidate map size when container is displayed
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }

    return () => {
      // Map cleanup on unmount if viewMode changes
    };
  }, [viewMode]);

  // Update map tile layer when mapLayer changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const tileUrl = mapLayer === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const tiles = L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = tiles;
  }, [mapLayer]);

  // Update markers when filteredPets or selectedPet changes
  useEffect(() => {
    if (!mapInstanceRef.current || viewMode !== 'mapa') return;

    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    // Add pet markers
    filteredPets.forEach((pet) => {
      const isSelected = selectedPet?.id === pet.id;
      const isDesaparecido = pet.type === 'desaparecido';
      const color = isDesaparecido ? '#f43f5e' : '#10b981';

      const customHtml = `
        <div style="position: relative; cursor: pointer; transform: translate(-50%, -100%);">
          <div style="
            width: ${isSelected ? '48px' : '40px'};
            height: ${isSelected ? '48px' : '40px'};
            border-radius: 50%;
            border: ${isSelected ? '3px solid #008779' : `2.5px solid ${color}`};
            box-shadow: ${isSelected ? '0 0 0 4px rgba(0,135,121,0.3), 0 8px 16px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.2)'};
            background: white;
            overflow: hidden;
            transition: all 0.2s ease;
            position: relative;
          ">
            <img src="${pet.photo}" alt="${pet.name}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div style="
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 7px solid ${isSelected ? '#008779' : color};
          "></div>
          <div style="
            position: absolute;
            top: -4px;
            right: -4px;
            padding: 1px 4px;
            border-radius: 9999px;
            background: ${color};
            color: white;
            font-size: 8px;
            font-weight: 600;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          ">
            ${isDesaparecido ? 'Desaparecido' : 'Encontrado'}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'pet-pin-icon',
        html: customHtml,
        iconSize: [40, 48],
        iconAnchor: [20, 48],
      });

      const marker = L.marker([pet.lat, pet.lng], { icon }).addTo(map);

      marker.on('click', () => {
        setSelectedPet(pet);
        map.flyTo([pet.lat, pet.lng], 15, { duration: 0.8 });
      });

      markersRef.current.push(marker);
    });
  }, [filteredPets, selectedPet, viewMode]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    if (selectedPet && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([selectedPet.lat, selectedPet.lng], 15, { duration: 0.8 });
    } else if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(ARAUCARIA_COORDS, 14, { duration: 0.8 });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-hidden relative select-none">
      {/* Top Bar */}
      <TopBar
        title="Desaparecidos"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
        rightAction={
          <button 
            onClick={() => setIsReportOpen(true)}
            className="w-8 h-8 rounded-full bg-[#008779] text-white flex items-center justify-center transition-all hover:bg-[#006e63] shadow-xs"
            title="Cadastrar Alerta"
          >
            <Plus className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>
        }
      />

      {/* Mode & Category Bar */}
      <div className="px-4 py-2 bg-white border-b border-slate-100/90 shrink-0 space-y-2">
        <div className="flex items-center justify-between gap-2">
          {/* Toggle View Mode */}
          <div className="flex p-0.5 bg-slate-100 rounded-xl w-36">
            <button
              onClick={() => setViewMode('mapa')}
              className={`flex-1 py-1 text-xs font-medium rounded-lg transition-all ${
                viewMode === 'mapa'
                  ? 'bg-[#008779] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mapa
            </button>
            <button
              onClick={() => setViewMode('lista')}
              className={`flex-1 py-1 text-xs font-medium rounded-lg transition-all ${
                viewMode === 'lista'
                  ? 'bg-[#008779] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lista
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterType('todos')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                filterType === 'todos'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos ({pets.length})
            </button>
            <button
              onClick={() => setFilterType('desaparecido')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                filterType === 'desaparecido'
                  ? 'bg-rose-500 text-white'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Desaparecidos ({pets.filter((p) => p.type === 'desaparecido').length})
            </button>
            <button
              onClick={() => setFilterType('encontrado')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                filterType === 'encontrado'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Encontrados ({pets.filter((p) => p.type === 'encontrado').length})
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'mapa' ? (
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Leaflet Real Interactive Map */}
          <div className="relative flex-1 w-full h-full bg-slate-200">
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Map Floating Controls */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 shadow-md">
              <button
                onClick={() => setMapLayer(mapLayer === 'standard' ? 'satellite' : 'standard')}
                className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-xs text-slate-700 flex items-center justify-center hover:bg-white active:scale-95 transition-all border border-slate-200/80"
                title={mapLayer === 'standard' ? 'Ver Satélite' : 'Ver Mapa'}
              >
                <Layers className="w-4 h-4 text-[#008779]" />
              </button>

              <button
                onClick={handleRecenter}
                className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-xs text-slate-700 flex items-center justify-center hover:bg-white active:scale-95 transition-all border border-slate-200/80"
                title="Centralizar em Araucária"
              >
                <LocateFixed className="w-4 h-4 text-[#008779]" />
              </button>

              <button
                onClick={handleZoomIn}
                className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-xs text-slate-700 flex items-center justify-center hover:bg-white active:scale-95 transition-all border border-slate-200/80"
                title="Aproximar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={handleZoomOut}
                className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-xs text-slate-700 flex items-center justify-center hover:bg-white active:scale-95 transition-all border border-slate-200/80"
                title="Afastar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Map Location Badge */}
            <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/80 text-[10px] font-medium text-slate-700 flex items-center gap-1 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#008779] animate-pulse" />
              <span>Araucária - PR (Tempo Real)</span>
            </div>

            {/* Selected Pet Drawer Card overlay on bottom of map */}
            {selectedPet && (
              <div className="absolute bottom-3 inset-x-3 z-20 animate-in slide-in-from-bottom-3 duration-200">
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedPet.photo}
                        alt={selectedPet.name}
                        className="w-13 h-13 rounded-xl object-cover ring-2 ring-slate-100 shrink-0"
                      />
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-md ${
                              selectedPet.type === 'desaparecido'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {selectedPet.type === 'desaparecido' ? 'Desaparecido' : 'Encontrado'}
                          </span>
                          <h4 className="text-xs font-semibold text-slate-800 truncate">
                            {selectedPet.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 font-normal">
                          {selectedPet.species} • {selectedPet.breed}
                        </p>
                        <p className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#008779] shrink-0" />
                          <span className="truncate">{selectedPet.location} ({selectedPet.distance})</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPet(null)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-600 font-normal line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-xl border border-slate-100">
                    {selectedPet.description}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="text-[10px] text-slate-400 font-normal">
                      {selectedPet.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: `Alerta Pet: ${selectedPet.name}`,
                              text: `${selectedPet.name} (${selectedPet.type}) em Araucária: ${selectedPet.location}`,
                            }).catch(() => {});
                          } else {
                            alert('Link do alerta copiado!');
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors flex items-center gap-1"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Compartilhar</span>
                      </button>
                      <button
                        onClick={() => alert(`Ligando para ${selectedPet.contactPhone}...`)}
                        className="px-3 py-1.5 rounded-xl bg-[#008779] hover:bg-[#006e63] text-white text-xs font-medium transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Ligar ({selectedPet.contactPhone})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Lista Mode */
        <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
          {filteredPets.map((p) => {
            const isDesaparecido = p.type === 'desaparecido';
            return (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2.5"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-slate-800">{p.name}</h4>
                      <span
                        className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                          isDesaparecido
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {isDesaparecido ? 'Desaparecido' : 'Encontrado'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal">{p.species} • {p.breed}</p>
                    <p className="text-[10px] text-slate-400 font-normal">🕒 {p.date}</p>
                    <p className="text-[10px] text-slate-400 font-normal truncate">📍 {p.location} ({p.distance})</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">{p.description}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-normal">Contato: {p.contactPhone}</span>
                  <button
                    onClick={() => alert(`Ligando para ${p.contactPhone}...`)}
                    className="px-3 py-1 bg-[#008779] text-white rounded-lg text-xs font-medium"
                  >
                    Contatar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Report Modal */}
      <NewReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onAddPet={handleAddPet}
      />
    </div>
  );
};
