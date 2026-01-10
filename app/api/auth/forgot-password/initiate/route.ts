import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { generateOTP, getOTPExpiry } from '@/lib/utils/otpGenerator';
import { sendPasswordResetOtpEmail } from '@/lib/email/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier } = body;

    if (!identifier) {
      return NextResponse.json(
        { error: 'Email or phone number is required' },
        { status: 400 }
      );
    }

    // Search for user by email or phone
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
        { error: 'Person with this email or phone number does not exist' },
        { status: 404 }
      );
    }

    // Generate OTP
    const otp = generateOTP(6);
    const otpExpiry = getOTPExpiry(10); // 10 minutes

    // Store OTP in user record
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailOtp: otp,
        emailOtpExpiry: otpExpiry,
      },
    });

    // Send password reset OTP email
    const emailSent = await sendPasswordResetOtpEmail(user.email, otp, user.name);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send reset OTP email' },
        { status: 500 }
      );
    }

    console.log(`[Forgot Password] OTP sent to ${user.email} (User ID: ${user.id})`);

    return NextResponse.json({
      success: true,
      message: 'Password reset OTP sent to your email',
      email: user.email,
    });
  } catch (error) {
    console.error('/api/auth/forgot-password/initiate error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate password reset' },
      { status: 500 }
    );
  }
}
