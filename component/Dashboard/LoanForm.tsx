"use client";
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

interface LoanFormProps {
  categoryId?: number;
  onSubmit?: (data: any) => void;
  initialData?: any;
  isEditing?: boolean;
}

// Helper function to capitalize each word properly
const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const offerTypeOptions = [
  'Cashback',
  'Reward Points',
  'Discount',
  'Waiver',
  'Bonus',
  'Interest Free',
  'Low Interest',
  'Free Service'
];

// Helper function to format numbers in Indian numbering system (xx,xx,xxx)
const formatIndianNumber = (num: string | number): string => {
  if (!num) return '';
  const numStr = num.toString().replace(/[^0-9]/g, '');
  if (!numStr) return '';
  
  let lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
};

// Helper function to add ₹ symbol and format amount
const formatAmount = (value: string): string => {
  if (!value) return '';
  const cleanValue = value.replace(/[^0-9]/g, '');
  if (!cleanValue) return '';
  return '₹ ' + formatIndianNumber(cleanValue);
};

// Helper function to add % symbol
const formatPercentage = (value: string): string => {
  if (!value) return '';
  const cleanValue = value.replace(/%/g, '').trim();
  if (!cleanValue) return '';
  return cleanValue + '%';
};

const LoanForm: React.FC<LoanFormProps> = ({ categoryId, onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    bankName: initialData?.bankName || '',
    bankLogoUrl: initialData?.bankLogoUrl || '',
    tag: initialData?.tag || '',
    feature: initialData?.feature || '',
    specialization: initialData?.specialization || '',
    processTimeLabel: initialData?.processTimeLabel || '',
    processTimeValue: initialData?.processTimeValue || '',
    chanceOfApproval: initialData?.chanceOfApproval || '',
    approvalScore: initialData?.approvalScore || 0,
    interestRateText: initialData?.interestRateText || '',
    aprText: initialData?.aprText || '',
    emiAmount: initialData?.emiAmount || '',
    emiValue: initialData?.emiValue || 0,
    processTypeLabel: initialData?.processTypeLabel || '',
    processTypeValue: initialData?.processTypeValue || '',
    disbursalTimeHours: initialData?.disbursalTimeHours || 0,
    keyStatement: initialData?.keyStatement || '',
    // New filter fields - converted from comma-separated strings to arrays for editing
    loanType: Array.isArray(initialData?.loanType) 
      ? initialData.loanType 
      : (initialData?.loanType ? initialData.loanType.split(',').filter(Boolean) : []),
    loanSubType: Array.isArray(initialData?.loanSubType) 
      ? initialData.loanSubType 
      : (initialData?.loanSubType ? initialData.loanSubType.split(',').filter(Boolean) : []),
    amountRange: Array.isArray(initialData?.amountRange) 
      ? initialData.amountRange 
      : (initialData?.amountRange ? initialData.amountRange.split(',').filter(Boolean) : []),
    eligibleFor: Array.isArray(initialData?.eligibleFor) 
      ? initialData.eligibleFor 
      : (initialData?.eligibleFor ? initialData.eligibleFor.split(',').filter(Boolean) : []),
    loanPurpose: Array.isArray(initialData?.loanPurpose) 
      ? initialData.loanPurpose 
      : (initialData?.loanPurpose ? initialData.loanPurpose.split(',').filter(Boolean) : []),
    scheme: Array.isArray(initialData?.scheme) 
      ? initialData.scheme 
      : (initialData?.scheme ? initialData.scheme.split(',').filter(Boolean) : []),
    vehicleType: Array.isArray(initialData?.vehicleType) 
      ? initialData.vehicleType 
      : (initialData?.vehicleType ? initialData.vehicleType.split(',').filter(Boolean) : []),
    bullets: initialData?.bullets?.length > 0 ? initialData.bullets : [{ text: '', displayOrder: 1 }],
    summaryCharges: initialData?.summaryCharges?.length > 0 ? initialData.summaryCharges : [{ label: '', mainText: '', subText: '', displayOrder: 1 }],
    requiredDocuments: initialData?.requiredDocuments?.length > 0 ? initialData.requiredDocuments : [{ title: '', description: '', displayOrder: 1 }],
    processSteps: initialData?.processSteps?.length > 0 ? initialData.processSteps : [{ title: '', description: '', displayOrder: 1 }]
  });

  const [offers, setOffers] = useState<Array<{
    merchant: string;
    offerType: string;
    title: string;
    description: string;
    offerValue: string;
    validFrom: string;
    validTill: string;
    isActive: boolean;
  }>>(
    initialData?.offers?.length > 0 
      ? initialData.offers.map((offer: any, index: number) => ({
          merchant: offer.merchant || '',
          offerType: offer.offerType || 'Processing Fee Waiver',
          title: offer.title || '',
          description: offer.description || '',
          offerValue: offer.offerValue || '',
          validFrom: offer.validFrom ? new Date(offer.validFrom).toISOString().split('T')[0] : '',
          validTill: offer.validTill ? new Date(offer.validTill).toISOString().split('T')[0] : '',
          isActive: offer.isActive !== false
        }))
      : [{
          merchant: '',
          offerType: 'Processing Fee Waiver',
          title: '',
          description: '',
          offerValue: '',
          validFrom: '',
          validTill: '',
          isActive: true
        }]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Auto-capitalize for specific fields
    if (['title', 'bankName', 'tag', 'feature', 'specialization', 'processTimeLabel', 
         'processTypeLabel', 'chanceOfApproval', 'keyStatement'].includes(name)) {
      formattedValue = capitalizeWords(value);
    }

    // Auto-format amounts with ₹ symbol
    if (name === 'emiAmount') {
      formattedValue = formatAmount(value);
    }

    // Auto-format percentages
    if (name === 'interestRateText' || name === 'aprText') {
      const cleanValue = value.replace(/%/g, '').trim();
      if (cleanValue && !isNaN(parseFloat(cleanValue))) {
        formattedValue = formatPercentage(cleanValue);
      } else {
        formattedValue = value;
      }
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleMultiSelectChange = (fieldName: string, value: string, checked: boolean) => {
    const currentValues = Array.isArray(formData[fieldName as keyof typeof formData]) 
      ? formData[fieldName as keyof typeof formData] as string[]
      : [];
    let newValues: string[];

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }

    setFormData({ ...formData, [fieldName]: newValues });
  };

  const handleImageChange = (url: string) => {
    setFormData({ ...formData, bankLogoUrl: url });
  };

  const handleArrayChange = (field: string, index: number, key: string, value: string) => {
    const updatedArray = [...(formData as any)[field]];
    updatedArray[index][key] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addArrayItem = (field: string, template: any) => {
    const updatedArray = [...(formData as any)[field]];
    updatedArray.push({ ...template, displayOrder: updatedArray.length + 1 });
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleOfferChange = (index: number, field: string, value: string | number) => {
    const updatedOffers = [...offers];
    updatedOffers[index] = { ...updatedOffers[index], [field]: value };
    setOffers(updatedOffers);
  };

  const addOffer = () => {
    setOffers([...offers, {
      offerType: '',
      merchant: '',
      description: '',
      validFrom: '',
      validTill: '',
      offerValue: '',
      isActive: true,
      title: ''
    }]);
  };

  const removeOffer = (index: number) => {
    const updatedOffers = offers.filter((_, i) => i !== index);
    setOffers(updatedOffers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert arrays to comma-separated strings for database storage
    const payload = {
      ...formData,
      categoryId,
      offers,
      loanType: formData.loanType.join(','),
      loanSubType: formData.loanSubType.join(','),
      amountRange: formData.amountRange.join(','),
      eligibleFor: formData.eligibleFor.join(','),
      loanPurpose: formData.loanPurpose.join(','),
      scheme: formData.scheme.join(','),
      vehicleType: formData.vehicleType.join(',')
    };

    // If onSubmit is provided, use controlled mode
    if (onSubmit) {
      onSubmit(payload);
      return;
    }

    // Otherwise, handle submission directly (uncontrolled mode)
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in');
        return;
      }

      const response = await fetch('/api/admin/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Loan created successfully!');
        window.location.href = '/dashboard/loans';
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create loan'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to create loan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
          <input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. SBI Personal Loan" className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
          <input required name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. HDFC Bank" className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <ImageUpload 
            label="Bank Logo" 
            value={formData.bankLogoUrl} 
            onChange={handleImageChange} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
          <input name="tag" placeholder="e.g. Featured, Popular, New" value={formData.tag} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Feature</label>
          <input name="feature" placeholder="e.g. Fast Processing, Low Interest" value={formData.feature} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
          <input name="specialization" placeholder="e.g. Quick Approval With Minimal Documentation" value={formData.specialization} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Process Time Label</label>
          <input name="processTimeLabel" placeholder="e.g. Instant" value={formData.processTimeLabel} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Process Time Value</label>
          <input name="processTypeValue" placeholder="e.g. instant" value={formData.processTimeValue} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chance of Approval</label>
          <input name="chanceOfApproval" placeholder="e.g. Excellent" value={formData.chanceOfApproval} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Approval Score (0-100)</label>
          <input type="number" name="approvalScore" value={formData.approvalScore} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate Text</label>
          <input name="interestRateText" placeholder="e.g. 10.5 (% will be added automatically)" value={formData.interestRateText} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          <p className="text-xs text-gray-500 mt-1">Enter number only, % will be added automatically</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">APR Text</label>
          <input name="aprText" placeholder="e.g. 11.2 (% will be added automatically)" value={formData.aprText} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          <p className="text-xs text-gray-500 mt-1">Enter number only, % will be added automatically</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">EMI Amount Text</label>
          <input name="emiAmount" placeholder="e.g. 5188 (₹ and formatting added automatically)" value={formData.emiAmount} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          <p className="text-xs text-gray-500 mt-1">Enter amount only, ₹ symbol and formatting will be added (e.g. ₹ 5,188)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">EMI Value (Numeric)</label>
          <input type="number" name="emiValue" placeholder="e.g. 5188" value={formData.emiValue} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          <p className="text-xs text-gray-500 mt-1">Numeric value for calculations (no formatting)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Process Type Label</label>
          <input name="processTypeLabel" placeholder="e.g. Instant Process" value={formData.processTypeLabel} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Process Type Value</label>
          <input name="processTypeValue" placeholder="e.g. instant-process" value={formData.processTypeValue} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Disbursal Time (Hours)</label>
          <input type="number" name="disbursalTimeHours" placeholder="e.g. 24" value={formData.disbursalTimeHours} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
      </div>

      {/* Filter Fields Section */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-800 mb-4 text-lg">🔍 Filter Options (for listing pages)</h3>
        <p className="text-sm text-gray-600 mb-4">These fields help users find this loan through filters on listing pages</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category (Loan Type) - Multiple Selection</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {[
                { value: 'personal', label: 'Personal Loan' },
                { value: 'business', label: 'Business Loan' },
                { value: 'home', label: 'Home Loan' },
                { value: 'vehicle', label: 'Vehicle Loan' },
                { value: 'education', label: 'Education Loan' },
                { value: 'property', label: 'Loan Against Property' },
                { value: 'security', label: 'Loan Against Security' },
                { value: 'professional', label: 'Professional Loan' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.loanType.includes(option.value)}
                    onChange={(e) => handleMultiSelectChange('loanType', option.value, e.target.checked)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Main categories - select all that apply</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Sub-Type (Page Filter) - Multiple Selection</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {[
                { value: 'preApproved', label: 'Pre-Approved' },
                { value: 'interestRates', label: 'Interest Rates' },
                { value: 'lowCibil', label: 'Low CIBIL' },
                { value: 'balanceTransfer', label: 'Balance Transfer' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.loanSubType.includes(option.value)}
                    onChange={(e) => handleMultiSelectChange('loanSubType', option.value, e.target.checked)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Filter for specific pages - select multiple</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range - Multiple Selection</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {[
                { value: '5-lakh', label: '₹5 Lakh' },
                { value: '10-lakh', label: '₹10 Lakh' },
                { value: '15-lakh', label: '₹15 Lakh' },
                { value: '20-lakh', label: '₹20 Lakh' },
                { value: '30-lakh', label: '₹30 Lakh' },
                { value: '40-lakh', label: '₹40 Lakh' },
                { value: '50-lakh', label: '₹50 Lakh' },
                { value: '60-lakh', label: '₹60 Lakh' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.amountRange.includes(option.value)}
                    onChange={(e) => handleMultiSelectChange('amountRange', option.value, e.target.checked)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Maximum loan amounts offered - select multiple</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Eligible For - Multiple Selection</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {[
                { value: 'salaried', label: 'Salaried' },
                { value: 'self-employed', label: 'Self-Employed' },
                { value: 'seniors', label: 'Senior Citizens' },
                { value: 'students', label: 'Students' },
                { value: 'doctors', label: 'Doctors' },
                { value: 'women', label: 'Women' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.eligibleFor.includes(option.value)}
                    onChange={(e) => handleMultiSelectChange('eligibleFor', option.value, e.target.checked)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Who can apply - select multiple</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose - Multiple Selection</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {[
                { value: 'medical', label: 'Medical Emergency' },
                { value: 'travel', label: 'Travel' },
                { value: 'wedding', label: 'Wedding' },
                { value: 'consolidation', label: 'Debt Consolidation' },
                { value: 'overdraft', label: 'Overdraft' },
                { value: 'flexi', label: 'Flexi Loan' },
                { value: 'short-term', label: 'Short-Term' },
                { value: 'term', label: 'Term Loan' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.loanPurpose.includes(option.value)}
                    onChange={(e) => handleMultiSelectChange('loanPurpose', option.value, e.target.checked)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">What the loan can be used for - select multiple</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Scheme (For Business Loans) - Multiple Selection</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {[
                { value: 'dairy', label: 'Dairy Farming' },
                { value: 'small', label: 'Small Business' },
                { value: 'goat', label: 'Goat Farming' },
                { value: 'startup', label: 'Startup' },
                { value: 'poultry', label: 'Poultry' },
                { value: 'renovation', label: 'Home Renovation' },
                { value: 'plot', label: 'Plot Purchase' },
                { value: 'top-up', label: 'Top-up Loan' },
                { value: 'construction', label: 'Construction' },
                { value: 'nri', label: 'NRI' },
                { value: 'extension', label: 'Extension' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.scheme.includes(option.value)}
                    onChange={(e) => handleMultiSelectChange('scheme', option.value, e.target.checked)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Specific schemes or programs - select multiple</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type (For Vehicle Loans) - Multiple Selection</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {[
                { value: 'new-bike', label: 'New Bike' },
                { value: 'used-bike', label: 'Used Bike' },
                { value: 'new-car', label: 'New Car' },
                { value: 'used-car', label: 'Used Car' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.vehicleType.includes(option.value)}
                    onChange={(e) => handleMultiSelectChange('vehicleType', option.value, e.target.checked)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Types of vehicles to be financed - select multiple</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Key Statement</label>
        <textarea name="keyStatement" placeholder="e.g. Get Quick Approval With Low Interest Rates" value={formData.keyStatement} onChange={handleChange} className="w-full p-2 border rounded-lg" rows={3} />
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-800 mb-2">Bullet Points</h3>
        {formData.bullets.map((item: any, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <input 
              placeholder="Bullet text" 
              value={item.text} 
              onChange={(e) => handleArrayChange('bullets', index, 'text', e.target.value)} 
              className="flex-1 p-2 border rounded-lg capitalize" 
            />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('bullets', { text: '' })} className="text-sm text-blue-600 hover:underline">+ Add Bullet</button>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-800 mb-2">Summary Charges</h3>
        {formData.summaryCharges.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-3 gap-2 mb-2">
            <input placeholder="Label" value={item.label} onChange={(e) => handleArrayChange('summaryCharges', index, 'label', e.target.value)} className="p-2 border rounded-lg capitalize" />
            <input placeholder="Main Text" value={item.mainText} onChange={(e) => handleArrayChange('summaryCharges', index, 'mainText', e.target.value)} className="p-2 border rounded-lg capitalize" />
            <input placeholder="Sub Text" value={item.subText} onChange={(e) => handleArrayChange('summaryCharges', index, 'subText', e.target.value)} className="p-2 border rounded-lg capitalize" />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('summaryCharges', { label: '', mainText: '', subText: '' })} className="text-sm text-blue-600 hover:underline">+ Add Charge</button>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-800 mb-2">Required Documents</h3>
        {formData.requiredDocuments.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-2 gap-2 mb-2">
            <input placeholder="Title" value={item.title} onChange={(e) => handleArrayChange('requiredDocuments', index, 'title', e.target.value)} className="p-2 border rounded-lg capitalize" />
            <input placeholder="Description" value={item.description} onChange={(e) => handleArrayChange('requiredDocuments', index, 'description', e.target.value)} className="p-2 border rounded-lg capitalize" />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('requiredDocuments', { title: '', description: '' })} className="text-sm text-blue-600 hover:underline">+ Add Document</button>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-800 mb-2">Process Steps</h3>
        {formData.processSteps.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-2 gap-2 mb-2">
            <input placeholder="Step Title" value={item.title} onChange={(e) => handleArrayChange('processSteps', index, 'title', e.target.value)} className="p-2 border rounded-lg capitalize" />
            <input placeholder="Description" value={item.description} onChange={(e) => handleArrayChange('processSteps', index, 'description', e.target.value)} className="p-2 border rounded-lg capitalize" />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('processSteps', { title: '', description: '' })} className="text-sm text-blue-600 hover:underline">+ Add Step</button>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-800 mb-2">Offers</h3>
        {offers.map((offer, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                value={offer.offerType}
                onChange={(e) => handleOfferChange(index, 'offerType', e.target.value)}
                className="p-2 border rounded-lg capitalize"
                
              >
                <option value="">Select Offer Type</option>
                {offerTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Merchant Name"
                value={offer.merchant}
                onChange={(e) => handleOfferChange(index, 'merchant', e.target.value)}
                className="p-2 border rounded-lg capitalize"
                
              />
            </div>
            <textarea
              placeholder="Offer Description"
              value={offer.description}
              onChange={(e) => handleOfferChange(index, 'description', e.target.value)}
              className="w-full p-2 border rounded-lg mb-4 capitalize"
              rows={3}
              
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="date"
                placeholder="Valid From"
                value={offer.validFrom}
                onChange={(e) => handleOfferChange(index, 'validFrom', e.target.value)}
                className="p-2 border rounded-lg"
                
              />
              <input
                type="date"
                placeholder="Valid Till"
                value={offer.validTill}
                onChange={(e) => handleOfferChange(index, 'validTill', e.target.value)}
                className="p-2 border rounded-lg"
              
              />
            </div>
            <input
              type="text"
              placeholder="Offer Value"
              value={offer.offerValue}
              onChange={(e) => handleOfferChange(index, 'offerValue', e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              
            />
            <input
              type="text"
              placeholder="Title"
              value={offer.title}
              onChange={(e) => handleOfferChange(index, 'title', e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              
            />
            <button
              type="button"
              onClick={() => removeOffer(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remove Offer
            </button>
          </div>
        ))}
        <button type="button" onClick={addOffer} className="text-sm text-blue-600 hover:underline">+ Add Offer</button>
      </div>

      <div className="flex justify-end pt-6">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          {isEditing ? 'Update Loan Product' : 'Create Loan Product'}
        </button>
      </div>
    </form>
  );
};

export default LoanForm;