// API endpoint mappings from old (Next.js API routes) to new (direct backend)
export const API_ENDPOINT_MAP: Record<string, string> = {
  // Auth endpoints
  '/api/auth/send-otp': '/auth/send-otp',
  '/api/auth/signup': '/auth/signup',
  '/api/auth/login': '/auth/login',
  
  // Admin endpoints
  '/api/admin/loans': '/api/admin/loans',
  '/api/admin/credit-cards': '/api/admin/credit-cards',
  '/api/admin/categories': '/api/admin/categories',
  '/api/admin/stats': '/api/admin/stats',
  '/api/admin/users': '/api/admin/users',
  '/api/admin/insurance': '/api/admin/insurance',
  '/api/admin/applications/export': '/api/admin/applications/export',
  '/api/admin/products/loan': '/api/admin/products/loan',
  '/api/admin/products/credit-card': '/api/admin/products/credit-card',
  '/api/admin/products/insurance': '/api/admin/products/insurance',
  '/api/admin/products/app': '/api/admin/products/app',
  
  // Public loan endpoints
  '/api/loans': '/loans',
  '/api/loans/by-category': '/loans/by-category',
  '/api/loans/category': '/loans/category',
  '/api/loans/details': '/loans/details',
  
  // Public credit card endpoints
  '/api/credit-cards': '/credit-cards',
  '/api/credit-cards/by-category': '/credit-cards/by-category',
  '/api/credit-cards/details': '/credit-cards/details',
  
  // Insurance endpoints
  '/api/insurance/by-category': '/insurance/by-category',
  
  // User endpoints
  '/api/users/profile': '/users/profile',
  '/api/users/applications': '/users/applications',
  
  // Application endpoints
  '/api/applications/submit': '/applications',
};
