// loanData.js

export const loanData = [
  {
    id: "personal-loan",
    themeColor: "teal",
    title: "What is a Personal Loan?",
    icon: "Info",
    sections: {
      definition: {
        icon: "Banknote",
        content: `A personal loan is an <span class="font-semibold text-gray-800">unsecured loan</span> offered by banks and NBFCs to individuals for meeting various financial needs. Since it is unsecured, <strong>no collateral or security is required</strong>.`,
      },
      repayment: {
        icon: "Calendar",
        content: `The borrower repays the loan amount along with interest through <span class="font-semibold text-gray-800">Equated Monthly Installments (EMIs)</span> over a fixed tenure, typically ranging from <strong>1 to 5 years</strong>.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Eligibility depends on factors such as:",
        items: [
          "Applicant’s credit score",
          "Monthly income",
          "Employment stability",
          "Repayment capacity",
        ],
        footerNote:
          "Due to minimal documentation and quick processing, personal loans are one of the most popular financing options.",
      },
    },
  },
  {
    id: "home-loan",
    themeColor: "teal",
    title: "What is a Home Loan?",
    icon: "Home",
    sections: {
      definition: {
        icon: "Banknote",
        content: `A home loan is a <span class="font-semibold text-gray-800">secured loan</span> provided by financial institutions to help you purchase or construct a home. The property itself serves as <strong>collateral</strong> until the loan is fully repaid.`,
      },
      repayment: {
        icon: "Calendar",
        content: `Repayment is done via <span class="font-semibold text-gray-800">long-term EMIs</span>, with tenures often ranging from <strong>15 to 30 years</strong>, making the monthly burden manageable.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Key eligibility requirements:",
        items: [
          "Age (usually 18-70 years)",
          "Credit Score (750+ preferred)",
          "Property legal verification",
          "Stable income source",
        ],
        footerNote:
          "Home loans often come with tax benefits under various sections of the Income Tax Act.",
      },
    },
  },
  {
    id: "business-loan",
    themeColor: "teal",
    title: "What is a Business Loan?",
    icon: "Briefcase",
    sections: {
      definition: {
        icon: "Banknote",
        content: `A business loan is a credit facility for companies or entrepreneurs to fund <span class="font-semibold text-gray-800">operations, expansion, or working capital</span>. These can be secured or unsecured depending on the loan size and lender policy.`,
      },
      repayment: {
        icon: "Calendar",
        content: `Repayment terms vary by loan type. Working capital loans are often short-term (< 1 year), while term loans can range from <strong>3 to 10 years</strong> with flexible repayment structures.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Standard business eligibility:",
        items: [
          "Business vintage (usually 2+ years)",
          "Annual turnover & profitability",
          "ITR & Bank Statements (last 2-3 years)",
          "Valid business registration (GST/Udyam)",
        ],
        footerNote:
          "Lenders heavily analyze cash flow statements and future financial projections for approval.",
      },
    },
  },
  {
    id: "pre-approved-loan",
    themeColor: "teal",
    title: "What is a Pre-Approved Loan?",
    icon: "Zap", // Represents "Instant" speed
    sections: {
      definition: {
        icon: "Banknote",
        content: `A pre-approved loan is an exclusive offer extended by banks to <span class="font-semibold text-gray-800">existing customers</span> with a clean track record. These loans feature <strong>instant disbursal</strong> and often require zero documentation.`,
      },
      repayment: {
        icon: "Calendar",
        content: `Since the bank already knows your financial history, repayment is usually set up via <span class="font-semibold text-gray-800">auto-debit</span> from your account, with tenures typically between <strong>12 and 60 months</strong>.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Offer is invite-only based on:",
        items: [
          "Existing relationship with the bank",
          "High credit score (750+)",
          "Consistent account balance",
          "History of timely repayments",
        ],
        footerNote:
          "Check your net banking dashboard or mobile app to see if you have a pre-approved offer waiting.",
      },
    },
  },
  {
    id: "professional-loan",
    themeColor: "teal",
    title: "What is a Professional Loan?",
    icon: "GraduationCap", // Represents qualification/degree
    sections: {
      definition: {
        icon: "Banknote",
        content: `A professional loan is a customized credit facility designed for <span class="font-semibold text-gray-800">qualified professionals</span> like Doctors, CAs, and Architects. It is typically used for practice expansion, office renovation, or working capital, often without the need for collateral.`,
      },
      repayment: {
        icon: "Calendar",
        content: `These loans offer competitive interest rates with flexible repayment tenures, typically ranging from <span class="font-semibold text-gray-800">1 to 5 years</span>, tailored to the specific cash flow cycles of your profession.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Specific requirements include:",
        items: [
          "Professional Degree (MBBS, CA, CS, etc.)",
          "Post-qualification vintage (2-3 years)",
          "Certificate of Practice (COP)",
          "Minimum annual receipts/ITR",
        ],
        footerNote:
          "Lenders often provide higher loan limits and faster processing solely based on your professional certification.",
      },
    },
  },
  {
    id: "transfer-personal-loan",
    themeColor: "teal",
    title: "What is a Personal Loan Balance Transfer?",
    icon: "ArrowRightLeft", // Represents the transfer action
    sections: {
      definition: {
        icon: "Banknote",
        content: `A balance transfer involves moving your <span class="font-semibold text-gray-800">outstanding personal loan</span> from one bank to another to benefit from a <span class="font-semibold text-gray-800">lower interest rate</span> or better terms. It helps reduce your overall interest burden.`,
      },
      repayment: {
        icon: "Calendar",
        content: `By switching to a lender offering a lower rate, your <span class="font-semibold text-gray-800">monthly EMI reduces</span>. You can also opt to renegotiate the tenure, typically ranging from <strong>1 to 5 years</strong>, to suit your current financial situation.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Criteria for approval:",
        items: [
          "Existing personal loan with a clean record",
          "Minimum number of EMIs already paid (usually 12+)",
          "Stable income & employment",
          "Credit score (750+ preferred for lower rates)",
        ],
        footerNote:
          "Banks often charge a small processing fee for balance transfers, but the interest savings usually outweigh this cost.",
      },
    },
  },
  {
    id: "loan-against-property",
    themeColor: "teal",
    title: "What is a Loan Against Property?",
    icon: "Building", // Represents the property asset
    sections: {
      definition: {
        icon: "Banknote",
        content: `A Loan Against Property (LAP) is a <span class="font-semibold text-gray-800">secured loan</span> where you pledge your residential or commercial property as collateral to avail funds. It is often referred to as a <strong>mortgage loan</strong>.`,
      },
      repayment: {
        icon: "Calendar",
        content: `Since the loan is secured, lenders typically offer <span class="font-semibold text-gray-800">lower interest rates</span> compared to personal loans, with long repayment tenures ranging from <strong>10 to 15 years</strong> (or even up to 20).`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Eligibility is based on:",
        items: [
          "Market value of the property (LTV ratio 60-70%)",
          "Clear legal title of the property",
          "Applicant’s income & repayment capacity",
          "Property age and condition",
        ],
        footerNote:
          "LAP allows you to unlock the dormant value of your property while continuing to occupy it.",
      },
    },
  },
  {
    id: "transfer-home-loan",
    themeColor: "teal",
    title: "What is a Home Loan Balance Transfer?",
    icon: "ArrowRightLeft", // Consistent with transfer theme
    sections: {
      definition: {
        icon: "Banknote",
        content: `A home loan balance transfer allows you to shift your <span class="font-semibold text-gray-800">outstanding home loan</span> to a new lender offering a <span class="font-semibold text-gray-800">lower interest rate</span>. It is an effective strategy to reduce total interest payout over the long term.`,
      },
      repayment: {
        icon: "Calendar",
        content: `Since home loans have long tenures, even a small reduction in interest rate significantly lowers your <span class="font-semibold text-gray-800">EMI amount</span>. You can also choose to shorten your tenure or avail a <strong>Top-Up loan</strong> during the transfer.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Key requirements:",
        items: [
          "Regular repayment history (no defaults)",
          "Property possession or near-completion",
          "Stable income profile",
          "Minimum 12-18 EMIs paid to current lender",
        ],
        footerNote:
          "Many lenders offer a 'Top-Up' loan facility over and above the transferred amount for personal or home improvement needs.",
      },
    },
  },
  {
    id: "education-loan",
    themeColor: "teal",
    title: "What is an Education Loan?",
    icon: "BookOpen", // Represents learning/study
    sections: {
      definition: {
        icon: "Banknote",
        content: `An education loan provides financial support to students for pursuing <span class="font-semibold text-gray-800">higher education</span> in India or abroad. It covers tuition fees, accommodation, books, and travel expenses.`,
      },
      repayment: {
        icon: "Calendar",
        content: `A unique feature is the <span class="font-semibold text-gray-800">moratorium period</span> (course duration + 6-12 months) where no repayment is required. EMIs start only after this holiday period or once the student secures a job.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Main criteria:",
        items: [
          "Confirmed admission letter from institution",
          "Co-applicant (parent/guardian) with stable income",
          "Academic record of the student",
          "Collateral (required for higher loan amounts)",
        ],
        footerNote:
          "Interest paid on education loans is eligible for tax deduction under Section 80E of the Income Tax Act.",
      },
    },
  },
  {
    id: "education-loan",
    themeColor: "teal",
    title: "What is an Education Loan?",
    icon: "BookOpen", // Represents learning/study
    sections: {
      definition: {
        icon: "Banknote",
        content: `An education loan provides financial support to students for pursuing <span class="font-semibold text-gray-800">higher education</span> in India or abroad. It covers tuition fees, accommodation, books, and travel expenses.`,
      },
      repayment: {
        icon: "Calendar",
        content: `A unique feature is the <span class="font-semibold text-gray-800">moratorium period</span> (course duration + 6-12 months) where no repayment is required. EMIs start only after this holiday period or once the student secures a job.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Main criteria:",
        items: [
          "Confirmed admission letter from institution",
          "Co-applicant (parent/guardian) with stable income",
          "Academic record of the student",
          "Collateral (required for higher loan amounts)",
        ],
        footerNote:
          "Interest paid on education loans is eligible for tax deduction under Section 80E of the Income Tax Act.",
      },
    },
  },
  {
    id: "loan-against-security",
    themeColor: "teal",
    title: "What is a Loan Against Securities?",
    icon: "PieChart", // Represents investment portfolio/assets
    sections: {
      definition: {
        icon: "Banknote",
        content: `Loan Against Securities (LAS) is an <span class="font-semibold text-gray-800">overdraft facility</span> offered against financial assets like shares, mutual funds, or bonds. You pledge these assets to get instant liquidity without selling them.`,
      },
      repayment: {
        icon: "Calendar",
        content: `Unlike term loans, you don't pay EMIs. You only pay <span class="font-semibold text-gray-800">interest on the amount utilized</span> for the number of days used. The principal can be repaid at the end of the tenure or renewed.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Eligibility depends on:",
        items: [
          "Value of approved securities (Shares/MFs)",
          "Type of security (Equity/Debt)",
          "Applicant's age (18-65 years)",
          "Demat account status",
        ],
        footerNote:
          "A major benefit is that you continue to earn dividends and returns on your pledged securities while using the loan.",
      },
    },
  },
  {
    id: "used-car-loan",
    themeColor: "teal",
    title: "What is a Used Car Loan?",
    icon: "Car", // Represents the vehicle
    sections: {
      definition: {
        icon: "Banknote",
        content: `A used car loan is a financing option for purchasing a <span class="font-semibold text-gray-800">pre-owned vehicle</span>. Lenders finance a percentage of the car's current market valuation rather than the invoice price.`,
      },
      repayment: {
        icon: "Calendar",
        content: `Repayment is done via EMIs with tenures typically ranging from <strong>1 to 5 years</strong>. The maximum tenure often depends on the <span class="font-semibold text-gray-800">age and condition</span> of the car being purchased.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Approval depends on:",
        items: [
          "Valuation report of the car",
          "Age of the vehicle (usually < 10 years)",
          "Applicant's income stability",
          "Credit score & repayment history",
        ],
        footerNote:
          "Interest rates for used car loans are generally slightly higher than new car loans due to the depreciation risk of the asset.",
      },
    },
  },
  {
    id: "used-bike-loan",
    themeColor: "teal",
    title: "What is a Used Bike Loan?",
    icon: "Bike", // Represents the two-wheeler
    sections: {
      definition: {
        icon: "Banknote",
        content: `A used bike loan helps you finance the purchase of a <span class="font-semibold text-gray-800">second-hand two-wheeler</span>. Lenders sanction the amount based on the vehicle's current valuation and condition.`,
      },
      repayment: {
        icon: "Calendar",
        content: `Repayment tenures are generally shorter compared to car loans, ranging from <strong>1 to 3 years</strong>. The interest rate varies based on the <span class="font-semibold text-gray-800">age of the bike</span> and borrower profile.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Eligibility criteria:",
        items: [
          "Vehicle valuation report",
          "Bike age (usually < 5-7 years)",
          "Income proof (Salary slip/ITR)",
          "Valid driving license & KYC",
        ],
        footerNote:
          "This is an affordable way to own a premium bike or scooter without the high upfront cost of a new vehicle.",
      },
    },
  },
  {
    id: "new-car-loan",
    themeColor: "teal",
    title: "What is a New Car Loan?",
    icon: "CarFront", // Represents a brand new vehicle
    sections: {
      definition: {
        icon: "Banknote",
        content: `A new car loan is a <span class="font-semibold text-gray-800">secured financing option</span> for purchasing a brand-new vehicle directly from a dealership. Lenders typically finance up to <strong>90-100% of the on-road price</strong>.`,
      },
      repayment: {
        icon: "Calendar",
        content: `New car loans offer longer repayment tenures compared to used car loans, typically ranging from <strong>3 to 7 years</strong> (up to 84 months), allowing for smaller, manageable EMIs.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Standard eligibility:",
        items: [
          "Minimum annual income (e.g., ₹3 Lakh+)",
          "Credit score (750+ for best rates)",
          "Employment stability (min 1-2 years)",
          "Age limit (typically 21 to 65 years)",
        ],
        footerNote:
          "Since the car is new and under warranty, interest rates are usually the lowest in the vehicle loan category.",
      },
    },
  },
  {
    id: "new-bike-loan",
    themeColor: "teal",
    title: "What is a New Bike Loan?",
    icon: "Bike", // Represents a new two-wheeler
    sections: {
      definition: {
        icon: "Banknote",
        content: `A new bike loan is a credit facility specifically for purchasing a <span class="font-semibold text-gray-800">brand-new two-wheeler</span> (scooter or motorcycle). Lenders often finance up to <strong>95-100% of the on-road price</strong> for eligible customers.`,
      },
      repayment: {
        icon: "Calendar",
        content: `Repayment terms are flexible, typically ranging from <strong>1 to 4 years</strong> (12 to 48 months). Since the loan amount is smaller than a car loan, the EMIs are usually very affordable.`,
      },
      eligibility: {
        icon: "CheckCircle",
        title: "Basic requirements:",
        items: [
          "Minimum age (usually 21 years)",
          "Residence stability (proof of address)",
          "Employment/Income proof",
          "Credit score (helps in getting 100% funding)",
        ],
        footerNote:
          "Dealers often have tie-ups with banks to offer instant approvals and low down-payment schemes right at the showroom.",
      },
    },
  },
];
