import { SubmarineCable } from '@/types';

export const mockCables: SubmarineCable[] = [
  {
    id: 'c001',
    name: 'TAT-14',
    coordinates: [
      [-74.0, 40.7], [-40.0, 50.0], [-10.0, 52.0], [0.0, 51.5], [4.0, 52.0]
    ],
    length_km: 15428,
    capacity: '3.2 Tbps',
    year_deployed: 2001,
    owner: 'AT&T / Deutsche Telekom / BT',
  },
  {
    id: 'c002',
    name: 'SEA-ME-WE 3',
    coordinates: [
      [103.8, 1.3], [80.3, 13.1], [53.8, 24.5], [43.7, 12.8],
      [32.5, 29.9], [14.5, 37.0], [5.3, 43.3], [-5.8, 35.8]
    ],
    length_km: 39000,
    capacity: '960 Gbps',
    year_deployed: 1999,
    owner: 'Consortium of 92 telecom companies',
  },
  {
    id: 'c003',
    name: 'FLAG Atlantic-1',
    coordinates: [
      [-74.0, 40.7], [-30.0, 45.0], [0.0, 48.5], [2.3, 48.9]
    ],
    length_km: 14000,
    capacity: '4.8 Tbps',
    year_deployed: 2001,
    owner: 'Reliance Globalcom',
  },
  {
    id: 'c004',
    name: 'Pacific Crossing',
    coordinates: [
      [-122.3, 37.8], [-160.0, 32.0], [170.0, 35.0], [139.7, 35.7]
    ],
    length_km: 21000,
    capacity: '5.12 Tbps',
    year_deployed: 2000,
    owner: 'Level 3 Communications',
  },
  {
    id: 'c005',
    name: 'APCN-2',
    coordinates: [
      [103.8, 1.3], [110.0, 20.0], [121.5, 25.0], [130.0, 33.0], [139.7, 35.7]
    ],
    length_km: 19800,
    capacity: '2.56 Tbps',
    year_deployed: 2001,
    owner: 'APCN-2 Consortium',
  },
  {
    id: 'c006',
    name: 'SAT-3/WASC',
    coordinates: [
      [-9.1, 38.7], [-17.5, 14.7], [-17.3, 14.7], [-13.7, 9.5],
      [-10.8, 6.4], [-0.2, 5.6], [9.2, 4.0], [13.1, -4.3],
      [14.5, -22.9], [18.4, -33.9]
    ],
    length_km: 14350,
    capacity: '120 Gbps',
    year_deployed: 2002,
    owner: 'SAT-3/WASC Consortium',
  },
  {
    id: 'c007',
    name: 'EASSy',
    coordinates: [
      [31.0, 29.9], [39.3, 15.3], [43.1, 11.6], [45.3, -2.0],
      [40.2, -19.8], [35.5, -25.9], [32.6, -25.9], [18.4, -33.9]
    ],
    length_km: 10000,
    capacity: '10 Tbps',
    year_deployed: 2010,
    owner: 'EASSy Consortium',
  },
  {
    id: 'c008',
    name: 'Southern Cross',
    coordinates: [
      [-118.2, 34.0], [-155.0, 20.0], [174.8, -37.0], [153.0, -27.5]
    ],
    length_km: 30500,
    capacity: '20 Tbps',
    year_deployed: 2000,
    owner: 'Southern Cross Cables Limited',
  },
  {
    id: 'c009',
    name: 'Asia-America Gateway',
    coordinates: [
      [-118.2, 34.0], [-145.0, 30.0], [170.0, 25.0], [155.0, 20.0],
      [130.0, 20.0], [120.0, 15.0], [103.8, 1.3]
    ],
    length_km: 20000,
    capacity: '2.88 Tbps',
    year_deployed: 2009,
    owner: 'Asia America Gateway Consortium',
  },
  {
    id: 'c010',
    name: 'WACS',
    coordinates: [
      [-9.1, 38.7], [-17.5, 14.7], [-14.9, 10.7], [-13.5, 9.5],
      [-10.8, 6.3], [-0.2, 5.6], [2.5, 6.4], [9.5, 4.1],
      [13.1, -4.3], [12.4, -15.5], [13.5, -22.9], [18.4, -33.9]
    ],
    length_km: 14530,
    capacity: '5.12 Tbps',
    year_deployed: 2012,
    owner: 'WACS Consortium',
  },
  {
    id: 'c011',
    name: 'MAREA',
    coordinates: [
      [-77.0, 38.9], [-40.0, 45.0], [-15.0, 48.0], [-9.1, 38.7]
    ],
    length_km: 6600,
    capacity: '200 Tbps',
    year_deployed: 2017,
    owner: 'Microsoft / Facebook',
  },
];
