import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInUp, Layout, SlideInRight } from 'react-native-reanimated';
import ConfettiCannon from 'react-native-confetti-cannon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHabits } from '../context/HabitContext';
import { Habit } from '../types';
import { BrandColors, StreakColors, DarkTextColors, getStreakColor } from '../theme/colors';

const HabitCard: React.FC<{ habit: Habit; index: number }> = ({ habit, index }) => {
  const { completeHabit } = useHabits();
  const [showConfetti, setShowConfetti] = useState(false);
  const streakColor = getStreakColor(habit.currentStreak);

  const handleComplete = async () => {
    try {
      const response = await completeHabit(habit._id);
      if (response && !response.streakBroken) {
        setShowConfetti(true);
      } else if (response && response.streakBroken) {
        // Handle streak broken/penalty UI
        Alert.alert("Streak Broken 💀", response.message);
      }
    } catch (err: any) {
      if (err.message !== 'STATUS_OFFLINE') {
        Alert.alert("Error", "Something went wrong while completing the habit");
      }
    }
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(index * 100)} 
      layout={Layout.springify()} 
      style={styles.container}
    >
      {showConfetti && (
        <ConfettiCannon 
          count={50} 
          origin={{ x: 0, y: 0 }} 
          fadeOut={true} 
          onAnimationEnd={() => setShowConfetti(false)} 
        />
      )}
      
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{habit.name}</Text>
        <Text style={styles.description} numberOfLines={1}>{habit.description || 'Keeping consistency'}</Text>
      </View>

      <View style={styles.streakContainer}>
        <MaterialCommunityIcons 
          name={habit.currentStreak > 0 ? "fire" : "fire-off"} 
          size={24} 
          color={habit.currentStreak > 0 ? StreakColors.active : StreakColors.dead} 
        />
        <Text style={[styles.streakText, { color: streakColor }]}>
          {habit.currentStreak}
        </Text>
      </View>

      <TouchableOpacity 
        onPress={handleComplete} 
        disabled={habit.lastCompletedDate === new Date().toISOString().split('T')[0]}
        style={[
          styles.actionButton,
          { backgroundColor: habit.currentStreak > 0 ? BrandColors.purple : BrandColors.electric }
        ]}
      >
        <MaterialCommunityIcons name="check" size={20} color={DarkTextColors.primary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#1E1E2E',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    color: DarkTextColors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: DarkTextColors.secondary,
    fontSize: 14,
    marginTop: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  streakText: {
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 4,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HabitCard;
