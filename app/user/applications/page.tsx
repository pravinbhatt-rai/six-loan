"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/component/HomePage/navbar';
import { FileText, Clock, CheckCircle, XCircle, Eye, Calendar } from 'lucide-react';

interface Application {
  id: number;
  referenceNo?: string;
  type: string;
  status: string;
  amount?: number;
  tenure?: number;
  createdAt: string;
  updatedAt?: string;
  feedback?: string;
  categoryName?: string;
  categorySlug?: string;
  cardType?: string;
  applicantName?: string;
  email?: string;
  phone?: string;
  panNumber?: string;
  employmentType?: string;
  monthlyIncome?: string;
  employerName?: string;
  workExperience?: string;
  designation?: string;
  residenceType?: string;
  city?: string;
  pincode?: string;
  address?: string;
  additionalInfo?: string;
  documents?: string[];
  loan?: {
    id: number;
    title: string;
    bankName: string;
    slug: string;
  };
  card?: {
    id: number;
    name: string;
    bankName?: string;
  };
  insurance?: {
    id: number;
    name: string;
    provider?: string;
  };
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    let isMounted = true;
    const loadApplications = async () => {
      if (isMounted) {
        await fetchApplications();
      }
    };
    loadApplications();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (selectedApp) {
      console.log('Selected app feedback:', selectedApp.feedback);
      console.log('Full selected app:', selectedApp);
    }
  }, [selectedApp]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/users/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.applications) {
          const apps = data.applications;
          setApplications(apps);
          
          setStats({
            total: apps.length,
            pending: apps.filter((a: Application) => 
              a.status === 'PENDING' || a.status === 'PROCESSING' || a.status === 'UNDER_REVIEW'
            ).length,
            approved: apps.filter((a: Application) => a.status === 'APPROVED').length,
            rejected: apps.filter((a: Application) => a.status === 'REJECTED').length,
          });
        }
      } else if (response.status === 401) {
        router.push('/login');
      } else {
        console.error('Failed to fetch applications:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (appId: number) => {
    if (!confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/users/applications/${appId}/withdraw`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Application withdrawn successfully');
        fetchApplications(); 
        setSelectedApp(null); 
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to withdraw application');
      }
    } catch (error) {
      console.error('Failed to withdraw application:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleReapply = (app: Application) => {
    if (app.categorySlug) {
      router.push(`/loandetails?category=${app.categorySlug}`);
    } else {
      router.push('/loandetails');
    }
  };

  const getProductName = (app: Application) => {
    if (app.loan) return `${app.loan.bankName} ${app.loan.title}`;
    if (app.card) return `${app.card.bankName || ''} ${app.card.name}`.trim();
    if (app.insurance) return `${app.insurance.provider || ''} ${app.insurance.name}`.trim();
    if (app.categoryName) return app.categoryName;
    return 'General Application';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'PROCESSING':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'UNDER_REVIEW':
        return <Eye className="w-5 h-5 text-purple-600" />;
      case 'IN_PROGRESS':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-700';
      case 'UNDER_REVIEW':
        return 'bg-purple-100 text-purple-700';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'WITHDRAWN':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading applications...</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Total</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm border border-yellow-200">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-yellow-700">{stats.pending}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm border border-green-200">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-green-700">{stats.approved}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Approved</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm border border-red-200">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <XCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-600" />
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-red-700">{stats.rejected}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Rejected</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">My Applications</h1>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600">Track the status of your loan applications</p>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <FileText className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1 sm:mb-2">No Applications Yet</h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">You haven't applied for any loans yet</p>
                <button
                  onClick={() => router.push('/')}
                  className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Explore Loans
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Main Container: Flex Col on Mobile, Flex Row on Desktop (md) */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      
                      {/* Left Side: Icon and Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">{getStatusIcon(app.status)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                                {getProductName(app)}
                              </h3>
                              {app.referenceNo && (
                                <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-mono font-semibold border border-teal-200 whitespace-nowrap">
                                  {app.referenceNo}
                                </span>
                              )}
                            </div>
                            {app.categoryName && (
                              <div className="flex items-center gap-2 mb-1.5">
                                <p className="text-xs sm:text-sm text-gray-600">{app.categoryName}</p>
                                {app.type === 'CREDIT_CARD' && app.cardType && (
                                  <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs font-medium border border-purple-200 capitalize">
                                    {app.cardType}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                {app.status.replace('_', ' ')}
                              </span>
                              {app.amount && (
                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                  ₹{app.amount.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Date and Buttons */}
                      {/* Mobile: Full width with top border. Desktop: Right aligned, no border */}
                      <div className="flex flex-col sm:flex-row md:flex-row items-start sm:items-center md:items-center gap-3 sm:gap-4 md:gap-6 pt-3 mt-1 border-t border-gray-100 md:border-0 md:pt-0 md:mt-0">
                        
                        {/* Applied On Date */}
                        <div className="text-left md:text-right w-full sm:w-auto">
                          <p className="text-xs text-gray-500 flex items-center md:justify-end gap-1 mb-0.5">
                            <Calendar className="w-3 h-3" />
                            Applied on
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(app.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-row md:flex-col gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 whitespace-nowrap"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          
                          {/* Re-enable these if you need them, they are currently commented out in your code
                          {app.status === 'WITHDRAWN' ? (
                             <button onClick={() => handleReapply(app)} className="...">Re-apply</button>
                          ) : ... } 
                          */}
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL SECTION */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative">
            
            {/* Modal Header */}
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">Application Details</h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
              {/* Reference Number */}
              {selectedApp.referenceNo && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Reference Number</label>
                  <p className="text-base sm:text-lg font-mono font-bold text-blue-700 break-all">{selectedApp.referenceNo}</p>
                </div>
              )}

              {/* Applicant Information */}
              {selectedApp.applicantName && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Applicant Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                      <p className="text-sm sm:text-base text-gray-800 font-medium break-words">{selectedApp.applicantName}</p>
                    </div>
                    {selectedApp.email && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium break-all">{selectedApp.email}</p>
                      </div>
                    )}
                    {selectedApp.phone && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium">{selectedApp.phone}</p>
                      </div>
                    )}
                    {selectedApp.panNumber && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">PAN Number</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium">{selectedApp.panNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Product Information */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Product Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Product Name</label>
                    <p className="text-gray-800 font-medium text-base sm:text-lg break-words">
                      {getProductName(selectedApp)}
                    </p>
                  </div>
                  {selectedApp.categoryName && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                      <div className="flex items-center gap-2">
                        <p className="text-sm sm:text-base text-gray-800 font-medium">{selectedApp.categoryName}</p>
                        {selectedApp.type === 'CREDIT_CARD' && selectedApp.cardType && (
                          <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium border border-purple-200 capitalize">
                            {selectedApp.cardType} Card
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {selectedApp.amount && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Requested Amount</label>
                      <p className="text-sm sm:text-base text-gray-800 font-medium">₹{selectedApp.amount.toLocaleString()}</p>
                    </div>
                  )}  {selectedApp.tenure && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Tenure</label>
                      <p className="text-sm sm:text-base text-gray-800 font-medium">{selectedApp.tenure} months</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Application Status */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Status</h3>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    {getStatusIcon(selectedApp.status)}
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(selectedApp.status)}`}>
                      {selectedApp.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Applied on {new Date(selectedApp.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Employment Details */}
              {selectedApp.employmentType && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Employment Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Employment Type</label>
                      <p className="text-sm sm:text-base text-gray-800 font-medium">{selectedApp.employmentType}</p>
                    </div>
                    {selectedApp.monthlyIncome && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Monthly Income</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium">₹{selectedApp.monthlyIncome}</p>
                      </div>
                    )}
                    {selectedApp.employerName && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Employer Name</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium break-words">{selectedApp.employerName}</p>
                      </div>
                    )}
                    {selectedApp.workExperience && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Work Experience</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium">{selectedApp.workExperience}</p>
                      </div>
                    )}
                    {selectedApp.designation && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Designation</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium break-words">{selectedApp.designation}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Residence Details */}
              {(selectedApp.residenceType || selectedApp.city) && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Residence Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                    {selectedApp.residenceType && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Residence Type</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium">{selectedApp.residenceType}</p>
                      </div>
                    )}
                    {selectedApp.city && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">City</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium">{selectedApp.city}</p>
                      </div>
                    )}
                    {selectedApp.pincode && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Pincode</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium">{selectedApp.pincode}</p>
                      </div>
                    )}
                    {selectedApp.address && (
                      <div className="col-span-1 sm:col-span-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Full Address</label>
                        <p className="text-sm sm:text-base text-gray-800 font-medium break-words">{selectedApp.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Feedback from Admin */}
              {selectedApp.feedback && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Admin Feedback</h3>
                  <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm sm:text-base text-gray-800 break-words">{selectedApp.feedback}</p>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {selectedApp.additionalInfo && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Additional Information</h3>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-sm sm:text-base text-gray-800 break-words">{selectedApp.additionalInfo}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
                {selectedApp.status === 'WITHDRAWN' ? (
                  <>
                    <button
                      onClick={() => handleReapply(selectedApp)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
                    >
                      Re-apply for this Product
                    </button>
                    <button
                      onClick={() => setSelectedApp(null)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                    >
                      Close
                    </button>
                  </>
                ) : selectedApp.status !== 'APPROVED' && selectedApp.status !== 'REJECTED' ? (
                  <>
                    <button
                      onClick={() => handleWithdraw(selectedApp.id)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm sm:text-base"
                    >
                      Withdraw Application
                    </button>
                    <button
                      onClick={() => setSelectedApp(null)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}