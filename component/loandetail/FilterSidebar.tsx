'use client';
import React, { useState } from 'react';
import { FilterState, SortOption } from '../../public/mockdata/data';
import { Check, X, ChevronUp, Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearAll: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearAll,
}) => {
  // State to toggle filter visibility on mobile
  const [isOpen, setIsOpen] = useState(false);

  // Helper to handle multi-select checkbox changes
  const handleCheckboxChange = (
    category: keyof Pick<FilterState, 'processingTime' | 'processType'>,
    value: string
  ) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value) // Uncheck
      : [...currentValues, value]; // Check

    onFilterChange({ ...filters, [category]: newValues });
  };

  // Helper to handle single-select "sort by" changes
  const handleSortChange = (value: SortOption) => {
    const newValue = filters.sortBy === value ? null : value;
    onFilterChange({ ...filters, sortBy: newValue });
  };

  return (
    <>
      {/* ------------------------------------------------------------
        MOBILE TRIGGER BUTTON 
        (Hidden when drawer is open)
        ------------------------------------------------------------
      */}
      <div className={`md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${isOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full shadow-lg transition-all active:scale-95 font-medium"
        >
          <Filter size={18} />
          Filters
          <ChevronUp size={18} />
        </button>
      </div>

      {/* ------------------------------------------------------------
        BACKDROP (Mobile Overlay)
        ------------------------------------------------------------
      */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ------------------------------------------------------------
        MAIN SIDEBAR CONTAINER
        ------------------------------------------------------------
      */}
      <div className={`
        bg-white h-full flex flex-col
        
        /* Mobile Specific Styles (Bottom Sheet) */
        fixed bottom-0 left-0 right-0 z-50 
        rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)]
        transition-transform duration-300 ease-in-out
        max-h-[85vh] 
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}

        /* Desktop Specific Styles (Reset Mobile Styles) */
        md:static md:translate-y-0 md:shadow-none md:rounded-lg md:block md:max-h-none
        md:border-none md:p-6
      `}>
        
        {/* ---- HEADER (Fixed) ---- */}
        <div className="flex-none flex justify-between items-center p-6 pb-3 border-b border-gray-300">
          <h2 className="text-xl font-serif font-bold text-gray-900">Filter & Sort by</h2>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onClearAll}
              className="text-teal-500 hover:text-teal-600 text-sm font-medium"
            >
              Clear All
            </button>

            {/* Close Button - Visible ONLY on Mobile */}
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* ---- SCROLLABLE CONTENT (Flexible Height) ---- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Sort By Section */}
          <section>
            <h3 className="text-lg font-serif text-gray-900 mb-3">Sort By</h3>
            <div className="space-y-3">
              <CustomCheckbox
                label="Approval Chances"
                subLabel="High to Low"
                isChecked={filters.sortBy === 'approval-high-low'}
                onChange={() => handleSortChange('approval-high-low')}
              />
              <CustomCheckbox
                label="Disbursal Time"
                subLabel="Low to High"
                isChecked={filters.sortBy === 'disbursal-low-high'}
                onChange={() => handleSortChange('disbursal-low-high')}
              />
              <CustomCheckbox
                label="EMI"
                subLabel="Low to High"
                isChecked={filters.sortBy === 'emi-low-high'}
                onChange={() => handleSortChange('emi-low-high')}
              />
              <CustomCheckbox
                label="EMI"
                subLabel="High to Low"
                isChecked={filters.sortBy === 'emi-high-low'}
                onChange={() => handleSortChange('emi-high-low')}
              />
            </div>
          </section>

          <div className="border-b border-gray-300"></div>

          {/* Processing Time Section */}
          <section>
            <h3 className="text-lg font-serif text-gray-900 mb-3">Processing Time</h3>
            <div className="space-y-3">
              {['instant', '1-2-days', '3-7-days', '7+-days'].map((time) => {
                const labelMap: Record<string, string> = {
                  'instant': 'Instant',
                  '1-2-days': '1 - 2 Days',
                  '3-7-days': '3 - 7 Days',
                  '7+-days': '7+ days'
                };
                return (
                  <CustomCheckbox
                    key={time}
                    label={labelMap[time]}
                    isChecked={filters.processingTime.includes(time)}
                    onChange={() => handleCheckboxChange('processingTime', time)}
                  />
                )
              })}
            </div>
          </section>

          <div className="border-b border-gray-300"></div>

          {/* Process Type Section */}
          <section>
            <h3 className="text-lg font-serif text-gray-900 mb-3">Process Type</h3>
            <div className="space-y-3">
              <CustomCheckbox
                label="Assisted Process"
                isChecked={filters.processType.includes('assisted-process')}
                onChange={() => handleCheckboxChange('processType', 'assisted-process')}
              />
              <CustomCheckbox
                label="Instant Process"
                isChecked={filters.processType.includes('instant-process')}
                onChange={() => handleCheckboxChange('processType', 'instant-process')}
              />
            </div>
          </section>
        </div>

        {/* ---- APPLY BUTTON FOOTER (Mobile Only, Sticky Bottom) ---- */}
        <div className="md:hidden flex-none p-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition-colors active:bg-teal-800"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </>
  );
};

// Sub-component for the custom styled checkbox row
interface CustomCheckboxProps {
  label: string;
  subLabel?: string;
  isChecked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, subLabel, isChecked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer group select-none">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={onChange}
        />
        <div
          className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
              ${isChecked ? 'bg-teal-500 border-teal-500' : 'border-gray-500 group-hover:border-gray-700'}`}
        >
          {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
        </div>
      </div>
      <div className="ml-3 text-gray-700">
        <span className={`${isChecked ? 'text-teal-500 font-medium' : ''}`}>
          {label}
        </span>
        {subLabel && (
          <span className={`ml-1 ${isChecked ? 'text-teal-500' : 'text-gray-500'} italic text-sm`}>
            {subLabel}
          </span>
        )}
      </div>
    </label>
  );
};

export default FilterSidebar;