"use client";
import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

// Helper functions for date conversion
const formatDateToDisplay = (isoDate: string) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const parseDateFromDisplay = (displayDate: string) => {
  if (!displayDate) return '';
  const parts = displayDate.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return displayDate;
};

interface CreditCardApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankName?: string;
  bankLogo?: string;
  productId?: number;
  cardType?: 'standard' | 'premium' | 'secured' | 'student' | 'business' | 'addon' | 'nri' | 'hni';
  categorySlug?: string;
  categoryName?: string;
}

const CreditCardApplicationModal: React.FC<CreditCardApplicationModalProps> = ({
  isOpen,
  onClose,
  bankName = "sixloans",
  bankLogo = "/six-finance.png",
  productId,
  cardType = 'standard',
  categorySlug,
  categoryName,
}) => {
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [referenceNo, setReferenceNo] = useState<string>('');

  // Common Fields (All Cards)
  const [applicantName, setApplicantName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [panNumber, setPanNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [employmentType, setEmploymentType] = useState<string>('salaried');
  const [employerName, setEmployerName] = useState<string>('');
  const [residentialAddress, setResidentialAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [hasExistingCards, setHasExistingCards] = useState<string>('no');
  const [desiredCreditLimit, setDesiredCreditLimit] = useState<string>('');

  // Premium/Lifetime Free Cards
  const [existingBankRelationship, setExistingBankRelationship] = useState<string>('no');
  const [approximateCreditScore, setApproximateCreditScore] = useState<string>('');

  // Secured Credit Cards
  const [fdAmount, setFdAmount] = useState<string>('');
  const [fdTenure, setFdTenure] = useState<string>('12');
  const [fdAccountNumber, setFdAccountNumber] = useState<string>('');

  // Student Credit Cards
  const [studentId, setStudentId] = useState<string>('');
  const [collegeName, setCollegeName] = useState<string>('');
  const [courseNameForCard, setCourseNameForCard] = useState<string>('');
  const [yearOfStudy, setYearOfStudy] = useState<string>('1');
  const [parentAnnualIncome, setParentAnnualIncome] = useState<string>('');

  // Business Credit Cards
  const [businessRegistrationNo, setBusinessRegistrationNo] = useState<string>('');
  const [businessTurnover, setBusinessTurnover] = useState<string>('');
  const [businessAddress, setBusinessAddress] = useState<string>('');
  const [businessPan, setBusinessPan] = useState<string>('');

  // Add-on Cards
  const [primaryCardholderName, setPrimaryCardholderName] = useState<string>('');
  const [relationshipWithPrimary, setRelationshipWithPrimary] = useState<string>('');
  const [addonDob, setAddonDob] = useState<string>('');

  // NRI Cards
  const [passportNumber, setPassportNumber] = useState<string>('');
  const [visaType, setVisaType] = useState<string>('');
  const [visaValidity, setVisaValidity] = useState<string>('');
  const [overseasAddress, setOverseasAddress] = useState<string>('');
  const [overseasIncome, setOverseasIncome] = useState<string>('');
  const [nreNroDetails, setNreNroDetails] = useState<string>('');

  // HNI Cards
  const [approximateNetWorth, setApproximateNetWorth] = useState<string>('');
  const [majorInvestments, setMajorInvestments] = useState<string>('');

  // Reset handler
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setError('');
        setIsSubmitting(false);
        // Reset all fields
        setApplicantName('');
        setDateOfBirth('');
        setPanNumber('');
        setEmail('');
        setMobileNumber('');
        setAnnualIncome('');
        setEmploymentType('salaried');
        setEmployerName('');
        setResidentialAddress('');
        setCity('');
        setPincode('');
        setHasExistingCards('no');
        setDesiredCreditLimit('');
        setReferenceNo('');
      }, 200);
      return () => clearTimeout(timer);
    } else {
      fetchUserProfile();
    }
  }, [isOpen]);

  const fetchUserProfile = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        // Profile API returns { user } directly, not { success, user }
        if (data.user) {
          if (data.user.name) setApplicantName(data.user.name);
          if (data.user.phone) setMobileNumber(data.user.phone.replace(/^\+91\s*/, ''));
          if (data.user.email) setEmail(data.user.email);
          if (data.user.panCard) setPanNumber(data.user.panCard);
          if (data.user.annualIncome) setAnnualIncome(data.user.annualIncome.toString());
          if (data.user.currentEmployer) setEmployerName(data.user.currentEmployer);
          if (data.user.address) setResidentialAddress(data.user.address);
          if (data.user.city) setCity(data.user.city);
          if (data.user.pincode) setPincode(data.user.pincode);
          if (data.user.dob) setDateOfBirth(new Date(data.user.dob).toISOString().split('T')[0]);
          
          // Map employment type
          if (data.user.employmentType) {
            const empType = data.user.employmentType.toLowerCase();
            if (empType === 'salaried') setEmploymentType('salaried');
            else if (empType === 'business') setEmploymentType('business');
            else if (empType === 'self_employed') setEmploymentType('salaried');
          }
        }
      }
    } catch (error) {
      console.log('Could not fetch profile:', error);
    }
  };

  // Validators
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);
  const validatePan = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  // Get total steps based on card type
  const getTotalSteps = () => {
    switch (cardType) {
      case 'secured': return 5; // Basic + Employment + Address + Secured Details + Review
      case 'student': return 5; // Basic + Student Details + Parent Income + Address + Review
      case 'business': return 5; // Basic + Employment + Business Details + Address + Review
      case 'addon': return 3; // Primary Cardholder + Add-on Details + Review
      case 'nri': return 6; // Basic + Employment + Address + NRI Details + Financial + Review
      case 'hni': return 5; // Basic + Employment + Address + Wealth Details + Review
      case 'premium':
      case 'standard':
      default: return 5; // Basic + Employment + Address + Card Preferences + Review
    }
  };

  const getStepTitle = () => {
    if (step === getTotalSteps()) return 'Review & Submit';

    switch (cardType) {
      case 'addon':
        if (step === 1) return 'Primary Cardholder Details';
        if (step === 2) return 'Add-on Applicant Details';
        break;
      case 'student':
        if (step === 1) return 'Personal Information';
        if (step === 2) return 'Student Details';
        if (step === 3) return 'Parent/Guardian Information';
        if (step === 4) return 'Address Details';
        break;
      case 'secured':
        if (step === 1) return 'Personal Information';
        if (step === 2) return 'Employment Details';
        if (step === 3) return 'Address Details';
        if (step === 4) return 'Fixed Deposit Details';
        break;
      case 'business':
        if (step === 1) return 'Personal Information';
        if (step === 2) return 'Employment Details';
        if (step === 3) return 'Business Details';
        if (step === 4) return 'Address Details';
        break;
      case 'nri':
        if (step === 1) return 'Personal Information';
        if (step === 2) return 'Employment Details';
        if (step === 3) return 'Address Details';
        if (step === 4) return 'NRI Details';
        if (step === 5) return 'Financial Details';
        break;
      case 'hni':
        if (step === 1) return 'Personal Information';
        if (step === 2) return 'Employment Details';
        if (step === 3) return 'Address Details';
        if (step === 4) return 'Wealth Information';
        break;
      default:
        if (step === 1) return 'Personal Information';
        if (step === 2) return 'Employment Details';
        if (step === 3) return 'Address Details';
        if (step === 4) return 'Card Preferences';
    }
    return '';
  };

  const handleNext = () => {
    setError('');

    // Step 1 validation (Personal Info for most cards)
    if (step === 1 && cardType !== 'addon') {
      if (!applicantName.trim() || applicantName.length < 2) {
        setError('Please enter your full name (minimum 2 characters)');
        return;
      }
      if (!dateOfBirth) {
        setError('Please select your date of birth');
        return;
      }
      if (!validatePan(panNumber)) {
        setError('Invalid PAN Number format. Example: ABCDE1234F');
        return;
      }
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }
      if (!validateMobile(mobileNumber)) {
        setError('Please enter a valid 10-digit mobile number starting with 6-9');
        return;
      }
      setStep(2);
      return;
    }

    // Add-on card step 1 validation
    if (step === 1 && cardType === 'addon') {
      if (!primaryCardholderName.trim()) {
        setError('Please enter primary cardholder name');
        return;
      }
      if (!relationshipWithPrimary) {
        setError('Please select relationship with primary cardholder');
        return;
      }
      setStep(2);
      return;
    }

    // Step 2 validation
    if (step === 2) {
      if (cardType === 'addon') {
        if (!applicantName.trim()) {
          setError('Please enter add-on applicant name');
          return;
        }
        if (!addonDob) {
          setError('Please select date of birth');
          return;
        }
        if (!validateMobile(mobileNumber)) {
          setError('Please enter a valid mobile number');
          return;
        }
        if (!validateEmail(email)) {
          setError('Please enter a valid email');
          return;
        }
        setStep(3);
        return;
      }

      if (cardType === 'student') {
        if (!studentId.trim()) {
          setError('Please enter student ID');
          return;
        }
        if (!collegeName.trim()) {
          setError('Please enter college/university name');
          return;
        }
        if (!courseNameForCard.trim()) {
          setError('Please enter course name');
          return;
        }
        if (!yearOfStudy) {
          setError('Please select year of study');
          return;
        }
        setStep(3);
        return;
      }

      // Employment validation for other card types
      if (!annualIncome || parseFloat(annualIncome) <= 0) {
        setError('Please enter valid annual income');
        return;
      }
      if (!employmentType) {
        setError('Please select employment type');
        return;
      }
      if (!employerName.trim()) {
        setError('Please enter employer/business name');
        return;
      }
      setStep(3);
      return;
    }

    // Step 3 validation
    if (step === 3) {
      if (cardType === 'addon') {
        // Submit for addon
        submitApplication();
        return;
      }

      if (cardType === 'student') {
        if (!parentAnnualIncome || parseFloat(parentAnnualIncome) <= 0) {
          setError('Please enter parent/guardian annual income');
          return;
        }
        setStep(4);
        return;
      }

      if (cardType === 'business') {
        if (!businessRegistrationNo.trim()) {
          setError('Please enter business registration number');
          return;
        }
        if (!businessTurnover || parseFloat(businessTurnover) <= 0) {
          setError('Please enter business turnover');
          return;
        }
        if (!businessAddress.trim()) {
          setError('Please enter business address');
          return;
        }
        if (!validatePan(businessPan)) {
          setError('Invalid business PAN format');
          return;
        }
        setStep(4);
        return;
      }

      // Address validation
      if (!residentialAddress.trim()) {
        setError('Please enter residential address');
        return;
      }
      if (!city.trim()) {
        setError('Please enter city');
        return;
      }
      if (!pincode || pincode.length !== 6) {
        setError('Please enter valid 6-digit pincode');
        return;
      }
      setStep(4);
      return;
    }

    // Step 4 validation
    if (step === 4) {
      if (cardType === 'student') {
        // Address validation for student
        if (!residentialAddress.trim() || !city.trim() || pincode.length !== 6) {
          setError('Please complete address details');
          return;
        }
        setStep(5);
        return;
      }

      if (cardType === 'secured') {
        if (!fdAmount || parseFloat(fdAmount) <= 0) {
          setError('Please enter FD amount');
          return;
        }
        if (!fdTenure) {
          setError('Please select FD tenure');
          return;
        }
        if (!fdAccountNumber.trim()) {
          setError('Please enter FD account number');
          return;
        }
        setStep(5);
        return;
      }

      if (cardType === 'nri') {
        if (!passportNumber.trim()) {
          setError('Please enter passport number');
          return;
        }
        if (!visaType.trim()) {
          setError('Please enter visa type');
          return;
        }
        if (!visaValidity) {
          setError('Please enter visa validity date');
          return;
        }
        if (!overseasAddress.trim()) {
          setError('Please enter overseas address');
          return;
        }
        setStep(5);
        return;
      }

      if (cardType === 'hni') {
        if (!approximateNetWorth || parseFloat(approximateNetWorth) <= 0) {
          setError('Please enter approximate net worth');
          return;
        }
        if (!majorInvestments.trim()) {
          setError('Please describe your major investments');
          return;
        }
        setStep(5);
        return;
      }

      // Card preferences for standard/premium
      if (!desiredCreditLimit || parseFloat(desiredCreditLimit) <= 0) {
        setError('Please enter desired credit limit');
        return;
      }
      setStep(5);
      return;
    }

    // Step 5 - NRI Financial Details
    if (step === 5 && cardType === 'nri') {
      if (!overseasIncome || parseFloat(overseasIncome) <= 0) {
        setError('Please enter overseas income');
        return;
      }
      if (!nreNroDetails.trim()) {
        setError('Please enter NRE/NRO account details');
        return;
      }
      setStep(6);
      return;
    }

    // Final step - Submit
    submitApplication();
  };

  const handleBack = () => {
    setError('');
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const applicationData: any = {
        // Common fields
        name: applicantName.trim(),
        email: email.trim(),
        phone: mobileNumber,
        panNumber: panNumber.toUpperCase(),
        dob: parseDateFromDisplay(dateOfBirth),
        employmentType: employmentType.toUpperCase(),
        annualIncome: parseFloat(annualIncome) || 0,
        employerName: employerName.trim(),
        currentAddress: residentialAddress.trim(),
        city: city.trim(),
        pincode,
        hasExistingCreditCards: hasExistingCards === 'yes',
        desiredCreditLimit: parseFloat(desiredCreditLimit) || 0,
        productId: productId || null,
        productType: 'CREDIT_CARD',
        categorySlug,
        categoryName,
        cardType,
      };

      // Add card-type specific fields
      switch (cardType) {
        case 'premium':
        case 'standard':
          applicationData.existingBankingRelationship = existingBankRelationship === 'yes';
          if (approximateCreditScore) applicationData.cibilScore = parseInt(approximateCreditScore);
          break;

        case 'secured':
          applicationData.fdAmount = parseFloat(fdAmount);
          applicationData.fdTenure = parseInt(fdTenure);
          applicationData.fdAccountNumber = fdAccountNumber;
          break;

        case 'student':
          applicationData.studentId = studentId;
          applicationData.collegeName = collegeName;
          applicationData.courseNameForCard = courseNameForCard;
          applicationData.yearOfStudy = yearOfStudy;
          applicationData.parentAnnualIncome = parseFloat(parentAnnualIncome);
          break;

        case 'business':
          applicationData.businessRegistrationNo = businessRegistrationNo;
          applicationData.businessTurnoverForCard = parseFloat(businessTurnover);
          applicationData.businessAddressForCard = businessAddress;
          applicationData.businessPan = businessPan.toUpperCase();
          break;

        case 'addon':
          applicationData.primaryCardholderName = primaryCardholderName;
          applicationData.relationshipWithPrimary = relationshipWithPrimary;
          applicationData.addonApplicantDob = parseDateFromDisplay(addonDob);
          break;

        case 'nri':
          applicationData.passportNumber = passportNumber;
          applicationData.visaType = visaType;
          applicationData.visaValidity = visaValidity;
          applicationData.overseasAddress = overseasAddress;
          applicationData.overseasIncome = parseFloat(overseasIncome);
          applicationData.nreNroDetails = nreNroDetails;
          break;

        case 'hni':
          applicationData.approximateNetWorth = parseFloat(approximateNetWorth);
          applicationData.majorInvestments = majorInvestments;
          break;
      }

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers,
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Failed to submit application');
      }

      const result = await response.json();
      setReferenceNo(result.referenceNo || `REF${Date.now().toString().slice(-8)}`);
      setStep(getTotalSteps() + 1); // Success step
    } catch (error: any) {
      console.error('Application submission error:', error);
      setError(error.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const totalSteps = getTotalSteps();
  const isSuccessStep = step === totalSteps + 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#f0f2f5] w-full max-w-[500px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {!isSuccessStep && (
            <div className="mb-6 pr-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-black font-bold text-sm mb-1 uppercase tracking-wider opacity-70">
                    {categoryName || 'Credit Card Application'}
                  </h3>
                  <h2 className="text-teal-600 text-3xl font-serif font-bold tracking-wide leading-tight">
                    {getStepTitle()}
                  </h2>
                </div>
                <div className="text-xs font-bold bg-teal-100 text-teal-700 px-2 py-1 rounded">
                  Step {step}/{totalSteps}
                </div>
              </div>
            </div>
          )}

          <div className={`${isSuccessStep ? '' : 'min-h-[300px]'}`}>
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}

            {/* Success Step */}
            {isSuccessStep && (
              <div className="flex flex-col items-center justify-center text-center pt-2 pb-6 animate-in fade-in zoom-in">
                <div className="h-28 flex items-center justify-center">
                  <img src={bankLogo} alt={bankName} className="h-full object-contain" />
                </div>
                <h2 className="text-[#0f172a] text-2xl font-bold tracking-wide uppercase">Application Submitted!</h2>
                <div className="w-16 h-1 bg-[#fbbf24] mt-2 mb-6 rounded-full"></div>
                
                <div className="relative mb-6 px-4 w-full">
                  <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg tracking-wider shadow-2xl border-2 border-teal-400">
                    <div className="text-xs font-medium uppercase tracking-widest opacity-90 mb-1">Reference Number</div>
                    <div className="text-2xl font-extrabold tracking-wide">{referenceNo}</div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                <div className="space-y-4 px-2 mb-8">
                  <p className="text-gray-800 text-sm font-medium leading-relaxed">
                    Your credit card application has been successfully submitted. Our team will contact you within 24 hours.
                  </p>
                </div>
                <button onClick={onClose} className="w-full py-3 bg-teal-500 text-white rounded-lg font-bold text-lg hover:bg-teal-600 transition-colors shadow-lg">
                  Close
                </button>
              </div>
            )}

            {/* Step 1 - Personal Info (Most Cards) */}
            {!isSuccessStep && step === 1 && cardType !== 'addon' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Full Name</label>
                  <input type="text" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} placeholder="Enter your full name" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white capitalize" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Date of Birth</label>
                  <input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder="DD/MM/YYYY" maxLength={10} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">PAN Card Number</label>
                  <input type="text" maxLength={10} value={panNumber} onChange={(e) => setPanNumber(e.target.value.toUpperCase())} placeholder="ABCDE1234F" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white font-mono tracking-wide" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                    <input type="tel" maxLength={10} value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))} placeholder="Enter 10-digit Number" className="w-full p-3 pl-12 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1 - Add-on Card Primary Cardholder */}
            {!isSuccessStep && step === 1 && cardType === 'addon' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Primary Cardholder's Name</label>
                  <input type="text" value={primaryCardholderName} onChange={(e) => setPrimaryCardholderName(e.target.value)} placeholder="Enter primary cardholder name" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white capitalize" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Relationship with Primary Cardholder</label>
                  <select value={relationshipWithPrimary} onChange={(e) => setRelationshipWithPrimary(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white">
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="sibling">Sibling</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2 - Employment Details / Student Details / Add-on Details */}
            {!isSuccessStep && step === 2 && cardType === 'addon' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Add-on Applicant's Full Name</label>
                  <input type="text" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} placeholder="Enter full name" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white capitalize" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Date of Birth</label>
                  <input type="text" value={addonDob} onChange={(e) => setAddonDob(e.target.value)} placeholder="DD/MM/YYYY" maxLength={10} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Mobile Number</label>
                  <input type="tel" maxLength={10} value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))} placeholder="Enter 10-digit Number" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
              </div>
            )}

            {!isSuccessStep && step === 2 && cardType === 'student' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Student ID Number</label>
                  <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Enter student ID" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">College/University Name</label>
                  <input type="text" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder="Enter college name" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Course Name</label>
                  <input type="text" value={courseNameForCard} onChange={(e) => setCourseNameForCard(e.target.value)} placeholder="e.g., B.Tech, MBA" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Year of Study</label>
                  <select value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white">
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                  </select>
                </div>
              </div>
            )}

            {!isSuccessStep && step === 2 && cardType !== 'addon' && cardType !== 'student' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Annual Income</label>
                  <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} placeholder="Enter annual income in ₹" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Employment Type</label>
                  <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white">
                    <option value="salaried">Salaried</option>
                    <option value="self_employed">Self-employed</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Current Employer/Business Name</label>
                  <input type="text" value={employerName} onChange={(e) => setEmployerName(e.target.value)} placeholder="Enter employer/business name" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white capitalize" />
                </div>
              </div>
            )}

            {/* Step 3 - Address / Business / Parent Income */}
            {!isSuccessStep && step === 3 && cardType === 'student' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Parent's Annual Income</label>
                  <input type="number" value={parentAnnualIncome} onChange={(e) => setParentAnnualIncome(e.target.value)} placeholder="Enter parent's income in ₹" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
              </div>
            )}

            {!isSuccessStep && step === 3 && cardType === 'business' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Business Registration Number</label>
                  <input type="text" value={businessRegistrationNo} onChange={(e) => setBusinessRegistrationNo(e.target.value)} placeholder="Enter registration number" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Business Turnover</label>
                  <input type="number" value={businessTurnover} onChange={(e) => setBusinessTurnover(e.target.value)} placeholder="Enter turnover in ₹" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Business Address</label>
                  <textarea value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} placeholder="Enter business address" rows={3} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Business PAN Card Number</label>
                  <input type="text" maxLength={10} value={businessPan} onChange={(e) => setBusinessPan(e.target.value.toUpperCase())} placeholder="ABCDE1234F" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white font-mono" />
                </div>
              </div>
            )}

            {!isSuccessStep && step === 3 && cardType !== 'addon' && cardType !== 'student' && cardType !== 'business' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Residential Address</label>
                  <textarea value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)} placeholder="Enter complete address" rows={3} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 text-sm font-bold mb-1 block">City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-bold mb-1 block">Pincode</label>
                    <input type="text" maxLength={6} value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))} placeholder="6-digit PIN" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 - Card Preferences / FD Details / Address / NRI */}
            {!isSuccessStep && step === 4 && (cardType === 'standard' || cardType === 'premium') && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Desired Credit Limit</label>
                  <input type="number" value={desiredCreditLimit} onChange={(e) => setDesiredCreditLimit(e.target.value)} placeholder="Enter amount in ₹" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Any existing credit cards?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input type="radio" value="yes" checked={hasExistingCards === 'yes'} onChange={(e) => setHasExistingCards(e.target.value)} className="mr-2" />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input type="radio" value="no" checked={hasExistingCards === 'no'} onChange={(e) => setHasExistingCards(e.target.value)} className="mr-2" />
                      No
                    </label>
                  </div>
                </div>
                {cardType === 'premium' && (
                  <>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Existing banking relationship?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input type="radio" value="yes" checked={existingBankRelationship === 'yes'} onChange={(e) => setExistingBankRelationship(e.target.value)} className="mr-2" />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input type="radio" value="no" checked={existingBankRelationship === 'no'} onChange={(e) => setExistingBankRelationship(e.target.value)} className="mr-2" />
                          No
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Approximate Credit Score (if known)</label>
                      <select value={approximateCreditScore} onChange={(e) => setApproximateCreditScore(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white">
                        <option value="">Select Range</option>
                        <option value="600">600-700</option>
                        <option value="725">700-750</option>
                        <option value="775">750+</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            )}

            {!isSuccessStep && step === 4 && cardType === 'secured' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Fixed Deposit Amount</label>
                  <input type="number" value={fdAmount} onChange={(e) => setFdAmount(e.target.value)} placeholder="Enter FD amount in ₹" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">FD Tenure</label>
                  <select value={fdTenure} onChange={(e) => setFdTenure(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white">
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                    <option value="36">36 Months</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">FD Account Number</label>
                  <input type="text" value={fdAccountNumber} onChange={(e) => setFdAccountNumber(e.target.value)} placeholder="Enter FD account number" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
              </div>
            )}

            {!isSuccessStep && step === 4 && (cardType === 'student' || cardType === 'business') && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Residential Address</label>
                  <textarea value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)} placeholder="Enter complete address" rows={3} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 text-sm font-bold mb-1 block">City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-bold mb-1 block">Pincode</label>
                    <input type="text" maxLength={6} value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))} placeholder="6-digit PIN" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                  </div>
                </div>
              </div>
            )}

            {!isSuccessStep && step === 4 && cardType === 'nri' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Passport Number</label>
                  <input type="text" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} placeholder="Enter passport number" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Visa Type</label>
                  <input type="text" value={visaType} onChange={(e) => setVisaType(e.target.value)} placeholder="e.g., H1B, L1, Student" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Visa Validity</label>
                  <input type="date" value={visaValidity} onChange={(e) => setVisaValidity(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Overseas Address</label>
                  <textarea value={overseasAddress} onChange={(e) => setOverseasAddress(e.target.value)} placeholder="Enter overseas address" rows={3} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
              </div>
            )}

            {!isSuccessStep && step === 4 && cardType === 'hni' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Approximate Net Worth</label>
                  <input type="number" value={approximateNetWorth} onChange={(e) => setApproximateNetWorth(e.target.value)} placeholder="Enter net worth in ₹" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Major Investments</label>
                  <textarea value={majorInvestments} onChange={(e) => setMajorInvestments(e.target.value)} placeholder="List your major investments (property, stocks, etc.)" rows={4} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
              </div>
            )}

            {/* Step 5 - NRI Financial */}
            {!isSuccessStep && step === 5 && cardType === 'nri' && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">Overseas Income (Annual)</label>
                  <input type="number" value={overseasIncome} onChange={(e) => setOverseasIncome(e.target.value)} placeholder="Enter income in ₹" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-1 block">NRE/NRO Account Details</label>
                  <input type="text" value={nreNroDetails} onChange={(e) => setNreNroDetails(e.target.value)} placeholder="Enter account details" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" />
                </div>
              </div>
            )}

            {/* Review & Submit Step - Final Step for All Cards */}
            {!isSuccessStep && step === getTotalSteps() && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Review Your Details</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-semibold text-gray-900">{applicantName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-gray-900">{email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Mobile:</span>
                      <span className="font-semibold text-gray-900">{mobileNumber}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">PAN Number:</span>
                      <span className="font-semibold text-gray-900">{panNumber}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Annual Income:</span>
                      <span className="font-semibold text-gray-900">₹{annualIncome ? parseFloat(annualIncome).toLocaleString() : '0'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Employment Type:</span>
                      <span className="font-semibold text-gray-900 capitalize">{employmentType}</span>
                    </div>
                    {employerName && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Employer:</span>
                        <span className="font-semibold text-gray-900">{employerName}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">City:</span>
                      <span className="font-semibold text-gray-900">{city}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Desired Credit Limit:</span>
                      <span className="font-semibold text-gray-900">₹{desiredCreditLimit ? parseFloat(desiredCreditLimit).toLocaleString() : '0'}</span>
                    </div>
                    
                    {/* Card-specific details */}
                    {cardType === 'secured' && fdAmount && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">FD Amount:</span>
                        <span className="font-semibold text-gray-900">₹{parseFloat(fdAmount).toLocaleString()}</span>
                      </div>
                    )}
                    {cardType === 'student' && collegeName && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">College:</span>
                        <span className="font-semibold text-gray-900">{collegeName}</span>
                      </div>
                    )}
                    {cardType === 'business' && businessRegistrationNo && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Business Reg. No:</span>
                        <span className="font-semibold text-gray-900">{businessRegistrationNo}</span>
                      </div>
                    )}
                    {cardType === 'addon' && primaryCardholderName && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Primary Cardholder:</span>
                        <span className="font-semibold text-gray-900">{primaryCardholderName}</span>
                      </div>
                    )}
                    {cardType === 'nri' && passportNumber && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Passport:</span>
                        <span className="font-semibold text-gray-900">{passportNumber}</span>
                      </div>
                    )}
                    {cardType === 'hni' && approximateNetWorth && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Net Worth:</span>
                        <span className="font-semibold text-gray-900">₹{parseFloat(approximateNetWorth).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800">
                      <strong>Note:</strong> Please review all details carefully before submitting. Our team will verify the information and contact you within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isSuccessStep && (
            <div className="mt-8 flex justify-between items-center w-full pt-4 border-t border-gray-200">
              <button onClick={handleBack} className="px-5 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-2 hover:bg-gray-200">
                Back
              </button>
              <button onClick={handleNext} disabled={isSubmitting} className="px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-white shadow-lg bg-teal-500 hover:bg-teal-600 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : step === totalSteps ? 'Submit Application' : 'Next Step'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCardApplicationModal;
