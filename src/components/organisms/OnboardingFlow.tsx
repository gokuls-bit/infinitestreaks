/**
 * InfiniteStreaks — OnboardingFlow Organism
 *
 * Multi-step slider with gesture support and particle field.
 */
import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '../../theme/ThemeProvider';
import { ISButton } from '../ISButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  {
    title: 'Precision Habits',
    desc: 'Engineered for those who refuse to settle for average consistency.',
    emoji: '🔥',
  },
  {
    title: 'High Stakes',
    desc: 'Success is rewarded. Failure has consequence. The penalty system keeps you sharp.',
    emoji: '💀',
  },
  {
    title: 'Legendary Status',
    desc: 'Reach 90 days to unlock Prismatic status and cement your legacy.',
    emoji: '🏆',
  },
];

export function OnboardingFlow({ onFinish }: { onFinish: () => void }) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const translateX = useSharedValue(0);
  const context = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value;
    })
    .onEnd((event) => {
      const nextIndex = Math.round(-translateX.value / SCREEN_WIDTH);
      const clampedIndex = Math.max(0, Math.min(nextIndex, SLIDES.length - 1));
      
      translateX.value = withSpring(-clampedIndex * SCREEN_WIDTH, theme.spring.default);
      setIndex(clampedIndex);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaces.base }]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.slider, animatedStyle]}>
          {SLIDES.map((slide, i) => (
            <View key={i} style={styles.slide}>
              <Text style={styles.heroEmoji}>{slide.emoji}</Text>
              <Text style={[theme.typography.heading1, { color: '#FFF', textAlign: 'center' }]}>
                {slide.title}
              </Text>
              <Text style={[theme.typography.body, { color: theme.text.secondary, textAlign: 'center', marginTop: 16 }]}>
                {slide.desc}
              </Text>
            </View>
          ))}
        </Animated.View>
      </GestureDetector>

      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: index === i ? theme.brand.purple : 'rgba(255,255,255,0.2)' },
              ]}
            />
          ))}
        </View>

        <ISButton
          title={index === SLIDES.length - 1 ? 'GET STARTED' : 'NEXT'}
          variant="primary"
          fullWidth
          onPress={() => {
            if (index < SLIDES.length - 1) {
              const next = index + 1;
              translateX.value = withSpring(-next * SCREEN_WIDTH);
              setIndex(next);
            } else {
              onFinish();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    flex: 1,
    flexDirection: 'row',
  },
  slide: {
    width: SCREEN_WIDTH,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 100,
    marginBottom: 40,
  },
  footer: {
    padding: 32,
    paddingBottom: 64,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
