"use client";
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api';
import { Plus, Edit, Trash2, Wallet, CreditCard as CardIcon } from 'lucide-react';

export default function DebitCardsPage() {
  const router = useRouter();
  const { user, loading: authLoading, isAdminOrModerator } = useAuth();
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const isFetching = useRef(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
        return;
      }
      
      if (!isAdminOrModerator()) {
        alert('Access denied. You must be an admin or moderator.');
        router.push('/');
        return;
      }
    }
  }, [user, authLoading, isAdminOrModerator, router]);

  const fetchDebitCards = useCallback(async () => {
    // Prevent multiple simultaneous fetches
    if (isFetching.current || hasFetched) return;
    
    isFetching.current = true;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/debit-cards`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDebitCards(data.debitCards || []);
        setHasFetched(true);
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch debit cards:', error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [hasFetched, router]);

  useEffect(() => {
    // Only fetch if user is authenticated and we haven't fetched yet
    if (user && isAdminOrModerator() && !hasFetched && !authLoading) {
      fetchDebitCards();
    }
  }, [user, isAdminOrModerator, hasFetched, authLoading, fetchDebitCards]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this debit card?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/debit-cards/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Debit card deleted successfully!');
        // Update local state instead of refetching
        setDebitCards(prev => prev.filter(card => card.id !== id));
      } else {
        alert('Failed to delete debit card');
      }
    } catch (error) {
      console.error('Error deleting debit card:', error);
      alert('An error occurred');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 animate-pulse">Loading debit cards...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdminOrModerator()) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-500 flex items-center justify-center shadow-md">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Debit Cards</h1>
            <p className="text-gray-600 mt-1">Manage your debit card products</p>
          </div>
        </div>
        
        <Link href="/dashboard/debit-cards/add">
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
            <Plus className="w-5 h-5" />
            Add Debit Card
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-lg border-t-4 border-purple-500 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Cards</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{debitCards.length}</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 flex items-center justify-center">
              <CardIcon className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-lg border-t-4 border-teal-500 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Recommended</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {debitCards.filter(c => c.recommended).length}
              </p>
            </div>
            <div className="w-14 h-14 bg-teal-100 flex items-center justify-center">
              <Wallet className="w-8 h-8 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-lg border-t-4 border-green-500 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Rating</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {debitCards.length > 0 
                  ? (debitCards.reduce((sum, c) => sum + (c.rating || 0), 0) / debitCards.length).toFixed(1)
                  : '0.0'}
              </p>
            </div>
            <div className="w-14 h-14 bg-green-100 flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Debit Cards Table */}
      <div className="bg-white shadow-lg overflow-hidden animate-slideUp">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Debit Cards</h2>
        </div>
        
        {debitCards.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 mx-auto flex items-center justify-center mb-4">
              <Wallet className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No debit cards yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first debit card product</p>
            <Link href="/dashboard/debit-cards/add">
              <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 shadow-lg transition-all font-semibold">
                <Plus className="w-5 h-5" />
                Add Debit Card
              </button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-semibold">
                <tr>
                  <th className="px-6 py-4 uppercase tracking-wider">Card</th>
                  <th className="px-6 py-4 uppercase tracking-wider">Bank</th>
                  <th className="px-6 py-4 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 uppercase tracking-wider">Network</th>
                  <th className="px-6 py-4 uppercase tracking-wider">Annual Fee</th>
                  <th className="px-6 py-4 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {debitCards.map((card: any) => (
                  <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {card.imageUrl ? (
                          <img src={card.imageUrl} alt={card.name} className="w-16 h-10 object-cover" />
                        ) : (
                          <div className="w-16 h-10 bg-gray-100 flex items-center justify-center">
                            <CardIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{card.name}</div>
                          <div className="text-xs text-gray-500">{card.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{card.bankName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium">
                        {card.cardType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{card.cardNetwork}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {card.annualFee === 0 ? (
                        <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        `₹${card.annualFee?.toLocaleString('en-IN')}`
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold text-gray-900">{card.rating?.toFixed(1) || '0.0'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {card.recommended ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold shadow-sm">
                          Recommended
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/debit-cards/edit/${card.id}`}>
                          <button className="p-2 text-teal-600 hover:bg-teal-50 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(card.id)}
                          className="p-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}