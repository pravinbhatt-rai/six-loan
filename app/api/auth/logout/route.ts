import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest } from '@/lib/auth/jwt';
import { addToBlacklist } from '@/lib/auth/tokenBlacklist';

export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 400 }
      );
    }
    
    // Add token to blacklist
    addToBlacklist(token);
    
    console.log('[Logout] Token blacklisted');
    
    return NextResponse.json({
      success: true,
      message: 'Successfully logged out. Token has been revoked.',
    });
  } catch (err) {
    console.error('/api/auth/logout error', err);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
