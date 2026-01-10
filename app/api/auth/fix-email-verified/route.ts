import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

/**
 * Temporary endpoint to fix users who have emailVerifiedAt but emailVerified is false
 * This can be removed after all existing users are fixed
 */
export async function POST(req: NextRequest) {
  try {
    // Update all users who have emailVerifiedAt but emailVerified is false
    const result = await prisma.user.updateMany({
      where: {
        emailVerifiedAt: { not: null },
        emailVerified: false,
      },
      data: {
        emailVerified: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Fixed ${result.count} users with email verification flag`,
      count: result.count,
    });
  } catch (err) {
    console.error('/api/auth/fix-email-verified error', err);
    return NextResponse.json(
      { error: 'Failed to fix email verification' },
      { status: 500 }
    );
  }
}
