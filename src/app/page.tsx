'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { SubmarineCable, PiracyZone, ProtectedArea, OceanTemperaturePoint, WeatherBuoy, Ship } from '@/types';
import { useLayerVisibility } from '@/hooks/useLayerVisibility';
import { useVisualMode } from '@/hooks/useVisualMode';
import { useShipData } from '@/hooks/useShipData';
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

const WIND_FLUCTUATION_RANGE = 4; // ±2 knots per tick

export default function Home() {
  const { visibility, toggleLayer } = useLayerVisibility();
  const { currentMode, setCurrentMode, filter } = useVisualMode();
  const { ships, lastUpdated } = useShipData();
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [cameraTarget, setCameraTarget] = useState<{ lat: number; lon: number; height: number } | null>(null);

  const [cables, setCables] = useState<SubmarineCable[]>([]);
  const [piracyZones, setPiracyZones] = useState<PiracyZone[]>([]);
  const [protectedAreas, setProtectedAreas] = useState<ProtectedArea[]>([]);
  const [oceanTemperature, setOceanTemperature] = useState<OceanTemperaturePoint[]>([]);
  const [weatherBuoys, setWeatherBuoys] = useState<WeatherBuoy[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/cables').then(r => r.json()),
      fetch('/api/piracy').then(r => r.json()),
      fetch('/api/fishing').then(r => r.json()),
      fetch('/api/ocean').then(r => r.json()),
      fetch('/api/weather').then(r => r.json()),
    ]).then(([cablesData, piracyData, fishingData, oceanData, weatherData]) => {
      setCables(cablesData);
      setPiracyZones(piracyData);
      setProtectedAreas(fishingData);
      setOceanTemperature(oceanData);
      setWeatherBuoys(weatherData);
    }).catch(console.error);
  }, []);

  // Simulate live weather buoy fluctuations (±2 knots every 5 seconds).
  // weatherBuoys.length is used instead of weatherBuoys so the interval is only
  // restarted when buoys are added/removed, not on every value fluctuation.
  // The functional updater form (prev => ...) safely reads the latest state.
  useEffect(() => {
    if (weatherBuoys.length === 0) return;
    const interval = setInterval(() => {
      setWeatherBuoys(prev => prev.map(buoy => ({
        ...buoy,
        wind_speed_knots: Math.max(0, buoy.wind_speed_knots + (Math.random() - 0.5) * WIND_FLUCTUATION_RANGE),
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, [weatherBuoys.length]);

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
        lastUpdated={lastUpdated}
      />

      <ShipInfoPanel ship={selectedShip} onClose={() => setSelectedShip(null)} />
    </div>
  );
}
