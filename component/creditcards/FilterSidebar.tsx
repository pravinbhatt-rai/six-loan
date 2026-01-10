"use client";
import React, { useState } from "react";

export default function FilterSidebar({
  active,
  onToggle,
  onClearAll,
  className,
}: {
  active: { [key: string]: boolean };
  onToggle: (key: string, value: boolean) => void;
  onClearAll?: () => void;
  className?: string;
}) {
  const [showMoreBanks, setShowMoreBanks] = useState(false);

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

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700">Trending</p>
        <label className={`mt-2 flex items-center gap-2 text-sm ${active.trending ? "text-green-600" : "text-gray-800"}`}>
          <input
            type="checkbox"
            checked={active.trending === true}
            onChange={(e) => onToggle("trending", e.target.checked)}
            className="accent-green-600"
          />
          Effective Free Card
        </label>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700">Categories</p>
        {["Cashback", "Online Shopping", "Travel", "Utilities"].map((label) => (
          <label
            key={label}
            className={`mt-2 flex items-center gap-2 text-sm ${active[label] ? "text-green-600" : "text-gray-800"}`}
          >
            <input
              type="checkbox"
              checked={active[label] === true}
              onChange={(e) => onToggle(label, e.target.checked)}
              className="accent-green-600"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700">Banks</p>
        {["HDFC Bank", "Axis Bank", "ICICI Bank", "SBI", "Kotak", "PNB"]
          .slice(0, showMoreBanks ? undefined : 2)
          .map((label) => (
            <label
              key={label}
              className={`mt-2 flex items-center gap-2 text-sm ${active[label] ? "text-green-600" : "text-gray-800"}`}
            >
              <input
                type="checkbox"
                checked={active[label] === true}
                onChange={(e) => onToggle(label, e.target.checked)}
                className="accent-green-600"
              />
              {label}
            </label>
          ))}
        <button
          onClick={() => setShowMoreBanks((v) => !v)}
          className="mt-2 text-xs text-blue-600 hover:underline"
        >
          {showMoreBanks ? "Show Less" : "+ More"}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700">Fees</p>
        {["Lifetime free", "1st year free only"].map((label) => (
          <label
            key={label}
            className={`mt-2 flex items-center gap-2 text-sm ${active[label] ? "text-green-600" : "text-gray-800"}`}
          >
            <input
              type="checkbox"
              checked={active[label] === true}
              onChange={(e) => onToggle(label, e.target.checked)}
              className="accent-green-600"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-700">Card type</p>
        {["UPI Rupay", "Visa/Mastercard"].map((label) => (
          <label
            key={label}
            className={`mt-2 flex items-center gap-2 text-sm ${active[label] ? "text-green-600" : "text-gray-800"}`}
          >
            <input
              type="checkbox"
              checked={active[label] === true}
              onChange={(e) => onToggle(label, e.target.checked)}
              className="accent-green-600"
            />
            {label}
          </label>
        ))}
      </div>
    </aside>
  );
}
