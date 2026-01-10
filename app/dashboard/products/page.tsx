"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Search, Filter, Eye, RefreshCw, MoreVertical } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string | number;
  uniqueId: string;
  title: string;
  type: string;
  category: string | { name: string };
  bank?: string;
  status?: string;
  description?: string;
  interestRate?: number | string;
  processingFee?: number | string;
  maxLoanAmount?: number;
  tenure?: string;
  minSalary?: number;
  features?: string[];
  eligibility?: string[];
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  imageUrl?: string;
  loanAmount?: string;
  loanCategory?: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: string, type: string, uniqueId: string } | null>(null);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';

      // Fetch from all endpoints
      const responses = await Promise.allSettled([
        fetch(`${API_BASE}/api/admin/loans`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/admin/credit-cards`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/admin/insurance`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/admin/apps`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      let allProducts: Product[] = [];

      // Process Loans
      if (responses[0].status === 'fulfilled' && responses[0].value.ok) {
        const loansData = await responses[0].value.json();
        console.log('Loans API response:', loansData);
        // API returns array directly
        const loansArray = Array.isArray(loansData) ? loansData : (loansData.loans || []);
        const loans = loansArray.map((loan: any) => ({
          id: loan.id,
          uniqueId: `Loan-${loan.id}`,
          title: loan.title || loan.bankName,
          type: 'Loan',
          category: loan.category?.name || 'General',
          bank: loan.bankName,
          status: 'Active',
          interestRate: loan.interestRateText,
          processingFee: loan.aprText,
          maxLoanAmount: loan.emiValue,
          tenure: loan.disbursalTimeHours ? `${loan.disbursalTimeHours} hours` : 'N/A',
          isActive: true,
          createdAt: loan.createdAt,
          updatedAt: loan.updatedAt
        }));
        allProducts = [...allProducts, ...loans];
        console.log('Processed loans:', loans);
      }

      // Process Credit Cards
      if (responses[1].status === 'fulfilled' && responses[1].value.ok) {
        const cardsData = await responses[1].value.json();
        console.log('Credit Cards API response:', cardsData);
        // API returns array directly
        const cardsArray = Array.isArray(cardsData) ? cardsData : (cardsData.creditCards || []);
        const cards = cardsArray.map((card: any) => ({
          id: card.id,
          uniqueId: `CreditCard-${card.id}`,
          title: card.name,
          type: 'Credit Card',
          category: card.categories?.[0]?.name || 'General',
          bank: card.bankName,
          status: 'Active',
          isActive: true,
          createdAt: card.createdAt,
          updatedAt: card.updatedAt,
          description: card.keyStatement
        }));
        allProducts = [...allProducts, ...cards];
        console.log('Processed credit cards:', cards);
      }

      // Process Insurance
      if (responses[2].status === 'fulfilled' && responses[2].value.ok) {
        const insuranceData = await responses[2].value.json();
        console.log('Insurance API response:', insuranceData);
        // API returns array directly
        const insuranceArray = Array.isArray(insuranceData) ? insuranceData : (insuranceData.insurance || []);
        const insurance = insuranceArray.map((ins: any) => ({
          id: ins.id,
          uniqueId: `Insurance-${ins.id}`,
          title: ins.name,
          type: 'Insurance',
          category: ins.type || 'General',
          bank: ins.provider,
          status: 'Active',
          isActive: true,
          createdAt: ins.createdAt,
          updatedAt: ins.updatedAt,
          description: ins.description
        }));
        allProducts = [...allProducts, ...insurance];
        console.log('Processed insurance:', insurance);
      }

      // Process Apps
      if (responses[3].status === 'fulfilled' && responses[3].value.ok) {
        const appsData = await responses[3].value.json();
        console.log('Apps API response:', appsData);
        // API returns array directly
        const appsArray = Array.isArray(appsData) ? appsData : (appsData.apps || []);
        const apps = appsArray.map((app: any) => ({
          id: app.id,
          uniqueId: `App-${app.id}`,
          title: app.name,
          type: 'App',
          category: 'Application',
          status: 'Active',
          isActive: true,
          createdAt: app.createdAt,
          updatedAt: app.updatedAt,
          description: app.description
        }));
        allProducts = [...allProducts, ...apps];
        console.log('Processed apps:', apps);
      }

      console.log('Total fetched products:', allProducts.length, allProducts);
      setProducts(allProducts);
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      setError(error.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products
  const filteredProducts = products.filter(product => {
    // Handle category safely
    const categoryName = typeof product.category === 'object' && product.category?.name 
      ? product.category.name 
      : (typeof product.category === 'string' ? product.category : '');
    
    const matchesSearch = 
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.bank?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof categoryName === 'string' ? categoryName.toLowerCase().includes(searchTerm.toLowerCase()) : false);
    
    const matchesType = filterType === 'all' || 
      product.type?.toLowerCase() === filterType.toLowerCase();
    
    const matchesCategory = filterCategory === 'all' || 
      categoryName.toLowerCase() === filterCategory.toLowerCase();
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' ? product.isActive : !product.isActive);

    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter
  const uniqueCategories = Array.from(new Set(
    products
      .map(p => typeof p.category === 'object' && p.category?.name ? p.category.name : p.category)
      .filter(Boolean)
  ));

  // Get unique types for filter
  const uniqueTypes = Array.from(new Set(products.map(p => p.type).filter(Boolean)));

  // Handle delete confirmation
  const confirmDelete = (uniqueId: string, productId: string, productType: string) => {
    setProductToDelete({ id: productId, type: productType, uniqueId });
    setShowDeleteModal(true);
  };

  // Handle actual delete
  const handleDelete = async () => {
    if (!productToDelete) return;

    setDeleteLoading(productToDelete.uniqueId);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // In real implementation, make API call here
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Remove product from state
      setProducts(prev => prev.filter(p => p.uniqueId !== productToDelete.uniqueId));
      
      setShowDeleteModal(false);
      setProductToDelete(null);
      
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Handle view details
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  // Handle close details modal
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  // Get product type color
  const getProductTypeColor = (type: string) => {
    switch (type) {
      case 'Loan': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Credit Card': return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 'Insurance': return 'bg-green-100 text-green-700 border border-green-200';
      case 'App': return 'bg-orange-100 text-orange-700 border border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  // Get status color
  const getStatusColor = (isActive: boolean | undefined) => {
    return isActive 
      ? 'bg-green-100 text-green-700 border border-green-200' 
      : 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  // Format currency
  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products Management</h1>
            <p className="text-gray-500 mt-1">Manage all your financial products in one place</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => fetchProducts()}
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
              Add New Product
            </Link>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-600 font-medium">Error Loading Products</p>
                <p className="text-red-500 text-sm mt-1">{error}</p>
              </div>
              <button 
                onClick={() => fetchProducts()}
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
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{products.length}</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <div className="text-blue-600">📦</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Products</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {products.filter(p => p.isActive).length}
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
                <p className="text-sm text-gray-500">Loans</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {products.filter(p => p.type === 'Loan').length}
                </p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg">
                <div className="text-purple-600">💰</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Credit Cards</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {products.filter(p => p.type === 'Credit Card').length}
                </p>
              </div>
              <div className="bg-orange-50 p-2 rounded-lg">
                <div className="text-orange-600">💳</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">Filters & Search</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Type Filter */}
              <div>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map(category => {
                    const categoryName = typeof category === 'string' ? category : category?.name || '';
                    return (
                      <option key={categoryName} value={categoryName.toLowerCase()}>{categoryName}</option>
                    );
                  })}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Bank/Provider</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-gray-500">Loading products...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search size={48} className="text-gray-300" />
                        <p className="text-gray-500 font-medium">No products found</p>
                        <p className="text-gray-400 text-sm">
                          {searchTerm || filterType !== 'all' || filterCategory !== 'all' || filterStatus !== 'all'
                            ? 'Try changing your filters or search query' 
                            : 'No products available. Add your first product!'}
                        </p>
                        <Link 
                          href="/dashboard/products/add"
                          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                        >
                          Add Product
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr 
                      key={product.uniqueId} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {product.type.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{product.title}</p>
                            {product.interestRate && (
                              <p className="text-xs text-gray-500 mt-1">Rate: {product.interestRate}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getProductTypeColor(product.type)}`}>
                          {product.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700 font-medium">
                          {typeof product.category === 'object' && product.category?.name 
                            ? product.category.name 
                            : (typeof product.category === 'string' ? product.category : 'N/A')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{product.bank || 'Self'}</p>
                          {product.createdAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              Added: {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.isActive)}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(product)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => {
                              // Navigate to edit page based on product type
                              const editPath = product.type === 'Loan' ? `/dashboard/loans/edit/${product.id}` :
                                              product.type === 'Credit Card' ? `/dashboard/credit-cards/edit/${product.id}` :
                                              product.type === 'Insurance' ? `/dashboard/insurance/edit/${product.id}` :
                                              `/dashboard/apps/edit/${product.id}`;
                              router.push(editPath);
                            }}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => confirmDelete(product.uniqueId, String(product.id), product.type)}
                            disabled={deleteLoading === product.uniqueId}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            {deleteLoading === product.uniqueId ? (
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
          {!loading && filteredProducts.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> of{' '}
                <span className="font-medium">{products.length}</span> products
              </p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterCategory('all');
                    setFilterStatus('all');
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
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedProduct.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getProductTypeColor(selectedProduct.type)}`}>
                    {selectedProduct.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(selectedProduct.isActive)}`}>
                    {selectedProduct.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Product Name</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedProduct.title}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                    <p className="text-gray-800 font-medium mt-1">
                      {typeof selectedProduct.category === 'object' && selectedProduct.category?.name 
                        ? selectedProduct.category.name 
                        : (typeof selectedProduct.category === 'string' ? selectedProduct.category : 'N/A')}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Bank/Provider</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedProduct.bank || 'Self'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                    <p className="text-gray-800 font-medium mt-1">
                      {selectedProduct.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              {selectedProduct.type === 'Loan' && (
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProduct.interestRate && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Interest Rate</label>
                        <p className="text-gray-800 font-medium mt-1">{selectedProduct.interestRate}</p>
                      </div>
                    )}
                    {selectedProduct.processingFee && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Processing Fee</label>
                        <p className="text-gray-800 font-medium mt-1">{selectedProduct.processingFee}</p>
                      </div>
                    )}
                    {selectedProduct.maxLoanAmount && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Max Loan Amount</label>
                        <p className="text-gray-800 font-medium mt-1">{formatCurrency(selectedProduct.maxLoanAmount)}</p>
                      </div>
                    )}
                    {selectedProduct.tenure && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Tenure</label>
                        <p className="text-gray-800 font-medium mt-1">{selectedProduct.tenure}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Dates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Created On</label>
                    <p className="text-gray-800 font-medium mt-1">
                      {selectedProduct.createdAt ? new Date(selectedProduct.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  {selectedProduct.updatedAt && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Last Updated</label>
                      <p className="text-gray-800 font-medium mt-1">
                        {new Date(selectedProduct.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {selectedProduct.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {selectedProduct.description}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
              <button 
                onClick={() => {
                  const editPath = selectedProduct.type === 'Loan' ? `/dashboard/loans/edit/${selectedProduct.id}` :
                                  selectedProduct.type === 'Credit Card' ? `/dashboard/credit-cards/edit/${selectedProduct.id}` :
                                  selectedProduct.type === 'Insurance' ? `/dashboard/insurance/edit/${selectedProduct.id}` :
                                  `/dashboard/apps/edit/${selectedProduct.id}`;
                  router.push(editPath);
                }}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
              >
                <Edit size={16} />
                Edit Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
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
                  <p className="font-medium text-gray-800">Delete Product</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Are you sure you want to delete this product? This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  Type: <span className="font-medium">{productToDelete.type}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  ID: <span className="font-mono">{productToDelete.uniqueId}</span>
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
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
                  'Delete Product'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}