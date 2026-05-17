import { Platform } from 'react-native';

export const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 38,
} as const;

export const fontWeight = {
  regular: '400' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
  loose: 1.9,
};

export const typography = {
  h1: { fontSize: fontSize['3xl'], fontWeight: fontWeight.black, lineHeight: fontSize['3xl'] * 1.2 },
  h2: { fontSize: fontSize['2xl'], fontWeight: fontWeight.black, lineHeight: fontSize['2xl'] * 1.3 },
  h3: { fontSize: fontSize.xl, fontWeight: fontWeight.extrabold },
  h4: { fontSize: fontSize.lg, fontWeight: fontWeight.extrabold },
  h5: { fontSize: fontSize.md, fontWeight: fontWeight.bold },
  body: { fontSize: fontSize.base, fontWeight: fontWeight.semibold },
  bodySmall: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold },
  caption: { fontSize: fontSize.xs, fontWeight: fontWeight.bold },
  label: { fontSize: fontSize.xs, fontWeight: fontWeight.extrabold, letterSpacing: 0.5 },
} as const;
