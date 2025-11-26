import { useState, useCallback, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from "react-simple-maps";
import { Ship, Plane, Train, Truck } from "lucide-react";

// TopoJSON с картой мира (высокое качество от Natural Earth)
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface LocationPoint {
  id: string;
  name: string;
  nameRu: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: "origin" | "destination" | "hub";
  country: string;
}

interface Route {
  id: string;
  from: string;
  to: string;
  modes: ("sea" | "air" | "rail" | "road")[];
  description: string;
}

// Точные координаты городов [longitude, latitude]
const locations: LocationPoint[] = [
  // Азия - источники
  { id: "shanghai", name: "Shanghai", nameRu: "Шанхай", coordinates: [121.47, 31.23], type: "origin", country: "Китай" },
  { id: "shenzhen", name: "Shenzhen", nameRu: "Шэньчжэнь", coordinates: [114.06, 22.54], type: "origin", country: "Китай" },
  { id: "beijing", name: "Beijing", nameRu: "Пекин", coordinates: [116.41, 39.90], type: "origin", country: "Китай" },
  { id: "guangzhou", name: "Guangzhou", nameRu: "Гуанчжоу", coordinates: [113.26, 23.13], type: "origin", country: "Китай" },
  { id: "seoul", name: "Seoul", nameRu: "Сеул", coordinates: [126.98, 37.57], type: "origin", country: "Ю. Корея" },
  { id: "tokyo", name: "Tokyo", nameRu: "Токио", coordinates: [139.69, 35.69], type: "origin", country: "Япония" },
  { id: "hochiminh", name: "Ho Chi Minh", nameRu: "Хошимин", coordinates: [106.63, 10.82], type: "origin", country: "Вьетнам" },
  { id: "hanoi", name: "Hanoi", nameRu: "Ханой", coordinates: [105.85, 21.03], type: "origin", country: "Вьетнам" },
  { id: "bangkok", name: "Bangkok", nameRu: "Бангкок", coordinates: [100.50, 13.76], type: "origin", country: "Таиланд" },
  { id: "mumbai", name: "Mumbai", nameRu: "Мумбаи", coordinates: [72.88, 19.08], type: "origin", country: "Индия" },
  { id: "delhi", name: "Delhi", nameRu: "Дели", coordinates: [77.21, 28.64], type: "origin", country: "Индия" },
  { id: "singapore", name: "Singapore", nameRu: "Сингапур", coordinates: [103.82, 1.35], type: "hub", country: "Сингапур" },
  { id: "jakarta", name: "Jakarta", nameRu: "Джакарта", coordinates: [106.85, -6.21], type: "origin", country: "Индонезия" },
  
  // Хабы
  { id: "istanbul", name: "Istanbul", nameRu: "Стамбул", coordinates: [28.98, 41.01], type: "hub", country: "Турция" },
  { id: "dubai", name: "Dubai", nameRu: "Дубай", coordinates: [55.27, 25.20], type: "hub", country: "ОАЭ" },
  { id: "almaty", name: "Almaty", nameRu: "Алматы", coordinates: [76.95, 43.24], type: "hub", country: "Казахстан" },
  
  // Россия - пункты назначения
  { id: "moscow", name: "Moscow", nameRu: "Москва", coordinates: [37.62, 55.75], type: "destination", country: "Россия" },
  { id: "spb", name: "St. Petersburg", nameRu: "Санкт-Петербург", coordinates: [30.31, 59.94], type: "destination", country: "Россия" },
  { id: "vladivostok", name: "Vladivostok", nameRu: "Владивосток", coordinates: [131.89, 43.12], type: "destination", country: "Россия" },
  { id: "novosibirsk", name: "Novosibirsk", nameRu: "Новосибирск", coordinates: [82.93, 55.03], type: "destination", country: "Россия" },
  { id: "ekb", name: "Yekaterinburg", nameRu: "Екатеринбург", coordinates: [60.60, 56.84], type: "destination", country: "Россия" },
  
  // Европа
  { id: "rotterdam", name: "Rotterdam", nameRu: "Роттердам", coordinates: [4.48, 51.92], type: "origin", country: "Нидерланды" },
  { id: "hamburg", name: "Hamburg", nameRu: "Гамбург", coordinates: [9.99, 53.55], type: "origin", country: "Германия" },
  { id: "milan", name: "Milan", nameRu: "Милан", coordinates: [9.19, 45.46], type: "origin", country: "Италия" },
];

const routes: Route[] = [
  { id: "r1", from: "shanghai", to: "moscow", modes: ["rail", "sea"], description: "Основной маршрут из Китая" },
  { id: "r2", from: "shenzhen", to: "moscow", modes: ["sea", "rail"], description: "Южный Китай - Россия" },
  { id: "r3", from: "beijing", to: "moscow", modes: ["rail"], description: "Прямое ж/д сообщение" },
  { id: "r4", from: "seoul", to: "vladivostok", modes: ["sea"], description: "Корея - Дальний Восток" },
  { id: "r5", from: "hochiminh", to: "moscow", modes: ["sea", "air"], description: "Вьетнам - Россия" },
  { id: "r6", from: "mumbai", to: "moscow", modes: ["sea", "rail"], description: "Индия - Россия" },
  { id: "r7", from: "istanbul", to: "moscow", modes: ["road", "sea"], description: "Турция - Россия" },
  { id: "r8", from: "rotterdam", to: "istanbul", modes: ["sea"], description: "Европа через Турцию" },
  { id: "r9", from: "hamburg", to: "istanbul", modes: ["road"], description: "Германия через Турцию" },
  { id: "r10", from: "guangzhou", to: "almaty", modes: ["rail"], description: "Казахстанский транзит" },
  { id: "r11", from: "almaty", to: "moscow", modes: ["rail", "road"], description: "Центральная Азия" },
  { id: "r12", from: "singapore", to: "vladivostok", modes: ["sea"], description: "ЮВА - Дальний Восток" },
  { id: "r13", from: "dubai", to: "moscow", modes: ["air", "sea"], description: "Ближний Восток" },
  { id: "r14", from: "tokyo", to: "vladivostok", modes: ["sea"], description: "Япония - ДВ" },
];

const modeIcons = {
  sea: Ship,
  air: Plane,
  rail: Train,
  road: Truck,
};

const modeLabels = {
  sea: "Море",
  air: "Авиа",
  rail: "ЖД",
  road: "Авто",
};

const locationColors = {
  origin: { fill: "#E85D3E", stroke: "#FF7A5C" },      // Coral
  destination: { fill: "#22C55E", stroke: "#4ADE80" }, // Green
  hub: { fill: "#F59E0B", stroke: "#FBBF24" },         // Amber
};

// Memoized Geography component для производительности
const MapGeography = memo(({ geo }: { geo: any }) => (
  <Geography
    geography={geo}
    fill="#1E293B"
    stroke="#334155"
    strokeWidth={0.5}
    style={{
      default: { outline: "none" },
      hover: { fill: "#334155", outline: "none" },
      pressed: { outline: "none" },
    }}
  />
));

const LogisticsMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<{ content: string; x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(0.55);
  const [center, setCenter] = useState<[number, number]>([75, 40]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.4, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.4, 0.4));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(0.55);
    setCenter([75, 40]);
  }, []);

  const handleMoveEnd = useCallback((position: { coordinates: [number, number]; zoom: number }) => {
    setCenter(position.coordinates);
    setZoom(position.zoom);
  }, []);

  const getLocationById = useCallback((id: string) => {
    return locations.find(loc => loc.id === id);
  }, []);

  const getConnectedRoutes = useCallback((locationId: string) => {
    return routes.filter(r => r.from === locationId || r.to === locationId);
  }, []);

  const isRouteHighlighted = useCallback((route: Route) => {
    if (hoveredRoute === route.id) return true;
    if (selectedLocation && (route.from === selectedLocation || route.to === selectedLocation)) return true;
    if (hoveredLocation && (route.from === hoveredLocation || route.to === hoveredLocation)) return true;
    return false;
  }, [hoveredRoute, selectedLocation, hoveredLocation]);

  const handleMarkerMouseEnter = useCallback((location: LocationPoint, event: React.MouseEvent) => {
    setHoveredLocation(location.id);
    const rect = (event.target as Element).getBoundingClientRect();
    setTooltipContent({
      content: `${location.nameRu} (${location.country})`,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }, []);

  const handleMarkerMouseLeave = useCallback(() => {
    setHoveredLocation(null);
    setTooltipContent(null);
  }, []);

  return (
    <div className="logistics-map-container relative w-full">
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-background/95 backdrop-blur-sm rounded-xl p-4 border border-border/50 shadow-lg">
        <h4 className="text-sm font-semibold text-foreground mb-3">Легенда</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: locationColors.origin.fill, boxShadow: `0 0 8px ${locationColors.origin.fill}` }} 
            />
            <span className="text-xs text-muted-foreground">Точки отправления</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: locationColors.destination.fill, boxShadow: `0 0 8px ${locationColors.destination.fill}` }} 
            />
            <span className="text-xs text-muted-foreground">Пункты назначения</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: locationColors.hub.fill, boxShadow: `0 0 8px ${locationColors.hub.fill}` }} 
            />
            <span className="text-xs text-muted-foreground">Транзитные хабы</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(modeIcons).map(([mode, Icon]) => (
              <div key={mode} className="flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{modeLabels[mode as keyof typeof modeLabels]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltipContent && (
        <div 
          className="fixed z-50 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ 
            left: tooltipContent.x, 
            top: tooltipContent.y - 10,
          }}
        >
          {tooltipContent.content}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900" />
        </div>
      )}

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-border/30" style={{ background: "linear-gradient(180deg, #0F172A 0%, #020617 100%)" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [75, 40], // Центр на Евразии
            scale: 350,
          }}
          style={{ width: "100%", height: "auto" }}
          viewBox="0 0 800 450"
        >
          <ZoomableGroup 
              center={center} 
              zoom={zoom} 
              minZoom={0.4} 
              maxZoom={5}
              onMoveEnd={handleMoveEnd}
            >
            {/* Страны */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <MapGeography key={geo.rsmKey} geo={geo} />
                ))
              }
            </Geographies>

            {/* Маршруты */}
            {routes.map((route) => {
              const fromLoc = getLocationById(route.from);
              const toLoc = getLocationById(route.to);
              if (!fromLoc || !toLoc) return null;

              const highlighted = isRouteHighlighted(route);

              return (
                <Line
                  key={route.id}
                  from={fromLoc.coordinates}
                  to={toLoc.coordinates}
                  stroke={highlighted ? "#F59E0B" : "#E85D3E"}
                  strokeWidth={highlighted ? 2.5 : 1}
                  strokeOpacity={highlighted ? 1 : 0.4}
                  strokeLinecap="round"
                  style={{ 
                    cursor: "pointer",
                    filter: highlighted ? "drop-shadow(0 0 4px #F59E0B)" : "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => setHoveredRoute(route.id)}
                  onMouseLeave={() => setHoveredRoute(null)}
                />
              );
            })}

            {/* Маркеры городов */}
            {locations.map((location) => {
              const isHovered = hoveredLocation === location.id;
              const isSelected = selectedLocation === location.id;
              const isHighlighted = isHovered || isSelected;
              const colors = locationColors[location.type];
              const baseRadius = location.type === "hub" ? 5 : 4;
              const radius = isHighlighted ? baseRadius * 1.4 : baseRadius;

              return (
                <Marker key={location.id} coordinates={location.coordinates}>
                  {/* Outer glow */}
                  <circle
                    r={radius * 2.5}
                    fill={colors.fill}
                    fillOpacity={isHighlighted ? 0.3 : 0.15}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  
                  {/* Pulse animation for selected */}
                  {isSelected && (
                    <circle
                      r={radius}
                      fill="none"
                      stroke={colors.stroke}
                      strokeWidth={1.5}
                      opacity={0.6}
                    >
                      <animate
                        attributeName="r"
                        from={radius}
                        to={radius * 3}
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  
                  {/* Main circle */}
                  <circle
                    r={radius}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={1}
                    style={{ 
                      cursor: "pointer",
                      filter: isHighlighted ? `drop-shadow(0 0 6px ${colors.fill})` : `drop-shadow(0 0 3px ${colors.fill})`,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => handleMarkerMouseEnter(location, e)}
                    onMouseLeave={handleMarkerMouseLeave}
                    onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
                  />
                  
                  {/* Center dot */}
                  <circle
                    r={radius * 0.35}
                    fill="white"
                    fillOpacity={0.9}
                    style={{ pointerEvents: "none" }}
                  />
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          title="Приблизить"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          title="Отдалить"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
          </svg>
        </button>
        <button
          onClick={handleReset}
          className="w-10 h-10 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          title="Сбросить"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* Info Panel */}
      {selectedLocation && (
        <div className="absolute bottom-4 right-4 z-10 bg-background/95 backdrop-blur-sm rounded-xl p-5 border border-border/50 shadow-lg max-w-xs animate-fade-in">
          {(() => {
            const location = getLocationById(selectedLocation);
            const connectedRoutes = getConnectedRoutes(selectedLocation);
            if (!location) return null;
            
            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-foreground">{location.nameRu}</h4>
                    <p className="text-sm text-muted-foreground">{location.country}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="p-1 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Маршруты:</p>
                  {connectedRoutes.length > 0 ? connectedRoutes.map(route => {
                    const otherPoint = route.from === selectedLocation 
                      ? getLocationById(route.to) 
                      : getLocationById(route.from);
                    const direction = route.from === selectedLocation ? "→" : "←";
                    
                    return (
                      <div 
                        key={route.id} 
                        className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                        onMouseEnter={() => setHoveredRoute(route.id)}
                        onMouseLeave={() => setHoveredRoute(null)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">
                            {direction} {otherPoint?.nameRu}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {route.modes.map(mode => {
                            const Icon = modeIcons[mode];
                            return (
                              <div 
                                key={mode} 
                                className="p-1 rounded bg-accent/10"
                                title={modeLabels[mode]}
                              >
                                <Icon className="w-3 h-3 text-accent" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }) : (
                    <p className="text-sm text-muted-foreground">Нет прямых маршрутов</p>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10">
        <p className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg">
          🖱️ Перетаскивайте для навигации • Скролл для зума • Клик на точку для деталей
        </p>
      </div>
    </div>
  );
};

export default LogisticsMap;
