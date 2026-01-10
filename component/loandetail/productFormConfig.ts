// Helper functions and configurations for product-specific application questions

export type ProductCategory = 
  | 'personal-loan'
  | 'home-loan'
  | 'loan-against-property'
  | 'business-loan'
  | 'education-loan'
  | 'new-car'
  | 'used-car'
  | 'new-bike'
  | 'used-bike'
  | 'professional-loan'
  | 'loan-against-security'
  | 'transfer-home-loan'
  | 'transfer-personal-loan'
  | 'credit-card'
  | 'secured-credit-card'
  | 'student-credit-card'
  | 'business-credit-card'
  | 'addon-credit-card'
  | 'nri-credit-card'
  | 'hni-credit-card';

export interface FormStep {
  id: number;
  title: string;
  fields: FormField[];
  skipCondition?: (data: any) => boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'radio' | 'date' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: (value: string) => boolean;
  errorMessage?: string;
  maxLength?: number;
  minLength?: number;
}

// Common steps for all loans
const commonEmploymentStep: FormStep = {
  id: 1,
  title: 'Employment Type',
  fields: [{
    name: 'employmentType',
    label: 'Select Employment Type',
    type: 'radio',
    required: true,
    options: [
      { value: 'salaried', label: 'Salaried' },
      { value: 'business', label: 'Self - Employed Business' },
      { value: 'professional', label: 'Self - Employed Professional' },
    ]
  }]
};

const commonIncomeStep: FormStep = {
  id: 2,
  title: 'Yearly Income',
  fields: [{
    name: 'annualIncome',
    label: 'Select Annual Income Range',
    type: 'select',
    required: true,
    options: [
      { value: '300000', label: 'Up to 3 Lakhs' },
      { value: '350000', label: '₹3 - ₹4 Lakh' },
      { value: '450000', label: '₹4 - 5 Lakh' },
      { value: '750000', label: '₹5- ₹10 Lakh' },
      { value: '1000000', label: '₹10 Lakhs +' },
    ]
  }]
};

const commonEmploymentDetailsStep: FormStep = {
  id: 3,
  title: 'Employment Details',
  fields: [
    {
      name: 'employerName',
      label: 'Company/Business Name',
      type: 'text',
      required: true,
      placeholder: 'Enter Company Name',
      minLength: 3
    },
    {
      name: 'workExperience',
      label: 'Total Work Experience',
      type: 'select',
      required: true,
      options: [
        { value: 'less_1', label: 'Less than 1 Year' },
        { value: '1_3', label: '1 - 3 Years' },
        { value: '3_5', label: '3 - 5 Years' },
        { value: '5_10', label: '5 - 10 Years' },
        { value: '10_plus', label: '10+ Years' },
      ]
    }
  ]
};

const commonResidenceStep: FormStep = {
  id: 4,
  title: 'Residence Type',
  fields: [{
    name: 'residenceType',
    label: 'Select Residence Type',
    type: 'radio',
    required: true,
    options: [
      { value: 'self', label: 'Own by Self/Spouse' },
      { value: 'parent', label: 'Own by Parent/Siblings' },
      { value: 'rented', label: 'Rented With Family / Stay Alone' },
      { value: 'pg', label: 'Paying Guest / Hostel / PG' },
      { value: 'company', label: 'Company Provided' },
    ]
  }]
};

const commonAddressStep: FormStep = {
  id: 5,
  title: 'Resident City',
  fields: [
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
      placeholder: 'Select or type your city'
    },
    {
      name: 'pincode',
      label: 'Pin Code',
      type: 'text',
      required: true,
      placeholder: 'Enter 6-digit Pincode',
      maxLength: 6,
      validation: (value) => /^\d{6}$/.test(value),
      errorMessage: 'Please enter a valid 6-digit pincode'
    }
  ]
};

const commonPersonalDetailsStep: FormStep = {
  id: 100, // High number to ensure it's near the end
  title: 'Personal Details',
  fields: [
    {
      name: 'applicantName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your full name',
      minLength: 2
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      required: true
    },
    {
      name: 'mobileNumber',
      label: 'Mobile Number',
      type: 'tel',
      required: true,
      placeholder: 'Enter 10-digit Number',
      maxLength: 10,
      validation: (value) => /^[6-9]\d{9}$/.test(value),
      errorMessage: 'Please enter a valid 10-digit mobile number starting with 6-9'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'name@example.com',
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: 'Please enter a valid email address'
    },
    {
      name: 'panNumber',
      label: 'PAN Number',
      type: 'text',
      required: true,
      placeholder: 'ABCDE1234F',
      maxLength: 10,
      validation: (value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value),
      errorMessage: 'Invalid PAN Number format. Example: ABCDE1234F'
    }
  ]
};

// Product-specific steps
export const productFormSteps: Record<ProductCategory, FormStep[]> = {
  'personal-loan': [
    commonEmploymentStep,
    commonIncomeStep,
    commonEmploymentDetailsStep,
    commonResidenceStep,
    commonAddressStep,
    {
      id: 6,
      title: 'Additional Information',
      fields: [
        {
          name: 'education',
          label: 'Highest Education',
          type: 'select',
          required: true,
          options: [
            { value: '10th', label: '10th' },
            { value: '12th', label: '12th' },
            { value: 'graduate', label: 'Graduate' },
            { value: 'postgraduate', label: 'Post-Graduate' },
            { value: 'doctorate', label: 'Doctorate' },
          ]
        },
        {
          name: 'currentAddress',
          label: 'Current Address',
          type: 'textarea',
          required: true,
          placeholder: 'Enter your complete address'
        }
      ]
    },
    {
      id: 7,
      title: 'Loan Details',
      fields: [
        {
          name: 'loanAmount',
          label: 'Desired Loan Amount',
          type: 'select',
          required: true,
          options: [
            { value: '100000', label: 'Up to 1 Lakhs' },
            { value: '300000', label: '₹1 - ₹5 Lakh' },
            { value: '750000', label: '₹5 - ₹10 Lakh' },
            { value: '1250000', label: '₹10- ₹15 Lakh' },
            { value: '1750000', label: '₹15- ₹20 Lakh' },
            { value: '2500000', label: '₹20 Lakhs +' },
          ]
        },
        {
          name: 'loanPurpose',
          label: 'Purpose of Loan',
          type: 'text',
          required: true,
          placeholder: 'e.g., Wedding, Medical, Home renovation'
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'home-loan': [
    commonEmploymentStep,
    commonIncomeStep,
    commonEmploymentDetailsStep,
    {
      id: 6,
      title: 'Property Details',
      fields: [
        {
          name: 'propertyAddress',
          label: 'Property Address/Location',
          type: 'textarea',
          required: true,
          placeholder: 'Enter complete property address'
        },
        {
          name: 'propertyType',
          label: 'Property Type',
          type: 'select',
          required: true,
          options: [
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' },
            { value: 'plot', label: 'Plot' },
          ]
        },
        {
          name: 'constructionStatus',
          label: 'Construction Status',
          type: 'select',
          required: true,
          options: [
            { value: 'ready', label: 'Ready to Move' },
            { value: 'under_construction', label: 'Under Construction' },
          ]
        }
      ]
    },
    {
      id: 7,
      title: 'Financial Details',
      fields: [
        {
          name: 'loanAmount',
          label: 'Desired Loan Amount',
          type: 'number',
          required: true,
          placeholder: 'Enter amount in ₹'
        },
        {
          name: 'propertyValue',
          label: 'Market Value of Property',
          type: 'number',
          required: true,
          placeholder: 'Enter property value in ₹'
        },
        {
          name: 'downPayment',
          label: 'Down Payment Amount',
          type: 'number',
          required: true,
          placeholder: 'Enter down payment in ₹'
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'loan-against-property': [
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 3,
      title: 'Employment Status',
      fields: [
        {
          name: 'isSalaried',
          label: 'Are you salaried?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]
        },
        {
          name: 'yearsInBusiness',
          label: 'Years of Business Experience (if self-employed)',
          type: 'number',
          required: false,
          placeholder: 'Enter years'
        },
        {
          name: 'businessType',
          label: 'Type of Business (if applicable)',
          type: 'text',
          required: false,
          placeholder: 'e.g., Manufacturing, Retail, Service'
        }
      ]
    },
    {
      id: 4,
      title: 'Property Information',
      fields: [
        {
          name: 'propertyAddress',
          label: 'Property Address',
          type: 'textarea',
          required: true,
          placeholder: 'Enter complete property address'
        },
        {
          name: 'propertyType',
          label: 'Type of Property',
          type: 'select',
          required: true,
          options: [
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' },
            { value: 'industrial', label: 'Industrial' },
          ]
        },
        {
          name: 'propertyValue',
          label: 'Current Market Value of Property',
          type: 'number',
          required: true,
          placeholder: 'Enter value in ₹'
        },
        {
          name: 'existingLoanOnProperty',
          label: 'Any existing loan on this property?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]
        }
      ]
    },
    {
      id: 5,
      title: 'Loan Requirement',
      fields: [{
        name: 'loanAmount',
        label: 'Loan Amount Required',
        type: 'number',
        required: true,
        placeholder: 'Enter amount in ₹'
      }]
    },
    commonPersonalDetailsStep
  ],

  'business-loan': [
    {
      id: 1,
      title: 'Business Information',
      fields: [
        {
          name: 'registeredBusinessName',
          label: 'Registered Business Name',
          type: 'text',
          required: true,
          placeholder: 'Enter registered business name'
        },
        {
          name: 'businessType',
          label: 'Business Type',
          type: 'select',
          required: true,
          options: [
            { value: 'proprietorship', label: 'Proprietorship' },
            { value: 'partnership', label: 'Partnership' },
            { value: 'llp', label: 'LLP' },
            { value: 'private_limited', label: 'Private Limited' },
          ]
        },
        {
          name: 'yearsInOperation',
          label: 'Years in Operation',
          type: 'number',
          required: true,
          placeholder: 'Enter number of years'
        },
        {
          name: 'industryType',
          label: 'Industry Type',
          type: 'select',
          required: true,
          options: [
            { value: 'manufacturing', label: 'Manufacturing' },
            { value: 'service', label: 'Service' },
            { value: 'trading', label: 'Trading' },
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Financial Details',
      fields: [
        {
          name: 'businessTurnover',
          label: 'Annual Business Turnover',
          type: 'number',
          required: true,
          placeholder: 'Enter turnover in ₹'
        },
        {
          name: 'businessPurpose',
          label: 'Purpose of Loan',
          type: 'select',
          required: true,
          options: [
            { value: 'expansion', label: 'Business Expansion' },
            { value: 'working_capital', label: 'Working Capital' },
            { value: 'equipment', label: 'Equipment Purchase' },
          ]
        },
        {
          name: 'loanAmount',
          label: 'Loan Amount Required',
          type: 'number',
          required: true,
          placeholder: 'Enter amount in ₹'
        },
        {
          name: 'currentLoans',
          label: 'Current Loans/Overdrafts Amount',
          type: 'number',
          required: false,
          placeholder: 'Enter existing loan amount (if any)'
        }
      ]
    },
    {
      id: 3,
      title: 'Registration Details',
      fields: [
        {
          name: 'businessPan',
          label: 'Business PAN Card Number',
          type: 'text',
          required: true,
          placeholder: 'ABCDE1234F',
          maxLength: 10,
          validation: (value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
        },
        {
          name: 'gstNumber',
          label: 'GST Registration Number (if applicable)',
          type: 'text',
          required: false,
          placeholder: 'Enter GST number'
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'education-loan': [
    {
      id: 1,
      title: 'Student Information',
      fields: [
        {
          name: 'studentName',
          label: "Student's Name",
          type: 'text',
          required: true,
          placeholder: 'Enter student full name'
        },
        {
          name: 'courseName',
          label: 'Course Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., B.Tech, MBA, MBBS'
        },
        {
          name: 'universityName',
          label: 'University/College Name',
          type: 'text',
          required: true,
          placeholder: 'Enter university/college name'
        },
        {
          name: 'courseDuration',
          label: 'Course Duration (Years)',
          type: 'number',
          required: true,
          placeholder: 'Enter duration in years'
        }
      ]
    },
    {
      id: 2,
      title: 'Financial Details',
      fields: [
        {
          name: 'totalCourseFees',
          label: 'Total Course Fees',
          type: 'number',
          required: true,
          placeholder: 'Enter total fees in ₹'
        },
        {
          name: 'loanAmount',
          label: 'Loan Amount Required',
          type: 'number',
          required: true,
          placeholder: 'Enter amount in ₹'
        },
        {
          name: 'parentIncome',
          label: "Parent/Guardian's Annual Income",
          type: 'number',
          required: true,
          placeholder: 'Enter annual income in ₹'
        }
      ]
    },
    {
      id: 3,
      title: 'Admission Status',
      fields: [
        {
          name: 'admissionStatus',
          label: 'Admission Status',
          type: 'select',
          required: true,
          options: [
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'applied', label: 'Applied' },
          ]
        },
        {
          name: 'admissionSecured',
          label: 'Have you secured admission?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'new-car': [
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 3,
      title: 'Vehicle Details',
      fields: [
        {
          name: 'vehicleMake',
          label: 'Car Make',
          type: 'text',
          required: true,
          placeholder: 'e.g., Maruti, Hyundai, Honda'
        },
        {
          name: 'vehicleModel',
          label: 'Car Model',
          type: 'text',
          required: true,
          placeholder: 'e.g., Swift, Creta, City'
        },
        {
          name: 'vehicleVariant',
          label: 'Car Variant',
          type: 'text',
          required: true,
          placeholder: 'e.g., VXI, SX, ZX'
        },
        {
          name: 'exShowroomPrice',
          label: 'Ex-showroom Price',
          type: 'number',
          required: true,
          placeholder: 'Enter price in ₹'
        }
      ]
    },
    {
      id: 4,
      title: 'Loan Details',
      fields: [
        {
          name: 'downPayment',
          label: 'Down Payment Amount',
          type: 'number',
          required: true,
          placeholder: 'Enter down payment in ₹'
        },
        {
          name: 'vehicleTenure',
          label: 'Loan Tenure (Months)',
          type: 'select',
          required: true,
          options: [
            { value: '12', label: '12 Months' },
            { value: '24', label: '24 Months' },
            { value: '36', label: '36 Months' },
            { value: '48', label: '48 Months' },
            { value: '60', label: '60 Months' },
            { value: '84', label: '84 Months' },
          ]
        },
        {
          name: 'exchangeVehicle',
          label: 'Exchange Existing Car?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]
        },
        {
          name: 'registrationCity',
          label: 'City of Registration',
          type: 'text',
          required: true,
          placeholder: 'Enter city name'
        },
        {
          name: 'vehicleUsage',
          label: 'Car Usage',
          type: 'select',
          required: true,
          options: [
            { value: 'personal', label: 'Personal' },
            { value: 'commercial', label: 'Commercial' },
          ]
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'used-car': [
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 3,
      title: 'Vehicle Information',
      fields: [
        {
          name: 'vehicleMake',
          label: 'Car Make',
          type: 'text',
          required: true,
          placeholder: 'e.g., Maruti, Hyundai'
        },
        {
          name: 'vehicleModel',
          label: 'Car Model',
          type: 'text',
          required: true,
          placeholder: 'e.g., Swift, i20'
        },
        {
          name: 'manufactureYear',
          label: 'Year of Manufacture',
          type: 'number',
          required: true,
          placeholder: 'e.g., 2018'
        },
        {
          name: 'registrationYear',
          label: 'Year of Registration',
          type: 'number',
          required: true,
          placeholder: 'e.g., 2018'
        },
        {
          name: 'currentMarketValue',
          label: 'Current Market Value',
          type: 'number',
          required: true,
          placeholder: 'Enter value in ₹'
        },
        {
          name: 'kilometersDriven',
          label: 'Kilometers Driven',
          type: 'number',
          required: true,
          placeholder: 'Enter km'
        }
      ]
    },
    {
      id: 4,
      title: 'Additional Details',
      fields: [
        {
          name: 'sellerInfo',
          label: "Seller's Information",
          type: 'text',
          required: true,
          placeholder: 'Enter seller name/contact'
        },
        {
          name: 'rcAvailable',
          label: 'Is RC Available?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]
        },
        {
          name: 'vehicleCondition',
          label: 'Car Condition',
          type: 'select',
          required: true,
          options: [
            { value: 'excellent', label: 'Excellent' },
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' },
          ]
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'new-bike': [
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 3,
      title: 'Bike Details',
      fields: [
        {
          name: 'vehicleMake',
          label: 'Bike Make',
          type: 'text',
          required: true,
          placeholder: 'e.g., Hero, Honda, Bajaj'
        },
        {
          name: 'vehicleModel',
          label: 'Bike Model',
          type: 'text',
          required: true,
          placeholder: 'e.g., Splendor, Activa'
        },
        {
          name: 'engineCapacity',
          label: 'Engine Capacity (CC)',
          type: 'number',
          required: true,
          placeholder: 'e.g., 125, 150, 200'
        },
        {
          name: 'exShowroomPrice',
          label: 'Ex-showroom Price',
          type: 'number',
          required: true,
          placeholder: 'Enter price in ₹'
        }
      ]
    },
    {
      id: 4,
      title: 'Loan Details',
      fields: [
        {
          name: 'loanAmount',
          label: 'Loan Amount Required',
          type: 'number',
          required: true,
          placeholder: 'Enter amount in ₹'
        },
        {
          name: 'applicantAge',
          label: "Applicant's Age",
          type: 'number',
          required: true,
          placeholder: 'Enter age'
        },
        {
          name: 'registrationCity',
          label: 'Registration City',
          type: 'text',
          required: true,
          placeholder: 'Enter city name'
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'used-bike': [
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 3,
      title: 'Bike Information',
      fields: [
        {
          name: 'vehicleMake',
          label: 'Bike Make',
          type: 'text',
          required: true,
          placeholder: 'e.g., Hero, Honda'
        },
        {
          name: 'vehicleModel',
          label: 'Bike Model',
          type: 'text',
          required: true,
          placeholder: 'e.g., Splendor, Activa'
        },
        {
          name: 'manufactureYear',
          label: 'Year of Manufacture',
          type: 'number',
          required: true,
          placeholder: 'e.g., 2019'
        },
        {
          name: 'registrationYear',
          label: 'Year of Registration',
          type: 'number',
          required: true,
          placeholder: 'e.g., 2019'
        },
        {
          name: 'currentMarketValue',
          label: 'Current Market Value',
          type: 'number',
          required: true,
          placeholder: 'Enter value in ₹'
        },
        {
          name: 'kilometersDriven',
          label: 'Kilometers Driven',
          type: 'number',
          required: true,
          placeholder: 'Enter km'
        },
        {
          name: 'engineCondition',
          label: 'Engine Condition',
          type: 'select',
          required: true,
          options: [
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' },
            { value: 'poor', label: 'Poor' },
          ]
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'professional-loan': [
    {
      id: 1,
      title: 'Professional Details',
      fields: [
        {
          name: 'professionalQualification',
          label: 'Professional Qualification',
          type: 'select',
          required: true,
          options: [
            { value: 'ca', label: 'Chartered Accountant (CA)' },
            { value: 'cs', label: 'Company Secretary (CS)' },
            { value: 'doctor', label: 'Doctor' },
            { value: 'engineer', label: 'Engineer' },
            { value: 'architect', label: 'Architect' },
            { value: 'lawyer', label: 'Lawyer' },
          ]
        },
        {
          name: 'registrationNumber',
          label: 'Professional Registration Number',
          type: 'text',
          required: true,
          placeholder: 'Enter registration number'
        },
        {
          name: 'yearsOfPractice',
          label: 'Years of Practice/Experience',
          type: 'number',
          required: true,
          placeholder: 'Enter years'
        }
      ]
    },
    {
      id: 2,
      title: 'Practice Information',
      fields: [
        {
          name: 'clinicOfficeAddress',
          label: 'Clinic/Office Address',
          type: 'textarea',
          required: true,
          placeholder: 'Enter complete address'
        },
        {
          name: 'professionalIncome',
          label: 'Annual Professional Income',
          type: 'number',
          required: true,
          placeholder: 'Enter income in ₹'
        }
      ]
    },
    {
      id: 3,
      title: 'Loan Purpose',
      fields: [
        {
          name: 'professionalPurpose',
          label: 'Purpose of Loan',
          type: 'select',
          required: true,
          options: [
            { value: 'equipment', label: 'Equipment Purchase' },
            { value: 'clinic_setup', label: 'Clinic/Office Setup' },
            { value: 'expansion', label: 'Expansion' },
          ]
        },
        {
          name: 'loanAmount',
          label: 'Loan Amount Required',
          type: 'number',
          required: true,
          placeholder: 'Enter amount in ₹'
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'loan-against-security': [
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 3,
      title: 'Security Details',
      fields: [
        {
          name: 'securityType',
          label: 'Type of Security',
          type: 'select',
          required: true,
          options: [
            { value: 'shares', label: 'Shares' },
            { value: 'mutual_funds', label: 'Mutual Funds' },
            { value: 'bonds', label: 'Bonds' },
          ]
        },
        {
          name: 'securityValue',
          label: 'Current Market Value of Securities',
          type: 'number',
          required: true,
          placeholder: 'Enter value in ₹'
        },
        {
          name: 'portfolioDetails',
          label: 'Portfolio Details (List of securities)',
          type: 'textarea',
          required: true,
          placeholder: 'List your securities with quantities'
        }
      ]
    },
    {
      id: 4,
      title: 'Loan Requirements',
      fields: [
        {
          name: 'desiredLTV',
          label: 'Desired Loan-to-Value Ratio (%)',
          type: 'select',
          required: true,
          options: [
            { value: '40', label: '40%' },
            { value: '50', label: '50%' },
            { value: '60', label: '60%' },
            { value: '70', label: '70%' },
          ]
        },
        {
          name: 'dematAccountNo',
          label: 'Demat Account Number',
          type: 'text',
          required: true,
          placeholder: 'Enter demat account number'
        },
        {
          name: 'brokerName',
          label: 'Broker Name',
          type: 'text',
          required: true,
          placeholder: 'Enter broker name'
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'transfer-home-loan': [
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 3,
      title: 'Current Loan Details',
      fields: [
        {
          name: 'currentLender',
          label: 'Current Lender Name',
          type: 'text',
          required: true,
          placeholder: 'Enter current bank/lender name'
        },
        {
          name: 'outstandingAmount',
          label: 'Current Outstanding Loan Amount',
          type: 'number',
          required: true,
          placeholder: 'Enter amount in ₹'
        },
        {
          name: 'currentInterestRate',
          label: 'Current Interest Rate (%)',
          type: 'number',
          required: true,
          placeholder: 'e.g., 9.5'
        },
        {
          name: 'remainingTenure',
          label: 'Remaining Tenure (Months)',
          type: 'number',
          required: true,
          placeholder: 'Enter months'
        }
      ]
    },
    {
      id: 4,
      title: 'Property & Credit Details',
      fields: [
        {
          name: 'propertyAddress',
          label: 'Property Details (Address)',
          type: 'textarea',
          required: true,
          placeholder: 'Enter complete property address'
        },
        {
          name: 'cibilScore',
          label: 'Current CIBIL Score',
          type: 'number',
          required: true,
          placeholder: 'e.g., 750'
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  'transfer-personal-loan': [
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 3,
      title: 'Current Loan Information',
      fields: [
        {
          name: 'currentLender',
          label: 'Current Lender Name',
          type: 'text',
          required: true,
          placeholder: 'Enter current bank/lender name'
        },
        {
          name: 'outstandingAmount',
          label: 'Current Outstanding Loan Amount',
          type: 'number',
          required: true,
          placeholder: 'Enter amount in ₹'
        },
        {
          name: 'currentEMI',
          label: 'Current EMI Amount',
          type: 'number',
          required: true,
          placeholder: 'Enter EMI in ₹'
        },
        {
          name: 'remainingTenure',
          label: 'Remaining Tenure (Months)',
          type: 'number',
          required: true,
          placeholder: 'Enter months'
        },
        {
          name: 'cibilScore',
          label: 'Current CIBIL Score',
          type: 'number',
          required: true,
          placeholder: 'e.g., 750'
        },
        {
          name: 'transferReason',
          label: 'Reason for Transfer',
          type: 'text',
          required: true,
          placeholder: 'e.g., Lower interest rate, Better service'
        }
      ]
    },
    commonPersonalDetailsStep
  ],

  // Credit Cards
  'credit-card': [
    {
      id: 1,
      title: 'Personal Information',
      fields: [
        {
          name: 'applicantName',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your full name'
        },
        {
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          required: true
        },
        {
          name: 'panNumber',
          label: 'PAN Card Number',
          type: 'text',
          required: true,
          placeholder: 'ABCDE1234F',
          maxLength: 10,
          validation: (value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          placeholder: 'name@example.com'
        },
        {
          name: 'mobileNumber',
          label: 'Mobile Number',
          type: 'tel',
          required: true,
          placeholder: 'Enter 10-digit Number',
          maxLength: 10
        }
      ]
    },
    commonEmploymentStep,
    commonIncomeStep,
    commonEmploymentDetailsStep,
    commonAddressStep,
    {
      id: 6,
      title: 'Credit Card Details',
      fields: [
        {
          name: 'desiredCreditLimit',
          label: 'Desired Credit Limit',
          type: 'number',
          required: true,
          placeholder: 'Enter amount in ₹'
        },
        {
          name: 'hasExistingCards',
          label: 'Any existing credit cards?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]
        },
        {
          name: 'existingBankRelationship',
          label: 'Any existing banking relationship?',
          type: 'radio',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]
        },
        {
          name: 'approximateCreditScore',
          label: 'Approximate credit score (if known)',
          type: 'select',
          required: false,
          options: [
            { value: '600-700', label: '600-700' },
            { value: '700-750', label: '700-750' },
            { value: '750+', label: '750+' },
          ]
        }
      ]
    }
  ],

  'secured-credit-card': [
    {
      id: 1,
      title: 'Personal Information',
      fields: [
        {
          name: 'applicantName',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your full name'
        },
        {
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          required: true
        },
        {
          name: 'panNumber',
          label: 'PAN Card Number',
          type: 'text',
          required: true,
          placeholder: 'ABCDE1234F',
          maxLength: 10
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true
        },
        {
          name: 'mobileNumber',
          label: 'Mobile Number',
          type: 'tel',
          required: true,
          maxLength: 10
        }
      ]
    },
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 4,
      title: 'Fixed Deposit Details',
      fields: [
        {
          name: 'fdAmount',
          label: 'Fixed Deposit Amount',
          type: 'number',
          required: true,
          placeholder: 'Enter FD amount in ₹'
        },
        {
          name: 'fdTenure',
          label: 'FD Tenure (Months)',
          type: 'select',
          required: true,
          options: [
            { value: '12', label: '12 Months' },
            { value: '24', label: '24 Months' },
            { value: '36', label: '36 Months' },
          ]
        },
        {
          name: 'fdAccountNumber',
          label: 'FD Account Number',
          type: 'text',
          required: true,
          placeholder: 'Enter FD account number'
        }
      ]
    }
  ],

  'student-credit-card': [
    {
      id: 1,
      title: 'Personal Information',
      fields: [
        {
          name: 'applicantName',
          label: 'Full Name',
          type: 'text',
          required: true
        },
        {
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          required: true
        },
        {
          name: 'panNumber',
          label: 'PAN Card Number',
          type: 'text',
          required: true,
          maxLength: 10
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true
        },
        {
          name: 'mobileNumber',
          label: 'Mobile Number',
          type: 'tel',
          required: true,
          maxLength: 10
        }
      ]
    },
    {
      id: 2,
      title: 'Student Details',
      fields: [
        {
          name: 'studentId',
          label: 'Student ID Number',
          type: 'text',
          required: true,
          placeholder: 'Enter student ID'
        },
        {
          name: 'collegeName',
          label: 'College/University Name',
          type: 'text',
          required: true,
          placeholder: 'Enter college name'
        },
        {
          name: 'courseNameForCard',
          label: 'Course Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., B.Tech, MBA'
        },
        {
          name: 'yearOfStudy',
          label: 'Year of Study',
          type: 'select',
          required: true,
          options: [
            { value: '1', label: 'First Year' },
            { value: '2', label: 'Second Year' },
            { value: '3', label: 'Third Year' },
            { value: '4', label: 'Fourth Year' },
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Parent/Guardian Information',
      fields: [{
        name: 'parentAnnualIncome',
        label: "Parent's Annual Income",
        type: 'number',
        required: true,
        placeholder: 'Enter income in ₹'
      }]
    }
  ],

  'business-credit-card': [
    {
      id: 1,
      title: 'Personal Information',
      fields: [
        {
          name: 'applicantName',
          label: 'Full Name',
          type: 'text',
          required: true
        },
        {
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          required: true
        },
        {
          name: 'panNumber',
          label: 'PAN Card Number',
          type: 'text',
          required: true,
          maxLength: 10
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true
        },
        {
          name: 'mobileNumber',
          label: 'Mobile Number',
          type: 'tel',
          required: true,
          maxLength: 10
        }
      ]
    },
    {
      id: 2,
      title: 'Business Information',
      fields: [
        {
          name: 'registeredBusinessName',
          label: 'Business Name',
          type: 'text',
          required: true
        },
        {
          name: 'businessRegistrationNo',
          label: 'Business Registration Number',
          type: 'text',
          required: true
        },
        {
          name: 'businessTurnoverForCard',
          label: 'Business Turnover',
          type: 'number',
          required: true,
          placeholder: 'Enter turnover in ₹'
        },
        {
          name: 'businessAddressForCard',
          label: 'Business Address',
          type: 'textarea',
          required: true
        },
        {
          name: 'businessPan',
          label: 'Business PAN Card Number',
          type: 'text',
          required: true,
          maxLength: 10
        }
      ]
    }
  ],

  'addon-credit-card': [
    {
      id: 1,
      title: 'Primary Cardholder Details',
      fields: [
        {
          name: 'primaryCardholderName',
          label: "Primary Cardholder's Name",
          type: 'text',
          required: true
        },
        {
          name: 'relationshipWithPrimary',
          label: 'Relationship with Primary Cardholder',
          type: 'select',
          required: true,
          options: [
            { value: 'spouse', label: 'Spouse' },
            { value: 'parent', label: 'Parent' },
            { value: 'child', label: 'Child' },
            { value: 'sibling', label: 'Sibling' },
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Add-on Card Holder Information',
      fields: [
        {
          name: 'applicantName',
          label: 'Full Name',
          type: 'text',
          required: true
        },
        {
          name: 'addonDob',
          label: "Add-on Applicant's Date of Birth",
          type: 'date',
          required: true
        },
        {
          name: 'mobileNumber',
          label: 'Mobile Number',
          type: 'tel',
          required: true,
          maxLength: 10
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true
        }
      ]
    }
  ],

  'nri-credit-card': [
    {
      id: 1,
      title: 'Personal Information',
      fields: [
        {
          name: 'applicantName',
          label: 'Full Name',
          type: 'text',
          required: true
        },
        {
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          required: true
        },
        {
          name: 'panNumber',
          label: 'PAN Card Number',
          type: 'text',
          required: true,
          maxLength: 10
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true
        },
        {
          name: 'mobileNumber',
          label: 'Mobile Number',
          type: 'tel',
          required: true,
          maxLength: 10
        }
      ]
    },
    {
      id: 2,
      title: 'NRI Details',
      fields: [
        {
          name: 'passportNumber',
          label: 'Passport Number',
          type: 'text',
          required: true
        },
        {
          name: 'visaType',
          label: 'Visa Type',
          type: 'text',
          required: true,
          placeholder: 'e.g., H1B, L1, Student'
        },
        {
          name: 'visaValidity',
          label: 'Visa Validity',
          type: 'date',
          required: true
        },
        {
          name: 'overseasAddress',
          label: 'Overseas Address',
          type: 'textarea',
          required: true
        }
      ]
    },
    {
      id: 3,
      title: 'Financial Details',
      fields: [
        {
          name: 'overseasIncome',
          label: 'Overseas Income (Annual)',
          type: 'number',
          required: true,
          placeholder: 'Enter income in ₹'
        },
        {
          name: 'nreNroDetails',
          label: 'NRE/NRO Account Details',
          type: 'text',
          required: true
        }
      ]
    }
  ],

  'hni-credit-card': [
    {
      id: 1,
      title: 'Personal Information',
      fields: [
        {
          name: 'applicantName',
          label: 'Full Name',
          type: 'text',
          required: true
        },
        {
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          required: true
        },
        {
          name: 'panNumber',
          label: 'PAN Card Number',
          type: 'text',
          required: true,
          maxLength: 10
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true
        },
        {
          name: 'mobileNumber',
          label: 'Mobile Number',
          type: 'tel',
          required: true,
          maxLength: 10
        }
      ]
    },
    commonEmploymentStep,
    commonIncomeStep,
    {
      id: 4,
      title: 'Wealth Information',
      fields: [
        {
          name: 'approximateNetWorth',
          label: 'Approximate Net Worth',
          type: 'number',
          required: true,
          placeholder: 'Enter net worth in ₹'
        },
        {
          name: 'majorInvestments',
          label: 'Major Investments',
          type: 'textarea',
          required: true,
          placeholder: 'List your major investments (property, stocks, etc.)'
        }
      ]
    }
  ]
};

// Helper function to get category slug from various sources
export function getCategorySlug(categorySlug?: string, categoryName?: string, loanSlug?: string): ProductCategory {
  // Try categorySlug first
  if (categorySlug) {
    const normalized = categorySlug.toLowerCase().replace(/\s+/g, '-');
    if (normalized.includes('personal')) return 'personal-loan';
    if (normalized.includes('home') && !normalized.includes('transfer')) return 'home-loan';
    if (normalized.includes('property')) return 'loan-against-property';
    if (normalized.includes('business')) {
      if (categorySlug.includes('card')) return 'business-credit-card';
      return 'business-loan';
    }
    if (normalized.includes('education')) return 'education-loan';
    if (normalized.includes('professional')) return 'professional-loan';
    if (normalized.includes('security')) return 'loan-against-security';
    if (normalized.includes('transfer')) {
      if (normalized.includes('home')) return 'transfer-home-loan';
      if (normalized.includes('personal')) return 'transfer-personal-loan';
    }
  }
  
  // Try loanSlug
  if (loanSlug) {
    const normalized = loanSlug.toLowerCase();
    if (normalized.includes('new') && normalized.includes('car')) return 'new-car';
    if (normalized.includes('used') && normalized.includes('car')) return 'used-car';
    if (normalized.includes('new') && normalized.includes('bike')) return 'new-bike';
    if (normalized.includes('used') && normalized.includes('bike')) return 'used-bike';
  }
  
  // Try categoryName
  if (categoryName) {
    const normalized = categoryName.toLowerCase();
    if (normalized.includes('secured') && normalized.includes('card')) return 'secured-credit-card';
    if (normalized.includes('student') && normalized.includes('card')) return 'student-credit-card';
    if (normalized.includes('addon') || normalized.includes('add-on')) return 'addon-credit-card';
    if (normalized.includes('nri')) return 'nri-credit-card';
    if (normalized.includes('hni') || normalized.includes('high net')) return 'hni-credit-card';
  }
  
  // Default to personal loan or credit card
  return 'credit-card';
}
