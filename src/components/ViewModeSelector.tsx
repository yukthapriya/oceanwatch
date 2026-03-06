'use client';

import { VisualMode } from '@/types';
import { visualModes } from '@/constants/visual-modes';

interface ViewModeSelectorProps {
  currentMode: VisualMode;
  onModeChange: (mode: VisualMode) => void;
}

export default function ViewModeSelector({ currentMode, onModeChange }: ViewModeSelectorProps) {
  return (
    <div className="space-y-1">
      {visualModes.map(mode => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
            currentMode === mode.id
              ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400'
              : 'hover:bg-slate-700/50 text-slate-300 border border-transparent'
          }`}
        >
          <span className="text-base">{mode.icon}</span>
          <div className="text-left">
            <div className="font-medium leading-none">{mode.name}</div>
            <div className="text-xs text-slate-400 mt-0.5">{mode.description}</div>
          </div>
          {currentMode === mode.id && (
            <span className="ml-auto text-cyan-400">✓</span>
          )}
        </button>
      ))}
    </div>
  );
}
