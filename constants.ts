import { BackgroundOption, MockupStyle } from './types';

export const MOCKUP_STYLES: MockupStyle[] = [
  { id: 'default', name: 'Default', previewUrl: 'https://shots.so/mockups/Screenshot/styles/default.png' },
  { id: 'glass-light', name: 'Glass Light', previewUrl: 'https://shots.so/mockups/Screenshot/styles/glass-light.png' },
  { id: 'glass-dark', name: 'Glass Dark', previewUrl: 'https://shots.so/mockups/Screenshot/styles/glass-dark.png' },
  { id: 'liquid-glass', name: 'Liquid Glass', previewUrl: 'https://shots.so/mockups/Screenshot/styles/liquid-glass.png' },
  { id: 'inset-light', name: 'Inset Light', previewUrl: 'https://shots.so/mockups/Screenshot/styles/inset-light.png' },
  { id: 'inset-dark', name: 'Inset Dark', previewUrl: 'https://shots.so/mockups/Screenshot/styles/inset-dark.png' },
  { id: 'outline', name: 'Outline', previewUrl: 'https://shots.so/mockups/Screenshot/styles/outline.png' },
  { id: 'border', name: 'Border', previewUrl: 'https://shots.so/mockups/Screenshot/styles/border.png' },
];

export const SOLID_BACKGROUNDS: BackgroundOption[] = [
  { id: 'solid-1', type: 'solid', value: '#ffffff' },
  { id: 'solid-2', type: 'solid', value: '#f4f4f5' },
  { id: 'solid-3', type: 'solid', value: '#a1a1aa' },
  { id: 'solid-4', type: 'solid', value: '#52525b' },
  { id: 'solid-5', type: 'solid', value: '#18181b' },
  { id: 'solid-6', type: 'solid', value: '#000000' },
  { id: 'solid-7', type: 'solid', value: '#ef4444' },
  { id: 'solid-8', type: 'solid', value: '#3b82f6' },
];

export const GRADIENT_BACKGROUNDS: BackgroundOption[] = [
  { id: 'grad-1', type: 'gradient', value: 'linear-gradient(140deg, #ff6432 12.8%, #ff0065 43.52%, #7b2eff 84.34%)' },
  { id: 'grad-2', type: 'gradient', value: 'linear-gradient(140deg, #f4e5f0, #e536ab, #5c03bc, #0e0725)' },
  { id: 'grad-3', type: 'gradient', value: 'linear-gradient(135deg, #eeddf3, #ee92b1, #6330b4)' },
  { id: 'grad-4', type: 'gradient', value: 'linear-gradient(113.96deg, #45BEE8 13.54%, #D6A1AC 50%, #E88C5D 85.42%)' },
  { id: 'grad-5', type: 'gradient', value: 'linear-gradient(113.96deg, #45E99F 11.98%, #D5A89B 50%, #E84698 85.42%)' },
  { id: 'grad-6', type: 'gradient', value: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)' },
  { id: 'grad-7', type: 'gradient', value: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)' },
  { id: 'grad-8', type: 'gradient', value: 'linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)' },
];

export const GLASS_BACKGROUNDS: BackgroundOption[] = [
    { id: 'glass-1', type: 'image', value: 'https://shots.so/display-assets/backgrounds/paper-glass/preview/glass-1.jpg' },
    { id: 'glass-2', type: 'image', value: 'https://shots.so/display-assets/backgrounds/paper-glass/preview/glass-2.jpg' },
    { id: 'glass-3', type: 'image', value: 'https://shots.so/display-assets/backgrounds/paper-glass/preview/glass-3.jpg' },
    { id: 'glass-4', type: 'image', value: 'https://shots.so/display-assets/backgrounds/paper-glass/preview/glass-4.jpg' },
    { id: 'glass-5', type: 'image', value: 'https://shots.so/display-assets/backgrounds/paper-glass/preview/glass-5.jpg' },
];

export const COSMIC_BACKGROUNDS: BackgroundOption[] = [
  { id: 'cosmic-1', type: 'gradient', value: 'linear-gradient(to bottom right, #2b1055, #7597de)' },
  { id: 'cosmic-2', type: 'gradient', value: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)' },
  { id: 'cosmic-3', type: 'gradient', value: 'linear-gradient(to right, #654ea3, #eaafc8)' },
  { id: 'cosmic-4', type: 'gradient', value: 'linear-gradient(to right, #000000, #434343)' },
  { id: 'cosmic-5', type: 'gradient', value: 'linear-gradient(to top, #09203f 0%, #537895 100%)' },
];

export const MYSTIC_BACKGROUNDS: BackgroundOption[] = [
    { id: 'mystic-1', type: 'gradient', value: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)' },
    { id: 'mystic-2', type: 'gradient', value: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' },
    { id: 'mystic-3', type: 'gradient', value: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' },
    { id: 'mystic-4', type: 'gradient', value: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)' },
];

export const DESKTOP_BACKGROUNDS: BackgroundOption[] = [
  { id: 'desk-1', type: 'image', value: 'https://shots.so/display-assets/backgrounds/desktop/preview/tahoe-light.jpg' },
  { id: 'desk-2', type: 'image', value: 'https://shots.so/display-assets/backgrounds/desktop/preview/tahoe-dark.jpg' },
  { id: 'desk-3', type: 'image', value: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=200&q=80' },
  { id: 'desk-4', type: 'image', value: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=200&q=80' },
  { id: 'desk-5', type: 'image', value: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80' },
];

export const ABSTRACT_BACKGROUNDS: BackgroundOption[] = [
    { id: 'abs-1', type: 'image', value: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=200&q=80' },
    { id: 'abs-2', type: 'image', value: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=200&q=80' },
    { id: 'abs-3', type: 'image', value: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=200&q=80' },
    { id: 'abs-4', type: 'image', value: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=200&q=80' },
];

export const IMAGE_BACKGROUNDS: BackgroundOption[] = [
    ...GLASS_BACKGROUNDS,
    ...DESKTOP_BACKGROUNDS
];

export interface BackgroundCategory {
    id: string;
    label: string;
    items: BackgroundOption[];
    badge?: string;
    linkText?: string;
    linkUrl?: string;
}

export const BACKGROUND_CATEGORIES: BackgroundCategory[] = [
  { id: 'solid', label: 'Solid', items: SOLID_BACKGROUNDS },
  { id: 'gradient', label: 'Gradient', items: GRADIENT_BACKGROUNDS },
  { id: 'glass', label: 'Glass', items: GLASS_BACKGROUNDS, badge: 'New', linkText: 'By Paper', linkUrl: '#' },
  { id: 'cosmic', label: 'Cosmic', items: COSMIC_BACKGROUNDS },
  { id: 'mystic', label: 'Mystic', items: MYSTIC_BACKGROUNDS },
  { id: 'desktop', label: 'Desktop', items: DESKTOP_BACKGROUNDS },
  { id: 'abstract', label: 'Abstract', items: ABSTRACT_BACKGROUNDS },
];