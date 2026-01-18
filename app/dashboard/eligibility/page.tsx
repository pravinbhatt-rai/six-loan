"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, TrendingUp, Calendar, Phone, Mail, User, Building, DollarSign, ChevronRight, Filter, Trash2, CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";
import { fastFetch } from "@/lib/utils/ultraFastFetch";
import { PageLoader } from "@/component/commonComponent/SixFinanceLoader";

interface EligibilityInquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  panCard: string;
  dateOfBirth: string | null;
  employment: string;
  monthlyIncome: number | null;
  city: string | null;
  creditScore: number | null;
  eligibilityScore: number;
  status: "pending" | "reviewed" | "approved" | "rejected" | "contacted";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

type FilterStatus = "all" | "pending" | "reviewed" | "approved" | "rejected" | "contacted";

const statusColors = {
  pending: "bg-blue-100 text-blue-700 border-blue-200",
  reviewed: "bg-purple-100 text-purple-700 border-purple-200",
  approved: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  contacted: "bg-gray-100 text-gray-700 border-gray-200"
};

const scoreColors = (score: number) => {
  if (score >= 80) return "text-green-600 bg-green-50";
  if (score >= 60) return "text-teal-600 bg-teal-50";
  if (score >= 40) return "text-orange-600 bg-orange-50";
  return "text-red-600 bg-red-50";
};

export default function EligibilityDashboard() {
  const [inquiries, setInquiries] = useState<EligibilityInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<EligibilityInquiry | null>(null);
  const [counts, setCounts] = useState({
    all: 0,
    pending: 0,
    reviewed: 0,
    approved: 0,
    rejected: 0,
    contacted: 0
  });

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const endpoint = filter === "all" 
        ? "/api/eligibility" 
        : `/api/eligibility?status=${filter}`;
      
      const response = await fastFetch<{ success: boolean; data: EligibilityInquiry[] }>(
        endpoint,
        { timeout: 5000, cache: false }
      );

      if (response && response.success && response.data) {
        setInquiries(response.data);
        
        // Calculate counts
        const allInquiries = filter === "all" 
          ? response.data 
          : await fastFetch<{ success: boolean; data: EligibilityInquiry[] }>(
              "/api/eligibility",
              { timeout: 5000, cache: false }
            ).then(r => r && r.data ? r.data : []);

        setCounts({
          all: allInquiries.length,
          pending: allInquiries.filter((i: EligibilityInquiry) => i.status === "pending").length,
          reviewed: allInquiries.filter((i: EligibilityInquiry) => i.status === "reviewed").length,
          approved: allInquiries.filter((i: EligibilityInquiry) => i.status === "approved").length,
          rejected: allInquiries.filter((i: EligibilityInquiry) => i.status === "rejected").length,
          contacted: allInquiries.filter((i: EligibilityInquiry) => i.status === "contacted").length
        });
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/eligibility/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes })
      });

      const data: { success: boolean; data: EligibilityInquiry } = await response.json();

      if (data.success) {
        fetchInquiries();
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(data.data);
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      await fetch(`/api/eligibility/${id}`, {
        method: "DELETE"
      });

      fetchInquiries();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const maskPan = (pan: string) => {
    if (pan.length !== 10) return pan;
    return `${pan.substring(0, 4)}****${pan.charAt(9)}`;
  };

  if (loading) {
    return <PageLoader message="Loading eligibility inquiries..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Eligibility Inquiries</h1>
          <p className="text-gray-600">Manage credit card and loan eligibility checks</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-gray-400" />
            {(["all", "pending", "reviewed", "approved", "rejected", "contacted"] as FilterStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({counts[status]})
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inquiries List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Inquiries ({inquiries.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
              {inquiries.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No inquiries found</p>
                </div>
              ) : (
                inquiries.map((inquiry) => (
                  <motion.div
                    key={inquiry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedInquiry?.id === inquiry.id ? "bg-teal-50" : ""
                    }`}
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full border ${
                              statusColors[inquiry.status]
                            }`}
                          >
                            {inquiry.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {inquiry.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            {maskPan(inquiry.panCard)}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${scoreColors(inquiry.eligibilityScore)}`}>
                              Score: {inquiry.eligibilityScore}/100
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Detail View */}
          <div className="bg-white rounded-lg shadow-sm">
            {selectedInquiry ? (
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedInquiry.name}
                    </h2>
                    <span
                      className={`px-3 py-1 text-sm rounded-full border ${
                        statusColors[selectedInquiry.status]
                      }`}
                    >
                      {selectedInquiry.status}
                    </span>
                  </div>
                  <div className={`text-center p-4 rounded-lg ${scoreColors(selectedInquiry.eligibilityScore)}`}>
                    <div className="text-3xl font-bold">{selectedInquiry.eligibilityScore}</div>
                    <div className="text-xs">Score</div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Email</label>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedInquiry.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Phone</label>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {selectedInquiry.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">PAN Card</label>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {selectedInquiry.panCard}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">City</label>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        {selectedInquiry.city || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Employment</label>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {selectedInquiry.employment}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Monthly Income</label>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        ₹{selectedInquiry.monthlyIncome?.toLocaleString() || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Credit Score</label>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {selectedInquiry.creditScore || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Date of Birth</label>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {selectedInquiry.dateOfBirth
                          ? new Date(selectedInquiry.dateOfBirth).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 uppercase">Submitted</label>
                    <p className="text-sm font-medium">
                      {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {selectedInquiry.notes && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="text-xs text-gray-500 uppercase flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Notes
                      </label>
                      <p className="text-sm mt-2">{selectedInquiry.notes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900">Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedInquiry.status !== "reviewed" && (
                      <button
                        onClick={() => updateStatus(selectedInquiry.id, "reviewed")}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                      >
                        Mark as Reviewed
                      </button>
                    )}
                    {selectedInquiry.status !== "approved" && (
                      <button
                        onClick={() => updateStatus(selectedInquiry.id, "approved")}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                    )}
                    {selectedInquiry.status !== "rejected" && (
                      <button
                        onClick={() => updateStatus(selectedInquiry.id, "rejected")}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    )}
                    {selectedInquiry.status !== "contacted" && (
                      <button
                        onClick={() => updateStatus(selectedInquiry.id, "contacted")}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <Phone className="w-4 h-4" />
                        Mark Contacted
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => deleteInquiry(selectedInquiry.id)}
                    className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Select an inquiry to view details</p>
                <p className="text-sm mt-2">Click on any inquiry from the list to see full information</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
