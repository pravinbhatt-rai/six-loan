import { NextRequest, NextResponse } from 'next/server';
import { getPendingRegistration, savePendingRegistration } from '@/lib/auth/pendingRegistrations';
import { generateOTP, getOTPExpiry } from '@/lib/utils/otpGenerator';
import { sendOtpEmail } from '@/lib/email/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get pending registration
    const pending = getPendingRegistration(email);

    if (!pending) {
      return NextResponse.json(
        { error: 'No pending registration found. Please initiate signup again.' },
        { status: 400 }
      );
    }

    // Generate new OTP
    const otp = generateOTP(6);
    const otpExpiry = getOTPExpiry(10); // 10 minutes

    // Update pending registration with new OTP
    pending.otp = otp;
    pending.otpExpiry = otpExpiry;
    savePendingRegistration(email, pending);

    // Send OTP email
    const emailSent = await sendOtpEmail(email, otp, pending.name);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send OTP email' },
        { status: 500 }
      );
    }

    console.log(`[Signup] OTP resent to ${email}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: 'OTP resent to your email',
    });
  } catch (error) {
    console.error('/api/auth/signup/resend-otp error:', error);
    return NextResponse.json(
      { error: 'Failed to resend OTP' },
      { status: 500 }
    );
  }
}
