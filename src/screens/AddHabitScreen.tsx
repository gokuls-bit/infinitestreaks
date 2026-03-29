import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Switch, 
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHabits } from '../context/HabitContext';
import { BrandColors, DarkTextColors, DarkSurfaces, SemanticColors } from '../theme/colors';
import { useRouter } from 'expo-router';

const AddHabitScreen: React.FC = () => {
  const { addHabit } = useHabits();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    description: '',
    frequency: 'daily' as 'daily' | 'weekly',
    reminderTime: '08:00',
    penaltyOnBreak: 5,
  });

  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!form.name.trim()) {
      return Alert.alert("Error", "Give your habit a name");
    }

    try {
      setLoading(true);
      await addHabit({
        ...form,
        reminderTime: isReminderEnabled ? form.reminderTime : null,
      });
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to create habit");
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setForm({ ...form, reminderTime: `${hours}:${minutes}` });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>New Habit</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
              placeholder="e.g. Read 30 min" 
              placeholderTextColor={DarkTextColors.tertiary}
              style={styles.input}
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput 
              placeholder="Optional motivation" 
              placeholderTextColor={DarkTextColors.tertiary}
              style={[styles.input, styles.textArea]}
              multiline
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Reminder</Text>
            <Switch 
              value={isReminderEnabled} 
              onValueChange={setIsReminderEnabled} 
              trackColor={{ false: '#3E3E3E', true: BrandColors.purple }} 
              thumbColor="#fff"
            />
          </View>

          {isReminderEnabled && (
            <TouchableOpacity 
              style={styles.timePickerBtn} 
              onPress={() => setShowTimePicker(true)}
            >
              <MaterialCommunityIcons name="clock-outline" size={24} color={BrandColors.purple} />
              <Text style={styles.timeText}>{form.reminderTime}</Text>
            </TouchableOpacity>
          )}

          {showTimePicker && (
            <DateTimePicker 
              value={new Date()} 
              mode="time" 
              is24Hour={true} 
              display="default" 
              onChange={handleTimeChange} 
            />
          )}

          <View style={styles.inputGroup}>
            <View style={styles.row}>
              <Text style={styles.label}>Penalty Score</Text>
              <Text style={[styles.penaltyCount, { color: form.penaltyOnBreak > 10 ? SemanticColors.error : SemanticColors.success }]}>
                +{form.penaltyOnBreak}
              </Text>
            </View>
            <Slider 
              minimumValue={1} 
              maximumValue={20} 
              step={1} 
              value={form.penaltyOnBreak} 
              onValueChange={(val) => setForm({ ...form, penaltyOnBreak: val })} 
              minimumTrackTintColor={BrandColors.purple} 
              maximumTrackTintColor="#3E3E3E" 
              thumbTintColor={BrandColors.purple} 
            />
            <Text style={styles.helpText}>Points added to your record on break.</Text>
          </View>

          <TouchableOpacity 
            style={[styles.createBtn, loading && styles.disabledBtn]} 
            onPress={handleCreate}
            disabled={loading}
          >
            <Text style={styles.createBtnText}>{loading ? 'Saving...' : 'Start Streak'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkSurfaces.base,
  },
  scroll: {
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: DarkTextColors.primary,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: DarkTextColors.secondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: DarkSurfaces.raised,
    borderRadius: 12,
    padding: 16,
    color: DarkTextColors.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: DarkSurfaces.glassBorder,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DarkSurfaces.raised,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  timeText: {
    color: DarkTextColors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  penaltyCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpText: {
    fontSize: 12,
    color: DarkTextColors.tertiary,
    marginTop: 8,
  },
  createBtn: {
    backgroundColor: BrandColors.purple,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: BrandColors.purple,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  disabledBtn: {
    backgroundColor: DarkTextColors.tertiary,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddHabitScreen;
