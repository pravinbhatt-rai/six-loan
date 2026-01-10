// In-memory token blacklist
// In production, use Redis or database for proper token blacklisting

const tokenBlacklist = new Set<string>();

export const addToBlacklist = (token: string) => {
  tokenBlacklist.add(token);
};

export const isBlacklisted = (token: string): boolean => {
  return tokenBlacklist.has(token);
};

export const removeFromBlacklist = (token: string) => {
  tokenBlacklist.delete(token);
};

// Clear blacklist every hour (tokens expire in 7 days but this prevents memory leak)
if (typeof window === 'undefined') {
  setInterval(() => {
    tokenBlacklist.clear();
    console.log('[Token Blacklist] Cleared all tokens');
  }, 60 * 60 * 1000); // Every hour
}
