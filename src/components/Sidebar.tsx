'use client';

import { useState } from 'react';
import { LayerVisibility, LayerName, VisualMode } from '@/types';
import { cameraPresets } from '@/constants/camera-presets';
import ViewModeSelector from './ViewModeSelector';

interface SidebarProps {
  visibility: LayerVisibility;
  onToggleLayer: (layer: LayerName) => void;
  currentMode: VisualMode;
  onModeChange: (mode: VisualMode) => void;
  onCameraPreset: (lat: number, lon: number, height: number) => void;
}

const layers: { id: LayerName; label: string; icon: string; color: string }[] = [
  { id: 'ships', label: 'Ship Tracking', icon: '🚢', color: 'text-blue-400' },
  { id: 'cables', label: 'Submarine Cables', icon: '🔌', color: 'text-purple-400' },
  { id: 'piracy', label: 'Piracy Zones', icon: '☠️', color: 'text-red-400' },
  { id: 'fishing', label: 'Fishing Detection', icon: '🎣', color: 'text-green-400' },
  { id: 'temperature', label: 'Ocean Temperature', icon: '🌡️', color: 'text-orange-400' },
  { id: 'weather', label: 'Marine Weather', icon: '🌊', color: 'text-cyan-400' },
];

export default function Sidebar({
  visibility,
  onToggleLayer,
  currentMode,
  onModeChange,
  onCameraPreset,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('layers');

  return (
    <div
      className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] glass border-r border-cyan-500/20 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-12' : 'w-64'
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 hover:text-white z-10"
      >
        {collapsed ? '›' : '‹'}
      </button>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div className="flex gap-1 p-1 bg-slate-800/50 rounded-lg">
            {(['layers', 'camera', 'modes'] as const).map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex-1 py-1 text-xs rounded-md capitalize transition-colors ${
                  activeSection === section
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {activeSection === 'layers' && (
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
                Data Layers
              </h3>
              {layers.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => onToggleLayer(layer.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all text-sm ${
                    visibility[layer.id]
                      ? 'bg-slate-700/50 border border-slate-600/50'
                      : 'hover:bg-slate-800/50 border border-transparent opacity-50'
                  }`}
                >
                  <span>{layer.icon}</span>
                  <span className={`flex-1 text-left ${visibility[layer.id] ? layer.color : 'text-slate-500'}`}>
                    {layer.label}
                  </span>
                  <div
                    className={`w-8 h-4 rounded-full transition-colors ${
                      visibility[layer.id] ? 'bg-cyan-500' : 'bg-slate-600'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-white mt-0.5 transition-transform ${
                        visibility[layer.id] ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeSection === 'camera' && (
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
                Camera Presets
              </h3>
              {cameraPresets.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => onCameraPreset(preset.lat, preset.lon, preset.height)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-700/50 border border-transparent hover:border-cyan-500/20 transition-all text-sm text-slate-300 hover:text-cyan-400"
                >
                  <span>📍</span>
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          )}

          {activeSection === 'modes' && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
                Visual Modes
              </h3>
              <ViewModeSelector currentMode={currentMode} onModeChange={onModeChange} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
