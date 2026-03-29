import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { storage } from '../utils/storage';

// In Expo, EXPO_PUBLIC_API_URL can be set in .env
const baseURL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5000/api';

const client: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized
client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Logic for force logout or token refresh
      // This will be handled by Context observers or manual clear
      await storage.clearToken();
      await storage.clearUser();
      
      // We can emit an event or return a custom error
      return Promise.reject(new Error('SESSION_EXPIRED'));
    }

    if (!error.response) {
      // Network Error / Offline
      return Promise.reject(new Error('STATUS_OFFLINE'));
    }

    return Promise.reject(error);
  }
);

export default client;
