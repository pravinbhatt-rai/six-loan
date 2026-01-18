"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Download, X, ExternalLink, RefreshCw } from 'lucide-react';
import * as XLSX from 'xlsx';

// Helper function to format date as DD/MM/YYYY
const formatDateToDisplay = (isoDate: string | Date) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState('monthly'); // daily, weekly, monthly, yearly
  const [categoryFilter, setCategoryFilter] = useState('all'); // Category filter
  const [statusFilter, setStatusFilter] = useState('all'); // Status filter
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  
  // Custom date range states
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [customYears, setCustomYears] = useState('1'); // For year-based filtering
  
  // Modal state
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch applications with filters
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Construct query parameters
      const params = new URLSearchParams({
        period: period
      });
      
      // Add custom date range if provided
      if (period === 'custom' && customStartDate && customEndDate) {
        params.set('startDate', customStartDate);
        params.set('endDate', customEndDate);
      }
      
      // Add custom years if provided
      if (period === 'years' && customYears) {
        params.set('years', customYears);
      }
      
      if (categoryFilter !== 'all') {
        params.append('categorySlug', categoryFilter);
      }
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      if (searchQuery.trim() !== '') {
        params.append('search', searchQuery);
      }

      // Use the correct API endpoint - adjust if your port is different
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const url = `${baseUrl}/api/admin/applications?${params.toString()}`;
      
      const response = await fetch(url, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        throw new Error(`Failed to fetch applications: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data)) {
        setApplications(data);
      } else if (data.applications) {
        setApplications(data.applications);
      } else if (data.data) {
        setApplications(data.data);
      } else {
        setApplications([]);
        console.warn('Unexpected response format:', data);
      }
      
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      setError(error.message || 'Failed to load applications. Please try again.');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [period, categoryFilter, statusFilter, searchQuery, customStartDate, customEndDate, customYears, router]);

  // Initial fetch and on filter changes
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Handle download export - Export based on application type
  const handleDownload = () => {
    try {
      // Determine application type and prepare type-specific data
      const excelData = filteredApplications.map((app, index) => {
        const category = (app.categoryName || app.category || '').toLowerCase();
        const isCreditCard = category.includes('credit') || app.type === 'CREDIT_CARD';
        const isInsurance = category.includes('insurance') || app.type === 'INSURANCE';
        const isLoan = !isCreditCard && !isInsurance;
        
        // Determine loan sub-type
        const loanCategory = category;
        const isPersonalLoan = loanCategory.includes('personal');
        const isHomeLoan = loanCategory.includes('home') || loanCategory.includes('property');
        const isBusinessLoan = loanCategory.includes('business');
        const isEducationLoan = loanCategory.includes('education');
        const isVehicleLoan = loanCategory.includes('car') || loanCategory.includes('bike') || loanCategory.includes('vehicle');
        
        // Common fields for all types
        const commonFields = {
          'S.No': index + 1,
          
          // User Information
          'User ID': app.userId ? `UID-${app.userId}` : 'N/A',
          'Account Holder Name': app.user?.name || 'N/A',
          'Account Email': app.user?.email || 'N/A',
          'Account Phone': app.user?.phone || 'N/A',
          
          // Application Information
          'Reference Number': app.referenceNo || 'N/A',
          
          // Applicant Details
          'Applicant Name': app.applicantName || app.user?.name || 'N/A',
          'Applicant Email': app.email || app.user?.email || 'N/A',
          'Applicant Phone': app.phone || app.user?.phone || 'N/A',
          'PAN Number': app.panNumber || 'N/A',
          
          // Product Information
          'Category': app.categoryName || app.category || 'N/A',
          'Product Name': app.loan?.title || app.loanProduct?.title || app.loanProduct?.name || 
                          app.card?.name || app.creditCardProduct?.name || 
                          app.insurance?.name || app.insuranceProduct?.name || 
                          app.productName || 'Unknown',
          
          // Employment Details
          'Employment Type': app.employmentType || 'N/A',
          'Monthly Income': app.monthlyIncome ? `₹${app.monthlyIncome.toLocaleString()}` : 'N/A',
          'Employer Name': app.employerName || 'N/A',
          'Designation': app.designation || 'N/A',
          'Work Experience': app.workExperience || 'N/A',
          
          // Residence Details
          'Residence Type': app.residenceType || 'N/A',
          'City': app.city || 'N/A',
          'Pincode': app.pincode || 'N/A',
          'Address': app.address || 'N/A',
          
          // Application Status
          'Status': app.status || 'PENDING',
          'Feedback': app.feedback || 'N/A',
          
          // Dates
          'Applied On': app.createdAt ? formatDateToDisplay(app.createdAt) : 'N/A',
          'Last Updated': app.updatedAt ? new Date(app.updatedAt).toLocaleString() : 'Never',
          
          // Additional Information
          'Additional Info': app.additionalInfo || 'N/A',
          
          // Reference Details
          'Reference 1 Name': app.reference1Name || 'N/A',
          'Reference 1 Phone': app.reference1Phone || 'N/A',
          'Reference 2 Name': app.reference2Name || 'N/A',
          'Reference 2 Phone': app.reference2Phone || 'N/A',
          
          // Financial Details
          'Existing EMI': app.existingEmi ? `₹${app.existingEmi.toLocaleString()}` : 'N/A',
          'Other Loans': app.otherLoans || 'N/A',
          'Credit Score': app.creditScore || 'N/A',
          
          // Document Status
          'Documents Uploaded': app.documents ? app.documents.length : 0,
          'KYC Status': app.kycStatus || 'N/A',
        };

        // Type-specific fields
        if (isCreditCard) {
          return {
            ...commonFields,
            // Credit Card Specific
            'Card Type': app.cardType || app.card?.cardType || 'N/A',
            'Card Network': app.card?.cardNetwork || 'N/A',
            'Bank Name': app.card?.bankName || 'N/A',
            'Annual Fee': app.card?.annualFee || 'N/A',
            'First Year Fee': app.card?.firstYearFee || 'N/A',
            'Second Year Fee': app.card?.secondYearFee || 'N/A',
            'Credit Limit Requested': app.amount ? `₹${app.amount.toLocaleString()}` : 'N/A',
          };
        } else if (isInsurance) {
          return {
            ...commonFields,
            // Insurance Specific
            'Insurance Type': app.insurance?.type || 'N/A',
            'Coverage Amount': app.amount ? `₹${app.amount.toLocaleString()}` : 'N/A',
            'Premium Amount': app.insurance?.premiumAmount || 'N/A',
            'Policy Tenure': app.tenure || 'N/A',
            'Nominee Name': app.nomineeName || 'N/A',
            'Nominee Relation': app.nomineeRelation || 'N/A',
          };
        } else {
          // Loan fields - add common loan fields first
          const loanFields = {
            ...commonFields,
            // Common Loan Details
            'Requested Amount': app.amount ? `₹${app.amount.toLocaleString()}` : 'N/A',
            'Tenure (Months)': app.tenure || 'N/A',
            'Bank Name': app.loan?.bankName || 'N/A',
            'Interest Rate': app.loan?.interestRateText || 'N/A',
            'EMI Amount': app.loan?.emiAmount || 'N/A',
            'Processing Time': app.loan?.processTimeLabel || 'N/A',
            'Max Amount': app.loan?.maxAmount || 'N/A',
            'APR': app.loan?.aprText || 'N/A',
          };

          // Add category-specific loan fields
          if (isBusinessLoan) {
            return {
              ...loanFields,
              'Company Name': app.companyName || 'N/A',
              'Business Type': app.businessType || 'N/A',
              'Company Turnover': app.companyTurnover ? `₹${app.companyTurnover.toLocaleString()}` : 'N/A',
              'Years in Business': app.yearsInBusiness || 'N/A',
              'GST Number': app.gstNumber || 'N/A',
            };
          } else if (isHomeLoan) {
            return {
              ...loanFields,
              'Property Type': app.propertyType || 'N/A',
              'Property Value': app.propertyValue ? `₹${app.propertyValue.toLocaleString()}` : 'N/A',
              'Property Location': app.propertyLocation || 'N/A',
              'Co-Applicant Name': app.coApplicantName || 'N/A',
              'Co-Applicant Relation': app.coApplicantRelation || 'N/A',
              'Co-Applicant Income': app.coApplicantIncome ? `₹${app.coApplicantIncome.toLocaleString()}` : 'N/A',
            };
          } else if (isEducationLoan) {
            return {
              ...loanFields,
              'Institution Name': app.institutionName || 'N/A',
              'Course Name': app.courseName || 'N/A',
              'Course Duration': app.courseDuration || 'N/A',
              'Co-Applicant Name': app.coApplicantName || 'N/A',
              'Co-Applicant Relation': app.coApplicantRelation || 'N/A',
              'Co-Applicant Income': app.coApplicantIncome ? `₹${app.coApplicantIncome.toLocaleString()}` : 'N/A',
            };
          } else if (isVehicleLoan) {
            return {
              ...loanFields,
              'Vehicle Type': app.vehicleType || 'N/A',
              'Vehicle Make': app.vehicleMake || 'N/A',
              'Vehicle Model': app.vehicleModel || 'N/A',
              'Vehicle Year': app.vehicleYear || 'N/A',
              'Vehicle Price': app.vehiclePrice ? `₹${app.vehiclePrice.toLocaleString()}` : 'N/A',
              'Down Payment': app.downPayment ? `₹${app.downPayment.toLocaleString()}` : 'N/A',
            };
          } else {
            // Personal Loan or other loan types
            return {
              ...loanFields,
              'Loan Purpose': app.loanPurpose || app.additionalInfo || 'N/A',
            };
          }
        }
      });

      // Create workbook and worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');

      // Set column widths for better readability
      const columnWidths = [
        { wch: 8 },   // S.No
        { wch: 15 },  // User ID
        { wch: 25 },  // Account Holder Name
        { wch: 30 },  // Account Email
        { wch: 15 },  // Account Phone
        { wch: 20 },  // Reference Number
        { wch: 25 },  // Applicant Name
        { wch: 30 },  // Applicant Email
        { wch: 15 },  // Applicant Phone
        { wch: 15 },  // PAN Number
        { wch: 20 },  // Category
        { wch: 30 },  // Product Name
        { wch: 18 },  // Requested Amount
        { wch: 15 },  // Tenure
        { wch: 18 },  // Employment Type
        { wch: 18 },  // Monthly Income
        { wch: 25 },  // Employer Name
        { wch: 20 },  // Designation
        { wch: 18 },  // Work Experience
        { wch: 18 },  // Residence Type
        { wch: 15 },  // City
        { wch: 12 },  // Pincode
        { wch: 40 },  // Address
        { wch: 15 },  // Status
        { wch: 30 },  // Feedback
        { wch: 22 },  // Applied On
        { wch: 22 },  // Last Updated
        { wch: 30 },  // Additional Info
        { wch: 25 },  // Bank Name
      ];
      worksheet['!cols'] = columnWidths;

      // Generate filename with date range and filters
      const dateStr = new Date().toISOString().split('T')[0];
      const filterStr = categoryFilter !== 'all' ? `_${categoryFilter}` : '';
      const statusStr = statusFilter !== 'all' ? `_${statusFilter}` : '';
      
      let periodStr = `_${period}`;
      if (period === 'custom' && customStartDate && customEndDate) {
        periodStr = `_${customStartDate}_to_${customEndDate}`;
      } else if (period === 'years' && customYears) {
        periodStr = `_last_${customYears}_years`;
      }
      
      const filename = `applications${periodStr}${filterStr}${statusStr}_${dateStr}.xlsx`;

      // Download the file
      XLSX.writeFile(workbook, filename);
      
      alert(`Successfully exported ${excelData.length} applications to Excel!`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('An error occurred during export. Please try again.');
    }
  };

  // Quick date range helpers
  const setQuickDateRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    setCustomStartDate(start.toISOString().split('T')[0]);
    setCustomEndDate(end.toISOString().split('T')[0]);
  };

  const setThisWeek = () => {
    const end = new Date();
    const start = new Date();
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    start.setDate(diff);
    
    setCustomStartDate(start.toISOString().split('T')[0]);
    setCustomEndDate(end.toISOString().split('T')[0]);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApplications();
  };

  // Handle view details
  const handleViewDetails = (app: any) => {
    setSelectedApp(app);
    setFeedback(app.feedback || "");
    setStatus(app.status || "PENDING");
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedApp(null);
    setFeedback("");
    setStatus("");
  };

  // Handle update application
  const handleUpdateApp = async () => {
    if (!selectedApp) return;
    
    console.log('=== UPDATE APPLICATION START ===');
    console.log('Application ID:', selectedApp.id);
    console.log('Current Status:', selectedApp.status);
    console.log('New Status:', status);
    console.log('Feedback:', feedback);
    
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const endpoint = `${baseUrl}/api/admin/applications/${selectedApp.id}`;
      
      console.log('Making PUT request to:', endpoint);
      
      const requestBody = { 
        status: status, 
        feedback: feedback,
        updatedAt: new Date().toISOString()
      };
      
      console.log('Request body:', requestBody);
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Update successful:', responseData);
        
        // Refresh the list
        await fetchApplications();
        handleCloseModal();
        alert('Application updated successfully!');
        console.log('=== UPDATE APPLICATION SUCCESS ===');
      } else {
        const errorData = await response.json();
        console.error('Update failed:', errorData);
        alert(`Failed to update application: ${errorData.message || errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Error updating application. Please try again.');
    } finally {
      setIsUpdating(false);
      console.log('=== UPDATE APPLICATION END ===');
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchApplications();
  };

  // Filter applications based on selected date range (client-side validation)
  const filteredApplications = React.useMemo(() => {
    let filtered = applications;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Apply date filtering based on period
    if (period === 'daily') {
      // Only TODAY's applications
      filtered = applications.filter(app => {
        const appDate = new Date(app.createdAt);
        const appDay = new Date(appDate.getFullYear(), appDate.getMonth(), appDate.getDate());
        return appDay.getTime() === today.getTime();
      });
    } else if (period === 'weekly') {
      // This week's applications (Monday to Sunday)
      const startOfWeek = new Date(today);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      filtered = applications.filter(app => {
        const appDate = new Date(app.createdAt);
        return appDate >= startOfWeek && appDate <= endOfWeek;
      });
    } else if (period === 'monthly') {
      // This month's applications
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      
      filtered = applications.filter(app => {
        const appDate = new Date(app.createdAt);
        return appDate >= startOfMonth && appDate <= endOfMonth;
      });
    } else if (period === 'yearly') {
      // This year's applications
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      
      filtered = applications.filter(app => {
        const appDate = new Date(app.createdAt);
        return appDate >= startOfYear && appDate <= endOfYear;
      });
    } else if (period === 'custom' && customStartDate && customEndDate) {
      // Custom date range
      const start = new Date(customStartDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(customEndDate);
      end.setHours(23, 59, 59, 999);
      
      filtered = applications.filter(app => {
        const appDate = new Date(app.createdAt);
        return appDate >= start && appDate <= end;
      });
    } else if (period === 'years' && customYears) {
      // Last X years
      const yearsAgo = new Date(now);
      yearsAgo.setFullYear(yearsAgo.getFullYear() - parseInt(customYears));
      yearsAgo.setHours(0, 0, 0, 0);
      
      filtered = applications.filter(app => {
        const appDate = new Date(app.createdAt);
        return appDate >= yearsAgo;
      });
    }
    
    console.log(`📊 Date Filter Applied: ${period}`);
    console.log(`Total applications from API: ${applications.length}`);
    console.log(`Filtered applications: ${filtered.length}`);
    
    return filtered;
  }, [applications, period, customStartDate, customEndDate, customYears]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Applications</h1>
            <p className="text-gray-500 mt-1">Track and manage customer applications.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            <button 
              onClick={handleDownload}
              disabled={applications.length === 0}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              Export to Excel
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-600 font-medium">Error Loading Applications</p>
                <p className="text-red-500 text-sm mt-1">{error}</p>
              </div>
              <button 
                onClick={handleRefresh}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Active Filters Info */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {filteredApplications.length > 0 ? (
                <>
                  <span className="text-sm font-medium text-blue-800">
                    ✓ Showing {filteredApplications.length} application(s)
                  </span>
                  {period === 'daily' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      📅 Today Only ({new Date().toLocaleDateString()})
                    </span>
                  )}
                  {period === 'weekly' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      📅 This Week
                    </span>
                  )}
                  {period === 'monthly' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      📅 This Month ({new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})
                    </span>
                  )}
                  {period === 'yearly' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      📅 This Year ({new Date().getFullYear()})
                    </span>
                  )}
                  {period === 'custom' && customStartDate && customEndDate && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      📅 {customStartDate} to {customEndDate}
                    </span>
                  )}
                  {period === 'years' && customYears && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      📅 Last {customYears} year(s)
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm font-medium text-blue-800">
                  ⚠️ No applications found for selected period
                </span>
              )}
              {categoryFilter !== 'all' && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  🏷️ {categoryFilter}
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  ✓ {statusFilter}
                </span>
              )}
            </div>
            {filteredApplications.length > 0 && (
              <span className="text-xs text-blue-600 font-medium">
                Excel export will include only these {filteredApplications.length} result(s)
              </span>
            )}
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md w-full">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={handleSearch}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                  placeholder="Search by name, email, or product..." 
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </form>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                {/* Category Filter */}
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[180px]"
                >
                  <option value="all">All Categories</option>
                  <option value="personalloan">Personal Loan</option>
                  <option value="business-loan">Business Loan</option>
                  <option value="professional-loan">Professional Loan</option>
                  <option value="home-loan">Home Loan</option>
                  <option value="loan-against-property">Loan Against Property</option>
                  <option value="transfer-home-loan">Transfer Home Loan</option>
                  <option value="transfer-personal-loan">Transfer Personal Loan</option>
                  <option value="loan-against-security">Loan Against Security</option>
                  <option value="education-loan">Education Loan</option>
                  <option value="used-car">Used Car Loan</option>
                  <option value="used-bike">Used Bike Loan</option>
                  <option value="new-car">New Car Loan</option>
                  <option value="new-bike">New Bike Loan</option>
                  <option value="car-insurance">Car Insurance</option>
                  <option value="health-insurance">Health Insurance</option>
                </select>

                {/* Status Filter */}
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[150px]"
                >
                  <option value="all">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="PROCESSING">Processing</option>
                </select>
                
                {/* Period Filter with Custom Options */}
                <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
                  {['daily', 'weekly', 'monthly', 'yearly'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setPeriod(p);
                        setShowCustomDatePicker(false);
                      }}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                        period === p 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomDatePicker(!showCustomDatePicker);
                      if (!showCustomDatePicker) {
                        setPeriod('custom');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      period === 'custom' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Custom
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomDatePicker(!showCustomDatePicker);
                      if (!showCustomDatePicker) {
                        setPeriod('years');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      period === 'years' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Years
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom Date Range Picker */}
          {showCustomDatePicker && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              {period === 'custom' ? (
                <div className="space-y-4">
                  {/* Quick Selection Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => { setQuickDateRange(2); }}
                      className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Last 2 Days
                    </button>
                    <button
                      onClick={() => { setQuickDateRange(7); }}
                      className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Last 7 Days
                    </button>
                    <button
                      onClick={() => { setThisWeek(); }}
                      className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      This Week
                    </button>
                    <button
                      onClick={() => { setQuickDateRange(30); }}
                      className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Last 30 Days
                    </button>
                    <button
                      onClick={() => { setQuickDateRange(90); }}
                      className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Last 90 Days
                    </button>
                  </div>
                  
                  {/* Date Inputs */}
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        max={customEndDate || undefined}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        min={customStartDate || undefined}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (customStartDate && customEndDate) {
                          fetchApplications();
                        } else {
                          alert('Please select both start and end dates');
                        }
                      }}
                      disabled={!customStartDate || !customEndDate}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              ) : period === 'years' ? (
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                  <div className="flex-1 max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Years
                    </label>
                    <select
                      value={customYears}
                      onChange={(e) => setCustomYears(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="1">Last 1 Year</option>
                      <option value="2">Last 2 Years</option>
                      <option value="3">Last 3 Years</option>
                      <option value="4">Last 4 Years</option>
                      <option value="5">Last 5 Years</option>
                      <option value="6">Last 6 Years</option>
                      <option value="7">Last 7 Years</option>
                      <option value="10">Last 10 Years</option>
                    </select>
                  </div>
                  <button
                    onClick={() => fetchApplications()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Apply Filter
                  </button>
                </div>
              ) : null}
            </div>
          )}

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th className="px-6 py-4 font-semibold">User ID</th>
                  <th className="px-6 py-4 font-semibold">Applicant</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Product Name</th>
                  <th className="px-6 py-4 font-semibold">Employment</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-gray-500">Loading applications...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search size={48} className="text-gray-300" />
                        <p className="text-gray-500 font-medium">No applications found</p>
                        <p className="text-gray-400 text-sm">
                          {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all' 
                            ? 'Try changing your filters or search query' 
                            : 'No applications have been submitted yet'}
                        </p>
                        <button 
                          onClick={handleRefresh}
                          className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Refresh
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr 
                      key={app.id || app._id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleViewDetails(app)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded font-mono text-xs font-semibold">
                            UID-{app.userId || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {app.applicantName || app.user?.name || 'N/A'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {app.user?.email || app.email || 'No email'}
                          </p>
                          {app.phone && (
                            <p className="text-xs text-gray-500 mt-1">{app.phone}</p>
                          )}
                          {app.referenceNo && (
                            <p className="text-xs font-mono font-semibold text-teal-600 mt-1 bg-teal-50 px-2 py-0.5 rounded inline-block">
                              {app.referenceNo}
                            </p>
                          )}
                          {app.applicantName && app.applicantName !== app.user?.name && (
                            <p className="text-xs text-blue-600 mt-1">Account: {app.user?.name}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {app.categoryName || app.category || 'N/A'}
                          </span>
                          {app.type === 'CREDIT_CARD' && app.cardType && (
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded capitalize">
                              {app.cardType} Card
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">
                          {app.loan?.title || app.loanProduct?.title || app.loanProduct?.name || 
                           app.card?.name || app.creditCardProduct?.name || 
                           app.insurance?.name || app.insuranceProduct?.name || 
                           app.productName || 'Unknown Product'}
                        </p>
                        {app.amount && (
                          <p className="text-xs text-gray-600 mt-1">
                            ₹{app.amount.toLocaleString()}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {app.employmentType ? (
                          <div>
                            <p className="text-sm font-medium text-gray-700">{app.employmentType}</p>
                            {app.monthlyIncome && (
                              <p className="text-xs text-gray-500 mt-1">₹{app.monthlyIncome.toLocaleString()}/month</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Not specified</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-800">
                            {app.createdAt ? formatDateToDisplay(app.createdAt) : 'N/A'}
                          </p>
                          {app.createdAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          app.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                          app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                          app.status === 'UNDER_REVIEW' ? 'bg-purple-100 text-purple-700' :
                          app.status === 'PROCESSING' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {app.status || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(app);
                          }}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          {!loading && filteredApplications.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredApplications.length}</span> of{' '}
                <span className="font-medium">{applications.length}</span> applications
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  Back to top ↑
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Application Details</h2>
                <p className="text-sm text-gray-500 mt-1">ID: {selectedApp.id || selectedApp._id}</p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* User Account Information - Who made the request */}
              <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm font-mono">
                    UID-{selectedApp.userId || 'N/A'}
                  </span>
                  Account Holder (Who Made Request)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Account Name</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedApp.user?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Account Email</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedApp.user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Account Phone</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedApp.user?.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Applicant Information - For whom the application is made */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Applicant Information (For Whom Application is Made)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Applicant Name</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedApp.applicantName || selectedApp.user?.name || 'N/A'}</p>
                    {selectedApp.applicantName && selectedApp.applicantName !== selectedApp.user?.name && (
                      <p className="text-xs text-blue-600 mt-1">⚠️ Different from account holder</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedApp.email || selectedApp.user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedApp.phone || selectedApp.user?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">PAN Number</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedApp.panNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Applied On</label>
                    <p className="text-gray-800 font-medium mt-1">
                      {selectedApp.createdAt ? `${formatDateToDisplay(selectedApp.createdAt)} ${new Date(selectedApp.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Last Updated</label>
                    <p className="text-gray-800 font-medium mt-1">
                      {selectedApp.updatedAt ? new Date(selectedApp.updatedAt).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Information */}
              <div className="bg-blue-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedApp.categoryName || selectedApp.category || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Product Name</label>
                    <p className="text-gray-800 font-medium mt-1">
                      {selectedApp.loan?.title || selectedApp.card?.name || selectedApp.insurance?.name || selectedApp.productName || 'Unknown'}
                    </p>
                  </div>
                  {selectedApp.amount && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Requested Amount</label>
                      <p className="text-gray-800 font-medium mt-1">₹{selectedApp.amount.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedApp.tenure && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Tenure</label>
                      <p className="text-gray-800 font-medium mt-1">{selectedApp.tenure} months</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Employment Details */}
              {selectedApp.employmentType && (
                <div className="bg-green-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Employment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Employment Type</label>
                      <p className="text-gray-800 font-medium mt-1">{selectedApp.employmentType}</p>
                    </div>
                    {selectedApp.monthlyIncome && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Monthly Income</label>
                        <p className="text-gray-800 font-medium mt-1">₹{selectedApp.monthlyIncome.toLocaleString()}</p>
                      </div>
                    )}
                    {selectedApp.employerName && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Employer Name</label>
                        <p className="text-gray-800 mt-1">{selectedApp.employerName}</p>
                      </div>
                    )}
                    {selectedApp.workExperience && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Work Experience</label>
                        <p className="text-gray-800 mt-1">{selectedApp.workExperience}</p>
                      </div>
                    )}
                    {selectedApp.designation && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Designation</label>
                        <p className="text-gray-800 mt-1">{selectedApp.designation}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Residence Details */}
              {selectedApp.residenceType && (
                <div className="bg-purple-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Residence Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Residence Type</label>
                      <p className="text-gray-800 font-medium mt-1">{selectedApp.residenceType}</p>
                    </div>
                    {selectedApp.city && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">City</label>
                        <p className="text-gray-800 mt-1">{selectedApp.city}</p>
                      </div>
                    )}
                    {selectedApp.pincode && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Pincode</label>
                        <p className="text-gray-800 mt-1">{selectedApp.pincode}</p>
                      </div>
                    )}
                    {selectedApp.address && (
                      <div className="md:col-span-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Full Address</label>
                        <p className="text-gray-800 mt-1">{selectedApp.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Documents */}
              {selectedApp.documents && Array.isArray(selectedApp.documents) && selectedApp.documents.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Documents</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedApp.documents.map((doc: string, index: number) => (
                      <a 
                        key={index} 
                        href={doc} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                      >
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                          <ExternalLink size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700 truncate">
                            Document {index + 1}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{doc.split('/').pop()}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {selectedApp.additionalInfo && (
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedApp.additionalInfo}</p>
                </div>
              )}

              {/* Existing Feedback */}
              {selectedApp.feedback && (
                <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Existing Feedback</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedApp.feedback}</p>
                  {selectedApp.feedbackUpdatedAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Updated: {new Date(selectedApp.feedbackUpdatedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              {/* Admin Actions */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Application Status</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['PENDING', 'PROCESSING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatus(s)}
                          className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                            status === s
                              ? s === 'APPROVED' ? 'bg-green-600 text-white' :
                                s === 'REJECTED' ? 'bg-red-600 text-white' :
                                s === 'PROCESSING' ? 'bg-orange-600 text-white' :
                                s === 'UNDER_REVIEW' ? 'bg-purple-600 text-white' :
                                'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {s.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feedback / Notes
                      <span className="text-gray-400 ml-1 text-xs">(Optional)</span>
                    </label>
                    <textarea 
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Add notes or feedback for the applicant. This will be visible to them."
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Character count: {feedback.length} / 1000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between gap-4 sticky bottom-0">
              <div className="text-sm text-gray-600">
                <p>Application ID: <span className="font-mono font-medium">{selectedApp.id || selectedApp._id}</span></p>
                <p className="text-xs mt-1">Changes will be logged and visible to the applicant</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateApp}
                  disabled={isUpdating || !status}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    status === 'APPROVED' ? 'bg-green-600 hover:bg-green-700' :
                    status === 'REJECTED' ? 'bg-red-600 hover:bg-red-700' :
                    'bg-blue-600 hover:bg-blue-700'
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    `Mark as ${status.replace('_', ' ')}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}