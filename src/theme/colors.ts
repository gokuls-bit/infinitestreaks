/**
 * InfiniteStreaks — Aurora Design System
 * Color Tokens
 *
 * Every color in the app must reference these tokens.
 * Raw hex values in feature code are forbidden.
 */

// ─── Brand Palette ──────────────────────────────────────────────────────────
export const BrandColors = {
  /** Primary CTAs, active navigation, interactive elements */
  purple: '#7B5EA7',
  /** Links, secondary actions, info badges, data viz accents */
  electric: '#4F8EF7',
  /** Glows, particle effects, achievement highlights, premium badges */
  neon: '#9B59F5',
} as const;

// ─── Streak Semantic ────────────────────────────────────────────────────────
export const StreakColors = {
  /** 🔥 Active flame — streak is alive */
  active: '#FF6B35',
  /** 💀 Failure red — streak broken. ONLY for failure screen, never general errors */
  broken: '#E53E3E',
  /** 🪦 Cold gray — past/inactive/dead streaks */
  dead: '#4A4A5A',
  /** 🏆 Achievement gold — milestones, legendary status */
  gold: '#FFD60A',
} as const;

// ─── System Semantic ────────────────────────────────────────────────────────
export const SemanticColors = {
  success: '#34D399',
  warning: '#FBBF24',
  error: '#EF4444',
  info: '#60A5FA',
} as const;

// ─── Surface Tokens ─────────────────────────────────────────────────────────
export const DarkSurfaces = {
  base: '#0D0D14',
  raised: '#13131F',
  card: '#1A1A2E',
  glass: 'rgba(255, 255, 255, 0.06)',
  glassBorder: 'rgba(255, 255, 255, 0.10)',
  divider: 'rgba(255, 255, 255, 0.08)',
} as const;

export const LightSurfaces = {
  base: '#F4F4F8',
  raised: '#FFFFFF',
  card: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.72)',
  glassBorder: 'rgba(0, 0, 0, 0.06)',
  divider: 'rgba(0, 0, 0, 0.08)',
} as const;

export const AmoledSurfaces = {
  base: '#000000',
  raised: '#0A0A0A',
  card: '#111111',
  glass: 'rgba(255, 255, 255, 0.04)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  divider: 'rgba(255, 255, 255, 0.06)',
} as const;

// ─── Text Colors ────────────────────────────────────────────────────────────
export const DarkTextColors = {
  primary: '#FFFFFF',
  secondary: 'rgba(255, 255, 255, 0.70)',
  tertiary: 'rgba(255, 255, 255, 0.40)',
  onBrand: '#FFFFFF',
} as const;

export const LightTextColors = {
  primary: '#0D0D14',
  secondary: 'rgba(13, 13, 20, 0.60)',
  tertiary: 'rgba(13, 13, 20, 0.35)',
  onBrand: '#FFFFFF',
} as const;

// ─── Interactive State Overlays ─────────────────────────────────────────────
export const StateOverlays = {
  hover: 'rgba(255, 255, 255, 0.08)',
  pressed: 'rgba(255, 255, 255, 0.12)',
  focused: 'rgba(79, 142, 247, 0.24)',
  dragged: 'rgba(255, 255, 255, 0.16)',
  disabledOpacity: 0.38,
} as const;

// ─── Glow Effects ───────────────────────────────────────────────────────────
export const Glows = {
  /** Orange glow for active streak counter and fire icon */
  streak: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.40,
    shadowRadius: 24,
    elevation: 12,
  },
  /** Purple glow for focused CTA buttons */
  brand: {
    shadowColor: '#7B5EA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  /** Red glow for failure screen elements */
  danger: {
    shadowColor: '#E53E3E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.40,
    shadowRadius: 24,
    elevation: 12,
  },
  /** Gold glow for achievement milestone reveals */
  gold: {
    shadowColor: '#FFD60A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 10,
  },
  /** Purple neon glow for premium features */
  neon: {
    shadowColor: '#9B59F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.40,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

// ─── Streak Counter Color Progression ───────────────────────────────────────
/**
 * Returns the appropriate color for a streak counter based on day count.
 * Days 0–7: Electric Blue (building momentum)
 * Days 7–30: Brand Purple (committed)
 * Days 30–90: Gold (established)
 * Days 90+: Neon (legendary — apply prismatic gradient externally)
 */
export function getStreakColor(days: number): string {
  if (days >= 90) return StreakColors.gold; // Apply prismatic gradient over this
  if (days >= 30) return StreakColors.gold;
  if (days >= 7) return BrandColors.purple;
  return BrandColors.electric;
}

/**
 * Prismatic gradient stops for 90+ day legendary streaks.
 * Use with expo-linear-gradient.
 */
export const PrismaticGradient = {
  colors: ['#9B59F5', '#4F8EF7', '#FF6B35', '#FFD60A', '#9B59F5'],
  locations: [0, 0.25, 0.5, 0.75, 1] as number[],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
} as const;
