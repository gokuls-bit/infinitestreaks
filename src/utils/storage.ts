import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
  HABITS: '@habits_cache',
  OFFLINE_QUEUE: '@offline_queue',
};

export const storage = {
  async saveToken(token: string) {
    await AsyncStorage.setItem(KEYS.TOKEN, token);
  },

  async getToken() {
    return await AsyncStorage.getItem(KEYS.TOKEN);
  },

  async clearToken() {
    await AsyncStorage.removeItem(KEYS.TOKEN);
  },

  async saveUser(user: any) {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  async getUser() {
    const user = await AsyncStorage.getItem(KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  async clearUser() {
    await AsyncStorage.removeItem(KEYS.USER);
  },

  async saveHabits(habits: any[]) {
    await AsyncStorage.setItem(KEYS.HABITS, JSON.stringify(habits));
  },

  async getHabits() {
    const habits = await AsyncStorage.getItem(KEYS.HABITS);
    return habits ? JSON.parse(habits) : [];
  },

  async saveOfflineQueue(queue: any[]) {
    await AsyncStorage.setItem(KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
  },

  async getOfflineQueue() {
    const queue = await AsyncStorage.getItem(KEYS.OFFLINE_QUEUE);
    return queue ? JSON.parse(queue) : [];
  },

  async clearAll() {
    await AsyncStorage.multiRemove([KEYS.TOKEN, KEYS.USER, KEYS.HABITS, KEYS.OFFLINE_QUEUE]);
  },
};
