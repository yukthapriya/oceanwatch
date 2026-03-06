import { VisualMode } from '@/types';

export interface VisualModeConfig {
  id: VisualMode;
  name: string;
  icon: string;
  filter: string;
  description: string;
}

export const visualModes: VisualModeConfig[] = [
  {
    id: 'deepblue',
    name: 'Deep Blue',
    icon: '🌊',
    filter: 'none',
    description: 'Default dark ocean theme',
  },
  {
    id: 'sonar',
    name: 'Sonar',
    icon: '📡',
    filter: 'hue-rotate(90deg) saturate(2)',
    description: 'Green monochrome sonar view',
  },
  {
    id: 'threat',
    name: 'Threat View',
    icon: '⚠️',
    filter: 'saturate(0.3) contrast(1.5) brightness(0.8)',
    description: 'High contrast threat assessment',
  },
  {
    id: 'thermal',
    name: 'Thermal',
    icon: '🌡️',
    filter: 'hue-rotate(180deg) saturate(1.5)',
    description: 'Infrared thermal imaging',
  },
  {
    id: 'satellite',
    name: 'Satellite',
    icon: '🛰️',
    filter: 'saturate(1.2) brightness(1.1)',
    description: 'Natural satellite colors',
  },
];
