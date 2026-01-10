'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowLeft } from 'lucide-react';
import InsuranceForm from '../../../../../component/Dashboard/InsuranceForm';

interface InsuranceProduct {
  id: number;
  name: string;
  slug: string;
  provider: string;
  logoUrl?: string;
  type: string;
  description: string;
  minPremium?: number;
  coverage?: string;
  categoryId?: number;
  createdAt: string;
}

export default function EditInsurancePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [insurance, setInsurance] = useState<InsuranceProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchInsurance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/admin/insurance/${resolvedParams.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setInsurance(data);
        } else {
          alert('Failed to load insurance data');
          router.push('/dashboard/products');
        }
      } catch (error) {
        console.error('Error fetching insurance:', error);
        alert('Failed to load insurance data');
        router.push('/dashboard/products');
      } finally {
        setLoading(false);
      }
    };

    fetchInsurance();
  }, [resolvedParams, router]);

  const handleDelete = async () => {
    if (!insurance || !confirm('Are you sure you want to delete this insurance product? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/insurance/${insurance.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Insurance product deleted successfully!');
        router.push('/dashboard/products');
      } else {
        const error = await response.json();
        alert(`Failed to delete insurance: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete insurance product');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading insurance data...</div>
      </div>
    );
  }

  if (!insurance) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Insurance product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/dashboard/products')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={18} />
            Delete Insurance
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Edit Insurance Product</h1>
          <p className="text-gray-500 mt-1">Update the insurance information below</p>
        </div>

        <InsuranceForm initialData={insurance} isEditing={true} />
      </div>
    </div>
  );
}
