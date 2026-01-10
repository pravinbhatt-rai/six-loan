"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoanDetailsDrawer, { LoanDetailsData } from "../loandetail/LoanDetailsDrawer";
import EmploymentTypeModal from "../loandetail/EmploymentTypeModal";

interface LoanProduct {
  id: number;
  title?: string;
  bankName: string;
  bankLogoUrl?: string;
  logoUrl?: string;
  processTimeLabel?: string;
  chanceOfApproval?: string;
  interestRateText?: string;
  aprText?: string;
  emiAmount?: string;
  slug: string;
  categoryId?: number;
  processTimeValue?: string;
  approvalScore?: number;
  processTypeLabel?: string;
  processTypeValue?: string;
  emiValue?: number;
  disbursalTimeHours?: number;
  keyStatement?: string;
  bullets?: Array<{ text: string; displayOrder: number }>;
}

interface UniversalBankCardProps {
  categorySlug: string;
  title?: string;
  maxDisplay?: number;
}

const UniversalBankCard: React.FC<UniversalBankCardProps> = ({ 
  categorySlug, 
  title,
  maxDisplay = 4 
}) => {
  const router = useRouter();
  const [loans, setLoans] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState<{name: string, slug: string} | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<LoanDetailsData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applyingLoan, setApplyingLoan] = useState<LoanProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        // Use the absolute URL to your Express server
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/category/${categorySlug}`;
        
        console.log("🌐 Fetching loans from:", apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          mode: 'cors',
          credentials: 'omit',
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("✅ API Response:", data);
          
          if (data.success && data.products && Array.isArray(data.products)) {
            setLoans(data.products);
            setError(null);
            
            // Store category information
            if (data.category) {
              setCategoryInfo({
                name: data.category.name,
                slug: data.category.slug,
              });
            }
          } else {
            console.warn("Unexpected API response format:", data);
            setError("Invalid response format from server");
          }
        } else {
          setError(`Server error: ${response.status} ${response.statusText}`);
        }
        
      } catch (error: any) {
        console.error("❌ Failed to fetch loans:", error);
        setError(`Network error: ${error.message}. Please check if the backend server is running on port 4000.`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLoans();
  }, [categorySlug]);

  const handleShowDetails = async (loan: LoanProduct) => {
    try {
      // Fetch full loan details
      const detailsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/${loan.slug}`;
      console.log("Fetching loan details from:", detailsUrl);
      
      const res = await fetch(detailsUrl, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        console.log("Loan details response:", data);
        
        if (data.success && data.loan) {
          const loanData = data.loan;
          setSelectedLoan({
            id: loanData.id,
            bankName: loanData.bankName,
            bankLogoUrl: loanData.bankLogoUrl || '',
            emiExample: loanData.emiAmount || '₹ 2,000',
            interestRateText: loanData.interestRateText || 'N/A',
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

  const handleApplyClick = (loan: LoanProduct) => {
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

  const handleApplyFromDrawer = () => {
    if (selectedLoan) {
      const loan = loans.find(l => l.id === selectedLoan.id);
      if (loan) {
        handleApplyClick(loan);
      }
    }
  };

  const displayLoans = loans.slice(0, maxDisplay);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
          {title || `Best ${categorySlug.replace(/-/g, ' ')} Loan Offers`}
        </h1>
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading loan offers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
          {title || `Best ${categorySlug.replace(/-/g, ' ')} Loan Offers`}
        </h1>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-600 font-bold text-lg mb-2">Unable to Load Loans</h3>
          <p className="text-red-500 mb-4">{error}</p>
          
          <div className="mt-4 flex gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Retry Connection
            </button>
            
            <a 
              href="/"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!displayLoans || displayLoans.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
          {title || `Best ${categorySlug.replace(/-/g, ' ')} Loan Offers`}
        </h1>
        <div className="text-center py-10 text-gray-500">
          No loan offers found for this category at the moment.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
          {title || `Best ${categorySlug.replace(/-/g, ' ')} Loan Offers`}
        </h1>
        
        {displayLoans.map((card, idx) => (
          <div 
            key={card.id || idx} 
            className="bg-white rounded-2xl border border-gray-300 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 font-sans mb-4 hover:shadow-md transition-shadow duration-200"
          >
            {/* Left Side: Content */}
            <div className="flex-1">
              {/* Header: Logo & Name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-50 flex items-center justify-center">
                  {card.bankLogoUrl ? (
                    <img 
                      src={card.bankLogoUrl} 
                      alt={card.bankName} 
                      className="w-full h-full object-contain" 
                    />
                  ) : (
                    <span className="text-xs font-bold text-gray-400">
                      {card.bankName?.substring(0, 2)}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold font-serif text-gray-900">
                  {card.bankName}
                </h2>
              </div>
              
              {/* Data Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Column 1: Process Time */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Process Time
                  </p>
                  <p className="text-teal-500 font-medium">
                    {card.processTimeLabel || "Instant"}
                  </p>
                </div>
                
                {/* Column 2: Chance of Approval */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Chance Of Approval
                  </p>
                  <p className="text-teal-500 font-medium">
                    {card.chanceOfApproval || "Excellent"}
                  </p>
                </div>
                
                {/* Column 3: Interest Rate */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Interest Rate (p.a)
                  </p>
                  <p className="text-teal-500 font-medium">
                    {card.interestRateText || "10.5% Onwards"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    APR: {card.aprText || "N/A"}
                  </p>
                </div>
                
                {/* Column 4: EMI */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    EMI
                  </p>
                  <p className="text-teal-500 font-semibold text-lg">
                    {card.emiAmount || "₹ 2,000"}
                  </p>
                  <p className="text-xs text-gray-500">Onwards</p>
                </div>
              </div>
            </div>
            
            {/* Right Side: Actions */}
            <div className="flex flex-col gap-3 w-full md:w-auto min-w-40">
              <button
                className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-3.5 rounded-lg transition-colors shadow-sm active:scale-[0.98] transform hover:shadow-md"
                onClick={() => handleApplyClick(card)}
              >
                Apply Now
              </button>
              <button 
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2.5 px-6 rounded-md border border-gray-300 transition-colors duration-200 hover:border-gray-400"
                onClick={() => handleShowDetails(card)}
              >
                Show Details
              </button>
            </div>
          </div>
        ))}
        
        <div className="mt-8 text-center">
          <Link href={`/loandetails?category=${categorySlug}`}>
            <button className="w-full md:w-auto px-8 py-3 bg-white text-teal-500 font-semibold border border-teal-500 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md">
              Show More Offers 
            </button>
          </Link>
        </div>
      </div>

      {/* Employment Type Modal */}
      {applyingLoan && (
        <EmploymentTypeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setApplyingLoan(null);
          }}
          productId={applyingLoan.id}
          productType="LOAN"
          categorySlug={categorySlug}
          categoryName={categoryInfo?.name}
          loanSlug={applyingLoan.slug}
          bankName={applyingLoan.bankName}
          bankLogo={applyingLoan.bankLogoUrl}
        />
      )}

      {/* Loan Details Drawer */}
      {selectedLoan && (
        <LoanDetailsDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          loan={selectedLoan}
          onApply={handleApplyFromDrawer}
          categoryName={categoryInfo?.name}
        />
      )}
    </>
  );
};

export default UniversalBankCard;