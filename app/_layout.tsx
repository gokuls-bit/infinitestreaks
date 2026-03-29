import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { HabitProvider } from '../src/context/HabitContext';
import { useOfflineQueue } from '../src/hooks/useOfflineQueue';
import { setupNotifications } from '../src/utils/notifications';
import { DarkSurfaces } from '../src/theme/colors';

const RootLayoutContent = () => {
  const { user, isLoading } = useAuth();
  useOfflineQueue();

  useEffect(() => {
    setupNotifications();
  }, []);

  if (isLoading) return null;

  return (
    <Stack screenOptions={{ 
      headerShown: false, 
      contentStyle: { backgroundColor: DarkSurfaces.base },
      animation: 'fade_from_bottom'
    }}>
      {user ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="onboarding" />
      )}
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <HabitProvider>
        <StatusBar style="light" />
        <RootLayoutContent />
      </HabitProvider>
    </AuthProvider>
  );
}
