/**
 * InfiniteStreaks — HabitCard Molecule
 *
 * Core interactive habit display with:
 * - Glass surface
 * - Color dot + label + streak badge
 * - Week progress indicator (7 dots)
 * - Circular interactive complete button
 * - Swipe-to-action support (Edit/Delete)
 */
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Layout,
  FadeInUp,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '../../theme/ThemeProvider';
import { HabitColorDot } from '../atoms/HabitColorDot';
import { StreakBadge } from '../atoms/StreakBadge';
import { HabitType } from '../../types';

interface HabitCardProps {
  habit: HabitType;
  index?: number;
  onComplete?: (id: string) => void;
  onPress?: (habit: HabitType) => void;
  onDelete?: (id: string) => void;
}

export function HabitCard({
  habit,
  index = 0,
  onComplete,
  onPress,
  onDelete,
}: HabitCardProps) {
  const theme = useTheme();
  const isCompleted = habit.state === 'completed';

  // --- Animations ---
  const translateX = useSharedValue(0);
  const pressed = useSharedValue(0);
  const checkmarkScale = useSharedValue(isCompleted ? 1 : 0);

  React.useEffect(() => {
    checkmarkScale.value = withSpring(isCompleted ? 1 : 0, theme.spring.bouncy);
  }, [isCompleted]);

  // --- Swiping ---
  const swipeGesture = Gesture.Pan()
    .onChange((event) => {
      // Limit swipe left to 100px for delete
      if (event.translationX < 0) {
        translateX.value = Math.max(event.translationX, -100);
      }
    })
    .onEnd((event) => {
      if (event.translationX < -70) {
        // Trigger delete confirm or similar
        translateX.value = withSpring(-100);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // --- Completion Button ---
  const handleComplete = useCallback(() => {
    theme.haptics.confirm();
    onComplete?.(habit.id);
  }, [habit.id, onComplete]);

  return (
    <GestureDetector gesture={swipeGesture}>
      <Animated.View
        entering={FadeInUp.delay(index * 40).springify().damping(20)}
        layout={Layout.springify()}
        style={styles.root}
      >
        {/* Background Action: Delete */}
        <View style={[styles.deleteAction, { backgroundColor: theme.semantic.error }]}>
          <Text style={[theme.typography.label, { color: '#FFF' }]}>DELETE</Text>
        </View>

        <Pressable
          onPress={() => onPress?.(habit)}
          style={({ pressed }) => [
            styles.container,
            {
              backgroundColor: theme.surfaces.card,
              borderRadius: theme.radius.md,
              borderColor: theme.surfaces.glassBorder,
              borderWidth: 1,
            },
            theme.elevation.low,
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
        >
          <Animated.View style={[styles.cardContent, animatedCardStyle]}>
            <View style={styles.leftCol}>
              <HabitColorDot color={habit.color} size={12} />
              <View style={[styles.mainInfo, { marginLeft: theme.spacing.sm }]}>
                <View style={styles.headerRow}>
                  <Text
                    style={[
                      theme.typography.bodyMedium,
                      { color: theme.text.primary, marginRight: 8 },
                      isCompleted && styles.strikethrough,
                    ]}
                  >
                    {habit.name}
                  </Text>
                  <StreakBadge value={habit.streakDays} size="sm" />
                </View>

                {/* Week Progress Dots */}
                <View style={styles.weekIndicator}>
                  {habit.weeklyCompletion.map((done, i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        {
                          backgroundColor: done
                            ? habit.color
                            : theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* Completion Trigger */}
            <Pressable
              onPress={handleComplete}
              style={[
                styles.checkButton,
                {
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: isCompleted ? habit.color : 'transparent',
                  borderWidth: isCompleted ? 0 : 2,
                  borderColor: habit.color,
                },
              ]}
            >
              <Animated.Text
                style={[
                  styles.checkIcon,
                  { color: '#FFF', opacity: isCompleted ? 1 : 0.3 },
                ]}
              >
                {isCompleted ? '✓' : '○'}
              </Animated.Text>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 12,
  },
  container: {
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 2,
    backgroundColor: 'inherit',
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mainInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  weekIndicator: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteAction: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});
