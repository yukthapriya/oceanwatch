'use client';

import { useState } from 'react';
import { LayerVisibility, LayerName } from '@/types';

const defaultVisibility: LayerVisibility = {
  ships: true,
  cables: true,
  piracy: true,
  fishing: true,
  temperature: false,
  weather: false,
};

export function useLayerVisibility() {
  const [visibility, setVisibility] = useState<LayerVisibility>(defaultVisibility);

  const toggleLayer = (layer: LayerName) => {
    setVisibility(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return { visibility, toggleLayer };
}
