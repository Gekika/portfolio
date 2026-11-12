export interface LatLng {
  lat: number;
  lng: number;
}

export const CITIES = {
  nairobi: { lat: -1.2864, lng: 36.8172 },
  london: { lat: 51.5074, lng: -0.1278 },
  frankfurt: { lat: 50.1109, lng: 8.6821 },
  newYork: { lat: 40.7128, lng: -74.006 },
  sanFrancisco: { lat: 37.7749, lng: -122.4194 },
  saoPaulo: { lat: -23.5505, lng: -46.6333 },
  lagos: { lat: 6.5244, lng: 3.3792 },
  cairo: { lat: 30.0444, lng: 31.2357 },
  johannesburg: { lat: -26.2041, lng: 28.0473 },
  dubai: { lat: 25.2048, lng: 55.2708 },
  mumbai: { lat: 19.076, lng: 72.8777 },
  singapore: { lat: 1.3521, lng: 103.8198 },
  tokyo: { lat: 35.6762, lng: 139.6503 },
  sydney: { lat: -33.8688, lng: 151.2093 },
} satisfies Record<string, LatLng>;

export type CityName = keyof typeof CITIES;

export const LINKS: [CityName, CityName][] = [
  // Nairobi to the world
  ['nairobi', 'london'],
  ['nairobi', 'frankfurt'],
  ['nairobi', 'dubai'],
  ['nairobi', 'mumbai'],
  ['nairobi', 'johannesburg'],
  ['nairobi', 'lagos'],
  ['nairobi', 'cairo'],
  ['nairobi', 'singapore'],
  ['nairobi', 'newYork'],
  // The rest of the web
  ['london', 'newYork'],
  ['newYork', 'sanFrancisco'],
  ['london', 'mumbai'],
  ['frankfurt', 'dubai'],
  ['saoPaulo', 'lagos'],
  ['singapore', 'tokyo'],
  ['sydney', 'singapore'],
  ['sanFrancisco', 'tokyo'],
  ['cairo', 'frankfurt'],
  ['johannesburg', 'saoPaulo'],
];