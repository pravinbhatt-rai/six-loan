"use client";
import React, { useState } from 'react';
import { Calendar, User, Briefcase, FileText, TrendingUp, X, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface Application {
  id: number;
  referenceNo?: string;
  type: string;
  categoryName?: string;
  categorySlug?: string;
  status: string;
  amount?: number;
  createdAt: string;
  applicantName?: string;
  email?: string;
  phone?: string;
  employmentType?: string;
  annualIncome?: number;
  employerName?: string;
  productDetails?: any;
  user?: {
    name: string;
    email: string;
    phone: string;
    employment?: {
      employmentType: string;
      currentEmployer?: string;
      businessName?: string;
      annualIncome: number;
    };
  };
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

interface ApplicationsTableProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
}

export default function ApplicationsTable({ applications, onSelectApplication }: ApplicationsTableProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; bgColor: string; icon: any }> = {
      PENDING: { color: 'text-amber-700', bgColor: 'bg-amber-50 border-amber-200', icon: Clock },
      PROCESSING: { color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200', icon: AlertCircle },
      UNDER_REVIEW: { color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200', icon: FileText },
      APPROVED: { color: 'text-green-700', bgColor: 'bg-green-50 border-green-200', icon: CheckCircle },
      REJECTED: { color: 'text-red-700', bgColor: 'bg-red-50 border-red-200', icon: XCircle },
      IN_PROGRESS: { color: 'text-cyan-700', bgColor: 'bg-cyan-50 border-cyan-200', icon: TrendingUp },
      WITHDRAWN: { color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-200', icon: X },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bgColor} ${config.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getProductIcon = (type: string) => {
    if (type === 'LOAN') return '💰';
    if (type === 'CREDIT_CARD') return '💳';
    if (type === 'INSURANCE') return '🛡️';
    return '📄';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getProductDetails = (app: Application) => {
    const details: { label: string; value: string }[] = [];

    // Get product name
    const productName = app.loan?.title || app.card?.name || app.insurance?.name || 'N/A';
    details.push({ label: 'Product', value: productName });

    // Amount (if applicable)
    if (app.amount) {
      details.push({ label: 'Amount', value: `₹${app.amount.toLocaleString('en-IN')}` });
    }

    // Product-specific details from JSON
    if (app.productDetails) {
      const pd = app.productDetails as any;
      
      // Personal Loan
      if (pd.loanPurpose) details.push({ label: 'Purpose', value: pd.loanPurpose });
      
      // Home Loan
      if (pd.propertyType) details.push({ label: 'Property Type', value: pd.propertyType });
      if (pd.propertyAddress) details.push({ label: 'Location', value: pd.propertyAddress });
      
      // Education Loan
      if (pd.courseName) details.push({ label: 'Course', value: pd.courseName });
      if (pd.universityName) details.push({ label: 'University', value: pd.universityName });
      
      // Vehicle Loan
      if (pd.vehicleMake) details.push({ label: 'Vehicle', value: `${pd.vehicleMake} ${pd.vehicleModel || ''}` });
      
      // Business Loan
      if (pd.businessPurpose) details.push({ label: 'Purpose', value: pd.businessPurpose });
      if (pd.businessTurnover) details.push({ label: 'Turnover', value: `₹${pd.businessTurnover.toLocaleString('en-IN')}` });
      
      // Credit Card
      if (pd.desiredCreditLimit) details.push({ label: 'Desired Limit', value: `₹${pd.desiredCreditLimit.toLocaleString('en-IN')}` });
    }

    return details.slice(0, 3); // Show max 3 details
  };

  const getEmploymentSummary = (app: Application) => {
    const employment = app.user?.employment;
    if (employment) {
      const type = employment.employmentType;
      const company = employment.currentEmployer || employment.businessName || 'N/A';
      const income = employment.annualIncome ? `₹${(employment.annualIncome / 100000).toFixed(1)}L` : 'N/A';
      return { type, company, income };
    }
    
    // Fallback to application fields
    return {
      type: app.employmentType || 'N/A',
      company: app.employerName || 'N/A',
      income: app.annualIncome ? `₹${(app.annualIncome / 100000).toFixed(1)}L` : 'N/A'
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Application Type & Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Applicant Summary
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Product Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm font-medium">No applications found</p>
                  <p className="text-xs text-slate-400 mt-1">Applications will appear here once submitted</p>
                </td>
              </tr>
            ) : (
              applications.map((app) => {
                const employment = getEmploymentSummary(app);
                const productDetails = getProductDetails(app);
                
                return (
                  <tr 
                    key={app.id} 
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                      selectedRow === app.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setSelectedRow(app.id);
                      onSelectApplication(app);
                    }}
                  >
                    {/* Application Type & Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-1">{getProductIcon(app.type)}</span>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {app.categoryName || app.type}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(app.createdAt)}
                          </div>
                          {app.referenceNo && (
                            <div className="text-xs text-slate-400 mt-0.5 font-mono">
                              {app.referenceNo}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Applicant Summary */}
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-900">
                            {app.applicantName || app.user?.name || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-slate-400" />
                          <span className="text-xs text-slate-600">
                            {employment.type} • {employment.company}
                          </span>
                        </div>
                        <div className="text-xs text-emerald-600 font-semibold">
                          Income: {employment.income}/year
                        </div>
                      </div>
                    </td>

                    {/* Product Details */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {productDetails.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <span className="text-slate-500 font-medium">{detail.label}:</span>
                            <span className="text-slate-700">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(app.status)}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectApplication(app);
                        }}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
