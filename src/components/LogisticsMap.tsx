import { useState, useCallback, memo, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from "react-simple-maps";
import { Ship, Plane, Train, Truck, Layers } from "lucide-react";
import { 
  points, 
  routes, 
  modeLabels, 
  modeColors, 
  type Mode, 
  type LocationPoint, 
  type Route 
} from "@/data/geography";

// TopoJSON с картой мира (высокое качество от Natural Earth)
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Иконки для модальностей
const modeIcons: Record<Mode, typeof Ship> = {
  sea: Ship,
  air: Plane,
  rail: Train,
  road: Truck,
  multi: Layers,
};

// Цвета для типов точек
const locationColors = {
  origin: { fill: "#E85D3E", stroke: "#FF7A5C" },      // Coral
  destination: { fill: "#22C55E", stroke: "#4ADE80" }, // Green
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
  const [center, setCenter] = useState<[number, number]>([50, 35]);
  
  // Фильтр модальностей: null = все, иначе только выбранный mode
  const [activeMode, setActiveMode] = useState<Mode | null>(null);

  const handleMoveEnd = useCallback((position: { coordinates: [number, number]; zoom: number }) => {
    setCenter(position.coordinates);
  }, []);

  const getLocationById = useCallback((id: string): LocationPoint | undefined => {
    return points.find(loc => loc.id === id);
  }, []);

  // Фильтрованные маршруты по режиму
  const filteredRoutes = useMemo(() => {
    if (activeMode === null) return routes;
    return routes.filter(r => r.mode === activeMode);
  }, [activeMode]);

  // Активные точки (участвующие в отфильтрованных маршрутах)
  const activePointIds = useMemo(() => {
    const ids = new Set<string>();
    filteredRoutes.forEach(r => {
      ids.add(r.fromId);
      ids.add(r.toId);
    });
    return ids;
  }, [filteredRoutes]);

  // Точки для отображения
  const visiblePoints = useMemo(() => {
    return points.filter(p => activePointIds.has(p.id));
  }, [activePointIds]);

  const getConnectedRoutes = useCallback((locationId: string) => {
    return filteredRoutes.filter(r => r.fromId === locationId || r.toId === locationId);
  }, [filteredRoutes]);

  const isRouteHighlighted = useCallback((route: Route) => {
    if (hoveredRoute === route.id) return true;
    if (selectedLocation && (route.fromId === selectedLocation || route.toId === selectedLocation)) return true;
    if (hoveredLocation && (route.fromId === hoveredLocation || route.toId === hoveredLocation)) return true;
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

  const handleRouteMouseEnter = useCallback((route: Route, event: React.MouseEvent) => {
    setHoveredRoute(route.id);
    const rect = (event.target as Element).getBoundingClientRect();
    setTooltipContent({
      content: route.label,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }, []);

  const handleRouteMouseLeave = useCallback(() => {
    setHoveredRoute(null);
    setTooltipContent(null);
  }, []);

  // Все доступные модальности
  const allModes: Mode[] = ["sea", "air", "rail", "road", "multi"];

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
        </div>
        <div className="mt-3 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Виды транспорта:</p>
          <div className="grid grid-cols-2 gap-2">
            {allModes.map((mode) => {
              const Icon = modeIcons[mode];
              return (
                <div key={mode} className="flex items-center gap-1.5">
                  <Icon 
                    className="w-3 h-3" 
                    style={{ color: modeColors[mode] }} 
                  />
                  <span className="text-xs text-muted-foreground">{modeLabels[mode]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mode Filter Buttons */}
      <div className="absolute top-4 right-4 z-10 bg-background/95 backdrop-blur-sm rounded-xl p-3 border border-border/50 shadow-lg">
        <h4 className="text-xs font-semibold text-foreground mb-2">Фильтр по типу</h4>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setActiveMode(null)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === null
                ? "bg-[#F34D1B] text-white"
                : "bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            Все маршруты
          </button>
          {allModes.map((mode) => {
            const Icon = modeIcons[mode];
            const isActive = activeMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setActiveMode(isActive ? null : mode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
                style={isActive ? { backgroundColor: modeColors[mode] } : undefined}
              >
                <Icon className="w-3.5 h-3.5" />
                {modeLabels[mode]}
              </button>
            );
          })}
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
            center: [50, 35],
            scale: 280,
          }}
          style={{ width: "100%", height: "auto" }}
          viewBox="0 0 800 450"
        >
          <ZoomableGroup 
              center={center} 
              zoom={0.6}
              minZoom={0.6}
              maxZoom={0.6}
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
            {filteredRoutes.map((route) => {
              const fromLoc = getLocationById(route.fromId);
              const toLoc = getLocationById(route.toId);
              if (!fromLoc || !toLoc) return null;

              const highlighted = isRouteHighlighted(route);
              const routeColor = modeColors[route.mode];

              return (
                <Line
                  key={route.id}
                  from={fromLoc.coordinates}
                  to={toLoc.coordinates}
                  stroke={highlighted ? "#FBBF24" : routeColor}
                  strokeWidth={highlighted ? 2.5 : 1.5}
                  strokeOpacity={highlighted ? 1 : 0.6}
                  strokeLinecap="round"
                  strokeDasharray={route.mode === "multi" ? "4 2" : undefined}
                  style={{ 
                    cursor: "pointer",
                    filter: highlighted ? "drop-shadow(0 0 4px #FBBF24)" : "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => handleRouteMouseEnter(route, e as unknown as React.MouseEvent)}
                  onMouseLeave={handleRouteMouseLeave}
                />
              );
            })}

            {/* Маркеры городов */}
            {visiblePoints.map((location) => {
              const isHovered = hoveredLocation === location.id;
              const isSelected = selectedLocation === location.id;
              const isHighlighted = isHovered || isSelected;
              const colors = locationColors[location.type];
              const baseRadius = location.type === "destination" ? 6 : 4;
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
                    onMouseEnter={(e) => handleMarkerMouseEnter(location, e as unknown as React.MouseEvent)}
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
                    const otherPoint = route.fromId === selectedLocation 
                      ? getLocationById(route.toId) 
                      : getLocationById(route.fromId);
                    const direction = route.fromId === selectedLocation ? "→" : "←";
                    const Icon = modeIcons[route.mode];
                    
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
                        <div className="flex items-center gap-2">
                          <div 
                            className="p-1 rounded"
                            style={{ backgroundColor: `${modeColors[route.mode]}20` }}
                          >
                            <Icon 
                              className="w-3 h-3" 
                              style={{ color: modeColors[route.mode] }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{modeLabels[route.mode]}</span>
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
          🖱️ Перетаскивайте для навигации • Клик на точку для деталей
        </p>
      </div>
    </div>
  );
};

export default LogisticsMap;
