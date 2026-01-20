"use client";
import React, { useState, useEffect, useMemo } from 'react';

// Make sure API_BASE_URL is correctly set for Next.js API routes
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

// --- STATIC DATA ---
const companyOptions = [
  "Tata Consultancy Services (TCS)", "Infosys", "Reliance Industries", "HDFC Bank",
  "ICICI Bank", "Wipro", "HCL Technologies", "State Bank of India (SBI)",
  "Bharti Airtel", "Larsen & Toubro (L&T)", "Tech Mahindra", "Axis Bank",
  "Maruti Suzuki", "Kotak Mahindra Bank", "Adani Enterprises", "Asian Paints",
  "Bajaj Finance", "Hindustan Unilever (HUL)", "ITC Limited", "Titan Company",
  "Sun Pharmaceutical", "Nestle India", "Power Grid Corporation", "NTPC Limited",
  "Tata Steel", "Google India", "Microsoft India", "Amazon Development Centre",
  "Accenture", "Capgemini", "Cognizant", "IBM India", "Deloitte", "PwC",
  "KPMG", "Ernst & Young (EY)", "Flipkart", "Zomato", "Swiggy", "Paytm"
];

const allCityOptions = [
  { id: 'delhi', label: 'Delhi' }, { id: 'mumbai', label: 'Mumbai' },
  { id: 'bangalore', label: 'Bangalore' }, { id: 'kolkata', label: 'Kolkata' },
  { id: 'jaipur', label: 'Jaipur' }, { id: 'pune', label: 'Pune' },
  { id: 'ahmedabad', label: 'Ahmedabad' }, { id: 'chennai', label: 'Chennai' },
  { id: 'hyderabad', label: 'Hyderabad' }, { id: 'surat', label: 'Surat' },
  { id: 'lucknow', label: 'Lucknow' }, { id: 'kanpur', label: 'Kanpur' },
  { id: 'nagpur', label: 'Nagpur' }, { id: 'indore', label: 'Indore' },
  { id: 'patna', label: 'Patna' },
];

const workExperienceOptions = [
  { id: 'less_1', label: 'Less than 1 Year' },
  { id: '1_3', label: '1 - 3 Years' },
  { id: '3_5', label: '3 - 5 Years' },
  { id: '5_10', label: '5 - 10 Years' },
  { id: '10_plus', label: '10+ Years' },
];

interface EmploymentTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankName?: string;
  bankLogo?: string;
  productId?: number;
  productType?: 'LOAN' | 'INSURANCE' | 'LOAN_AGAINST_SECURITY';
  requiresDocumentUpload?: boolean;
  categorySlug?: string;
  categoryName?: string;
  loanSlug?: string;
}

const EmploymentTypeModal: React.FC<EmploymentTypeModalProps> = ({
  isOpen,
  onClose,
  bankName = "sixloans",
  bankLogo = "/six-finance.png",
  productId,
  productType = 'LOAN',
  requiresDocumentUpload = false,
  categorySlug,
  categoryName,
  loanSlug
}) => {
  // --- STATE ---
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [selectedEmployment, setSelectedEmployment] = useState<string>('salaried');
  const [selectedIncome, setSelectedIncome] = useState<string>('');
  
  // Step 3 State
  const [employerName, setEmployerName] = useState<string>('');
  const [workExperience, setWorkExperience] = useState<string>(''); 
  const [showCompanySuggestions, setShowCompanySuggestions] = useState<boolean>(false);
  const [isExpDropdownOpen, setIsExpDropdownOpen] = useState<boolean>(false);

  const [selectedResidence, setSelectedResidence] = useState<string>('self');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [citySearchTerm, setCitySearchTerm] = useState<string>('');
  const [isSearchingCity, setIsSearchingCity] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>('');
  const [selectedLoanAmount, setSelectedLoanAmount] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [panNumber, setPanNumber] = useState<string>('');
  const [applicantName, setApplicantName] = useState<string>('');
  const [referenceNo, setReferenceNo] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [currentAddress, setCurrentAddress] = useState<string>('');
  
  // Personal Loan Fields
  const [loanPurpose, setLoanPurpose] = useState<string>('');
  
  // Home Loan Fields
  const [propertyAddress, setPropertyAddress] = useState<string>('');
  const [propertyValue, setPropertyValue] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('residential');
  const [constructionStatus, setConstructionStatus] = useState<string>('ready');
  
  // Loan Against Property Fields
  const [existingLoanOnProperty, setExistingLoanOnProperty] = useState<string>('no');
  const [isSalaried, setIsSalaried] = useState<string>('yes');
  const [yearsInBusiness, setYearsInBusiness] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('');
  
  // Business Loan Fields
  const [registeredBusinessName, setRegisteredBusinessName] = useState<string>('');
  const [businessTypeForLoan, setBusinessTypeForLoan] = useState<string>('proprietorship');
  const [yearsInOperation, setYearsInOperation] = useState<string>('');
  const [businessTurnover, setBusinessTurnover] = useState<string>('');
  const [businessPurpose, setBusinessPurpose] = useState<string>('expansion');
  const [currentLoans, setCurrentLoans] = useState<string>('');
  const [businessPan, setBusinessPan] = useState<string>('');
  const [gstNumber, setGstNumber] = useState<string>('');
  const [industryType, setIndustryType] = useState<string>('service');
  
  // Education Loan Fields
  const [studentName, setStudentName] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [universityName, setUniversityName] = useState<string>('');
  const [courseDuration, setCourseDuration] = useState<string>('');
  const [totalCourseFees, setTotalCourseFees] = useState<string>('');
  const [parentIncome, setParentIncome] = useState<string>('');
  const [admissionStatus, setAdmissionStatus] = useState<string>('confirmed');
  const [admissionSecured, setAdmissionSecured] = useState<string>('yes');
  
  // Vehicle Loan Fields
  const [vehicleMake, setVehicleMake] = useState<string>('');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [vehicleVariant, setVehicleVariant] = useState<string>('');
  const [exShowroomPrice, setExShowroomPrice] = useState<string>('');
  const [vehicleTenure, setVehicleTenure] = useState<string>('60');
  const [exchangeVehicle, setExchangeVehicle] = useState<string>('no');
  const [registrationCity, setRegistrationCity] = useState<string>('');
  const [vehicleUsage, setVehicleUsage] = useState<string>('personal');
  const [manufactureYear, setManufactureYear] = useState<string>('');
  const [registrationYear, setRegistrationYear] = useState<string>('');
  const [currentMarketValue, setCurrentMarketValue] = useState<string>('');
  const [kilometersDriven, setKilometersDriven] = useState<string>('');
  const [sellerInfo, setSellerInfo] = useState<string>('');
  const [rcAvailable, setRcAvailable] = useState<string>('yes');
  const [vehicleCondition, setVehicleCondition] = useState<string>('excellent');
  const [engineCapacity, setEngineCapacity] = useState<string>('');
  const [engineCondition, setEngineCondition] = useState<string>('good');
  const [applicantAge, setApplicantAge] = useState<string>('');
  
  // Professional Loan Fields
  const [professionalQualification, setProfessionalQualification] = useState<string>('ca');
  const [yearsOfPractice, setYearsOfPractice] = useState<string>('');
  const [clinicOfficeAddress, setClinicOfficeAddress] = useState<string>('');
  const [professionalIncome, setProfessionalIncome] = useState<string>('');
  const [professionalPurpose, setProfessionalPurpose] = useState<string>('equipment');
  const [registrationNumber, setRegistrationNumber] = useState<string>('');
  
  // Loan Against Security Fields
  const [securityType, setSecurityType] = useState<string>('shares');
  const [securityValue, setSecurityValue] = useState<string>('');
  const [portfolioDetails, setPortfolioDetails] = useState<string>('');
  const [desiredLTV, setDesiredLTV] = useState<string>('50');
  const [dematAccountNo, setDematAccountNo] = useState<string>('');
  const [brokerName, setBrokerName] = useState<string>('');
  
  // Transfer Loan Fields
  const [currentLender, setCurrentLender] = useState<string>('');
  const [outstandingAmount, setOutstandingAmount] = useState<string>('');
  const [currentInterestRate, setCurrentInterestRate] = useState<string>('');
  const [remainingTenure, setRemainingTenure] = useState<string>('');
  const [currentEMI, setCurrentEMI] = useState<string>('');
  const [cibilScore, setCibilScore] = useState<string>('');
  const [transferReason, setTransferReason] = useState<string>('');

  // --- RESET HANDLER ---
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1); 
        setError('');
        setIsSubmitting(false);
        setSelectedEmployment('salaried'); 
        setSelectedIncome('');
        setEmployerName(''); 
        setWorkExperience('');
        setShowCompanySuggestions(false); 
        setIsExpDropdownOpen(false);
        setSelectedResidence('self'); 
        setSelectedCity('');
        setCitySearchTerm(''); 
        setIsSearchingCity(false);
        setPincode(''); 
        setSelectedLoanAmount('');
        setMobileNumber(''); 
        setEmail(''); 
        setPanNumber(''); 
        setApplicantName(''); 
        setReferenceNo('');
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // Pre-fill from saved profile when modal opens
      fetchUserProfile();
    }
  }, [isOpen]);

  // --- FETCH USER PROFILE TO PRE-FILL ---
  const fetchUserProfile = async () => {
    try {
      // Try to get token first for authenticated users
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      let response;
      if (token) {
        // Use token-based authentication
        response = await fetch(`${API_BASE_URL}/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } else {
        // Fall back to query parameter method
        const userEmail = localStorage.getItem('userEmail');
        const userPhone = localStorage.getItem('userPhone');
        const userId = localStorage.getItem('userId');
        
        // If no identifier, skip pre-filling
        if (!userEmail && !userPhone && !userId) return;
        
        // Build query parameter
        let queryParam = '';
        if (userId) {
          queryParam = `userId=${userId}`;
        } else if (userEmail) {
          queryParam = `email=${encodeURIComponent(userEmail)}`;
        } else if (userPhone) {
          queryParam = `phone=${encodeURIComponent(userPhone)}`;
        }

        response = await fetch(`${API_BASE_URL}/api/users/profile?${queryParam}`);
      }

      if (response.ok) {
        const data = await response.json();
        // Profile API returns { user } directly, not { success, user }
        if (data.user) {
          // Map employment type from backend to frontend format
          const mapToFrontendEmployment = (type: string): string => {
            switch(type.toLowerCase()) {
              case 'salaried': return 'salaried';
              case 'business': return 'business';
              case 'self_employed': return 'professional';
              default: return 'salaried';
            }
          };

          // Pre-fill employment details - use correct field names from API
          if (data.user.employmentType) {
            setSelectedEmployment(mapToFrontendEmployment(data.user.employmentType));
          }
          if (data.user.currentEmployer) setEmployerName(data.user.currentEmployer);
          if (data.user.workExperience) setWorkExperience(data.user.workExperience);
          if (data.user.residenceType) setSelectedResidence(data.user.residenceType);
          
          // Pre-fill contact details
          if (data.user.phone) setMobileNumber(data.user.phone.replace(/^\+91\s*/, ''));
          if (data.user.email) setEmail(data.user.email);
          if (data.user.panCard) setPanNumber(data.user.panCard);
          if (data.user.name) setApplicantName(data.user.name);
          if (data.user.dob) setDateOfBirth(formatDateToDisplay(data.user.dob));
          if (data.user.address) setCurrentAddress(data.user.address);
          
          // Pre-fill monthly income if available
          if (data.user.monthlyIncome) {
            const income = data.user.monthlyIncome;
            if (income <= 300000) setSelectedIncome('upto3');
            else if (income <= 400000) setSelectedIncome('3-4');
            else if (income <= 500000) setSelectedIncome('4-5');
            else if (income <= 1000000) setSelectedIncome('5-10');
            else setSelectedIncome('10plus');
          }
          
          // Pre-fill address
          if (data.user.city) {
            // Find city ID from label
            const cityObj = allCityOptions.find(c => 
              c.label.toLowerCase() === data.user.city.toLowerCase()
            );
            if (cityObj) {
              setSelectedCity(cityObj.id);
              setCitySearchTerm(cityObj.label);
            } else {
              // If city not in list, use as custom city
              setCitySearchTerm(data.user.city);
            }
          }
          if (data.user.pincode) setPincode(data.user.pincode);
        }
      }
    } catch (error) {
      console.log('Could not fetch profile for pre-fill:', error);
    }
  };

  // --- ERROR CLEAR HANDLER ---
  useEffect(() => {
    if (error) setError('');
  }, [selectedEmployment, selectedIncome, employerName, workExperience, selectedResidence, selectedCity, pincode, selectedLoanAmount, mobileNumber, email, panNumber, applicantName]);

  // --- MEMOIZED DATA ---
  const displayedCities = useMemo(() => {
    if (!citySearchTerm) return allCityOptions.slice(0, 8); 
    return allCityOptions.filter(c => 
      c.label.toLowerCase().includes(citySearchTerm.toLowerCase())
    );
  }, [citySearchTerm]);

  const displayedCompanies = useMemo(() => {
    if (!employerName) return [];
    return companyOptions.filter(c => 
      c.toLowerCase().includes(employerName.toLowerCase())
    ).slice(0, 5);
  }, [employerName]);

  // --- VALIDATORS ---
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile); 
  const validatePan = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  // --- DATA MAPPING FUNCTIONS ---
  const mapEmploymentType = (typeId: string): string => {
    switch(typeId) {
      case 'salaried': return 'SALARIED';
      case 'business': return 'BUSINESS';
      case 'professional': return 'SELF_EMPLOYED';
      default: return 'SALARIED';
    }
  };

  const getIncomeValue = (incomeId: string): number => {
    switch(incomeId) {
      case 'upto3': return 300000;
      case '3-4': return 350000;
      case '4-5': return 450000;
      case '5-10': return 750000;
      case '10plus': return 1000000;
      default: return 0;
    }
  };

  const getLoanAmountValue = (loanId: string): number => {
    switch(loanId) {
      case 'upto1': return 100000;
      case '1-5': return 300000;
      case '5-10': return 750000;
      case '10-15': return 1250000;
      case '15-20': return 1750000;
      case '20plus': return 2500000;
      default: return 0;
    }
  };

  const mapWorkExperience = (expId: string): string => {
    switch(expId) {
      case 'less_1': return 'Less than 1 Year';
      case '1_3': return '1 - 3 Years';
      case '3_5': return '3 - 5 Years';
      case '5_10': return '5 - 10 Years';
      case '10_plus': return '10+ Years';
      default: return expId;
    }
  };

  const mapResidenceType = (resId: string): string => {
    switch(resId) {
      case 'self': return 'OWNED';
      case 'parent': return 'OWNED';
      case 'rented': return 'RENTED';
      case 'pg': return 'RENTED';
      case 'company': return 'COMPANY_PROVIDED';
      default: return 'RENTED';
    }
  };

  const getCityLabel = (cityId: string): string => {
    // If citySearchTerm has a custom value (not in list), use it
    if (citySearchTerm && !allCityOptions.find(c => c.label.toLowerCase() === citySearchTerm.toLowerCase())) {
      return citySearchTerm;
    }
    const city = allCityOptions.find(c => c.id === cityId);
    return city?.label || citySearchTerm || cityId;
  };

  // --- SUBMIT APPLICATION FUNCTION ---
  const submitApplication = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Prepare base application data (fields common to all loan types)
      const applicationData: any = {
        name: applicantName.trim(),
        email: email.trim(),
        phone: mobileNumber,
        panNumber: panNumber.toUpperCase(),
        dob: parseDateFromDisplay(dateOfBirth) || null,
        employmentType: mapEmploymentType(selectedEmployment),
        monthlyIncome: getIncomeValue(selectedIncome),
        employerName: employerName.trim(),
        workExperience: mapWorkExperience(workExperience),
        residenceType: mapResidenceType(selectedResidence),
        currentAddress: currentAddress || null,
        city: getCityLabel(selectedCity),
        pincode,
        loanAmount: getLoanAmountValue(selectedLoanAmount),
        productId: productId || null,
        productType: productType === 'LOAN_AGAINST_SECURITY' ? 'LOAN' : productType,
        categorySlug,
        categoryName,
        loanSlug,
        documents: [],
        education: education || null,
      };

      // Filter and add category-specific fields based on loan type
      const slug = (categorySlug || loanSlug || '').toLowerCase();

      // Personal Loan
      if (slug.includes('personal')) {
        if (loanPurpose) applicationData.loanPurpose = loanPurpose;
      }
      
      // Home Loan
      else if (slug.includes('home') || slug.includes('housing')) {
        if (propertyAddress) applicationData.propertyAddress = propertyAddress;
        if (propertyValue) applicationData.propertyValue = propertyValue;
        if (downPayment) applicationData.downPayment = downPayment;
        if (propertyType) applicationData.propertyType = propertyType;
        if (constructionStatus) applicationData.constructionStatus = constructionStatus;
      }
      
      // Loan Against Property
      else if (slug.includes('property') || slug.includes('lap')) {
        if (propertyAddress) applicationData.propertyAddress = propertyAddress;
        if (propertyValue) applicationData.propertyValue = propertyValue;
        if (existingLoanOnProperty) applicationData.existingLoanOnProperty = existingLoanOnProperty;
        if (propertyType) applicationData.propertyType = propertyType;
      }
      
      // Business Loan
      else if (slug.includes('business')) {
        if (registeredBusinessName) applicationData.registeredBusinessName = registeredBusinessName;
        if (businessTypeForLoan) applicationData.businessTypeForLoan = businessTypeForLoan;
        if (yearsInOperation) applicationData.yearsInOperation = yearsInOperation;
        if (businessTurnover) applicationData.businessTurnover = businessTurnover;
        if (businessPurpose) applicationData.businessPurpose = businessPurpose;
        if (currentLoans) applicationData.currentLoans = currentLoans;
        if (businessPan) applicationData.businessPan = businessPan;
        if (gstNumber) applicationData.gstNumber = gstNumber;
        if (industryType) applicationData.industryType = industryType;
      }
      
      // Education Loan
      else if (slug.includes('education') || slug.includes('student')) {
        if (studentName) applicationData.studentName = studentName;
        if (courseName) applicationData.courseName = courseName;
        if (universityName) applicationData.universityName = universityName;
        if (courseDuration) applicationData.courseDuration = courseDuration;
        if (totalCourseFees) applicationData.totalCourseFees = totalCourseFees;
        if (parentIncome) applicationData.parentIncome = parentIncome;
        if (admissionStatus) applicationData.admissionStatus = admissionStatus;
        if (admissionSecured) applicationData.admissionSecured = admissionSecured;
      }
      
      // Vehicle Loans (Car/Bike)
      else if (slug.includes('car') || slug.includes('bike') || slug.includes('vehicle')) {
        if (vehicleMake) applicationData.vehicleMake = vehicleMake;
        if (vehicleModel) applicationData.vehicleModel = vehicleModel;
        if (vehicleVariant) applicationData.vehicleVariant = vehicleVariant;
        if (exShowroomPrice) applicationData.exShowroomPrice = exShowroomPrice;
        if (vehicleTenure) applicationData.vehicleTenure = vehicleTenure;
        if (exchangeVehicle) applicationData.exchangeVehicle = exchangeVehicle;
        if (registrationCity) applicationData.registrationCity = registrationCity;
        if (vehicleUsage) applicationData.vehicleUsage = vehicleUsage;
        if (manufactureYear) applicationData.manufactureYear = manufactureYear;
        if (registrationYear) applicationData.registrationYear = registrationYear;
        if (currentMarketValue) applicationData.currentMarketValue = currentMarketValue;
        if (kilometersDriven) applicationData.kilometersDriven = kilometersDriven;
        if (sellerInfo) applicationData.sellerInfo = sellerInfo;
        if (rcAvailable) applicationData.rcAvailable = rcAvailable;
        if (vehicleCondition) applicationData.vehicleCondition = vehicleCondition;
        if (engineCapacity) applicationData.engineCapacity = engineCapacity;
        if (engineCondition) applicationData.engineCondition = engineCondition;
        if (applicantAge) applicationData.applicantAge = applicantAge;
      }
      
      // Professional Loan
      else if (slug.includes('professional') || slug.includes('doctor') || slug.includes('ca')) {
        if (professionalQualification) applicationData.professionalQualification = professionalQualification;
        if (yearsOfPractice) applicationData.yearsOfPractice = yearsOfPractice;
        if (clinicOfficeAddress) applicationData.clinicOfficeAddress = clinicOfficeAddress;
        if (professionalIncome) applicationData.professionalIncome = professionalIncome;
        if (professionalPurpose) applicationData.professionalPurpose = professionalPurpose;
        if (registrationNumber) applicationData.registrationNumber = registrationNumber;
      }
      
      // Loan Against Security
      else if (productType === 'LOAN_AGAINST_SECURITY' || slug.includes('security')) {
        if (securityType) applicationData.securityType = securityType;
        if (securityValue) applicationData.securityValue = securityValue;
        if (portfolioDetails) applicationData.portfolioDetails = portfolioDetails;
        if (desiredLTV) applicationData.desiredLTV = desiredLTV;
        if (dematAccountNo) applicationData.dematAccountNo = dematAccountNo;
        if (brokerName) applicationData.brokerName = brokerName;
      }
      
      // Transfer Loan
      else if (slug.includes('transfer') || slug.includes('balance-transfer')) {
        if (currentLender) applicationData.currentLender = currentLender;
        if (outstandingAmount) applicationData.outstandingAmount = outstandingAmount;
        if (currentInterestRate) applicationData.currentInterestRate = currentInterestRate;
        if (remainingTenure) applicationData.remainingTenure = remainingTenure;
        if (currentEMI) applicationData.currentEMI = currentEMI;
        if (cibilScore) applicationData.cibilScore = cibilScore;
        if (transferReason) applicationData.transferReason = transferReason;
      }

      console.log('Submitting application data:', applicationData);
      console.log('API Base URL:', API_BASE_URL);
      console.log('Full endpoint:', `${API_BASE_URL}/applications`);

      // Get token if available for authorization
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      // Build headers with optional authorization
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Send to backend API with optional token
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers,
        body: JSON.stringify(applicationData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        let errorMessage = 'Failed to submit application';
        let errorDetails = '';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
          errorDetails = JSON.stringify(errorData);
        } catch (e) {
          // Try to get text if not JSON
          try {
            errorDetails = await response.text();
          } catch (textError) {
            errorDetails = 'Could not read error response';
          }
        }
        
        console.error('Error details:', {
          status: response.status,
          statusText: response.statusText,
          details: errorDetails
        });
        
        // Add more specific error messages
        if (response.status === 400) {
          errorMessage = 'Invalid data. Please check your inputs.';
        } else if (response.status === 401) {
          errorMessage = 'Please login to continue.';
        } else if (response.status === 404) {
          errorMessage = 'API endpoint not found. Check if backend is running.';
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Success response:', result);

      // Set reference number
      if (result.referenceNo) {
        setReferenceNo(result.referenceNo);
      } else if (result.application?.id) {
        setReferenceNo(`REF${result.application.id.toString().padStart(8, '0')}`);
      }

      // Move to success screen (getTotalSteps() + 1 for 7-step, getTotalSteps() + 2 for 8-step loans)
      const totalSteps = getTotalSteps();
      if (totalSteps === 7) {
        setStep(9); // Step 8 = review, Step 9 = success
      } else {
        setStep(10); // Step 8 = category details, Step 9 = personal, Step 10 = success
      }
    } catch (error: any) {
      console.error('Application submission error:', error);
      
      let userMessage = error.message || 'Failed to submit application';
      
      // Network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        userMessage = 'Network error. Please check your connection and make sure backend server is running at ' + API_BASE_URL;
      } else if (error.message.includes('CORS')) {
        userMessage = 'CORS error. Please check backend CORS configuration.';
      }
      
      setError(userMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- NAVIGATION ---
  const handleNext = () => {
    setError('');
    const slug = (categorySlug || loanSlug || '').toLowerCase();
    const totalSteps = getTotalSteps();
    
    if (step === 1) {
      setStep(2);
    } else if (step === 2) { 
      if (!selectedIncome) { 
        setError('Please select your income range'); 
        return; 
      } 
      setStep(3); 
    } else if (step === 3) {
      if (!employerName.trim()) { 
        setError('Please enter your company name'); 
        return; 
      }
      if (employerName.length < 3) { 
        setError('Company name is too short'); 
        return; 
      }
      if (!workExperience) { 
        setError('Please select total work experience'); 
        return; 
      } 
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    } else if (step === 5) {
      // Validate city - allow either selected city or custom input
      if (!selectedCity && !citySearchTerm.trim()) { 
        setError('Please select a city or enter your city name'); 
        return; 
      }
      if (!pincode || pincode.length !== 6) { 
        setError('Please enter a valid 6-digit Pincode'); 
        return; 
      }
      setStep(6);
    } else if (step === 6) { 
      if (!selectedLoanAmount) { 
        setError('Please select required loan amount'); 
        return; 
      } 
      setStep(7); 
    } else if (step === 7) {
      // For 8-step loans: validate category-specific fields at step 7, then go to step 8 (personal details)
      if (totalSteps === 8) {
        // Business Loan validation
        if (slug.includes('business')) {
          if (!registeredBusinessName.trim()) {
            setError('Please enter your registered business name');
            return;
          }
          if (!yearsInOperation) {
            setError('Please enter years in operation');
            return;
          }
        }
        // Home Loan validation
        else if (slug.includes('home') || slug.includes('housing')) {
          if (!propertyAddress.trim()) {
            setError('Please enter property address');
            return;
          }
        }
        // Education Loan validation
        else if (slug.includes('education') || slug.includes('student')) {
          if (!studentName.trim()) {
            setError('Please enter student name');
            return;
          }
          if (!courseName.trim()) {
            setError('Please enter course name');
            return;
          }
        }
        // Vehicle Loan validation
        else if (slug.includes('car') || slug.includes('bike') || slug.includes('vehicle')) {
          if (!vehicleMake.trim()) {
            setError('Please enter vehicle make');
            return;
          }
          if (!vehicleModel.trim()) {
            setError('Please enter vehicle model');
            return;
          }
        }
        
        // Move to personal details (step 8)
        setStep(8);
      } else {
        // For 7-step loans (Personal Loan), step 7 is personal details - validate and go to review
        if (!applicantName || applicantName.trim().length < 2) {
          setError('Please enter your full name (minimum 2 characters)');
          return;
        }
        if (!validateMobile(mobileNumber)) { 
          setError('Please enter a valid 10-digit mobile number starting with 6-9'); 
          return; 
        }
        if (!validateEmail(email)) { 
          setError('Please enter a valid email address (e.g., name@example.com)'); 
          return; 
        }
        if (!validatePan(panNumber)) { 
          setError('Invalid PAN Number format. Example: ABCDE1234F'); 
          return; 
        }
        
        // Go to review step (step 8)
        setStep(8);
      }
    } else if (step === 8) {
      // For 8-step loans: validate personal details and go to review (step 9)
      // For 7-step loans: step 8 is review, submit application
      if (totalSteps === 8) {
        if (!applicantName || applicantName.trim().length < 2) {
          setError('Please enter your full name (minimum 2 characters)');
          return;
        }
        if (!validateMobile(mobileNumber)) { 
          setError('Please enter a valid 10-digit mobile number starting with 6-9'); 
          return; 
        }
        if (!validateEmail(email)) { 
          setError('Please enter a valid email address (e.g., name@example.com)'); 
          return; 
        }
        if (!validatePan(panNumber)) { 
          setError('Invalid PAN Number format. Example: ABCDE1234F'); 
          return; 
        }
        
        // Go to review step (step 9)
        setStep(9);
      } else {
        // For 7-step loans: step 8 is review, submit application
        submitApplication();
      }
    } else if (step === 9) {
      // For 8-step loans: step 9 is review, submit application
      submitApplication();
    }
  };

  const handleBack = () => { 
    setError(''); 
    const totalSteps = getTotalSteps();
    step > 1 && step < totalSteps + 1 ? setStep(step - 1) : onClose(); 
  };

  // Determine total steps based on category
  const getTotalSteps = () => {
    const slug = (categorySlug || loanSlug || '').toLowerCase();
    
    // Business Loan - needs extra business details step
    if (slug.includes('business')) return 8;
    
    // Home Loan - needs property details step
    if (slug.includes('home') || slug.includes('housing')) return 8;
    
    // Education Loan - needs student/course details step
    if (slug.includes('education') || slug.includes('student')) return 8;
    
    // Vehicle Loans - needs vehicle details step
    if (slug.includes('car') || slug.includes('bike') || slug.includes('vehicle')) return 8;
    
    // Loan Against Property - needs property details step
    if (slug.includes('property') || slug.includes('lap')) return 8;
    
    // Professional Loan - needs professional details step
    if (slug.includes('professional') || slug.includes('doctor') || slug.includes('ca')) return 8;
    
    // Loan Against Security - needs security details step
    if (productType === 'LOAN_AGAINST_SECURITY' || slug.includes('security')) return 8;
    
    // Transfer Loan - needs existing loan details step
    if (slug.includes('transfer') || slug.includes('balance-transfer')) return 8;
    
    // Default (Personal Loan) - standard 7 steps
    return 7;
  };

  const getTitle = () => {
    const slug = (categorySlug || loanSlug || '').toLowerCase();
    
    switch (step) {
      case 1: return 'Employment Type'; 
      case 2: return 'Yearly Income';
      case 3: return 'Employment Details'; 
      case 4: return 'Residence Type';
      case 5: return 'Resident City'; 
      case 6: return 'Desired Loan Amount';
      case 7: 
        // Step 7 title changes based on loan type
        if (slug.includes('business')) return 'Business Details';
        if (slug.includes('home') || slug.includes('housing')) return 'Property Details';
        if (slug.includes('education') || slug.includes('student')) return 'Education Details';
        if (slug.includes('car') || slug.includes('bike') || slug.includes('vehicle')) return 'Vehicle Details';
        if (slug.includes('property') || slug.includes('lap')) return 'Property Details';
        if (slug.includes('professional')) return 'Professional Details';
        if (productType === 'LOAN_AGAINST_SECURITY' || slug.includes('security')) return 'Security Details';
        if (slug.includes('transfer')) return 'Current Loan Details';
        return 'Personal Details';
      case 8: 
        if (slug.includes('business') || slug.includes('home') || slug.includes('housing') || 
            slug.includes('education') || slug.includes('student') || slug.includes('car') || 
            slug.includes('bike') || slug.includes('vehicle') || slug.includes('property') || 
            slug.includes('lap') || slug.includes('professional') || slug.includes('doctor') || 
            slug.includes('ca') || productType === 'LOAN_AGAINST_SECURITY' || 
            slug.includes('security') || slug.includes('transfer') || slug.includes('balance-transfer')) {
          return 'Personal Details';
        } else {
          return 'Review & Submit';
        }
      case 9: return 'Review & Submit';
      case 10: return 'Application Submitted';
      default: return '';
    }
  };

  if (!isOpen) return null;

  // --- DATA OPTIONS ---
  const employmentOptions = [
    { id: 'salaried', title: 'Salaried', subtitle: 'Fixed Salary received each Month' },
    { id: 'business', title: 'Self - Employed Business', subtitle: 'Run a Business' },
    { id: 'professional', title: 'Self - Employed Professional', subtitle: 'Engage in a Profession' },
  ];
  
  const incomeOptions = [
    { id: 'upto3', label: 'Up to 3 Lakhs' }, 
    { id: '3-4', label: '₹3 - ₹4 Lakh' },
    { id: '4-5', label: '₹4 - 5 Lakh' }, 
    { id: '5-10', label: '₹5- ₹10 Lakh' },
    { id: '10plus', label: '₹10 Lakhs +' },
  ];
  
  const residenceOptions = [
    { id: 'self', label: 'Own by Self/Spouse' }, 
    { id: 'parent', label: 'Own by Parent/Siblings' },
    { id: 'rented', label: 'Rented With Family / Stay Alone' }, 
    { id: 'pg', label: 'Paying Guest / Hostel / PG' },
    { id: 'company', label: 'Company Provided' },
  ];
  
  const loanAmountOptions = [
    { id: 'upto1', label: 'Up to 1 Lakhs' }, 
    { id: '1-5', label: '₹1 - ₹5 Lakh' },
    { id: '5-10', label: '₹5 - ₹10 Lakh' }, 
    { id: '10-15', label: '₹10- ₹15 Lakh' },
    { id: '15-20', label: '₹15- ₹20 Lakh' }, 
    { id: '20plus', label: '₹20 Lakhs +' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" role="dialog" aria-modal="true">
      <div className="bg-[#f0f2f5] w-full max-w-[500px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {(step < 9 || (step === 9 && getTotalSteps() === 8)) && (
            <div className="mb-6 pr-8">
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-black font-bold text-sm mb-1 uppercase tracking-wider opacity-70">
                      {categoryName || (productType === 'INSURANCE' ? 'Insurance' : productType === 'LOAN_AGAINST_SECURITY' ? 'Loan Against Security' : 'Personal Loan')}
                    </h3>
                    <h2 className="text-teal-600 text-3xl font-serif font-bold tracking-wide leading-tight">{getTitle()}</h2>
                  </div>
                  <div className="text-xs font-bold bg-teal-100 text-teal-700 px-2 py-1 rounded">Step {step}/{getTotalSteps()}</div>
              </div>
            </div>
          )}

          <div className={`${(step === 9 && getTotalSteps() === 7) || step === 10 ? '' : 'min-h-[300px]'}`}>
            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {error}
                </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                {employmentOptions.map((option) => (
                    <div 
                      key={option.id} 
                      onClick={() => setSelectedEmployment(option.id)} 
                      className={`cursor-pointer relative rounded-xl p-4 border-2 transition-all duration-200 flex items-center justify-between group ${
                        selectedEmployment === option.id 
                          ? 'border-teal-500 bg-white shadow-md' 
                          : 'border-gray-300 hover:border-gray-400 bg-transparent'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 text-lg">{option.title}</span>
                        <span className="text-gray-500 text-sm mt-1">{option.subtitle}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedEmployment === option.id ? 'border-teal-500' : 'border-gray-400'
                      }`}>
                        {selectedEmployment === option.id && <div className="w-3 h-3 rounded-full bg-teal-500" />}
                      </div>
                    </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incomeOptions.map((option) => (
                    <div 
                      key={option.id} 
                      onClick={() => setSelectedIncome(option.id)} 
                      className={`cursor-pointer relative rounded-xl p-4 border-2 transition-all duration-200 flex items-center justify-between h-16 ${
                        selectedIncome === option.id 
                          ? 'border-teal-500 bg-white shadow-md' 
                          : 'border-gray-300 hover:border-gray-400 bg-transparent'
                      }`}
                    >
                      <span className="font-medium text-gray-900 text-lg">{option.label}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${
                        selectedIncome === option.id ? 'border-teal-500' : 'border-gray-400'
                      }`}>
                        {selectedIncome === option.id && <div className="w-3 h-3 rounded-full bg-teal-500" />}
                      </div>
                    </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col pt-2 relative space-y-5">
                {/* 1. Company Name */}
                <div>
                    <label className="text-gray-800 text-lg font-medium mb-2 block">Company/Business Name</label>
                    <div className="relative">
                        <input 
                          type="text" 
                          value={employerName} 
                          onChange={(e) => { 
                            setEmployerName(e.target.value); 
                            setShowCompanySuggestions(true); 
                          }} 
                          onFocus={() => setShowCompanySuggestions(true)} 
                          placeholder="Type Company Name..." 
                          autoFocus 
                          className="w-full p-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-gray-800 placeholder:text-gray-400 text-lg bg-white shadow-sm transition-all capitalize" 
                        />
                        {showCompanySuggestions && employerName.length > 0 && displayedCompanies.length > 0 && (
                            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                {displayedCompanies.map((company, index) => (
                                    <div 
                                      key={index} 
                                      onClick={() => { 
                                        setEmployerName(company); 
                                        setShowCompanySuggestions(false); 
                                      }} 
                                      className="px-4 py-3 hover:bg-teal-50 cursor-pointer text-gray-700 text-sm font-medium border-b border-gray-100 last:border-0"
                                    >
                                      {company}
                                    </div>
                                ))}
                            </div>
                        )}
                        {showCompanySuggestions && <div className="fixed inset-0 z-10" onClick={() => setShowCompanySuggestions(false)} />}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-1">Start typing to select from top companies or enter your own.</p>
                </div>

                {/* 2. Total Work Experience */}
                <div>
                    <label className="text-gray-800 text-lg font-medium mb-2 block">Total Work Experience</label>
                    <div className="relative">
                        <div 
                            onClick={() => setIsExpDropdownOpen(!isExpDropdownOpen)}
                            className={`
                                w-full p-4 rounded-xl border cursor-pointer bg-white relative flex items-center justify-between shadow-sm transition-all
                                ${isExpDropdownOpen ? 'border-teal-500 ring-1 ring-teal-500' : 'border-gray-300 hover:border-gray-400'}
                            `}
                        >
                            <span className={`text-lg ${workExperience ? 'text-gray-800' : 'text-gray-400'}`}>
                                {workExperience 
                                    ? workExperienceOptions.find(opt => opt.id === workExperience)?.label 
                                    : "Select Total Years"
                                }
                            </span>
                            <div className={`text-gray-500 transition-transform duration-200 ${isExpDropdownOpen ? 'rotate-180' : ''}`}>
                                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                   <path d="M6 9l6 6 6-6"/>
                                 </svg>
                            </div>
                        </div>

                        {isExpDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-20" onClick={() => setIsExpDropdownOpen(false)} />
                                <div className="absolute z-30 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                    <div className="py-1">
                                        {workExperienceOptions.map((exp) => (
                                            <div 
                                                key={exp.id}
                                                onClick={() => { 
                                                  setWorkExperience(exp.id); 
                                                  setIsExpDropdownOpen(false); 
                                                }}
                                                className={`
                                                    px-5 py-3 cursor-pointer text-lg transition-colors
                                                    ${workExperience === exp.id 
                                                        ? 'bg-teal-50 text-teal-700 font-semibold' 
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                    }
                                                `}
                                            >
                                                {exp.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                {residenceOptions.map((option) => (
                    <div 
                      key={option.id} 
                      onClick={() => setSelectedResidence(option.id)} 
                      className={`cursor-pointer relative rounded-lg px-4 py-3 border-2 transition-all duration-200 flex items-center justify-between ${
                        selectedResidence === option.id 
                          ? 'border-teal-500 bg-white shadow-md text-teal-700' 
                          : 'border-gray-300 hover:border-gray-400 bg-transparent text-gray-600'
                      }`}
                    >
                      <span className={`text-lg ${selectedResidence === option.id ? 'font-semibold' : 'font-medium'}`}>
                        {option.label}
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${
                        selectedResidence === option.id ? 'border-teal-500' : 'border-gray-400'
                      }`}>
                        {selectedResidence === option.id && <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />}
                      </div>
                    </div>
                ))}
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col h-full">
                <div className="mb-4">
                    {!isSearchingCity ? (
                        <button 
                          onClick={() => setIsSearchingCity(true)} 
                          className="w-full py-2 border-2 border-dashed border-gray-400 rounded-xl text-gray-500 hover:border-teal-500 hover:text-teal-600 flex items-center justify-center gap-2 transition-colors"
                        >
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                               <circle cx="11" cy="11" r="8"></circle>
                               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                             </svg> 
                             Search Other City
                        </button>
                    ) : (
                        <div className="relative">
                            <input 
                              type="text" 
                              list="city-suggestions"
                              placeholder="Type city name or select from suggestions..." 
                              value={citySearchTerm} 
                              onChange={(e) => setCitySearchTerm(e.target.value)} 
                              autoFocus 
                              className="text-black w-full p-2 pl-10 rounded-lg border border-teal-500 outline-none" 
                            />
                            <datalist id="city-suggestions">
                              {allCityOptions.map((city) => (
                                <option key={city.id} value={city.label} />
                              ))}
                            </datalist>
                            <div className="absolute left-3 top-2.5 text-teal-500">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              </svg>
                            </div>
                            <button 
                              onClick={() => {
                                setIsSearchingCity(false); 
                                setCitySearchTerm('');
                              }} 
                              className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500"
                            >
                              &#x2715;
                            </button>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-[220px] overflow-y-auto custom-scrollbar">
                  {displayedCities.length > 0 ? displayedCities.map((option) => (
                      <div 
                        key={option.id} 
                        onClick={() => setSelectedCity(option.id)} 
                        className={`cursor-pointer relative rounded-xl px-4 py-3 border-2 transition-all duration-200 flex items-center justify-between ${
                          selectedCity === option.id 
                            ? 'border-teal-500 bg-white shadow-sm' 
                            : 'border-gray-300 hover:border-gray-400 bg-transparent'
                        }`}
                      >
                        <span className="font-medium text-gray-900 text-sm md:text-base">{option.label}</span> 
                        {selectedCity === option.id && <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0 ml-1" />}
                      </div>
                  )) : (
                    <div className="col-span-2 text-center text-gray-500 py-4">
                      No cities found
                    </div>
                  )}
                </div>
                <div className="mt-6">
                    <label className="text-gray-800 text-sm font-medium mb-1 block">Pin Code</label>
                    <input 
                      type="text" 
                      maxLength={6} 
                      value={pincode} 
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))} 
                      placeholder="Enter 6-digit Pincode" 
                      className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-gray-900 text-lg bg-white" 
                    />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loanAmountOptions.map((option) => (
                    <div 
                      key={option.id} 
                      onClick={() => setSelectedLoanAmount(option.id)} 
                      className={`cursor-pointer relative rounded-xl p-4 border-2 transition-all duration-200 flex items-center justify-between h-16 ${
                        selectedLoanAmount === option.id 
                          ? 'border-teal-500 bg-white shadow-md' 
                          : 'border-gray-300 hover:border-gray-400 bg-transparent'
                      }`}
                    >
                      <span className="font-medium text-gray-900 text-lg">{option.label}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${
                        selectedLoanAmount === option.id ? 'border-teal-500' : 'border-gray-400'
                      }`}>
                        {selectedLoanAmount === option.id && <div className="w-3 h-3 rounded-full bg-teal-500" />}
                      </div>
                    </div>
                ))}
              </div>
            )}

            {step === 7 && (() => {
              const slug = (categorySlug || loanSlug || '').toLowerCase();
              const totalSteps = getTotalSteps();
              
              // For Personal Loan (7 steps), show personal details at step 7
              if (totalSteps === 7) {
                return (
                  <div className="space-y-5 pt-2">
                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">Full Name</label>
                        <input 
                            type="text" 
                            value={applicantName} 
                            onChange={(e) => setApplicantName(e.target.value)} 
                            placeholder="Enter your full name" 
                            className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white capitalize" 
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">Mobile Number</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-lg">+91</span>
                            <input 
                              type="tel" 
                              maxLength={10} 
                              value={mobileNumber} 
                              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))} 
                              placeholder="Enter 10-digit Number" 
                              className="w-full p-3 pl-12 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">Email Address</label>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="name@example.com" 
                          className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" 
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">PAN Number</label>
                        <input 
                          type="text" 
                          maxLength={10} 
                          value={panNumber} 
                          onChange={(e) => setPanNumber(e.target.value.toUpperCase())} 
                          placeholder="ABCDE1234F" 
                          className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white font-mono tracking-wide" 
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">Purpose of Loan (Optional)</label>
                        <input 
                          type="text" 
                          value={loanPurpose} 
                          onChange={(e) => setLoanPurpose(e.target.value)} 
                          placeholder="e.g., Medical expenses, Debt consolidation" 
                          className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" 
                        />
                    </div>
                  </div>
                );
              }
              
              // Business Loan specific fields
              if (slug.includes('business')) {
                return (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Registered Business Name *</label>
                      <input type="text" value={registeredBusinessName} onChange={(e) => setRegisteredBusinessName(e.target.value)} placeholder="Your registered business name" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Business Type</label>
                      <select value={businessTypeForLoan} onChange={(e) => setBusinessTypeForLoan(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white">
                        <option value="proprietorship">Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="llp">LLP</option>
                        <option value="pvt_ltd">Private Limited</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Years in Operation *</label>
                      <input type="text" value={yearsInOperation} onChange={(e) => setYearsInOperation(e.target.value)} placeholder="e.g., 5" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Annual Business Turnover</label>
                      <input type="text" value={businessTurnover} onChange={(e) => setBusinessTurnover(e.target.value)} placeholder="₹ Amount" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Business Purpose</label>
                      <select value={businessPurpose} onChange={(e) => setBusinessPurpose(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white">
                        <option value="expansion">Business Expansion</option>
                        <option value="working_capital">Working Capital</option>
                        <option value="equipment">Equipment Purchase</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">GST Number (Optional)</label>
                      <input type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="GST Number" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                  </div>
                );
              }
              
              // Home Loan specific fields
              if (slug.includes('home') || slug.includes('housing')) {
                return (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Property Address *</label>
                      <textarea value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} placeholder="Full property address" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" rows={2}></textarea>
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Property Market Value</label>
                      <input type="text" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} placeholder="₹ Property Value" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Down Payment Amount</label>
                      <input type="text" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="₹ Down Payment" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Property Type</label>
                      <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white">
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="plot">Plot</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Construction Status</label>
                      <select value={constructionStatus} onChange={(e) => setConstructionStatus(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white">
                        <option value="ready">Ready to Move</option>
                        <option value="under_construction">Under Construction</option>
                      </select>
                    </div>
                  </div>
                );
              }
              
              // Education Loan specific fields
              if (slug.includes('education') || slug.includes('student')) {
                return (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Student's Name *</label>
                      <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Full name" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white capitalize" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Course Name *</label>
                      <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="e.g., MBA, B.Tech" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">University/College Name</label>
                      <input type="text" value={universityName} onChange={(e) => setUniversityName(e.target.value)} placeholder="Institution name" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Course Duration (Years)</label>
                      <input type="text" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} placeholder="e.g., 4" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Total Course Fees</label>
                      <input type="text" value={totalCourseFees} onChange={(e) => setTotalCourseFees(e.target.value)} placeholder="₹ Total Fees" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Parent/Guardian Annual Income</label>
                      <input type="text" value={parentIncome} onChange={(e) => setParentIncome(e.target.value)} placeholder="₹ Annual Income" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Admission Secured?</label>
                      <select value={admissionSecured} onChange={(e) => setAdmissionSecured(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white">
                        <option value="yes">Yes</option>
                        <option value="no">No - Applied</option>
                      </select>
                    </div>
                  </div>
                );
              }
              
              // Vehicle Loan specific fields
              if (slug.includes('car') || slug.includes('bike') || slug.includes('vehicle')) {
                return (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Vehicle Make *</label>
                      <input type="text" value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} placeholder="e.g., Honda, Maruti" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Vehicle Model *</label>
                      <input type="text" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} placeholder="e.g., City, Swift" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Variant</label>
                      <input type="text" value={vehicleVariant} onChange={(e) => setVehicleVariant(e.target.value)} placeholder="e.g., VX, ZXI" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                    {slug.includes('new') ? (
                      <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">Ex-showroom Price</label>
                        <input type="text" value={exShowroomPrice} onChange={(e) => setExShowroomPrice(e.target.value)} placeholder="₹ Price" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="text-gray-700 text-sm font-bold mb-1 block">Year of Manufacture</label>
                          <input type="text" value={manufactureYear} onChange={(e) => setManufactureYear(e.target.value)} placeholder="e.g., 2020" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                        </div>
                        <div>
                          <label className="text-gray-700 text-sm font-bold mb-1 block">Current Market Value</label>
                          <input type="text" value={currentMarketValue} onChange={(e) => setCurrentMarketValue(e.target.value)} placeholder="₹ Value" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                        </div>
                        <div>
                          <label className="text-gray-700 text-sm font-bold mb-1 block">Kilometers Driven</label>
                          <input type="text" value={kilometersDriven} onChange={(e) => setKilometersDriven(e.target.value)} placeholder="e.g., 50000" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                        </div>
                      </>
                    )}
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-1 block">Registration City</label>
                      <input type="text" value={registrationCity} onChange={(e) => setRegistrationCity(e.target.value)} placeholder="City name" className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-gray-900 bg-white" />
                    </div>
                  </div>
                );
              }
              
              // Default - return empty
              return <div className="text-center text-gray-500">Loading category-specific form...</div>;
            })()}

            {step === 8 && (
               <div className="space-y-5 pt-2">
                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">Full Name</label>
                        <input 
                            type="text" 
                            value={applicantName} 
                            onChange={(e) => setApplicantName(e.target.value)} 
                            placeholder="Enter your full name" 
                            className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white capitalize" 
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">Mobile Number</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-lg">+91</span>
                            <input 
                              type="tel" 
                              maxLength={10} 
                              value={mobileNumber} 
                              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))} 
                              placeholder="Enter 10-digit Number" 
                              className="w-full p-3 pl-12 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">Email Address</label>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="name@example.com" 
                          className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white" 
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-bold mb-1 block">PAN Number</label>
                        <input 
                          type="text" 
                          maxLength={10} 
                          value={panNumber} 
                          onChange={(e) => setPanNumber(e.target.value.toUpperCase())} 
                          placeholder="ABCDE1234F" 
                          className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white font-mono tracking-wide" 
                        />
                    </div>
               </div>
            )}

            {/* Review Step - Step 8 for 7-step loans, Step 9 for 8-step loans */}
            {((step === 8 && getTotalSteps() === 7) || (step === 9 && getTotalSteps() === 8)) && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm mb-4">
                  <strong>Please review your information before submitting</strong>
                </div>

                <div className="space-y-3">
                  {/* Personal Information */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-2">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-600">Name:</span> <span className="font-medium">{applicantName}</span></div>
                      <div><span className="text-gray-600">Email:</span> <span className="font-medium text-xs">{email}</span></div>
                      <div><span className="text-gray-600">Mobile:</span> <span className="font-medium">+91 {mobileNumber}</span></div>
                      <div><span className="text-gray-600">PAN:</span> <span className="font-medium font-mono">{panNumber}</span></div>
                    </div>
                  </div>

                  {/* Employment Information */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-2">Employment Information</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-600">Type:</span> <span className="font-medium capitalize">{selectedEmployment}</span></div>
                      <div><span className="text-gray-600">Employer:</span> <span className="font-medium">{employerName}</span></div>
                      <div><span className="text-gray-600">Experience:</span> <span className="font-medium">{mapWorkExperience(workExperience)}</span></div>
                      <div><span className="text-gray-600">Annual Income:</span> <span className="font-medium">₹{getIncomeValue(selectedIncome).toLocaleString()}</span></div>
                    </div>
                  </div>

                  {/* Residence Information */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-2">Residence Information</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-600">Type:</span> <span className="font-medium capitalize">{mapResidenceType(selectedResidence)}</span></div>
                      <div><span className="text-gray-600">City:</span> <span className="font-medium">{getCityLabel(selectedCity)}</span></div>
                      <div className="col-span-2"><span className="text-gray-600">Pincode:</span> <span className="font-medium">{pincode}</span></div>
                    </div>
                  </div>

                  {/* Loan Details */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b pb-2">Loan Details</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-600">Type:</span> <span className="font-medium">{categoryName || 'Personal Loan'}</span></div>
                      <div><span className="text-gray-600">Amount:</span> <span className="font-medium">₹{getLoanAmountValue(selectedLoanAmount).toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-xs mt-4">
                  By submitting, you confirm that all information provided is accurate and you consent to verification of the details provided.
                </div>
              </div>
            )}

            {((step === 9 && getTotalSteps() === 7) || step === 10) && (
              <div className="flex flex-col items-center justify-center text-center pt-2 pb-6 animate-in fade-in zoom-in">
                <div className="h-28 flex items-center justify-center">
                  <img src={bankLogo} alt={bankName} className="h-full object-contain" />
                </div>
                <h2 className="text-[#0f172a] text-2xl font-bold tracking-wide uppercase">Application Submitted!</h2>
                <div className="w-16 h-1 bg-[#fbbf24] mt-2 mb-6 rounded-full"></div>
                
                {/* Enhanced Reference Number Display */}
                <div className="relative mb-6 px-4 w-full">
                  <div className="bg-linear-to-r from-teal-500 via-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg tracking-wider shadow-2xl border-2 border-teal-400">
                    <div className="text-xs font-medium uppercase tracking-widest opacity-90 mb-1">Reference Number</div>
                    <div className="text-2xl font-extrabold tracking-wide">
                      {referenceNo || `REF${Date.now().toString().slice(-8)}`}
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                <div className="space-y-4 px-2 mb-8">
                  <p className="text-gray-800 text-sm font-medium leading-relaxed">
                    Your application has been Successfully Submitted. Our loan specialist will contact you within 24 hours to take your application forward.
                  </p>
                  <p className="text-gray-600 text-[11px] leading-relaxed text-justify border-t border-gray-200 pt-3">
                    {bankName} does not charge any fee from customers for loan checks or loan application assistance. If you receive any request for payment or suspicious communication from anyone claiming to be a {bankName} representative, please reach out to us immediately at support@{bankName}.in.
                  </p>
                  <p className="text-gray-600 text-[11px] font-medium pt-1">
                    Thank you for choosing {bankName}. We&apos;re here to make your loan journey simple, transparent, and secure.
                  </p>
                </div>
                <button 
                  onClick={onClose} 
                  className="w-full py-3 bg-teal-500 text-white rounded-lg font-bold text-lg hover:bg-teal-600 transition-colors shadow-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {!((step === 9 && getTotalSteps() === 7) || step === 10) && (
            <div className="mt-8 flex justify-between items-center w-full pt-4 border-t border-gray-200">
              <button 
                onClick={handleBack} 
                className="px-5 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-2 hover:bg-gray-200"
              >
                Back
              </button>
              <button 
                onClick={handleNext} 
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-white shadow-lg ${
                  step === 3 ? 'bg-gray-900 hover:bg-black' : 'bg-teal-500 hover:bg-teal-600'
                } active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : ((step === 8 && getTotalSteps() === 7) || (step === 9 && getTotalSteps() === 8)) ? 'Submit Application' : step === 3 ? 'Continue' : 'Next Step'}
                {!isSubmitting && !((step === 8 && getTotalSteps() === 7) || (step === 9 && getTotalSteps() === 8)) && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmploymentTypeModal;