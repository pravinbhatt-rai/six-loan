import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-to-a-strong-secret';

export interface JWTPayload {
  userId: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export function signToken(user: { id: number; name: string; email: string; phone: string; role: string }): string {
  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice('Bearer '.length).trim();
}

export async function verifyAuth(req: NextRequest): Promise<{ authenticated: boolean; user: any; error?: string } | null> {
  const token = getTokenFromRequest(req);
  
  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      emailVerified: true,
    },
  });

  if (!user) {
    return null;
  }

  return { authenticated: true, user };
}

export async function verifyAdminOrModerator(req: NextRequest): Promise<{ authenticated: boolean; user: any; error?: string } | null> {
  const authResult = await verifyAuth(req);
  
  if (!authResult) {
    return null;
  }

  if (authResult.user.role !== 'ADMIN' && authResult.user.role !== 'MODERATOR') {
    return { authenticated: false, user: authResult.user, error: 'Access denied. Admins or Moderators only.' };
  }

  return authResult;
}

export async function verifyAdmin(req: NextRequest): Promise<{ authenticated: boolean; user: any; error?: string } | null> {
  const authResult = await verifyAuth(req);
  
  if (!authResult) {
    return null;
  }

  if (authResult.user.role !== 'ADMIN') {
    return { authenticated: false, user: authResult.user, error: 'Access denied. Admins only.' };
  }

  return authResult;
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter (A-Z)' };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one special character' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }
  return { valid: true };
}
