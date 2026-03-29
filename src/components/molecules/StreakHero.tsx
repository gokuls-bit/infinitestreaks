/**
 * InfiniteStreaks — StreakHero Molecule
 *
 * The 200px hero circle for Home Dashboard.
 * Counts up the streak number on mount.
 */
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedProps, withDelay } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';
import { StreakBadge } from '../atoms/StreakBadge';

interface StreakHeroProps {
  currentStreak: number;
  habitName?: string;
}

export function StreakHero({
  currentStreak,
  habitName = 'Overall Streak',
}: StreakHeroProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[theme.typography.label, { color: theme.text.tertiary, marginBottom: theme.spacing.md, letterSpacing: 1.5 }]}>
        {habitName.toUpperCase()}
      </Text>
      
      <StreakBadge value={currentStreak} size="lg" />
      
      <View style={styles.meta}>
        <Text style={[theme.typography.caption, { color: theme.text.secondary }]}>
          Keep the fire burning 🔥
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  meta: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
});
