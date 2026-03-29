/**
 * InfiniteStreaks — HabitList Organism
 *
 * High-performance FlatList for habits with staggered entrance.
 */
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { HabitCard } from '../molecules/HabitCard';
import { HabitType } from '../../types';

interface HabitListProps {
  habits: HabitType[];
  onComplete?: (id: string) => void;
  onPressHabit?: (habit: HabitType) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export function HabitList({
  habits,
  onComplete,
  onPressHabit,
  onRefresh,
  refreshing = false,
}: HabitListProps) {
  const theme = useTheme();

  const renderItem = ({ item, index }: { item: HabitType; index: number }) => (
    <HabitCard
      habit={item}
      index={index}
      onComplete={onComplete}
      onPress={onPressHabit}
    />
  );

  return (
    <FlatList
      data={habits}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        styles.list,
        { paddingBottom: theme.spacing.xxxxxl }, // Leave room for tab bar
      ]}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={[theme.typography.body, { color: theme.text.tertiary }]}>
            No habits yet. Tap + to start.
          </Text>
        </View>
      }
      // Performance optimizations
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
});
