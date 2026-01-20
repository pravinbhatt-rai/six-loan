'use client';
import React, { useState } from 'react';
import { FilterState, SortOption } from '../../public/mockdata/data';
import { Check, X, ChevronUp, Filter, ChevronDown } from 'lucide-react';

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
  
  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sortBy: true,
    processingTime: true,
    processType: true,
    loanSubType: true,
    amountRange: false,
    eligibleFor: false,
    loanPurpose: false,
    scheme: false,
    vehicleType: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper to handle multi-select checkbox changes
  const handleCheckboxChange = (
    category: keyof Pick<FilterState, 'processingTime' | 'processType' | 'loanSubType' | 'amountRange' | 'eligibleFor' | 'loanPurpose' | 'scheme' | 'vehicleType'>,
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
        <div className="flex-none flex justify-between items-center p-4 pb-2 border-b border-gray-300">
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Sort By Section */}
          <section>
            <h3 className="text-lg font-serif text-gray-900 mb-2">Sort By</h3>
            <div className="space-y-2">
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
            <h3 className="text-lg font-serif text-gray-900 mb-2">Processing Time</h3>
            <div className="space-y-2">
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
            <button 
              onClick={() => toggleSection('processType')}
              className="w-full flex items-center justify-between text-lg font-serif text-gray-900 mb-2 hover:text-teal-600"
            >
              Process Type
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.processType ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.processType && (
              <div className="space-y-2">
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
            )}
          </section>

          <div className="border-b border-gray-300"></div>

          {/* Loan Sub Type Section */}
          <section>
            <button 
              onClick={() => toggleSection('loanSubType')}
              className="w-full flex items-center justify-between text-lg font-serif text-gray-900 mb-2 hover:text-teal-600"
            >
              Loan Type
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.loanSubType ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.loanSubType && (
              <div className="space-y-2">
                <CustomCheckbox
                  label="Pre-Approved"
                  isChecked={filters.loanSubType.includes('preApproved')}
                  onChange={() => handleCheckboxChange('loanSubType', 'preApproved')}
                />
                <CustomCheckbox
                  label="Interest Rates"
                  isChecked={filters.loanSubType.includes('interestRates')}
                  onChange={() => handleCheckboxChange('loanSubType', 'interestRates')}
                />
                <CustomCheckbox
                  label="Low CIBIL Score"
                  isChecked={filters.loanSubType.includes('lowCibil')}
                  onChange={() => handleCheckboxChange('loanSubType', 'lowCibil')}
                />
                <CustomCheckbox
                  label="Balance Transfer"
                  isChecked={filters.loanSubType.includes('balanceTransfer')}
                  onChange={() => handleCheckboxChange('loanSubType', 'balanceTransfer')}
                />
              </div>
            )}
          </section>

          <div className="border-b border-gray-300"></div>

          {/* Amount Range Section */}
          <section>
            <button 
              onClick={() => toggleSection('amountRange')}
              className="w-full flex items-center justify-between text-lg font-serif text-gray-900 mb-2 hover:text-teal-600"
            >
              Loan Amount
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.amountRange ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.amountRange && (
              <div className="space-y-2">
                {['5-lakh', '10-lakh', '15-lakh', '20-lakh', '30-lakh', '40-lakh', '50-lakh', '60-lakh'].map((amount) => {
                  const labelMap: Record<string, string> = {
                    '5-lakh': '₹5 Lakh',
                    '10-lakh': '₹10 Lakh',
                    '15-lakh': '₹15 Lakh',
                    '20-lakh': '₹20 Lakh',
                    '30-lakh': '₹30 Lakh',
                    '40-lakh': '₹40 Lakh',
                    '50-lakh': '₹50 Lakh',
                    '60-lakh': '₹60 Lakh'
                  };
                  return (
                    <CustomCheckbox
                      key={amount}
                      label={labelMap[amount]}
                      isChecked={filters.amountRange.includes(amount)}
                      onChange={() => handleCheckboxChange('amountRange', amount)}
                    />
                  );
                })}
              </div>
            )}
          </section>

          <div className="border-b border-gray-300"></div>

          {/* Eligible For Section */}
          <section>
            <button 
              onClick={() => toggleSection('eligibleFor')}
              className="w-full flex items-center justify-between text-lg font-serif text-gray-900 mb-2 hover:text-teal-600"
            >
              Eligible For
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.eligibleFor ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.eligibleFor && (
              <div className="space-y-2">
                {['salaried', 'self-employed', 'seniors', 'students', 'doctors', 'women'].map((type) => {
                  const labelMap: Record<string, string> = {
                    'salaried': 'Salaried Employees',
                    'self-employed': 'Self Employed',
                    'seniors': 'Senior Citizens',
                    'students': 'Students',
                    'doctors': 'Doctors',
                    'women': 'Women'
                  };
                  return (
                    <CustomCheckbox
                      key={type}
                      label={labelMap[type]}
                      isChecked={filters.eligibleFor.includes(type)}
                      onChange={() => handleCheckboxChange('eligibleFor', type)}
                    />
                  );
                })}
              </div>
            )}
          </section>

          <div className="border-b border-gray-300"></div>

          {/* Loan Purpose Section */}
          <section>
            <button 
              onClick={() => toggleSection('loanPurpose')}
              className="w-full flex items-center justify-between text-lg font-serif text-gray-900 mb-2 hover:text-teal-600"
            >
              Loan Purpose
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.loanPurpose ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.loanPurpose && (
              <div className="space-y-2">
                {['medical', 'travel', 'wedding', 'consolidation', 'overdraft', 'flexi', 'short-term', 'term'].map((purpose) => {
                  const labelMap: Record<string, string> = {
                    'medical': 'Medical Loan',
                    'travel': 'Travel Loan',
                    'wedding': 'Wedding Loan',
                    'consolidation': 'Debt Consolidation',
                    'overdraft': 'Overdraft Loan',
                    'flexi': 'Flexi Loan',
                    'short-term': 'Short Term Loan',
                    'term': 'Term Loan'
                  };
                  return (
                    <CustomCheckbox
                      key={purpose}
                      label={labelMap[purpose]}
                      isChecked={filters.loanPurpose.includes(purpose)}
                      onChange={() => handleCheckboxChange('loanPurpose', purpose)}
                    />
                  );
                })}
              </div>
            )}
          </section>

          <div className="border-b border-gray-300"></div>

          {/* Scheme Section */}
          <section>
            <button 
              onClick={() => toggleSection('scheme')}
              className="w-full flex items-center justify-between text-lg font-serif text-gray-900 mb-2 hover:text-teal-600"
            >
              Schemes
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.scheme ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.scheme && (
              <div className="space-y-2">
                {['dairy', 'small', 'goat', 'startup', 'poultry', 'renovation', 'plot', 'top-up', 'construction', 'nri', 'extension'].map((scheme) => {
                  const labelMap: Record<string, string> = {
                    'dairy': 'Dairy Farming',
                    'small': 'Small Business',
                    'goat': 'Goat Farming',
                    'startup': 'Startup',
                    'poultry': 'Poultry Farm',
                    'renovation': 'Home Renovation',
                    'plot': 'Plot Loan',
                    'top-up': 'Top-up Loan',
                    'construction': 'Home Construction',
                    'nri': 'NRI Loan',
                    'extension': 'Home Extension'
                  };
                  return (
                    <CustomCheckbox
                      key={scheme}
                      label={labelMap[scheme]}
                      isChecked={filters.scheme.includes(scheme)}
                      onChange={() => handleCheckboxChange('scheme', scheme)}
                    />
                  );
                })}
              </div>
            )}
          </section>

          <div className="border-b border-gray-300"></div>

          {/* Vehicle Type Section */}
          <section>
            <button 
              onClick={() => toggleSection('vehicleType')}
              className="w-full flex items-center justify-between text-lg font-serif text-gray-900 mb-2 hover:text-teal-600"
            >
              Vehicle Type
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.vehicleType ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.vehicleType && (
              <div className="space-y-2">
                {['new-bike', 'used-bike', 'new-car', 'used-car'].map((vehicle) => {
                  const labelMap: Record<string, string> = {
                    'new-bike': 'New Two Wheeler',
                    'used-bike': 'Used Two Wheeler',
                    'new-car': 'New Car',
                    'used-car': 'Used Car'
                  };
                  return (
                    <CustomCheckbox
                      key={vehicle}
                      label={labelMap[vehicle]}
                      isChecked={filters.vehicleType.includes(vehicle)}
                      onChange={() => handleCheckboxChange('vehicleType', vehicle)}
                    />
                  );
                })}
              </div>
            )}
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