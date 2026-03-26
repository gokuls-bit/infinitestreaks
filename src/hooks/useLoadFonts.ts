/**
 * InfiniteStreaks — Font Loading Hook
 *
 * Loads all custom fonts (Inter, Syne, JetBrains Mono) at app startup.
 * Must complete before rendering any themed components.
 *
 * Usage in App.tsx:
 *   const [fontsLoaded] = useLoadFonts();
 *   if (!fontsLoaded) return <SplashScreen />;
 */
import { useFonts } from 'expo-font';

export function useLoadFonts() {
  return useFonts({
    // Inter Variable — UI typeface
    // Download from: https://rsms.me/inter/
    'Inter': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),

    // Syne — Display typeface
    // Download from: https://fonts.google.com/specimen/Syne
    'Syne-Bold': require('../../assets/fonts/Syne-Bold.ttf'),

    // JetBrains Mono — Data/streak number typeface
    // Download from: https://www.jetbrains.com/lp/mono/
    'JetBrainsMono-Regular': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
  });
}
