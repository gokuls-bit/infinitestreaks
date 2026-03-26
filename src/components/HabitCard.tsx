/**
 * InfiniteStreaks — Aurora Design System
 * HabitCard Component
 *
 * Card representing a single habit with states:
 * Default | Completing | Completed | Skipped
 *
 * Features:
 * - Left border accent by state
 * - Emoji + name + streak counter + progress ring
 * - Spring animation on state change
 * - Haptic feedback on tap
 */
import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeProvider';
import { ProgressRing } from './ProgressRing';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type HabitCardState = 'default' | 'completing' | 'completed' | 'skipped';

interface HabitCardProps {
  /** Habit display name */
  name: string;
  /** Emoji icon */
  emoji: string;
  /** Current streak count */
  streakDays: number;
  /** Completion progress for today (0–1) */
  progress: number;
  /** Card state */
  state?: HabitCardState;
  /** "due in X hours" smart timing */
  dueIn?: string;
  /** Tap handler */
  onPress?: () => void;
  /** Long-press handler (context menu) */
  onLongPress?: () => void;
  style?: ViewStyle;
}

export function HabitCard({
  name,
  emoji,
  streakDays,
  progress,
  state = 'default',
  dueIn,
  onPress,
  onLongPress,
  style,
}: HabitCardProps) {
  const theme = useTheme();
  const pressed = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    pressed.value = withTiming(1, { duration: theme.duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    pressed.value = withSpring(0, theme.spring.default);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(pressed.value, [0, 1], [1, 0.97]) },
    ],
  }));

  // State-based styling
  const stateStyles = {
    default: {
      borderLeftWidth: 0,
      borderLeftColor: 'transparent',
      bgOverlay: 'transparent',
      opacity: 1,
    },
    completing: {
      borderLeftWidth: 3,
      borderLeftColor: theme.streak.active,
      bgOverlay: 'rgba(255, 107, 53, 0.06)',
      opacity: 1,
    },
    completed: {
      borderLeftWidth: 3,
      borderLeftColor: theme.semantic.success,
      bgOverlay: 'rgba(52, 211, 153, 0.08)',
      opacity: 1,
    },
    skipped: {
      borderLeftWidth: 3,
      borderLeftColor: theme.streak.dead,
      bgOverlay: 'transparent',
      opacity: 0.6,
    },
  };

  const stateStyle = stateStyles[state];

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card,
        animatedStyle,
        {
          backgroundColor: theme.surfaces.card,
          borderRadius: theme.radius.md,
          borderLeftWidth: stateStyle.borderLeftWidth,
          borderLeftColor: stateStyle.borderLeftColor,
          opacity: stateStyle.opacity,
          padding: theme.spacing.md,
        },
        theme.elevation.low,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${streakDays} day streak, ${state}`}
    >
      {/* State background overlay */}
      {stateStyle.bgOverlay !== 'transparent' && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: stateStyle.bgOverlay,
              borderRadius: theme.radius.md,
            },
          ]}
        />
      )}

      <View style={styles.content}>
        {/* Left: Emoji + Info */}
        <View style={styles.left}>
          <Text style={styles.emoji}>{emoji}</Text>
          <View style={[styles.info, { marginLeft: theme.spacing.sm }]}>
            <Text
              style={[
                theme.typography.bodyMedium,
                { color: theme.text.primary },
              ]}
              numberOfLines={1}
            >
              {name}
            </Text>
            <View style={styles.meta}>
              <Text style={[
                theme.typography.caption,
                { color: theme.text.secondary },
              ]}>
                🔥 {streakDays} {streakDays === 1 ? 'day' : 'days'}
              </Text>
              {dueIn && (
                <Text style={[
                  theme.typography.caption,
                  { color: theme.text.tertiary, marginLeft: theme.spacing.xs },
                ]}>
                  • {dueIn}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Right: Progress Ring */}
        <ProgressRing
          progress={progress}
          size={40}
          strokeWidth={3}
          gradientStart={
            state === 'completed' ? theme.semantic.success : theme.brand.purple
          }
          gradientEnd={
            state === 'completed' ? theme.semantic.success : theme.brand.neon
          }
        />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 80,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  emoji: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
});
