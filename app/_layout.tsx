import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";

import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { HabitProvider } from "../src/context/HabitContext";
import { useOfflineQueue } from "../src/hooks/useOfflineQueue";
import { setupNotifications } from "../src/utils/notifications";
import { DarkSurfaces } from "../src/theme/colors";

const RootLayoutContent = () => {
  const { user, isLoading } = useAuth();

  // initialize offline queue once
  useOfflineQueue();

  // setup notifications once
  useEffect(() => {
    const initNotifications = async () => {
      try {
        await setupNotifications();
      } catch (err) {
        console.log("Notification setup failed:", err);
      }
    };

    initNotifications();
  }, []);

  // better loading UI instead of returning null
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: DarkSurfaces.base,
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: DarkSurfaces.base },
        animation: "fade_from_bottom",
      }}
    >
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
