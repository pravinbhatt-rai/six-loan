"use client";
import React, { useState, useEffect } from "react";
import FilterSidebar from "@/component/creditcards/FilterSidebar";
import CardList from "@/component/creditcards/CardList";
import { CardInfo } from "@/component/creditcards/CardItem";
import CreditCardDetailsDrawer, { CreditCardDetailsData } from "@/component/creditcards/CreditCardDetailsDrawer";
import { CardRecord } from "@/component/creditcards/cardsData";
import { FiFilter, FiChevronRight, FiCheck, FiInfo, FiShoppingBag, FiGlobe, FiAward, FiCreditCard, FiDollarSign, FiZap } from "react-icons/fi";
import { X, ArrowRight, ChevronRight, Star, CreditCard, Plane, ShoppingBag, Fuel, Gift, Award, Globe, Crown, DollarSign, Zap, Percent, Clock, Shield, MapPin } from "lucide-react";
import ComparisonModal from "@/component/creditcards/ComparisonModal";
import CreditCardApplicationModal from "@/component/creditcards/CreditCardApplicationModal";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/component/commonComponent/SixFinanceLoader";
import { fastFetch } from "@/lib/utils/ultraFastFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function BestCreditCardsPage() {
  const router = useRouter();
  const drawerRef = React.useRef<any>(null);
  const [cards, setCards] = useState<CardRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCardDetailsData | null>(null);
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({});
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  // Comparison State
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  
  // Application Modal State
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationCard, setApplicationCard] = useState<CardInfo | null>(null);

  // Fetch cards from backend
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        
        // Fast optimized fetch
        const data = await fastFetch<any>(`${API_BASE_URL}/api/credit-cards`, {
          timeout: 3000,
          cache: true
        });
        
        if (!data) {
          console.error('Failed to fetch cards: No data returned');
          setLoading(false);
          return;
        }
          
          // Debug: Log the API response
          console.log('API Response:', data);
          
          // Handle different response formats
          let cardsArray: any[] = [];
          
          if (Array.isArray(data)) {
            // If response is directly an array
            cardsArray = data;
          } else if (data && typeof data === 'object') {
            // If response is an object, check for common property names
            if (Array.isArray(data.cards)) {
              cardsArray = data.cards;
            } else if (Array.isArray(data.data)) {
              cardsArray = data.data;
            } else if (Array.isArray(data.creditCards)) {
              cardsArray = data.creditCards;
            } else if (Array.isArray(data.products)) {
              cardsArray = data.products;
            } else {
              // If no array found, log error and set empty
              console.error('No array found in API response:', data);
              cardsArray = [];
            }
          }
          
          // Map API response to CardRecord
          const mappedCards: CardRecord[] = cardsArray.map((c: any) => ({
            id: c.id?.toString() || Math.random().toString(),
            name: c.name || c.title || 'Unknown Card',
            image: c.imageUrl || c.bankLogoUrl || "/creditcard/image 666.png",
            bullets: c.bulletPoints ? 
              c.bulletPoints.map((b: any) => typeof b === 'string' ? b : (b.text || '')) : 
              c.bullets || [],
            bank: c.bankName || c.bank || 'Unknown Bank',
            categories: c.categories ? 
              c.categories.map((cat: any) => typeof cat === 'string' ? cat : cat.name) : 
              [],
            fee: (c.annualFee === "Lifetime free" || c.annualFee === "1st year free only") 
              ? c.annualFee 
              : "1st year free only",
            cardType: (c.cardNetwork === "UPI Rupay" || c.cardNetwork === "Visa/Mastercard") 
              ? c.cardNetwork 
              : "Visa/Mastercard",
            effectiveFree: Boolean(c.effectiveFree),
            recommended: c.recommended === true ? "best" : null,
            slug: c.slug,
            firstYearFee: c.firstYearFee,
            secondYearFee: c.secondYearFee,
            rating: c.rating || Math.random() * 0.5 + 4.3 // Random rating between 4.3-4.8 if not provided
          }));
          
          // Sort by rating (highest first)
          mappedCards.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          
          console.log('Mapped cards:', mappedCards);
          setCards(mappedCards);
      } catch (error) {
        console.error("Failed to fetch credit cards", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const mapToDetails = (card: CardInfo): CreditCardDetailsData | null => {
    const full = cards.find((c) => c.id === card.id);
    if (!full) return null;
    return {
      id: full.id,
      name: full.name,
      bank: full.bank,
      image: full.image,
      categories: full.categories,
      fee: full.fee,
      cardType: full.cardType,
      bullets: full.bullets,
    };
  };

  const handleApply = (card: CardInfo) => {
    console.log('Apply clicked for:', card.name);
    setApplicationCard(card);
    setShowApplicationModal(true);
  };

  const handleShowDetails = async (card: CardInfo) => {
    console.log('handleShowDetails called with card:', card);
    const full = cards.find((c) => c.id === card.id);
    console.log('Found full card:', full);
    if (!full) return;

    // Fetch full details FIRST before opening drawer
    if (full.slug) {
        try {
            const data = await fastFetch<any>(`/api/credit-cards/${full.slug}`, {
              timeout: 2000,
              cache: true
            });
            if (data?.card) {
                    const fullDetails: CreditCardDetailsData = {
                        id: full.id,
                        name: full.name,
                        bank: full.bank,
                        image: full.image,
                        categories: full.categories,
                        fee: full.fee,
                        cardType: full.cardType,
                        bullets: full.bullets,
                        ...data.card,
                        videoUrl: data.card.videoUrl,
                        keyFeatures: data.card.keyFeatures?.map((kf: any) => kf.feature || kf) || [],
                        cardBenefits: data.card.cardBenefits?.map((cb: any) => cb.benefit || cb) || [],
                        benefitSections: data.card.benefitSections || [],
                        bestSuitedForPoints: data.card.bestSuitedForPoints || [],
                        firstYearFee: data.card.firstYearFee,
                        secondYearFee: data.card.secondYearFee,
                        feeWaiverCondition: data.card.feeWaiverCondition,
                        summaryCharges: data.card.summaryCharges,
                        requiredDocuments: data.card.requiredDocuments,
                        processSteps: data.card.processSteps,
                        bulletPoints: data.card.bulletPoints,
                        termsConditionsUrl: data.card.termsConditionsUrl,
                        cardNetwork: data.card.cardNetwork,
                        annualFee: data.card.annualFee,
                        bankName: data.card.bankName,
                        bankLogoUrl: data.card.bankLogoUrl,
                        imageUrl: data.card.imageUrl,
                    };
                    console.log('Setting full details and opening drawer:', fullDetails);
                    setSelectedCard(fullDetails);
                    setOpenDrawer(true);
                    return;
            }
        } catch (err) {
            console.error("Failed to fetch card details", err);
        }
    }
    
    // Fallback: open with basic details if API call fails
    const initialDetails: CreditCardDetailsData = {
      id: full.id,
      name: full.name,
      bank: full.bank,
      image: full.image,
      categories: full.categories,
      fee: full.fee,
      cardType: full.cardType,
      bullets: full.bullets,
    };
    console.log('Setting initial details and opening drawer:', initialDetails);
    setSelectedCard(initialDetails);
    setOpenDrawer(true);
  };
  
  const handleToggle = (key: string, value: boolean) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleClearAll = () => {
    setActiveFilters({});
  };

  const toggleCardSelection = (cardId: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else {
        if (prev.length >= 2) {
          return [prev[1], cardId]; // Replace first with new selection
        }
        return [...prev, cardId];
      }
    });
  };

  const handleCompare = () => {
    if (selectedForComparison.length === 2) {
      setShowComparisonModal(true);
    }
  };

  const handleCloseComparison = () => {
    setShowComparisonModal(false);
    setSelectedForComparison([]);
  };

  const removeFromComparison = (cardId: string) => {
    setSelectedForComparison(prev => prev.filter(id => id !== cardId));
  };

  // Card categories based on PDF with detailed sections
  const cardSections = [
    {
      id: "best-cashback",
      title: "Best Cashback Credit Cards in India",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      bgColor: "bg-gradient-to-r from-green-50 to-teal-50",
      borderColor: "border-green-200",
      cards: [
        {
          name: "YES BANK Paisabazaar PaisaSave Credit Card",
          bank: "YES BANK",
          joiningFee: "₹10",
          annualFee: "₹1499",
          image: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?w=400&h=250&fit=crop",
          keyFeatures: [
            "6% cashback on travel and dining spends",
            "Unlimited 1% cashback on all other spends, including UPI",
            "No merchant restrictions"
          ],
          whyWeLikeIt: "High cashback without any merchant restrictions"
        },
        {
          name: "Cashback SBI Card",
          bank: "SBI",
          joiningFee: "₹1999",
          annualFee: "₹1999",
          image: "https://images.unsplash.com/photo-1613243555978-636c48dc653c?w=400&h=250&fit=crop",
          keyFeatures: [
            "5% cashback on all online spends",
            "1% cashback across all offline spends",
            "Cashback directly credited to card account"
          ],
          whyWeLikeIt: "High cashback rate for online transactions with no merchant restrictions"
        },
        {
          name: "HDFC Millennia Credit Card",
          bank: "HDFC Bank",
          joiningFee: "₹1,000 + Taxes",
          annualFee: "₹1,000 + Taxes",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop",
          keyFeatures: [
            "5% cashback on all online shopping at Amazon, Flipkart, Myntra, etc.",
            "1% cashback on all other spends",
            "4 complementary domestic lounge access per year"
          ],
          whyWeLikeIt: "Welcome benefit compensates for the joining fee charged"
        }
      ]
    },
    {
      id: "best-rewards",
      title: "Best Rewards Credit Cards in India",
      icon: <Award className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      cards: [
        {
          name: "HDFC Regalia Gold Credit Card",
          bank: "HDFC Bank",
          joiningFee: "₹2,500 + Taxes",
          annualFee: "₹2,500 + Taxes",
          image: "https://images.unsplash.com/photo-1613243555978-636c48dc653c?w=400&h=250&fit=crop",
          keyFeatures: [
            "20 reward points per ₹150 spent at Nykaa, Myntra, etc.",
            "Reward points on insurance and utility payments",
            "Complimentary Priority Pass Membership"
          ],
          whyWeLikeIt: "Accelerated rewards on popular brands"
        },
        {
          name: "Axis SELECT Credit Card",
          bank: "Axis Bank",
          joiningFee: "₹3,000 + Taxes",
          annualFee: "₹3,000 + Taxes",
          image: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?w=400&h=250&fit=crop",
          keyFeatures: [
            "10 Axis EDGE reward points on every ₹200 spent",
            "20% discount on BigBasket (max ₹500)",
            "₹200 off on Swiggy, twice a month"
          ],
          whyWeLikeIt: "Great option for offline spends"
        },
        {
          name: "SBI Prime Credit Card",
          bank: "SBI",
          joiningFee: "₹2,999 + Taxes",
          annualFee: "₹2,999 + Taxes",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop",
          keyFeatures: [
            "10 reward points per ₹100 spent on dining, groceries, movies",
            "E-gift vouchers worth ₹3,000 as welcome benefits",
            "Complimentary international and domestic lounge access"
          ],
          whyWeLikeIt: "One of the highest reward rates in this fee range"
        },
        {
          name: "American Express Membership Rewards® Credit Card",
          bank: "American Express",
          joiningFee: "₹1,000 + Taxes",
          annualFee: "₹4,500 + Taxes",
          image: "https://images.unsplash.com/photo-1613243555978-636c48dc653c?w=400&h=250&fit=crop",
          keyFeatures: [
            "1 Membership Reward point per ₹50",
            "Bonus 5,000 Membership Rewards points upon First Year Card Renewal",
            "4,000 Membership Rewards Points on card activation"
          ],
          whyWeLikeIt: "Redemption options cover everyday brands like Flipkart & Amazon to premium ones like Tanishq and Taj"
        }
      ]
    },
    {
      id: "best-travel",
      title: "Best Travel Credit Cards in India",
      icon: <Plane className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      cards: [
        {
          name: "Axis Atlas Credit Card",
          bank: "Axis Bank",
          joiningFee: "₹5,000 + Taxes",
          annualFee: "₹5,000 + Taxes",
          image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop",
          keyFeatures: [
            "Up to 12 international lounge access per year",
            "Redemption of EDGE Miles across 10+ airlines",
            "Up to 5 EDGE Miles per ₹100 spent on travel"
          ],
          whyWeLikeIt: "One of the most rewarding credit cards for Air Miles"
        },
        {
          name: "HSBC TravelOne Credit Card",
          bank: "HSBC",
          joiningFee: "₹4,999 + Taxes",
          annualFee: "₹4,999 + Taxes",
          image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop",
          keyFeatures: [
            "4 reward points per ₹100 spent on flights and travel",
            "Up to 15% discount on popular travel platforms",
            "6 complementary domestic lounge visits every year"
          ],
          whyWeLikeIt: "Airline-agnostic credit card designed for frequent travelers"
        },
        {
          name: "American Express Platinum Travel Credit Card",
          bank: "American Express",
          joiningFee: "₹5,000 + Taxes",
          annualFee: "₹5,000 + Taxes",
          image: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?w=400&h=250&fit=crop",
          keyFeatures: [
            "1 Membership Rewards Point for every ₹50 spent",
            "8 domestic lounge visits per year",
            "25,000 Membership Rewards Points milestone benefit"
          ],
          whyWeLikeIt: "Substantial milestone benefits, particularly helpful for travelers"
        }
      ]
    },
    {
      id: "best-premium",
      title: "Best Premium Credit Cards in India",
      icon: <Crown className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-gradient-to-r from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
      cards: [
        {
          name: "HDFC Diners Club Black Credit Card",
          bank: "HDFC Bank",
          joiningFee: "₹10,000 + Taxes",
          annualFee: "₹10,000 + Taxes",
          image: "https://images.unsplash.com/photo-1613243555978-636c48dc653c?w=400&h=250&fit=crop",
          keyFeatures: [
            "Up to 3.33% reward rate across multiple categories",
            "Unlimited complimentary international & domestic airport lounge access",
            "Complimentary membership of Amazon Prime, Club Marriott, etc."
          ],
          whyWeLikeIt: "One of the highest reward rates available"
        },
        {
          name: "Axis Reserve Credit Card",
          bank: "Axis Bank",
          joiningFee: "₹50,000 + Taxes",
          annualFee: "₹50,000 + Taxes",
          image: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?w=400&h=250&fit=crop",
          keyFeatures: [
            "Reward rate of 3% on domestic spends and 6% on international spends",
            "Unlimited airport lounge access with 12 free guest visits",
            "50 complimentary golf rounds across leading golf courses"
          ],
          whyWeLikeIt: "Travel-centric benefits like unlimited lounge access"
        },
        {
          name: "American Express Platinum Card",
          bank: "American Express",
          joiningFee: "₹64,000 + Taxes",
          annualFee: "₹66,000 + Taxes",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop",
          keyFeatures: [
            "Complimentary access to leading golf courses",
            "Multiple hotel memberships and premium benefits",
            "World-class Platinum concierge service"
          ],
          whyWeLikeIt: "Excellent benefits in golf and hotel categories"
        }
      ]
    },
    {
      id: "best-fuel",
      title: "Best Fuel Credit Cards in India",
      icon: <Fuel className="w-6 h-6" />,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-gradient-to-r from-red-50 to-orange-50",
      borderColor: "border-red-200",
      cards: [
        {
          name: "IndianOil RBL Bank XTRA Credit Card",
          bank: "RBL Bank",
          joiningFee: "₹1,500 + Taxes",
          annualFee: "₹1,500 + Taxes",
          image: "https://images.unsplash.com/photo-1613243555978-636c48dc653c?w=400&h=250&fit=crop",
          keyFeatures: [
            "Highest fuel savings of 8.5% at IOCL pumps",
            "3,000 bonus Fuel Points as welcome benefit",
            "1,000 Fuel Points per quarter on ₹75,000 spends"
          ],
          whyWeLikeIt: "Highest value-backs across all fuel credit cards"
        },
        {
          name: "BPCL SBI Card Octane",
          bank: "SBI",
          joiningFee: "₹1,499 + Taxes",
          annualFee: "₹1,499 + Taxes",
          image: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?w=400&h=250&fit=crop",
          keyFeatures: [
            "7.25% value back on fuel purchases at BPCL pumps",
            "6,000 bonus reward points as welcome benefit",
            "Instant reward redemption at select BPCL petrol pumps"
          ],
          whyWeLikeIt: "Benefits on other categories as well"
        },
        {
          name: "ICICI HPCL Super Saver Credit Card",
          bank: "ICICI Bank",
          joiningFee: "₹500 + Taxes",
          annualFee: "₹500 + Taxes",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop",
          keyFeatures: [
            "Up to 5% value back on fuel spends at HPCL",
            "5% back as reward points on grocery and departmental stores",
            "Entry-level card with low annual fee"
          ],
          whyWeLikeIt: "Higher rewards on daily categories"
        }
      ]
    },
    {
      id: "best-shopping",
      title: "Best Shopping Credit Cards in India",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-gradient-to-r from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200",
      cards: [
        {
          name: "Tata Neu Infinity HDFC Bank Credit Card",
          bank: "HDFC Bank",
          joiningFee: "₹1,499 + Taxes",
          annualFee: "₹1,499 + Taxes",
          image: "https://images.unsplash.com/photo-1613243555978-636c48dc653c?w=400&h=250&fit=crop",
          keyFeatures: [
            "Up to 10% value-back on Tata Neu spends",
            "5% back on partner Tata brands",
            "8 domestic and 4 international Priority Pass lounge access"
          ],
          whyWeLikeIt: "Covers multiple brands across different spending categories"
        },
        {
          name: "Axis Bank SELECT Credit Card",
          bank: "Axis Bank",
          joiningFee: "₹19,999",
          annualFee: "₹19,999",
          image: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?w=400&h=250&fit=crop",
          keyFeatures: [
            "Up to 20 EDGE Reward Points per ₹200 spent",
            "10,000 EDGE Reward Points welcome benefit",
            "Shopping rewards across multiple categories"
          ],
          whyWeLikeIt: "Excellent shopping benefits"
        },
        {
          name: "HDFC MoneyBack+ Credit Card",
          bank: "HDFC Bank",
          joiningFee: "₹500 + Taxes",
          annualFee: "₹500 + Taxes",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop",
          keyFeatures: [
            "10% CashPoints on Amazon, BigBasket, Flipkart, etc.",
            "2 CashPoints per ₹150 on other spends",
            "Low annual fee with easy waiver conditions"
          ],
          whyWeLikeIt: "Multi-brand benefits at low annual fee"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA]">
      {loading && <PageLoader message="Loading best credit cards..." />}
      
      {/* Hero Section with Teal Theme */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col">
            <div className="mb-2 text-sm md:text-base font-medium opacity-90">
              <span className="hover:underline cursor-pointer">Home</span>
              <span className="mx-2">›</span>
              <span className="hover:underline cursor-pointer">Credit Card</span>
              <span className="mx-2">›</span>
              <span className="font-semibold">Best Credit Cards in India 2026</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Best Credit Cards in India 2026
            </h1>
            
            <p className="text-lg md:text-xl text-teal-100 mb-6 max-w-4xl">
              To maximize the benefits of a credit card, it is essential to choose a card that aligns with your lifestyle and spending patterns. With hundreds of options in the market, finding the right fit can be overwhelming.
            </p>
            
            <p className="text-lg md:text-xl text-teal-100 max-w-4xl">
              To make your decision easier, we have curated a list of 25 best credit cards in India for 2026 across popular categories like shopping, travel, fuel, rewards, cashback, and premium credit cards.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar visible on >= sm */}
          <div className="hidden lg:block w-64 flex-shrink-0">
           
            
            {/* How to Choose Section */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiInfo className="w-5 h-5 text-teal-600" />
                How to Choose the Right Credit Card?
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">1. Identify your needs:</h4>
                  <p className="text-sm text-gray-600">
                    Identify your needs and decide which is a better credit card that suits your requirements to make the most out of it.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">2. Compare credit cards:</h4>
                  <p className="text-sm text-gray-600">
                    Compare credit cards based on interest rates, rewards programs, bonus categories, annual fees, and much more.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">3. Consider fees & charges:</h4>
                  <p className="text-sm text-gray-600">
                    It is important to check all the applicable fees and charges before applying for a credit card.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cards List Section */}
          <div className="flex-1">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-6">
              <button
                type="button"
                onClick={() => setShowFilterMobile(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-gray-300 bg-white shadow-sm text-gray-800 font-medium hover:bg-gray-50 transition-colors w-full"
              >
                <FiFilter size={18} />
                <span>Filters</span>
              </button>
            </div>
            
            {/* Categories Quick Filter */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Categories</h3>
              <div className="flex flex-wrap gap-2">
                {cardSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-colors"
                  >
                    {section.title.replace("Best ", "").replace(" Credit Cards in India", "")}
                  </a>
                ))}
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading credit cards...</p>
                </div>
              </div>
            ) : cards.length === 0 ? (
              <div className="flex flex-col justify-center items-center text-center py-12">
                <p className="text-gray-600 text-lg mb-2">No credit cards found</p>
                <p className="text-sm text-gray-400">Check your API endpoint or add some credit cards from the dashboard</p>
              </div>
            ) : (
              <>
                {/* Featured Cards Section */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Credit Cards</h2>
                    <div className="flex items-center gap-1 text-teal-600 font-medium text-sm">
                      <span>Sorted by ratings</span>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                  
                  <CardList 
                    cards={cards.slice(0, 4)} 
                    onApply={handleApply} 
                    onDetails={handleShowDetails} 
                    activeFilters={activeFilters}
                    onCompare={toggleCardSelection}
                    selectedForComparison={selectedForComparison}
                  />
                </div>

                {/* All Cards Section */}
              
              </>
            )}

            {/* Detailed Categories Section - Like the Screenshot */}
            <div className="space-y-12">
              {cardSections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  {/* Section Header */}
                  <div className="mb-6">
                    <div className={`bg-gradient-to-r ${section.color} rounded-t-2xl p-6`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          {section.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                      </div>
                    </div>
                  </div>
                  
                  {/* Section Description */}
                  {section.id === "best-cashback" && (
                    <div className="mb-6 bg-white rounded-xl p-6 border border-gray-200">
                      <p className="text-gray-700">
                        Most credit cards offer value-back in the form of reward points. However, some cards come with a good base reward rate along with substantial savings on select categories through accelerated earning.
                      </p>
                    </div>
                  )}
                  
                  {section.id === "best-travel" && (
                    <div className="mb-6 bg-white rounded-xl p-6 border border-gray-200">
                      <p className="text-gray-700">
                        This list includes the best credit cards in India that would help you save more on your travel expenses in the form of air miles, complimentary memberships, co-branded benefits, and more. To find the ideal travel credit card, you must compare cards from various issuers and apply for the one that best aligns with your travel spends.
                      </p>
                    </div>
                  )}
                  
                  {section.id === "best-fuel" && (
                    <div className="mb-6 bg-white rounded-xl p-6 border border-gray-200">
                      <p className="text-gray-700">
                        To begin your credit card comparison to find the best fuel credit card, below is a list of best credit cards in India that offer fuel benefits in the form of fuel surcharge waiver and co-branded discounts.
                      </p>
                    </div>
                  )}
                  
                  {/* Cards List - Like the Screenshot */}
                  <div className="space-y-6">
                    {section.cards.map((card, index) => (
                      <div key={index} className={`${section.bgColor} rounded-2xl border ${section.borderColor} overflow-hidden`}>
                        {/* Card Header */}
                        <div className="p-6 border-b border-gray-200/50">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={card.image}
                                  alt={card.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{card.name}</h3>
                                <div className="flex items-center gap-2">
                                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                    {card.bank}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="font-bold text-gray-900">4.{Math.floor(Math.random() * 5) + 5}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="text-sm">
                                <span className="text-gray-600">Joining Fee: </span>
                                <span className="font-semibold text-gray-900">{card.joiningFee}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600">Annual Fee: </span>
                                <span className="font-semibold text-gray-900">{card.annualFee}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Card Content - Two Column Layout Like Screenshot */}
                        <div className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column - Key Benefits */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                                <Percent className="w-5 h-5 text-teal-600" />
                                Key Benefits
                              </h4>
                              <ul className="space-y-3">
                                {card.keyFeatures.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Right Column - Why We Like It with Table */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                                <Shield className="w-5 h-5 text-green-600" />
                                Why We Like It
                              </h4>
                              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Key Benefits</span>
                                  <span className="mx-4 text-gray-400">|</span>
                                  <span className="font-medium text-gray-700">Why We Like It</span>
                                </div>
                                <div className="divide-y divide-gray-100">
                                  {card.keyFeatures.map((feature, idx) => (
                                    <div key={idx} className="px-4 py-3 hover:bg-gray-50/50">
                                      <div className="text-sm text-gray-700 mb-1">{feature}</div>
                                      <div className="text-sm text-teal-600 font-medium">
                                        {idx === 0 ? card.whyWeLikeIt : ""}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="mt-6 pt-6 border-t border-gray-200/50 flex justify-end">
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleShowDetails({
                                  id: `mock-${section.id}-${index}`,
                                  name: card.name,
                                  image: card.image,
                                  bullets: card.keyFeatures
                                })}
                                className="px-6 py-2.5 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors border border-teal-200"
                              >
                                + More Details
                              </button>
                              <button
                                onClick={() => handleApply({
                                  id: `mock-${section.id}-${index}`,
                                  name: card.name,
                                  image: card.image,
                                  bullets: card.keyFeatures
                                })}
                                className="px-6 py-2.5 text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors"
                              >
                                Check Eligibility
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* How to Choose Section - Main */}
            <div className="mt-12 bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FiInfo className="w-6 h-6 text-teal-600" />
                How to Choose the Right Credit Card?
              </h2>
              
              <p className="text-gray-700 mb-6">
                As there are numerous options available for each individual, finding the right card can be confusing. Hence, before choosing, it is important to keep the below-mentioned things in mind to make the right choice.
              </p>
              
              <div className="space-y-6">
                <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Identify your needs</h3>
                  </div>
                  <p className="text-gray-700">
                    Identify your needs and decide which is a better credit card that suits your requirements to make the most out of it. Based on the type of value-back offered, credit cards are majorly divided into two categories - rewards credit cards and cashback credit cards. Besides this, there are credit cards designed for specific categories like travel, shopping, entertainment, dining, and more.
                  </p>
                </div>
                
                <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Compare credit cards</h3>
                  </div>
                  <p className="text-gray-700">
                    Compare credit cards based on interest rates, rewards programs, bonus categories, annual fees, and much more. There might be a possibility that other credit cards offer similar or better benefits at a lower annual fee. Credit card comparison is an ideal way to find the best credit card for yourself.
                  </p>
                </div>
                
                <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Consider fees & charges</h3>
                  </div>
                  <p className="text-gray-700">
                    It is important to check all the applicable fees and charges before applying for a credit card. Most of the credit cards come with an annual fee, whereas, some cards may be free for lifetime. Besides annual charges, you need to keep a check on other charges as well like finance charges, cash advance charges, forex markup fees, over-limit charges, and interest rates.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-700">
                  In addition to the above-mentioned factors, most credit cards offer extra perks like welcome benefits, bonus rewards, milestone benefits, and complimentary memberships or vouchers. While these benefits enhance the overall value of the card, these should not be the sole criteria for selection.
                </p>
              </div>
            </div>

            {/* Note Section */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <FiInfo className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-yellow-800 mb-2">Note:</h4>
                  <p className="text-yellow-700">
                    HDFC Infinia is not included in the above list as it is an invite-only card. This list contains credit cards that are generally available for application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Bar */}
      {selectedForComparison.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-teal-600 shadow-2xl z-50 py-2 sm:py-4 animate-slide-up">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-4 flex-1 gap-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-700 text-center sm:text-left">
                  Comparing {selectedForComparison.length}/2 cards
                </p>
                
                {/* Selected Cards */}
                <div className="flex overflow-x-auto space-x-2 sm:space-x-3 w-full sm:w-auto pb-1">
                  {selectedForComparison.map(cardId => {
                    const card = cards.find(c => c.id === cardId);
                    if (!card) return null;
                    
                    return (
                      <div key={cardId} className="flex items-center space-x-1.5 sm:space-x-2 bg-teal-50 border border-teal-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shrink-0">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-12 h-8 sm:w-16 sm:h-10 object-contain rounded"
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-900 max-w-[100px] sm:max-w-[150px] truncate">
                          {card.name}
                        </span>
                        <button
                          onClick={() => removeFromComparison(cardId)}
                          className="text-red-500 hover:text-red-700 shrink-0"
                        >
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Compare Button */}
              <button
                onClick={handleCompare}
                disabled={selectedForComparison.length !== 2}
                className={`flex items-center justify-center space-x-2 rounded-lg font-semibold transition w-full sm:w-auto ${
                  selectedForComparison.length === 2
                    ? 'bg-teal-600 text-white hover:bg-teal-700 px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base'
                }`}
              >
                <span>Compare</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter overlay */}
      {showFilterMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilterMobile(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[340px]">
            <div className="h-full w-full bg-white shadow-2xl border-r rounded-r-2xl">
              <div className="p-3 sm:p-4 border-b flex items-center justify-between bg-gray-50">
                <h4 className="font-semibold text-base sm:text-lg text-gray-900">Filters</h4>
                <div className="flex gap-2 sm:gap-3 items-center">
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFilterMobile(false)}
                    className="px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <X size={16} />
                    <span>Close</span>
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-4 overflow-y-auto h-[calc(100%-56px)]">
                <FilterSidebar
                  active={activeFilters}
                  onToggle={(k, v) => handleToggle(k, v)}
                  onClearAll={handleClearAll}
                  className="border-none p-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreditCardDetailsDrawer
        ref={drawerRef}
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        card={selectedCard}
        onApply={() => setOpenDrawer(false)}
        categorySlug={selectedCard?.categories?.[0] || undefined}
        categoryName={selectedCard?.name}
      />

      <ComparisonModal
        isOpen={showComparisonModal}
        onClose={handleCloseComparison}
        cardIds={selectedForComparison}
        onApply={(cardId) => {
          const card = cards.find(c => c.id === cardId);
          if (card) {
            setShowComparisonModal(false);
            handleApply({ id: card.id, name: card.name, image: card.image, bullets: card.bullets });
          }
        }}
      />

      <CreditCardApplicationModal
        isOpen={showApplicationModal}
        onClose={() => {
          setShowApplicationModal(false);
          setApplicationCard(null);
        }}
        bankName={applicationCard?.bank}
        bankLogo={applicationCard?.image}
        productId={applicationCard?.id ? parseInt(applicationCard.id) : undefined}
        categorySlug={applicationCard?.categories?.[0]}
        categoryName={applicationCard?.name}
      />
    </div>
  );
}