'use client';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import CreditCardApplicationModal from './CreditCardApplicationModal';

export interface BenefitSubPoint {
  id?: number;
  text: string;
  displayOrder?: number;
}

export interface BenefitSection {
  id?: number;
  heading: string;
  displayOrder?: number;
  subPoints: BenefitSubPoint[];
}

export interface CreditCardDetailsData {
  id: string | number;
  name: string;
  bank?: string;
  bankName?: string;
  image?: string;
  imageUrl?: string;
  bankLogoUrl?: string;
  fee?: string;
  annualFee?: string;
  cardNetwork?: string;
  cardType?: string; // standard, premium, secured, student, business, addon, nri, hni
  bestSuitedFor?: string; // Legacy single description (kept for backward compatibility)
  bestSuitedForPoints?: Array<{text: string}> | string[]; // New: Array of best suited for points
  bullets?: string[] | any[];
  bulletPoints?: any[];
  keyFeatures?: string[];
  cardBenefits?: string[];
  categories?: string[] | any[]; // Array of category names or objects
  videoUrl?: string | null;
  termsConditionsUrl?: string | null;
  firstYearFee?: string;
  secondYearFee?: string;
  feeWaiverCondition?: string;
  
  // OLD: More Information sections (keeping for backward compatibility)
  cashbackBenefits?: string[];
  loungeAccess?: string[];
  fuelBenefits?: string[];
  diningBenefits?: string[];
  travelBenefits?: string[];
  shoppingBenefits?: string[];
  otherBenefits?: string[];
  
  // NEW: Dynamic benefit sections
  benefitSections?: BenefitSection[];
  
  // Processing and Document Information
  summaryCharges?: any[];
  requiredDocuments?: any[];
  processSteps?: any[];
  specialOffers?: string[];
}

interface CreditCardDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  card: CreditCardDetailsData | null;
  onApply: () => void;
  categorySlug?: string;
  categoryName?: string;
}

export interface CreditCardDetailsDrawerHandle {
  openApplicationModal: () => void;
}

const CreditCardDetailsDrawer = forwardRef<CreditCardDetailsDrawerHandle, CreditCardDetailsDrawerProps>(({
  isOpen,
  onClose,
  card,
  onApply,
  categorySlug,
  categoryName,
}, ref) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Expose method to parent to open application modal
  useImperativeHandle(ref, () => ({
    openApplicationModal: () => {
      setShowApplicationModal(true);
    }
  }));

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string | null | undefined) => {
    if (!url) return null;
    
    // If already an embed URL, return as is
    if (url.includes('embed')) return url;
    
    // Convert YouTube watch URL to embed
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    return url;
  };

  const handleApplyClick = () => {
    setShowApplicationModal(true);
  };

  const handleApplicationModalClose = () => {
    setShowApplicationModal(false);
    onClose(); // Close the drawer as well
    onApply(); // Call the original onApply callback
  };

  // Determine card type from categories or cardType field
  const getCardType = (): 'standard' | 'premium' | 'secured' | 'student' | 'business' | 'addon' | 'nri' | 'hni' => {
    // First check explicit cardType field
    if (card?.cardType) {
      const type = card.cardType.toLowerCase();
      if (['standard', 'premium', 'secured', 'student', 'business', 'addon', 'nri', 'hni'].includes(type)) {
        return type as any;
      }
    }
    
    // Check categories
    const categories = card?.categories || [];
    const categoryNames = categories.map((c: any) => 
      typeof c === 'string' ? c.toLowerCase() : c.name?.toLowerCase() || ''
    );
    
    if (categoryNames.some((c: string) => c.includes('secured'))) return 'secured';
    if (categoryNames.some((c: string) => c.includes('student'))) return 'student';
    if (categoryNames.some((c: string) => c.includes('business'))) return 'business';
    if (categoryNames.some((c: string) => c.includes('addon') || c.includes('add-on'))) return 'addon';
    if (categoryNames.some((c: string) => c.includes('nri'))) return 'nri';
    if (categoryNames.some((c: string) => c.includes('hni') || c.includes('wealth'))) return 'hni';
    if (categoryNames.some((c: string) => c.includes('premium') || c.includes('luxury'))) return 'premium';
    
    return 'standard';
  };

  if (!shouldRender || !card) return null;

  const cardImage = card.imageUrl || card.image || '';
  const bankLogo = card.bankLogoUrl || '';
  const bankName = card.bankName || card.bank || '';
  const embedUrl = getEmbedUrl(card.videoUrl);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-2.5 sm:p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {cardImage && (
              <img src={cardImage} alt={card.name} className="w-16 h-10 sm:w-20 sm:h-12 object-contain shrink-0 rounded" />
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">{card.name}</h2>
              {bankName && <p className="text-xs sm:text-sm text-gray-600 truncate">{bankName}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Learn about the card - Video Section */}
          {embedUrl && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600 p-2.5 sm:p-3 md:p-4 border-b border-gray-200">
                Learn about the card!
              </h3>
              <div className="relative aspect-video bg-black">
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${card.name} Video`}
                />
              </div>
            </div>
          )}

          {/* Key Features */}
          {card.keyFeatures && card.keyFeatures.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600 mb-2.5 sm:mb-3 md:mb-4 flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl md:text-2xl">💰</span>
                Key Features
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                {card.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                    <span className="text-yellow-500 text-base sm:text-lg md:text-xl mt-0.5 shrink-0">💰</span>
                    <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Card Benefits */}
          {card.cardBenefits && card.cardBenefits.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600 mb-2.5 sm:mb-3 md:mb-4">Card Benefits</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {card.cardBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                    <span className="text-gray-700 text-xs sm:text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fee Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600 mb-2.5 sm:mb-3 md:mb-4">Fee Details</h3>
            <div className="space-y-3 sm:space-y-4">
              {card.firstYearFee && (
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-0.5 sm:mb-1">1st Year</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{card.firstYearFee}</p>
                </div>
              )}
              {card.secondYearFee && (
                <div className="pt-2.5 sm:pt-3 border-t border-gray-100">
                  <p className="text-gray-600 text-xs sm:text-sm mb-0.5 sm:mb-1">2nd year onwards</p>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{card.secondYearFee}</p>
                  {card.feeWaiverCondition && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{card.feeWaiverCondition}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* More Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600 mb-2.5 sm:mb-3 md:mb-4">More Information</h3>
            
            {/* NEW: Dynamic Benefit Sections */}
            {card.benefitSections && card.benefitSections.length > 0 ? (
              card.benefitSections.filter(section => section && section.heading).map((section, sectionIndex) => (
                <div key={section.id || sectionIndex} className="mb-3 sm:mb-4 md:mb-5 last:mb-0">
                  <div className="inline-block bg-green-50 text-green-700 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-2.5 md:mb-3">
                    {section.heading}
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {section.subPoints && section.subPoints.length > 0 ? section.subPoints.map((subPoint, subIndex) => (
                      <li key={subPoint.id || subIndex} className="flex items-start gap-1.5 sm:gap-2">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                        <span className="text-gray-700 text-xs sm:text-sm">{subPoint.text}</span>
                      </li>
                    )) : null}
                  </ul>
                </div>
              ))
            ) : (
              <>
                {/* OLD: Fallback to static benefit sections for backward compatibility */}
                
                {/* Cashback Benefits */}
                {card.cashbackBenefits && card.cashbackBenefits.length > 0 && (
                  <div className="mb-3 sm:mb-4 md:mb-5">
                    <div className="inline-block bg-green-50 text-green-700 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-2.5 md:mb-3">
                      Cashback Benefits
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {card.cashbackBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                          <span className="text-gray-700 text-xs sm:text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lounge Access */}
                {card.loungeAccess && card.loungeAccess.length > 0 && (
                  <div className="mb-3 sm:mb-4 md:mb-5">
                    <div className="inline-block bg-green-50 text-green-700 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-2.5 md:mb-3">
                      Lounge Access
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {card.loungeAccess.map((access, index) => (
                        <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                          <span className="text-gray-700 text-xs sm:text-sm">{access}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fuel Benefits */}
                {card.fuelBenefits && card.fuelBenefits.length > 0 && (
                  <div className="mb-3 sm:mb-4 md:mb-5">
                    <div className="inline-block bg-green-50 text-green-700 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-2.5 md:mb-3">
                      Fuel Benefits
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {card.fuelBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                          <span className="text-gray-700 text-xs sm:text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Dining Benefits */}
                {card.diningBenefits && card.diningBenefits.length > 0 && (
                  <div className="mb-3 sm:mb-4 md:mb-5">
                    <div className="inline-block bg-green-50 text-green-700 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-2.5 md:mb-3">
                      Dining Benefits
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {card.diningBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                          <span className="text-gray-700 text-xs sm:text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Travel Benefits */}
                {card.travelBenefits && card.travelBenefits.length > 0 && (
                  <div className="mb-3 sm:mb-4 md:mb-5">
                    <div className="inline-block bg-green-50 text-green-700 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-2.5 md:mb-3">
                      Travel Benefits
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {card.travelBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                          <span className="text-gray-700 text-xs sm:text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Shopping Benefits */}
                {card.shoppingBenefits && card.shoppingBenefits.length > 0 && (
                  <div className="mb-3 sm:mb-4 md:mb-5">
                    <div className="inline-block bg-green-50 text-green-700 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-2.5 md:mb-3">
                      Shopping Benefits
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {card.shoppingBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                          <span className="text-gray-700 text-xs sm:text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Other Benefits */}
                {card.otherBenefits && card.otherBenefits.length > 0 && (
                  <div>
                    <div className="inline-block bg-green-50 text-green-700 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-2.5 md:mb-3">
                      Other Benefits
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {card.otherBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                          <span className="text-gray-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Summary Charges */}
          {card.summaryCharges && card.summaryCharges.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600 mb-2.5 sm:mb-3 md:mb-4">Summary Charges</h3>
              <div className="space-y-3 sm:space-y-4">
                {card.summaryCharges.map((charge: any, index: number) => (
                  <div key={charge.id || index} className="border-b border-gray-100 last:border-0 pb-3 sm:pb-4 last:pb-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">{charge.label}</p>
                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{charge.mainText}</p>
                        {charge.subText && (
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{charge.subText}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Documents */}
          {card.requiredDocuments && card.requiredDocuments.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600 mb-2.5 sm:mb-3 md:mb-4">Required Documents</h3>
              <ul className="space-y-2 sm:space-y-3">
                {card.requiredDocuments.map((doc: any, index: number) => (
                  <li key={doc.id || index} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-blue-600 text-base sm:text-lg md:text-xl mt-0.5 shrink-0">📄</span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-900">{doc.title}</p>
                      {doc.description && (
                        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">{doc.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Process Steps */}
          {card.processSteps && card.processSteps.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600 mb-2.5 sm:mb-3 md:mb-4">How to Apply</h3>
              <div className="space-y-3 sm:space-y-4">
                {card.processSteps.map((step: any, index: number) => (
                  <div key={step.id || index} className="flex items-start gap-2 sm:gap-3">
                    <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white font-bold text-xs sm:text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-900">{step.title}</p>
                      {step.description && (
                        <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">{step.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          {card.termsConditionsUrl && (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-2.5 md:mb-3">Terms & Conditions</h3>
              <a 
                href={card.termsConditionsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-xs sm:text-sm md:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Full Terms & Conditions
              </a>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-2.5 md:mt-3">
                Please read all terms and conditions carefully before applying for this credit card.
              </p>
            </div>
          )}
        </div>

        {/* Footer - Apply Now Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-2.5 sm:p-3 md:p-4">
          <button
            onClick={handleApplyClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3 md:py-4 rounded-lg transition-all shadow-lg text-sm sm:text-base md:text-lg"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Credit Card Application Modal */}
      <CreditCardApplicationModal
        isOpen={showApplicationModal}
        onClose={handleApplicationModalClose}
        bankName={bankName}
        bankLogo={bankLogo || cardImage}
        productId={typeof card.id === 'string' ? parseInt(card.id) : card.id}
        cardType={getCardType()}
        categorySlug={categorySlug}
        categoryName={categoryName || card.name}
      />
    </>
  );
});

CreditCardDetailsDrawer.displayName = 'CreditCardDetailsDrawer';

export default CreditCardDetailsDrawer;
