// In-memory store for pending registrations (before email verification)
// In production, consider using Redis or database

export interface PendingRegistration {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  otp: string;
  otpExpiry: Date;
  createdAt: Date;
}

const pendingRegistrations = new Map<string, PendingRegistration>();

export const savePendingRegistration = (email: string, registration: PendingRegistration) => {
  pendingRegistrations.set(email, registration);
};

export const getPendingRegistration = (email: string): PendingRegistration | undefined => {
  return pendingRegistrations.get(email);
};

export const deletePendingRegistration = (email: string) => {
  pendingRegistrations.delete(email);
};

export const hasPendingRegistration = (email: string): boolean => {
  return pendingRegistrations.has(email);
};

// Clean up expired pending registrations
export const cleanupExpiredRegistrations = () => {
  const now = new Date();
  for (const [email, registration] of pendingRegistrations.entries()) {
    if (registration.otpExpiry < now || (now.getTime() - registration.createdAt.getTime()) > 30 * 60 * 1000) {
      pendingRegistrations.delete(email);
      console.log(`[Pending Registration] Cleaned up expired registration for ${email}`);
    }
  }
};

// Run cleanup every 5 minutes
if (typeof window === 'undefined') {
  setInterval(cleanupExpiredRegistrations, 5 * 60 * 1000);
}
