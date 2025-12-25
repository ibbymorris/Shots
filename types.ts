export interface MockupStyle {
  id: string;
  name: string;
  previewUrl: string;
}

export interface BackgroundOption {
  id: string;
  type: 'solid' | 'gradient' | 'image' | 'unsplash';
  value: string;
  name?: string;
}

export interface AppState {
  selectedStyle: string;
  borderRadius: number;
  shadowOpacity: number;
  background: BackgroundOption;
  zoom: number;
  uploadedImage: string | null;
  borderType: 'sharp' | 'curved' | 'round';
}

export enum BorderType {
  Sharp = 'sharp',
  Curved = 'curved',
  Round = 'round'
}
