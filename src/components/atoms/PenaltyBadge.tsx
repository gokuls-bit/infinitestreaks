/**
 * InfiniteStreaks — PenaltyBadge Atom
 *
 * Displays penalty score with color-coordinated status.
 * Green < 20 | Amber 20-50 | Red > 50
 */
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface PenaltyBadgeProps {
  score: number;
  showLabel?: boolean;
  style?: ViewStyle;
}

export function PenaltyBadge({
  score,
  showLabel = true,
  style,
}: PenaltyBadgeProps) {
  const theme = useTheme();

  let statusColor = theme.semantic.success;
  let statusText = 'SAFE';

  if (score > 50) {
    statusColor = theme.semantic.error;
    statusText = 'CRITICAL';
  } else if (score >= 20) {
    statusColor = theme.semantic.warning;
    statusText = 'WARNING';
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: `${statusColor}20`,
          borderColor: statusColor,
          borderRadius: theme.radius.full,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xxs,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Penalty score ${score}, ${statusText}`}
    >
      <Text style={[theme.typography.label, { color: statusColor, fontWeight: '700' }]}>
        {showLabel ? `${statusText} • ${score}` : score}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
