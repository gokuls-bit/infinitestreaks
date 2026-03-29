import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useHabits } from '../context/HabitContext';
import { DarkTextColors, DarkSurfaces, SemanticColors, BrandColors } from '../theme/colors';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { habits } = useHabits();

  const getPenaltyColor = (score: number) => {
    if (score < 20) return SemanticColors.success;
    if (score < 50) return SemanticColors.warning;
    return SemanticColors.error;
  };

  const activeHabits = habits.filter(h => h.isActive).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name[0].toUpperCase()}</Text>
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.statGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Penalty Score</Text>
            <Text style={[styles.statValue, { color: getPenaltyColor(user?.penaltyScore || 0) }]}>
              {user?.penaltyScore || 0}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Habits</Text>
            <Text style={styles.statValue}>{activeHabits}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingItem icon="bell-outline" label="Notifications" value="Daily" />
          <SettingItem icon="theme-light-dark" label="App Theme" value="Dark Mode" />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <MaterialCommunityIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutBtnText}>Logout Session</Text>
        </TouchableOpacity>

        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          <TouchableOpacity 
            style={styles.deleteBtn} 
            onPress={() => Alert.alert("Confirm", "Delete your account permanently?")}
          >
            <Text style={styles.deleteBtnText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingItem = ({ icon, label, value }: any) => (
  <View style={styles.settingItem}>
    <View style={styles.settingLeft}>
      <MaterialCommunityIcons name={icon} size={24} color={DarkTextColors.secondary} />
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <Text style={styles.settingValue}>{value}</Text>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: BrandColors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: DarkSurfaces.glassBorder,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: DarkTextColors.primary,
  },
  userEmail: {
    fontSize: 14,
    color: DarkTextColors.tertiary,
    marginTop: 4,
  },
  statGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: DarkSurfaces.raised,
    width: '48%',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  statLabel: {
    color: DarkTextColors.secondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: DarkTextColors.primary,
    marginTop: 8,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DarkTextColors.primary,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: DarkSurfaces.divider,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: DarkTextColors.primary,
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 14,
    color: BrandColors.purple,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#3E3E3E',
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  logoutBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dangerZone: {
    padding: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  dangerTitle: {
    color: SemanticColors.error,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  deleteBtn: {
    alignItems: 'flex-start',
  },
  deleteBtnText: {
    color: SemanticColors.error,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ProfileScreen;
