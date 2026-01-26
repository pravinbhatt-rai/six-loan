const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

// Use the provided image URL for everything
const DEFAULT_IMAGE_URL = 'https://res.cloudinary.com/dfyehhesb/image/upload/v1769350833/sixloan/fv6wdoaotsrpyg9ck4eg.png';

async function seedData() {
  try {
    console.log('🌱 Starting comprehensive data seeding...');

    // Clear existing data first (in correct order due to foreign keys)
    console.log('🧹 Clearing existing data...');

    await prisma.debitCardOffer.deleteMany();
    await prisma.debitCardBullet.deleteMany();
    await prisma.debitCardKeyFeature.deleteMany();
    await prisma.debitCardSafetyFeature.deleteMany();
    await prisma.debitCardProduct.deleteMany();

    await prisma.creditCardOffer.deleteMany();
    await prisma.creditCardBullet.deleteMany();
    await prisma.creditCardKeyFeature.deleteMany();
    await prisma.creditCardBenefit.deleteMany();
    await prisma.creditCardSpecialOffer.deleteMany();
    await prisma.creditCardBenefitSection.deleteMany();
    await prisma.creditCardBestSuitedFor.deleteMany();
    await prisma.creditCardSummaryCharge.deleteMany();
    await prisma.creditCardRequiredDocument.deleteMany();
    await prisma.creditCardProcessStep.deleteMany();
    await prisma.creditCardProduct.deleteMany();

    await prisma.loanOffer.deleteMany();
    await prisma.loanBullet.deleteMany();
    await prisma.loanSummaryCharge.deleteMany();
    await prisma.loanRequiredDocument.deleteMany();
    await prisma.loanProcessStep.deleteMany();
    await prisma.loanFooterItem.deleteMany();
    await prisma.loanProduct.deleteMany();

    await prisma.category.deleteMany();

    console.log('✅ Cleared existing data');

    // Create categories first
    console.log('📂 Creating categories...');

    const categories = [
      { name: 'Personal Loan', slug: 'personalloan', type: 'LOAN' },
      { name: 'Business Loan', slug: 'businessloan', type: 'LOAN' },
      { name: 'Home Loan', slug: 'homeloan', type: 'LOAN' },
      { name: 'Vehicle Loan', slug: 'vehicleloan', type: 'LOAN' },
      { name: 'Education Loan', slug: 'educationloan', type: 'LOAN' },
      { name: 'Loan Against Property', slug: 'loanagainstproperty', type: 'LOAN' },
      { name: 'Loan Against Security', slug: 'loanagainstsecurity', type: 'LOAN' },
      { name: 'Professional Loan', slug: 'professionalloan', type: 'LOAN' },
      // Credit Card Categories
      { name: 'Cashback Credit Cards', slug: 'cashback', type: 'CREDIT_CARD' },
      { name: 'Rewards Credit Cards', slug: 'rewards', type: 'CREDIT_CARD' },
      { name: 'Credit Card Lounge Access', slug: 'lounge', type: 'CREDIT_CARD' },
      { name: 'OneCard Credit Cards', slug: 'onecard', type: 'CREDIT_CARD' },
      { name: 'Fuel Credit Cards', slug: 'fuel', type: 'CREDIT_CARD' },
      { name: 'Travel Credit Cards', slug: 'travel', type: 'CREDIT_CARD' },
      { name: 'International Credit Cards', slug: 'international', type: 'CREDIT_CARD' },
      { name: 'Zero Forex Markup Credit Cards', slug: 'forex', type: 'CREDIT_CARD' },
      { name: 'Secured Credit Cards', slug: 'secured', type: 'CREDIT_CARD' },
      // Debit Card Categories
      { name: 'Cashback Debit Cards', slug: 'debit-cashback', type: 'DEBIT_CARD' },
      { name: 'Zero Fee Cards', slug: 'zero-fee', type: 'DEBIT_CARD' },
      { name: 'International Cards', slug: 'debit-international', type: 'DEBIT_CARD' },
      { name: 'Lounge Access Cards', slug: 'lounge-access', type: 'DEBIT_CARD' },
      // Legacy categories (keeping for backward compatibility)
      { name: 'Rewards Credit Cards', slug: 'rewardscards', type: 'CREDIT_CARD' },
      { name: 'Travel Credit Cards', slug: 'travelcards', type: 'CREDIT_CARD' },
      { name: 'Premium Debit Cards', slug: 'premiumdebit', type: 'DEBIT_CARD' },
      { name: 'Rewards Debit Cards', slug: 'rewardsdebit', type: 'DEBIT_CARD' }
    ];

    const createdCategories = [];
    for (const cat of categories) {
      const category = await prisma.category.create({ data: cat });
      createdCategories.push(category);
    }

    console.log('✅ Created categories');

    // Seed Loans for each category
    console.log('🏠 Seeding loans...');

    const loanData = [
      // Personal Loans
      {
        title: 'HDFC Personal Loan',
        slug: 'hdfc-personal-loan',
        bankName: 'HDFC Bank',
        bankLogoUrl: DEFAULT_IMAGE_URL,
        tag: 'Popular',
        feature: 'Instant Approval',
        specialization: 'Quick processing with minimal documentation',
        processTimeLabel: 'Approval in',
        processTimeValue: '24 Hours',
        chanceOfApproval: 'High',
        approvalScore: 85,
        interestRateText: '10.99% - 21.00%',
        aprText: '11.50% - 22.00%',
        emiAmount: '₹ 2,154',
        emiValue: 2154,
        processTypeLabel: 'Online Process',
        processTypeValue: 'fully-online',
        disbursalTimeHours: 24,
        keyStatement: 'Get instant personal loan up to ₹50 lakhs with quick approval',
        loanType: 'personal',
        loanSubType: 'preApproved',
        amountRange: '50-lakh',
        eligibleFor: 'salaried',
        loanPurpose: 'consolidation',
        bullets: [
          'Instant approval within 24 hours',
          'Loan amount up to ₹50 lakhs',
          'Flexible tenure up to 7 years',
          'Attractive interest rates starting from 10.99%',
          'Minimal documentation required',
          'Pre-approved offers available',
          'Doorstep service available'
        ],
        summaryCharges: [
          { label: 'Processing Fees', mainText: 'Up to 2.50%', subText: 'of loan amount' },
          { label: 'Prepayment Charges', mainText: '4%', subText: 'of outstanding amount' },
          { label: 'Late Payment Charges', mainText: '₹500', subText: 'per month' }
        ],
        requiredDocuments: [
          { title: 'Identity Proof', description: 'PAN Card, Aadhaar Card, Passport' },
          { title: 'Address Proof', description: 'Utility bill, Bank statement' },
          { title: 'Income Proof', description: 'Salary slips, Form 16, Bank statements' },
          { title: 'Employment Proof', description: 'Employment letter, Offer letter' }
        ],
        processSteps: [
          { title: 'Apply Online', description: 'Fill the online application form with basic details' },
          { title: 'Document Upload', description: 'Upload required documents for verification' },
          { title: 'Eligibility Check', description: 'Bank verifies your credit score and documents' },
          { title: 'Loan Approval', description: 'Receive loan approval within 24 hours' },
          { title: 'Disbursement', description: 'Loan amount credited to your account' }
        ],
        footerItems: [
          'CIBIL score above 650 required',
          'Minimum salary ₹25,000/month',
          'Age between 21-60 years',
          'No existing loan defaults'
        ],
        offers: [
          {
            merchant: 'HDFC Bank',
            offerType: 'Processing Fee Waiver',
            title: 'Processing Fee Waiver',
            description: 'Get processing fee waiver on personal loans above ₹10 lakhs',
            offerValue: 'Up to ₹10,000',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          },
          {
            merchant: 'Partner Bank',
            offerType: 'Interest Discount',
            title: 'Interest Rate Discount',
            description: 'Special interest rate discount for HDFC credit card holders',
            offerValue: '1% discount',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ]
      },
      {
        title: 'ICICI Personal Loan',
        slug: 'icici-personal-loan',
        bankName: 'ICICI Bank',
        bankLogoUrl: DEFAULT_IMAGE_URL,
        tag: 'Featured',
        feature: 'Low Interest',
        specialization: 'Competitive rates with flexible repayment options',
        processTimeLabel: 'Approval in',
        processTimeValue: '2 Hours',
        chanceOfApproval: 'Very High',
        approvalScore: 90,
        interestRateText: '10.75% - 19.00%',
        aprText: '11.25% - 20.00%',
        emiAmount: '₹ 2,089',
        emiValue: 2089,
        processTypeLabel: 'Instant Process',
        processTypeValue: 'instant-online',
        disbursalTimeHours: 2,
        keyStatement: 'Instant personal loan with competitive rates and quick disbursal',
        loanType: 'personal',
        loanSubType: 'interestRates',
        amountRange: '40-lakh',
        eligibleFor: 'salaried',
        loanPurpose: 'wedding',
        bullets: [
          'Instant approval within 2 hours',
          'Loan amount up to ₹40 lakhs',
          'Flexible tenure up to 6 years',
          'Low interest rates starting from 10.75%',
          'No collateral required',
          'Balance transfer facility available',
          'Top-up loan options'
        ],
        summaryCharges: [
          { label: 'Processing Fees', mainText: 'Up to 2.25%', subText: 'of loan amount' },
          { label: 'Prepayment Charges', mainText: 'Nil', subText: 'for floating rate loans' },
          { label: 'Late Payment Charges', mainText: '₹499', subText: 'per month' }
        ],
        requiredDocuments: [
          { title: 'Identity Proof', description: 'PAN Card, Aadhaar Card, Voter ID' },
          { title: 'Address Proof', description: 'Aadhaar Card, Utility bill' },
          { title: 'Income Proof', description: 'Salary slips, Bank statements' },
          { title: 'Employment Proof', description: 'Employment letter' }
        ],
        processSteps: [
          { title: 'Online Application', description: 'Apply online with basic details' },
          { title: 'Instant Approval', description: 'Get instant approval decision' },
          { title: 'Document Verification', description: 'Submit documents for verification' },
          { title: 'Loan Disbursement', description: 'Amount credited instantly' }
        ],
        footerItems: [
          'CIBIL score above 700 preferred',
          'Minimum salary ₹20,000/month',
          'Age between 23-58 years',
          'Account with ICICI Bank preferred'
        ],
        offers: [
          {
            merchant: 'ICICI Bank',
            offerType: 'Cashback',
            title: 'Welcome Cashback',
            description: 'Get cashback on first loan disbursement',
            offerValue: '₹5,000',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ]
      },
      // Business Loans
      {
        title: 'HDFC Business Loan',
        slug: 'hdfc-business-loan',
        bankName: 'HDFC Bank',
        bankLogoUrl: DEFAULT_IMAGE_URL,
        tag: 'Popular',
        feature: 'Working Capital',
        specialization: 'Comprehensive business financing solutions',
        processTimeLabel: 'Approval in',
        processTimeValue: '48 Hours',
        chanceOfApproval: 'High',
        approvalScore: 80,
        interestRateText: '12.99% - 24.00%',
        aprText: '13.50% - 25.00%',
        emiAmount: '₹ 4,250',
        emiValue: 4250,
        processTypeLabel: 'Online Process',
        processTypeValue: 'online-assisted',
        disbursalTimeHours: 48,
        keyStatement: 'Complete business financing solution for SMEs and entrepreneurs',
        loanType: 'business',
        loanSubType: 'small',
        amountRange: '1-crore',
        eligibleFor: 'self-employed',
        loanPurpose: 'expansion',
        scheme: 'small',
        bullets: [
          'Loan amount up to ₹1 crore',
          'Flexible tenure up to 10 years',
          'Working capital and term loan options',
          'Collateral and collateral-free options',
          'Business expansion funding',
          'Equipment purchase financing',
          'Inventory financing available'
        ],
        summaryCharges: [
          { label: 'Processing Fees', mainText: '1% - 2%', subText: 'of loan amount' },
          { label: 'Prepayment Charges', mainText: '2%', subText: 'of outstanding amount' },
          { label: 'Documentation Charges', mainText: '₹2,000', subText: 'one-time fee' }
        ],
        requiredDocuments: [
          { title: 'Business Proof', description: 'GST Certificate, Business PAN, MOA/AOA' },
          { title: 'Financial Documents', description: 'Balance Sheet, P&L Statement, ITR' },
          { title: 'Identity Proof', description: 'PAN Card, Aadhaar Card' },
          { title: 'Address Proof', description: 'Business address proof, Utility bills' }
        ],
        processSteps: [
          { title: 'Business Assessment', description: 'Bank evaluates business profile and creditworthiness' },
          { title: 'Document Submission', description: 'Submit required business and financial documents' },
          { title: 'Loan Approval', description: 'Receive loan sanction letter' },
          { title: 'Disbursement', description: 'Loan amount credited to business account' }
        ],
        footerItems: [
          'Business vintage minimum 2 years',
          'Annual turnover minimum ₹10 lakhs',
          'CIBIL score above 650',
          'No outstanding defaults'
        ],
        offers: [
          {
            merchant: 'HDFC Bank',
            offerType: 'Processing Fee Waiver',
            title: 'Fee Waiver for Women Entrepreneurs',
            description: 'Processing fee waiver for women-led businesses',
            offerValue: '100% waiver',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ]
      },
      // Home Loans
      {
        title: 'SBI Home Loan',
        slug: 'sbi-home-loan',
        bankName: 'State Bank of India',
        bankLogoUrl: DEFAULT_IMAGE_URL,
        tag: 'Government Bank',
        feature: 'Low Interest',
        specialization: 'Affordable home loans with government-backed schemes',
        processTimeLabel: 'Approval in',
        processTimeValue: '7 Days',
        chanceOfApproval: 'Medium',
        approvalScore: 75,
        interestRateText: '8.65% - 9.65%',
        aprText: '8.75% - 9.75%',
        emiAmount: '₹ 8,500',
        emiValue: 8500,
        processTypeLabel: 'Branch Process',
        processTypeValue: 'branch-assisted',
        disbursalTimeHours: 168,
        keyStatement: 'Government-backed affordable home loans for everyone',
        loanType: 'home',
        loanSubType: 'rates',
        amountRange: '5-crore',
        eligibleFor: 'salaried',
        loanPurpose: 'purchase',
        scheme: 'construction',
        bullets: [
          'Loan amount up to ₹5 crores',
          'Long tenure up to 30 years',
          'Construction and purchase options',
          'Balance transfer facility',
          'Top-up loan available',
          'Pre-approval facility',
          'Doorstep service'
        ],
        summaryCharges: [
          { label: 'Processing Fees', mainText: '0.35%', subText: 'of loan amount' },
          { label: 'Legal Charges', mainText: '₹5,000', subText: 'one-time fee' },
          { label: 'Valuation Charges', mainText: '₹2,000', subText: 'one-time fee' }
        ],
        requiredDocuments: [
          { title: 'Identity Proof', description: 'PAN Card, Aadhaar Card, Passport' },
          { title: 'Address Proof', description: 'Utility bill, Bank statement' },
          { title: 'Income Proof', description: 'Salary slips, Form 16, ITR' },
          { title: 'Property Documents', description: 'Agreement of Sale, Title Deed' }
        ],
        processSteps: [
          { title: 'Property Selection', description: 'Choose and finalize property' },
          { title: 'Loan Application', description: 'Apply for home loan with property details' },
          { title: 'Document Verification', description: 'Bank verifies all documents and property' },
          { title: 'Legal Check', description: 'Property title and legal verification' },
          { title: 'Loan Disbursement', description: 'Loan amount disbursed to seller/builder' }
        ],
        footerItems: [
          'Age between 18-70 years',
          'Minimum salary ₹25,000/month',
          'CIBIL score above 650',
          'Property value minimum ₹10 lakhs'
        ],
        offers: [
          {
            merchant: 'SBI',
            offerType: 'Interest Discount',
            title: 'Women Home Loan Discount',
            description: 'Special interest rate discount for women applicants',
            offerValue: '0.25% discount',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ]
      },
      // Vehicle Loans
      {
        title: 'HDFC Car Loan',
        slug: 'hdfc-car-loan',
        bankName: 'HDFC Bank',
        bankLogoUrl: DEFAULT_IMAGE_URL,
        tag: 'Popular',
        feature: 'New Car',
        specialization: 'Comprehensive car financing with attractive rates',
        processTimeLabel: 'Approval in',
        processTimeValue: '4 Hours',
        chanceOfApproval: 'Very High',
        approvalScore: 95,
        interestRateText: '9.25% - 15.00%',
        aprText: '9.50% - 15.50%',
        emiAmount: '₹ 2,850',
        emiValue: 2850,
        processTypeLabel: 'Online Process',
        processTypeValue: 'online-showroom',
        disbursalTimeHours: 4,
        keyStatement: 'Drive your dream car with easy financing options',
        loanType: 'vehicle',
        loanSubType: 'new-bike',
        amountRange: '50-lakh',
        eligibleFor: 'salaried',
        loanPurpose: 'purchase',
        vehicleType: 'new-car',
        bullets: [
          'Loan amount up to ₹50 lakhs',
          'Financing up to 100% of on-road price',
          'Flexible tenure up to 7 years',
          'Attractive interest rates',
          'Quick approval and disbursal',
          'Used car financing available',
          'Two-wheeler loans available'
        ],
        summaryCharges: [
          { label: 'Processing Fees', mainText: '0.5% - 1%', subText: 'of loan amount' },
          { label: 'Documentation Charges', mainText: '₹500', subText: 'one-time fee' },
          { label: 'Late Payment Charges', mainText: '₹500', subText: 'per month' }
        ],
        requiredDocuments: [
          { title: 'Identity Proof', description: 'PAN Card, Aadhaar Card, Driving License' },
          { title: 'Address Proof', description: 'Utility bill, Bank statement' },
          { title: 'Income Proof', description: 'Salary slips, Bank statements' },
          { title: 'Vehicle Documents', description: 'Proforma Invoice, Quotation' }
        ],
        processSteps: [
          { title: 'Car Selection', description: 'Choose your preferred car model' },
          { title: 'Loan Application', description: 'Apply online or at showroom' },
          { title: 'Document Verification', description: 'Submit required documents' },
          { title: 'Loan Approval', description: 'Instant approval decision' },
          { title: 'Disbursement', description: 'Amount paid directly to dealer' }
        ],
        footerItems: [
          'Age between 21-65 years',
          'Minimum salary ₹15,000/month',
          'CIBIL score above 650',
          'Valid driving license required'
        ],
        offers: [
          {
            merchant: 'HDFC Bank',
            offerType: 'Cashback',
            title: 'Dealer Discount',
            description: 'Additional cashback on select car models',
            offerValue: '₹10,000',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ]
      },
      // Education Loans
      {
        title: 'SBI Education Loan',
        slug: 'sbi-education-loan',
        bankName: 'State Bank of India',
        bankLogoUrl: DEFAULT_IMAGE_URL,
        tag: 'Government',
        feature: 'Study Abroad',
        specialization: 'Comprehensive education financing for higher studies',
        processTimeLabel: 'Approval in',
        processTimeValue: '15 Days',
        chanceOfApproval: 'Medium',
        approvalScore: 70,
        interestRateText: '7.85% - 9.85%',
        aprText: '8.00% - 10.00%',
        emiAmount: '₹ 12,500',
        emiValue: 12500,
        processTypeLabel: 'Branch Process',
        processTypeValue: 'branch-assisted',
        disbursalTimeHours: 360,
        keyStatement: 'Education loans for higher studies in India and abroad',
        loanType: 'education',
        amountRange: '1-crore',
        eligibleFor: 'students',
        bullets: [
          'Loan amount up to ₹1 crore',
          'Study in India and abroad',
          'Moratorium period during study',
          'Repayment holiday during study',
          'Concessional interest rates',
          'No collateral up to ₹7.5 lakhs',
          'Tax benefits available'
        ],
        summaryCharges: [
          { label: 'Processing Fees', mainText: 'Nil', subText: 'for loans up to ₹7.5 lakhs' },
          { label: 'Documentation Charges', mainText: '₹500', subText: 'one-time fee' },
          { label: 'Late Payment Charges', mainText: '₹500', subText: 'per month' }
        ],
        requiredDocuments: [
          { title: 'Admission Letter', description: 'University admission letter' },
          { title: 'Fee Structure', description: 'Course fee breakup' },
          { title: 'Academic Records', description: 'Mark sheets, certificates' },
          { title: 'Identity Proof', description: 'PAN Card, Aadhaar Card' },
          { title: 'Income Proof', description: 'Parent/guardian income proof' }
        ],
        processSteps: [
          { title: 'Course Selection', description: 'Choose course and university' },
          { title: 'Loan Application', description: 'Apply with admission details' },
          { title: 'Document Verification', description: 'Submit academic and financial documents' },
          { title: 'Loan Sanction', description: 'Receive loan sanction letter' },
          { title: 'Disbursement', description: 'Amount paid to university/educational institution' }
        ],
        footerItems: [
          'Age between 15-35 years',
          'Admission secured in recognized institution',
          'Co-applicant required',
          'Moratorium period up to course duration + 1 year'
        ],
        offers: [
          {
            merchant: 'SBI',
            offerType: 'Interest Subsidy',
            title: 'Government Subsidy',
            description: 'Interest subsidy for economically weaker sections',
            offerValue: 'Up to ₹10,000/year',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ]
      },
      // Loan Against Property
      {
        title: 'HDFC LAP',
        slug: 'hdfc-lap',
        bankName: 'HDFC Bank',
        bankLogoUrl: DEFAULT_IMAGE_URL,
        tag: 'High Value',
        feature: 'Property Collateral',
        specialization: 'Loan against residential and commercial property',
        processTimeLabel: 'Approval in',
        processTimeValue: '10 Days',
        chanceOfApproval: 'Medium',
        approvalScore: 65,
        interestRateText: '9.50% - 12.50%',
        aprText: '9.75% - 13.00%',
        emiAmount: '₹ 9,500',
        emiValue: 9500,
        processTypeLabel: 'Property Evaluation',
        processTypeValue: 'property-based',
        disbursalTimeHours: 240,
        keyStatement: 'Convert your property into instant liquidity',
        loanType: 'property',
        amountRange: '10-crore',
        eligibleFor: 'salaried',
        loanPurpose: 'business',
        scheme: 'plot',
        bullets: [
          'Loan amount up to ₹10 crores',
          'Up to 70% of property value',
          'Residential and commercial property',
          'Long tenure up to 20 years',
          'Attractive interest rates',
          'Tax benefits available',
          'Flexible repayment options'
        ],
        summaryCharges: [
          { label: 'Processing Fees', mainText: '0.5% - 1%', subText: 'of loan amount' },
          { label: 'Legal Charges', mainText: '₹5,000', subText: 'one-time fee' },
          { label: 'Valuation Charges', mainText: '₹3,000', subText: 'one-time fee' }
        ],
        requiredDocuments: [
          { title: 'Property Documents', description: 'Title deed, Sale deed, Property tax receipt' },
          { title: 'Identity Proof', description: 'PAN Card, Aadhaar Card' },
          { title: 'Address Proof', description: 'Utility bill, Bank statement' },
          { title: 'Income Proof', description: 'Salary slips, ITR, Bank statements' }
        ],
        processSteps: [
          { title: 'Property Valuation', description: 'Bank evaluates property value' },
          { title: 'Legal Verification', description: 'Property title and legal check' },
          { title: 'Loan Application', description: 'Submit loan application with property details' },
          { title: 'Document Verification', description: 'Verify all documents and property papers' },
          { title: 'Loan Disbursement', description: 'Loan amount credited to account' }
        ],
        footerItems: [
          'Property age maximum 25 years',
          'Clear property title required',
          'LTV up to 70%',
          'Age between 21-65 years'
        ],
        offers: [
          {
            merchant: 'HDFC Bank',
            offerType: 'Lower Interest',
            title: 'Senior Citizen Discount',
            description: 'Special rates for senior citizens',
            offerValue: '0.25% discount',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ]
      },
      // Professional Loans
      {
        title: 'ICICI Doctor Loan',
        slug: 'icici-doctor-loan',
        bankName: 'ICICI Bank',
        bankLogoUrl: DEFAULT_IMAGE_URL,
        tag: 'Professional',
        feature: 'Medical Equipment',
        specialization: 'Specialized loans for medical professionals',
        processTimeLabel: 'Approval in',
        processTimeValue: '5 Days',
        chanceOfApproval: 'High',
        approvalScore: 85,
        interestRateText: '10.50% - 16.00%',
        aprText: '11.00% - 17.00%',
        emiAmount: '₹ 6,250',
        emiValue: 6250,
        processTypeLabel: 'Professional Loan',
        processTypeValue: 'professional-assisted',
        disbursalTimeHours: 120,
        keyStatement: 'Comprehensive financing for medical professionals and clinics',
        loanType: 'professional',
        amountRange: '1-crore',
        eligibleFor: 'doctors',
        bullets: [
          'Loan amount up to ₹1 crore',
          'For doctors, dentists, and medical professionals',
          'Clinic setup and equipment financing',
          'Practice expansion funding',
          'Medical equipment purchase',
          'Working capital for clinics',
          'Flexible repayment options'
        ],
        summaryCharges: [
          { label: 'Processing Fees', mainText: '1% - 1.5%', subText: 'of loan amount' },
          { label: 'Documentation Charges', mainText: '₹1,000', subText: 'one-time fee' },
          { label: 'Late Payment Charges', mainText: '₹500', subText: 'per month' }
        ],
        requiredDocuments: [
          { title: 'Professional Qualification', description: 'Medical degree, Registration certificate' },
          { title: 'Clinic Ownership', description: 'Clinic registration, Ownership documents' },
          { title: 'Identity Proof', description: 'PAN Card, Aadhaar Card' },
          { title: 'Income Proof', description: 'Clinic financials, Personal income proof' }
        ],
        processSteps: [
          { title: 'Professional Verification', description: 'Verify medical qualifications and practice' },
          { title: 'Clinic Assessment', description: 'Evaluate clinic setup and requirements' },
          { title: 'Loan Application', description: 'Submit detailed loan application' },
          { title: 'Document Verification', description: 'Verify all professional and financial documents' },
          { title: 'Loan Disbursement', description: 'Amount credited to clinic/business account' }
        ],
        footerItems: [
          'Valid medical registration required',
          'Minimum 2 years of practice',
          'Clinic ownership preferred',
          'Age between 25-70 years'
        ],
        offers: [
          {
            merchant: 'ICICI Bank',
            offerType: 'Equipment Discount',
            title: 'Medical Equipment Partner',
            description: 'Discount on medical equipment through partners',
            offerValue: 'Up to ₹50,000',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ]
      }
    ];

    for (const loan of loanData) {
      const category = createdCategories.find(c => 
        (loan.loanType === 'personal' && c.slug === 'personalloan') ||
        (loan.loanType === 'business' && c.slug === 'businessloan') ||
        (loan.loanType === 'home' && c.slug === 'homeloan') ||
        (loan.loanType === 'vehicle' && c.slug === 'vehicleloan') ||
        (loan.loanType === 'education' && c.slug === 'educationloan') ||
        (loan.loanType === 'property' && c.slug === 'loanagainstproperty') ||
        (loan.loanType === 'professional' && c.slug === 'professionalloan')
      );

      await prisma.loanProduct.create({
        data: {
          ...loan,
          categoryId: category?.id,
          bullets: {
            create: loan.bullets.map((text, index) => ({
              text,
              displayOrder: index + 1
            }))
          },
          summaryCharges: {
            create: loan.summaryCharges.map((charge, index) => ({
              ...charge,
              displayOrder: index + 1
            }))
          },
          requiredDocuments: {
            create: loan.requiredDocuments.map((doc, index) => ({
              ...doc,
              displayOrder: index + 1
            }))
          },
          processSteps: {
            create: loan.processSteps.map((step, index) => ({
              ...step,
              displayOrder: index + 1
            }))
          },
          footerItems: {
            create: loan.footerItems.map((text, index) => ({
              text,
              displayOrder: index + 1
            }))
          },
          offers: {
            create: loan.offers.map((offer, index) => ({
              ...offer,
              displayOrder: index + 1
            }))
          }
        }
      });
    }

    console.log('✅ Created loans for all categories');

    // Seed Credit Cards
    console.log('💳 Seeding credit cards...');

    const creditCardData = [
      {
        name: 'HDFC Regalia Credit Card',
        slug: 'hdfc-regalia-credit-card',
        bankName: 'HDFC Bank',
        imageUrl: DEFAULT_IMAGE_URL,
        annualFee: '₹4,999',
        cardNetwork: 'Visa',
        cardType: 'premium',
        bestSuitedFor: 'Premium card for high spenders with luxury benefits',
        effectiveFree: false,
        recommended: true,
        rating: 4.8,
        videoUrl: null,
        termsConditionsUrl: 'https://www.hdfcbank.com/personal/credit-cards/regalia/terms',
        firstYearFee: '₹4,999',
        secondYearFee: '₹4,999',
        feeWaiverCondition: 'Waived on annual spend of ₹3 lakhs',
        bulletPoints: [
          'Annual Fee: ₹4,999 (waived on ₹3 lakh annual spend)',
          'Welcome Benefits: 10,000 reward points on joining',
          'Reward Rate: 10 reward points per ₹100 spent',
          'Movie Tickets: Complimentary movie tickets worth ₹1,200 annually',
          'Airport Lounge Access: Domestic lounge access 4 times a year',
          'Movie Buff eVoucher: ₹1,200 annually',
          'Golf Benefits: Golf playing privileges at premium courses'
        ],
        keyFeatures: [
          'Premium Rewards Program',
          'Luxury Benefits',
          'Travel Perks',
          'Entertainment Benefits'
        ],
        cardBenefits: [
          'Reward points on all spends',
          'Complimentary lounge access',
          'Movie and entertainment benefits',
          'Golf and sports privileges'
        ],
        bestSuitedForPoints: [
          'High-income individuals',
          'Frequent travelers',
          'Movie enthusiasts',
          'Luxury lifestyle seekers'
        ],
        summaryCharges: [
          { label: 'Annual Fee', mainText: '₹4,999', subText: 'waived on ₹3 lakh spend' },
          { label: 'Foreign Transaction Fee', mainText: '3.99%', subText: 'of transaction amount' },
          { label: 'Cash Advance Fee', mainText: '2.5%', subText: 'minimum ₹500' },
          { label: 'Late Payment Fee', mainText: '₹500', subText: 'per month' }
        ],
        requiredDocuments: [
          { title: 'Identity Proof', description: 'PAN Card, Passport, Aadhaar Card' },
          { title: 'Address Proof', description: 'Utility bill, Bank statement' },
          { title: 'Income Proof', description: 'Salary slips, Form 16, ITR' }
        ],
        processSteps: [
          { title: 'Online Application', description: 'Apply online with basic details' },
          { title: 'Document Upload', description: 'Upload required documents' },
          { title: 'Eligibility Check', description: 'Bank verifies income and credit score' },
          { title: 'Card Issuance', description: 'Card delivered within 7-10 working days' }
        ],
        benefitSections: [
          {
            heading: 'Rewards & Benefits',
            subPoints: [
              { text: '10 reward points per ₹100 spent' },
              { text: 'Welcome bonus of 10,000 points' },
              { text: 'Reward points never expire' },
              { text: 'Points can be redeemed for various rewards' }
            ]
          },
          {
            heading: 'Travel Benefits',
            subPoints: [
              { text: '4 complimentary domestic lounge accesses annually' },
              { text: 'International lounge access on redemption' },
              { text: 'Movie tickets worth ₹1,200 annually' },
              { text: 'Golf benefits at premium courses' }
            ]
          }
        ],
        offers: [
          {
            merchant: 'HDFC Bank',
            offerType: 'Welcome Bonus',
            title: 'Welcome Reward Points',
            description: 'Earn 10,000 reward points on joining the Regalia Credit Card',
            offerValue: '10,000 Points',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          },
          {
            merchant: 'Partner Merchants',
            offerType: 'Movie Discount',
            title: 'Movie Ticket Discount',
            description: 'Get complimentary movie tickets worth ₹1,200 annually',
            offerValue: '₹1,200',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ]
      },
      {
        name: 'ICICI Unforgettable Credit Card',
        slug: 'icici-unforgettable-credit-card',
        bankName: 'ICICI Bank',
        imageUrl: DEFAULT_IMAGE_URL,
        annualFee: '₹499',
        cardNetwork: 'Visa',
        cardType: 'premium',
        bestSuitedFor: 'Premium card with reward points and lounge access',
        effectiveFree: false,
        recommended: true,
        rating: 4.6,
        videoUrl: null,
        termsConditionsUrl: 'https://www.icicibank.com/personal-banking/credit-cards/unforgettable',
        firstYearFee: '₹499',
        secondYearFee: '₹499',
        feeWaiverCondition: 'Waived on annual spend of ₹2 lakhs',
        bulletPoints: [
          'Annual Fee: ₹499 (waived on ₹2 lakh annual spend)',
          'Welcome Benefits: 1 reward point per ₹1 spent in first 3 months',
          'Reward Rate: 1 reward point per ₹1 spent on dining, groceries, departmental stores',
          'Reward Rate: 1 reward point per ₹2 spent on other categories',
          'Movie Tickets: 1 complimentary movie ticket per quarter',
          'Airport Lounge Access: 4 domestic lounge accesses annually',
          'Reward Points: 10 reward points = ₹1 redemption value'
        ],
        keyFeatures: [
          'Reward Points Program',
          'Lounge Access Benefits',
          'Movie Ticket Benefits',
          'Flexible Redemption'
        ],
        cardBenefits: [
          'Reward points on everyday spends',
          'Complimentary lounge access',
          'Movie ticket benefits',
          'Flexible reward redemption'
        ],
        bestSuitedForPoints: [
          'Reward points enthusiasts',
          'Frequent diners and shoppers',
          'Movie lovers',
          'Travelers seeking lounge access'
        ],
        summaryCharges: [
          { label: 'Annual Fee', mainText: '₹499', subText: 'waived on ₹2 lakh spend' },
          { label: 'Foreign Transaction Fee', mainText: '3.99%', subText: 'of transaction amount' },
          { label: 'Cash Advance Fee', mainText: '2.5%', subText: 'minimum ₹500' },
          { label: 'Late Payment Fee', mainText: '₹499', subText: 'per month' }
        ],
        requiredDocuments: [
          { title: 'Identity Proof', description: 'PAN Card, Passport, Aadhaar Card' },
          { title: 'Address Proof', description: 'Utility bill, Bank statement' },
          { title: 'Income Proof', description: 'Salary slips, Form 16, ITR' }
        ],
        processSteps: [
          { title: 'Online Application', description: 'Apply online with basic details' },
          { title: 'Document Upload', description: 'Upload required documents' },
          { title: 'Eligibility Check', description: 'Bank verifies income and credit score' },
          { title: 'Card Issuance', description: 'Card delivered within 7-10 working days' }
        ],
        benefitSections: [
          {
            heading: 'Rewards Program',
            subPoints: [
              { text: '1 reward point per ₹1 on dining, groceries, departmental stores' },
              { text: '1 reward point per ₹2 on other spends' },
              { text: 'Welcome boost: 1 point per ₹1 in first 3 months' },
              { text: '10 reward points = ₹1 redemption value' }
            ]
          },
          {
            heading: 'Lifestyle Benefits',
            subPoints: [
              { text: '4 complimentary domestic lounge accesses annually' },
              { text: '1 complimentary movie ticket per quarter' },
              { text: 'Reward points can be redeemed for various rewards' },
              { text: 'Flexible redemption options available' }
            ]
          }
        ],
        offers: [
          {
            merchant: 'ICICI Bank',
            offerType: 'Welcome Boost',
            title: 'Welcome Reward Boost',
            description: 'Earn 1 reward point per ₹1 spent in first 3 months',
            offerValue: '3x Points',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-03-31'),
            isActive: true
          }
        ]
      },
      {
        name: 'SBI SimplyCLICK Credit Card',
        slug: 'sbi-simplyclick-credit-card',
        bankName: 'State Bank of India',
        imageUrl: DEFAULT_IMAGE_URL,
        annualFee: '₹499',
        cardNetwork: 'Visa',
        cardType: 'standard',
        bestSuitedFor: 'Online shoppers and reward points collectors',
        effectiveFree: false,
        recommended: true,
        rating: 4.4,
        videoUrl: null,
        termsConditionsUrl: 'https://www.sbicard.com/en/personal/credit-cards/simplyclick.page',
        firstYearFee: '₹499',
        secondYearFee: '₹499',
        feeWaiverCondition: 'Waived on annual spend of ₹1 lakh',
        bulletPoints: [
          'Annual Fee: ₹499 (waived on ₹1 lakh annual spend)',
          'Welcome Benefits: 10 reward points per ₹100 spent in first 3 months',
          'Reward Rate: 10 reward points per ₹100 spent on online transactions',
          'Reward Rate: 1 reward point per ₹100 spent on other transactions',
          'IRCTC Booking: 10% value back on IRCTC ticket bookings',
          'Movie Tickets: 10 reward points per ₹100 on BookMyShow',
          'Reward Points: 1 reward point = ₹1 redemption value'
        ],
        keyFeatures: [
          'Online Shopping Rewards',
          'IRCTC Booking Benefits',
          'Movie Ticket Rewards',
          'Simple Reward Structure'
        ],
        cardBenefits: [
          'Higher rewards on online spends',
          'IRCTC booking benefits',
          'Movie ticket rewards',
          'Easy reward redemption'
        ],
        bestSuitedForPoints: [
          'Online shoppers',
          'Frequent travelers',
          'Movie enthusiasts',
          'Reward points collectors'
        ],
        summaryCharges: [
          { label: 'Annual Fee', mainText: '₹499', subText: 'waived on ₹1 lakh spend' },
          { label: 'Foreign Transaction Fee', mainText: '3.99%', subText: 'of transaction amount' },
          { label: 'Cash Advance Fee', mainText: '2.5%', subText: 'minimum ₹500' },
          { label: 'Late Payment Fee', mainText: '₹500', subText: 'per month' }
        ],
        requiredDocuments: [
          { title: 'Identity Proof', description: 'PAN Card, Passport, Aadhaar Card' },
          { title: 'Address Proof', description: 'Utility bill, Bank statement' },
          { title: 'Income Proof', description: 'Salary slips, Form 16, ITR' }
        ],
        processSteps: [
          { title: 'Online Application', description: 'Apply online with basic details' },
          { title: 'Document Upload', description: 'Upload required documents' },
          { title: 'Eligibility Check', description: 'Bank verifies income and credit score' },
          { title: 'Card Issuance', description: 'Card delivered within 7-10 working days' }
        ],
        benefitSections: [
          {
            heading: 'Online Rewards',
            subPoints: [
              { text: '10 reward points per ₹100 on online spends' },
              { text: 'Welcome boost in first 3 months' },
              { text: 'IRCTC booking rewards' },
              { text: 'Movie ticket rewards on BookMyShow' }
            ]
          },
          {
            heading: 'Reward Redemption',
            subPoints: [
              { text: '1 reward point = ₹1 redemption value' },
              { text: 'Redeem for gift cards, vouchers' },
              { text: 'Easy redemption process' },
              { text: 'No minimum redemption limit' }
            ]
          }
        ],
        offers: [
          {
            merchant: 'SBI',
            offerType: 'Welcome Bonus',
            title: 'Welcome Reward Boost',
            description: 'Earn 10 reward points per ₹100 spent in first 3 months',
            offerValue: '3x Points',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-03-31'),
            isActive: true
          }
        ]
      }
    ];

    for (const card of creditCardData) {
      // Determine categories based on card name
      const categorySlugs = ['rewardscards']; // Default category
      
      // Add cashback category for cards that offer cashback
      if (card.name === 'SBI SimplyCLICK Credit Card') {
        categorySlugs.push('cashback');
      }
      
      const categories = createdCategories.filter(c => 
        c.type === 'CREDIT_CARD' && categorySlugs.includes(c.slug)
      );

      await prisma.creditCardProduct.create({
        data: {
          ...card,
          categories: categories.length > 0 ? { connect: categories.map(cat => ({ id: cat.id })) } : undefined,
          bulletPoints: {
            create: card.bulletPoints.map((text, index) => ({
              text,
              displayOrder: index + 1
            }))
          },
          keyFeatures: {
            create: card.keyFeatures.map((feature, index) => ({
              feature,
              displayOrder: index + 1
            }))
          },
          cardBenefits: {
            create: card.cardBenefits.map((benefit, index) => ({
              benefit,
              displayOrder: index + 1
            }))
          },
          bestSuitedForPoints: {
            create: card.bestSuitedForPoints.map((text, index) => ({
              text,
              displayOrder: index + 1
            }))
          },
          summaryCharges: {
            create: card.summaryCharges.map((charge, index) => ({
              ...charge,
              displayOrder: index + 1
            }))
          },
          requiredDocuments: {
            create: card.requiredDocuments.map((doc, index) => ({
              ...doc,
              displayOrder: index + 1
            }))
          },
          processSteps: {
            create: card.processSteps.map((step, index) => ({
              ...step,
              displayOrder: index + 1
            }))
          },
          benefitSections: {
            create: card.benefitSections.map((section, sectionIndex) => ({
              heading: section.heading,
              displayOrder: sectionIndex + 1,
              subPoints: {
                create: section.subPoints.map((point, pointIndex) => ({
                  text: point.text,
                  displayOrder: pointIndex + 1
                }))
              }
            }))
          },
          offers: {
            create: card.offers.map((offer, index) => ({
              ...offer,
              displayOrder: index + 1
            }))
          }
        }
      });
    }

    console.log('✅ Created credit cards');

    // Seed Debit Cards
    console.log('💳 Seeding debit cards...');

    const debitCardData = [
      {
        name: 'HDFC Millennia Debit Card',
        slug: 'hdfc-millennia-debit-card',
        bankName: 'HDFC Bank',
        imageUrl: DEFAULT_IMAGE_URL,
        accountType: 'Savings',
        cardNetwork: 'Visa',
        cardType: 'premium',
        annualFee: 499,
        atmWithdrawalLimit: 100000,
        posLimit: 200000,
        onlineLimit: 50000,
        internationalUsage: true,
        contactless: true,
        loungeAccess: true,
        loungeAccessDetails: '4 complimentary visits per quarter',
        cashbackRate: 1.0,
        rewardPoints: true,
        fuelSurcharge: true,
        accidentInsurance: true,
        purchaseProtection: true,
        fraudProtection: true,
        zeroBilling: true,
        minimumBalance: 5000,
        rating: 4.2,
        recommended: true,
        bestFor: 'Premium Benefits',
        keyStatement: 'Premium debit card with reward points and lounge access',
        bulletPoints: [
          'Annual Fee: ₹499 (waived on annual spend of ₹1 lakh)',
          'Welcome Benefits: ₹500 reward points on joining',
          'Reward Rate: 5 reward points per ₹100 spent',
          'Monthly Reward Value: ₹250 (on ₹50,000 monthly spend)',
          'ATM Withdrawals: Free at HDFC ATMs',
          'POS Transactions: Free',
          'International Transactions: 3.99% fee'
        ],
        keyFeatures: [
          { title: 'Reward Points Program', description: 'Earn reward points on every spend' },
          { title: 'Zero ATM Fees', description: 'Free ATM withdrawals at HDFC ATMs' },
          { title: 'International Usage', description: 'Use card internationally with 3.99% fee' },
          { title: 'Premium Benefits', description: 'Access to premium banking services' }
        ],
        safetyFeatures: [
          { featureName: 'EMV Chip Technology', description: 'Secure chip-based transactions' },
          { featureName: 'Contactless Payments', description: 'Tap and pay functionality' },
          { featureName: 'Transaction Alerts', description: 'Real-time SMS notifications' },
          { featureName: 'Online Banking Integration', description: 'Seamless online banking access' }
        ],
        offers: [
          {
            merchant: 'HDFC Bank',
            offerType: 'Welcome Bonus',
            title: 'Welcome Reward Points',
            description: 'Earn ₹500 reward points on joining Millennia Debit Card',
            offerValue: '₹500',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          },
          {
            merchant: 'Partner Merchants',
            offerType: 'Cashback',
            title: 'Monthly Reward Program',
            description: 'Earn reward points on monthly spends with automatic redemption',
            offerValue: '₹250/month',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ],
        categorySlugs: ['debit-cashback', 'lounge-access', 'debit-international']
      },
      {
        name: 'ICICI Pocket Debit Card',
        slug: 'icici-pocket-debit-card',
        bankName: 'ICICI Bank',
        imageUrl: DEFAULT_IMAGE_URL,
        accountType: 'Savings',
        cardNetwork: 'Visa',
        cardType: 'classic',
        annualFee: 0,
        atmWithdrawalLimit: 40000,
        posLimit: 100000,
        onlineLimit: 25000,
        internationalUsage: false,
        contactless: true,
        loungeAccess: false,
        cashbackRate: 0.5,
        rewardPoints: true,
        fuelSurcharge: false,
        accidentInsurance: false,
        purchaseProtection: false,
        fraudProtection: true,
        zeroBilling: true,
        minimumBalance: 0,
        rating: 3.8,
        recommended: false,
        bestFor: 'Zero Fee',
        keyStatement: 'Lifetime free debit card with basic features',
        bulletPoints: [
          'Annual Fee: Nil (Lifetime free)',
          'Welcome Benefits: No joining fee',
          'Reward Rate: 1 reward point per ₹100 spent',
          'Monthly Reward Value: ₹25 (on ₹25,000 monthly spend)',
          'ATM Withdrawals: Free at ICICI ATMs',
          'POS Transactions: Free',
          'International Transactions: Not supported'
        ],
        keyFeatures: [
          { title: 'Lifetime Free', description: 'No annual fee for lifetime' },
          { title: 'Reward Points', description: 'Earn reward points on spends' },
          { title: 'Zero Fees', description: 'No hidden charges' },
          { title: 'Easy to Use', description: 'Simple and user-friendly interface' }
        ],
        safetyFeatures: [
          { featureName: 'EMV Chip Technology', description: 'Secure chip-based transactions' },
          { featureName: 'Contactless Payments', description: 'Tap and pay functionality' },
          { featureName: 'Transaction Alerts', description: 'Real-time SMS notifications' },
          { featureName: 'Mobile Banking Integration', description: 'Seamless mobile banking access' }
        ],
        offers: [
          {
            merchant: 'ICICI Bank',
            offerType: 'Cashback',
            title: 'Monthly Reward Program',
            description: 'Earn reward points on monthly spends',
            offerValue: '₹25/month',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ],
        categorySlugs: ['zero-fee', 'debit-cashback']
      },
      {
        name: 'SBI Unnati Debit Card',
        slug: 'sbi-unnati-debit-card',
        bankName: 'State Bank of India',
        imageUrl: DEFAULT_IMAGE_URL,
        accountType: 'Savings',
        cardNetwork: 'Visa',
        cardType: 'premium',
        annualFee: 499,
        atmWithdrawalLimit: 100000,
        posLimit: 200000,
        onlineLimit: 50000,
        internationalUsage: true,
        contactless: true,
        loungeAccess: true,
        loungeAccessDetails: 'Domestic lounge access included',
        cashbackRate: 1.5,
        rewardPoints: true,
        fuelSurcharge: true,
        accidentInsurance: true,
        purchaseProtection: true,
        fraudProtection: true,
        zeroBilling: true,
        minimumBalance: 10000,
        rating: 4.5,
        recommended: true,
        bestFor: 'High Rewards',
        keyStatement: 'High reward debit card with premium benefits',
        bulletPoints: [
          'Annual Fee: ₹499 (waived on annual spend of ₹2 lakhs)',
          'Welcome Benefits: ₹1,000 reward points on joining',
          'Reward Rate: 10 reward points per ₹100 spent',
          'Monthly Reward Value: ₹1,000 (on ₹1,00,000 monthly spend)',
          'ATM Withdrawals: Free at SBI ATMs',
          'POS Transactions: Free',
          'International Transactions: 3.99% fee'
        ],
        keyFeatures: [
          { title: 'High Reward Points', description: 'Earn 10 reward points per ₹100 spent' },
          { title: 'Premium Benefits', description: 'Access to premium banking services' },
          { title: 'Zero ATM Fees', description: 'Free ATM withdrawals at SBI ATMs' },
          { title: 'International Usage', description: 'Use card internationally with 3.99% fee' }
        ],
        safetyFeatures: [
          { featureName: 'EMV Chip Technology', description: 'Secure chip-based transactions' },
          { featureName: 'Contactless Payments', description: 'Tap and pay functionality' },
          { featureName: 'Transaction Alerts', description: 'Real-time SMS notifications' },
          { featureName: 'YONO Integration', description: 'Seamless YONO app integration' }
        ],
        offers: [
          {
            merchant: 'SBI',
            offerType: 'Welcome Bonus',
            title: 'Welcome Reward Points',
            description: 'Earn ₹1,000 reward points on joining Unnati Debit Card',
            offerValue: '₹1,000',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          },
          {
            merchant: 'Partner Merchants',
            offerType: 'Cashback',
            title: 'Monthly Reward Program',
            description: 'Earn high reward points on monthly spends',
            offerValue: '₹1,000/month',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ],
        categorySlugs: ['debit-cashback', 'lounge-access', 'debit-international']
      },
      {
        name: 'Axis Bank Select Debit Card',
        slug: 'axis-select-debit-card',
        bankName: 'Axis Bank',
        imageUrl: DEFAULT_IMAGE_URL,
        accountType: 'Savings',
        cardNetwork: 'Visa',
        cardType: 'premium',
        annualFee: 499,
        atmWithdrawalLimit: 50000,
        posLimit: 100000,
        onlineLimit: 25000,
        internationalUsage: true,
        contactless: true,
        loungeAccess: false,
        cashbackRate: 1.0,
        rewardPoints: true,
        fuelSurcharge: false,
        accidentInsurance: false,
        purchaseProtection: false,
        fraudProtection: true,
        zeroBilling: true,
        minimumBalance: 10000,
        rating: 4.0,
        recommended: true,
        bestFor: 'International Travel',
        keyStatement: 'Premium debit card for international travelers',
        bulletPoints: [
          'Annual Fee: ₹499',
          'International Usage: Supported',
          'Contactless Payments: Available',
          'Cashback Rate: 1% on international transactions',
          'ATM Withdrawals: Free at Axis ATMs',
          'POS Transactions: Free',
          'Foreign Transaction Fee: 3.99%'
        ],
        keyFeatures: [
          { title: 'International Usage', description: 'Use card internationally with 3.99% fee' },
          { title: 'Contactless Payments', description: 'Tap and pay functionality' },
          { title: 'Cashback on International Spends', description: '1% cashback on international transactions' },
          { title: 'Premium Benefits', description: 'Access to premium banking services' }
        ],
        safetyFeatures: [
          { featureName: 'EMV Chip Technology', description: 'Secure chip-based transactions' },
          { featureName: 'Transaction Alerts', description: 'Real-time SMS notifications' },
          { featureName: 'Online Banking Integration', description: 'Seamless online banking access' },
          { featureName: 'Fraud Protection', description: 'Advanced fraud detection and prevention' }
        ],
        offers: [
          {
            merchant: 'Axis Bank',
            offerType: 'Cashback',
            title: 'International Cashback',
            description: '1% cashback on all international transactions',
            offerValue: '1%',
            validFrom: new Date('2026-01-01'),
            validTill: new Date('2026-12-31'),
            isActive: true
          }
        ],
        categorySlugs: ['debit-international', 'debit-cashback']
      }
    ];

    for (const card of debitCardData) {
      const { categorySlugs, ...cardData } = card;

      // Find categories to connect
      const categoriesToConnect = createdCategories.filter(c =>
        c.type === 'DEBIT_CARD' && categorySlugs.includes(c.slug)
      );

      await prisma.debitCardProduct.create({
        data: {
          ...cardData,
          categories: {
            connect: categoriesToConnect.map(cat => ({ id: cat.id }))
          },
          bulletPoints: {
            create: card.bulletPoints.map((text, index) => ({
              text,
              displayOrder: index + 1
            }))
          },
          keyFeatures: {
            create: card.keyFeatures.map((feature, index) => ({
              title: feature.title,
              description: feature.description,
              displayOrder: index + 1
            }))
          },
          safetyFeatures: {
            create: card.safetyFeatures.map((feature, index) => ({
              featureName: feature.featureName,
              description: feature.description,
              displayOrder: index + 1
            }))
          },
          offers: {
            create: card.offers.map((offer, index) => ({
              ...offer,
              displayOrder: index + 1
            }))
          }
        }
      });
    }

    console.log('✅ Created debit cards');

    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - ${loanData.length} loan products`);
    console.log(`   - ${creditCardData.length} credit card products`);
    console.log(`   - ${debitCardData.length} debit card products`);
    console.log(`   - ${createdCategories.length} categories`);
    console.log('   - All products use the provided image URL');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
