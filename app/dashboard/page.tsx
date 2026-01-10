"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsCards from '@/component/Dashboard/StatsCards';
import DashboardCharts from '@/component/Dashboard/DashboardCharts';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, isAdminOrModerator } = useAuth();
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalLoans: 0,
    totalCreditCards: 0,
    totalApplications: 0,
    recentApplications: [],
    trafficData: []
  });
  const [loading, setLoading] = useState(true);

  // Check if user is admin or moderator
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // Not logged in
        router.push('/login');
        return;
      }
      
      if (!isAdminOrModerator()) {
        // Logged in but not admin/moderator
        alert('Access denied. You must be an admin or moderator to access the dashboard.');
        router.push('/');
        return;
      }
    }
  }, [user, authLoading, isAdminOrModerator, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch stats if user is authorized
    if (user && isAdminOrModerator()) {
      fetchStats();
    }
  }, [user, isAdminOrModerator, router]);

  // Show loading state while checking auth
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authorized
  if (!user || !isAdminOrModerator()) {
    return null;
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>
      
      <StatsCards stats={stats} />
      <DashboardCharts data={stats.trafficData} />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Recent Applications</h3>
               <Link href={`/dashboard/applications`}>
          <button className="text-blue-500 text-sm font-medium hover:underline">View All</button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-medium">
              <tr>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentApplications?.length > 0 ? (
                stats.recentApplications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {app.user?.name || 'Unknown User'}
                      <div className="text-xs text-gray-500">{app.user?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {app.loan?.title || app.loanProduct?.title || app.loanProduct?.name || 
                       app.card?.name || app.creditCardProduct?.name || 
                       app.insurance?.name || app.insuranceProduct?.name || 
                       app.productName || 'Unknown Product'}
                    </td>
                    <td className="px-6 py-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/applications`}>
                      <button className="text-blue-500 hover:text-blue-700">View</button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No recent applications found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
