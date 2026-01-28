# Email OTP Implementation - What's Been Done

## ✅ Files Created/Modified:

### Backend Files Created:
1. **`/backend/src/utils/emailService.ts`** - Nodemailer email service with OTP email template
2. **`/backend/src/utils/otpGenerator.ts`** - OTP generation and expiry utilities
3. **`/backend/src/routes/emailVerification.ts`** - API routes for email verification

### Backend Files Modified:
1. **`/backend/prisma/schema.prisma`** - Added email OTP fields to User model:
   - `emailOtp` (String?)
   - `emailOtpExpiry` (DateTime?)
   - `emailVerifiedAt` (DateTime?)

2. **`/backend/src/index.ts`** - Registered email verification routes

3. **`/backend/.env`** - Added email configuration variables

### Frontend Files Created:
1. **`/component/auth/EmailVerificationModal.tsx`** - React component for OTP verification

---

## 🔧 Next Steps to Complete Integration:

### Step 1: Run Database Migration
```bash
cd backend
npx prisma migrate dev --name add_email_otp_fields
npx prisma generate
```

### Step 2: Configure Gmail App Password
⚠️ **IMPORTANT**: You need to generate a Gmail App Password for security

1. Go to: https://myaccount.google.com/security
2. Enable 2-Factor Authentication if not enabled
3. Go to: https://myaccount.google.com/apppasswords
4. Generate a new App Password for "Mail"
5. Update `/backend/.env` with the 16-character password:
   ```
   EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"  # Replace with your app password
   ```

### Step 3: Test the Backend
```bash
cd backend
npm run dev
```

Test endpoints with:
```bash
# Send OTP
curl -X POST http://localhost:4000/api/email-verification/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Verify OTP
curl -X POST http://localhost:4000/api/email-verification/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","otp":"123456"}'
```

---

## 🔗 How to Integrate into Your App:

### Option 1: After Registration
Update your registration success handler to trigger email verification:

```typescript
// In your registration component
import EmailVerificationModal from '@/component/auth/EmailVerificationModal';

const [showEmailVerification, setShowEmailVerification] = useState(false);
const [userEmail, setUserEmail] = useState('');

// After successful registration
const handleRegistrationSuccess = async (email: string) => {
  setUserEmail(email);
  
  // Send OTP automatically
  await fetch(`${API_BASE_URL}/api/email-verification/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  
  setShowEmailVerification(true);
};

// In your JSX
<EmailVerificationModal
  isOpen={showEmailVerification}
  onClose={() => setShowEmailVerification(false)}
  email={userEmail}
  onVerificationComplete={() => {
    // Handle successful verification
    console.log('Email verified!');
  }}
/>
```

### Option 2: Separate Verification Page
Create a dedicated verification page that users can access anytime:

```typescript
// app/verify-email/page.tsx
'use client';
import { useState, useEffect } from 'react';
import EmailVerificationModal from '@/component/auth/EmailVerificationModal';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    // Get email from localStorage or query params
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) setEmail(userEmail);
  }, []);
  
  const handleSendOTP = async () => {
    // Send OTP logic
    setShowModal(true);
  };
  
  return (
    <div>
      <button onClick={handleSendOTP}>Verify Email</button>
      <EmailVerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        email={email}
        onVerificationComplete={() => {
          // Redirect or update UI
        }}
      />
    </div>
  );
}
```

---

## 🔐 Security Considerations:

1. **Rate Limiting**: Consider adding rate limiting to prevent OTP spam
2. **HTTPS Only**: Ensure your production app uses HTTPS
3. **App Passwords**: Never use actual Gmail password, always use App Passwords
4. **Environment Variables**: Keep `.env` file out of version control
5. **Token Expiry**: OTPs expire after 10 minutes by default

---

## 📊 Database Flow:

### When User Registers:
1. User created with `emailVerified = false`
2. OTP generated and stored in `emailOtp`
3. Expiry time stored in `emailOtpExpiry`
4. Email sent with OTP

### When OTP Verified:
1. OTP compared with database
2. Expiry checked
3. If valid:
   - `emailVerified` → `true`
   - `emailVerifiedAt` → current timestamp
   - `emailOtp` → `null`
   - `emailOtpExpiry` → `null`

---

## 🎯 API Endpoints Created:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/email-verification/send-otp` | Send OTP to email |
| POST | `/api/email-verification/verify-otp` | Verify OTP code |
| POST | `/api/email-verification/resend-otp` | Resend OTP |
| GET | `/api/email-verification/status/:email` | Check verification status |

---

## 🧪 Testing Checklist:

- [ ] Database migration successful
- [ ] Gmail App Password configured
- [ ] Backend server starts without errors
- [ ] OTP email received successfully
- [ ] OTP verification works correctly
- [ ] Email marked as verified in database
- [ ] Resend OTP functionality works
- [ ] OTP expiry works after 10 minutes
- [ ] Frontend modal displays correctly
- [ ] Error handling works properly

---

## 🐛 Troubleshooting:

### Email not sending?
- Check Gmail App Password is correct
- Verify 2FA is enabled on Gmail
- Check console for error messages
- Try different email service (e.g., SendGrid, AWS SES)

### OTP not saving to database?
- Run `npx prisma generate` after schema changes
- Check Prisma Client is up to date
- Verify database connection

### Frontend modal not showing?
- Check console for errors
- Verify API_BASE_URL is correct
- Ensure modal state is being updated

---

## 📝 Environment Variables Required:

```env
# Email Configuration
EMAIL_SERVICE="gmail"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-char-app-password"
EMAIL_FROM="your-email@gmail.com"

# OTP Configuration
OTP_EXPIRY_MINUTES=10
OTP_LENGTH=6
```

---

## 🚀 Ready to Use!

All the code is implemented and ready. Just:
1. Run the database migration
2. Configure your Gmail App Password
3. Test the endpoints
4. Integrate the modal into your registration flow

Refer to `EMAIL_OTP_SETUP.md` for detailed documentation!
