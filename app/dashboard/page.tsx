"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsCards from '@/component/Dashboard/StatsCards';
import DashboardCharts from '@/component/Dashboard/DashboardCharts';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api';
import { CreditCard, Wallet, FileText, Shield, Plus, TrendingUp, Users, Clock } from 'lucide-react';

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authorized
  if (!user || !isAdminOrModerator()) {
    return null;
  }

  const quickActions = [
    {
      title: 'Add Credit Card',
      description: 'Create new credit card product',
      icon: CreditCard,
      href: '/dashboard/credit-cards/add',
      color: 'from-teal-500 to-cyan-600',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600'
    },
    {
      title: 'Add Debit Card',
      description: 'Create new debit card product',
      icon: Wallet,
      href: '/dashboard/debit-cards/add',
      color: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Add Loan',
      description: 'Create new loan product',
      icon: FileText,
      href: '/dashboard/loans/add',
      color: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Add Insurance',
      description: 'Create new insurance product',
      icon: Shield,
      href: '/dashboard/insurance/add',
      color: 'from-green-500 to-emerald-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 flex items-center justify-center shadow-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}! Here's what's happening today.</p>
        </div>
        
        <Link href="/dashboard/products/add">
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link href={action.href} key={action.title}>
              <div 
                className="group bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-teal-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`${action.iconBg} p-3 shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                      {action.title}
                      <Plus className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <StatsCards stats={stats} />
      <DashboardCharts data={stats.trafficData} />
      
      <div className="bg-white shadow-lg overflow-hidden animate-slideUp">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Recent Applications</h3>
          </div>
          <Link href="/dashboard/applications">
            <button className="text-teal-600 hover:text-teal-700 font-medium hover:underline transition-all">
              View All →
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold">
              <tr>
                <th className="px-6 py-4 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentApplications?.length > 0 ? (
                stats.recentApplications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{app.user?.name || 'Unknown User'}</div>
                          <div className="text-xs text-gray-500">{app.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {app.loan?.title || app.loanProduct?.title || app.loanProduct?.name || 
                       app.card?.name || app.creditCardProduct?.name || 
                       app.insurance?.name || app.insuranceProduct?.name || 
                       app.productName || 'Unknown Product'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold shadow-sm ${
                        app.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/applications/${app.id}`}>
                        <button className="text-teal-600 hover:text-teal-700 font-medium hover:underline transition-all">
                          View Details
                        </button>
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
