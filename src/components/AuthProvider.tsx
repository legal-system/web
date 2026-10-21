'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiFetch } from '@/lib/api';
import { clearToken, getToken, setToken } from '@/lib/auth-storage';
import type { LoginResponse, SafeUser } from '@/lib/types';

type AuthValue = {
  user: SafeUser | null;
  booting: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

// Concept details: .ai/auth/lesson-5-load-user-in-authenticate.md
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [booting, setBooting] = useState(true);

  // Step 1: the token survives a reload, the user object does not — ask the server once.
  // Step 2: a 401 here means the token is dead (expired, or the account was suspended).
  useEffect(() => {
    if (!getToken()) {
      setBooting(false);
      return;
    }

    apiFetch<{ user: SafeUser }>('/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => clearToken())
      .finally(() => setBooting(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    setToken(data.accessToken);
    setUser(data.user);
  }, []);

  // Client-side only until Stage 6 adds POST /auth/logout and the refresh cookie.
  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, booting, login, logout }),
    [user, booting, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
