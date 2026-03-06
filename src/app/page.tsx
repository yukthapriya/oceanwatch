'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Ship, SubmarineCable, PiracyZone, ProtectedArea, OceanTemperaturePoint, WeatherBuoy } from '@/types';
import { useLayerVisibility } from '@/hooks/useLayerVisibility';
import { useVisualMode } from '@/hooks/useVisualMode';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';
import StatsPanel from '@/components/StatsPanel';
import ShipInfoPanel from '@/components/ShipInfoPanel';

const Globe = dynamic(() => import('@/components/Globe'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-[#0a0e1a]">
      <div className="text-center space-y-4">
        <div className="text-6xl animate-bounce">🌊</div>
        <div className="text-cyan-400 text-xl font-bold">Loading OceanWatch...</div>
        <div className="text-slate-400 text-sm">Initializing maritime intelligence systems</div>
      </div>
    </div>
  ),
});

export default function Home() {
  const { visibility, toggleLayer } = useLayerVisibility();
  const { currentMode, setCurrentMode, filter } = useVisualMode();
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [cameraTarget, setCameraTarget] = useState<{ lat: number; lon: number; height: number } | null>(null);

  const [ships, setShips] = useState<Ship[]>([]);
  const [cables, setCables] = useState<SubmarineCable[]>([]);
  const [piracyZones, setPiracyZones] = useState<PiracyZone[]>([]);
  const [protectedAreas, setProtectedAreas] = useState<ProtectedArea[]>([]);
  const [oceanTemperature, setOceanTemperature] = useState<OceanTemperaturePoint[]>([]);
  const [weatherBuoys, setWeatherBuoys] = useState<WeatherBuoy[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/ships').then(r => r.json()),
      fetch('/api/cables').then(r => r.json()),
      fetch('/api/piracy').then(r => r.json()),
      fetch('/api/fishing').then(r => r.json()),
      fetch('/api/ocean').then(r => r.json()),
      fetch('/api/weather').then(r => r.json()),
    ]).then(([shipsData, cablesData, piracyData, fishingData, oceanData, weatherData]) => {
      setShips(shipsData);
      setCables(cablesData);
      setPiracyZones(piracyData);
      setProtectedAreas(fishingData);
      setOceanTemperature(oceanData);
      setWeatherBuoys(weatherData);
    }).catch(console.error);
  }, []);

  const totalDarkVessels = protectedAreas.reduce(
    (sum, area) => sum + area.dark_vessels.length, 0
  );

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#0a0e1a', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: filter,
          transition: 'filter 0.5s ease',
        }}
      >
        <Globe
          ships={ships}
          cables={cables}
          piracyZones={piracyZones}
          protectedAreas={protectedAreas}
          oceanTemperature={oceanTemperature}
          weatherBuoys={weatherBuoys}
          visibility={visibility}
          onShipClick={setSelectedShip}
          cameraTarget={cameraTarget}
        />
      </div>

      <TopBar
        vesselCount={ships.length}
        alertCount={piracyZones.filter(z => z.risk_level === 'high').length}
        cablesTracked={cables.length}
      />

      <Sidebar
        visibility={visibility}
        onToggleLayer={toggleLayer}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        onCameraPreset={(lat, lon, height) => setCameraTarget({ lat, lon, height })}
      />

      <StatsPanel
        vesselCount={ships.length}
        alertCount={piracyZones.filter(z => z.risk_level === 'high').length}
        cablesTracked={cables.length}
        darkVessels={totalDarkVessels}
      />

      <ShipInfoPanel ship={selectedShip} onClose={() => setSelectedShip(null)} />
    </div>
  );
}
