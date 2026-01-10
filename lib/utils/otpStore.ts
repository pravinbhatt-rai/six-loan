type OtpData = {
  otp: string;
  expires: number;
};

const otpStore = new Map<string, OtpData>();

export const saveOtp = (identifier: string, otp: string) => {
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(identifier, { otp, expires });
};

export const verifyOtp = (identifier: string, otp: string): boolean => {
  const data = otpStore.get(identifier);
  if (!data) return false;
  if (Date.now() > data.expires) {
    otpStore.delete(identifier);
    return false;
  }
  if (data.otp === otp) {
    otpStore.delete(identifier);
    return true;
  }
  return false;
};

export const clearOtp = (identifier: string) => {
  otpStore.delete(identifier);
};
