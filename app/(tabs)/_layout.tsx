import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors, DarkSurfaces, DarkTextColors } from '../../src/theme/colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: DarkSurfaces.raised,
        borderTopWidth: 0,
        height: 60,
        paddingBottom: 10,
        paddingTop: 8,
      },
      tabBarActiveTintColor: BrandColors.purple,
      tabBarInactiveTintColor: DarkTextColors.tertiary,
      tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="lightning-bolt" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="add" 
        options={{ 
          title: 'New', 
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-circle" size={28} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="stats" 
        options={{ 
          title: 'Stats', 
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-box" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Me', 
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" size={24} color={color} /> 
        }} 
      />
    </Tabs>
  );
}
