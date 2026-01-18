// components/credit-cards/reward-calculator/RewardCalculator.tsx
"use client";
import React, { useState } from "react";
import { 
  Calculator, 
  CreditCard, 
  ShoppingCart, 
  Plane, 
  Coffee, 
  Smartphone,
  Gift,
  Zap,
  ChevronDown,
  Sparkles,
  Award,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Bank {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface CardVariant {
  id: string;
  bankId: string;
  name: string;
  rewardRate: number;
  categories: string[];
}

interface TransactionCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  subCategories: string[];
}

interface RewardResult {
  spendAmount: number;
  rewardPoints: number;
  rewardValue: number;
  category: string;
  cardName: string;
  bankName: string;
}

export default function RewardCalculator() {
  // Sample banks data
  const banks: Bank[] = [
    { id: "amex", name: "American Express", logo: "🇺🇸", color: "from-blue-600 to-teal-500" },
    { id: "hdfc", name: "HDFC Bank", logo: "🏦", color: "from-blue-700 to-teal-400" },
    { id: "axis", name: "Axis Bank", logo: "🟦", color: "from-red-600 to-orange-400" },
    { id: "sbi", name: "SBI", logo: "🔵", color: "from-blue-800 to-blue-400" },
    { id: "icici", name: "ICICI Bank", logo: "🟨", color: "from-yellow-500 to-orange-300" },
    { id: "yes", name: "YES Bank", logo: "💳", color: "from-purple-600 to-pink-400" },
  ];

  // Sample card variants
  const cardVariants: CardVariant[] = [
    { id: "amex-membership", bankId: "amex", name: "American Express Membership Rewards® Credit Card", rewardRate: 1.5, categories: ["shopping", "travel", "dining", "online"] },
    { id: "amex-platinum", bankId: "amex", name: "American Express Platinum Travel Credit Card", rewardRate: 2.0, categories: ["travel", "dining", "hotels"] },
    { id: "hdfc-regalia", bankId: "hdfc", name: "HDFC Regalia Gold Credit Card", rewardRate: 1.2, categories: ["shopping", "travel", "dining"] },
    { id: "hdfc-millennia", bankId: "hdfc", name: "HDFC Millennia Credit Card", rewardRate: 1.0, categories: ["online", "shopping"] },
    { id: "axis-atlas", bankId: "axis", name: "Axis Atlas Credit Card", rewardRate: 2.5, categories: ["travel", "flights", "hotels"] },
    { id: "sbi-prime", bankId: "sbi", name: "SBI Prime Credit Card", rewardRate: 1.8, categories: ["dining", "shopping", "movies"] },
    { id: "icici-amazon", bankId: "icici", name: "ICICI Bank Amazon Pay Credit Card", rewardRate: 1.0, categories: ["online", "shopping"] },
    { id: "yes-paisa", bankId: "yes", name: "YES BANK Paisabazaar PaisaSave", rewardRate: 1.2, categories: ["travel", "dining"] },
  ];

  // Transaction categories
  const transactionCategories: TransactionCategory[] = [
    { 
      id: "shopping", 
      name: "Shopping", 
      icon: <ShoppingCart className="w-5 h-5" />,
      subCategories: ["Online", "Offline", "Luxury", "Electronics", "Fashion"]
    },
    { 
      id: "travel", 
      name: "Travel", 
      icon: <Plane className="w-5 h-5" />,
      subCategories: ["Flights", "Hotels", "Trains", "Car Rental", "Tour Packages"]
    },
    { 
      id: "dining", 
      name: "Dining", 
      icon: <Coffee className="w-5 h-5" />,
      subCategories: ["Fine Dining", "Casual Dining", "Food Delivery", "Cafes"]
    },
    { 
      id: "online", 
      name: "Online", 
      icon: <Smartphone className="w-5 h-5" />,
      subCategories: ["E-commerce", "Streaming", "Subscriptions", "Bills"]
    },
    { 
      id: "entertainment", 
      name: "Entertainment", 
      icon: <Gift className="w-5 h-5" />,
      subCategories: ["Movies", "Events", "Concerts", "Sports"]
    },
  ];

  // State
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardVariant | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [spendAmount, setSpendAmount] = useState<string>("10000");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<RewardResult | null>(null);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);

  // Filter cards based on selected bank
  const filteredCards = selectedBank 
    ? cardVariants.filter(card => card.bankId === selectedBank.id)
    : [];

  // Calculate rewards
  const calculateRewards = () => {
    if (!selectedCard || !selectedCategory || !spendAmount) return;

    setIsCalculating(true);
    
    const amount = parseFloat(spendAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid spend amount");
      setIsCalculating(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // Calculate reward points based on card's reward rate
      let basePoints = Math.floor(amount * selectedCard.rewardRate);
      
      // Bonus for specific categories
      let bonusMultiplier = 1;
      if (selectedCategory.id === "travel" && selectedCard.categories.includes("travel")) {
        bonusMultiplier = 1.5;
      } else if (selectedCategory.id === "dining" && selectedCard.categories.includes("dining")) {
        bonusMultiplier = 1.3;
      } else if (selectedCategory.id === "online" && selectedCard.categories.includes("online")) {
        bonusMultiplier = 1.2;
      }

      const rewardPoints = Math.floor(basePoints * bonusMultiplier);
      const rewardValue = rewardPoints * 0.25; // Assuming 1 point = ₹0.25

      setResult({
        spendAmount: amount,
        rewardPoints,
        rewardValue,
        category: selectedCategory.name,
        cardName: selectedCard.name,
        bankName: selectedBank?.name || ""
      });

      setIsCalculating(false);
    }, 800);
  };

  // Reset calculator
  const resetCalculator = () => {
    setSelectedBank(null);
    setSelectedCard(null);
    setSelectedCategory(null);
    setSelectedSubCategory("");
    setSpendAmount("10000");
    setResult(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Know the right card for your spends!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Maximize your credit card rewards by calculating how many points you&apos;ll earn on different spending categories.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <CreditCard className="w-6 h-6" />, text: "Choose your Bank or Issuer" },
            { icon: <Calculator className="w-6 h-6" />, text: "Select your Card Variant" },
            { icon: <ShoppingCart className="w-6 h-6" />, text: "Choose your Transaction Category" },
            { icon: <Award className="w-6 h-6" />, text: "Know your Rewards" },
          ].map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white mb-3">
                {step.icon}
              </div>
              <p className="text-sm font-medium text-gray-700">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="bg-gradient-to-br from-white to-teal-50/50 rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Credit Card Reward Calculator
              </h3>
            </div>

            <div className="space-y-6">
              {/* Bank Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose your Bank or Issuer
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowBankDropdown(!showBankDropdown)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg border ${selectedBank ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-white'} transition-all hover:border-teal-400`}
                  >
                    <div className="flex items-center gap-3">
                      {selectedBank ? (
                        <>
                          <span className="text-2xl">{selectedBank.logo}</span>
                          <span className="font-medium text-gray-900">{selectedBank.name}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">Select a bank...</span>
                      )}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showBankDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showBankDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
                      >
                        {banks.map((bank) => (
                          <button
                            key={bank.id}
                            onClick={() => {
                              setSelectedBank(bank);
                              setSelectedCard(null);
                              setShowBankDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-2xl">{bank.logo}</span>
                            <span className="font-medium text-gray-900">{bank.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Card Variant Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Credit Card Variant
                </label>
                <div className="relative">
                  <button
                    onClick={() => selectedBank && setShowCardDropdown(!showCardDropdown)}
                    disabled={!selectedBank}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg border ${selectedCard ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-white'} ${!selectedBank ? 'opacity-50 cursor-not-allowed' : 'hover:border-teal-400'} transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      {selectedCard ? (
                        <>
                          <CreditCard className="w-5 h-5 text-teal-600" />
                          <span className="font-medium text-gray-900 truncate">{selectedCard.name}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">
                          {selectedBank ? "Select a card variant..." : "Select a bank first"}
                        </span>
                      )}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showCardDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showCardDropdown && selectedBank && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
                      >
                        {filteredCards.map((card) => (
                          <button
                            key={card.id}
                            onClick={() => {
                              setSelectedCard(card);
                              setShowCardDropdown(false);
                            }}
                            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <CreditCard className="w-5 h-5 text-teal-600 mt-0.5" />
                            <div className="text-left">
                              <div className="font-medium text-gray-900">{card.name}</div>
                              <div className="text-sm text-teal-600 font-medium">
                                {card.rewardRate}x reward rate
                              </div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Transaction Category
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg border ${selectedCategory ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-white'} transition-all hover:border-teal-400`}
                  >
                    <div className="flex items-center gap-3">
                      {selectedCategory ? (
                        <>
                          <div className="text-teal-600">
                            {selectedCategory.icon}
                          </div>
                          <span className="font-medium text-gray-900">{selectedCategory.name}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">Select a category...</span>
                      )}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showCategoryDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
                      >
                        {transactionCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category);
                              setSelectedSubCategory("");
                              setShowCategoryDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="text-teal-600">
                              {category.icon}
                            </div>
                            <span className="font-medium text-gray-900">{category.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sub-category Selection */}
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Sub-Category
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowSubCategoryDropdown(!showSubCategoryDropdown)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg border ${selectedSubCategory ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-white'} transition-all hover:border-teal-400`}
                    >
                      <div className="flex items-center gap-3">
                        {selectedSubCategory ? (
                          <span className="font-medium text-gray-900">{selectedSubCategory}</span>
                        ) : (
                          <span className="text-gray-500">Select a sub-category...</span>
                        )}
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showSubCategoryDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showSubCategoryDropdown && selectedCategory && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
                        >
                          {selectedCategory.subCategories.map((subCat, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedSubCategory(subCat);
                                setShowSubCategoryDropdown(false);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-gray-900"
                            >
                              {subCat}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* Spend Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Spend Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={spendAmount}
                    onChange={(e) => setSpendAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {["5000", "10000", "20000", "50000"].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSpendAmount(amount)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${spendAmount === amount ? 'bg-teal-100 text-teal-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateRewards}
                disabled={!selectedBank || !selectedCard || !selectedCategory || isCalculating}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${!selectedBank || !selectedCard || !selectedCategory || isCalculating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {isCalculating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Calculating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Calculate Rewards
                  </div>
                )}
              </button>

              {/* Reset Button */}
              <button
                onClick={resetCalculator}
                className="w-full py-2.5 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
              >
                Reset Calculator
              </button>
            </div>
          </div>

          {/* Note Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-teal-800 font-medium">
                  Reward Calculator will soon support all credit cards!
                </p>
                <p className="text-xs text-teal-700 mt-1">
                  Currently calculating rewards for major banks. More cards and features coming soon!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Results Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 text-white overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -translate-y-32 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full translate-y-24 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-teal-500/20 rounded-lg">
                    <Award className="w-6 h-6 text-teal-300" />
                  </div>
                  <h3 className="text-2xl font-bold">Your Rewards</h3>
                </div>

                {result ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* Result Summary */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="text-center mb-4">
                        <div className="text-sm text-teal-200 mb-1">Spend Amount</div>
                        <div className="text-4xl font-bold">₹{result.spendAmount.toLocaleString()}</div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Category</span>
                          <span className="font-medium">{result.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Card</span>
                          <span className="font-medium truncate max-w-[150px]">{result.cardName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Bank</span>
                          <span className="font-medium">{result.bankName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reward Points */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-center shadow-lg"
                    >
                      <div className="text-sm text-teal-100 mb-1">Total Reward Points</div>
                      <div className="text-5xl font-bold mb-2">{result.rewardPoints.toLocaleString()}</div>
                      <div className="text-sm text-teal-100">points earned</div>
                    </motion.div>

                    {/* Reward Value */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 text-center shadow-lg"
                    >
                      <div className="text-sm text-teal-100 mb-1">Estimated Reward Value</div>
                      <div className="text-5xl font-bold mb-2">₹{result.rewardValue.toFixed(2)}</div>
                      <div className="text-sm text-teal-100">cash equivalent</div>
                    </motion.div>

                    {/* Insights */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h4 className="font-medium mb-2 text-teal-200 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Insights
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-400" />
                          You&apos;re earning {(result.rewardValue / result.spendAmount * 100).toFixed(1)}% back on this spend
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-400" />
                          Great card choice for {result.category.toLowerCase()} purchases
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                      <Award className="w-10 h-10 text-teal-300" />
                    </div>
                    <h4 className="text-xl font-medium mb-3">Calculate Your Rewards</h4>
                    <p className="text-gray-400 text-sm">
                      Select your bank, card, and spending category to see how many rewards points you&apos;ll earn.
                    </p>
                    
                    <div className="mt-8 space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                          <span>1</span>
                        </div>
                        <span className="text-gray-300">Choose your bank</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                          <span>2</span>
                        </div>
                        <span className="text-gray-300">Select card variant</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                          <span>3</span>
                        </div>
                        <span className="text-gray-300">Enter spend amount</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* CTA Button */}
                {result && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full mt-6 py-3.5 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Apply for This Card
                  </motion.button>
                )}
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                Tips to Maximize Rewards
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5"></div>
                  Use category-specific cards for bonus rewards
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5"></div>
                  Pay attention to rotating quarterly categories
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5"></div>
                  Combine multiple cards for different spend types
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5"></div>
                  Always pay your balance in full to avoid interest
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { value: "500+", label: "Credit Cards" },
          { value: "50+", label: "Banks" },
          { value: "25+", label: "Categories" },
          { value: "10M+", label: "Rewards Calculated" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-teal-600 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}