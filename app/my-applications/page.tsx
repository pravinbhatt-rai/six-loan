"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface Application {
  id: number;
  type: string;
  status: string;
  createdAt: string;
  loan?: {
    id: number;
    title: string;
    bankName: string;
  };
  card?: {
    id: number;
    name: string;
    bankName: string;
  };
  insurance?: {
    id: number;
    name: string;
    provider: string;
  };
}

export default function MyApplicationsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");

      const response = await fetch("/api/users/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (applicationId: number) => {
    if (!confirm("Are you sure you want to withdraw this application?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/users/applications/${applicationId}/withdraw`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to withdraw application");
        return;
      }

      alert("Application withdrawn successfully");
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error withdrawing application:", error);
      alert("Failed to withdraw application");
    }
  };

  const getProductName = (app: Application) => {
    if (app.loan) return app.loan.title;
    if (app.card) return app.card.name;
    if (app.insurance) return app.insurance.name;
    return "Unknown Product";
  };

  const getProductBank = (app: Application) => {
    if (app.loan) return app.loan.bankName;
    if (app.card) return app.card.bankName;
    if (app.insurance) return app.insurance.provider;
    return "";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "WITHDRAWN":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const canWithdraw = (status: string) => {
    return status === "PENDING" || status === "IN_PROGRESS";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-2">Track and manage your loan and credit card applications</p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">You haven't submitted any applications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {getProductName(app)}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">{getProductBank(app)}</p>
                    <p className="text-sm text-gray-500">
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Type: <span className="font-medium">{app.type}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {canWithdraw(app.status) && (
                      <button
                        onClick={() => handleWithdraw(app.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
