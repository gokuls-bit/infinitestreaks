/**
 * InfiniteStreaks — Aurora Design System
 * GlassCard Component
 *
 * Frosted glassmorphism card using expo-blur.
 *
 * RULES:
 * ✅ Only use over gradient or image backgrounds
 * ❌ Never nest GlassCard inside another GlassCard
 * ❌ Never use over solid color backgrounds (use regular Card instead)
 * ❌ Never use in scrollable list items (performance)
 */
import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeProvider';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  /** Blur intensity (1-100). Default: 20 */
  intensity?: number;
  /** Additional border glow color for special states */
  glowColor?: string;
  /** Border radius override. Default: theme.radius.md (16) */
  borderRadius?: number;
}

export function GlassCard({
  children,
  style,
  intensity = 40,
  glowColor,
  borderRadius,
}: GlassCardProps) {
  const theme = useTheme();
  const radius = borderRadius ?? theme.radius.md;

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: radius,
          borderColor: glowColor || theme.surfaces.glassBorder,
        },
        glowColor && {
          shadowColor: glowColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        },
        style,
      ]}
    >
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={intensity}
          tint={theme.isDark ? 'dark' : 'light'}
          style={[styles.blurView, { borderRadius: radius }]}
        >
          <View style={[styles.content, { padding: theme.spacing.lg }]}>
            {children}
          </View>
        </BlurView>
      ) : (
        // Android fallback: semi-transparent background (blur not native)
        <View
          style={[
            styles.androidFallback,
            {
              backgroundColor: theme.surfaces.glass,
              borderRadius: radius,
              padding: theme.spacing.lg,
            },
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  blurView: {
    overflow: 'hidden',
  },
  content: {
    // Padding applied via theme
  },
  androidFallback: {
    // Android uses semi-transparent bg since native blur is expensive
  },
});
