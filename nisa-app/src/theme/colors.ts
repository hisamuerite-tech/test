export const colors = {
  // Primary
  primaryOrange: '#FF8C42',
  lightOrange: '#FFB380',
  orangeDeep: '#FF6B1A',

  // Blue
  skyBlue: '#7EC8E3',
  lightBlue: '#C5E8F7',
  blueMid: '#4A9FB5',

  // Backgrounds
  beige: '#F5E6D3',
  warmBeige: '#FFF8F0',
  background: '#FAFAFA',
  card: '#FFFFFF',
  orangeLight: '#FFF0E6',

  // Text
  textDark: '#2D2D2D',
  textMid: '#5A5A5A',
  textLight: '#9B9B9B',

  // Status
  successGreen: '#5CBF8A',
  successLight: '#E8F8F0',
  warning: '#FFD166',
  warningLight: '#FFF8E6',
  error: '#E05A5A',
  errorLight: '#FFE8E8',

  // Misc
  border: '#F0F0F0',
  overlay: 'rgba(0,0,0,0.5)',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;
