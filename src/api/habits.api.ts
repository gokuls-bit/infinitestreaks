import client from './client';
import { Habit, HabitStats } from '../types';

export const habitsApi = {
  getHabits: async (): Promise<Habit[]> => {
    const response = await client.get('/habits');
    return response.data.habits;
  },

  createHabit: async (data: any): Promise<Habit> => {
    const response = await client.post('/habits', data);
    return response.data.habit;
  },

  updateHabit: async (id: string, data: any): Promise<Habit> => {
    const response = await client.put(`/habits/${id}`, data);
    return response.data.habit;
  },

  deleteHabit: async (id: string): Promise<void> => {
    await client.delete(`/habits/${id}`);
  },

  completeHabit: async (id: string): Promise<{ habit: Habit; message: string; streakBroken: boolean; penaltyApplied: number; newStreak: number }> => {
    const response = await client.post(`/habits/${id}/complete`);
    return response.data;
  },

  getStats: async (): Promise<HabitStats> => {
    const response = await client.get('/stats');
    return response.data;
  },
};
