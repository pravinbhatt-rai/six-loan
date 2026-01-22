/**
 * Example: How to submit a loan application with employment data
 * 
 * This demonstrates the unified application submission system
 */

// Placeholder token - replace with actual JWT token
const token = 'your-jwt-token-here';

// Example 1: Personal Loan Application
const submitPersonalLoan = async () => {
  const response = await fetch('/api/applications/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      // Product Info
      type: 'LOAN',
      productId: 123, // Loan product ID
      categoryName: 'Personal Loan',
      categorySlug: 'personalloan',
      amount: 500000,
      tenure: 36, // months
      
      // Applicant Details
      applicantName: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      panNumber: 'ABCDE1234F',
      dob: '1990-01-15',
      currentAddress: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      residenceType: 'OWNED',
      
      // Employment Data
      employment: {
        fullName: 'John Doe',
        panCard: 'ABCDE1234F',
        dob: '1990-01-15',
        email: 'john@example.com',
        phone: '9876543210',
        employmentType: 'SALARIED',
        annualIncome: 1200000,
        monthlyIncome: 100000,
        currentEmployer: 'ABC Corporation',
        designation: 'Senior Manager',
        workExperience: '5-7 Years',
        highestEducation: 'Graduate',
      },
      
      // Product-Specific Details (Personal Loan)
      productDetails: {
        loanPurpose: 'Home Renovation',
        education: 'Graduate',
      },
      
      // Documents
      documents: [
        { title: 'PAN Card', url: 'https://...', type: 'identity' },
        { title: 'Salary Slip', url: 'https://...', type: 'income' },
      ],
    }),
  });
  
  const data = await response.json();
  console.log('Reference No:', data.referenceNo);
};

// Example 2: Home Loan Application
const submitHomeLoan = async () => {
  const response = await fetch('/api/applications/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: 'LOAN',
      productId: 456,
      categoryName: 'Home Loan',
      categorySlug: 'home-loan',
      amount: 5000000,
      tenure: 240,
      
      applicantName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543211',
      panNumber: 'FGHIJ5678K',
      dob: '1985-05-20',
      
      employment: {
        fullName: 'Jane Smith',
        panCard: 'FGHIJ5678K',
        dob: '1985-05-20',
        email: 'jane@example.com',
        phone: '9876543211',
        employmentType: 'SELF_EMPLOYED',
        annualIncome: 2400000,
        businessName: 'Smith Enterprises',
        businessType: 'Proprietorship',
        yearsInBusiness: 8,
        businessTurnover: 5000000,
        industryType: 'Service',
      },
      
      // Home Loan Specific Details
      productDetails: {
        propertyAddress: '456 Garden View, Pune',
        propertyType: 'Residential',
        constructionStatus: 'Ready',
        propertyValue: 7000000,
        downPayment: 2000000,
      },
    }),
  });
};

// Example 3: Credit Card Application
const submitCreditCard = async () => {
  const response = await fetch('/api/applications/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: 'CREDIT_CARD',
      productId: 789,
      categoryName: 'Premium Credit Card',
      categorySlug: 'credit-card',
      
      applicantName: 'Robert Brown',
      email: 'robert@example.com',
      phone: '9876543212',
      panNumber: 'KLMNO9012P',
      dob: '1992-11-10',
      
      employment: {
        fullName: 'Robert Brown',
        panCard: 'KLMNO9012P',
        dob: '1992-11-10',
        email: 'robert@example.com',
        phone: '9876543212',
        employmentType: 'PROFESSIONAL',
        annualIncome: 1800000,
        professionalQualification: 'CA',
        registrationNumber: 'CA123456',
        yearsOfPractice: 6,
      },
      
      // Credit Card Specific Details
      productDetails: {
        desiredCreditLimit: 500000,
        hasExistingCreditCards: true,
        existingBankingRelationship: true,
        cardType: 'premium',
      },
    }),
  });
};

// Example 4: Education Loan
const submitEducationLoan = async () => {
  const response = await fetch('/api/applications/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: 'LOAN',
      productId: 101,
      categoryName: 'Education Loan',
      categorySlug: 'education-loan',
      amount: 1500000,
      
      applicantName: 'Parent Name', // Parent applying
      email: 'parent@example.com',
      phone: '9876543213',
      
      employment: {
        fullName: 'Parent Name',
        employmentType: 'SALARIED',
        annualIncome: 800000,
        currentEmployer: 'XYZ Ltd',
      },
      
      // Education Loan Specific
      productDetails: {
        studentName: 'Child Name',
        courseName: 'MBA',
        universityName: 'IIM Bangalore',
        courseDuration: 2,
        totalCourseFees: 2000000,
        parentIncome: 800000,
        admissionStatus: 'Confirmed',
        admissionSecured: true,
      },
    }),
  });
};

// Example 5: Business Loan
const submitBusinessLoan = async () => {
  const response = await fetch('/api/applications/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: 'LOAN',
      productId: 202,
      categoryName: 'Business Loan',
      categorySlug: 'business-loan',
      amount: 3000000,
      
      applicantName: 'Business Owner',
      email: 'owner@business.com',
      phone: '9876543214',
      
      employment: {
        fullName: 'Business Owner',
        employmentType: 'BUSINESS',
        annualIncome: 5000000,
        businessName: 'ABC Manufacturing Pvt Ltd',
        businessType: 'Private Limited',
        yearsInBusiness: 10,
        businessTurnover: 15000000,
        industryType: 'Manufacturing',
      },
      
      // Business Loan Specific
      productDetails: {
        registeredBusinessName: 'ABC Manufacturing Pvt Ltd',
        businessType: 'Private Limited',
        yearsInOperation: 10,
        businessTurnover: 15000000,
        businessPurpose: 'Business Expansion',
        currentLoansAmount: 500000,
        businessPan: 'ABCDE1234F',
        gstNumber: 'GST123456789',
        industryType: 'Manufacturing',
      },
    }),
  });
};

export {
  submitPersonalLoan,
  submitHomeLoan,
  submitCreditCard,
  submitEducationLoan,
  submitBusinessLoan,
};
