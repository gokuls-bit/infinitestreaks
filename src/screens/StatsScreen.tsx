import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  ActivityIndicator, 
  SafeAreaView 
} from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { habitsApi } from '../api/habits.api';
import { HabitStats } from '../types';
import { DarkTextColors, BrandColors, DarkSurfaces, SemanticColors } from '../theme/colors';

const screenWidth = Dimensions.get("window").width;

const StatsScreen: React.FC = () => {
  const [stats, setStats] = useState<HabitStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await habitsApi.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: DarkSurfaces.base,
    backgroundGradientTo: DarkSurfaces.base,
    color: (opacity = 1) => `rgba(123, 94, 167, ${opacity})`, // Purple
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: BrandColors.purple
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={BrandColors.purple} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Analytics</Text>

        <View style={styles.metricRow}>
          <MetricCard label="Best Streak" value={stats?.longestStreak || 0} unit="days" />
          <MetricCard 
            label="This Week %" 
            value={stats?.weekly.completionPercent || 0} 
            unit="%" 
            color={SemanticColors.success} 
          />
        </View>

        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Consistency</Text>
          {stats?.weekly.daysCompleted.length ? (
            <BarChart
              data={{
                labels: stats.weekly.daysCompleted.map(d => d.day.slice(-2)),
                datasets: [{ data: stats.weekly.daysCompleted.map(d => d.completions) }]
              }}
              width={screenWidth - 48}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              style={styles.chart}
              fromZero
            />
          ) : (
            <Text style={styles.fallbackText}>Not enough data for consistency chart</Text>
          )}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Momentum</Text>
          {stats?.monthly.length ? (
            <LineChart
              data={{
                labels: stats.monthly.map(m => `W${m.week}`),
                datasets: [{ data: stats.monthly.map(m => m.completions) }]
              }}
              width={screenWidth - 48}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          ) : (
            <Text style={styles.fallbackText}>Not enough data for momentum chart</Text>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MetricCard = ({ label, value, unit, color }: any) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricLabel}>{label}</Text>
    <View style={styles.valueRow}>
      <Text style={[styles.metricValue, { color: color || DarkTextColors.primary }]}>{value}</Text>
      <Text style={styles.metricUnit}>{unit}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkSurfaces.base,
  },
  scroll: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: DarkTextColors.primary,
    marginBottom: 32,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: DarkSurfaces.base,
    justifyContent: 'center',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  metricCard: {
    backgroundColor: DarkSurfaces.raised,
    width: (screenWidth - 68) / 2,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: DarkSurfaces.glassBorder,
  },
  metricLabel: {
    color: DarkTextColors.secondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  metricUnit: {
    color: DarkTextColors.tertiary,
    fontSize: 14,
    marginLeft: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DarkTextColors.primary,
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  fallbackText: {
    color: DarkTextColors.tertiary,
    textAlign: 'center',
    paddingVertical: 40,
  },
});

export default StatsScreen;
