"use client";
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

interface LoanFormProps {
  categoryId: number;
  onSubmit: (data: any) => void;
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
    bullets: initialData?.bullets?.length > 0 ? initialData.bullets : [{ text: '', displayOrder: 1 }],
    summaryCharges: initialData?.summaryCharges?.length > 0 ? initialData.summaryCharges : [{ label: '', mainText: '', subText: '', displayOrder: 1 }],
    requiredDocuments: initialData?.requiredDocuments?.length > 0 ? initialData.requiredDocuments : [{ title: '', description: '', displayOrder: 1 }],
    processSteps: initialData?.processSteps?.length > 0 ? initialData.processSteps : [{ title: '', description: '', displayOrder: 1 }]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, categoryId });
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