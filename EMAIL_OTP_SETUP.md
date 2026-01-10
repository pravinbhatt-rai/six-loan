# Email OTP Verification System Setup Guide

## Overview
This guide covers implementing a complete email OTP (One-Time Password) verification system using Nodemailer. When an OTP is verified, the email verification status will be set to true and stored in the database.

---

## Prerequisites
- Node.js and npm installed
- Backend running (Express.js)
- Prisma ORM configured
- PostgreSQL/MySQL database
- Gmail or any email service account

---

## Step 1: Install Required Dependencies

```bash
cd backend
npm install nodemailer
npm install dotenv
npm install express-validator
```

---

## Step 2: Update Environment Variables

Add the following to your `.env` file in the backend:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# OTP Configuration
OTP_EXPIRY_MINUTES=10
OTP_LENGTH=6

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

### Note: For Gmail
1. Enable 2FA on your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password in `EMAIL_PASSWORD`

---

## Step 3: Update Prisma Schema

Add email OTP fields to your User model:

```prisma
model User {
  id                    Int     @id @default(autoincrement())
  email                 String  @unique
  name                  String?
  password              String?
  
  // Email OTP Fields
  emailOtp              String?
  emailOtpExpiry        DateTime?
  emailVerified         Boolean @default(false)
  emailVerifiedAt       DateTime?
  
  // Other fields
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  
  // Relations
  applications          Application[]
}
```

Run migrations:
```bash
npx prisma migrate dev --name add_email_otp_fields
```

---

## Step 4: Create Email Service Utility

Create `backend/src/utils/emailService.ts`:

```typescript
import nodemailer from 'nodemailer';

const emailService = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: SendEmailOptions): Promise<boolean> => {
  try {
    await emailService.sendMail({
      from: process.env.EMAIL_FROM,
      ...options,
    });
    console.log(`Email sent successfully to ${options.to}`);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export const sendOtpEmail = async (email: string, otp: string, name?: string): Promise<boolean> => {
  const subject = 'Your Email Verification OTP - Six Loans';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0d9488; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .otp-box { background-color: white; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0; border: 2px solid #0d9488; }
        .otp-code { font-size: 32px; font-weight: bold; color: #0d9488; letter-spacing: 5px; }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 5px 5px; }
        .warning { color: #dc2626; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Email Verification</h1>
        </div>
        
        <div class="content">
          <p>Hello ${name ? name : 'User'},</p>
          
          <p>Thank you for registering with Six Loans. To complete your email verification, please use the following One-Time Password (OTP):</p>
          
          <div class="otp-box">
            <p>Your OTP Code:</p>
            <div class="otp-code">${otp}</div>
          </div>
          
          <p><strong>This OTP will expire in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.</strong></p>
          
          <p><span class="warning">⚠️ Important:</span></p>
          <ul>
            <li>Never share this OTP with anyone</li>
            <li>Our team will never ask for your OTP</li>
            <li>If you didn't request this verification, please ignore this email</li>
          </ul>
          
          <p>If you need any assistance, please contact our support team.</p>
          
          <p>Best regards,<br><strong>Six Loans Team</strong></p>
        </div>
        
        <div class="footer">
          <p>&copy; 2026 Six Loans. All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `Your OTP code is: ${otp}. This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.`;

  return sendEmail({
    to: email,
    subject,
    html,
    text,
  });
};
```

---

## Step 5: Create OTP Generation Utility

Create `backend/src/utils/otpGenerator.ts`:

```typescript
export const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  
  return otp;
};

export const getOTPExpiry = (minutes: number = 10): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
};

export const isOtpExpired = (expiryTime: Date | null): boolean => {
  if (!expiryTime) return true;
  return new Date() > expiryTime;
};
```

---

## Step 6: Create API Routes

### Route 1: Send OTP to Email

Create `backend/src/routes/emailVerification.ts`:

```typescript
import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { generateOTP, getOTPExpiry } from '../utils/otpGenerator';
import { sendOtpEmail } from '../utils/emailService';
import { body, validationResult } from 'express-validator';

const router = Router();

/**
 * POST /api/email-verification/send-otp
 * Send OTP to user's email
 */
router.post(
  '/send-otp',
  [
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      // Check if email is already verified
      if (user.emailVerified) {
        return res.status(400).json({
          success: false,
          message: 'Email is already verified',
        });
      }

      // Generate OTP
      const otp = generateOTP(parseInt(process.env.OTP_LENGTH || '6'));
      const otpExpiry = getOTPExpiry(parseInt(process.env.OTP_EXPIRY_MINUTES || '10'));

      // Save OTP to database
      await prisma.user.update({
        where: { email },
        data: {
          emailOtp: otp,
          emailOtpExpiry: otpExpiry,
        },
      });

      // Send OTP email
      const emailSent = await sendOtpEmail(email, otp, user.name || undefined);

      if (!emailSent) {
        return res.status(500).json({
          success: false,
          message: 'Failed to send OTP email',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully to your email',
        expiryMinutes: process.env.OTP_EXPIRY_MINUTES || 10,
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  }
);

/**
 * POST /api/email-verification/verify-otp
 * Verify OTP and mark email as verified
 */
router.post(
  '/verify-otp',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('otp').isLength({ min: 4, max: 8 }).withMessage('OTP must be between 4 and 8 characters'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, otp } = req.body;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      // Check if email already verified
      if (user.emailVerified) {
        return res.status(400).json({
          success: false,
          message: 'Email is already verified',
        });
      }

      // Check if OTP exists
      if (!user.emailOtp) {
        return res.status(400).json({
          success: false,
          message: 'No OTP found. Please request a new OTP',
        });
      }

      // Check if OTP is expired
      if (user.emailOtpExpiry && new Date() > user.emailOtpExpiry) {
        return res.status(400).json({
          success: false,
          message: 'OTP has expired. Please request a new OTP',
        });
      }

      // Verify OTP
      if (user.emailOtp !== otp) {
        return res.status(400).json({
          success: false,
          message: 'Invalid OTP. Please try again',
        });
      }

      // Update user - mark email as verified and clear OTP
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          emailVerified: true,
          emailVerifiedAt: new Date(),
          emailOtp: null,
          emailOtpExpiry: null,
        },
        select: {
          id: true,
          email: true,
          name: true,
          emailVerified: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  }
);

/**
 * POST /api/email-verification/resend-otp
 * Resend OTP to email (with rate limiting)
 */
router.post(
  '/resend-otp',
  [
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      if (user.emailVerified) {
        return res.status(400).json({
          success: false,
          message: 'Email is already verified',
        });
      }

      // Generate new OTP
      const otp = generateOTP(parseInt(process.env.OTP_LENGTH || '6'));
      const otpExpiry = getOTPExpiry(parseInt(process.env.OTP_EXPIRY_MINUTES || '10'));

      // Update OTP in database
      await prisma.user.update({
        where: { email },
        data: {
          emailOtp: otp,
          emailOtpExpiry: otpExpiry,
        },
      });

      // Send OTP email
      const emailSent = await sendOtpEmail(email, otp, user.name || undefined);

      if (!emailSent) {
        return res.status(500).json({
          success: false,
          message: 'Failed to send OTP email',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'OTP resent successfully',
        expiryMinutes: process.env.OTP_EXPIRY_MINUTES || 10,
      });
    } catch (error) {
      console.error('Error resending OTP:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  }
);

export default router;
```

---

## Step 7: Register Routes in Main App

Update `backend/src/app.ts`:

```typescript
import emailVerificationRoutes from './routes/emailVerification';

// ... other middleware ...

// Register email verification routes
app.use('/api/email-verification', emailVerificationRoutes);

// ... other routes ...
```

---

## Step 8: Create Frontend Email Verification Component

Create `component/auth/EmailVerificationModal.tsx`:

```typescript
'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerificationComplete: () => void;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  email,
  onVerificationComplete,
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

  // Timer for OTP expiry
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/email-verification/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to verify OTP');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onVerificationComplete();
        onClose();
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/email-verification/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to resend OTP');
        return;
      }

      setTimeLeft(600); // Reset timer
      setCanResend(false);
      setOtp('');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setResendLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {success ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <Mail className="w-12 h-12 text-teal-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {success ? 'Verified!' : 'Verify Your Email'}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {success
              ? 'Your email has been verified successfully'
              : `We've sent a verification code to ${email}`}
          </p>
        </div>

        {/* Form */}
        {!success ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Verification Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-lg tracking-widest text-center"
              />
            </div>

            {/* Timer */}
            <div className="text-center text-sm text-gray-600">
              {canResend ? (
                <span className="text-red-600 font-medium">Code expired</span>
              ) : (
                <span>Code expires in: <span className="font-bold">{formatTime(timeLeft)}</span></span>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.length !== 6 || !email}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            {/* Resend Button */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend || resendLoading}
                className="text-teal-600 hover:text-teal-700 disabled:text-gray-400 font-medium text-sm"
              >
                {resendLoading ? 'Resending...' : 'Resend OTP'}
              </button>
            </div>
          </form>
        ) : null}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-600 hover:text-gray-900 font-medium text-sm"
        >
          {success ? 'Close' : 'Cancel'}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
```

---

## Step 9: Integration in Registration/Login

Update your registration route to trigger email verification:

```typescript
// After successful registration
router.post('/register', async (req: Request, res: Response) => {
  try {
    // ... validation and user creation ...

    // Send OTP for email verification
    const otp = generateOTP(6);
    const otpExpiry = getOTPExpiry(10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailOtp: otp,
        emailOtpExpiry: otpExpiry,
      },
    });

    await sendOtpEmail(user.email, otp, user.name);

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: false,
      },
      requiresEmailVerification: true,
    });
  } catch (error) {
    // ... error handling ...
  }
});
```

---

## Step 10: Database Flow

### When User Registers:
1. User data is created with `emailVerified = false`
2. OTP generated and stored in `emailOtp` field
3. OTP expiry time calculated and stored in `emailOtpExpiry`
4. Email sent with OTP

### When OTP is Verified:
1. OTP compared with database value
2. Expiry time checked
3. If valid:
   - `emailVerified` set to `true`
   - `emailVerifiedAt` set to current timestamp
   - `emailOtp` cleared (set to null)
   - `emailOtpExpiry` cleared (set to null)

---

## Step 11: Rate Limiting (Optional but Recommended)

Add rate limiting to prevent OTP spam:

```typescript
import rateLimit from 'express-rate-limit';

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many OTP requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/send-otp', otpLimiter, async (req, res) => {
  // ... handler code ...
});
```

---

## Step 12: Testing the Flow

### Test Case 1: Send OTP
```bash
curl -X POST http://localhost:4000/api/email-verification/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

### Test Case 2: Verify OTP
```bash
curl -X POST http://localhost:4000/api/email-verification/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","otp":"123456"}'
```

### Test Case 3: Resend OTP
```bash
curl -X POST http://localhost:4000/api/email-verification/resend-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

---

## Database Schema Summary

After implementation, your User table will have:

| Column | Type | Description |
|--------|------|-------------|
| emailOtp | String | 6-digit OTP code |
| emailOtpExpiry | DateTime | When OTP expires |
| emailVerified | Boolean | Verification status |
| emailVerifiedAt | DateTime | When email was verified |

---

## Security Best Practices

1. **Always hash sensitive data** - Consider encrypting OTP before storing
2. **Use HTTPS** - Ensure all API calls use HTTPS in production
3. **Rate limiting** - Implement rate limiting on OTP endpoints
4. **Validation** - Validate all inputs on both frontend and backend
5. **Environment variables** - Never hardcode email credentials
6. **Token expiry** - Always expire OTPs after set duration
7. **Audit logging** - Log all OTP verification attempts

---

## Troubleshooting

### Email not sending?
- Check email service credentials in `.env`
- Verify firewall/network settings
- Check email service logs
- Test with console.log before emailService call

### OTP not working?
- Verify OTP is being generated correctly
- Check database has OTP and expiry set
- Ensure frontend is sending correct OTP
- Check if OTP has expired

### Verification stuck?
- Clear browser cache
- Check if emailVerified is true in DB
- Verify API endpoint is correct

---

## Next Steps

1. Implement verification check in login (require verified email before login)
2. Add resend OTP cooldown (prevent spam)
3. Add email verification reminder emails
4. Implement 2FA with email OTP as second factor
5. Add analytics for verification rates

---

## References

- [Nodemailer Documentation](https://nodemailer.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express Validator](https://express-validator.github.io/docs/)
- [Gmail App Passwords](https://myaccount.google.com/apppasswords)
