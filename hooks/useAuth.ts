"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const isAdmin = () => user?.role === 'ADMIN';
  const isModerator = () => user?.role === 'MODERATOR';
  const isAdminOrModerator = () => user?.role === 'ADMIN' || user?.role === 'MODERATOR';
  const isLoggedIn = () => !!user;

  return {
    user,
    loading,
    isAdmin,
    isModerator,
    isAdminOrModerator,
    isLoggedIn,
  };
}
