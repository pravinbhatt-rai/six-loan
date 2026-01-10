import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma/client';
import { generateOTP, getOTPExpiry } from '@/lib/utils/otpGenerator';
import { sendOtpEmail } from '@/lib/email/emailService';
import { savePendingRegistration, hasPendingRegistration } from '@/lib/auth/pendingRegistrations';
import { validatePassword } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'name, email, phone, password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'User with this email or phone already exists' },
        { status: 409 }
      );
    }

    // Generate OTP and hash password
    const otp = generateOTP(6);
    const otpExpiry = getOTPExpiry(10); // 10 minutes
    const passwordHash = await bcrypt.hash(password, 10);

    // Store pending registration
    savePendingRegistration(email, {
      name,
      email,
      phone,
      passwordHash,
      otp,
      otpExpiry,
      createdAt: new Date(),
    });

    // Send OTP email
    const emailSent = await sendOtpEmail(email, otp, name);
    
    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send OTP email' },
        { status: 500 }
      );
    }

    console.log(`[Signup] OTP sent to ${email}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: 'OTP sent to your email. Please verify to complete registration.',
      email,
    });
  } catch (err) {
    console.error('/api/auth/signup/initiate error', err);
    return NextResponse.json(
      { error: 'Failed to initiate signup' },
      { status: 500 }
    );
  }
}
