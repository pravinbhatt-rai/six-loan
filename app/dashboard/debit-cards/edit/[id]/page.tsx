"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import DebitCardForm from '@/component/Dashboard/DebitCardForm';
import { ArrowLeft, Wallet, Loader } from 'lucide-react';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api';

export default function EditDebitCardPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading, isAdminOrModerator } = useAuth();
  const [debitCard, setDebitCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = params.id as string;

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

  useEffect(() => {
    const fetchDebitCard = async () => {
      if (!id) return;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/admin/debit-cards/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDebitCard(data.debitCard);
        } else if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        } else {
          setError('Failed to fetch debit card data');
        }
      } catch (err) {
        setError('Failed to fetch debit card data');
      } finally {
        setLoading(false);
      }
    };

    fetchDebitCard();
  }, [id, router]);

  if (!user || !isAdminOrModerator()) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3">
          <Loader className="w-6 h-6 animate-spin text-teal-600" />
          <span className="text-gray-600">Loading debit card...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
          <div className="text-gray-600">{error}</div>
          <Link href="/dashboard/debit-cards">
            <button className="mt-4 px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 transition-colors">
              Back to Debit Cards
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/debit-cards">
          <button className="p-2 hover:bg-gray-100 transition-colors group">
            <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-500 flex items-center justify-center shadow-md">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Debit Card</h1>
            <p className="text-gray-600 mt-1">Update debit card information</p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-lg p-8 animate-slideUp">
        <DebitCardForm initialData={debitCard} isEdit={true} />
      </div>
    </div>
  );
}