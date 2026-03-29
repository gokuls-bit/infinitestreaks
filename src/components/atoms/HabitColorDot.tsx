/**
 * InfiniteStreaks — HabitColorDot Atom
 *
 * Simple circle palette picker item.
 */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';

interface HabitColorDotProps {
  color: string;
  size?: number;
  selected?: boolean;
  onSelect?: () => void;
}

export function HabitColorDot({
  color,
  size = 36,
  selected = false,
  onSelect,
}: HabitColorDotProps) {
  const theme = useTheme();
  const scale = useSharedValue(selected ? 1.15 : 1);

  React.useEffect(() => {
    scale.value = withSpring(selected ? 1.15 : 1, theme.spring.snappy);
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 },
      ]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <Animated.View
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            borderWidth: selected ? 3 : 0,
            borderColor: '#FFFFFF',
          },
          selected && {
            shadowColor: color,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          },
          animatedStyle,
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dot: {
    margin: 4,
  },
});
