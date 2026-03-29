import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { habitsApi } from '../api/habits.api';
import { storage } from '../utils/storage';
import { Habit } from '../types';

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
}

type HabitAction = 
  | { type: 'SET_HABITS'; payload: Habit[] }
  | { type: 'ADD_HABIT'; payload: Habit }
  | { type: 'UPDATE_HABIT'; payload: Habit }
  | { type: 'DELETE_HABIT'; id: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const habitReducer = (state: HabitState, action: HabitAction): HabitState => {
  switch (action.type) {
    case 'SET_HABITS':
      return { ...state, habits: action.payload, isLoading: false, error: null };
    case 'ADD_HABIT':
      return { ...state, habits: [...state.habits, action.payload] };
    case 'UPDATE_HABIT':
      return { ...state, habits: state.habits.map(h => h._id === action.payload._id ? action.payload : h) };
    case 'DELETE_HABIT':
      return { ...state, habits: state.habits.filter(h => h._id !== action.id) };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

interface HabitContextType extends HabitState {
  refreshHabits: () => Promise<void>;
  addHabit: (data: any) => Promise<void>;
  updateHabit: (id: string, data: any) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  completeHabit: (id: string) => Promise<any>;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(habitReducer, {
    habits: [],
    isLoading: true,
    error: null,
  });

  const { isConnected } = useNetInfo();

  const loadCachedHabits = useCallback(async () => {
    try {
      const cached = await storage.getHabits();
      if (cached?.length > 0) {
        dispatch({ type: 'SET_HABITS', payload: cached });
      }
    } catch (err) {
      console.error('Failed to load cached habits:', err);
    }
  }, []);

  const refreshHabits = useCallback(async () => {
    if (!isConnected) return;
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const habits = await habitsApi.getHabits();
      dispatch({ type: 'SET_HABITS', payload: habits });
      await storage.saveHabits(habits);
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to sync habits' });
    }
  }, [isConnected]);

  useEffect(() => {
    loadCachedHabits();
    if (isConnected) refreshHabits();
  }, [isConnected, loadCachedHabits, refreshHabits]);

  const addHabit = async (data: any) => {
    const habit = await habitsApi.createHabit(data);
    dispatch({ type: 'ADD_HABIT', payload: habit });
    const habits = [...state.habits, habit];
    await storage.saveHabits(habits);
  };

  const updateHabit = async (id: string, data: any) => {
    const habit = await habitsApi.updateHabit(id, data);
    dispatch({ type: 'UPDATE_HABIT', payload: habit });
  };

  const deleteHabit = async (id: string) => {
    await habitsApi.deleteHabit(id);
    dispatch({ type: 'DELETE_HABIT', id });
  };

  const completeHabit = async (id: string) => {
    const habitToUpdate = state.habits.find(h => h._id === id);
    if (!habitToUpdate) return;

    // Optimistic update logic
    const optimisticHabit = { 
      ...habitToUpdate, 
      currentStreak: habitToUpdate.currentStreak + 1,
      lastCompletedDate: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_HABIT', payload: optimisticHabit as Habit });

    if (!isConnected) {
      // Offline queue logic (handled by useOfflineQueue hook or simple storage)
      const queue = await storage.getOfflineQueue();
      await storage.saveOfflineQueue([...queue, { type: 'COMPLETE', habitId: id, timestamp: Date.now() }]);
      return { habit: optimisticHabit, message: "Marked done offline", streakBroken: false };
    }

    try {
      const response = await habitsApi.completeHabit(id);
      dispatch({ type: 'UPDATE_HABIT', payload: response.habit });
      return response;
    } catch (err) {
      // Revert optimistic update if API fails and not a network error
      dispatch({ type: 'UPDATE_HABIT', payload: habitToUpdate });
      throw err;
    }
  };

  return (
    <HabitContext.Provider value={{ ...state, refreshHabits, addHabit, updateHabit, deleteHabit, completeHabit }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error('useHabits must be used within a HabitProvider');
  return context;
};
