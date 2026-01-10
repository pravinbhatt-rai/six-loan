"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoanForm from '@/component/Dashboard/LoanForm';
import CreditCardForm from '@/component/Dashboard/CreditCardForm';
import InsuranceForm from '@/component/Dashboard/InsuranceForm';
import AppForm from '@/component/Dashboard/AppForm';
import { API_BASE_URL } from '@/lib/api';

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/admin/categories`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('You are not logged in. Redirecting to login page...');
        router.push('/login');
        return;
      }

      const category = categories.find(c => c.id.toString() === selectedCategory);
      
      let endpoint = '';
      let body = { ...data };

        if (category?.type === 'CREDIT_CARD') {
          endpoint = `${API_BASE_URL}/api/admin/products/credit-card`;
          body.categoryIds = [Number(selectedCategory)];
      } else if (category?.type === 'INSURANCE') {
          endpoint = `${API_BASE_URL}/api/admin/products/insurance`;
          body.categoryId = Number(selectedCategory);
      } else if (category?.type === 'APP') {
          endpoint = `${API_BASE_URL}/api/admin/products/app`;
      } else {
          endpoint = `${API_BASE_URL}/api/admin/products/loan`;
          body.categoryId = Number(selectedCategory);
      }

      console.log('Sending request to:', endpoint);
      console.log('With token:', token ? 'Token exists' : 'No token');
      console.log('Request body:', body);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        alert('Product created successfully!');
        router.push('/dashboard/products');
      } else {
        const error = await response.json();
        console.error('Backend error:', error);
        
        // Handle specific error cases
        if (response.status === 409) {
          // Duplicate slug error
          alert(`⚠️ ${error.error}\n\n${error.details}\n\nPlease change the slug to something unique.`);
        } else if (error.details?.includes('Unique constraint failed')) {
          // Generic unique constraint error
          alert(`⚠️ Duplicate Entry\n\nThis product already exists. Please use a different slug or name.`);
        } else {
          // Other errors
          alert(`❌ Error: ${error.error || error.message || 'Failed to create product'}\n\n${error.details || ''}`);
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('An error occurred while creating the product. Please check your network connection.');
    }
  };

  // Helper function - must be defined BEFORE return
  const getCategoryType = (id: string) => {
    const cat = categories.find(c => c.id.toString() === id);
    return cat?.type; // Changed from cat?.name to cat?.type
  };

  // SINGLE RETURN STATEMENT
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/products" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-500">Create a new loan or credit card offering.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-8 max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Choose a Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.type})
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="mt-8 border-t border-gray-100 pt-8">
            {(() => {
              const categoryType = getCategoryType(selectedCategory);
              const catId = Number(selectedCategory);
              if (categoryType === 'LOAN') return <LoanForm onSubmit={handleSubmit} categoryId={catId} />;
              if (categoryType === 'CREDIT_CARD') return <CreditCardForm onSubmit={handleSubmit} categoryId={catId} />;
              if (categoryType === 'INSURANCE') return <InsuranceForm onSubmit={handleSubmit} categoryId={catId} />;
              if (categoryType === 'APP') return <AppForm onSubmit={handleSubmit} categoryId={catId} />;
              return null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
}