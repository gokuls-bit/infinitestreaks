/**
 * InfiniteStreaks — Aurora Design System
 * ISButton Component
 *
 * Themed button with spring press animation, haptic feedback,
 * and variant support: Primary | Ghost | Danger | Success.
 *
 * Mandatory: 150ms hover feedback + 300ms press feedback.
 */
import React, { useCallback } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ISButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ISButton({
  title,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
}: ISButtonProps) {
  const theme = useTheme();
  const pressed = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    'worklet';
    pressed.value = withTiming(1, { duration: theme.duration.fast });
    theme.haptics.impact();
  }, []);

  const handlePressOut = useCallback(() => {
    'worklet';
    pressed.value = withSpring(0, theme.spring.default);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(pressed.value, [0, 1], [1, 0.96]) },
    ],
    opacity: interpolate(pressed.value, [0, 1], [1, 0.85]),
  }));

  // Variant colors
  const variantColors = {
    primary: {
      bg: theme.brand.purple,
      text: '#FFFFFF',
      border: 'transparent',
    },
    ghost: {
      bg: 'transparent',
      text: theme.brand.purple,
      border: theme.brand.purple,
    },
    danger: {
      bg: theme.semantic.error,
      text: '#FFFFFF',
      border: 'transparent',
    },
    success: {
      bg: theme.semantic.success,
      text: '#FFFFFF',
      border: 'transparent',
    },
  };

  const colors = variantColors[variant];
  const height = theme.size.button[size];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        styles.button,
        animatedStyle,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          borderWidth: variant === 'ghost' ? 1.5 : 0,
          height,
          borderRadius: theme.radius.sm,
          paddingHorizontal: theme.spacing.xl,
          opacity: disabled ? theme.states.disabledOpacity : 1,
        },
        fullWidth && styles.fullWidth,
        variant === 'primary' && !disabled && {
          shadowColor: theme.brand.purple,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 4,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} size="small" />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              theme.typography.bodyMedium,
              {
                color: colors.text,
                marginLeft: icon ? theme.spacing.xs : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
