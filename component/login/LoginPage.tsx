"use client";
import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient } from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiKey,
  FiShield,
  FiClock,
  FiArrowRight,
  FiChevronDown,
  FiGlobe,
  FiHome,
  FiHelpCircle,
  FiRefreshCw,
  FiX,
  FiSend,
  FiArrowLeft
} from 'react-icons/fi';
import {
  TbWorld,
  TbPhone,
  TbMail,
  TbLock,
  TbEye,
  TbEyeOff,
  TbUser,
  TbShieldCheck,
  TbClock,
  TbKey,
  TbRefresh,
  TbChevronDown
} from 'react-icons/tb';

// Phone handling simplified — single plain phone input (no country codes)

const LoginForm: React.FC = () => {
  const logoImageSrc = "/six-finance.png";
  const heroImageSrc = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop";

  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSignup, setIsSignup] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  // Forgot Password Fields
  const [resetIdentifier, setResetIdentifier] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const [resetOtpTimer, setResetOtpTimer] = useState(600);
  const [canResendReset, setCanResendReset] = useState(false);

  // Format phone number: keep only digits, limit to 15 characters
  const formatPhoneNumber = (value: string) => value.replace(/\D/g, '').slice(0, 15);

  const getRawPhone = (formatted: string) => formatted.replace(/\D/g, '');

  const validatePassword = (pwd: string): { valid: boolean; message: string } => {
    if (pwd.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters" };
    }
    if (!/[A-Z]/.test(pwd)) {
      return { valid: false, message: "Password must contain at least one uppercase letter (A-Z)" };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      return { valid: false, message: "Password must contain at least one special character" };
    }
    if (!/[0-9]/.test(pwd)) {
      return { valid: false, message: "Password must contain at least one number" };
    }
    return { valid: true, message: "" };
  };

  // OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOtpModal && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, otpTimer]);

  // Reset Password OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showForgotPasswordModal && forgotPasswordStep === 2 && resetOtpTimer > 0) {
      interval = setInterval(() => {
        setResetOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendReset(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showForgotPasswordModal, forgotPasswordStep, resetOtpTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // --- Logic Handlers ---
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawPhone = getRawPhone(phone);
    const minLen = 7;
    const maxLength = 15;

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (rawPhone.length < minLen || rawPhone.length > maxLength) {
      toast.error(`Phone number must be between ${minLen} and ${maxLength} digits`);
      return;
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.message);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/api/auth/signup/initiate', {
        name: name.trim(),
        email: email.trim(),
        phone: rawPhone,
        password
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      toast.success("OTP sent to your email! Please verify to complete registration.");
      setShowOtpModal(true);
      setOtpTimer(600);
      setCanResend(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.post('/api/auth/signup/complete', {
        email: email.trim(),
        otp
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "OTP verification failed");

      toast.success("Account created successfully! Logging you in...");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userName", data.user.name);

      setTimeout(() => {
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || searchParams.get('redirect') || '/';
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) {
      toast.error("Please wait before resending OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.post('/api/auth/signup/resend-otp', {
        email: email.trim()
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend OTP");

      toast.success("OTP resent to your email!");
      setOtpTimer(600);
      setCanResend(false);
      setOtp("");
    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot Password Handlers ---
  const handleForgotPasswordInitiate = async () => {
    if (!resetIdentifier.trim()) {
      toast.error("Please enter your email or phone number");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/api/auth/forgot-password/initiate', {
        identifier: resetIdentifier.trim()
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initiate password reset");
      }

      toast.success("OTP sent to your email!");
      setResetEmail(data.email);
      setForgotPasswordStep(2);
      setResetOtpTimer(600);
      setCanResendReset(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordVerifyOtp = async () => {
    if (!resetOtp.trim() || resetOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/api/auth/forgot-password/verify-otp', {
        identifier: resetIdentifier.trim(),
        otp: resetOtp.trim()
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid OTP");
      }

      toast.success("OTP verified! Now enter your new password");
      setForgotPasswordStep(3);
    } catch (err: any) {
      toast.error(err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.message);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/api/auth/forgot-password/reset', {
        identifier: resetIdentifier.trim(),
        otp: resetOtp.trim(),
        newPassword: newPassword
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      toast.success("Password reset successfully! You can now login");

      // Update password field with new password and switch to login mode
      setPassword(newPassword);
      setIsSignup(false);

      // Close modal and reset state
      setShowForgotPasswordModal(false);
      setForgotPasswordStep(1);
      setResetIdentifier("");
      setResetOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
      setResetEmail("");
    } catch (err: any) {
      toast.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleResendResetOtp = async () => {
    if (!canResendReset) {
      toast.error("Please wait before resending OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/api/auth/forgot-password/resend-otp', {
        identifier: resetIdentifier.trim()
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend OTP");
      }

      toast.success("New OTP sent to your email!");
      setResetOtpTimer(600);
      setCanResendReset(false);
      setResetOtp("");
    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      toast.error("Please enter email or phone");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter password");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/api/auth/login', { emailOrPhone: phone.trim(), password });
      const data = await res.json();

      if (res.status === 403 && data.emailVerified === false) {
        toast.error("Please verify your email first. Check your inbox for the verification email.");
        setLoading(false);
        return;
      }

      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userName", data.user.name);

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || searchParams.get('redirect') || '/';
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Handle phone input change
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="min-h-screen w-full overflow-x-hidden flex flex-col lg:flex-row bg-slate-50 font-sans text-slate-800">
        {/* Left Panel (Marketing / Visuals) */}
        <div className="w-full min-h-[220px] sm:min-h-[260px] lg:h-auto lg:w-5/12 relative flex flex-col overflow-hidden lg:min-h-screen bg-teal-900 text-white transition-all duration-500 shrink-0">
          {/* Background Overlay Image */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src={heroImageSrc}
              alt="Finance Background"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-teal-950 via-teal-900/80 to-teal-900/40 mix-blend-multiply" />
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col h-full p-8 lg:p-16 justify-start lg:justify-between">
            {/* Top Logo Area */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div
                onClick={() => router.push('/')}
                className="w-24 h-24 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                role="button"
                title="Go to Homepage"
              >
                <img
                  src={logoImageSrc}
                  alt="Six Finance Logo"
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
            </div>

            {/* Center Heading (hidden on mobile) */}
            <div className="hidden lg:flex mt-4 lg:my-auto flex-col font ">
              <h1 className="font-serif text-3xl lg:text-6xl leading-[1.1] mb-2 lg:mb-6">
                Empower Your <br className="hidden lg:block" />
                <span className="text-teal-300 italic">Financial Future</span>
              </h1>
              <p className="text-teal-100 text-sm lg:text-xl font-light max-w-sm border-l-2 border-teal-500 pl-4 opacity-90 hidden lg:block">
                Instant approvals. Transparent rates. The classic way to modern lending.
              </p>
            </div>

            {/* Bottom Stats/Trust (Hidden on Mobile) */}
            <div className="hidden lg:flex gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-serif font-bold text-white">0%</p>
                <p className="text-xs uppercase tracking-widest text-teal-300">Platform Fee</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-white">24/7</p>
                <p className="text-xs uppercase tracking-widest text-teal-300">Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel (Form) */}
        <div className="w-full lg:w-7/12 flex items-start lg:items-center justify-center px-4 py-6 lg:p-12 mt-[-5rem] sm:mt-[-6rem] lg:mt-0 relative z-20">
          <div className="w-full max-w-2xl bg-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100">
            {/* Header */}
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-start justify-between gap-3">
                <div className="text-center sm:text-left flex-1">
                  <h2 className="font-serif text-2xl sm:text-3xl text-teal-950 mb-1 sm:mb-2">
                    {isSignup ? "Create Account" : "Welcome Back"}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    {isSignup ? "Enter your details to get started." : "Please enter your details to sign in."}
                  </p>
                </div>
                <button
                  onClick={() => router.push('/')}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 sm:p-2 shrink-0 -mt-1"
                  title="Close and go to homepage"
                >
                  <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>


            <form className="space-y-4 sm:space-y-5" onSubmit={isSignup ? handleSignup : handleLogin}>
              {/* Signup Only Fields */}
              {isSignup && (
                <div className="grid grid-cols-1 gap-4 sm:gap-5 animate-fadeIn">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-teal-800 uppercase tracking-wide ml-1 flex items-center gap-2">
                      <FiUser className="text-teal-600" />
                      Full Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder:text-slate-400 capitalize"
                        value={name}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                          setName(val);
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-teal-800 uppercase tracking-wide ml-1 flex items-center gap-2">
                      <FiMail className="text-teal-600" />
                      Email Address *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder:text-slate-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Phone/Email Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-teal-800 uppercase tracking-wide ml-1 flex items-center gap-2">
                  {isSignup ? (
                    <>
                      <TbPhone className="text-teal-600" />
                      Phone Number *
                    </>
                  ) : (
                    <>
                      <FiMail className="text-teal-600" />
                      Email or Phone *
                    </>
                  )}
                </label>
                {isSignup ? (
                  <>
                    <div>
                      <div className="relative">
                        <TbPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Phone number"
                          maxLength={15}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder:text-slate-400"
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1 ml-1">
                        <p className="text-xs text-slate-500">{getRawPhone(phone).length}/15 digits</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="user@example.com or phone"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder:text-slate-400"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-teal-800 uppercase tracking-wide ml-1 flex items-center gap-2">
                  <FiLock className="text-teal-600" />
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder:text-slate-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-600 transition-colors p-1"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                {isSignup && (
                  <div className="flex items-start gap-2 mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <FiHelpCircle className="text-teal-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-500">
                      <span className="font-medium">Password requirements:</span> Min 8 characters, at least 1 uppercase letter, 1 special character, and 1 number.
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field (Signup Only) */}
              {isSignup && (
                <div className="space-y-1 animate-fadeIn">
                  <label className="text-xs font-bold text-teal-800 uppercase tracking-wide ml-1 flex items-center gap-2">
                    <TbShieldCheck className="text-teal-600" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <TbKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder:text-slate-400"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-600 transition-colors p-1"
                    >
                      {showConfirmPassword ? <TbEyeOff className="w-5 h-5" /> : <TbEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot Password Link - Only show in login mode */}
              {!isSignup && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPasswordModal(true);
                      setForgotPasswordStep(1);
                      setResetIdentifier("");
                      setResetOtp("");
                      setNewPassword("");
                      setConfirmNewPassword("");
                    }}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors flex items-center justify-end gap-1 w-full"
                  >
                    <FiKey className="w-4 h-4" />
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 sm:py-3.5 px-4 sm:px-6 rounded-lg shadow-lg shadow-teal-600/30 hover:shadow-teal-600/40 transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      {isSignup ? (
                        <>
                          Create Account

                          <FiArrowRight className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Sign In
                          <FiArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Toggle Login/Signup */}
            <div className="mt-6 sm:mt-8 text-center border-t border-slate-100 pt-4 sm:pt-6">
              <p className="text-slate-500 text-xs sm:text-sm">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setLoading(false);
                    setPhone("");
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  className="text-teal-600 font-bold hover:text-teal-800 hover:underline transition-colors ml-1 flex items-center justify-center gap-1 mx-auto"
                >
                  {isSignup ? (
                    <>
                      <FiArrowLeft className="w-4 h-4" />
                      Sign In
                    </>
                  ) : (
                    <>
                      Sign Up
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </p>
            </div>
          </div>

          {/* Mobile footer padding */}
          <div className="h-10 lg:hidden"></div>
        </div>
      </div>

      {/* OTP Verification Modal - Only shown during signup */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5 sm:p-8 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto animate-fadeIn relative">
            <button
              onClick={() => {
                setShowOtpModal(false);
                setOtp("");
                setOtpTimer(0);
                toast.error("Registration cancelled. Please try again.");
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
              title="Close"
            >
              <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="text-center mb-4 sm:mb-6 pt-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiMail className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-teal-950 mb-1 sm:mb-2">Verify Your Email</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Enter the 6-digit code sent to<br />
                <span className="font-semibold text-teal-600">{email}</span>
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <FiShield className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center text-2xl tracking-[0.5em] font-bold bg-slate-50 border-2 border-slate-200 rounded-lg pl-12 pr-4 py-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <FiClock className="w-4 h-4" />
                  {otpTimer > 0 ? (
                    <span>Time remaining: <span className="font-semibold text-teal-600">{formatTime(otpTimer)}</span></span>
                  ) : (
                    <span className="text-red-600 font-semibold">OTP Expired</span>
                  )}
                </div>
                <button
                  onClick={handleResendOtp}
                  disabled={!canResend || loading}
                  className="text-teal-600 font-semibold hover:text-teal-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Resend OTP
                </button>
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="w-5 h-5" />
                    Verify & Create Account
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setShowOtpModal(false);
                  setOtp("");
                  setOtpTimer(0);
                  toast.error("Registration cancelled. Please try again.");
                }}
                disabled={loading}
                className="w-full text-slate-600 hover:text-slate-800 font-medium py-2 transition-colors flex items-center justify-center gap-1"
              >
                <FiX className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-fadeIn relative">
            <button
              onClick={() => {
                setShowForgotPasswordModal(false);
                setForgotPasswordStep(1);
                setResetIdentifier("");
                setResetOtp("");
                setNewPassword("");
                setConfirmNewPassword("");
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
              title="Close"
            >
              <FiX className="w-6 h-6" />
            </button>
            {/* Step 1: Enter Email/Phone */}
            {forgotPasswordStep === 1 && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiKey className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-teal-950 mb-2">Reset Password</h3>
                  <p className="text-slate-600 text-sm">
                    Enter your email or phone number to receive a password reset code
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Email or Phone Number"
                      value={resetIdentifier}
                      onChange={(e) => setResetIdentifier(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    />
                  </div>

                  <button
                    onClick={handleForgotPasswordInitiate}
                    disabled={loading}
                    className="w-full bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Send OTP
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setShowForgotPasswordModal(false);
                      setResetIdentifier("");
                    }}
                    disabled={loading}
                    className="w-full text-slate-600 hover:text-slate-800 font-medium py-2 transition-colors flex items-center justify-center gap-1"
                  >
                    <FiX className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Enter OTP */}
            {forgotPasswordStep === 2 && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TbShieldCheck className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-teal-950 mb-2">Verify OTP</h3>
                  <p className="text-slate-600 text-sm">
                    Enter the 6-digit code sent to<br />
                    <span className="font-semibold text-teal-600">{resetEmail}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <TbKey className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      value={resetOtp}
                      onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center text-2xl tracking-[0.5em] font-bold bg-slate-50 border-2 border-slate-200 rounded-lg pl-12 pr-4 py-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <TbClock className="w-4 h-4" />
                      {resetOtpTimer > 0 ? (
                        <span>Time remaining: <span className="font-semibold text-teal-600">{formatTime(resetOtpTimer)}</span></span>
                      ) : (
                        <span className="text-red-600 font-semibold">OTP Expired</span>
                      )}
                    </div>
                    <button
                      onClick={handleResendResetOtp}
                      disabled={!canResendReset || loading}
                      className="text-teal-600 font-semibold hover:text-teal-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                    >
                      <TbRefresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      Resend OTP
                    </button>
                  </div>

                  <button
                    onClick={handleForgotPasswordVerifyOtp}
                    disabled={loading || resetOtp.length !== 6}
                    className="w-full bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="w-5 h-5" />
                        Verify OTP
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setShowForgotPasswordModal(false);
                      setForgotPasswordStep(1);
                      setResetOtp("");
                    }}
                    disabled={loading}
                    className="w-full text-slate-600 hover:text-slate-800 font-medium py-2 transition-colors flex items-center justify-center gap-1"
                  >
                    <FiArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Enter New Password */}
            {forgotPasswordStep === 3 && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiLock className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-teal-950 mb-2">Create New Password</h3>
                  <p className="text-slate-600 text-sm">
                    Enter your new password (minimum 8 characters)
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg pl-10 pr-12 py-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-600 transition-colors p-1"
                    >
                      {showNewPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <FiHelpCircle className="text-teal-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-500">
                      <span className="font-medium">Password requirements:</span> Min 8 characters, at least 1 uppercase letter, 1 special character, and 1 number.
                    </p>
                  </div>

                  <div className="relative">
                    <TbKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg pl-10 pr-12 py-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-600 transition-colors p-1"
                    >
                      {showConfirmNewPassword ? <TbEyeOff className="w-5 h-5" /> : <TbEye className="w-5 h-5" />}
                    </button>
                  </div>

                  <button
                    onClick={handlePasswordReset}
                    disabled={loading}
                    className="w-full bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Resetting...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="w-5 h-5" />
                        Reset Password
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setShowForgotPasswordModal(false);
                      setForgotPasswordStep(1);
                      setNewPassword("");
                      setConfirmNewPassword("");
                    }}
                    disabled={loading}
                    className="w-full text-slate-600 hover:text-slate-800 font-medium py-2 transition-colors flex items-center justify-center gap-1"
                  >
                    <FiX className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-teal-50 text-teal-600">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
          <span className="font-serif">Loading Securely...</span>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;