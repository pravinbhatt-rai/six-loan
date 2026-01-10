import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { isOtpExpired } from '@/lib/utils/otpGenerator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, otp } = body;

    if (!identifier || !otp) {
      return NextResponse.json(
        { error: 'Identifier and OTP are required' },
        { status: 400 }
      );
    }

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier.toLowerCase().trim() },
          { phone: identifier.trim() },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if OTP exists
    if (!user.emailOtp || !user.emailOtpExpiry) {
      return NextResponse.json(
        { error: 'No password reset request found. Please initiate password reset again.' },
        { status: 400 }
      );
    }

    // Check if OTP expired
    if (isOtpExpired(user.emailOtpExpiry)) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailOtp: null, emailOtpExpiry: null },
      });
      return NextResponse.json(
        { error: 'OTP expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Verify OTP
    if (user.emailOtp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    console.log(`[Forgot Password] OTP verified for user ${user.email}`);

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully. You can now reset your password.',
    });
  } catch (error) {
    console.error('/api/auth/forgot-password/verify-otp error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
