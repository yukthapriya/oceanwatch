import { Ship } from '@/types';

export const mockShips: Ship[] = [
  // Strait of Malacca
  { id: 's001', name: 'MV Pacific Star', mmsi: '477123456', lat: 1.35, lon: 103.82, speed: 12.5, heading: 315, type: 'Cargo', destination: 'Singapore', flag: 'Panama' },
  { id: 's002', name: 'MT Golden Dragon', mmsi: '477234567', lat: 2.1, lon: 102.5, speed: 10.2, heading: 135, type: 'Tanker', destination: 'Port Klang', flag: 'Liberia' },
  { id: 's003', name: 'FV Sea Harvest', mmsi: '525987654', lat: 1.8, lon: 104.2, speed: 6.3, heading: 90, type: 'Fishing', destination: 'Batam', flag: 'Indonesia' },
  { id: 's004', name: 'MV Asian Express', mmsi: '566345678', lat: 3.5, lon: 101.8, speed: 14.1, heading: 300, type: 'Cargo', destination: 'Penang', flag: 'Singapore' },
  { id: 's005', name: 'MT Horizon Bay', mmsi: '636543210', lat: 1.05, lon: 104.8, speed: 11.8, heading: 270, type: 'Tanker', destination: 'Batangas', flag: 'Marshall Islands' },

  // South China Sea
  { id: 's006', name: 'MV South Wind', mmsi: '412567890', lat: 15.5, lon: 115.3, speed: 13.2, heading: 45, type: 'Cargo', destination: 'Shanghai', flag: 'China' },
  { id: 's007', name: 'MT Pearl River', mmsi: '412678901', lat: 18.2, lon: 118.7, speed: 9.5, heading: 0, type: 'Tanker', destination: 'Tianjin', flag: 'Hong Kong' },
  { id: 's008', name: 'MV Manila Star', mmsi: '548012345', lat: 14.8, lon: 120.5, speed: 15.3, heading: 225, type: 'Passenger', destination: 'Cebu', flag: 'Philippines' },
  { id: 's009', name: 'FV Ocean Hunter', mmsi: '412789012', lat: 12.3, lon: 114.2, speed: 5.8, heading: 180, type: 'Fishing', destination: 'Hainan', flag: 'China' },
  { id: 's010', name: 'MV Dragon Gate', mmsi: '412890123', lat: 20.1, lon: 110.5, speed: 16.2, heading: 30, type: 'Cargo', destination: 'Hong Kong', flag: 'China' },

  // Suez Canal / Red Sea
  { id: 's011', name: 'MV Suez Carrier', mmsi: '622112233', lat: 30.2, lon: 32.5, speed: 7.5, heading: 330, type: 'Cargo', destination: 'Port Said', flag: 'Egypt' },
  { id: 's012', name: 'MT Arabian Gulf', mmsi: '447223344', lat: 27.8, lon: 34.2, speed: 11.1, heading: 150, type: 'Tanker', destination: 'Jeddah', flag: 'Saudi Arabia' },
  { id: 's013', name: 'MV Red Sea Star', mmsi: '403334455', lat: 24.5, lon: 37.8, speed: 12.3, heading: 180, type: 'Cargo', destination: 'Djibouti', flag: 'Bahamas' },
  { id: 's014', name: 'MT Hormuz Prince', mmsi: '422445566', lat: 26.3, lon: 56.2, speed: 13.7, heading: 270, type: 'Tanker', destination: 'Fujairah', flag: 'Iran' },
  { id: 's015', name: 'MV Mediterranean', mmsi: '255556677', lat: 31.5, lon: 31.8, speed: 8.9, heading: 270, type: 'Cargo', destination: 'Alexandria', flag: 'Greece' },

  // English Channel
  { id: 's016', name: 'MV Channel Breeze', mmsi: '235667788', lat: 50.8, lon: 1.5, speed: 14.5, heading: 45, type: 'Cargo', destination: 'Rotterdam', flag: 'UK' },
  { id: 's017', name: 'MT North Sea', mmsi: '245778899', lat: 51.2, lon: 2.1, speed: 12.8, heading: 60, type: 'Tanker', destination: 'Antwerp', flag: 'Netherlands' },
  { id: 's018', name: 'MV Dover Star', mmsi: '235889900', lat: 51.1, lon: 1.3, speed: 11.2, heading: 225, type: 'Passenger', destination: 'Calais', flag: 'UK' },
  { id: 's019', name: 'MV Nordic Spirit', mmsi: '219990011', lat: 52.5, lon: 4.1, speed: 9.3, heading: 315, type: 'Cargo', destination: 'Hamburg', flag: 'Denmark' },
  { id: 's020', name: 'MT British Viking', mmsi: '235001122', lat: 50.3, lon: 0.8, speed: 10.7, heading: 180, type: 'Tanker', destination: 'Southampton', flag: 'UK' },

  // Gulf of Mexico
  { id: 's021', name: 'MV Gulf Pioneer', mmsi: '367112233', lat: 25.5, lon: -89.3, speed: 13.1, heading: 0, type: 'Cargo', destination: 'New Orleans', flag: 'USA' },
  { id: 's022', name: 'MT Texas Eagle', mmsi: '367223344', lat: 27.8, lon: -94.5, speed: 11.5, heading: 270, type: 'Tanker', destination: 'Houston', flag: 'USA' },
  { id: 's023', name: 'MV Caribbean Queen', mmsi: '369334455', lat: 23.2, lon: -86.7, speed: 15.8, heading: 45, type: 'Passenger', destination: 'Cozumel', flag: 'Bahamas' },
  { id: 's024', name: 'FV Mako Hunter', mmsi: '367445566', lat: 26.1, lon: -92.3, speed: 4.2, heading: 90, type: 'Fishing', destination: 'Galveston', flag: 'USA' },
  { id: 's025', name: 'MT Gulf Stream', mmsi: '368556677', lat: 24.8, lon: -88.1, speed: 12.4, heading: 135, type: 'Tanker', destination: 'Tampa', flag: 'USA' },

  // Atlantic Ocean
  { id: 's026', name: 'MV Atlantic Voyager', mmsi: '311667788', lat: 35.2, lon: -45.8, speed: 18.5, heading: 90, type: 'Cargo', destination: 'New York', flag: 'Bermuda' },
  { id: 's027', name: 'MV Queen of the Seas', mmsi: '235778899', lat: 42.1, lon: -30.5, speed: 22.3, heading: 270, type: 'Passenger', destination: 'Southampton', flag: 'UK' },
  { id: 's028', name: 'MT Atlantic Eagle', mmsi: '212889900', lat: 48.3, lon: -20.2, speed: 15.7, heading: 315, type: 'Tanker', destination: 'Le Havre', flag: 'France' },
  { id: 's029', name: 'MV Maersk Boston', mmsi: '219990011', lat: 38.5, lon: -60.3, speed: 19.2, heading: 45, type: 'Cargo', destination: 'Halifax', flag: 'Denmark' },
  { id: 's030', name: 'MT Energy Leader', mmsi: '477001122', lat: 30.1, lon: -70.5, speed: 14.3, heading: 60, type: 'Tanker', destination: 'Freeport', flag: 'Liberia' },

  // Indian Ocean
  { id: 's031', name: 'MV Indian Star', mmsi: '419112233', lat: -10.5, lon: 65.3, speed: 16.2, heading: 45, type: 'Cargo', destination: 'Mumbai', flag: 'India' },
  { id: 's032', name: 'MT Oman Sunrise', mmsi: '461223344', lat: 5.8, lon: 55.7, speed: 12.8, heading: 315, type: 'Tanker', destination: 'Muscat', flag: 'Oman' },
  { id: 's033', name: 'MV Bay of Bengal', mmsi: '419334455', lat: 12.5, lon: 82.3, speed: 14.1, heading: 270, type: 'Cargo', destination: 'Chennai', flag: 'India' },
  { id: 's034', name: 'FV Southern Cross', mmsi: '503445566', lat: -25.3, lon: 80.5, speed: 7.8, heading: 180, type: 'Fishing', destination: 'Fremantle', flag: 'Australia' },
  { id: 's035', name: 'MT VLCC Titan', mmsi: '477556677', lat: -5.2, lon: 55.8, speed: 10.5, heading: 90, type: 'Tanker', destination: 'Singapore', flag: 'Marshall Islands' },

  // Pacific Ocean
  { id: 's036', name: 'MV Pacific Horizon', mmsi: '367667788', lat: 20.5, lon: -150.3, speed: 17.3, heading: 270, type: 'Cargo', destination: 'Los Angeles', flag: 'USA' },
  { id: 's037', name: 'MV Transpacific', mmsi: '412778899', lat: 35.2, lon: 165.7, speed: 20.1, heading: 90, type: 'Cargo', destination: 'Tokyo', flag: 'Japan' },
  { id: 's038', name: 'MT Pacific Arrow', mmsi: '503889900', lat: -15.8, lon: -140.5, speed: 13.9, heading: 225, type: 'Tanker', destination: 'Sydney', flag: 'Australia' },
  { id: 's039', name: 'MV Australia Carrier', mmsi: '503990011', lat: -30.2, lon: 155.8, speed: 16.5, heading: 0, type: 'Cargo', destination: 'Brisbane', flag: 'Australia' },
  { id: 's040', name: 'FV Pacific Fisher', mmsi: '432001122', lat: 45.3, lon: 155.2, speed: 5.3, heading: 180, type: 'Fishing', destination: 'Hokkaido', flag: 'Japan' },

  // Gulf of Aden
  { id: 's041', name: 'MV Aden Guardian', mmsi: '403112233', lat: 11.5, lon: 47.8, speed: 15.1, heading: 270, type: 'Cargo', destination: 'Aden', flag: 'Yemen' },
  { id: 's042', name: 'MT Somalia Bypass', mmsi: '622223344', lat: 10.2, lon: 50.3, speed: 17.5, heading: 315, type: 'Tanker', destination: 'Djibouti', flag: 'Panama' },
  { id: 's043', name: 'MV East Africa', mmsi: '677334455', lat: 8.7, lon: 44.5, speed: 12.3, heading: 90, type: 'Cargo', destination: 'Mogadishu', flag: 'Kenya' },
  { id: 's044', name: 'HMS Sheffield', mmsi: '232445566', lat: 12.8, lon: 45.2, speed: 18.5, heading: 45, type: 'Military', destination: 'Classified', flag: 'UK' },
  { id: 's045', name: 'USS Arleigh Burke', mmsi: '338556677', lat: 11.1, lon: 43.8, speed: 22.5, heading: 270, type: 'Military', destination: 'Classified', flag: 'USA' },

  // Mediterranean Sea
  { id: 's046', name: 'MV Med Express', mmsi: '248667788', lat: 36.8, lon: 14.5, speed: 13.8, heading: 90, type: 'Cargo', destination: 'Valletta', flag: 'Malta' },
  { id: 's047', name: 'MT Adriatic Star', mmsi: '247778899', lat: 38.5, lon: 16.2, speed: 11.2, heading: 135, type: 'Tanker', destination: 'Taranto', flag: 'Italy' },
  { id: 's048', name: 'MV Poseidon', mmsi: '240889900', lat: 37.2, lon: 22.8, speed: 16.3, heading: 45, type: 'Passenger', destination: 'Piraeus', flag: 'Greece' },
  { id: 's049', name: 'MV Bosphorus', mmsi: '271990011', lat: 41.1, lon: 29.0, speed: 9.8, heading: 0, type: 'Cargo', destination: 'Istanbul', flag: 'Turkey' },
  { id: 's050', name: 'MT Libya Star', mmsi: '622001122', lat: 33.5, lon: 13.8, speed: 10.3, heading: 315, type: 'Tanker', destination: 'Tripoli', flag: 'Libya' },
];
