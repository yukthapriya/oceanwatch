'use client';

interface TopBarProps {
  vesselCount: number;
  alertCount: number;
  cablesTracked: number;
}

export default function TopBar({ vesselCount, alertCount, cablesTracked }: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-cyan-500/20">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌊</span>
          <div>
            <h1 className="text-lg font-bold text-cyan-400 leading-none">OceanWatch</h1>
            <p className="text-xs text-slate-400">Maritime Intelligence Platform</p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <div className="w-2 h-2 rounded-full bg-green-400 live-indicator" />
            <span className="text-xs text-green-400">LIVE</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-400">{vesselCount}</div>
            <div className="text-xs text-slate-400">Vessels</div>
          </div>
          <div className="w-px h-8 bg-slate-600" />
          <div className="text-center">
            <div className="text-lg font-bold text-orange-400">{alertCount}</div>
            <div className="text-xs text-slate-400">Alerts</div>
          </div>
          <div className="w-px h-8 bg-slate-600" />
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">{cablesTracked}</div>
            <div className="text-xs text-slate-400">Cables</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search vessels, cables..."
            className="bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-48 md:w-64"
          />
          <span className="text-slate-400 text-sm">🔍</span>
        </div>
      </div>
    </div>
  );
}
