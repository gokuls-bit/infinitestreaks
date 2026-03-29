import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useHabits } from '../context/HabitContext';
import HabitCard from '../components/HabitCard';
import { DarkTextColors, StreakColors, DarkSurfaces } from '../theme/colors';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { habits, isLoading, refreshHabits } = useHabits();
  const [refreshing, setRefreshing] = useState(false);

  // Pulsing streak flame animation
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshHabits();
    setRefreshing(false);
  };

  const hasHighStreak = habits.some(h => h.currentStreak > 3);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hey, {user?.name.split(' ')[0]} 👋</Text>
          <Text style={styles.subGreeting}>Let's keep the momentum going</Text>
        </View>
        
        {hasHighStreak && (
          <Animated.View style={[styles.flameButton, animatedStyle]}>
            <MaterialCommunityIcons name="fire" size={32} color={StreakColors.active} />
          </Animated.View>
        )}
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => <HabitCard habit={item} index={index} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={80} color={DarkTextColors.tertiary} />
            <Text style={styles.emptyText}>No habits yet? Start building your streak!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkSurfaces.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: DarkTextColors.primary,
  },
  subGreeting: {
    fontSize: 14,
    color: DarkTextColors.secondary,
    marginTop: 4,
  },
  flameButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E1E2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,107,53, 0.4)',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: DarkTextColors.tertiary,
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 200,
  },
});

export default HomeScreen;
