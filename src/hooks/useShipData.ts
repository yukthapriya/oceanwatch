'use client';

import { useState, useEffect } from 'react';
import { Ship } from '@/types';

export function useShipData() {
  const [ships, setShips] = useState<Ship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShips() {
      try {
        const response = await fetch('/api/ships');
        if (!response.ok) throw new Error('Failed to fetch ships');
        const data = await response.json();
        setShips(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchShips();
    const interval = setInterval(fetchShips, 30000);
    return () => clearInterval(interval);
  }, []);

  return { ships, loading, error };
}
