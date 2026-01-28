"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import CreditCardForm from '@/component/Dashboard/CreditCardForm';

// Use absolute URL directly since environment variable might not be set
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function EditCreditCardPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);

  useEffect(() => {
    const fetchCard = async () => {
      if (!id || id === 'undefined') {
        setError('Invalid credit card ID');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        console.log('Fetching credit card with ID:', id);
        console.log('API URL:', `${API_BASE_URL}/api/admin/credit-cards/${id}`);
        
        const response = await fetch(`${API_BASE_URL}/api/admin/credit-cards/${id}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Credit card data received:', data);
          setCard(data);
          setFormValues(data); // Store original values for comparison
          setError(null);
        } else if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        } else if (response.status === 404) {
          setError('Credit card not found');
        } else {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          setError(`Failed to fetch credit card details: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to fetch credit card', error);
        setError('Error loading credit card. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchCard();
    }
  }, [id, router]);

  const handleSubmit = async (data: any) => {
    if (!id) {
      alert('Invalid credit card ID');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      console.log('Updating credit card with data:', data);
      console.log('Update URL:', `${API_BASE_URL}/api/admin/credit-cards/${id}`);
      
      const response = await fetch(`${API_BASE_URL}/api/admin/credit-cards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Credit card updated successfully!');
        router.push('/dashboard/credit-cards');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update credit card' }));
        alert(`Error: ${errorData.message || 'Failed to update credit card'}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred while updating the credit card.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this credit card? This action cannot be undone.')) {
      return;
    }

    if (!id) {
      alert('Invalid credit card ID');
      return;
    }

    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/products/credit-card/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Credit card deleted successfully!');
        router.push('/dashboard/credit-cards');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to delete credit card' }));
        alert(`Error: ${errorData.message || 'Failed to delete credit card'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the credit card.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading credit card details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Credit Card</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
            <Link 
              href="/dashboard/credit-cards"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back to Credit Cards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Credit Card Not Found</h2>
          <p className="text-gray-600 mb-6">The credit card you're trying to edit doesn't exist.</p>
          <Link 
            href="/dashboard/credit-cards"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Credit Cards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/credit-cards" 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Credit Card</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-500">Update credit card details</p>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">ID: {id}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Delete Credit Card
              </>
            )}
          </button>
        </div>

        {/* Credit Card Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Credit Card Information</h2>
            <p className="text-gray-500 text-sm mt-1">Edit the details of your credit card product</p>
          </div>

          <CreditCardForm 
            onSubmit={handleSubmit} 
            categoryId={card.categories?.[0]?.id} 
            initialData={card}
            isEditing={true}
          />
          
          {/* Form Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-6">
            <div>
              <p className="text-sm text-gray-500">
                Last updated: {card.updatedAt ? new Date(card.updatedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/dashboard/credit-cards"
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                form="credit-card-form"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  'Update Credit Card'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Debug Info (remove in production) */}
        {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-500">
          <p>Debug Info:</p>
          <p>API Base URL: {API_BASE_URL}</p>
          <p>Credit Card ID: {id}</p>
          <p>Has Token: {localStorage.getItem('token') ? 'Yes' : 'No'}</p>
          <p>Card Data Keys: {card ? Object.keys(card).join(', ') : 'No data'}</p>
        </div> */}
      </div>
    </div>
  );
}