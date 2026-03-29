export interface User {
  _id: string;
  name: string;
  email: string;
  penaltyScore: number;
}

export type Frequency = 'daily' | 'weekly';

export interface Habit {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  frequency: Frequency;
  reminderTime?: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string | null;
  isActive: boolean;
  penaltyOnBreak: number;
  createdAt: string;
  updatedAt: string;
}

export interface StreakLog {
  _id: string;
  habitId: string;
  userId: string;
  eventType: 'streak_broken' | 'streak_milestone';
  streakValueAtEvent: number;
  penaltyApplied: number;
  message: string;
  createdAt: string;
}

export interface ActivityLog {
  _id: string;
  habitId: string;
  userId: string;
  completedAt: string;
  dayKey: string;
  skipped: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface HabitStats {
  weekly: {
    completionPercent: number;
    daysCompleted: { day: string; completions: number }[];
  };
  monthly: {
    week: number;
    completions: number;
  }[];
  longestStreak: number;
}
