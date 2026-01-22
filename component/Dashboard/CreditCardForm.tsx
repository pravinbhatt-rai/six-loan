"use client";
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { Plus, X } from 'lucide-react';

interface CreditCardFormProps {
  categoryId?: number;
  onSubmit?: (data: any) => void;
  initialData?: any;
  isEditing?: boolean;
}

interface BenefitSection {
  heading: string;
  subPoints: Array<{ text: string }>;
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

const CreditCardForm: React.FC<CreditCardFormProps> = ({ categoryId, onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    bankName: initialData?.bankName || '',
    cardType: initialData?.cardType || 'standard',
    bankLogoUrl: initialData?.bankLogoUrl || '',
    imageUrl: initialData?.imageUrl || '',
    videoUrl: initialData?.videoUrl || '',
    annualFee: initialData?.annualFee || '',
    joiningFee: initialData?.joiningFee || '',
    firstYearFee: initialData?.firstYearFee || '',
    secondYearFee: initialData?.secondYearFee || '',
    feeWaiverCondition: initialData?.feeWaiverCondition || '',
    rating: initialData?.rating || 0,
    effectiveFree: initialData?.effectiveFree || false,
    recommended: initialData?.recommended || false,
    cardNetwork: initialData?.cardNetwork || 'Visa',
    category: initialData?.category || '',
    keyStatement: initialData?.keyStatement || '',
    termsConditionsUrl: initialData?.termsConditionsUrl || '',
    bulletPoints: initialData?.bulletPoints?.length > 0 ? initialData.bulletPoints.map((f: any) => ({ text: f.text })) : [{ text: '' }],
    summaryCharges: initialData?.summaryCharges?.length > 0 ? initialData.summaryCharges : [{ label: '', mainText: '', subText: '', displayOrder: 1 }],
    requiredDocuments: initialData?.requiredDocuments?.length > 0 ? initialData.requiredDocuments : [{ title: '', description: '', displayOrder: 1 }],
    processSteps: initialData?.processSteps?.length > 0 ? initialData.processSteps : [{ title: '', description: '', displayOrder: 1 }]
  });

  const [bestSuitedFor, setBestSuitedFor] = useState<string[]>(
    initialData?.bestSuitedForPoints?.length > 0 
      ? initialData.bestSuitedForPoints.map((p: any) => p.text || p) 
      : ['']
  );

  const [specialOffers, setSpecialOffers] = useState<string[]>(
    initialData?.specialOffers?.length > 0 
      ? initialData.specialOffers.map((s: any) => s.text || s) 
      : ['']
  );

  const [benefitSections, setBenefitSections] = useState<BenefitSection[]>(
    initialData?.benefitSections?.length > 0 
      ? initialData.benefitSections 
      : [
          { heading: '', subPoints: [{ text: '' }] }
        ]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target as HTMLInputElement;
    let formattedValue = value;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
      return;
    }
    
    if (type === 'number') {
      setFormData({ ...formData, [name]: Number(value) });
      return;
    }

    // Auto-capitalize for specific fields
    if (['name', 'bankName', 'cardNetwork', 'category', 'keyStatement'].includes(name)) {
      formattedValue = capitalizeWords(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleImageChange = (field: 'bankLogoUrl' | 'imageUrl', url: string) => {
    setFormData({ ...formData, [field]: url });
  };

  const handleBulletChange = (index: number, value: string) => {
    const updatedBullets = [...formData.bulletPoints];
    updatedBullets[index].text = value;
    setFormData({ ...formData, bulletPoints: updatedBullets });
  };

  const addBullet = () => {
    setFormData({ ...formData, bulletPoints: [...formData.bulletPoints, { text: '' }] });
  };

  const removeBullet = (index: number) => {
    if (formData.bulletPoints.length > 1) {
      setFormData({ 
        ...formData, 
        bulletPoints: formData.bulletPoints.filter((_item: string, i: number) => i !== index) 
      });
    }
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

  // Best Suited For handlers
  const handleBestSuitedChange = (index: number, value: string) => {
    const updated = [...bestSuitedFor];
    updated[index] = value;
    setBestSuitedFor(updated);
  };

  const addBestSuited = () => {
    setBestSuitedFor([...bestSuitedFor, '']);
  };

  const removeBestSuited = (index: number) => {
    if (bestSuitedFor.length > 1) {
      setBestSuitedFor(bestSuitedFor.filter((_, i) => i !== index));
    }
  };

  // Special Offers handlers
  const handleSpecialOfferChange = (index: number, value: string) => {
    const updated = [...specialOffers];
    updated[index] = value;
    setSpecialOffers(updated);
  };

  const addSpecialOffer = () => {
    setSpecialOffers([...specialOffers, '']);
  };

  const removeSpecialOffer = (index: number) => {
    if (specialOffers.length > 1) {
      setSpecialOffers(specialOffers.filter((_, i) => i !== index));
    }
  };

  // Benefit Sections handlers
  const handleBenefitHeadingChange = (sectionIndex: number, value: string) => {
    const updated = [...benefitSections];
    updated[sectionIndex].heading = value;
    setBenefitSections(updated);
  };

  const handleBenefitChange = (sectionIndex: number, pointIndex: number, value: string) => {
    const updated = [...benefitSections];
    updated[sectionIndex].subPoints[pointIndex].text = value;
    setBenefitSections(updated);
  };

  const addBenefitSubPoint = (sectionIndex: number) => {
    const updated = [...benefitSections];
    updated[sectionIndex].subPoints.push({ text: '' });
    setBenefitSections(updated);
  };

  const removeBenefitSubPoint = (sectionIndex: number, pointIndex: number) => {
    const updated = [...benefitSections];
    if (updated[sectionIndex].subPoints.length > 1) {
      updated[sectionIndex].subPoints = updated[sectionIndex].subPoints.filter((_, i) => i !== pointIndex);
      setBenefitSections(updated);
    }
  };

  const addBenefitSection = () => {
    setBenefitSections([...benefitSections, { heading: '', subPoints: [{ text: '' }] }]);
  };

  const removeBenefitSection = (sectionIndex: number) => {
    if (benefitSections.length > 1) {
      setBenefitSections(benefitSections.filter((_, i) => i !== sectionIndex));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty benefit sections
    const filteredBenefitSections = benefitSections
      .map(section => ({
        ...section,
        subPoints: section.subPoints.filter(p => p.text.trim() !== '')
      }))
      .filter(section => section.subPoints.length > 0);

    const payload = {
      ...formData, 
      categories: categoryId ? [categoryId] : [],
      bestSuitedFor: bestSuitedFor.filter(b => b.trim() !== ''),
      specialOffers: specialOffers.filter(s => s.trim() !== ''),
      benefitSections: filteredBenefitSections
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

      const response = await fetch('/api/admin/credit-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Credit card created successfully!');
        window.location.href = '/dashboard/credit-cards';
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create credit card'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to create credit card');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Name *</label>
            <input required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. HDFC Regalia Credit Card" className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input required name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. hdfc-regalia" className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
            <input required name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. HDFC Bank" className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Type *</label>
            <select name="cardType" value={formData.cardType} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="secured">Secured</option>
              <option value="student">Student</option>
              <option value="business">Business</option>
              <option value="addon">Add-on</option>
              <option value="nri">NRI</option>
              <option value="hni">HNI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Network *</label>
            <select name="cardNetwork" value={formData.cardNetwork} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Rupay">Rupay</option>
              <option value="American Express">American Express</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Select Category</option>
              <option value="Cashback Credit Cards">Cashback Credit Cards</option>
              <option value="Rewards Credit Cards">Rewards Credit Cards</option>
              <option value="Credit Card Lounge Access">Credit Card Lounge Access</option>
              <option value="OneCard Credit Cards">OneCard Credit Cards</option>
              <option value="Fuel Credit Cards">Fuel Credit Cards</option>
              <option value="Travel Credit Cards">Travel Credit Cards</option>
              <option value="International Credit Cards">International Credit Cards</option>
              <option value="Zero Forex Markup Credit Cards">Zero Forex Markup Credit Cards</option>
              <option value="Secured Credit Cards">Secured Credit Cards</option>
            </select>
          </div>
          <div>
            <ImageUpload label="Card Image" value={formData.imageUrl} onChange={(url) => handleImageChange('imageUrl', url)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube)</label>
            <input type="url" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://www.youtube.com/watch?v=..." className="w-full p-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions URL</label>
            <input type="url" name="termsConditionsUrl" value={formData.termsConditionsUrl} onChange={handleChange} placeholder="https://..." className="w-full p-2 border rounded-lg" />
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Fee Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Fee *</label>
            <input required name="annualFee" value={formData.annualFee} onChange={handleChange} placeholder="e.g. ₹1,500 + GST" className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Joining Fee</label>
            <input name="joiningFee" value={formData.joiningFee} onChange={handleChange} placeholder="e.g. ₹500 + GST" className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">1st Year Fee</label>
            <input name="firstYearFee" value={formData.firstYearFee} onChange={handleChange} placeholder="e.g. 0 or 1500" className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">2nd Year Fee</label>
            <input name="secondYearFee" value={formData.secondYearFee} onChange={handleChange} placeholder="e.g. 1500" className="w-full p-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fee Waiver Condition</label>
            <input name="feeWaiverCondition" value={formData.feeWaiverCondition} onChange={handleChange} placeholder="e.g. Waived on spends of Rs. 2 lakh" className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
            <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="effectiveFree" name="effectiveFree" checked={formData.effectiveFree} onChange={handleChange} className="w-4 h-4" />
              <label htmlFor="effectiveFree" className="text-sm font-medium text-gray-700">Effectively Free</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="recommended" name="recommended" checked={formData.recommended} onChange={handleChange} className="w-4 h-4" />
              <label htmlFor="recommended" className="text-sm font-medium text-gray-700">Recommended</label>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statement */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Key Statement</h3>
        <textarea name="keyStatement" value={formData.keyStatement} onChange={handleChange} className="w-full p-2 border rounded-lg" rows={3} placeholder="Main selling point of the card..." />
      </div>

      {/* Bullet Points */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Bullet Points (Key Highlights)</h3>
        {formData.bulletPoints.map((item: { text: string }, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <input placeholder="Feature highlight" value={item.text} onChange={(e) => handleBulletChange(index, e.target.value)} className="flex-1 p-2 border rounded-lg" />
            <button type="button" onClick={() => removeBullet(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        ))}
        <button type="button" onClick={addBullet} className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><Plus className="w-4 h-4" /> Add Bullet</button>
      </div>

      {/* Best Suited For */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Best Suited For</h3>
        {bestSuitedFor.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input placeholder="e.g. Cashback, Rewards, Travel" value={item} onChange={(e) => handleBestSuitedChange(index, e.target.value)} className="flex-1 p-2 border rounded-lg" />
            <button type="button" onClick={() => removeBestSuited(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        ))}
        <button type="button" onClick={addBestSuited} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"><Plus className="w-4 h-4" /> Add Item</button>
      </div>

      {/* Special Offers */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Special Offers</h3>
        <p className="text-xs text-gray-500 mb-3">Promotional benefits and limited-time offers</p>
        {specialOffers.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input 
              placeholder="e.g. Get 5000 bonus points on first transaction" 
              value={item} 
              onChange={(e) => handleSpecialOfferChange(index, e.target.value)} 
              className="flex-1 p-2 border rounded-lg" 
            />
            <button type="button" onClick={() => removeSpecialOffer(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button type="button" onClick={addSpecialOffer} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
          <Plus className="w-4 h-4" /> Add Special Offer
        </button>
      </div>

      {/* Benefit Sections */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Card Benefits (Structured)</h3>
          <button 
            type="button" 
            onClick={addBenefitSection} 
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Benefit Category
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Example: "LOUNGE ACCESS" → "4 Domestic", "3 International" | "TRAVEL BENEFITS" → "5% cashback", "Very good"
        </p>
        
        {benefitSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6 pb-6 border-b border-gray-200 last:border-0 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">Benefit Heading</label>
                <input 
                  placeholder="e.g., LOUNGE ACCESS, TRAVEL BENEFITS, CASHBACK" 
                  value={section.heading} 
                  onChange={(e) => handleBenefitHeadingChange(sectionIndex, e.target.value)} 
                  className="w-full p-2 border rounded-lg font-medium text-teal-700 uppercase"
                />
              </div>
              {benefitSections.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeBenefitSection(sectionIndex)} 
                  className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Remove this benefit category"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="ml-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Sub Benefits / Details</label>
              {section.subPoints.map((point, pointIndex) => (
                <div key={pointIndex} className="flex gap-2 mb-2">
                  <input 
                    placeholder={`e.g., ${section.heading ? '4 Domestic, 5% cashback, etc.' : 'Add benefit detail...'}`}
                    value={point.text} 
                    onChange={(e) => handleBenefitChange(sectionIndex, pointIndex, e.target.value)} 
                    className="flex-1 p-2 border rounded-lg text-sm bg-white"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeBenefitSubPoint(sectionIndex, pointIndex)} 
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addBenefitSubPoint(sectionIndex)} 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm mt-2"
              >
                <Plus className="w-3 h-3" /> Add sub benefit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Charges */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Summary Charges</h3>
        {formData.summaryCharges.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-3 gap-2 mb-2">
            <input placeholder="Label" value={item.label} onChange={(e) => handleArrayChange('summaryCharges', index, 'label', e.target.value)} className="p-2 border rounded-lg" />
            <input placeholder="Main Text" value={item.mainText} onChange={(e) => handleArrayChange('summaryCharges', index, 'mainText', e.target.value)} className="p-2 border rounded-lg" />
            <input placeholder="Sub Text" value={item.subText} onChange={(e) => handleArrayChange('summaryCharges', index, 'subText', e.target.value)} className="p-2 border rounded-lg" />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('summaryCharges', { label: '', mainText: '', subText: '' })} className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><Plus className="w-4 h-4" /> Add Charge</button>
      </div>

      {/* Required Documents */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Required Documents</h3>
        {formData.requiredDocuments.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-2 gap-2 mb-2">
            <input placeholder="Title" value={item.title} onChange={(e) => handleArrayChange('requiredDocuments', index, 'title', e.target.value)} className="p-2 border rounded-lg" />
            <input placeholder="Description" value={item.description} onChange={(e) => handleArrayChange('requiredDocuments', index, 'description', e.target.value)} className="p-2 border rounded-lg" />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('requiredDocuments', { title: '', description: '' })} className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><Plus className="w-4 h-4" /> Add Document</button>
      </div>

      {/* Process Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Process Steps</h3>
        {formData.processSteps.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-2 gap-2 mb-2">
            <input placeholder="Step Title" value={item.title} onChange={(e) => handleArrayChange('processSteps', index, 'title', e.target.value)} className="p-2 border rounded-lg" />
            <input placeholder="Description" value={item.description} onChange={(e) => handleArrayChange('processSteps', index, 'description', e.target.value)} className="p-2 border rounded-lg" />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('processSteps', { title: '', description: '' })} className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><Plus className="w-4 h-4" /> Add Step</button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold">
          {isEditing ? 'Update Credit Card' : 'Create Credit Card'}
        </button>
      </div>
    </form>
  );
};

export default CreditCardForm;
