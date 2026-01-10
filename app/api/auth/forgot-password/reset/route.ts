import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { isOtpExpired } from '@/lib/utils/otpGenerator';
import { validatePassword } from '@/lib/auth/jwt';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, otp, newPassword } = body;

    if (!identifier || !otp || !newPassword) {
      return NextResponse.json(
        { error: 'Identifier, OTP, and new password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
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

    // Verify OTP again
    if (user.emailOtp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        emailOtp: null,
        emailOtpExpiry: null,
      },
    });

    console.log(`[Forgot Password] Password reset successfully for user ${user.email}`);

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.',
    });
  } catch (error) {
    console.error('/api/auth/forgot-password/reset error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
