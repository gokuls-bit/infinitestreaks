/**
 * InfiniteStreaks — Aurora Design System
 * Typography Tokens
 *
 * Font stack: Syne (display), Inter (UI), JetBrains Mono (data)
 * All sizes in logical pixels for RN density-independence.
 */
import { TextStyle, Platform } from 'react-native';

// ─── Font Families ──────────────────────────────────────────────────────────
/**
 * Font family constants.
 * Fonts must be loaded at app startup via expo-font before use.
 * See src/hooks/useLoadFonts.ts for the loading implementation.
 */
export const FontFamily = {
  /** Display: hero numbers, app branding (Syne Variable 800w) */
  display: 'Syne-Bold',
  /** UI: all headings, body text, interface elements */
  base: Platform.select({
    ios: 'Inter',
    android: 'Inter-Regular',
    default: 'Inter',
  }) as string,
  baseMedium: Platform.select({
    ios: 'Inter-Medium',
    android: 'Inter-Medium',
    default: 'Inter',
  }) as string,
  baseSemiBold: Platform.select({
    ios: 'Inter-SemiBold',
    android: 'Inter-SemiBold',
    default: 'Inter',
  }) as string,
  baseBold: Platform.select({
    ios: 'Inter-Bold',
    android: 'Inter-Bold',
    default: 'Inter',
  }) as string,
  /** Data: streak numbers, stats, counters (tabular nums for animation) */
  mono: 'JetBrainsMono-Bold',
  monoRegular: 'JetBrainsMono-Regular',
} as const;

// ─── Type Scale ─────────────────────────────────────────────────────────────

/**
 * Display: Streak counter hero text.
 * Usage: The single most important number on screen — hero streak count on dashboard.
 * Max 5 digits before scaling down.
 */
export const TextDisplay: TextStyle = {
  fontFamily: FontFamily.display,
  fontSize: 48,
  lineHeight: 52,
  fontWeight: '700',
  letterSpacing: -1.5,
};

/**
 * Streak Number: Monospace hero stat.
 * Usage: Large streak display using monospace for stable width during roll animations.
 */
export const TextStreakNumber: TextStyle = {
  fontFamily: FontFamily.mono,
  fontSize: 64,
  lineHeight: 68,
  fontWeight: '700',
  letterSpacing: -2,
  fontVariant: ['tabular-nums'],
};

/**
 * Heading 1: Screen titles.
 * Usage: One per screen max. Examples: "Today's Habits", "Your Stats", "Profile".
 */
export const TextHeading1: TextStyle = {
  fontFamily: FontFamily.baseSemiBold,
  fontSize: 28,
  lineHeight: 34,
  fontWeight: '600',
  letterSpacing: -0.5,
};

/**
 * Heading 2: Section titles within screens.
 * Usage: Habit category headers, stats section titles, settings groups.
 */
export const TextHeading2: TextStyle = {
  fontFamily: FontFamily.baseSemiBold,
  fontSize: 22,
  lineHeight: 28,
  fontWeight: '600',
  letterSpacing: -0.25,
};

/**
 * Heading 3: Sub-section titles.
 * Usage: Card titles, dialog headings, inline section titles.
 */
export const TextHeading3: TextStyle = {
  fontFamily: FontFamily.baseSemiBold,
  fontSize: 18,
  lineHeight: 24,
  fontWeight: '600',
  letterSpacing: 0,
};

/**
 * Body: Primary content text.
 * Usage: Descriptions, onboarding copy, settings explanations, dialog content.
 */
export const TextBody: TextStyle = {
  fontFamily: FontFamily.base,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  letterSpacing: 0,
};

/**
 * Body Medium: Emphasized body text.
 * Usage: Habit names in cards, selected states, button labels.
 */
export const TextBodyMedium: TextStyle = {
  fontFamily: FontFamily.baseMedium,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '500',
  letterSpacing: 0,
};

/**
 * Caption: Secondary information.
 * Usage: Timestamps, metadata, helper text, streak "X days" labels beneath counters.
 */
export const TextCaption: TextStyle = {
  fontFamily: FontFamily.base,
  fontSize: 13,
  lineHeight: 18,
  fontWeight: '400',
  letterSpacing: 0.1,
};

/**
 * Label: Uppercase micro-labels.
 * Usage: Tab bar labels, badge text, category tags, stat labels.
 * ALWAYS apply .toUpperCase() on the text string.
 */
export const TextLabel: TextStyle = {
  fontFamily: FontFamily.baseMedium,
  fontSize: 11,
  lineHeight: 14,
  fontWeight: '500',
  letterSpacing: 1.2,
  textTransform: 'uppercase',
};

// ─── Convenience Map ────────────────────────────────────────────────────────
export const Typography = {
  display: TextDisplay,
  streakNumber: TextStreakNumber,
  heading1: TextHeading1,
  heading2: TextHeading2,
  heading3: TextHeading3,
  body: TextBody,
  bodyMedium: TextBodyMedium,
  caption: TextCaption,
  label: TextLabel,
} as const;

export type TypographyKey = keyof typeof Typography;
