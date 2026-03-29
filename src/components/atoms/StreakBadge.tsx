/**
 * InfiniteStreaks — StreakBadge Atom
 *
 * sm (28px) → Number only
 * md (48px) → Number + flame color
 * lg (200px) → Number + SVG ring + Hero glow
 */
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue, useEffect } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';
import { ProgressRing } from './ProgressRing';

interface StreakBadgeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function StreakBadge({
  value,
  size = 'md',
  style,
}: StreakBadgeProps) {
  const theme = useTheme();
  const streakColor = theme.getStreakColor(value);

  // Animation for mount
  const scale = useSharedValue(0.8);
  React.useEffect(() => {
    scale.value = withSpring(1, theme.spring.bouncy);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (size === 'sm') {
    return (
      <View style={[styles.sm, style]}>
        <Text style={[theme.typography.label, { color: streakColor }]}>
          {value}
        </Text>
      </View>
    );
  }

  if (size === 'md') {
    return (
      <Animated.View
        style={[
          styles.md,
          { backgroundColor: `${streakColor}15` }, // 10% opacity bg
          animatedStyle,
          style,
        ]}
      >
        <Text style={[theme.typography.caption, { color: streakColor, fontWeight: '700' }]}>
          🔥 {value}
        </Text>
      </Animated.View>
    );
  }

  // Size LG (200px) — Hero variant
  return (
    <View style={[styles.lgContainer, style]}>
      {/* Background Glow */}
      <View
        style={[
          styles.glow,
          { shadowColor: streakColor },
          theme.isDark && { backgroundColor: `${streakColor}05` },
        ]}
      />
      
      {/* Outer Ring */}
      <ProgressRing
        progress={value > 0 ? 1 : 0} // Placeholder for overall habit completion if used in hero
        size={200}
        strokeWidth={8}
        gradientStart={streakColor}
        gradientEnd={theme.brand.purple}
      />

      {/* Inner Content */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.lgInner}>
          <Text style={[theme.typography.display, { color: streakColor, fontSize: 64, marginBottom: -8 }]}>
            {value}
          </Text>
          <Text style={[theme.typography.label, { color: theme.text.tertiary, letterSpacing: 2 }]}>
            STREAK
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sm: {
    paddingHorizontal: 4,
    minWidth: 20,
    alignItems: 'center',
  },
  md: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lgContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lgInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 60,
    elevation: 20,
  },
});
