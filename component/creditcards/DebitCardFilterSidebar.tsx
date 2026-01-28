"use client";
import React, { useState } from "react";

interface DebitCardFilters {
  bank: string;
  annualFee: string;
  cardType: string;
  bestFor: string;
  internationalUsage: boolean;
  loungeAccess: boolean;
  contactless: boolean;
}

interface DebitCardFilterSidebarProps {
  active: DebitCardFilters;
  onChange: (filters: DebitCardFilters) => void;
  onClearAll: () => void;
  className?: string;
  banks: string[];
  cardTypes: string[];
}

export default function DebitCardFilterSidebar({
  active,
  onChange,
  onClearAll,
  className,
  banks,
  cardTypes,
}: DebitCardFilterSidebarProps) {
  const [showMoreBanks, setShowMoreBanks] = useState(false);

  const updateFilter = (key: string, value: any) => {
    onChange({ ...active, [key]: value });
  };

  return (
    <aside className={`w-full md:w-64 shrink-0 rounded-xl border border-gray-200 bg-white p-4 ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filter & Sort by</h3>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-gray-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Banks Filter */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Banks</p>
        <div className="space-y-2">
          {banks
            .slice(0, showMoreBanks ? undefined : 6)
            .map((bank) => (
              <label
                key={bank}
                className={`flex items-center gap-2 text-sm cursor-pointer ${
                  active.bank === bank ? "text-green-600" : "text-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="bank"
                  value={bank}
                  checked={active.bank === bank}
                  onChange={(e) => updateFilter('bank', e.target.value)}
                  className="accent-green-600"
                />
                {bank}
              </label>
            ))}
          {banks.length > 6 && (
            <button
              onClick={() => setShowMoreBanks((v) => !v)}
              className="mt-2 text-xs text-blue-600 hover:underline"
            >
              {showMoreBanks ? "Show Less" : "+ More"}
            </button>
          )}
        </div>
      </div>

      {/* Annual Fee Filter */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Annual Fee</p>
        <div className="space-y-2">
          {[
            { value: 'free', label: 'Free/Low (₹0-₹499)' },
            { value: 'low', label: 'Low (₹500-₹1000)' },
            { value: 'premium', label: 'Premium (₹1000+)' }
          ].map((fee) => (
            <label
              key={fee.value}
              className={`flex items-center gap-2 text-sm cursor-pointer ${
                active.annualFee === fee.value ? "text-green-600" : "text-gray-800"
              }`}
            >
              <input
                type="radio"
                name="annualFee"
                value={fee.value}
                checked={active.annualFee === fee.value}
                onChange={(e) => updateFilter('annualFee', e.target.value)}
                className="accent-green-600"
              />
              {fee.label}
            </label>
          ))}
        </div>
      </div>

      {/* Card Type Filter */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Card Type</p>
        <div className="space-y-2">
          {cardTypes.map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 text-sm cursor-pointer ${
                active.cardType === type ? "text-green-600" : "text-gray-800"
              }`}
            >
              <input
                type="radio"
                name="cardType"
                value={type}
                checked={active.cardType === type}
                onChange={(e) => updateFilter('cardType', e.target.value)}
                className="accent-green-600"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Best For Filter */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Best For</p>
        <div className="space-y-2">
          {[
            { value: 'shopping', label: 'Shopping' },
            { value: 'travel', label: 'Travel' },
            { value: 'dining', label: 'Dining' },
            { value: 'online', label: 'Online' },
            { value: 'premium', label: 'Premium' }
          ].map((use) => (
            <label
              key={use.value}
              className={`flex items-center gap-2 text-sm cursor-pointer ${
                active.bestFor === use.value ? "text-green-600" : "text-gray-800"
              }`}
            >
              <input
                type="radio"
                name="bestFor"
                value={use.value}
                checked={active.bestFor === use.value}
                onChange={(e) => updateFilter('bestFor', e.target.value)}
                className="accent-green-600"
              />
              {use.label}
            </label>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Features</p>
        <div className="space-y-2">
          <label className={`flex items-center gap-2 text-sm cursor-pointer ${
            active.internationalUsage ? "text-green-600" : "text-gray-800"
          }`}>
            <input
              type="checkbox"
              checked={active.internationalUsage}
              onChange={(e) => updateFilter('internationalUsage', e.target.checked)}
              className="accent-green-600"
            />
            International Usage
          </label>
          <label className={`flex items-center gap-2 text-sm cursor-pointer ${
            active.loungeAccess ? "text-green-600" : "text-gray-800"
          }`}>
            <input
              type="checkbox"
              checked={active.loungeAccess}
              onChange={(e) => updateFilter('loungeAccess', e.target.checked)}
              className="accent-green-600"
            />
            Lounge Access
          </label>
          <label className={`flex items-center gap-2 text-sm cursor-pointer ${
            active.contactless ? "text-green-600" : "text-gray-800"
          }`}>
            <input
              type="checkbox"
              checked={active.contactless}
              onChange={(e) => updateFilter('contactless', e.target.checked)}
              className="accent-green-600"
            />
            Contactless
          </label>
        </div>
      </div>
    </aside>
  );
}