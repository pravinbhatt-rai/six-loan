"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "@/component/loandetail/FilterSidebar";
import { FilterState, LoanProduct } from "@/public/mockdata/data";
import EmploymentTypeModal from "@/component/loandetail/EmploymentTypeModal";
import LoanDetailsDrawer, { LoanDetailsData } from "@/component/loandetail/LoanDetailsDrawer";

const InitialFilterState: FilterState = {
  sortBy: "approval-high-low",
  processingTime: [],
  processType: [],
};

// Get API base URL from environment or use default
const getApiBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  return url.replace(/\/$/, '');
};

function LoanDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");

  const [filters, setFilters] = useState<FilterState>(InitialFilterState);
  const [loans, setLoans] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState<{ name: string; slug: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Modal and Drawer State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanDetailsData | null>(null);
  const [applyingLoan, setApplyingLoan] = useState<LoanProduct | null>(null);

  // Get API base URL
  const apiBaseUrl = getApiBaseUrl();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        // Construct the correct URL
        let apiUrl = `${apiBaseUrl}/api/loans`;

        // If category is specified, use the category-specific endpoint
        if (categorySlug) {
          apiUrl = `${apiBaseUrl}/api/loans/category/${categorySlug}`;
        }

        console.log("📡 Fetching loans from:", apiUrl, "for category:", categorySlug);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(apiUrl, { 
          cache: "no-store",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          signal: controller.signal,
          mode: 'cors' // Explicitly set CORS mode
        });
        
        clearTimeout(timeoutId);
        
        console.log("Response status:", response.status, response.statusText);
        console.log("Response URL:", response.url);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ LoanDetail API Response:", data);

          // Extract products and category info
          const backendLoans = data.products || data.loans || [];

          // Store category information
          if (data.category) {
            setCategoryInfo({
              name: data.category.name,
              slug: data.category.slug,
            });
          } else if (categorySlug) {
            // If no category data returned, use the slug
            setCategoryInfo({
              name: categorySlug.replace(/-/g, ' ').toUpperCase(),
              slug: categorySlug,
            });
          }

          const mappedLoans = backendLoans.map((l: any) => ({
            id: l.id,
            title: l.title || `${l.bankName} Loan`,
            bankName: l.bankName,
            logoUrl: l.bankLogoUrl || l.logoUrl || "",
            bankLogoUrl: l.bankLogoUrl || l.logoUrl || "",
            processTimeLabel: l.processTimeLabel || "Instant",
            processTimeValue: l.processTimeValue || "instant",
            chanceOfApproval: l.chanceOfApproval || "Good",
            approvalScore: l.approvalScore || 80,
            interestRateText: l.interestRateText || l.interestRate || "N/A",
            aprText: l.aprText || l.apr || "N/A",
            emiAmount: l.emiAmount || l.emiValue || "₹ 2,000",
            emiValue: l.emiValue || 2000,
            processTypeLabel: l.processTypeLabel || "Standard",
            processTypeValue: l.processTypeValue || "standard",
            disbursalTimeHours: l.disbursalTimeHours || 24,
            slug: l.slug,
            categoryId: l.categoryId,
            keyStatement: l.keyStatement,
            bullets: l.bullets || [],
            footerItems: l.footerItems || [],
          }));

          console.log("✅ Mapped loans:", mappedLoans.length, "for category:", categorySlug);
          setLoans(mappedLoans);
          setError(null);
        } else {
          console.error("❌ API request failed:", response.status, response.statusText);
          setLoans([]);
          setError(`Failed to load loans: ${response.status} ${response.statusText}`);
        }
      } catch (error: any) {
        console.error("❌ Failed to fetch loans:", error);
        setLoans([]);
        
        if (error.name === 'AbortError') {
          setError("Request timeout (10s). Server might be down or slow.");
        } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          setError(`Cannot connect to server. Please check if the backend is running at ${apiBaseUrl}`);
        } else {
          setError(`Network error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (categorySlug) {
      fetchLoans();
    } else {
      setLoading(false);
      setError("No category specified");
    }
  }, [categorySlug, apiBaseUrl]);

  const filteredLoans = React.useMemo(() => {
    let result = [...loans];

    if (filters.processingTime.length > 0) {
      result = result.filter((loan) => filters.processingTime.includes(loan.processTimeValue));
    }

    if (filters.processType.length > 0) {
      result = result.filter((loan) => filters.processType.includes(loan.processTypeValue));
    }

    if (filters.sortBy) {
      result.sort((a, b) => {
        switch (filters.sortBy) {
          case "approval-high-low":
            return b.approvalScore - a.approvalScore;
          case "disbursal-low-high":
            return a.disbursalTimeHours - b.disbursalTimeHours;
          case "emi-low-high":
            return a.emiValue - b.emiValue;
          case "emi-high-low":
            return b.emiValue - a.emiValue;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [filters, loans]);

  const handleClearAll = () => {
    setFilters({
      sortBy: null,
      processingTime: [],
      processType: [],
    });
  };

  const handleShowDetails = async (loan: any) => {
    try {
      const detailsUrl = `${apiBaseUrl}/api/loans/${loan.slug}`;
      console.log("Fetching loan details from:", detailsUrl);
      
      const res = await fetch(detailsUrl, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.loan) {
          const loanData = data.loan;
          setSelectedLoan({
            id: loanData.id,
            bankName: loanData.bankName,
            bankLogoUrl: loanData.bankLogoUrl || "",
            emiExample: loanData.emiAmount || "₹ 2,000",
            interestRateText: loanData.interestRateText || "N/A",
            summaryCharges: loanData.summaryCharges || [],
            requiredDocuments: loanData.requiredDocuments || [],
            processSteps: loanData.processSteps || [],
            keyStatement: loanData.keyStatement,
            emiAmount: loanData.emiAmount,
          });
          setIsDrawerOpen(true);
        } else {
          alert("Failed to load loan details. Please try again.");
        }
      } else {
        alert(`Failed to load loan details: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error("Failed to fetch loan details:", error);
      alert("Network error. Please check your connection.");
    }
  };

  const handleApplyClick = (loan: any) => {
    // Check if user is logged in
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    setApplyingLoan(loan);
    setIsDrawerOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setApplyingLoan(null);
  };

  // Test the API directly
  const testApiConnection = () => {
    const testUrl = `${apiBaseUrl}/api/loans/category/${categorySlug}`;
    window.open(testUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Page Header with Category Name */}
        {categoryInfo && !error && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{categoryInfo.name} Offers</h1>
            <p className="text-gray-600 mt-2">
              Showing all {categoryInfo.name.toLowerCase()} options
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-600 font-bold text-lg mb-2">Error Loading Loans</h3>
            <p className="text-red-500 mb-4">{error}</p>
            
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-bold text-yellow-800 mb-2">Debug Information:</h4>
              <p className="text-sm mb-2">API Base URL: <code className="bg-gray-100 px-2 py-1 rounded">{apiBaseUrl}</code></p>
              <p className="text-sm mb-2">Category Slug: <code className="bg-gray-100 px-2 py-1 rounded">{categorySlug}</code></p>
              <p className="text-sm mb-2">Constructed URL: <code className="bg-gray-100 px-2 py-1 rounded">{apiBaseUrl}/loans/category/{categorySlug}</code></p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Try Again
              </button>
              <button
                onClick={testApiConnection}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Test API in New Tab
              </button>
              <a 
                href="/"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Back to Home
              </a>
            </div>
          </div>
        )}

        {/* Employment Type Modal */}
        {applyingLoan && (
          <EmploymentTypeModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            productId={applyingLoan.id}
            productType="LOAN"
            categorySlug={categorySlug || undefined}
            categoryName={categoryInfo?.name}
            loanSlug={applyingLoan.slug}
            bankName={applyingLoan.bankName}
            bankLogo={applyingLoan.logoUrl}
          />
        )}

        {/* Loan Details Drawer */}
        {selectedLoan && (
          <LoanDetailsDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            loan={selectedLoan}
            onApply={() => {
              const loan = loans.find((l) => l.id === selectedLoan.id);
              if (loan) handleApplyClick(loan);
            }}
            categoryName={categoryInfo?.name}
          />
        )}

        {!error && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Sidebar */}
            <aside className="w-full md:w-80 shrink-0">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onClearAll={handleClearAll}
              />
            </aside>

            {/* Main Content Area */}
            <main className="grow">
              {loading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading loans...</p>
                  <p className="text-sm text-gray-400 mt-2">
                    From: {apiBaseUrl}/loans/category/{categorySlug}
                  </p>
                </div>
              ) : filteredLoans.length > 0 ? (
                <>
                  <div className="mb-4 text-gray-600">
                    Showing {filteredLoans.length} of {loans.length} loans
                  </div>
                  {filteredLoans.map((card: any, index: number) => (
                    <div
                      key={card.id || index}
                      className="bg-white rounded-2xl border-b-4 border-teal-500/30 border-x border-t border-slate-200 shadow-sm hover:shadow-xl transition-all mb-8 overflow-hidden group"
                    >
                      {/* Upper Status Ribbon */}
                      <div className="bg-teal-50 px-6 py-2 flex justify-between items-center border-b border-teal-100">
                        <span className="text-[10px] font-black text-teal-700 uppercase tracking-[0.25em]">
                          {card.processTimeLabel || "Featured"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                          <span className="text-[10px] text-teal-600 font-extrabold uppercase tracking-widest">
                            {card.keyStatement || "Fast Processing"}
                          </span>
                        </div>
                      </div>

                      <div className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        {/* 1. Brand Identity */}
                        <div className="flex items-center gap-6 min-w-[260px]">
                          <div className="w-16 h-16 bg-teal-500/10 rounded-2xl p-2.5 flex items-center justify-center border border-teal-500/20 group-hover:bg-teal-500 transition-colors duration-300">
                            <div className="group-hover:brightness-0 group-hover:invert transition-all w-full h-full">
                              {card.bankLogoUrl ? (
                                <img
                                  src={card.bankLogoUrl}
                                  alt={card.bankName}
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const parent = (e.target as HTMLImageElement).parentElement;
                                    if (parent) {
                                      const fallback = document.createElement('span');
                                      fallback.className = 'text-xs font-bold text-gray-400';
                                      fallback.textContent = card.bankName?.substring(0, 2) || '??';
                                      parent.appendChild(fallback);
                                    }
                                  }}
                                />
                              ) : (
                                <span className="text-xs font-bold text-gray-400">
                                  {card.bankName?.substring(0, 2)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                              {card.bankName}
                            </h3>
                            <p className="text-[11px] font-bold text-teal-600 tracking-[0.1em] uppercase mt-2">
                              {card.title}
                            </p>
                          </div>
                        </div>

                        {/* 2. Financial Metrics Grid */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                              Interest
                            </p>
                            <p className="text-lg font-bold text-slate-900 leading-none">
                              {card.interestRateText || "N/A"}
                            </p>
                            <p className="text-[10px] text-teal-500 font-bold mt-1 tracking-tighter">
                              Verified ROI
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                              Amount
                            </p>
                            <p className="text-lg font-bold text-slate-900 leading-none">
                              {card.emiAmount || "N/A"}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-1">EMI/Month</p>
                          </div>

                          {card.chanceOfApproval && (
                            <div className="hidden md:block border-l border-slate-100 pl-6">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                                Approval
                              </p>
                              <p className="text-lg font-bold text-slate-900 leading-none">
                                {card.chanceOfApproval}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium mt-1">Chance</p>
                            </div>
                          )}

                          <div className="hidden md:block">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                              Process
                            </p>
                            <p className="text-lg font-bold text-slate-900 leading-none">
                              {card.processTimeLabel || "Fast"}
                            </p>
                            <p className="text-[10px] text-teal-600 font-bold mt-1 uppercase">
                              Time
                            </p>
                          </div>
                        </div>

                        {/* 3. Action Block */}
                        <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-44">
                          <button
                            className="flex-[2] bg-teal-500 hover:bg-teal-600 text-white text-[11px] font-black uppercase tracking-[0.15em] py-4 rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)] active:scale-95"
                            onClick={() => handleApplyClick(card)}
                          >
                            Apply Now
                          </button>
                          <button
                            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-black uppercase tracking-[0.15em] py-4 rounded-xl border-2 border-slate-200 transition-all"
                            onClick={() => handleShowDetails(card)}
                          >
                            Details
                          </button>
                        </div>
                      </div>

                      {/* Footer: Tech-Style Documentation bar with Backend Data */}
                      {(card.bullets && card.bullets.length > 0) && (
                        <div className="bg-slate-900 px-8 py-2.5 flex items-center gap-6">
                          <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest">
                            Key Features:
                          </span>
                          <div className="flex gap-4 overflow-x-auto no-scrollbar">
                            {card.bullets
                              .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0))
                              .slice(0, 4)
                              .map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-1.5 shrink-0">
                                  <div className="h-1 w-1 bg-teal-500 rounded-full"></div>
                                  <span className="text-[9px] font-bold text-slate-300 uppercase">
                                    {item.text}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="bg-white p-8 rounded-2xl text-center text-gray-500">
                  {loans.length === 0 ? (
                    <div>
                      <p className="mb-2">No loans found for this category.</p>
                      <p className="text-sm">Please check if the backend API is running.</p>
                    </div>
                  ) : (
                    `No ${categoryInfo?.name || "loans"} match your selected filters.`
                  )}
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LoanDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    }>
      <LoanDetailContent />
    </Suspense>
  );
}