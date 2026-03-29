/**
 * InfiniteStreaks — StatCard Molecule
 *
 * metric display with trend indicator.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number; // positive or negative
}

export function StatCard({
  label,
  value,
  trend,
}: StatCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surfaces.card,
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
          borderColor: theme.surfaces.glassBorder,
          borderWidth: 1,
        },
        theme.elevation.low,
      ]}
    >
      <Text style={[theme.typography.label, { color: theme.text.tertiary, marginBottom: 8 }]}>
        {label.toUpperCase()}
      </Text>
      
      <View style={styles.valueRow}>
        <Text style={[theme.typography.heading1, { color: theme.text.primary }]}>
          {value}
        </Text>
        
        {trend !== undefined && (
          <View style={[styles.trend, { backgroundColor: trend >= 0 ? `${theme.semantic.success}15` : `${theme.semantic.error}15` }]}>
            <Text
              style={[
                theme.typography.label,
                { color: trend >= 0 ? theme.semantic.success : theme.semantic.error, fontWeight: '700' },
              ]}
            >
              {trend >= 0 ? '↗' : '↘'} {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 100,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  trend: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
