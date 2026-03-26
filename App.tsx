import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme';
import { GlassCard, ISButton, StreakCounter, HabitCard } from './src/components';
// import { useLoadFonts } from './src/hooks/useLoadFonts';

/**
 * InfiniteStreaks — Design System Preview
 *
 * This serves as a living style guide and component playground.
 * Uncomment useLoadFonts when font files are added to assets/fonts/.
 */

function DesignSystemPreview() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.surfaces.base }]}>
      <ScrollView
        contentContainerStyle={{ padding: theme.spacing.md, paddingBottom: theme.spacing.xxxxxl }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ──────────────────── */}
        <Text style={[theme.typography.heading1, { color: theme.text.primary, marginBottom: theme.spacing.xs }]}>
          Aurora Design System
        </Text>
        <Text style={[theme.typography.caption, { color: theme.text.secondary, marginBottom: theme.spacing.xxl }]}>
          InfiniteStreaks • v1.0.0
        </Text>

        {/* ── Streak Counter ──────────── */}
        <Text style={[theme.typography.label, { color: theme.text.tertiary, marginBottom: theme.spacing.sm }]}>
          STREAK COUNTER
        </Text>
        <View style={[styles.section, { backgroundColor: theme.surfaces.card, borderRadius: theme.radius.md, padding: theme.spacing.xl }]}>
          <StreakCounter value={42} size="default" />
          <Text style={[theme.typography.caption, { color: theme.text.secondary, textAlign: 'center', marginTop: theme.spacing.xs }]}>
            42 days • Established
          </Text>
        </View>

        {/* ── Color Palette ───────────── */}
        <Text style={[theme.typography.label, { color: theme.text.tertiary, marginBottom: theme.spacing.sm, marginTop: theme.spacing.xxl }]}>
          BRAND COLORS
        </Text>
        <View style={styles.colorRow}>
          {[
            { color: theme.brand.purple, label: 'Purple' },
            { color: theme.brand.electric, label: 'Electric' },
            { color: theme.brand.neon, label: 'Neon' },
          ].map(({ color, label }) => (
            <View key={label} style={styles.colorSwatch}>
              <View style={[styles.swatchCircle, { backgroundColor: color }]} />
              <Text style={[theme.typography.caption, { color: theme.text.secondary }]}>{label}</Text>
            </View>
          ))}
        </View>

        <Text style={[theme.typography.label, { color: theme.text.tertiary, marginBottom: theme.spacing.sm, marginTop: theme.spacing.lg }]}>
          STREAK COLORS
        </Text>
        <View style={styles.colorRow}>
          {[
            { color: theme.streak.active, label: 'Active 🔥' },
            { color: theme.streak.broken, label: 'Broken 💀' },
            { color: theme.streak.dead, label: 'Dead 🪦' },
            { color: theme.streak.gold, label: 'Gold 🏆' },
          ].map(({ color, label }) => (
            <View key={label} style={styles.colorSwatch}>
              <View style={[styles.swatchCircle, { backgroundColor: color }]} />
              <Text style={[theme.typography.caption, { color: theme.text.secondary, fontSize: 11 }]}>{label}</Text>
            </View>
          ))}
        </View>

        {/* ── Typography Scale ─────────── */}
        <Text style={[theme.typography.label, { color: theme.text.tertiary, marginBottom: theme.spacing.sm, marginTop: theme.spacing.xxl }]}>
          TYPOGRAPHY SCALE
        </Text>
        <View style={[styles.section, { backgroundColor: theme.surfaces.card, borderRadius: theme.radius.md, padding: theme.spacing.lg }]}>
          <Text style={[theme.typography.display, { color: theme.text.primary }]}>Display 48px</Text>
          <Text style={[theme.typography.heading1, { color: theme.text.primary }]}>Heading 1 • 28px</Text>
          <Text style={[theme.typography.heading2, { color: theme.text.primary }]}>Heading 2 • 22px</Text>
          <Text style={[theme.typography.heading3, { color: theme.text.primary }]}>Heading 3 • 18px</Text>
          <Text style={[theme.typography.body, { color: theme.text.primary }]}>Body regular 16px — primary content text</Text>
          <Text style={[theme.typography.bodyMedium, { color: theme.text.primary }]}>Body medium 16px — emphasized content</Text>
          <Text style={[theme.typography.caption, { color: theme.text.secondary }]}>Caption 13px — timestamps, metadata</Text>
          <Text style={[theme.typography.label, { color: theme.text.tertiary }]}>LABEL 11PX — TAGS, TABS</Text>
        </View>

        {/* ── Buttons ─────────────────── */}
        <Text style={[theme.typography.label, { color: theme.text.tertiary, marginBottom: theme.spacing.sm, marginTop: theme.spacing.xxl }]}>
          BUTTONS
        </Text>
        <View style={{ gap: theme.spacing.sm }}>
          <ISButton title="Start Your Streak" variant="primary" fullWidth />
          <ISButton title="Skip Today" variant="ghost" fullWidth />
          <ISButton title="Delete Habit" variant="danger" fullWidth />
          <ISButton title="Habit Completed" variant="success" fullWidth />
          <ISButton title="Loading..." variant="primary" loading fullWidth />
          <ISButton title="Disabled" variant="primary" disabled fullWidth />
        </View>

        {/* ── Habit Cards ─────────────── */}
        <Text style={[theme.typography.label, { color: theme.text.tertiary, marginBottom: theme.spacing.sm, marginTop: theme.spacing.xxl }]}>
          HABIT CARDS
        </Text>
        <View style={{ gap: theme.spacing.sm }}>
          <HabitCard
            name="Morning Meditation"
            emoji="🧘"
            streakDays={21}
            progress={0}
            state="default"
            dueIn="due in 3 hours"
          />
          <HabitCard
            name="Running"
            emoji="🏃"
            streakDays={7}
            progress={0.5}
            state="completing"
            dueIn="in progress"
          />
          <HabitCard
            name="Read 30 Pages"
            emoji="📚"
            streakDays={45}
            progress={1}
            state="completed"
          />
          <HabitCard
            name="Journal"
            emoji="📝"
            streakDays={3}
            progress={0}
            state="skipped"
          />
        </View>

        {/* ── Spacing Scale ────────────── */}
        <Text style={[theme.typography.label, { color: theme.text.tertiary, marginBottom: theme.spacing.sm, marginTop: theme.spacing.xxl }]}>
          SPACING SCALE (4PX BASE)
        </Text>
        <View style={[styles.section, { backgroundColor: theme.surfaces.card, borderRadius: theme.radius.md, padding: theme.spacing.md }]}>
          {Object.entries(theme.spacing).map(([key, value]) => (
            <View key={key} style={styles.spacingRow}>
              <Text style={[theme.typography.caption, { color: theme.text.secondary, width: 60 }]}>
                {key}
              </Text>
              <View
                style={{
                  height: 12,
                  width: value,
                  backgroundColor: theme.brand.electric,
                  borderRadius: 2,
                  opacity: 0.7,
                }}
              />
              <Text style={[theme.typography.caption, { color: theme.text.tertiary, marginLeft: theme.spacing.xs }]}>
                {value}px
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  // Uncomment when font files are in assets/fonts/:
  // const [fontsLoaded] = useLoadFonts();
  // if (!fontsLoaded) {
  //   return (
  //     <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
  //       <ActivityIndicator size="large" color="#7B5EA7" />
  //     </View>
  //   );
  // }

  return (
    <SafeAreaProvider>
      <ThemeProvider mode="dark">
        <DesignSystemPreview />
        <StatusBar style="light" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 4,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  colorSwatch: {
    alignItems: 'center',
    gap: 4,
  },
  swatchCircle: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  spacingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
});
