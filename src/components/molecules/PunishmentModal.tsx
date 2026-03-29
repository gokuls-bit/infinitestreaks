/**
 * InfiniteStreaks — PunishmentModal Molecule
 *
 * The dramatic failure UI.
 * Features:
 * - Screen shake on entry
 * - Red-black gradient background
 * - Heavy vibration
 * - Emotional "Restart from 0" CTA
 */
import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  FadeIn,
  SlideInDown,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeProvider';
import { ISButton } from '../ISButton';
import { PenaltyBadge } from '../atoms/PenaltyBadge';

interface PunishmentModalProps {
  visible: boolean;
  previousStreak: number;
  habitName: string;
  penaltyPoints: number;
  onRestart: () => void;
  onViewHistory: () => void;
}

export function PunishmentModal({
  visible,
  previousStreak,
  habitName,
  penaltyPoints,
  onRestart,
  onViewHistory,
}: PunishmentModalProps) {
  const theme = useTheme();
  const shakeX = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Screen shake animation
      shakeX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
      // Heavy haptics
      theme.haptics.reject();
      setTimeout(() => theme.haptics.impact(), 100);
      setTimeout(() => theme.haptics.impact(), 200);
    }
  }, [visible]);

  const animatedShake = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#1A0505', '#0D0D14']}
          style={StyleSheet.absoluteFill}
        />
        
        <Animated.View style={[styles.content, animatedShake]}>
          <Animated.Text entering={FadeIn.delay(300)} style={styles.icon}>
            💀
          </Animated.Text>
          
          <Animated.Text
            entering={SlideInDown.delay(400)}
            style={[theme.typography.heading1, { color: '#FFF', textAlign: 'center' }]}
          >
            You broke your streak
          </Animated.Text>
          
          <Animated.Text
            entering={FadeIn.delay(600)}
            style={[theme.typography.body, { color: theme.text.secondary, textAlign: 'center', marginTop: 12 }]}
          >
            Your {habitName} streak of {previousStreak} days is gone.
          </Animated.Text>

          <Animated.View entering={FadeIn.delay(800)} style={styles.badgeContainer}>
            <PenaltyBadge score={penaltyPoints} style={{ paddingHorizontal: 24, paddingVertical: 8 }} />
          </Animated.View>

          <View style={styles.actions}>
            <ISButton
              title="Restart from 0"
              variant="danger"
              fullWidth
              onPress={onRestart}
              style={{ paddingVertical: 18 }}
            />
            <Pressable
              onPress={onViewHistory}
              style={{ marginTop: 24 }}
            >
              <Text style={[theme.typography.label, { color: theme.brand.electric, letterSpacing: 1 }]}>
                VIEW HISTORY
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  icon: {
    fontSize: 80,
    marginBottom: 24,
  },
  badgeContainer: {
    marginTop: 32,
    marginBottom: 48,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
  },
});
