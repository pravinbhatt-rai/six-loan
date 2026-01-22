"use client";
import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import { Plus, X, Save, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api';

interface DebitCardFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function DebitCardForm({ initialData, isEdit = false }: DebitCardFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    slug: '',
    bankName: '',
    imageUrl: '',
    bankLogoUrl: '',
    
    // Card Specifications
    accountType: '', // "Savings", "Salary", "Current", "" (optional)
    cardNetwork: 'Visa', // "Visa", "Mastercard", "Rupay", "Visa/Mastercard"
    cardType: '', // "classic", "platinum", "gold", "premium", "business", "signature", ""
    annualFee: 0,
    issuanceFee: undefined as number | undefined,
    replacementFee: undefined as number | undefined,
    
    // Features & Benefits
    atmWithdrawalLimit: undefined as number | undefined,
    posLimit: undefined as number | undefined,
    onlineLimit: undefined as number | undefined,
    internationalUsage: false,
    contactless: false,
    loungeAccess: false,
    loungeAccessDetails: '',
    
    // Cashback & Rewards
    cashbackRate: undefined as number | undefined,
    rewardPoints: false,
    fuelSurcharge: false,
    
    // Insurance & Safety
    accidentInsurance: false,
    purchaseProtection: false,
    fraudProtection: true,
    zeroBilling: false,
    
    // Eligibility
    minimumBalance: undefined as number | undefined,
    minimumAge: 18,
    maximumAge: undefined as number | undefined,
    
    // Ratings & Recommendations
    rating: 0,
    recommended: false,
    bestFor: '',
    keyStatement: '',
    
    // Video & Links
    videoUrl: '',
    termsConditionsUrl: '',
    applyUrl: '',
  });

  const [bulletPoints, setBulletPoints] = useState<Array<{text: string, displayOrder: number}>>([{text: '', displayOrder: 0}]);
  const [keyFeatures, setKeyFeatures] = useState<Array<{icon?: string, title: string, description: string, displayOrder: number}>>([
    {title: '', description: '', displayOrder: 0}
  ]);
  const [offers, setOffers] = useState<Array<{
    merchant: string, 
    offerType: string, 
    title: string, 
    description: string, 
    offerValue: string, 
    validFrom?: string, 
    validTill?: string, 
    isActive: boolean,
    displayOrder: number
  }>>([
    {merchant: '', offerType: 'CASHBACK', title: '', description: '', offerValue: '', isActive: true, displayOrder: 0}
  ]);
  const [safetyFeatures, setSafetyFeatures] = useState<Array<{
    featureName: string, 
    description: string, 
    howToUse?: string, 
    displayOrder: number
  }>>([
    {featureName: '', description: '', displayOrder: 0}
  ]);

  // Populate form with initial data for editing
  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        bankName: initialData.bankName || '',
        imageUrl: initialData.imageUrl || '',
        bankLogoUrl: initialData.bankLogoUrl || '',
        accountType: initialData.accountType || '',
        cardNetwork: initialData.cardNetwork || 'Visa',
        cardType: initialData.cardType || '',
        annualFee: initialData.annualFee || 0,
        issuanceFee: initialData.issuanceFee || undefined,
        replacementFee: initialData.replacementFee || undefined,
        atmWithdrawalLimit: initialData.atmWithdrawalLimit || undefined,
        posLimit: initialData.posLimit || undefined,
        onlineLimit: initialData.onlineLimit || undefined,
        internationalUsage: initialData.internationalUsage || false,
        contactless: initialData.contactless || false,
        loungeAccess: initialData.loungeAccess || false,
        loungeAccessDetails: initialData.loungeAccessDetails || '',
        cashbackRate: initialData.cashbackRate || undefined,
        rewardPoints: initialData.rewardPoints || false,
        fuelSurcharge: initialData.fuelSurcharge || false,
        accidentInsurance: initialData.accidentInsurance || false,
        purchaseProtection: initialData.purchaseProtection || false,
        fraudProtection: initialData.fraudProtection ?? true,
        zeroBilling: initialData.zeroBilling || false,
        minimumBalance: initialData.minimumBalance || undefined,
        minimumAge: initialData.minimumAge || 18,
        maximumAge: initialData.maximumAge || undefined,
        rating: initialData.rating || 0,
        recommended: initialData.recommended || false,
        bestFor: initialData.bestFor || '',
        keyStatement: initialData.keyStatement || '',
        videoUrl: initialData.videoUrl || '',
        termsConditionsUrl: initialData.termsConditionsUrl || '',
        applyUrl: initialData.applyUrl || '',
      });

      // Set related data
      if (initialData.bulletPoints && initialData.bulletPoints.length > 0) {
        setBulletPoints(initialData.bulletPoints.map((bp: any, index: number) => ({
          text: bp.text || '',
          displayOrder: bp.displayOrder || index
        })));
      }

      if (initialData.keyFeatures && initialData.keyFeatures.length > 0) {
        setKeyFeatures(initialData.keyFeatures.map((kf: any, index: number) => ({
          icon: kf.icon || '',
          title: kf.title || '',
          description: kf.description || '',
          displayOrder: kf.displayOrder || index
        })));
      }

      if (initialData.offers && initialData.offers.length > 0) {
        setOffers(initialData.offers.map((offer: any, index: number) => ({
          merchant: offer.merchant || '',
          offerType: offer.offerType || 'CASHBACK',
          title: offer.title || '',
          description: offer.description || '',
          offerValue: offer.offerValue || '',
          validFrom: offer.validFrom ? new Date(offer.validFrom).toISOString().split('T')[0] : '',
          validTill: offer.validTill ? new Date(offer.validTill).toISOString().split('T')[0] : '',
          isActive: offer.isActive ?? true,
          displayOrder: offer.displayOrder || index
        })));
      }

      if (initialData.safetyFeatures && initialData.safetyFeatures.length > 0) {
        setSafetyFeatures(initialData.safetyFeatures.map((sf: any, index: number) => ({
          featureName: sf.featureName || '',
          description: sf.description || '',
          howToUse: sf.howToUse || '',
          displayOrder: sf.displayOrder || index
        })));
      }
    }
  }, [initialData, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      const numValue = value === '' ? undefined : parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Auto-generate slug from name
    if (name === 'name' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  // Bullet Points handlers
  const addBulletPoint = () => {
    const newOrder = bulletPoints.length;
    setBulletPoints([...bulletPoints, {text: '', displayOrder: newOrder}]);
  };

  const removeBulletPoint = (index: number) => {
    const updated = bulletPoints.filter((_, i) => i !== index);
    const reordered = updated.map((item, idx) => ({...item, displayOrder: idx}));
    setBulletPoints(reordered);
  };

  const updateBulletPoint = (index: number, value: string) => {
    const updated = [...bulletPoints];
    updated[index] = { ...updated[index], text: value };
    setBulletPoints(updated);
  };

  // Key Features handlers
  const addKeyFeature = () => {
    const newOrder = keyFeatures.length;
    setKeyFeatures([...keyFeatures, {title: '', description: '', displayOrder: newOrder}]);
  };

  const removeKeyFeature = (index: number) => {
    const updated = keyFeatures.filter((_, i) => i !== index);
    const reordered = updated.map((item, idx) => ({...item, displayOrder: idx}));
    setKeyFeatures(reordered);
  };

  const updateKeyFeature = (index: number, field: string, value: string) => {
    const updated = [...keyFeatures];
    updated[index] = { ...updated[index], [field]: value };
    setKeyFeatures(updated);
  };

  // Offers handlers
  const addOffer = () => {
    const newOrder = offers.length;
    setOffers([...offers, {
      merchant: '', 
      offerType: 'CASHBACK', 
      title: '', 
      description: '', 
      offerValue: '', 
      isActive: true,
      displayOrder: newOrder
    }]);
  };

  const removeOffer = (index: number) => {
    const updated = offers.filter((_, i) => i !== index);
    const reordered = updated.map((item, idx) => ({...item, displayOrder: idx}));
    setOffers(reordered);
  };

  const updateOffer = (index: number, field: string, value: any) => {
    const updated = [...offers];
    updated[index] = { ...updated[index], [field]: value };
    setOffers(updated);
  };

  // Safety Features handlers
  const addSafetyFeature = () => {
    const newOrder = safetyFeatures.length;
    setSafetyFeatures([...safetyFeatures, {featureName: '', description: '', displayOrder: newOrder}]);
  };

  const removeSafetyFeature = (index: number) => {
    const updated = safetyFeatures.filter((_, i) => i !== index);
    const reordered = updated.map((item, idx) => ({...item, displayOrder: idx}));
    setSafetyFeatures(reordered);
  };

  const updateSafetyFeature = (index: number, field: string, value: string) => {
    const updated = [...safetyFeatures];
    updated[index] = { ...updated[index], [field]: value };
    setSafetyFeatures(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in');
        router.push('/login');
        return;
      }

      // Filter out empty values for arrays
      const payload = {
        ...formData,
        bulletPoints: bulletPoints.filter(b => b.text.trim()).map((b, idx) => ({
          text: b.text,
          displayOrder: idx
        })),
        keyFeatures: keyFeatures.filter(f => f.title.trim()).map((f, idx) => ({
          icon: f.icon || undefined,
          title: f.title,
          description: f.description,
          displayOrder: idx
        })),
        offers: offers.filter(o => o.title.trim()).map((o, idx) => ({
          merchant: o.merchant,
          offerType: o.offerType,
          title: o.title,
          description: o.description,
          offerValue: o.offerValue,
          validFrom: o.validFrom || undefined,
          validTill: o.validTill || undefined,
          isActive: o.isActive,
          displayOrder: idx
        })),
        safetyFeatures: safetyFeatures.filter(s => s.featureName.trim()).map((s, idx) => ({
          featureName: s.featureName,
          description: s.description,
          howToUse: s.howToUse || undefined,
          displayOrder: idx
        }))
      };

      // Remove undefined values from formData
      Object.keys(payload).forEach(key => {
        if (payload[key as keyof typeof payload] === undefined || payload[key as keyof typeof payload] === '') {
          delete payload[key as keyof typeof payload];
        }
      });

      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit 
        ? `${API_BASE_URL}/api/admin/debit-cards/${initialData.id}`
        : `${API_BASE_URL}/api/admin/debit-cards`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(`Debit card ${isEdit ? 'updated' : 'created'} successfully!`);
        router.push('/dashboard/debit-cards');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || `Failed to ${isEdit ? 'update' : 'create'} debit card`}`);
      }
    } catch (error) {
      console.error('Error creating debit card:', error);
      alert('An error occurred while creating the debit card');
    } finally {
      setLoading(false);
    }
  };

  // Options for dropdowns
  const accountTypeOptions = ['', 'Savings', 'Salary', 'Current', 'Premium'];
  const cardTypeOptions = ['', 'classic', 'platinum', 'gold', 'premium', 'business', 'signature'];
  const cardNetworkOptions = ['Visa', 'Mastercard', 'Rupay', 'Visa/Mastercard'];
  const offerTypeOptions = ['CASHBACK', 'DISCOUNT', 'REWARD_POINTS', 'FUEL', 'LOUNGE', 'OTHER'];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-teal-500 pb-2">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="e.g., HDFC Platinum Debit Card"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="hdfc-platinum-debit-card"
            />
            <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (auto-generated)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name *</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="HDFC Bank"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
            >
              {accountTypeOptions.map(type => (
                <option key={type} value={type}>
                  {type === '' ? 'Select Type' : type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Network *</label>
            <select
              name="cardNetwork"
              value={formData.cardNetwork}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
            >
              {cardNetworkOptions.map(network => (
                <option key={network} value={network}>{network}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Type</label>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
            >
              {cardTypeOptions.map(type => (
                <option key={type} value={type}>
                  {type === '' ? 'Select Type' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Statement</label>
          <textarea
            name="keyStatement"
            value={formData.keyStatement}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
            placeholder="Brief description of the card's main benefits"
          />
        </div>
      </div>

      {/* Images */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-teal-500 pb-2">Images</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Image URL *</label>
            <div className="flex gap-2">
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="https://example.com/card-image.jpg"
              />
             <ImageUpload
  label="Card Image"
  value={formData.imageUrl}
  onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Logo URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                name="bankLogoUrl"
                value={formData.bankLogoUrl}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="https://example.com/bank-logo.png"
              />
             <ImageUpload
  label="Card Image"
  value={formData.bankLogoUrl}
  onChange={(url) => setFormData(prev => ({ ...prev, bankLogoUrl: url }))}
 />
            </div>
          </div>
        </div>
      </div>

      {/* Fees */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-teal-500 pb-2">Fees</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Fee (₹)</label>
            <input
              type="number"
              name="annualFee"
              value={formData.annualFee}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issuance Fee (₹)</label>
            <input
              type="number"
              name="issuanceFee"
              value={formData.issuanceFee || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                setFormData(prev => ({ ...prev, issuanceFee: value }));
              }}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Replacement Fee (₹)</label>
            <input
              type="number"
              name="replacementFee"
              value={formData.replacementFee || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                setFormData(prev => ({ ...prev, replacementFee: value }));
              }}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      {/* Limits */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-teal-500 pb-2">Transaction Limits (₹)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ATM Withdrawal Limit</label>
            <input
              type="number"
              name="atmWithdrawalLimit"
              value={formData.atmWithdrawalLimit || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                setFormData(prev => ({ ...prev, atmWithdrawalLimit: value }));
              }}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">POS Limit</label>
            <input
              type="number"
              name="posLimit"
              value={formData.posLimit || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                setFormData(prev => ({ ...prev, posLimit: value }));
              }}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Online Limit</label>
            <input
              type="number"
              name="onlineLimit"
              value={formData.onlineLimit || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                setFormData(prev => ({ ...prev, onlineLimit: value }));
              }}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-teal-500 pb-2">Features</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'internationalUsage', label: 'International Usage' },
            { name: 'contactless', label: 'Contactless Payments' },
            { name: 'loungeAccess', label: 'Lounge Access' },
            { name: 'rewardPoints', label: 'Reward Points' },
            { name: 'fuelSurcharge', label: 'Fuel Surcharge Waiver' },
            { name: 'accidentInsurance', label: 'Accident Insurance' },
            { name: 'purchaseProtection', label: 'Purchase Protection' },
            { name: 'fraudProtection', label: 'Fraud Protection' },
            { name: 'zeroBilling', label: 'Zero Liability' },
            { name: 'recommended', label: 'Recommended Card' },
          ].map(feature => (
            <label key={feature.name} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name={feature.name}
                checked={formData[feature.name as keyof typeof formData] as boolean}
                onChange={handleChange}
                className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{feature.label}</span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.loungeAccess && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lounge Access Details</label>
              <input
                type="text"
                name="loungeAccessDetails"
                value={formData.loungeAccessDetails}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="e.g., 4 complimentary visits per quarter"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cashback Rate (%)</label>
            <input
              type="number"
              name="cashbackRate"
              value={formData.cashbackRate || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                setFormData(prev => ({ ...prev, cashbackRate: value }));
              }}
              min="0"
              max="100"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="5"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Best For</label>
            <input
              type="text"
              name="bestFor"
              value={formData.bestFor}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="e.g., cashback, travel, shopping"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="https://youtube.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions URL</label>
            <input
              type="url"
              name="termsConditionsUrl"
              value={formData.termsConditionsUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="https://bank.com/terms"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Apply URL</label>
            <input
              type="url"
              name="applyUrl"
              value={formData.applyUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="https://bank.com/apply"
            />
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-teal-500 pb-2">Eligibility</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Balance (₹)</label>
            <input
              type="number"
              name="minimumBalance"
              value={formData.minimumBalance || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                setFormData(prev => ({ ...prev, minimumBalance: value }));
              }}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Age</label>
            <input
              type="number"
              name="minimumAge"
              value={formData.minimumAge}
              onChange={handleChange}
              min="18"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Age</label>
            <input
              type="number"
              name="maximumAge"
              value={formData.maximumAge || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : parseInt(e.target.value);
                setFormData(prev => ({ ...prev, maximumAge: value }));
              }}
              min="18"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      {/* Bullet Points */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Bullet Points</h2>
          <button
            type="button"
            onClick={addBulletPoint}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Point
          </button>
        </div>
        
        {bulletPoints.map((point, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={point.text}
              onChange={(e) => updateBulletPoint(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              placeholder={`Bullet point ${index + 1}`}
            />
            {bulletPoints.length > 1 && (
              <button
                type="button"
                onClick={() => removeBulletPoint(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Key Features */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Key Features</h2>
          <button
            type="button"
            onClick={addKeyFeature}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>
        
        {keyFeatures.map((feature, index) => (
          <div key={index} className="border border-gray-200 p-4 space-y-3 rounded">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-700">Feature {index + 1}</span>
              {keyFeatures.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeKeyFeature(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={feature.icon || ''}
                onChange={(e) => updateKeyFeature(index, 'icon', e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="Icon name (lucide-react)"
              />
              <input
                type="text"
                value={feature.title}
                onChange={(e) => updateKeyFeature(index, 'title', e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="Feature title"
              />
              <input
                type="text"
                value={feature.description}
                onChange={(e) => updateKeyFeature(index, 'description', e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="Feature description"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Offers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Special Offers</h2>
          <button
            type="button"
            onClick={addOffer}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Offer
          </button>
        </div>
        
        {offers.map((offer, index) => (
          <div key={index} className="border border-gray-200 p-4 space-y-3 rounded">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-700">Offer {index + 1}</span>
              {offers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOffer(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={offer.merchant}
                onChange={(e) => updateOffer(index, 'merchant', e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="Merchant name"
              />
              <select
                value={offer.offerType}
                onChange={(e) => updateOffer(index, 'offerType', e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
              >
                {offerTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="text"
                value={offer.title}
                onChange={(e) => updateOffer(index, 'title', e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="Offer title"
              />
              <input
                type="text"
                value={offer.offerValue}
                onChange={(e) => updateOffer(index, 'offerValue', e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="Offer value (e.g., 10% off)"
              />
              <input
                type="date"
                value={offer.validFrom || ''}
                onChange={(e) => updateOffer(index, 'validFrom', e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="Valid from"
              />
              <input
                type="date"
                value={offer.validTill || ''}
                onChange={(e) => updateOffer(index, 'validTill', e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="Valid till"
              />
            </div>
            <div>
              <textarea
                value={offer.description}
                onChange={(e) => updateOffer(index, 'description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                rows={2}
                placeholder="Offer description"
              />
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={offer.isActive}
                  onChange={(e) => updateOffer(index, 'isActive', e.target.checked)}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Active offer</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Features */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Safety Features</h2>
          <button
            type="button"
            onClick={addSafetyFeature}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Safety Feature
          </button>
        </div>
        
        {safetyFeatures.map((feature, index) => (
          <div key={index} className="border border-gray-200 p-4 space-y-3 rounded">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-700">Safety Feature {index + 1}</span>
              {safetyFeatures.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSafetyFeature(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={feature.featureName}
                onChange={(e) => updateSafetyFeature(index, 'featureName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                placeholder="Feature name"
              />
              <textarea
                value={feature.description}
                onChange={(e) => updateSafetyFeature(index, 'description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                rows={2}
                placeholder="Description"
              />
              <textarea
                value={feature.howToUse || ''}
                onChange={(e) => updateSafetyFeature(index, 'howToUse', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded"
                rows={2}
                placeholder="How to use"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium rounded"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Create Debit Card
            </>
          )}
        </button>
      </div>
    </form>
  );
}