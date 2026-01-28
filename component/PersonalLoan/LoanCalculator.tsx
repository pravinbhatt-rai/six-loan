"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { Pencil, MousePointer2 } from "lucide-react";

// --- Reusable Slider ---

type SliderProps = {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  colorClass?: string;
  thumbColorClass?: string;
};

const Slider: React.FC<SliderProps> = memo(({
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
      {/* Track Background */}
      <div className="absolute w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        {/* Active Track */}
        <div
          className={`h-full ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Native Range Input (Hidden opacity but functional) */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
      />

      {/* Custom Thumb (Visual Only) */}
      <div
        className={`absolute h-6 w-6 rounded-full border-2 border-white shadow-md flex items-center justify-center pointer-events-none z-10 transition-all duration-75 ${thumbColorClass}`}
        style={{ left: `calc(${percentage}% - 12px)` }}
      >
        <MousePointer2 size={14} className="text-white fill-white transform rotate-[-15deg]" />
      </div>
    </div>
  );
});

// --- Shared LoanCalculator ---

const LoanCalculator = memo(() => {
  const router = useRouter();
  const [amount, setAmount] = useState(4000);
  const [months, setMonths] = useState(12);
  const [apr, setApr] = useState(25.8);

  // Edit States
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [isEditingMonths, setIsEditingMonths] = useState(false);
  const [isEditingApr, setIsEditingApr] = useState(false);

  // Temporary input values for smooth typing
  const [tempAmount, setTempAmount] = useState(4000);
  const [tempMonths, setTempMonths] = useState(12);
  const [tempApr, setTempApr] = useState(25.8);

  const amountInputRef = useRef<HTMLInputElement>(null);
  const monthsInputRef = useRef<HTMLInputElement>(null);
  const aprInputRef = useRef<HTMLInputElement>(null);

  // Constants
  const minAmount = 1000;
  const maxAmount = 3000000;
  const minMonths = 12;
  const maxMonths = 36;
  const minApr = 9;
  const maxApr = 60;

  // Focus inputs when edit mode starts
  useEffect(() => {
    if (isEditingAmount && amountInputRef.current) amountInputRef.current.focus();
  }, [isEditingAmount]);

  useEffect(() => {
    if (isEditingMonths && monthsInputRef.current) monthsInputRef.current.focus();
  }, [isEditingMonths]);

  useEffect(() => {
    if (isEditingApr && aprInputRef.current) aprInputRef.current.focus();
  }, [isEditingApr]);
  // Memoized repayment calculation
  const calculateRepayment = useCallback((p: number, n: number, rate: number) => {
    const r = rate / 100 / 12;
    if (p <= 0 || n <= 0 || r <= 0) {
      return { monthlyEmi: 0, totalAmount: 0, totalInterest: 0 };
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    return {
      monthlyEmi: Number(emi.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
    };
  }, []);

  const { monthlyEmi, totalAmount, totalInterest } = useMemo(
    () => calculateRepayment(amount, months, apr),
    [amount, months, apr, calculateRepayment]
  );

  // Handlers for Amount Edit
  const handleAmountBlur = useCallback(() => {
    let newVal = Number(tempAmount);
    if (isNaN(newVal)) newVal = minAmount;
    if (newVal < minAmount) newVal = minAmount;
    if (newVal > maxAmount) newVal = maxAmount;

    setAmount(newVal);
    setIsEditingAmount(false);
  }, [tempAmount]);

  const handleAmountKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAmountBlur();
  }, [handleAmountBlur]);

  // Handlers for Months Edit
  const handleMonthsBlur = useCallback(() => {
    let newVal = Number(tempMonths);
    if (isNaN(newVal)) newVal = minMonths;
    if (newVal < minMonths) newVal = minMonths;
    if (newVal > maxMonths) newVal = maxMonths;

    setMonths(newVal);
    setIsEditingMonths(false);
  }, [tempMonths]);

  const handleMonthsKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleMonthsBlur();
  }, [handleMonthsBlur]);

  // Handlers for APR Edit
  const handleAprBlur = useCallback(() => {
    let newVal = Number(tempApr);
    if (isNaN(newVal)) newVal = minApr;
    if (newVal < minApr) newVal = minApr;
    if (newVal > maxApr) newVal = maxApr;

    setApr(newVal);
    setIsEditingApr(false);
  }, [tempApr]);

  const handleAprKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAprBlur();
  }, [handleAprBlur]);

  return (
    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-auto transition-all">
      {/* Amount Input */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <label className="text-gray-900 font-bold text-lg">Borrowing Amount</label>

          <div
            className={`flex items-center space-x-1 border border-teal-500 rounded-full px-4 py-1.5 bg-white cursor-pointer hover:bg-teal-50 transition-colors w-32 justify-between ${isEditingAmount ? 'ring-2 ring-teal-200' : ''}`}
            onClick={() => {
              setTempAmount(amount);
              setIsEditingAmount(true);
            }}
          >
            {isEditingAmount ? (
              <div className="flex items-center w-full">
                <span className="text-blue-900 font-bold mr-1"></span>
                <input
                  ref={amountInputRef}
                  type="number"
                  value={tempAmount}
                  onChange={(e) => setTempAmount(Number(e.target.value))}
                  onBlur={handleAmountBlur}
                  onKeyDown={handleAmountKeyDown}
                  className="w-full text-blue-900 font-bold outline-none bg-transparent p-0 m-0"
                />
              </div>
            ) : (
              <>
                <span className="text-blue-900 font-bold truncate">{amount.toLocaleString()}</span>
                <Pencil size={14} className="text-gray-400 shrink-0" />
              </>
            )}
          </div>
        </div>

        <Slider
          value={amount}
          min={minAmount}
          max={maxAmount}
          onChange={setAmount}
          colorClass="bg-teal-500"
          thumbColorClass="bg-teal-500"
        />
        <div className="flex justify-between mt-2 text-sm text-slate-500 font-medium">
          <span>{minAmount}</span>
          <span>{maxAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Months Input */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <label className="text-gray-900 font-bold text-lg">Months to repay</label>

          <div
            className={`flex items-center space-x-2 border border-teal-500 rounded-full px-6 py-1.5 bg-white cursor-pointer hover:bg-teal-50 transition-colors w-24 justify-between ${isEditingMonths ? 'ring-2 ring-teal-200' : ''}`}
            onClick={() => {
              setTempMonths(months);
              setIsEditingMonths(true);
            }}
          >
            {isEditingMonths ? (
              <input
                ref={monthsInputRef}
                type="number"
                value={tempMonths}
                onChange={(e) => setTempMonths(Number(e.target.value))}
                onBlur={handleMonthsBlur}
                onKeyDown={handleMonthsKeyDown}
                className="w-full text-gray-900 font-bold outline-none bg-transparent text-center p-0 m-0"
              />
            ) : (
              <>
                <span className="text-gray-900 font-bold">{months}</span>
                <Pencil size={14} className="text-gray-400 shrink-0" />
              </>
            )}
          </div>
        </div>

        <Slider
          value={months}
          min={minMonths}
          max={maxMonths}
          onChange={setMonths}
          colorClass="bg-teal-500"
          thumbColorClass="bg-teal-500"
        />
        <div className="flex justify-between mt-2 text-sm text-slate-500 font-medium">
          <span>{minMonths}</span>
          <span>{maxMonths}</span>
        </div>
      </div>

      {/* APR Input */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <label className="text-gray-900 font-bold text-lg">Representative APR</label>

          <div
            className={`flex items-center space-x-2 border border-teal-500 rounded-full px-6 py-1.5 bg-white cursor-pointer hover:bg-teal-50 transition-colors w-28 justify-between ${isEditingApr ? 'ring-2 ring-teal-200' : ''}`}
            onClick={() => {
              setTempApr(apr);
              setIsEditingApr(true);
            }}
          >
            {isEditingApr ? (
              <div className="flex items-center w-full justify-center">
                <input
                  ref={aprInputRef}
                  type="number"
                  value={tempApr}
                  step="0.1"
                  onChange={(e) => setTempApr(Number(e.target.value))}
                  onBlur={handleAprBlur}
                  onKeyDown={handleAprKeyDown}
                  className="w-full text-gray-900 font-bold outline-none bg-transparent text-right p-0 m-0"
                />
                <span className="text-gray-900 font-bold ml-0.5">%</span>
              </div>
            ) : (
              <>
                <span className="text-gray-900 font-bold">{apr}%</span>
                <Pencil size={14} className="text-gray-400 shrink-0" />
              </>
            )}
          </div>
        </div>

        <Slider
          value={apr}
          min={minApr}
          max={maxApr}
          onChange={setApr}
          colorClass="bg-teal-500"
          thumbColorClass="bg-teal-500"
        />
        <div className="flex justify-between mt-2 text-sm text-slate-500 font-medium">
          <span>{minApr}%</span>
          <span>{maxApr}%</span>
        </div>
      </div>

      {/* Results Boxes */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-teal-50/80 p-3 rounded-lg border border-teal-100 flex flex-col justify-center">
          <p className="text-gray-600 font-medium mb-1 text-xs sm:text-sm">Monthly EMI</p>
          <p className="text-lg sm:text-xl font-bold text-orange-600">{monthlyEmi.toLocaleString()}</p>
        </div>

        <div className="bg-teal-50/80 p-3 rounded-lg border border-teal-100 flex flex-col justify-center">
          <p className="text-gray-600 font-medium mb-1 text-xs sm:text-sm">Principal Amount</p>
          <p className="text-lg sm:text-xl font-bold text-teal-700">{amount.toLocaleString()}</p>
        </div>

        <div className="bg-teal-50/80 p-3 rounded-lg border border-teal-100 flex flex-col justify-center">
          <p className="text-gray-600 font-medium mb-1 text-xs sm:text-sm">Total Interest</p>
          <p className="text-lg sm:text-xl font-bold text-teal-700">{totalInterest.toLocaleString()}</p>
        </div>

        <div className="bg-teal-50/80 p-3 rounded-lg border border-teal-100 flex flex-col justify-center">
          <p className="text-gray-600 font-medium mb-1 text-xs sm:text-sm">Total Amount</p>
          <p className="text-lg sm:text-xl font-bold text-teal-700">{totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
        Representative loan Example: 2,000 loan repayable over 36 months. 36 monthly payment of 77.60. Rate of interest 20.2%
      </p>

      {/* Action Button */}
      <button
        onClick={() => {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          if (!token) {
            // Save current page URL for redirect after login
            if (typeof window !== 'undefined') {
              localStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
            }
            router.push('/login');
          } else {
            // TODO: proceed to application flow
          }
        }}
        className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-3.5 rounded-lg transition-colors shadow-sm active:scale-[0.98] transform"
      >
        Apply Now
      </button>
    </div>
  );
});

LoanCalculator.displayName = 'LoanCalculator';

export default LoanCalculator;
