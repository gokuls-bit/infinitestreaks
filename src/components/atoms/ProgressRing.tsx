/**
 * InfiniteStreaks — Aurora Design System
 * ProgressRing Component
 *
 * Circular progress indicator with gradient fill and animation.
 * Used for habit completion visualization.
 */
import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeProvider';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
  /** Progress value 0–1 */
  progress: number;
  /** Ring diameter in pixels. Default: 48 */
  size?: number;
  /** Ring stroke width. Default: 4 */
  strokeWidth?: number;
  /** Gradient start color. Default: brand.purple */
  gradientStart?: string;
  /** Gradient end color. Default: brand.neon */
  gradientEnd?: string;
  /** Track (unfilled) color override */
  trackColor?: string;
  style?: ViewStyle;
}

export function ProgressRing({
  progress,
  size = 48,
  strokeWidth = 4,
  gradientStart,
  gradientEnd,
  trackColor,
  style,
}: ProgressRingProps) {
  const theme = useTheme();
  const animatedProgress = useSharedValue(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 1000,
      easing: theme.easing.decelerate,
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  const startColor = gradientStart || theme.brand.purple;
  const endColor = gradientEnd || theme.brand.neon;
  const track = trackColor || (theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)');

  return (
    <View
      style={[
        { width: size, height: size },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(progress * 100),
      }}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={startColor} />
            <Stop offset="100%" stopColor={endColor} />
          </LinearGradient>
        </Defs>

        {/* Track (unfilled ring) */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={track}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress fill */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
    </View>
  );
}
