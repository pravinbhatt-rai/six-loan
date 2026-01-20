'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoanDetailsDrawer, { LoanDetailsData } from '../loandetail/LoanDetailsDrawer';
import EmploymentTypeModal from '../loandetail/EmploymentTypeModal';
import { fastFetch, prefetch } from '@/lib/utils/ultraFastFetch';

interface LoanCardData {
  id: number;
  bankName: string;
  title?: string;
  specialization?: string;
  tag?: string;
  bankLogoUrl?: string;
  maxAmount?: string;
  interest: string;
  interestRateText: string;
  moratorium?: string;
  eligibility?: string;
  chanceOfApproval?: string;
  fee?: string;
  feature?: string;
  processTimeLabel?: string;
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
  aprText?: string;
}

interface UniversalLoanCardProps {
  categorySlug: string;
  headerTitle: string;
  headerSubtitle: string;
  headerDescription: string;
  maxDisplay?: number;
  showViewAllButton?: boolean;
  // New filter props
  loanType?: string;
  loanSubType?: string;
  amountRange?: string;
  eligibleFor?: string;
  loanPurpose?: string;
  scheme?: string;
  vehicleType?: string;
}

// Create a simple cache with TTL (Time To Live)
const createCache = <T,>() => {
  const cache = new Map<string, { data: T; timestamp: number }>();
  const TTL = 5 * 60 * 1000; // 5 minutes cache

  return {
    get: (key: string): T | null => {
      const cached = cache.get(key);
      if (!cached) return null;
      
      // Check if cache is still valid
      if (Date.now() - cached.timestamp > TTL) {
        cache.delete(key);
        return null;
      }
      
      return cached.data;
    },
    
    set: (key: string, data: T): void => {
      cache.set(key, { data, timestamp: Date.now() });
    },
    
    delete: (key: string): void => {
      cache.delete(key);
    },
    
    clear: (): void => {
      cache.clear();
    }
  };
};

const loansCache = createCache<LoanCardData[]>();
const categoryCache = createCache<{name: string, slug: string}>();

const UniversalLoanCard: React.FC<UniversalLoanCardProps> = ({
  categorySlug,
  headerTitle,
  headerSubtitle,
  headerDescription,
  maxDisplay = 4,
  showViewAllButton = true,
  loanType,
  loanSubType,
  amountRange,
  eligibleFor,
  loanPurpose,
  scheme,
  vehicleType,
}) => {
  const router = useRouter();
  const [loans, setLoans] = useState<LoanCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryInfo, setCategoryInfo] = useState<{name: string, slug: string} | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<LoanDetailsData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applyingLoan, setApplyingLoan] = useState<LoanCardData | null>(null);

  // Prefetch images function
  const prefetchImages = useCallback((imageUrls: string[]) => {
    imageUrls.forEach(url => {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, []);

  const fetchLoans = useCallback(async () => {
    // Build cache key with filters
    const filterParams = [
      categorySlug,
      loanType,
      loanSubType,
      amountRange,
      eligibleFor,
      loanPurpose,
      scheme,
      vehicleType
    ].filter(Boolean).join('_');
    
    const cacheKey = `loans_${filterParams}`;
    const cachedLoans = loansCache.get(cacheKey);
    const cachedCategory = categoryCache.get(`category_${categorySlug}`);
    
    if (cachedLoans && cachedCategory) {
      console.log("📦 Using cached data for:", filterParams);
      setLoans(cachedLoans);
      setCategoryInfo(cachedCategory);
      setLoading(false);
      
      // Prefetch images for cached loans
      const imageUrls = cachedLoans.map(loan => loan.bankLogoUrl).filter(Boolean) as string[];
      prefetchImages(imageUrls);
      
      return;
    }

    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (categorySlug) params.append('category', categorySlug);
      if (loanType) params.append('loanType', loanType);
      if (loanSubType) params.append('loanSubType', loanSubType);
      if (amountRange) params.append('amountRange', amountRange);
      if (eligibleFor) params.append('eligibleFor', eligibleFor);
      if (loanPurpose) params.append('loanPurpose', loanPurpose);
      if (scheme) params.append('scheme', scheme);
      if (vehicleType) params.append('vehicleType', vehicleType);
      
      const apiUrl = `/api/loans${params.toString() ? `?${params.toString()}` : ''}`;
      
      console.log("🌐 Ultra-fast fetching loans from:", apiUrl);
      
      // Ultra-fast fetch with 3s timeout and aggressive caching
      const data = await fastFetch<any>(apiUrl, {
        timeout: 3000,
        cache: true,
        retries: 2
      });
      
      if (data?.success && data?.products && Array.isArray(data.products)) {
        console.log("✅ Loans fetched (cached):", data);
        
          const loanProducts = data.products;
          const mappedLoans: LoanCardData[] = loanProducts.map((loan: any) => ({
            id: loan.id,
            bankName: loan.bankName,
            title: loan.title,
            specialization: loan.title || loan.keyStatement || loan.bankName,
            tag: loan.processTimeLabel || 'Featured',
            bankLogoUrl: loan.bankLogoUrl || '',
            maxAmount: loan.emiAmount,
            interest: loan.interestRateText,
            interestRateText: loan.interestRateText,
            moratorium: loan.processTypeLabel,
            eligibility: loan.chanceOfApproval,
            chanceOfApproval: loan.chanceOfApproval,
            fee: loan.aprText,
            feature: loan.keyStatement || loan.processTimeLabel,
            processTimeLabel: loan.processTimeLabel,
            emiAmount: loan.emiAmount,
            slug: loan.slug,
            categoryId: loan.categoryId,
            processTimeValue: loan.processTimeValue,
            approvalScore: loan.approvalScore,
            processTypeLabel: loan.processTypeLabel,
            processTypeValue: loan.processTypeValue,
            emiValue: loan.emiValue,
            disbursalTimeHours: loan.disbursalTimeHours,
            keyStatement: loan.keyStatement,
            bullets: loan.bullets || [],
            aprText: loan.aprText,
          }));

          // Cache the results
          loansCache.set(cacheKey, mappedLoans);
          
          if (data.category) {
            const categoryData = {
              name: data.category.name,
              slug: data.category.slug,
            };
            categoryCache.set(`category_${categorySlug}`, categoryData);
            setCategoryInfo(categoryData);
          }

          setLoans(mappedLoans);
          setError(null);
          
          // Prefetch images
          const imageUrls = mappedLoans.map(loan => loan.bankLogoUrl).filter(Boolean) as string[];
          prefetchImages(imageUrls);
          
        } else {
          console.warn("Unexpected API response format:", data);
          setError("Invalid response format from server");
        }
      
    } catch (error: any) {
      console.error("❌ Failed to fetch loans:", error);
      setError(`Failed to load loans. Please try again.`);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, loanType, loanSubType, amountRange, eligibleFor, loanPurpose, scheme, vehicleType]);

  const handleShowDetails = useCallback(async (loan: LoanCardData) => {
    try {
      // Ultra-fast fetch with aggressive caching for instant load
      const detailsUrl = `/api/loans/${loan.slug}`;
      console.log("⚡ Ultra-fast fetching loan details:", detailsUrl);
      
      const data = await fastFetch<any>(detailsUrl, {
        timeout: 1000, // 1 second for instant feel
        cache: true,
        retries: 1
      });
      
      if (data?.success && data?.loan) {
        console.log("✅ Loan details loaded (cached):", data);
        const loanData = data.loan;
        // Set loan data THEN open drawer immediately with complete data
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
    } catch (error) {
      console.error("Failed to fetch loan details:", error);
      alert("Network error. Please check your connection.");
    }
  }, []);

  const handleApplyClick = useCallback((loan: LoanCardData) => {
    // Check if user is logged in
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    setApplyingLoan(loan);
    setIsDrawerOpen(false);
    setIsModalOpen(true);
  }, [router]);

  const handleApplyFromDrawer = useCallback(() => {
    if (selectedLoan) {
      const loan = loans.find(l => l.id === selectedLoan.id);
      if (loan) {
        handleApplyClick(loan);
      }
    }
  }, [selectedLoan, loans, handleApplyClick]);

  useEffect(() => {
    let mounted = true;
    let abortController = new AbortController();
    
    const loadData = async () => {
      if (!mounted) return;
      await fetchLoans();
    };
    
    loadData();
    
    return () => {
      mounted = false;
      abortController.abort(); // Cancel any pending requests
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, loanType, loanSubType, amountRange, eligibleFor, loanPurpose, scheme, vehicleType]);

  // Memoize display loans for performance
  const displayLoans = useMemo(() => {
    return loans.slice(0, maxDisplay);
  }, [loans, maxDisplay]);

  // Optimized loading state - shows skeleton immediately
  if (loading && loans.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 min-h-screen font-sans">
        {/* Header with Teal Accents - Skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-2 bg-teal-500 animate-pulse"></div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              {/* <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {headerTitle}
              </span> */}
            </h1>
          </div>
          <div className="h-6 w-64 bg-gray-200 rounded ml-5 animate-pulse"></div>
          <div className="h-4 w-80 bg-gray-100 rounded ml-5 mt-2 animate-pulse"></div>
        </div>
        
        {/* Skeleton Cards */}
        {Array.from({ length: maxDisplay }).map((_, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-8 overflow-hidden animate-pulse"
          >
            <div className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              {/* Brand Identity Skeleton */}
              <div className="flex items-center gap-6 min-w-[260px]">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="h-7 w-40 bg-gray-200 rounded"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded"></div>
                </div>
              </div>
              
              {/* Metrics Grid Skeleton */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="h-3 w-20 bg-gray-100 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    <div className="h-2 w-16 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
              
              {/* Action Buttons Skeleton */}
              <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-44">
                <div className="flex-2 h-12 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 h-12 bg-gray-100 rounded-xl border-2 border-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 min-h-screen font-sans">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-2 bg-red-500"></div>
            <h1 
              className="text-4xl font-black text-slate-900 tracking-tighter uppercase"
              dangerouslySetInnerHTML={{ __html: headerTitle }}
            />
          </div>
          <h2 className="text-xl font-bold text-slate-700 ml-5">{headerSubtitle}</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-red-600 font-bold text-lg mb-2">Unable to Load {headerTitle}</h3>
          <p className="text-red-500 mb-4">{error}</p>
          
          <div className="mt-4 flex gap-4">
            <button 
              onClick={() => {
                // Clear cache and retry
                loansCache.delete(`loans_${categorySlug}`);
                categoryCache.delete(`category_${categorySlug}`);
                fetchLoans();
              }}
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
      <div className="w-full max-w-6xl mx-auto p-6 min-h-screen font-sans text-center">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-2 bg-teal-500"></div>
            <h1 
              className="text-4xl font-black text-slate-900 tracking-tighter uppercase"
              dangerouslySetInnerHTML={{ __html: headerTitle }}
            />
          </div>
          <h2 className="text-xl font-bold text-slate-700 ml-5">{headerSubtitle}</h2>
        </div>
        <div className="text-center py-20 text-slate-500">
          No {categorySlug.replace('-', ' ')} offers found at the moment.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-6 min-h-screen font-sans">
        {/* Header with Teal Accents */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-2 bg-teal-500"></div>
            <h1 
              className="text-4xl font-black text-slate-900 tracking-tighter uppercase"
              dangerouslySetInnerHTML={{ __html: headerTitle }}
            />
          </div>
          <h2 className="text-xl font-bold text-slate-700 ml-5">{headerSubtitle}</h2>
          <p className="text-slate-500 font-medium ml-5 mt-1 text-sm tracking-wide">
            {headerDescription}
          </p>
        </div>

        {/* Loan Cards */}
        {displayLoans.map((card, index) => (
          <div
            key={card.id || index}
            className="bg-white rounded-2xl border-b-4 border-x border-t border-teal-500/20 shadow-sm hover:shadow-xl transition-all mb-8 overflow-hidden group"
            onMouseEnter={() => {
              // Prefetch detail data on hover for instant loading
              if (card.slug) {
                prefetch(`/api/loans/${card.slug}`, { timeout: 1000, cache: true });
              }
            }}
          >
            {/* Upper Status Ribbon */}
            <div className="bg-teal-50 px-6 py-2 flex justify-between items-center border-b border-teal-100">
              <span className="text-[10px] font-black text-teal-700 uppercase tracking-[0.25em]">
                {card.tag || "Featured"}
              </span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                <span className="text-[10px] text-teal-600 font-extrabold uppercase tracking-widest">
                  {card.feature || "Fast Processing"}
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
                  <p className="text-[11px] font-bold text-teal-600 tracking-widest uppercase mt-2">
                    {card.specialization}
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
                    {card.emiAmount || card.maxAmount || "N/A"}
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
                  className="flex-2 bg-teal-500 hover:bg-teal-600 text-white text-[11px] font-black uppercase tracking-[0.15em] py-4 rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)] active:scale-95"
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
                    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                    .slice(0, 4) // Limit to 4 items
                    .map((item, idx) => (
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

        {/* Show More Button */}
        {showViewAllButton && (
          <div className="mt-10 text-center">
            <Link 
              href={(() => {
                const params = new URLSearchParams();
                if (categorySlug) params.append('category', categorySlug);
                if (loanType) params.append('loanType', loanType);
                if (loanSubType) params.append('loanSubType', loanSubType);
                if (amountRange) params.append('amountRange', amountRange);
                if (eligibleFor) params.append('eligibleFor', eligibleFor);
                if (loanPurpose) params.append('loanPurpose', loanPurpose);
                if (scheme) params.append('scheme', scheme);
                if (vehicleType) params.append('vehicleType', vehicleType);
                return `/loandetails${params.toString() ? `?${params.toString()}` : ''}`;
              })()}
              className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-white text-teal-600 text-xs font-black uppercase tracking-widest border-2 border-teal-100 rounded-full hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              View All Offers
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </div>
        )}
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
          categoryName={categoryInfo?.name || headerTitle}
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
          categoryName={categoryInfo?.name || headerTitle}
        />
      )}
    </>
  );
};

export default UniversalLoanCard;