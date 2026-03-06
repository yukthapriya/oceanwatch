'use client';

import { useState } from 'react';
import { VisualMode } from '@/types';
import { visualModes } from '@/constants/visual-modes';

export function useVisualMode() {
  const [currentMode, setCurrentMode] = useState<VisualMode>('deepblue');

  const currentModeConfig = visualModes.find(m => m.id === currentMode);
  const filter = currentModeConfig?.filter || 'none';

  return { currentMode, setCurrentMode, filter };
}
