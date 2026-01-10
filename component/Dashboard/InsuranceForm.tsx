"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface InsuranceFormProps {
  categoryId?: number;
  onSubmit?: (data: any) => void;
  initialData?: {
    id: number;
    name: string;
    slug?: string;
    provider: string;
    logoUrl?: string;
    type: string;
    description: string;
    minPremium?: number;
    coverage?: string;
    categoryId?: number;
  };
  isEditing?: boolean;
}

// Helper function to capitalize each word properly
const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to format numbers in Indian numbering system (xx,xx,xxx)
const formatIndianNumber = (num: string | number): string => {
  if (!num) return '';
  const numStr = num.toString().replace(/[^0-9]/g, '');
  if (!numStr) return '';
  
  let lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
};

// Helper function to add ₹ symbol and format amount
const formatAmount = (value: string): string => {
  if (!value) return '';
  const cleanValue = value.replace(/[^0-9]/g, '');
  if (!cleanValue) return '';
  return '₹ ' + formatIndianNumber(cleanValue);
};

const InsuranceForm: React.FC<InsuranceFormProps> = ({ categoryId, onSubmit, initialData, isEditing = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    provider: '',
    logoUrl: '',
    type: 'General',
    description: '',
    minPremium: '',
    coverage: '',
    categoryId: categoryId || 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        provider: initialData.provider || '',
        logoUrl: initialData.logoUrl || '',
        type: initialData.type || 'General',
        description: initialData.description || '',
        minPremium: initialData.minPremium?.toString() || '',
        coverage: initialData.coverage || '',
        categoryId: initialData.categoryId || categoryId || 0
      });
    }
  }, [initialData, categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Auto-capitalize for specific fields
    if (['name', 'provider', 'description'].includes(name)) {
      formattedValue = capitalizeWords(value);
    }

    // Auto-format amounts with ₹ symbol
    if (name === 'minPremium' || name === 'coverage') {
      formattedValue = formatAmount(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
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
        ? `/api/admin/insurance/${initialData?.id}`
        : '/api/admin/products/insurance';
      const method = isEditing ? 'PUT' : 'POST';

      const submitData = {
        ...formData,
        minPremium: formData.minPremium ? Number(formData.minPremium) : 0,
        categoryId: formData.categoryId || undefined
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        alert(`Insurance ${isEditing ? 'updated' : 'created'} successfully!`);
        router.push('/dashboard/products');
      } else {
        const error = await response.json();
        alert(`Failed to ${isEditing ? 'update' : 'create'} insurance: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Failed to ${isEditing ? 'update' : 'create'} insurance`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Policy Name *</label>
            <input 
              required 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize" 
              placeholder="Enter policy name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input 
              required 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="policy-name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="General">General</option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Car Insurance">Car Insurance</option>
              <option value="Life Insurance">Life Insurance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Provider *</label>
            <input 
              required 
              name="provider" 
              value={formData.provider} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize" 
              placeholder="Provider name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
            <input 
              type="url"
              name="logoUrl" 
              value={formData.logoUrl} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Premium</label>
            <input 
              type="number"
              name="minPremium" 
              value={formData.minPremium} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="0"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Coverage</label>
            <input 
              name="coverage" 
              value={formData.coverage} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize" 
              placeholder="Coverage details"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea 
              required 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize" 
              rows={4}
              placeholder="Enter policy description"
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
          {loading ? 'Saving...' : isEditing ? 'Update Insurance Policy' : 'Create Insurance Policy'}
        </button>
      </div>
    </form>
  );
};

export default InsuranceForm;
