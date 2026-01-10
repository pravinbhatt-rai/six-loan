"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/component/HomePage/navbar';
import { User, FileText, CreditCard, Shield, TrendingUp } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface Application {
  id: number;
  type: string;
  status: string;
  createdAt: string;
  categoryName?: string;
  cardType?: string;
  loan?: {
    title: string;
    bankName?: string;
  };
  card?: {
    name: string;
    bankName?: string;
  };
  insurance?: {
    name: string;
    provider?: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    byDifferentNames: 0,
  });

  useEffect(() => {
    let isMounted = true;
    const loadDashboard = async () => {
      if (isMounted) {
        await fetchDashboardData();
      }
    };
    loadDashboard();
    return () => { isMounted = false; };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

      // Fetch profile
      const profileRes = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      let userProfile = null;
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        if (profileData.user) {
          setProfile(profileData.user);
          userProfile = profileData.user;
        }
      }

      // Fetch applications
      const appsRes = await fetch(`${API_BASE_URL}/api/users/applications`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (appsRes.ok) {
        const appsData = await appsRes.json();
        if (appsData.applications) {
          const apps = appsData.applications;
          setApplications(apps.slice(0, 5)); // Show only recent 5
          
          // Get unique applicant names (excluding the logged-in user's name)
          const uniqueApplicantNames = new Set();
          apps.forEach((app: any) => {
            if (app.applicantName && app.applicantName !== userProfile?.name) {
              uniqueApplicantNames.add(app.applicantName);
            }
          });
          
          // Calculate stats
          setStats({
            total: apps.length,
            pending: apps.filter((a: Application) => 
              a.status === 'PENDING' || a.status === 'PROCESSING' || a.status === 'UNDER_REVIEW'
            ).length,
            approved: apps.filter((a: Application) => a.status === 'APPROVED').length,
            rejected: apps.filter((a: Application) => a.status === 'REJECTED').length,
            byDifferentNames: uniqueApplicantNames.size,
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (app: Application): string => {
    if (app.loan) {
      return app.loan.bankName 
        ? `${app.loan.bankName} ${app.loan.title}` 
        : app.loan.title;
    }
    if (app.card) {
      return app.card.bankName 
        ? `${app.card.bankName} ${app.card.name}` 
        : app.card.name;
    }
    if (app.insurance) {
      return app.insurance.provider 
        ? `${app.insurance.provider} ${app.insurance.name}` 
        : app.insurance.name;
    }
    if (app.categoryName) {
      return app.categoryName;
    }
    return 'General Application';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-50';
      case 'REJECTED': return 'text-red-600 bg-red-50';
      case 'PENDING': return 'text-yellow-600 bg-yellow-50';
      case 'PROCESSING': return 'text-blue-600 bg-blue-50';
      case 'UNDER_REVIEW': return 'text-purple-600 bg-purple-50';
      
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
        {/* Welcome Section */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Welcome back, {profile?.name || 'User'}!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 lg:mt-2">Here's what's happening with your applications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-50">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-50">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <button
            onClick={() => router.push('/user/profile')}
            className="bg-white rounded-lg shadow p-4 lg:p-6 hover:shadow-lg transition-shadow text-left"
          >
            <User className="h-6 w-6 lg:h-8 lg:w-8 text-teal-600 mb-2 lg:mb-3" />
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-1 lg:mb-2">Profile</h3>
            <p className="text-xs lg:text-sm text-gray-600">View and update your personal information</p>
          </button>

          <button
            onClick={() => router.push('/user/applications')}
            className="bg-white rounded-lg shadow p-4 lg:p-6 hover:shadow-lg transition-shadow text-left"
          >
            <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600 mb-2 lg:mb-3" />
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-1 lg:mb-2">Applications</h3>
            <p className="text-xs lg:text-sm text-gray-600">Track all your loan and card applications</p>
          </button>

          <button
            onClick={() => router.push('/loan')}
            className="bg-white rounded-lg shadow p-4 lg:p-6 hover:shadow-lg transition-shadow text-left sm:col-span-3 md:col-span-1"
          >
            <CreditCard className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600 mb-2 lg:mb-3" />
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-1 lg:mb-2">Apply Now</h3>
            <p className="text-xs lg:text-sm text-gray-600">Browse and apply for new loans or cards</p>
          </button>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Recent Applications</h2>
          </div>
          
          {applications.length === 0 ? (
            <div className="px-4 lg:px-6 py-8 lg:py-12 text-center">
              <FileText className="h-10 w-10 lg:h-12 lg:w-12 text-gray-400 mx-auto mb-3 lg:mb-4" />
              <p className="text-sm lg:text-base text-gray-600">No applications yet</p>
              <button
                onClick={() => router.push('/loan')}
                className="mt-3 lg:mt-4 bg-teal-500 text-white px-4 lg:px-6 py-2 rounded-md hover:bg-teal-600 transition-colors text-sm lg:text-base"
              >
                Apply for a Loan
              </button>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block md:hidden">
                {applications.map((app) => (
                  <div key={app.id} className="border-b border-gray-200 p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">{app.type}</p>
                          {app.type === 'CREDIT_CARD' && app.cardType && (
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs font-medium border border-purple-200 capitalize">
                              {app.cardType}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{getProductName(app)}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-xs text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</p>
                      <button
                        onClick={() => router.push('/user/applications')}
                        className="text-teal-600 hover:text-teal-800 font-medium text-xs"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            <span>{app.type}</span>
                            {app.type === 'CREDIT_CARD' && app.cardType && (
                              <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs font-medium border border-purple-200 capitalize">
                                {app.cardType}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {getProductName(app)}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => router.push('/user/applications')}
                            className="text-teal-600 hover:text-teal-800 font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          
          {applications.length > 0 && (
            <div className="px-4 lg:px-6 py-3 lg:py-4 border-t border-gray-200 text-center">
              <button
                onClick={() => router.push('/user/applications')}
                className="text-teal-600 hover:text-teal-800 font-medium text-xs lg:text-sm"
              >
                View All Applications →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
