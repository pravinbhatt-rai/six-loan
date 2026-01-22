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
    // New filter fields
    loanType: initialData?.loanType || '',
    loanSubType: initialData?.loanSubType || '',
    amountRange: initialData?.amountRange || '',
    eligibleFor: initialData?.eligibleFor || '',
    loanPurpose: initialData?.loanPurpose || '',
    scheme: initialData?.scheme || '',
    vehicleType: initialData?.vehicleType || '',
    bullets: initialData?.bullets?.length > 0 ? initialData.bullets : [{ text: '', displayOrder: 1 }],
    summaryCharges: initialData?.summaryCharges?.length > 0 ? initialData.summaryCharges : [{ label: '', mainText: '', subText: '', displayOrder: 1 }],
    requiredDocuments: initialData?.requiredDocuments?.length > 0 ? initialData.requiredDocuments : [{ title: '', description: '', displayOrder: 1 }],
    processSteps: initialData?.processSteps?.length > 0 ? initialData.processSteps : [{ title: '', description: '', displayOrder: 1 }]
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = { ...formData, categoryId };

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
            <label className="block text-sm font-medium text-gray-700 mb-1">Category (Loan Type)</label>
            <select name="loanType" value={formData.loanType} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Select Category</option>
              <option value="personal">Personal Loan</option>
              <option value="business">Business Loan</option>
              <option value="home">Home Loan</option>
              <option value="vehicle">Vehicle Loan</option>
              <option value="education">Education Loan</option>
              <option value="property">Loan Against Property</option>
              <option value="security">Loan Against Security</option>
              <option value="professional">Professional Loan</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Main category - must match the section you're creating this in</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Sub-Type (Page Filter)</label>
            <select name="loanSubType" value={formData.loanSubType} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Select Sub-Type</option>
              <option value="preApproved">Pre-Approved</option>
              <option value="interestRates">Interest Rates</option>
              <option value="lowCibil">Low CIBIL</option>
              <option value="balanceTransfer">Balance Transfer</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Filter for specific pages - e.g., /personalLoan/preApproved shows only preApproved loans</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
            <select name="amountRange" value={formData.amountRange} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Select Amount Range</option>
              <option value="5-lakh">₹5 Lakh</option>
              <option value="10-lakh">₹10 Lakh</option>
              <option value="15-lakh">₹15 Lakh</option>
              <option value="20-lakh">₹20 Lakh</option>
              <option value="30-lakh">₹30 Lakh</option>
              <option value="40-lakh">₹40 Lakh</option>
              <option value="50-lakh">₹50 Lakh</option>
              <option value="60-lakh">₹60 Lakh</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Maximum loan amount offered</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Eligible For</label>
            <select name="eligibleFor" value={formData.eligibleFor} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Select Eligibility</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-Employed</option>
              <option value="seniors">Senior Citizens</option>
              <option value="students">Students</option>
              <option value="doctors">Doctors</option>
              <option value="women">Women</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Who can apply for this loan</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose</label>
            <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Select Purpose</option>
              <option value="medical">Medical Emergency</option>
              <option value="travel">Travel</option>
              <option value="wedding">Wedding</option>
              <option value="consolidation">Debt Consolidation</option>
              <option value="overdraft">Overdraft</option>
              <option value="flexi">Flexi Loan</option>
              <option value="short-term">Short-Term</option>
              <option value="term">Term Loan</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">What the loan can be used for</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scheme (For Business Loans)</label>
            <select name="scheme" value={formData.scheme} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Select Scheme</option>
              <option value="dairy">Dairy Farming</option>
              <option value="small">Small Business</option>
              <option value="goat">Goat Farming</option>
              <option value="startup">Startup</option>
              <option value="poultry">Poultry</option>
              <option value="renovation">Home Renovation</option>
              <option value="plot">Plot Purchase</option>
              <option value="top-up">Top-up Loan</option>
              <option value="construction">Construction</option>
              <option value="nri">NRI</option>
              <option value="extension">Extension</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Specific scheme or program</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type (For Vehicle Loans)</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Select Vehicle Type</option>
              <option value="new-bike">New Bike</option>
              <option value="used-bike">Used Bike</option>
              <option value="new-car">New Car</option>
              <option value="used-car">Used Car</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Type of vehicle to be financed</p>
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

      <div className="flex justify-end pt-6">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          {isEditing ? 'Update Loan Product' : 'Create Loan Product'}
        </button>
      </div>
    </form>
  );
};

export default LoanForm;