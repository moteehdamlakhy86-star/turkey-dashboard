export interface Place {
  id: number;
  wilaya: string;
  region: string;
  level: 'ولاية' | 'قضاء' | 'بلدة' | 'بلدية';
  qada: string;
  baladiya: string;
  type: string;
  fame: string;
  landmark: string;
  taste: string;
  product: string;
  economy?: string;
  nature?: string;
  climate?: string;
  scope: string;
  src: string;
  mapUrl: string;
  lat: number;
  lon: number;
}

export type ViewMode = 'cards' | 'table' | 'charts';