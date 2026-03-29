import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const setupNotifications = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig?.extra?.eas?.projectId,
  })).data;

  return token;
};

export const scheduleHabitReminder = async (habitId: string, habitName: string, time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Streak Reminder! 🔥",
      body: `Don't forget to complete: ${habitName}`,
      data: { habitId },
    },
    trigger: {
      hour: hours,
      minute: minutes,
      repeats: true,
    },
  });

  return id;
};

export const cancelHabitReminder = async (notificationId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};
