"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect /admin/dashboard to /dashboard
export default function AdminDashboardRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to Admin Dashboard...</p>
      </div>
    </div>
  );
}
