import client from './client';
import { AuthResponse } from '../types';

export const authApi = {
  register: async (data: any): Promise<AuthResponse> => {
    const response = await client.post('/auth/register', data);
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
  },
};
