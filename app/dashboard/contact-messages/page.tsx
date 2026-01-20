"use client";

import React, { useEffect, useState } from 'react';
import { Mail, Phone, Clock, Eye, Check, Archive, Trash2 } from 'lucide-react';
import { fastFetch } from '@/lib/utils/ultraFastFetch';
import { PageLoader } from '@/component/commonComponent/SixFinanceLoader';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'responded' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' ? '/api/contact-messages' : `/api/contact-messages?status=${filter}`;
      const data = await fastFetch<any>(url, {
        timeout: 5000,
        cache: false
      });

      if (data?.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchMessages();
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status: status as any });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMessages();
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      unread: 'bg-blue-100 text-blue-800',
      read: 'bg-gray-100 text-gray-800',
      responded: 'bg-green-100 text-green-800',
      archived: 'bg-yellow-100 text-yellow-800'
    };
    return badges[status as keyof typeof badges] || badges.unread;
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h1>
          <p className="text-gray-600">Manage customer inquiries and support requests</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {['all', 'unread', 'read', 'responded', 'archived'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({messages.filter(m => f === 'all' || m.status === f).length})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="bg-white p-8 rounded-lg text-center text-gray-500">
                No messages found
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === 'unread') updateStatus(msg.id, 'read');
                  }}
                  className={`bg-white p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage?.id === msg.id ? 'border-teal-500 shadow-md' : 'border-gray-200'
                  } ${msg.status === 'unread' ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{msg.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{msg.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(msg.status)}`}>
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium mb-1">{msg.subject}</p>
                  <p className="text-xs text-gray-500 truncate">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.name}</h2>
                      <p className="text-gray-600">{selectedMessage.email}</p>
                      {selectedMessage.phone && (
                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                          <Phone size={14} /> {selectedMessage.phone}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusBadge(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium">
                      {selectedMessage.subject}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Message</h3>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-gray-200 flex gap-2 flex-wrap">
                  {selectedMessage.status === 'unread' && (
                    <button
                      onClick={() => updateStatus(selectedMessage.id, 'read')}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Eye size={16} /> Mark as Read
                    </button>
                  )}
                  {(selectedMessage.status === 'read' || selectedMessage.status === 'unread') && (
                    <button
                      onClick={() => updateStatus(selectedMessage.id, 'responded')}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Check size={16} /> Mark as Responded
                    </button>
                  )}
                  <button
                    onClick={() => updateStatus(selectedMessage.id, 'archived')}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Archive size={16} /> Archive
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors ml-auto"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center text-gray-500">
                <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
