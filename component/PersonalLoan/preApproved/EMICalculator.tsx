"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Pencil, 
  MousePointer2,
  Percent
} from "lucide-react";

// --- Types ---

// 1. Types for the Calculator Logic
interface CalculatorConfig {
  title?: string;
  currencySymbol?: string;
  defaultAmount?: number;
  minAmount?: number;
  maxAmount?: number;
  defaultMonths?: number;
  minMonths?: number;
  maxMonths?: number;
  defaultApr?: number;
  minApr?: number;
  maxApr?: number;
}

// 2. Types for the Left Side Content
interface Feature {
  icon: React.ReactNode; 
  title: string;
  desc: string;
}

interface MarketingContent {
  tagline: string;
  headline: React.ReactNode; 
  description: string;
  features: Feature[];
 
}

// 3. Main Component Props
interface EMICalculatorProps extends CalculatorConfig {
  marketingContent: MarketingContent;
}

interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  colorClass?: string;
  thumbColorClass?: string;
}

// --- Reusable Slider Component ---

const Slider: React.FC<SliderProps> = ({
  value,
  min,
  max,
  onChange,
  colorClass,
  thumbColorClass,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full h-6 flex items-center select-none touch-none">
      <div className="absolute w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass}`} style={{ width: `${percentage}%` }} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
      />
      <div
        className={`absolute h-6 w-6 rounded-full border-2 border-white shadow-md flex items-center justify-center pointer-events-none z-10 transition-all duration-75 ${thumbColorClass}`}
        style={{ left: `calc(${percentage}% - 12px)` }}
      >
        <MousePointer2 size={14} className="text-white fill-white transform rotate-[-15deg]" />
      </div>
    </div>
  );
};

// --- Calculator Card Component (Logic) ---

const CalculatorCard: React.FC<CalculatorConfig> = ({
  title = "EMI Calculator",
  currencySymbol = "₹",
  defaultAmount = 50000,
  minAmount = 5000,
  maxAmount = 500000,
  defaultMonths = 12,
  minMonths = 6,
  maxMonths = 60,
  defaultApr = 14,
  minApr = 8,
  maxApr = 36,
}) => {
  const router = useRouter();
  const [amount, setAmount] = useState(defaultAmount);
  const [months, setMonths] = useState(defaultMonths);
  const [apr, setApr] = useState(defaultApr);

  // Edit Mode States
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [isEditingMonths, setIsEditingMonths] = useState(false);
  const [isEditingApr, setIsEditingApr] = useState(false);

  // Temporary Inputs
  const [tempAmount, setTempAmount] = useState(defaultAmount);
  const [tempMonths, setTempMonths] = useState(defaultMonths);
  const [tempApr, setTempApr] = useState(defaultApr);

  const amountInputRef = useRef<HTMLInputElement>(null);
  const monthsInputRef = useRef<HTMLInputElement>(null);
  const aprInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (isEditingAmount) amountInputRef.current?.focus(); }, [isEditingAmount]);
  useEffect(() => { if (isEditingMonths) monthsInputRef.current?.focus(); }, [isEditingMonths]);
  useEffect(() => { if (isEditingApr) aprInputRef.current?.focus(); }, [isEditingApr]);

  const calculateRepayment = (p: number, n: number, rate: number) => {
    const r = rate / 100 / 12;
    if (p <= 0 || n <= 0 || r <= 0) return { monthlyEmi: 0, totalAmount: 0, totalInterest: 0 };
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;
    return { monthlyEmi: Math.round(emi), totalAmount: Math.round(totalAmount), totalInterest: Math.round(totalInterest) };
  };

  const { monthlyEmi, totalAmount, totalInterest } = calculateRepayment(amount, months, apr);

  const validateAndSet = (val: number, min: number, max: number, setter: (v: number) => void, editorSetter: (v: boolean) => void) => {
    let newVal = Number(val);
    if (isNaN(newVal)) newVal = min;
    if (newVal < min) newVal = min;
    if (newVal > max) newVal = max;
    setter(newVal);
    editorSetter(false);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-teal-100/50 w-full transition-all">
      {/* Title with Serif Font */}
      <h2 className="text-2xl font-bold font-serif text-teal-700 mb-6 text-center">{title}</h2>

      {/* Amount Input */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <label className="text-gray-800 font-bold text-base">Loan Amount</label>
          <div className={`flex items-center space-x-1 border border-teal-500 rounded-full px-4 py-1.5 bg-white cursor-pointer hover:bg-teal-50 transition-colors w-36 justify-between ${isEditingAmount ? 'ring-2 ring-teal-200' : ''}`} onClick={() => { setTempAmount(amount); setIsEditingAmount(true); }}>
            {isEditingAmount ? (
              <div className="flex items-center w-full">
                <span className="text-teal-900 font-bold mr-1">{currencySymbol}</span>
                <input ref={amountInputRef} type="number" value={tempAmount} onChange={(e) => setTempAmount(Number(e.target.value))} onBlur={() => validateAndSet(tempAmount, minAmount, maxAmount, setAmount, setIsEditingAmount)} onKeyDown={(e) => e.key === 'Enter' && validateAndSet(tempAmount, minAmount, maxAmount, setAmount, setIsEditingAmount)} className="w-full text-teal-900 font-bold outline-none bg-transparent p-0 m-0" />
              </div>
            ) : (
              <><span className="text-teal-900 font-bold truncate">{currencySymbol} {amount.toLocaleString()}</span><Pencil size={14} className="text-gray-400 shrink-0" /></>
            )}
          </div>
        </div>
        <Slider value={amount} min={minAmount} max={maxAmount} onChange={setAmount} colorClass="bg-teal-500" thumbColorClass="bg-teal-500" />
        <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium"><span>{currencySymbol}{minAmount.toLocaleString()}</span><span>{currencySymbol}{maxAmount.toLocaleString()}</span></div>
      </div>

      {/* Months Input */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <label className="text-gray-800 font-bold text-base">Tenure (Months)</label>
          <div className={`flex items-center space-x-2 border border-teal-500 rounded-full px-4 py-1.5 bg-white cursor-pointer hover:bg-teal-50 transition-colors w-28 justify-between ${isEditingMonths ? 'ring-2 ring-teal-200' : ''}`} onClick={() => { setTempMonths(months); setIsEditingMonths(true); }}>
            {isEditingMonths ? (
              <input ref={monthsInputRef} type="number" value={tempMonths} onChange={(e) => setTempMonths(Number(e.target.value))} onBlur={() => validateAndSet(tempMonths, minMonths, maxMonths, setMonths, setIsEditingMonths)} onKeyDown={(e) => e.key === 'Enter' && validateAndSet(tempMonths, minMonths, maxMonths, setMonths, setIsEditingMonths)} className="w-full text-gray-900 font-bold outline-none bg-transparent text-center p-0 m-0" />
            ) : (
              <><span className="text-gray-900 font-bold">{months} mo</span><Pencil size={14} className="text-gray-400 shrink-0" /></>
            )}
          </div>
        </div>
        <Slider value={months} min={minMonths} max={maxMonths} onChange={setMonths} colorClass="bg-teal-500" thumbColorClass="bg-teal-500" />
        <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium"><span>{minMonths} mo</span><span>{maxMonths} mo</span></div>
      </div>

      {/* APR Input */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <label className="text-gray-800 font-bold text-base">Interest Rate (p.a)</label>
          <div className={`flex items-center space-x-2 border border-teal-500 rounded-full px-4 py-1.5 bg-white cursor-pointer hover:bg-teal-50 transition-colors w-28 justify-between ${isEditingApr ? 'ring-2 ring-teal-200' : ''}`} onClick={() => { setTempApr(apr); setIsEditingApr(true); }}>
            {isEditingApr ? (
              <div className="flex items-center w-full justify-center">
                <input ref={aprInputRef} type="number" value={tempApr} step="0.1" onChange={(e) => setTempApr(Number(e.target.value))} onBlur={() => validateAndSet(tempApr, minApr, maxApr, setApr, setIsEditingApr)} onKeyDown={(e) => e.key === 'Enter' && validateAndSet(tempApr, minApr, maxApr, setApr, setIsEditingApr)} className="w-full text-gray-900 font-bold outline-none bg-transparent text-right p-0 m-0" />
                <span className="text-gray-900 font-bold ml-0.5">%</span>
              </div>
            ) : (
              <><span className="text-gray-900 font-bold">{apr}%</span><Pencil size={14} className="text-gray-400 shrink-0" /></>
            )}
          </div>
        </div>
        <Slider value={apr} min={minApr} max={maxApr} onChange={setApr} colorClass="bg-teal-500" thumbColorClass="bg-teal-500" />
        <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium"><span>{minApr}%</span><span>{maxApr}%</span></div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-teal-50/80 p-3 rounded-lg border border-teal-100 flex flex-col justify-center"><p className="text-gray-500 font-medium mb-1 text-xs">Monthly EMI</p><p className="text-lg font-bold text-orange-600">{currencySymbol} {monthlyEmi.toLocaleString()}</p></div>
        <div className="bg-teal-50/80 p-3 rounded-lg border border-teal-100 flex flex-col justify-center"><p className="text-gray-500 font-medium mb-1 text-xs">Principal</p><p className="text-lg font-bold text-teal-700">{currencySymbol} {amount.toLocaleString()}</p></div>
        <div className="bg-teal-50/80 p-3 rounded-lg border border-teal-100 flex flex-col justify-center"><p className="text-gray-500 font-medium mb-1 text-xs">Interest</p><p className="text-lg font-bold text-teal-700">{currencySymbol} {totalInterest.toLocaleString()}</p></div>
        <div className="bg-teal-50/80 p-3 rounded-lg border border-teal-100 flex flex-col justify-center"><p className="text-gray-500 font-medium mb-1 text-xs">Total Payable</p><p className="text-lg font-bold text-teal-700">{currencySymbol} {totalAmount.toLocaleString()}</p></div>
      </div>

      <button onClick={() => console.log("Applying...")} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-teal-200 active:scale-[0.98] transform">Apply Now</button>
    </div>
  );
};

// --- Left Content Helper Component ---

const FeatureItem = ({ icon, title, desc }: Feature) => (
  <div className="flex gap-4">
    <div className="mt-1 bg-teal-100 p-2 rounded-lg h-fit text-teal-600">
      {icon} 
    </div>
    <div>
      {/* Feature Title with Serif Font */}
      <h4 className="text-gray-900 font-bold font-serif text-lg">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

// --- Main Page Component (Exported) ---

const EMICalculator: React.FC<EMICalculatorProps> = ({
  marketingContent,
  ...calculatorConfig
}) => {
  return (
    <section className="bg-linear-to-br from-slate-50 to-teal-50/30 min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* --- LEFT SIDE: Dynamic Content --- */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {marketingContent.tagline}
              </span>
              
              {/* Main Headline with Serif Font */}
              <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-gray-900 leading-tight">
                {marketingContent.headline}
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                {marketingContent.description}
              </p>
            </div>

            <div className="space-y-6">
              {marketingContent.features.map((feature, index) => (
                <FeatureItem 
                  key={index}
                  icon={feature.icon} 
                  title={feature.title} 
                  desc={feature.desc}
                />
              ))}
            </div>
            
            
          </div>

          {/* --- RIGHT SIDE: Calculator --- */}
          <div className="w-full max-w-md lg:max-w-lg shrink-0">
             <CalculatorCard {...calculatorConfig} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default EMICalculator;