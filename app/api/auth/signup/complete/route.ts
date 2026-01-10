import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { getPendingRegistration, deletePendingRegistration } from '@/lib/auth/pendingRegistrations';
import { signToken } from '@/lib/auth/jwt';
import { sendWelcomeEmail } from '@/lib/email/emailService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'email and otp are required' },
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

    // Check if OTP expired
    if (new Date() > pending.otpExpiry) {
      deletePendingRegistration(email);
      return NextResponse.json(
        { error: 'OTP expired. Please initiate signup again.' },
        { status: 400 }
      );
    }

    // Verify OTP
    if (pending.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Double-check user doesn't exist
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: pending.email }, { phone: pending.phone }],
      },
    });

    if (existing) {
      deletePendingRegistration(email);
      return NextResponse.json(
        { error: 'User with this email or phone already exists' },
        { status: 409 }
      );
    }

    // Create user with verified email
    const user = await prisma.user.create({
      data: {
        name: pending.name,
        email: pending.email,
        phone: pending.phone,
        passwordHash: pending.passwordHash,
        emailVerified: true,  // ✅ Set boolean to true
        emailVerifiedAt: new Date(),
      },
    });

    // Clean up pending registration
    deletePendingRegistration(email);

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name).catch((err) => {
      console.error('[Welcome Email] Failed:', err);
    });

    // Generate JWT token
    const token = signToken({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      message: 'Registration completed successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    }, { status: 201 });
  } catch (err) {
    console.error('/api/auth/signup/complete error', err);
    return NextResponse.json(
      { error: 'Failed to complete signup' },
      { status: 500 }
    );
  }
}
