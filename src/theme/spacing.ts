/**
 * InfiniteStreaks — Aurora Design System
 * Spacing, Radius, Elevation & Size Tokens
 *
 * Base unit: 4px. All values in logical pixels.
 */

// ─── Spacing Scale (4px base) ───────────────────────────────────────────────
export const Spacing = {
  /** 4px — Inline icon-to-text gaps, tight badge padding */
  xxs: 4,
  /** 8px — Related elements within a component */
  xs: 8,
  /** 12px — Card internal padding (vertical) */
  sm: 12,
  /** 16px — Default: screen margins, card padding (horizontal), list item gap */
  md: 16,
  /** 20px — Comfortable card padding, card group gaps */
  lg: 20,
  /** 24px — Section separators, modal padding */
  xl: 24,
  /** 32px — Major section breaks */
  xxl: 32,
  /** 40px — Header bottom padding */
  xxxl: 40,
  /** 48px — Touch target height, nav bar height */
  xxxxl: 48,
  /** 64px — Hero section spacing only */
  xxxxxl: 64,
} as const;

// ─── Border Radius ──────────────────────────────────────────────────────────
export const Radius = {
  /** 0px — Full-width dividers, flat elements */
  none: 0,
  /** 8px — Buttons, inputs, chips, inline tags */
  sm: 8,
  /** 16px — Cards, modals, bottom sheets, notifications */
  md: 16,
  /** 24px — Hero/featured cards, prominent CTAs */
  lg: 24,
  /** 9999px — Avatars, pill badges, circular icon buttons */
  full: 9999,
} as const;

// ─── Elevation (Shadows) ────────────────────────────────────────────────────
export const Elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  /** Subtle lift — cards resting on surface */
  low: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  /** Clear elevation — dropdowns, FABs, popovers */
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 16,
    elevation: 4,
  },
  /** Strong elevation — modals, full-screen overlays */
  high: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.30,
    shadowRadius: 32,
    elevation: 8,
  },
} as const;

// ─── Component Sizes ────────────────────────────────────────────────────────
export const Size = {
  touch: {
    /** 44px — Apple HIG minimum touch target */
    min: 44,
    /** 48px — Material recommended comfortable target */
    comfortable: 48,
  },
  button: {
    /** 32px — Compact inline actions */
    sm: 32,
    /** 44px — Standard CTA height */
    md: 44,
    /** 56px — Hero/primary CTA height */
    lg: 56,
  },
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },
  avatar: {
    sm: 32,
    md: 40,
    lg: 64,
    xl: 96,
  },
} as const;
