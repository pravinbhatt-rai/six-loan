"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Plus, Edit, Trash2, Eye, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// API base URL - adjust according to your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "personal-loan", name: "Personal Loan" },
  { id: "business-loan", name: "Business Loan" },
  { id: "professional-loan", name: "Professional Loan" },
  { id: "transfer-personal-loan", name: "Transfer Personal Loan" },
  { id: "home-loan", name: "Home Loan" },
  { id: "loan-against-property", name: "Loan Against Property" },
  { id: "transfer-home-loan", name: "Transfer Home Loan" },
  { id: "loan-against-security", name: "Loan Against Security" },
  { id: "used-car", name: "Used Car Loan" },
  { id: "used-bike", name: "Used Bike Loan" },
  { id: "new-car", name: "New Car Loan" },
  { id: "new-bike", name: "New Bike Loan" }
];

interface Loan {
  id: string | number;
  title: string;
  bankName: string;
  bankLogoUrl?: string;
  category?: { name: string } | string;
  interestRateText?: string;
  processingTime?: string;
  status?: string;
  tag?: string;
  feature?: string;
  specialization?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function LoansPage() {
  const router = useRouter();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState<Loan | null>(null);

  // Get category name in URL-friendly format
  const getCategorySlug = useCallback((loan: Loan) => {
    let categoryName = '';
    
    if (typeof loan.category === 'string') {
      categoryName = loan.category;
    } else {
      categoryName = loan.category?.name || '';
    }
    
    // Convert to URL-friendly format (kebab-case)
    return categoryName.toLowerCase().replace(/\s+/g, '-');
  }, []);

  // Get display category name
  const getCategoryName = (loan: Loan) => {
    if (typeof loan.category === 'string') {
      return loan.category;
    }
    return loan.category?.name || 'N/A';
  };

  // Fetch loans function - REVERTED TO ORIGINAL ENDPOINT
  const fetchLoans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Use the original endpoint that was working
      let url = `${API_BASE_URL}/api/admin/loans`;
      
      console.log('Fetching loans from:', url);
      
      const response = await fetch(url, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        throw new Error(`Failed to fetch loans: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data)) {
        setLoans(data);
      } else if (data.loans) {
        setLoans(data.loans);
      } else if (data.data) {
        setLoans(data.data);
      } else {
        setLoans([]);
        console.warn('Unexpected response format:', data);
      }
      
    } catch (error: any) {
      console.error('Failed to fetch loans', error);
      setError(error.message || 'Failed to load loans. Please try again.');
      setLoans([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Fetch loans on initial load
  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  // Handle client-side filtering
  const filteredLoans = loans.filter(loan => {
    // Filter by category if activeTab is not "all"
    let matchesCategory = true;
    if (activeTab !== "all") {
      const loanCategorySlug = getCategorySlug(loan);
      matchesCategory = loanCategorySlug === activeTab;
    }
    
    // Filter by search query
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      matchesSearch = (
        loan.title?.toLowerCase().includes(query) ||
        loan.bankName?.toLowerCase().includes(query) ||
        getCategoryName(loan).toLowerCase().includes(query)
      );
    }
    
    return matchesCategory && matchesSearch;
  });

  // Handle delete confirmation
  const confirmDelete = (loan: Loan) => {
    setLoanToDelete(loan);
    setShowDeleteModal(true);
  };

  // Handle actual delete - KEEP ORIGINAL DELETE ENDPOINT
  const handleDelete = async () => {
    if (!loanToDelete) return;

    setDeleteLoading(loanToDelete.id.toString());
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/loans/${loanToDelete.id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Remove loan from state
        setLoans(prev => prev.filter(l => l.id !== loanToDelete.id));
        setShowDeleteModal(false);
        setLoanToDelete(null);
        alert('Loan deleted successfully!');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to delete loan' }));
        alert(`Error: ${errorData.message || 'Failed to delete loan'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the loan.');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Handle view details
  const handleViewDetails = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Loan Products</h1>
            <p className="text-gray-500 mt-1">Manage all your loan offerings in one place</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => fetchLoans()}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            <Link 
              href="/dashboard/products/add" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Add New Loan
            </Link>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-600 font-medium">Error Loading Loans</p>
                <p className="text-red-500 text-sm mt-1">{error}</p>
              </div>
              <button 
                onClick={() => fetchLoans()}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Loans</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{loans.length}</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <div className="text-blue-600">💰</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Loans</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {loans.filter(l => l.isActive !== false).length}
                </p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <div className="text-green-600">✓</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Personal Loans</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {loans.filter(l => getCategorySlug(l) === 'personal-loan').length}
                </p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg">
                <div className="text-purple-600">👤</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Home Loans</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {loans.filter(l => getCategorySlug(l) === 'home-loan').length}
                </p>
              </div>
              <div className="bg-orange-50 p-2 rounded-lg">
                <div className="text-orange-600">🏠</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs & Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">Filters & Search</h2>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search loans by title, bank, or category..." 
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Category Filter Tabs */}
              <div className="overflow-x-auto">
                <div className="flex gap-2 min-w-max pb-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                        activeTab === cat.id 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Loans Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th className="px-6 py-4 font-semibold">Bank / Product</th>
                  <th className="px-6 py-4 font-semibold">Loan Title</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Interest Rate</th>
                  <th className="px-6 py-4 font-semibold">Features</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-gray-500">Loading loans...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search size={48} className="text-gray-300" />
                        <p className="text-gray-500 font-medium">No loans found</p>
                        <p className="text-gray-400 text-sm">
                          {searchQuery || activeTab !== 'all' 
                            ? 'Try changing your search or filter criteria' 
                            : 'No loans available. Add your first loan!'}
                        </p>
                        <Link 
                          href="/dashboard/products/add"
                          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                        >
                          Add New Loan
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr 
                      key={loan.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden">
                            {loan.bankLogoUrl ? (
                              <img 
                                src={loan.bankLogoUrl} 
                                alt={loan.bankName} 
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="text-blue-600 font-semibold text-sm">
                                {loan.bankName?.charAt(0) || 'B'}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{loan.bankName}</p>
                            {loan.tag && (
                              <p className="text-xs text-gray-500 mt-1">{loan.tag}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{loan.title}</p>
                        {loan.specialization && (
                          <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                            {loan.specialization}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                          {getCategoryName(loan)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">
                          {loan.interestRateText || 'N/A'}
                        </div>
                        {loan.processingTime && (
                          <div className="text-xs text-gray-500 mt-1">
                            {loan.processingTime}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {loan.feature && (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                            {loan.feature}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(loan)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => router.push(`/dashboard/loans/edit/${loan.id}`)}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => confirmDelete(loan)}
                            disabled={deleteLoading === loan.id.toString()}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            {deleteLoading === loan.id.toString() ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {!loading && filteredLoans.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredLoans.length}</span> of{' '}
                <span className="font-medium">{loans.length}</span> loans
                {activeTab !== 'all' && (
                  <span className="ml-2 text-blue-600">
                    (Filtered by: {CATEGORIES.find(c => c.id === activeTab)?.name})
                  </span>
                )}
              </p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium hover:underline"
                >
                  Clear Filters
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium hover:underline"
                >
                  Back to top ↑
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Debug Info (remove in production) */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-500">
          <p>Debug Info:</p>
          <p>API Base URL: {API_BASE_URL}</p>
          <p>Active Category: {activeTab} - {CATEGORIES.find(c => c.id === activeTab)?.name}</p>
          <p>Total Loans: {loans.length}</p>
          <p>Filtered Loans: {filteredLoans.length}</p>
          <p>Has Token: {localStorage.getItem('token') ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {/* Loan Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedLoan.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedLoan.bankName}</p>
              </div>
              <button 
                onClick={() => setSelectedLoan(null)}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Bank Name</label>
                  <p className="text-gray-800 font-medium mt-1">{selectedLoan.bankName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                  <p className="text-gray-800 font-medium mt-1">{getCategoryName(selectedLoan)}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Interest Rate</label>
                  <p className="text-gray-800 font-medium mt-1">{selectedLoan.interestRateText || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Processing Time</label>
                  <p className="text-gray-800 font-medium mt-1">{selectedLoan.processingTime || 'N/A'}</p>
                </div>
                {selectedLoan.tag && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Tag</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedLoan.tag}</p>
                  </div>
                )}
                {selectedLoan.feature && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Feature</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedLoan.feature}</p>
                  </div>
                )}
                {selectedLoan.specialization && (
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Specialization</label>
                    <p className="text-gray-800 mt-1">{selectedLoan.specialization}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => router.push(`/dashboard/loans/edit/${selectedLoan.id}`)}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && loanToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Delete Loan Product</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Are you sure you want to delete <span className="font-semibold">{loanToDelete.title}</span>?
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm font-medium text-gray-700">{loanToDelete.title}</p>
                <p className="text-sm text-gray-600 mt-1">Bank: {loanToDelete.bankName}</p>
                <p className="text-sm text-gray-600 mt-1">Category: {getCategoryName(loanToDelete)}</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setShowDeleteModal(false);
                  setLoanToDelete(null);
                }}
                disabled={!!deleteLoading}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={!!deleteLoading}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Loan'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}