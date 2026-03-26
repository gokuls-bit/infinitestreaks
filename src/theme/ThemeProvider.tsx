/**
 * InfiniteStreaks — Aurora Design System
 * Theme Provider & Context
 *
 * Provides unified theming across the app with support for:
 * - Dark mode (default)
 * - Light mode
 * - AMOLED mode (true black for battery saving)
 * - System preference following
 *
 * Usage:
 *   <ThemeProvider mode="dark">
 *     <App />
 *   </ThemeProvider>
 *
 *   const { colors, surfaces, text, isDark } = useTheme();
 */
import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import {
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
import { Typography, FontFamily } from './typography';
import { Spacing, Radius, Elevation, Size } from './spacing';
import { ISEasing, Duration, SpringConfig, TimingPresets, ISHaptics } from './animations';

// ─── Theme Mode ─────────────────────────────────────────────────────────────
export type ThemeMode = 'system' | 'dark' | 'light' | 'amoled';

// ─── Resolved Theme ─────────────────────────────────────────────────────────
export interface ISTheme {
  mode: ThemeMode;
  isDark: boolean;

  // Colors
  brand: typeof BrandColors;
  streak: typeof StreakColors;
  semantic: typeof SemanticColors;
  surfaces: typeof DarkSurfaces;
  text: typeof DarkTextColors;
  states: typeof StateOverlays;
  glows: typeof Glows;

  // Typography
  typography: typeof Typography;
  fontFamily: typeof FontFamily;

  // Spacing & Layout
  spacing: typeof Spacing;
  radius: typeof Radius;
  elevation: typeof Elevation;
  size: typeof Size;

  // Animation
  easing: typeof ISEasing;
  duration: typeof Duration;
  spring: typeof SpringConfig;
  timing: typeof TimingPresets;
  haptics: typeof ISHaptics;

  // Utilities
  getStreakColor: typeof getStreakColor;
  prismaticGradient: typeof PrismaticGradient;
}

// ─── Build Theme ────────────────────────────────────────────────────────────
function buildTheme(mode: ThemeMode, systemIsDark: boolean): ISTheme {
  const isDark = mode === 'system' ? systemIsDark : mode !== 'light';

  const surfaces = mode === 'amoled'
    ? AmoledSurfaces
    : isDark
      ? DarkSurfaces
      : LightSurfaces;

  const text = isDark ? DarkTextColors : LightTextColors;

  return {
    mode,
    isDark,

    brand: BrandColors,
    streak: StreakColors,
    semantic: SemanticColors,
    surfaces,
    text,
    states: StateOverlays,
    glows: Glows,

    typography: Typography,
    fontFamily: FontFamily,

    spacing: Spacing,
    radius: Radius,
    elevation: Elevation,
    size: Size,

    easing: ISEasing,
    duration: Duration,
    spring: SpringConfig,
    timing: TimingPresets,
    haptics: ISHaptics,

    getStreakColor,
    prismaticGradient: PrismaticGradient,
  };
}

// ─── Context ────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ISTheme>(buildTheme('dark', true));

// ─── Provider ───────────────────────────────────────────────────────────────
interface ThemeProviderProps {
  mode?: ThemeMode;
  children: React.ReactNode;
}

export function ThemeProvider({ mode = 'dark', children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const systemIsDark = systemScheme !== 'light';

  const theme = useMemo(
    () => buildTheme(mode, systemIsDark),
    [mode, systemIsDark]
  );

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────
/**
 * Access the current Aurora theme.
 *
 * @example
 * const { brand, surfaces, typography, spacing, haptics } = useTheme();
 *
 * <View style={{ backgroundColor: surfaces.base, padding: spacing.md }}>
 *   <Text style={[typography.heading1, { color: text.primary }]}>
 *     Dashboard
 *   </Text>
 * </View>
 */
export function useTheme(): ISTheme {
  return useContext(ThemeContext);
}
