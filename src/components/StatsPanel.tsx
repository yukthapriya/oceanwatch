'use client';

interface StatsPanelProps {
  vesselCount: number;
  alertCount: number;
  cablesTracked: number;
  darkVessels: number;
}

export default function StatsPanel({ vesselCount, alertCount, cablesTracked, darkVessels }: StatsPanelProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="glass rounded-xl px-6 py-3 flex items-center gap-6 border border-cyan-500/20">
        <StatItem value={vesselCount} label="Vessels Tracked" color="text-cyan-400" icon="🚢" />
        <div className="w-px h-8 bg-slate-600" />
        <StatItem value={alertCount} label="Piracy Alerts" color="text-red-400" icon="⚠️" />
        <div className="w-px h-8 bg-slate-600" />
        <StatItem value={cablesTracked} label="Cables Online" color="text-purple-400" icon="🔌" />
        <div className="w-px h-8 bg-slate-600" />
        <StatItem value={darkVessels} label="Dark Vessels" color="text-orange-400" icon="👁️" />
      </div>
    </div>
  );
}

function StatItem({ value, label, color, icon }: { value: number; label: string; color: string; icon: string }) {
  return (
    <div className="text-center">
      <div className={`text-xl font-bold ${color} flex items-center gap-1`}>
        <span>{icon}</span>
        <span>{value}</span>
      </div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}
