'use client';

import { Ship } from '@/types';

interface ShipInfoPanelProps {
  ship: Ship | null;
  onClose: () => void;
}

const typeColors: Record<Ship['type'], string> = {
  Cargo: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  Tanker: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  Fishing: 'text-green-400 bg-green-400/10 border-green-400/30',
  Military: 'text-red-400 bg-red-400/10 border-red-400/30',
  Passenger: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
};

export default function ShipInfoPanel({ ship, onClose }: ShipInfoPanelProps) {
  if (!ship) return null;

  return (
    <div className="fixed right-4 top-20 z-50 w-72 glass rounded-xl border border-cyan-500/20 overflow-hidden transform transition-all duration-300">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚢</span>
          <div>
            <h3 className="text-sm font-bold text-white">{ship.name}</h3>
            <p className="text-xs text-slate-400">MMSI: {ship.mmsi}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div className={`inline-block px-2 py-0.5 rounded-full text-xs border ${typeColors[ship.type]}`}>
          {ship.type}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InfoItem label="Speed" value={`${ship.speed} kts`} icon="⚡" />
          <InfoItem label="Heading" value={`${ship.heading}°`} icon="🧭" />
          <InfoItem label="Flag" value={ship.flag} icon="🏳️" />
          <InfoItem label="Destination" value={ship.destination} icon="📍" />
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="text-xs text-slate-400">Position</div>
          <div className="text-sm text-slate-300 font-mono">
            {ship.lat.toFixed(4)}°N, {ship.lon.toFixed(4)}°E
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div>
      <div className="text-xs text-slate-400 flex items-center gap-1">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-sm text-white font-medium">{value}</div>
    </div>
  );
}
