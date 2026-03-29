import { useEffect, useCallback } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { storage } from '../utils/storage';
import { habitsApi } from '../api/habits.api';

export const useOfflineQueue = () => {
  const { isConnected } = useNetInfo();

  const flushQueue = useCallback(async () => {
    if (!isConnected) return;
    const queue = await storage.getOfflineQueue();
    if (queue.length === 0) return;

    for (const action of queue) {
      if (action.type === 'COMPLETE') {
        try {
          await habitsApi.completeHabit(action.habitId);
        } catch (err) {
          console.error(`Failed to sync offline completion for habit ${action.habitId}:`, err);
        }
      }
    }

    await storage.saveOfflineQueue([]);
    console.log('Offline queue flushed');
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) flushQueue();
  }, [isConnected, flushQueue]);

  return { flushQueue };
};
