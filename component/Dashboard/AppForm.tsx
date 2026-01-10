"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AppFormProps {
  categoryId?: number;
  onSubmit?: (data: any) => void;
  initialData?: {
    id: number;
    name: string;
    description: string;
    downloadUrl: string;
    logoUrl?: string;
  };
  isEditing?: boolean;
}

const AppForm: React.FC<AppFormProps> = ({ categoryId, onSubmit, initialData, isEditing = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    downloadUrl: '',
    logoUrl: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        downloadUrl: initialData.downloadUrl || '',
        logoUrl: initialData.logoUrl || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If onSubmit prop is provided, use it (for backwards compatibility)
    if (onSubmit) {
      onSubmit({ ...formData, categoryId });
      return;
    }

    // Otherwise, handle submit internally
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = isEditing
        ? `/api/admin/apps/${initialData?.id}`
        : '/api/admin/products/app';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`App ${isEditing ? 'updated' : 'created'} successfully!`);
        router.push('/dashboard/products');
      } else {
        const error = await response.json();
        alert(`Failed to ${isEditing ? 'update' : 'create'} app: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Failed to ${isEditing ? 'update' : 'create'} app`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              App Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              placeholder="Enter app name"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              placeholder="Enter app description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Download URL *
            </label>
            <input
              type="url"
              name="downloadUrl"
              value={formData.downloadUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/download"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              type="url"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/dashboard/products')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update App' : 'Create App'}
        </button>
      </div>
    </form>
  );
};

export default AppForm;
