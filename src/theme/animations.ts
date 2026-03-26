/**
 * InfiniteStreaks — Aurora Design System
 * Animation Tokens
 *
 * Easing curves (for Animated API), durations, spring configs (for Reanimated),
 * and haptic feedback taxonomy.
 *
 * Rules:
 * - All interactive elements MUST have 150ms hover + 300ms press feedback
 * - Use spring physics (Reanimated) for all user-initiated interactions
 * - Use timing (duration+easing) for system-initiated transitions
 */
import { Easing } from 'react-native';
import {
  withSpring,
  WithSpringConfig,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

// ─── Easing Curves (for Animated API / withTiming) ──────────────────────────
export const ISEasing = {
  /** Spring overshoot — buttons, cards, interactive bounce. Overshoot at 1.275 */
  spring: Easing.bezier(0.175, 0.885, 0.32, 1.275),
  /** Smooth Material standard — page transitions, opacity fades */
  smooth: Easing.bezier(0.4, 0, 0.2, 1),
  /** Decelerate — elements entering viewport (slide in, notifications) */
  decelerate: Easing.bezier(0, 0, 0.2, 1),
  /** Accelerate — elements leaving viewport (swipe off, closing) */
  accelerate: Easing.bezier(0.4, 0, 1, 1),
  /** Sharp — toggle switches, checkboxes, quick state changes */
  sharp: Easing.bezier(0.4, 0, 0.6, 1),
} as const;

// ─── Durations ──────────────────────────────────────────────────────────────
export const Duration = {
  /** 100ms — Checkbox fill, toggle state. Below perception threshold. */
  instant: 100,
  /** 150ms — Hover feedback. MANDATORY for all interactive elements. */
  fast: 150,
  /** 300ms — Press feedback + standard transitions. MANDATORY press response. */
  normal: 300,
  /** 500ms — Streak counter roll, cross-fade transitions. */
  slow: 500,
  /** 800ms — Failure shatter, confetti explosion. Emotional impact. */
  dramatic: 800,
  /** 1200ms — Full milestone celebration animation cycle. */
  celebration: 1200,
} as const;

// ─── Spring Configs (for Reanimated withSpring) ─────────────────────────────
export const SpringConfig = {
  /** Default: balanced bounce for cards, buttons, standard interactions */
  default: {
    damping: 20,
    stiffness: 200,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  } satisfies WithSpringConfig,

  /** Snappy: toggle switches, swipe-to-complete snap back, gesture release */
  snappy: {
    damping: 30,
    stiffness: 400,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  } satisfies WithSpringConfig,

  /** Gentle: hero animations, streak counter entrance, modal appearing */
  gentle: {
    damping: 14,
    stiffness: 120,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  } satisfies WithSpringConfig,

  /** Bouncy: confetti particles, celebration effects, restart button */
  bouncy: {
    damping: 10,
    stiffness: 150,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  } satisfies WithSpringConfig,
} as const;

// ─── Timing Presets (for Reanimated withTiming) ─────────────────────────────
export const TimingPresets = {
  /** Quick hover feedback: 150ms smooth */
  hoverFeedback: {
    duration: Duration.fast,
    easing: ISEasing.smooth,
  } satisfies WithTimingConfig,

  /** Standard press feedback: 300ms spring */
  pressFeedback: {
    duration: Duration.normal,
    easing: ISEasing.spring,
  } satisfies WithTimingConfig,

  /** Page transition: 300ms smooth */
  pageTransition: {
    duration: Duration.normal,
    easing: ISEasing.smooth,
  } satisfies WithTimingConfig,

  /** Element enter: 300ms decelerate */
  enter: {
    duration: Duration.normal,
    easing: ISEasing.decelerate,
  } satisfies WithTimingConfig,

  /** Element exit: 200ms accelerate */
  exit: {
    duration: 200,
    easing: ISEasing.accelerate,
  } satisfies WithTimingConfig,

  /** Dramatic effect: 800ms smooth */
  dramatic: {
    duration: Duration.dramatic,
    easing: ISEasing.smooth,
  } satisfies WithTimingConfig,
} as const;

// ─── Haptic Feedback ────────────────────────────────────────────────────────
/**
 * Haptic feedback taxonomy. Use these functions instead of
 * calling Haptics directly to maintain consistency.
 */
export const ISHaptics = {
  /** Positive confirmation: habit completed, streak continued */
  confirm: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),

  /** Rejection: streak broken, failed validation, destructive action */
  reject: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),

  /** Warning: streak at risk, approaching deadline */
  warn: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),

  /** Light tick: picker scroll, drag movement, incrementing steppers */
  tick: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),

  /** Medium impact: button press, selection change */
  impact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),

  /** Heavy impact: drag-to-reorder lift, long-press menu open */
  heavyClick: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),

  /** Selection change: toggling options, scrolling through values */
  selection: () => Haptics.selectionAsync(),
} as const;
