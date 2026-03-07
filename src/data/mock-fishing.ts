import { ProtectedArea } from '@/types';

export const mockProtectedAreas: ProtectedArea[] = [
  {
    id: 'f001',
    name: 'Galápagos Marine Reserve',
    coordinates: [
      [-92.5, 1.5], [-89.5, 1.5], [-89.5, -1.5], [-92.5, -1.5], [-92.5, 1.5]
    ],
    type: 'UNESCO World Heritage',
    dark_vessels: [
      { id: 'dv001', name: 'Hua Li 8', lat: -0.5, lon: -90.8, last_seen: '2024-01-15T08:23:00Z' },
      { id: 'dv002', name: 'Fu Yuan Yu 831', lat: 0.2, lon: -91.3, last_seen: '2024-01-14T16:45:00Z' },
    ],
  },
  {
    id: 'f002',
    name: 'Great Barrier Reef Marine Park',
    coordinates: [
      [142.5, -10.5], [153.5, -10.5], [153.5, -24.5], [142.5, -24.5], [142.5, -10.5]
    ],
    type: 'Marine National Park',
    dark_vessels: [
      { id: 'dv003', name: 'Lucky Dragon 5', lat: -18.3, lon: 147.8, last_seen: '2024-01-16T12:10:00Z' },
    ],
  },
  {
    id: 'f003',
    name: 'Papahānaumokuākea Marine National Monument',
    coordinates: [
      [-180.0, 30.0], [-161.0, 30.0], [-161.0, 20.0], [-180.0, 20.0], [-180.0, 30.0]
    ],
    type: 'Marine National Monument',
    dark_vessels: [
      { id: 'dv004', name: 'Chin Yu 88', lat: 25.5, lon: -172.3, last_seen: '2024-01-13T09:30:00Z' },
      { id: 'dv005', name: 'Xin Shi Ji', lat: 23.8, lon: -168.7, last_seen: '2024-01-12T21:15:00Z' },
    ],
  },
  {
    id: 'f004',
    name: 'Chagos Marine Protected Area',
    coordinates: [
      [69.0, -4.0], [75.0, -4.0], [75.0, -9.0], [69.0, -9.0], [69.0, -4.0]
    ],
    type: 'Marine Protected Area',
    dark_vessels: [
      { id: 'dv006', name: 'Poseidon F3', lat: -6.5, lon: 72.4, last_seen: '2024-01-17T03:45:00Z' },
    ],
  },
  {
    id: 'f005',
    name: 'Ross Sea Marine Protected Area',
    coordinates: [
      [160.0, -60.0], [-150.0, -60.0], [-150.0, -85.0], [160.0, -85.0], [160.0, -60.0]
    ],
    type: 'Marine Protected Area',
    dark_vessels: [
      { id: 'dv007', name: 'Antarctic Hunter', lat: -70.2, lon: -175.8, last_seen: '2024-01-10T15:00:00Z' },
      { id: 'dv008', name: 'South Sea Dragon', lat: -72.5, lon: 170.3, last_seen: '2024-01-09T08:20:00Z' },
    ],
  },
];
