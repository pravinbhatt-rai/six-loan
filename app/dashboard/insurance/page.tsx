"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Shield } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function InsurancePage() {
  const router = useRouter();
  const [insurance, setInsurance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '', slug: '', provider: '', logoUrl: '', type: 'Health', description: '', minPremium: '', coverage: ''
  });

  const fetchInsurance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/admin/insurance', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setInsurance(data);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch insurance', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsurance();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/products/insurance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          minPremium: parseFloat(formData.minPremium)
        })
      });

      if (response.ok) {
        setShowModal(false);
        fetchInsurance();
        setFormData({ name: '', slug: '', provider: '', logoUrl: '', type: 'Health', description: '', minPremium: '', coverage: '' });
      }
    } catch (error) {
      console.error('Failed to create insurance', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Insurance Products</h1>
          <p className="text-gray-500">Manage health and car insurance plans.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          Add Insurance
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search plans..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-medium">
              <tr>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Plan Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Coverage</th>
                <th className="px-6 py-4">Min Premium</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center">Loading...</td></tr>
              ) : insurance.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={item.logoUrl} alt="" className="w-8 h-8 rounded object-contain" />
                    <span className="font-medium text-gray-800">{item.provider}</span>
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${item.type === 'Health' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.coverage}</td>
                  <td className="px-6 py-4">₹{item.minPremium}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Modal for Adding Insurance */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add Insurance Plan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Plan Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-2 border rounded" />
                <input required placeholder="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="p-2 border rounded" />
                <input required placeholder="Provider Name" value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} className="p-2 border rounded" />
                <input required placeholder="Logo URL" value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} className="p-2 border rounded" />
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="p-2 border rounded">
                  <option value="Health">Health Insurance</option>
                  <option value="Car">Car Insurance</option>
                </select>
                <input type="number" placeholder="Min Premium" value={formData.minPremium} onChange={e => setFormData({...formData, minPremium: e.target.value})} className="p-2 border rounded" />
              </div>
              <input placeholder="Coverage (e.g. 5 Lakhs)" value={formData.coverage} onChange={e => setFormData({...formData, coverage: e.target.value})} className="w-full p-2 border rounded" />
              <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" rows={3} />
              
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
