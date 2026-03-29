import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import { authApi } from '../api/auth.api';
import { User, AuthResponse } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load persisted session on mount
    const loadSession = async () => {
      try {
        const storedToken = await storage.getToken();
        const storedUser = await storage.getUser();
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    const response: AuthResponse = await authApi.login(email, password);
    setUser(response.user);
    setToken(response.token);
    await storage.saveToken(response.token);
    await storage.saveUser(response.user);
  };

  const register = async (data: any) => {
    const response: AuthResponse = await authApi.register(data);
    setUser(response.user);
    setToken(response.token);
    await storage.saveToken(response.token);
    await storage.saveUser(response.user);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await storage.clearAll();
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
