"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Search, Filter, Eye, RefreshCw, CreditCard } from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

interface CreditCard {
  id: string | number;
  uniqueId: string;
  name: string;
  title?: string;
  slug: string;
  bankName: string;
  bankLogoUrl?: string;
  imageUrl?: string;
  annualFee: string | number;
  joiningFee?: string | number;
  firstYearFee?: string | number;
  secondYearFee?: string | number;
  cardNetwork: string;
  category?: string;
  effectiveFree: boolean;
  recommended: boolean;
  rating: number;
  categories?: any[];
  status?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Features
  bulletPoints?: any[];
  summaryCharges?: any[];
  requiredDocuments?: any[];
  processSteps?: any[];
  keyStatement?: string;
  // Benefit sections
  benefitSections?: Array<{
    heading: string;
    subPoints: { text: string }[];
  }>;
  bestSuitedForPoints?: Array<{ text: string }> | string[];
  specialOffers?: Array<{ text: string }> | string[];
}

export default function CreditCardsPage() {
  const router = useRouter();
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNetwork, setFilterNetwork] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRecommendation, setFilterRecommendation] = useState('all');
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<{ id: string, name: string } | null>(null);

  // Fetch ONLY credit cards from API
  const fetchCreditCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      console.log('📡 Fetching credit cards from API...');
      
      const response = await fetch(`${API_BASE_URL}/api/admin/credit-cards`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch credit cards: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Credit Cards API response:', data);
      
      // Handle different response formats
      const cardsData = Array.isArray(data) ? data : 
                      data.cards ? data.cards : 
                      data.data ? data.data : 
                      [];

      const formattedCards: CreditCard[] = cardsData.map((card: any) => ({
        id: card.id,
        uniqueId: `CC-${card.id}`,
        name: card.name || 'Unnamed Credit Card',
        title: card.name,
        slug: card.slug || `card-${card.id}`,
        bankName: card.bankName || card.bank || 'Unknown Bank',
        bankLogoUrl: card.bankLogoUrl,
        imageUrl: card.imageUrl,
        annualFee: card.annualFee || 'N/A',
        joiningFee: card.joiningFee,
        firstYearFee: card.firstYearFee,
        secondYearFee: card.secondYearFee,
        cardNetwork: card.cardNetwork || 'Unknown',
        effectiveFree: card.effectiveFree || false,
        recommended: card.recommended || false,
        rating: card.rating || 0,
        categories: card.categories || [],
        status: card.status || 'Active',
        isActive: card.isActive !== false,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
        bulletPoints: card.bulletPoints || [],
        summaryCharges: card.summaryCharges || [],
        requiredDocuments: card.requiredDocuments || [],
        processSteps: card.processSteps || [],
        keyStatement: card.keyStatement,
        benefitSections: card.benefitSections || [],
        bestSuitedForPoints: card.bestSuitedForPoints || [],
        specialOffers: card.specialOffers || []
      }));

      console.log(`✅ Loaded ${formattedCards.length} credit cards`);
      setCards(formattedCards);

      if (formattedCards.length === 0) {
        setError('No credit cards found. Add your first credit card!');
      }

    } catch (error: any) {
      console.error('❌ Failed to fetch credit cards:', error);
      setError(error.message || 'Failed to load credit cards from server');
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchCreditCards();
  }, [fetchCreditCards]);

  // Filter cards
  const filteredCards = cards.filter(card => {
    const matchesSearch = 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.cardNetwork.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNetwork = filterNetwork === 'all' || 
      card.cardNetwork.toLowerCase() === filterNetwork.toLowerCase();

    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' ? card.isActive : !card.isActive);

    const matchesRecommendation = filterRecommendation === 'all' ||
      (filterRecommendation === 'recommended' && card.recommended) ||
      (filterRecommendation === 'not-recommended' && !card.recommended);

    return matchesSearch && matchesNetwork && matchesStatus && matchesRecommendation;
  });

  // Get unique card networks for filter
  const uniqueNetworks = Array.from(new Set(
    cards.map(card => card.cardNetwork).filter(Boolean)
  )) as string[];

  // Get unique banks for filter
  const uniqueBanks = Array.from(new Set(
    cards.map(card => card.bankName).filter(Boolean)
  )) as string[];

  // Handle delete confirmation
  const confirmDelete = (id: string, name: string) => {
    setCardToDelete({ id, name });
    setShowDeleteModal(true);
  };

  // Handle actual delete
  const handleDelete = async () => {
    if (!cardToDelete) return;

    setDeleteLoading(cardToDelete.id);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/credit-cards/${cardToDelete.id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Remove card from state
        setCards(prev => prev.filter(card => card.id.toString() !== cardToDelete.id));
        setShowDeleteModal(false);
        setCardToDelete(null);
        alert('✅ Credit card deleted successfully!');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to delete card' }));
        alert(`❌ Error: ${errorData.message || 'Failed to delete credit card'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('❌ An error occurred while deleting the credit card.');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Handle view details
  const handleViewDetails = (card: CreditCard) => {
    setSelectedCard(card);
  };

  // Handle close details modal
  const handleCloseDetails = () => {
    setSelectedCard(null);
  };

  // Get card network color
  const getNetworkColor = (network: string) => {
    const networkLower = network.toLowerCase();
    if (networkLower.includes('visa')) return 'bg-blue-100 text-blue-700 border border-blue-200';
    if (networkLower.includes('master') || networkLower.includes('mastercard')) 
      return 'bg-red-100 text-red-700 border border-red-200';
    if (networkLower.includes('rupay')) return 'bg-green-100 text-green-700 border border-green-200';
    if (networkLower.includes('american')) return 'bg-indigo-100 text-indigo-700 border border-indigo-200';
    return 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  // Get status color
  const getStatusColor = (isActive: boolean | undefined) => {
    return isActive 
      ? 'bg-green-100 text-green-700 border border-green-200' 
      : 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  // Format annual fee
  const formatAnnualFee = (fee: string | number) => {
    if (!fee || fee === 'N/A') return 'N/A';
    if (typeof fee === 'string' && (fee.toLowerCase().includes('free') || fee.toLowerCase().includes('lifetime'))) {
      return 'Lifetime Free';
    }
    if (typeof fee === 'string' && fee.includes('₹')) {
      return fee;
    }
    return `₹${fee}`;
  };

  // Format rating
  const formatRating = (rating: number) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-xl">
              <CreditCard className="text-purple-600" size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Credit Cards Management</h1>
              <p className="text-gray-500 mt-1">Manage all your credit card products</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => fetchCreditCards()}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            <Link 
              href="/dashboard/products/add" 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors"
            >
              <Plus size={18} />
              Add New Card
            </Link>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-600 font-medium">Info</p>
                <p className="text-yellow-500 text-sm mt-1">{error}</p>
              </div>
              <button 
                onClick={() => fetchCreditCards()}
                className="text-sm text-yellow-600 hover:text-yellow-800 font-medium"
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
                <p className="text-sm text-gray-500">Total Credit Cards</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{cards.length}</p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg">
                <CreditCard className="text-purple-600" size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Cards</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {cards.filter(c => c.isActive).length}
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
                <p className="text-sm text-gray-500">Recommended</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {cards.filter(c => c.recommended).length}
                </p>
              </div>
              <div className="bg-orange-50 p-2 rounded-lg">
                <div className="text-orange-600">⭐</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lifetime Free</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {cards.filter(c => c.effectiveFree).length}
                </p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <div className="text-blue-600">🎁</div>
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
                  placeholder="Search cards by name, bank, network..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Card Network Filter */}
              <div>
                <select 
                  value={filterNetwork}
                  onChange={(e) => setFilterNetwork(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                >
                  <option value="all">All Networks</option>
                  {uniqueNetworks.map(network => (
                    <option key={network} value={network.toLowerCase()}>{network}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Recommendation Filter */}
              <div>
                <select 
                  value={filterRecommendation}
                  onChange={(e) => setFilterRecommendation(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                >
                  <option value="all">All Cards</option>
                  <option value="recommended">Recommended</option>
                  <option value="not-recommended">Not Recommended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th className="px-6 py-4 font-semibold">Credit Card</th>
                  <th className="px-6 py-4 font-semibold">Bank</th>
                  <th className="px-6 py-4 font-semibold">Network</th>
                  <th className="px-6 py-4 font-semibold">Annual Fee</th>
                  <th className="px-6 py-4 font-semibold">Rating</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        <p className="text-gray-500">Loading credit cards...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCards.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <CreditCard size={48} className="text-gray-300" />
                        <p className="text-gray-500 font-medium">No credit cards found</p>
                        <p className="text-gray-400 text-sm">
                          {searchTerm || filterNetwork !== 'all' || filterStatus !== 'all' || filterRecommendation !== 'all'
                            ? 'Try changing your filters or search query' 
                            : 'No credit cards available. Add your first card!'}
                        </p>
                        <Link 
                          href="/dashboard/credit-cards/create"
                          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
                        >
                          Add Credit Card
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCards.map((card) => (
                    <tr 
                      key={card.uniqueId} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center overflow-hidden border border-purple-100">
                            {card.bankLogoUrl ? (
                              <img 
                                src={card.bankLogoUrl} 
                                alt={card.bankName}
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <span className="text-purple-600 font-bold text-lg">
                                {card.bankName?.charAt(0) || 'C'}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{card.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {card.recommended && (
                                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded border border-amber-200">
                                  ⭐ Recommended
                                </span>
                              )}
                              {card.effectiveFree && (
                                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded border border-green-200">
                                  🎁 Free
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{card.bankName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getNetworkColor(card.cardNetwork)}`}>
                          {card.cardNetwork}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{formatAnnualFee(card.annualFee)}</p>
                        {card.firstYearFee && (
                          <p className="text-xs text-gray-500 mt-1">1st year: {formatAnnualFee(card.firstYearFee)}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium text-gray-800">{formatRating(card.rating)}</span>
                          <span className="text-gray-400 text-xs">/5</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(card.isActive)}`}>
                          {card.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(card)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => {
                              router.push(`/dashboard/credit-cards/edit/${card.id}`);
                            }}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => confirmDelete(String(card.id), card.name)}
                            disabled={deleteLoading === String(card.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            {deleteLoading === String(card.id) ? (
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
          {!loading && filteredCards.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredCards.length}</span> of{' '}
                <span className="font-medium">{cards.length}</span> credit cards
              </p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterNetwork('all');
                    setFilterStatus('all');
                    setFilterRecommendation('all');
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

      {/* Credit Card Details Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                  {selectedCard.bankLogoUrl ? (
                    <img 
                      src={selectedCard.bankLogoUrl} 
                      alt={selectedCard.bankName}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <CreditCard className="text-purple-600" size={24} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedCard.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getNetworkColor(selectedCard.cardNetwork)}`}>
                      {selectedCard.cardNetwork}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(selectedCard.isActive)}`}>
                      {selectedCard.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {selectedCard.recommended && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                        ⭐ Recommended
                      </span>
                    )}
                  </div>
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
                    <label className="text-xs font-semibold text-gray-500 uppercase">Card Name</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedCard.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Bank Name</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedCard.bankName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Card Network</label>
                    <p className="text-gray-800 font-medium mt-1">{selectedCard.cardNetwork}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Annual Fee</label>
                    <p className="text-gray-800 font-medium mt-1">{formatAnnualFee(selectedCard.annualFee)}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Rating</label>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-800 font-medium">{formatRating(selectedCard.rating)}</span>
                      <span className="text-gray-400 text-xs">/5</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                    <p className="text-gray-800 font-medium mt-1">
                      {selectedCard.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  {selectedCard.firstYearFee && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">First Year Fee</label>
                      <p className="text-gray-800 font-medium mt-1">{formatAnnualFee(selectedCard.firstYearFee)}</p>
                    </div>
                  )}
                  {selectedCard.secondYearFee && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">Renewal Fee</label>
                      <p className="text-gray-800 font-medium mt-1">{formatAnnualFee(selectedCard.secondYearFee)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              {selectedCard.benefitSections && selectedCard.benefitSections.length > 0 && (
                <div className="bg-purple-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Benefits</h3>
                  <div className="space-y-4">
                    {selectedCard.benefitSections.map((section, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-purple-100">
                        <h4 className="font-semibold text-gray-800 mb-2">{section.heading}</h4>
                        <ul className="space-y-1">
                          {section.subPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-purple-500 mt-0.5">•</span>
                              <span>{point.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Best Suited For */}
              {selectedCard.bestSuitedForPoints && selectedCard.bestSuitedForPoints.length > 0 && (
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Suited For</h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(selectedCard.bestSuitedForPoints) 
                      ? selectedCard.bestSuitedForPoints 
                      : []).map((item: any, index: number) => (
                      <span 
                        key={index} 
                        className="px-3 py-1.5 bg-white text-blue-700 text-sm font-medium rounded-lg border border-blue-200"
                      >
                        {item.text || item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Offers */}
              {selectedCard.specialOffers && selectedCard.specialOffers.length > 0 && (
                <div className="bg-green-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Offers</h3>
                  <ul className="space-y-2">
                    {(Array.isArray(selectedCard.specialOffers) 
                      ? selectedCard.specialOffers 
                      : []).map((item: any, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{item.text || item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Categories */}
              {selectedCard.categories && selectedCard.categories.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCard.categories.map((cat: any, index: number) => (
                      <span 
                        key={index} 
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                      >
                        {cat.name || cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
              <button 
                onClick={() => {
                  router.push(`/dashboard/credit-cards/edit/${selectedCard.id}`);
                }}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors flex items-center gap-2"
              >
                <Edit size={16} />
                Edit Credit Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && cardToDelete && (
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
                  <p className="font-medium text-gray-800">Delete Credit Card</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Are you sure you want to delete <span className="font-semibold">"{cardToDelete.name}"</span>?
                  </p>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-red-600">
                  ⚠️ This action cannot be undone. All data associated with this card will be permanently deleted.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setShowDeleteModal(false);
                  setCardToDelete(null);
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
                  'Delete Card'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}