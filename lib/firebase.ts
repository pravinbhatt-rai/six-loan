import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Static Firebase web config provided by user
const firebaseConfig = {
  apiKey: "AIzaSyAtKsVENvlBXb8OldW9xfWzQEbleNcw__Q",
  authDomain: "six-loan.firebaseapp.com",
  projectId: "six-loan",
  storageBucket: "six-loan.firebasestorage.app",
  messagingSenderId: "951277807232",
  appId: "1:951277807232:web:0440e167d2b47ba28ca865",
  measurementId: "G-DF3526VHZX",
};

// Client-only initialization to avoid SSR errors
export function getAuthClient(): ReturnType<typeof getAuth> | null {
  if (typeof window === 'undefined') return null;
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  return getAuth(app);
}
