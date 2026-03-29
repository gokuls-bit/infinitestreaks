/**
 * InfiniteStreaks — BottomTabBar Organism
 *
 * Custom frosted glass tab bar with haptic feedback.
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';

type TabType = 'home' | 'stats' | 'add' | 'notifications' | 'profile';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'add', label: 'Add', icon: '➕' },
  { id: 'notifications', label: 'Alerts', icon: '🔔' },
  { id: 'profile', label: 'Me', icon: '👤' },
];

export function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const handlePress = (tab: TabType) => {
    theme.haptics.impact();
    onTabPress(tab);
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <BlurView
        intensity={theme.isDark ? 40 : 80}
        tint={theme.isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={[styles.container, { height: theme.size.navBar }]}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => handlePress(tab.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.icon, isActive && styles.activeIcon]}>
                {tab.icon}
              </Text>
              <Text
                style={[
                  theme.typography.label,
                  {
                    color: isActive ? theme.brand.purple : theme.text.tertiary,
                    marginTop: 4,
                  },
                ]}
              >
                {tab.label.toUpperCase()}
              </Text>
              
              {isActive && (
                <View style={[styles.indicator, { backgroundColor: theme.brand.purple }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  icon: {
    fontSize: 20,
    opacity: 0.5,
  },
  activeIcon: {
    opacity: 1,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: 20,
    height: 3,
    borderRadius: 2,
  },
});
