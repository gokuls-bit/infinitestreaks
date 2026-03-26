/**
 * Aurora Design System — Barrel Export
 *
 * Single import for all theme tokens:
 * import { useTheme, ThemeProvider, Typography, Spacing } from '@/theme';
 */

// Theme Provider & Hook
export { ThemeProvider, useTheme } from './ThemeProvider';
export type { ThemeMode, ISTheme } from './ThemeProvider';

// Color Tokens
export {
  BrandColors,
  StreakColors,
  SemanticColors,
  DarkSurfaces,
  LightSurfaces,
  AmoledSurfaces,
  DarkTextColors,
  LightTextColors,
  StateOverlays,
  Glows,
  getStreakColor,
  PrismaticGradient,
} from './colors';

// Typography Tokens
export {
  FontFamily,
  Typography,
  TextDisplay,
  TextStreakNumber,
  TextHeading1,
  TextHeading2,
  TextHeading3,
  TextBody,
  TextBodyMedium,
  TextCaption,
  TextLabel,
} from './typography';
export type { TypographyKey } from './typography';

// Spacing, Radius, Elevation, Size Tokens
export {
  Spacing,
  Radius,
  Elevation,
  Size,
} from './spacing';

// Animation Tokens
export {
  ISEasing,
  Duration,
  SpringConfig,
  TimingPresets,
  ISHaptics,
} from './animations';
