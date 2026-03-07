'use client';

import { useState, useEffect, useRef } from 'react';
import { Ship } from '@/types';

const TICK_MS = 1500;

function simulateMoveShip(ship: Ship, dtSeconds: number): Ship {
  const headingRad = (ship.heading * Math.PI) / 180;
  const latRad = (ship.lat * Math.PI) / 180;
  // speed (knots) * time (h) = nautical miles; divide by 60 to convert nm → degrees
  const dLat = (ship.speed * dtSeconds / 3600) * Math.cos(headingRad) / 60;
  // Guard against division by ~0 near the poles
  const cosLat = Math.max(Math.cos(latRad), 0.01);
  const dLon = (ship.speed * dtSeconds / 3600) * Math.sin(headingRad) / (60 * cosLat);

  let newLat = ship.lat + dLat;
  let newLon = ship.lon + dLon;

  // Clamp latitude and wrap longitude
  newLat = Math.max(-90, Math.min(90, newLat));
  if (newLon > 180) newLon -= 360;
  if (newLon < -180) newLon += 360;

  return { ...ship, lat: newLat, lon: newLon };
}

export function useShipData() {
  const [ships, setShips] = useState<Ship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const shipsRef = useRef<Ship[]>([]);

  useEffect(() => {
    async function fetchShips() {
      try {
        const response = await fetch('/api/ships');
        if (!response.ok) throw new Error('Failed to fetch ships');
        const data: Ship[] = await response.json();
        shipsRef.current = data;
        setShips(data);
        setLastUpdated(new Date());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchShips();
    const fetchInterval = setInterval(fetchShips, 30000);

    const moveInterval = setInterval(() => {
      if (shipsRef.current.length === 0) return;
      const updated = shipsRef.current.map(ship =>
        simulateMoveShip(ship, TICK_MS / 1000)
      );
      shipsRef.current = updated;
      setShips([...updated]);
      setLastUpdated(new Date());
    }, TICK_MS);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(moveInterval);
    };
  }, []);

  return { ships, loading, error, lastUpdated };
}
