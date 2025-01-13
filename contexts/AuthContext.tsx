'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContextType, User } from '@/interfaces/auth.interface';
import { authConfirm, authLogin } from '@/api/auth';
import { fetchWithAuth } from '@/api/base';
import { API } from '@/app/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Добавляем useEffect для проверки авторизации при загрузке
  useEffect(() => {
    checkAuth();
  }, []);


  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('jwt_token');

      if (!token) {
        setUser(null);
        setLoading(false);
        if (window.location.pathname === '/' ||
            window.location.pathname === '/projects' ||
            !window.location.pathname.includes('/login') ||
            !window.location.pathname.includes('/confirm')) {
          router.push('/login');
        }
        return;
      }

      const response = await fetchWithAuth(API.auth.me);

      if (!response.ok) {
        setUser(null);
        localStorage.removeItem('jwt_token');
        setLoading(false);
        if (window.location.pathname === '/' ||
            window.location.pathname === '/projects' ||
            !window.location.pathname.includes('/login') ||
            !window.location.pathname.includes('/confirm')) {
          router.push('/login');
        }
        return;
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('jwt_token');
      if (window.location.pathname === '/' ||
          window.location.pathname === '/projects' ||
          !window.location.pathname.includes('/login') ||
          !window.location.pathname.includes('/confirm')) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    const message = await authLogin(email);
    if (message) {
      setEmail(email);
      router.push('/confirm');
    }
    return message;
  };

  const confirmOtp = async (otp: string) => {
    if (!email) {
      return null;
    }
    const user = await authConfirm(otp, email);
    if (user) {
      setUser(user);
      router.push('/');
    }
    return user;
  };

  const logout = async () => {
    try {
      const response = await fetchWithAuth('/v1/admin/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Ошибка выхода');
      }

      localStorage.removeItem('jwt_token');
      setUser(null);
      router.push('/login');
    } catch (error) {
      throw new Error('Ошибка при выходе');
    }
  };

  return (
    <AuthContext.Provider value={{ user, email,loading, login, confirmOtp, logout, fetchWithAuth}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}