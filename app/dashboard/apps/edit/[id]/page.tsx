'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowLeft } from 'lucide-react';
import AppForm from '../../../../../component/Dashboard/AppForm';

interface AppProduct {
  id: number;
  name: string;
  description: string;
  downloadUrl: string;
  logoUrl?: string;
  createdAt: string;
}

export default function EditAppPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [app, setApp] = useState<AppProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchApp = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/admin/apps/${resolvedParams.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApp(data);
        } else {
          alert('Failed to load app data');
          router.push('/dashboard/products');
        }
      } catch (error) {
        console.error('Error fetching app:', error);
        alert('Failed to load app data');
        router.push('/dashboard/products');
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [resolvedParams, router]);

  const handleDelete = async () => {
    if (!app || !confirm('Are you sure you want to delete this app? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/apps/${app.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('App deleted successfully!');
        router.push('/dashboard/products');
      } else {
        const error = await response.json();
        alert(`Failed to delete app: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete app');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading app data...</div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">App not found</div>
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
            Delete App
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Edit App</h1>
          <p className="text-gray-500 mt-1">Update the app information below</p>
        </div>

        <AppForm initialData={app} isEditing={true} />
      </div>
    </div>
  );
}
