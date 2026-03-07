export interface Ship {
  id: string;
  name: string;
  mmsi: string;
  lat: number;
  lon: number;
  speed: number;
  heading: number;
  type: 'Cargo' | 'Tanker' | 'Fishing' | 'Military' | 'Passenger';
  destination: string;
  flag: string;
}

export interface SubmarineCable {
  id: string;
  name: string;
  coordinates: [number, number][];
  length_km: number;
  capacity: string;
  year_deployed: number;
  owner: string;
}

export interface PiracyZone {
  id: string;
  name: string;
  lat: number;
  lon: number;
  radius: number;
  risk_level: 'high' | 'medium' | 'low';
  recent_incidents: number;
  description: string;
}

export interface ProtectedArea {
  id: string;
  name: string;
  coordinates: [number, number][];
  type: string;
  dark_vessels: DarkVessel[];
}

export interface DarkVessel {
  id: string;
  name: string;
  lat: number;
  lon: number;
  last_seen: string;
}

export interface OceanTemperaturePoint {
  id: string;
  lat: number;
  lon: number;
  temperature_c: number;
  depth_m: number;
}

export interface WeatherBuoy {
  id: string;
  lat: number;
  lon: number;
  wind_speed_knots: number;
  wind_direction: number;
  wave_height_m: number;
  temperature_c: number;
}

export type LayerName = 'ships' | 'cables' | 'piracy' | 'fishing' | 'temperature' | 'weather';

export type VisualMode = 'deepblue' | 'sonar' | 'threat' | 'thermal' | 'satellite';

export interface LayerVisibility {
  ships: boolean;
  cables: boolean;
  piracy: boolean;
  fishing: boolean;
  temperature: boolean;
  weather: boolean;
}
