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
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
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
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
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
          <p>Hello ${name || 'User'},</p>
          
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

  const text = `Your OTP code is: ${otp}. This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes. Never share this OTP with anyone.`;

  return sendEmail({
    to: email,
    subject,
    html,
    text,
  });
};

export const sendPasswordResetOtpEmail = async (email: string, otp: string, name?: string): Promise<boolean> => {
  const subject = 'Password Reset OTP - Six Loans';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
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
          <h1>🔐 Password Reset Request</h1>
        </div>
        
        <div class="content">
          <p>Hello ${name || 'User'},</p>
          
          <p>We received a request to reset your password for your Six Loans account. Please use the following One-Time Password (OTP) to proceed:</p>
          
          <div class="otp-box">
            <p>Your OTP Code:</p>
            <div class="otp-code">${otp}</div>
          </div>
          
          <p><strong>This OTP will expire in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.</strong></p>
          
          <p><span class="warning">⚠️ Security Notice:</span></p>
          <ul>
            <li>If you did not request a password reset, please ignore this email and secure your account</li>
            <li>Never share this OTP with anyone, including Six Loans staff</li>
            <li>Contact support immediately if you suspect unauthorized access</li>
          </ul>
          
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

  const text = `Password Reset OTP: ${otp}. This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes. If you didn't request this, please ignore.`;

  return sendEmail({
    to: email,
    subject,
    html,
    text,
  });
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  const subject = 'Welcome to Six Loans! 🎉';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .feature-box { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #0d9488; }
        .cta-button { background-color: #0d9488; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 5px 5px; }
        .emoji { font-size: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Six Loans!</h1>
          <p style="margin: 0; font-size: 18px;">Your Financial Journey Starts Here</p>
        </div>
        
        <div class="content">
          <p>Dear ${name},</p>
          
          <p>Congratulations! Your Six Loans account has been successfully created. We're thrilled to have you join our community of smart borrowers.</p>
          
          <h3 style="color: #0d9488;">✨ What's Next?</h3>
          
          <div class="feature-box">
            <strong>📝 Complete Your Profile</strong><br>
            Add your personal and employment details for a smoother loan application process.
          </div>
          
          <div class="feature-box">
            <strong>🔍 Browse Loan Options</strong><br>
            Explore our wide range of loan products tailored to your needs.
          </div>
          
          <div class="feature-box">
            <strong>⚡ Quick Approval</strong><br>
            Get instant pre-approval decisions with our smart matching technology.
          </div>
          
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

  const text = `Welcome to Six Loans, ${name}! Your account has been successfully created. Start exploring loan options today.`;

  return sendEmail({
    to: email,
    subject,
    html,
    text,
  });
};

export const sendApplicationConfirmationEmail = async (
  email: string,
  name: string,
  referenceNumber: string,
  productType: string,
  loanAmount?: number
): Promise<boolean> => {
  const subject = `Application Received - ${referenceNumber}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0d9488; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .ref-box { background-color: white; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0; border: 2px solid #0d9488; }
        .ref-number { font-size: 24px; font-weight: bold; color: #0d9488; letter-spacing: 2px; }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 5px 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Application Received!</h1>
        </div>
        
        <div class="content">
          <p>Dear ${name},</p>
          
          <p>Thank you for your ${productType.toLowerCase()} application with Six Loans. We have successfully received your application and our team is reviewing it.</p>
          
          <div class="ref-box">
            <p>Your Reference Number:</p>
            <div class="ref-number">${referenceNumber}</div>
          </div>
          
          ${loanAmount ? `<p><strong>Requested Amount:</strong> ₹${loanAmount.toLocaleString('en-IN')}</p>` : ''}
          
          <h3>What Happens Next?</h3>
          <ul>
            <li>Our loan specialist will review your application within 24 hours</li>
            <li>You will receive updates via email and SMS</li>
            <li>Keep your reference number handy for future correspondence</li>
          </ul>
          
          <p>If you have any questions, please contact our support team with your reference number.</p>
          
          <p>Best regards,<br><strong>Six Loans Team</strong></p>
        </div>
        
        <div class="footer">
          <p>&copy; 2026 Six Loans. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `Application Received! Reference: ${referenceNumber}. Our team will review your ${productType.toLowerCase()} application within 24 hours.`;

  return sendEmail({
    to: email,
    subject,
    html,
    text,
  });
};
