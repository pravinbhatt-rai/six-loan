import React from 'react';
import { Check } from 'lucide-react';

// --- Types ---

interface SectionContent {
  title: string;
  points: string[];
  intro?: string;
}

interface GuideData {
  id: string;
  // Flexible array for top-level sections (e.g., First Time Borrowers, Pensioners)
  introSections: SectionContent[]; 
  // Optional middle section for specific segments (e.g., Salaried vs Self Employed)
  segmentSection?: {
    title: string;
    subSections: SectionContent[];
  };
  // Optional bottom section for "Steps to Apply"
  stepsSection?: SectionContent;
}

// --- Centralized Data (The "Database") ---

const GUIDE_DATA: GuideData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    introSections: [
      {
        title: "Personal Loan for First Time Borrowers",
        points: [
          "Individuals with no credit history may find it challenging to avail credit for the first time.",
          "Salaried consumers can connect with the Bank that holds their salary account for a personal loan.",
          "Some fintech companies also offer loans to first time borrowers, usually salaried.",
          "The ticket size of these loans, however, are generally small and interest rates are comparatively higher."
        ]
      },
      {
        title: "Personal Loan for Pensioners",
        points: [
          "Most PSU banks and a few NBFCs extensively offer personal loans to pensioners having their pension accounts with them.",
          "Most PSU banks generally waive off the processing fees for pensioners.",
          "Loan proceedings can be used to meet personal requirements like medical emergencies with no end-usage restriction.",
        ]
      }
    ],
    segmentSection: {
      title: "Personal Loan for Different Borrower Segments",
      subSections: [
        {
          title: "For Salaried Employees",
          points: [
            "Salaried employees can choose from multiple Banks and NBFCs.",
            "Applicants with strong credit profiles and stable employment have higher chances of approval.",
            "Government employees and MNC workers are preferred due to job security."
          ]
        },
        {
          title: "For Self-employed Individuals",
          points: [
            "Lenders offer unsecured loans to self-employed individuals for business or personal needs.",
            "Interest rates are likely higher due to lesser income certainty.",
            "Documentation is slightly more extensive compared to salaried employees."
          ]
        }
      ]
    },
    stepsSection: {
      title: "Steps to Take before Applying",
      intro: "The following are the key steps to take before applying for a personal loan:",
      points: [
        "Check offers from banks where you have deposits or credit cards.",
        "Compare interest rates on marketplaces like Six Loan.",
        "Check whether the tenure matches your repayment capacity.",
        "Compare processing fees and foreclosure charges.",
        "Check turnaround time for disbursal."
      ]
    }
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    introSections: [
      {
        title: "Home Loan for First Time Buyers",
        points: [
          "First-time buyers may be eligible for PMAY subsidies if they meet income criteria.",
          "Joint application with a spouse can increase loan eligibility and tax benefits.",
          "Lenders often fund up to 90% of the property value for amounts under 30 Lakhs."
        ]
      }
    ],
    segmentSection: {
      title: "Borrower Categories for Home Loans",
      subSections: [
        {
          title: "Salaried Applicants",
          points: [
            "Requires Form-16 and Salary Slips for income verification.",
            "Employment stability of 2+ years is usually required.",
            "Can get longer tenures up to 30 years."
          ]
        },
        {
          title: "Self-Employed Applicants",
          points: [
            "Requires ITR of last 3 years and business continuity proof.",
            "Computation of income is key to determining eligibility.",
            "Profitability trend is analyzed closely."
          ]
        }
      ]
    },
    stepsSection: {
      title: "Home Loan Application Journey",
      intro: "Follow these steps to secure your dream home:",
      points: [
        "Check your Credit Score (750+ is ideal).",
        "Finalize the property and check if the project is approved by banks.",
        "Arrange the down payment (10-20% of property cost).",
        "Compare RLLR (Repo Linked) rates across banks.",
        "Submit documents for legal and technical verification."
      ]
    }
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    introSections: [
      {
        title: "Loans for Startups vs Established",
        points: [
          "Startups often need government schemes (Mudhra, CGTMSE) as they lack vintage.",
          "Established businesses (3+ years) can easily get unsecured term loans based on turnover.",
          "Cash flow visibility in bank statements is more important than paper profit."
        ]
      }
    ],
    segmentSection: {
      title: "Business Loan Variants",
      subSections: [
        {
          title: "Manufacturers",
          points: [
            "Can avail equipment finance for machinery.",
            "Eligible for higher limits based on asset creation.",
            "GST returns are the primary proof of turnover."
          ]
        },
        {
          title: "Service Providers/Traders",
          points: [
            "Eligibility based largely on banking transactions.",
            "Overdraft facilities are preferred for managing inventory cycles.",
            "Merchant cash advances available against POS machine swipes."
          ]
        }
      ]
    },
    stepsSection: {
      title: "Pre-Application Checklist",
      points: [
        "Update your GST returns and ensure no gap in filing.",
        "Audit your financials if turnover > 1 Crore (or as per limits).",
        "Check if you qualify for collateral-free schemes.",
        "Prepare a project report if applying for a large term loan."
      ]
    }
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    introSections: [
      {
        title: "Who Should Opt for Balance Transfer?",
        points: [
          "Borrowers whose credit score has improved significantly since taking the original loan.",
          "Those currently paying interest rates higher than 14-15%.",
          "Borrowers who need a Top-Up loan along with the transfer."
        ]
      }
    ],
    stepsSection: {
      title: "Process to Switch Lenders",
      points: [
        "Request a foreclosure letter from your current bank.",
        "Calculate the net savings (New Interest savings - Processing Fees - Foreclosure charges).",
        "Apply with the new lender submitting KYC and Income documents.",
        "Once approved, the new bank issues a cheque to close the old loan."
      ]
    }
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    introSections: [
      {
        title: "Loans for Doctors",
        points: [
          "Highest eligibility multiplier based on degree (MD/MS get higher limits).",
          "Loans available for clinic setup, equipment purchase, or personal needs.",
          "Minimal documentation—often approved without financials for smaller amounts."
        ]
      },
      {
        title: "Loans for CAs and CS",
        points: [
          "Loans based on Certificate of Practice (COP) vintage.",
          "Repayment track record is given high weightage.",
          "Flexible repayment options available."
        ]
      }
    ],
    stepsSection: {
      title: "Application Steps",
      points: [
        "Keep your professional degree and registration certificates ready.",
        "Maintain a good banking balance in your primary account.",
        "Check for specific 'Professional Loan' schemes rather than generic business loans."
      ]
    }
  },
  // 6. Loan Against Property
  {
    id: 'loan-against-property',
    introSections: [
      {
        title: "Property Eligibility",
        points: [
          "Property must have a clear title and approved map plan.",
          "Self-occupied residential properties get the highest LTV (Loan to Value).",
          "Commercial properties usually attract slightly higher interest rates."
        ]
      }
    ],
    stepsSection: {
      title: "Steps to Mortgage Your Property",
      points: [
        "Get a legal opinion on your property documents.",
        "Ensure all property tax receipts are up to date.",
        "Bank will send a valuer to assess the market price.",
        "Loan amount is sanctioned based on lower of Market Value or Repayment Capacity."
      ]
    }
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    introSections: [
      {
        title: "When to Transfer?",
        points: [
          "When the difference in interest rates is at least 0.50%.",
          "When you are in the early years of the tenure (interest component is high).",
          "When you want to switch from floating to fixed (or vice versa)."
        ]
      }
    ],
    stepsSection: {
      title: "Transfer Process",
      points: [
        "Obtain List of Documents (LOD) and Foreclosure letter from current lender.",
        "Submit these to the new lender for processing.",
        "Pay the processing fee and sign the new agreement.",
        "New lender pays off the old lender and takes custody of property papers."
      ]
    }
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    introSections: [
      {
        title: "Domestic vs International",
        points: [
          "Domestic loans for premier institutes often require no collateral up to certain limits.",
          "International loans cover tuition plus living expenses.",
          "Currency fluctuation buffers are considered for foreign loans."
        ]
      }
    ],
    segmentSection: {
      title: "Applicant Roles",
      subSections: [
        {
          title: "Student (Main Applicant)",
          points: [
            "Academic record determines employability and loan sanction.",
            "Admission letter is the primary document."
          ]
        },
        {
          title: "Parent (Co-Applicant)",
          points: [
            "Their income services the interest during the moratorium.",
            "Their CIBIL score is crucial for unsecured loans."
          ]
        }
      ]
    },
    stepsSection: {
      title: "How to Apply",
      points: [
        "Secure admission and get the fee structure.",
        "Decide between secured (cheaper) or unsecured (faster) loan.",
        "Submit KYC and income proofs of co-applicant.",
        "Disbursement is usually done directly to the University."
      ]
    }
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    introSections: [
      {
        title: "Eligible Securities",
        points: [
          "Approved list of Equity Shares.",
          "Mutual Funds (Equity and Debt).",
          "Life Insurance Policies (Surrender Value).",
          "KVP/NSC and Tax-Free Bonds."
        ]
      }
    ],
    stepsSection: {
      title: "Pledging Process",
      points: [
        "Check the bank's approved list of scripts.",
        "Open a current account/overdraft account with the bank.",
        "Mark a lien on the securities digitally (via NSDL/CAMS).",
        "Funds are released as an overdraft limit."
      ]
    }
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    introSections: [
      {
        title: "Valuation is Key",
        points: [
          "Loan amount depends on the bank's valuation of the car, not the seller's price.",
          "Car age + loan tenure generally cannot exceed 8-10 years.",
          "Interest rates are higher than new car loans."
        ]
      }
    ],
    stepsSection: {
      title: "Buying Process",
      points: [
        "Identify the car and negotiate the price.",
        "Submit car documents (RC/Insurance) to the bank for valuation.",
        "Once sanctioned, ownership transfer forms (29/30) are signed.",
        "Post-disbursement, RC must be transferred to buyer's name with bank hypothecation."
      ]
    }
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    introSections: [
      {
        title: "Things to Consider",
        points: [
          "Interest rates are high (18-24%).",
          "LTV is usually capped at 60-70% of valuation.",
          "Physical verification of the bike is mandatory."
        ]
      }
    ],
    stepsSection: {
      title: "Application Steps",
      points: [
        "Ensure the bike has valid insurance.",
        "Apply with KYC and income proofs.",
        "Bank verifies the asset condition.",
        "Funds are transferred to the seller."
      ]
    }
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    introSections: [
      {
        title: "Financing Options",
        points: [
          "Up to 100% on-road funding available for select profiles.",
          "Choice between Fixed and Floating rates.",
          "Pre-approved offers require zero income documentation."
        ]
      }
    ],
    stepsSection: {
      title: "Steps to Drive Home",
      points: [
        "Book the car and get the proforma invoice.",
        "Compare offers from the dealer vs external banks.",
        "Submit documents and get the Sanction Letter.",
        "Pay the down payment to the dealer; bank disburses the rest."
      ]
    }
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    introSections: [
      {
        title: "Borrower Categories",
        points: [
          "Salaried: Easy approval with salary slips.",
          "Self-Employed: Loans available based on residence stability.",
          "Students: Can apply with a parent as a co-applicant."
        ]
      }
    ],
    stepsSection: {
      title: "Quick Process",
      points: [
        "Choose your bike and get the dealer quote.",
        "Submit KYC (Aadhaar/PAN) and banking checks.",
        "Sign the agreement and hypothecation deed.",
        "Ride out!"
      ]
    }
  }
];

// --- Sub-Components ---

const CheckIcon = () => (
  <div className="shrink-0 mt-1">
    <div className="bg-teal-500 rounded-full p-[3px] flex items-center justify-center">
      <Check size={12} className="text-white" strokeWidth={4} />
    </div>
  </div>
);

interface SectionProps {
  title: string;
  points: string[];
  intro?: string;
  isMainHeader?: boolean;
}

const ContentSection = ({ title, points, intro, isMainHeader = false }: SectionProps) => (
  <div className="mb-8">
    <h3 className={`${isMainHeader ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-bold font-serif text-gray-900 mb-4`}>
      {title}
    </h3>
    {intro && <p className="text-gray-700 mb-4 text-sm md:text-[15px]">{intro}</p>}
    <ul className="space-y-4">
      {points.map((point, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckIcon />
          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px]">{point}</p>
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Component (Container) ---

interface LoanGuideContainerProps {
  id: string; // The ID to look up in the array
}

const LoanGuideContainer: React.FC<LoanGuideContainerProps> = ({ id }) => {
  // 1. Find Data
  const data = GUIDE_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`LoanGuideContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      {/* Section 1: Intro Sections (Dynamic List) */}
      <div className="space-y-2">
        {data.introSections.map((section, index) => (
          <ContentSection 
            key={index}
            title={section.title}
            points={section.points}
            intro={section.intro}
          />
        ))}
      </div>

      {/* Insert Diagram for borrower types if applicable */}
      {id === 'personal-loan' && (
         <div className="my-6"></div>
      )}
      {id === 'home-loan' && (
         <div className="my-6"></div>
      )}

      {/* Section 2: Segment Section (Optional) */}
      {data.segmentSection && (
        <div className="mt-8 md:mt-10 mb-8">
          <h2 className="text-xl md:text-2xl font-bold font-serif text-gray-900 mb-6">
            {data.segmentSection.title}
          </h2>
          <div className="space-y-8">
            {data.segmentSection.subSections.map((sub, index) => (
              <ContentSection 
                key={index}
                title={sub.title}
                points={sub.points}
                intro={sub.intro}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Steps Section (Optional) */}
      {data.stepsSection && (
        <div className="mt-8 md:mt-10">
          {/* Specific Diagram for Application Steps */}
           {id === 'personal-loan' && (
             <div className="mb-6"></div>
           )}
           {id === 'business-loan' && (
             <div className="mb-6"></div>
           )}
          <ContentSection 
            title={data.stepsSection.title}
            points={data.stepsSection.points}
            intro={data.stepsSection.intro}
            isMainHeader={true}
          />
        </div>
      )}

    </div>
  );
};

export default LoanGuideContainer;