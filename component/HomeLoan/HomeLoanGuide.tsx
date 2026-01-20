import React from 'react';

const HomeLoanGuide = ({ pageId }: { pageId: string }) => {
  // data array embedded inside the component
  const loanData = [
    {
      id: "10-lakh",
      sections: [
        {
          title: "Why Opt for a Home Loan of Rs. 10 Lakh?",
          description: "A Rs. 10 lakh home loan is an affordable financing option specifically designed for:",
          items: [
            "Constructing a home on an existing plot in Tier 2/3 cities",
            "Home extension (adding a floor or room)",
            "Extensive home renovation and repairs",
            "Purchasing affordable housing under government schemes (PMAY)"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 10 Lakh Home Loan",
          description: "Eligibility for a smaller ticket size is generally accessible:",
          items: [
            "Age: 21 to 65 years",
            "Employment: Salaried or Self-employed with regular income",
            "Minimum Income: Approx. Rs. 15,000 - Rs. 20,000 per month",
            "Credit Score: 650+ is often accepted for this bracket",
            "Work Experience: Minimum 1-2 years"
          ]
        },
        {
          title: "Documents Required",
          description: "Essential documents include financial and property papers:",
          items: [
            "KYC: PAN, Aadhaar, Voter ID",
            "Income Proof: Salary slips (3 months) or ITR (2 years)",
            "Bank Statements: Last 6 months",
            "Property Documents: Sale deed, NOC from society/builder, estimate of construction (if applicable)"
          ]
        },
        {
          title: "Interest Rate on Rs. 10 Lakh Home Loan",
          description: "Home loan interest rates are lower than personal loans, typically starting from 8.50% p.a. Rates depend on your credit score and the loan-to-value (LTV) ratio.",
          items: [
            "Repo Rate Linked Interest Rates",
            "Credit Score Impact",
            "Women borrowers often get 0.05% concession",
            "Loan-to-Value Ratio"
          ]
        },
        {
          title: "Fees & Charges",
          description: "Standard charges applicable:",
          items: [
            "Processing Fee: 0.5% to 1% of the loan amount + GST",
            "Legal & Technical Verification Charges: At actuals",
            "CERSAI Charge: Nominal fee (approx Rs. 50-100)",
            "Stamp Duty: As per state regulations"
          ]
        },
        {
          title: "How a ₹10 Lakh Home Loan Impacts Your Credit Score",
          description: "Managing a home loan responsibly is excellent for your credit health:",
          items: [
            "Long-term Boost: Regularly paying EMIs over a long tenure (10-15 years) significantly builds credit history.",
            "Credit Mix: Adding a secured loan (home loan) to your profile improves your 'Credit Mix', boosting your score.",
            "Missed Payments: Defaulting on secured loans has a severe negative impact.",
            "Reduced Utilization: A home loan doesn't eat into your credit card limit, keeping utilization low."
          ]
        },
        {
          title: "Tips to Get Approved",
          description: "Simple steps to ensure smooth approval:",
          items: [
            "Ensure the property has a clear legal title",
            "Maintain a credit score above 700",
            "Clear existing small debts to improve DTI ratio",
            "Apply with a co-applicant (spouse) to boost eligibility"
          ]
        },
        {
          title: "Benefits of a Rs 10 Lakh Home Loan",
          description: "Key advantages include:",
          items: [
            "Tax Benefits: Deduction on Principal (80C) and Interest (24b)",
            "Low Interest Rates compared to other loan types",
            "Long Tenure: Up to 30 years for low EMI burden",
            "PMAY Subsidy: Eligible for interest subsidy under CLSS (if applicable)"
          ]
        }
      ]
    },
    {
      id: "15-lakh",
      sections: [
        {
          title: "Why Opt for a Home Loan of Rs. 15 Lakh?",
          description: "A Rs. 15 lakh home loan is popular for entry-level property purchases:",
          items: [
            "Buying a 1 BHK apartment in suburban areas",
            "Purchasing a plot of land for future construction",
            "Renovating an ancestral home completely",
            "Down payment assistance for a larger property"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 15 Lakh Home Loan",
          description: "Lenders look for stability and property value:",
          items: [
            "Age: 21 to 60 years (Salaried), up to 65 (Self-employed)",
            "Minimum Income: Rs. 20,000 - Rs. 25,000 per month",
            "Credit Score: 700+ recommended",
            "LTV Ratio: Loan amount can go up to 90% of property value",
            "Employment Stability: 2 years continuous work history"
          ]
        },
        {
          title: "Documents Required",
          description: "Standard documentation needed:",
          items: [
            "Identity & Address Proof",
            "Income Documents: Form 16, Salary Slips, or Business ITR",
            "Property Papers: Chain of title deeds, approved building plan",
            "Bank Statements: Last 6 months showing salary credit"
          ]
        },
        {
          title: "Interest Rate on Rs. 15 Lakh Home Loan",
          description: "Interest rates typically start around 8.50% - 9.00% p.a. A higher credit score helps you negotiate a lower spread over the repo rate.",
          items: [
            "Floating vs Fixed Rate Options",
            "Credit Score Driven Rates",
            "Lender's Benchmark Rate",
            "Property Location Impact"
          ]
        },
        {
          title: "Fees & Charges",
          description: "Applicable costs:",
          items: [
            "Processing Fee: Approx 0.50% - 1.00%",
            "MODT Charges: Memorandum of Deposit of Title Deed",
            "Legal Opinion Fees: Paid to the bank's lawyer",
            "Property Insurance: Highly recommended"
          ]
        },
        {
          title: "How a ₹15 Lakh Home Loan Impacts Your Credit Score",
          description: "A home loan is a 'good debt' that helps your score:",
          items: [
            "Consistent Repayment: Paying EMIs on time for years creates a 'thick' credit file.",
            "Credit Mix: Diversifies your profile beyond just credit cards.",
            "Hard Enquiries: Applying to too many banks at once can temporarily dip the score.",
            "Long-term Stability: Shows lenders you can manage long-term financial commitments."
          ]
        },
        {
          title: "Tips to Get Approved",
          description: "Improve chances with these tips:",
          items: [
            "Keep all property documents ready (Link documents for 13-30 years)",
            "Correct any errors in your CIBIL report beforehand",
            "Show additional sources of income (rent, bonus) if any",
            "Choose a tenure that keeps EMI within 40% of income"
          ]
        },
        {
          title: "Benefits of a Rs 15 Lakh Home Loan",
          description: "Enjoy these financial perks:",
          items: [
            "Capital Appreciation of the asset over time",
            "Tax Deductions: Save tax on both EMI components",
            "Balance Transfer facility to lower rates later",
            "Top-up Loan facility available after a few years"
          ]
        }
      ]
    },
    {
      id: "20-lakh",
      sections: [
        {
          title: "Why Opt for a Home Loan of Rs. 20 Lakh?",
          description: "A Rs. 20 lakh loan suits the needs of mid-segment buyers:",
          items: [
            "Buying a compact 2 BHK in non-metro cities",
            "Construction of a single floor on an owned plot",
            "Purchasing a resale flat in an affordable locality",
            "Studio apartments in city outskirts"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 20 Lakh Home Loan",
          description: "Banks assess repayment capacity strictly:",
          items: [
            "Age: 21 to 65 years",
            "Minimum Income: Rs. 25,000+ per month",
            "Credit Score: 720+ is ideal for quick processing",
            "FOIR: Fixed Obligations to Income Ratio should be < 50%",
            "Property: Should be within municipal limits/approved layout"
          ]
        },
        {
          title: "Documents Required",
          description: "Keep these ready:",
          items: [
            "KYC Documents (PAN is mandatory)",
            "Financials: 3 months salary slip, 2 years Form 16",
            "Bank Statement: 6 months reflecting income",
            "Property: Allotment letter, Buyer agreement, Encumbrance Certificate (EC)"
          ]
        },
        {
          title: "Interest Rate on Rs. 20 Lakh Home Loan",
          description: "Rates generally start from 8.40% p.a. for salaried individuals with good credit scores. Self-employed rates might be slightly higher (0.10% - 0.25% extra).",
          items: [
            "RLLR (Repo Linked Loan Rate)",
            "Borrower Profile (Salaried vs Self-Employed)",
            "Credit Score Band",
            "Project Approval Status (Approved projects get faster/better rates)"
          ]
        },
        {
          title: "Fees & Charges",
          description: "Associated costs:",
          items: [
            "Processing Fee: Usually flat fee or % (capped at certain amount)",
            "Franking Charges: On the loan agreement",
            "Property Valuation Fee",
            "GST: 18% on all service charges"
          ]
        },
        {
          title: "How a ₹20 Lakh Home Loan Impacts Your Credit Score",
          description: "A secured loan of this size stabilizes your credit profile:",
          items: [
            "Positive History: Regular payments over 15-20 years build a stellar history.",
            "Creditworthiness: Successfully managing a 20 Lakh liability proves high financial reliability.",
            "EMI Bounces: Even one bounce can drop points significantly.",
            "Foreclosure: Closing the loan early usually has a positive or neutral effect."
          ]
        },
        {
          title: "Tips to Get Approved",
          description: "Ensure a hassle-free process:",
          items: [
            "Apply for pre-approval before property hunting",
            "Ensure the builder/project is RERA approved",
            "Maintain a healthy average bank balance",
            "Avoid changing jobs during the application process"
          ]
        },
        {
          title: "Benefits of a Rs 20 Lakh Home Loan",
          description: "Why this is a smart choice:",
          items: [
            "Build an Asset: Stop paying rent and build your own equity",
            "Tax Savings: Up to Rs 2 Lakh on interest (Sec 24b) and 1.5 Lakh on principal (Sec 80C)",
            "Low Margin Money: Bank funds up to 80-90% of the cost",
            "No Prepayment Penalties on floating rate loans"
          ]
        }
      ]
    },
    {
      id: "30-lakh",
      sections: [
        {
          title: "Why Opt for a Home Loan of Rs. 30 Lakh?",
          description: "This amount caters to the standard middle-class housing segment:",
          items: [
            "Buying a 2 BHK apartment in Tier 1 city suburbs",
            "Independent house construction in Tier 2 cities",
            "Purchasing a larger plot for investment/building",
            "Acquiring a ready-to-move-in resale property"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 30 Lakh Home Loan",
          description: "Requirements for this bracket:",
          items: [
            "Age: 23 to 65 years",
            "Minimum Income: Rs. 35,000 - Rs. 40,000 per month",
            "Credit Score: 750+ ensures the best interest rates",
            "Co-applicant: Adding an earning spouse increases eligibility",
            "Property Status: Should have clear titles and approvals"
          ]
        },
        {
          title: "Documents Required",
          description: "Comprehensive documentation:",
          items: [
            "KYC & Address Proofs",
            "Income: Last 3 years ITR (Self-employed) or Form 16 (Salaried)",
            "Bank Statements: Last 6-12 months",
            "Property: Occupancy Certificate (OC), Property Tax receipts, Sanctioned plan"
          ]
        },
        {
          title: "Interest Rate on Rs. 30 Lakh Home Loan",
          description: "Competitive rates starting from 8.35% - 8.50% p.a. This segment often attracts special festive offers from banks.",
          items: [
            "External Benchmark Linked Rates",
            "Job Stability Factor",
            "CIBIL Score (750+ preferred)",
            "Loan Tenure Impact"
          ]
        },
        {
          title: "Fees & Charges",
          description: "Be aware of these fees:",
          items: [
            "Processing Fee: 0.25% - 0.50% (Many banks offer waivers)",
            "Document Retrieval Charges: Upon closure",
            "Inspection Charges: For construction linked loans",
            "Switching Charges: If moving from higher to lower rate within same bank"
          ]
        },
        {
          title: "How a ₹30 Lakh Home Loan Impacts Your Credit Score",
          description: "Impact on your financial footprint:",
          items: [
            "Credit Mix Improvement: Balances unsecured loans like credit cards.",
            "Long Track Record: A 20-year loan creates a very deep credit history.",
            "Debt Burden Ratio: High EMI obligations might temporarily reduce eligibility for other loans.",
            "Timely Repayment: The single biggest factor in boosting your score to 800+."
          ]
        },
        {
          title: "Tips to Get Approved",
          description: "Maximizing approval chances:",
          items: [
            "Check if your employer has a tie-up with the bank",
            "Resolve any past credit disputes before applying",
            "Ensure the property doesn't have legal litigations",
            "Keep the down payment (10-20%) ready in your account"
          ]
        },
        {
          title: "Benefits of a Rs 30 Lakh Home Loan",
          description: "Advantages:",
          items: [
            "Home Ownership in prime developing areas",
            "Inflation Hedge: Real estate value grows while EMI stays distinct",
            "Tax Shield: Significant reduction in taxable income",
            "Overdraft Facility: Some banks offer 'Home Loan Saver' options"
          ]
        }
      ]
    },
    {
      id: "40-lakh",
      sections: [
        {
          title: "Why Opt for a Home Loan of Rs. 40 Lakh?",
          description: "A Rs. 40 lakh loan is ideal for premium mid-segment properties:",
          items: [
            "Spacious 2 BHK or compact 3 BHK in major cities",
            "Independent floor purchase",
            "Buying a plot and constructing a duplex",
            "Major home improvement projects involving structural changes"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 40 Lakh Home Loan",
          description: "Lenders look for robust income profiles:",
          items: [
            "Age: 25 to 60 years",
            "Minimum Income: Rs. 50,000 - Rs. 60,000 per month",
            "Credit Score: 750+ is mandatory for best rates",
            "LTV Ratio: Usually restricted to 80% for loans above 30 Lakhs",
            "Employment: Confirmed service in reputed organizations"
          ]
        },
        {
          title: "Documents Required",
          description: "Detailed legal and financial scrutiny:",
          items: [
            "KYC (Aadhaar/Passport)",
            "Income: Salary slips, Form 16, Bank statements (1 year)",
            "Property: Complete chain of title documents for last 13-30 years",
            "NOC from Builder/Society"
          ]
        },
        {
          title: "Interest Rate on Rs. 40 Lakh Home Loan",
          description: "Rates start from approx 8.40% p.a. The spread may increase slightly compared to smaller loans depending on the risk profile.",
          items: [
            "Linked to Repo Rate",
            "Risk Premium based on profile",
            "LTV Ratio impact (Lower LTV = Better Rate)",
            "Credit Score < 750 may attract higher rates"
          ]
        },
        {
          title: "Fees & Charges",
          description: "Standard charges apply:",
          items: [
            "Processing Fee: Negotiable, typically Rs. 5,000 - Rs. 10,000",
            "Technical Valuation Charges",
            "Legal Verification Fee",
            "Stamp Duty on Loan Agreement"
          ]
        },
        {
          title: "How a ₹40 Lakh Home Loan Impacts Your Credit Score",
          description: "Managing a significant liability:",
          items: [
            "Demonstrates Capacity: Handling a 40L loan shows high financial maturity.",
            "Utilization Ratio: Keep credit card spend low to balance the high loan debt.",
            "Prompt Payments: Automated EMIs ensure score growth.",
            "Joint Loans: If co-borrower defaults, your score is also impacted."
          ]
        },
        {
          title: "Tips to Get Approved",
          description: "Strategies for success:",
          items: [
            "Choose a 'Pre-approved' project by the bank for faster processing",
            "Reduce other EMI obligations before applying",
            "Show proof of sufficient savings for the down payment",
            "Maintain a stable career record"
          ]
        },
        {
          title: "Benefits of a Rs 40 Lakh Home Loan",
          description: "Key benefits:",
          items: [
            "Access to better lifestyle properties",
            "Long repayment tenure (up to 30 years)",
            "Tax Benefits under Sec 24, 80C, and 80EEA (if applicable)",
            "Step-up EMI options available (pay lower EMI initially)"
          ]
        }
      ]
    },
    {
      id: "60-lakh",
      sections: [
        {
          title: "Why Opt for a Home Loan of Rs. 60 Lakh?",
          description: "A Rs. 60 lakh loan targets the premium housing segment:",
          items: [
            "Buying a 3 BHK or luxury apartment in Metro cities",
            "Purchasing a villa or row house in gated communities",
            "Buying a large plot in a prime location",
            "Second home investment for rental income"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 60 Lakh Home Loan",
          description: "Strict eligibility checks for high-value loans:",
          items: [
            "Age: 25 to 60 years",
            "Minimum Income: Rs. 80,000 - Rs. 1 Lakh+ per month",
            "Credit Score: 775+ preferred",
            "LTV Ratio: Bank funds max 75-80% of property cost",
            "Debt-to-Income: Total EMIs should not exceed 50% of net income"
          ]
        },
        {
          title: "Documents Required",
          description: "Extensive paperwork:",
          items: [
            "KYC & Residence Proof",
            "Income: ITR (3 years) with computation, Audited Balance Sheet (for business)",
            "Property: All legal clearance, environmental clearance (if applicable)",
            "Own Contribution Proof (Bank statement showing down payment)"
          ]
        },
        {
          title: "Interest Rate on Rs. 60 Lakh Home Loan",
          description: "Rates start from 8.40% - 8.60% p.a. High-value loans often allow for rate negotiation based on the applicant's profile and relationship with the bank.",
          items: [
            "Repo Rate Linkage",
            "Spread based on Credit Score",
            "Employer Category (Cat A / MNCs get better rates)",
            "Woman co-applicant concession"
          ]
        },
        {
          title: "Fees & Charges",
          description: "Charges for high-ticket loans:",
          items: [
            "Processing Fee: Max cap usually applies (e.g., Rs. 10,000 + GST)",
            "Property Insurance: Mandatory for high-value structures",
            "Mortgage Deed Registration Charges",
            "CERSAI Fees"
          ]
        },
        {
          title: "How a ₹60 Lakh Home Loan Impacts Your Credit Score",
          description: "High stakes impact:",
          items: [
            "High Impact Activity: A loan of this size is a major factor in your credit report.",
            "Repayment Discipline: Flawless repayment boosts the score significantly over time.",
            "Credit Mix: Adds substantial secured debt weightage.",
            "Risk of Over-leverage: taking new loans immediately after this may lower score."
          ]
        },
        {
          title: "Tips to Get Approved",
          description: "For high-value approval:",
          items: [
            "Apply jointly with an earning spouse to distribute the EMI burden",
            "Ensure the property is legally 100% compliant (OC/CC available)",
            "Clear all credit card dues fully before applying",
            "Highlight any additional assets/investments to the bank"
          ]
        },
        {
          title: "Benefits of a Rs 60 Lakh Home Loan",
          description: "Advantages:",
          items: [
            "Upgrade to a luxury lifestyle",
            "High-value asset creation",
            "Max Tenure up to 30 years to reduce EMI",
            "No prepayment penalty (for floating rates) allows faster closure",
            "Substantial Tax Savings"
          ]
        }
      ]
    },
    {
      id: "home-renovation-loan",
      sections: [
        {
          title: "Why Opt for a Home Renovation Loan?",
          description: "Give your home a fresh look without draining your savings:",
          items: [
            "Painting, tiling, and flooring upgrades",
            "Remodeling kitchen or bathrooms",
            "Waterproofing and roofing repairs",
            "Electrical and plumbing overhauls"
          ]
        },
        {
          title: "Eligibility Criteria",
          description: "Similar to standard home loans but with specific checks:",
          items: [
            "Age: 21 to 65 years",
            "Ownership: Applicant must be the owner of the property",
            "Estimate: Valid quotation from a contractor/architect required",
            "Credit Score: 700+ preferred"
          ]
        },
        {
          title: "Documents Required",
          description: "In addition to standard KYC and income proofs:",
          items: [
            "Title Deeds of the property",
            "Estimated cost of renovation from a certified civil engineer/architect",
            "No objection certificate (if in a society)"
          ]
        },
        {
          title: "Interest Rates & Benefits",
          description: "Rates are typically lower than personal loans:",
          items: [
            "Interest Rate: Starting from 8.50% p.a.",
            "Tax Benefit: Interest deduction up to Rs. 30,000 under Sec 24(b)",
            "Tenure: Up to 15 years",
            "LTV: Up to 80-90% of the renovation estimate"
          ]
        }
      ]
    },
    {
      id: "plot-loan",
      sections: [
        {
          title: "Why Opt for a Plot Loan?",
          description: "Funding specifically for purchasing land for residential use:",
          items: [
            "Buying a plot from a development authority (e.g., DDA, MHADA)",
            "Purchasing a resale plot in a gated community",
            "Investment for future home construction",
            "Buying land directly from a builder/developer"
          ]
        },
        {
          title: "Eligibility Criteria",
          description: "Banks are stricter with land funding:",
          items: [
            "Resident Type: Resident Indians (Some banks restrict NRIs)",
            "Income: Minimum Rs. 25,000/month",
            "Credit Score: 720+ usually required",
            "Location: Must be within municipal/corporation limits"
          ]
        },
        {
          title: "Documents Required",
          description: "Legal verification is the most critical step:",
          items: [
            "Layout approval documents from local body",
            "Encumbrance Certificate (EC) for last 15-30 years",
            "Sale Agreement",
            "7/12 extract or Patta/Chitta documents"
          ]
        },
        {
          title: "Key Features",
          description: "Differs slightly from standard home loans:",
          items: [
            "LTV Ratio: Max 70-75% of plot value (lower than home loans)",
            "No Tax Benefits: Unless construction starts on the plot",
            "Construction Clause: Some banks require construction to begin within 3-5 years",
            "Tenure: Usually capped at 15-20 years"
          ]
        }
      ]
    },
    {
      id: "top-up-home-loan",
      sections: [
        {
          title: "What is a Top-Up Home Loan?",
          description: "An extra loan amount over and above your existing home loan:",
          items: [
            "Usage: Can be used for any personal or professional need (Marriage, Medical, Business)",
            "Convenience: No new security required; uses the existing property",
            "Cost: Much cheaper than a Personal Loan",
            "Processing: Quick approval as documents are already with the bank"
          ]
        },
        {
          title: "Eligibility Criteria",
          description: "Based on your track record:",
          items: [
            "Existing Customer: Must have a running home loan",
            "Repayment History: No EMI bounces in the last 12 months",
            "LTV Check: Total outstanding + Top-up should not exceed 80% of property market value",
            "Job Stability: Consistent income profile"
          ]
        },
        {
          title: "Documents Required",
          description: "Minimal paperwork:",
          items: [
            "Latest salary slips/ITR (to reassess repayment capacity)",
            "Bank statements for the last 6 months",
            "Application form for Top-up"
          ]
        },
        {
          title: "Benefits",
          description: "Why this is a smart source of funds:",
          items: [
            "Low Interest Rate: Usually same as home loan or +0.5%",
            "Long Tenure: Can match the remaining tenure of the home loan",
            "Tax Benefit: Available only if funds are used for home renovation/extension",
            "Consolidated EMI: Easy to manage"
          ]
        }
      ]
    },
    {
      id: "home-construction-loan",
      sections: [
        {
          title: "Why Opt for a Home Construction Loan?",
          description: "Designed for those building their own house on a plot they own:",
          items: [
            "Self-construction on a freehold plot",
            "Demolishing an old structure and rebuilding",
            "Complete flexibility in design and architecture"
          ]
        },
        {
          title: "How It Works (Disbursement)",
          description: "Funds are not released at once, but in tranches based on progress:",
          items: [
            "Stage 1: Plinth Level (Foundation)",
            "Stage 2: Lintel Level (Walls)",
            "Stage 3: Roof Casting",
            "Stage 4: Finishing (Plastering, Wiring, Flooring)"
          ]
        },
        {
          title: "Documents Required",
          description: "Includes technical estimates:",
          items: [
            "Plot title deeds (proving ownership)",
            "Approved Building Plan from Municipality/Gram Panchayat",
            "Construction Estimate vetted by a Civil Engineer",
            "Non-Encumbrance Certificate"
          ]
        },
        {
          title: "Interest Rate & Features",
          description: "Standard home loan rates apply:",
          items: [
            "Pre-EMI: Pay only interest on the amount disbursed during construction",
            "Tranche-based release prevents misuse of funds",
            "Tax Benefits: Available on interest (Sec 24b) after construction is complete",
            "LTV: Includes cost of construction + plot value (if bought recently)"
          ]
        }
      ]
    },
    {
      id: "nri-home-loan",
      sections: [
        {
          title: "Overview of NRI Home Loans",
          description: "Specialized loans for Non-Resident Indians to buy property in India:",
          items: [
            "Investment in Indian Real Estate",
            "Buying a home for parents back in India",
            "Planning for retirement in India"
          ]
        },
        {
          title: "Eligibility Criteria",
          description: "Based on international income standards:",
          items: [
            "Degree: Graduate degree is often mandatory",
            "Experience: Minimum 1-2 years abroad",
            "Income: Minimum $3000 - $5000 equivalent per month (varies by country)",
            "POA: Power of Attorney holder in India (usually a relative) is mandatory"
          ]
        },
        {
          title: "Documents Required",
          description: "Requires embassy/consulate attestation in some cases:",
          items: [
            "Passport & Visa/Work Permit copy",
            "Overseas Address Proof",
            "Employment Contract & Salary Certificate (English)",
            "NRE/NRO Bank Statements (Last 6 months)",
            "Continuous Discharge Certificate (for Merchant Navy)"
          ]
        },
        {
          title: "Repayment Rules",
          description: "Strict RBI guidelines apply:",
          items: [
            "Payment must come from NRE/NRO account",
            "Remittance from abroad through normal banking channels",
            "Rental income in India can be used for EMI",
            "Tenure: Usually restricted to 15-20 years"
          ]
        }
      ]
    },
    {
      id: "home-extension-loan",
      sections: [
        {
          title: "Why Opt for a Home Extension Loan?",
          description: "Perfect for growing families needing more space:",
          items: [
            "Adding a new floor to the house",
            "Constructing an additional bedroom or reading room",
            "Enclosing a balcony to create living space"
          ]
        },
        {
          title: "Eligibility Criteria",
          description: "Checks on structural feasibility:",
          items: [
            "Structural Stability Certificate: To ensure existing building can hold the weight",
            "Approvals: Extension plan must be approved by local authority",
            "Ownership: Joint owners must be co-applicants"
          ]
        },
        {
          title: "Documents Required",
          description: "Technical documents are key:",
          items: [
            "Approved Extension Plan",
            "Cost Estimation by Architect",
            "Original Title Deeds (if not already with the bank)",
            "Latest KYC and Income proofs"
          ]
        },
        {
          title: "Key Benefits",
          description: "Financial advantages:",
          items: [
            "Interest Rate: Same as regular Home Loan rates",
            "Tax Deduction: Eligible under Sec 24(b) (Interest) and 80C (Principal)",
            "LTV: Up to 90% of the construction estimate",
            "Long Tenure: Up to 20 years"
          ]
        }
      ]
    },
    {
      id: "home-loan-for-self-employed",
      sections: [
        {
          title: "Overview for Self-Employed",
          description: "Tailored for business owners, professionals (Doctors, CAs), and freelancers:",
          items: [
            "Flexible income assessment methods",
            "Higher loan amounts based on business turnover",
            "Consideration of depreciation and other non-cash expenses"
          ]
        },
        {
          title: "Eligibility Criteria",
          description: "Business stability is paramount:",
          items: [
            "Business Continuity: Minimum 3 years in the same business",
            "Profitability: Business should be profit-making for last 2 years",
            "Age: Up to 65 or 70 years at loan maturity",
            "Cash Flow: Strong average bank balance"
          ]
        },
        {
          title: "Documents Required",
          description: "Comprehensive financial scrutiny:",
          items: [
            "ITR: Last 3 years with computation of income",
            "Financials: CA Audited Balance Sheet and P&L Account",
            "Business Proof: GST Registration, Gumasta/Shop Act License, MOA/AOA",
            "Bank Statements: Current Account (12 months) + Savings Account (6 months)"
          ]
        },
        {
          title: "Tips for Approval",
          description: "How to maximize eligibility:",
          items: [
            "Maintain high declared income in ITR",
            "Avoid cash transactions; route revenue through bank",
            "Clear tax dues (GST/Advance Tax) on time",
            "Opt for 'Gross Receipt' based programs if ITR is low (for professionals)"
          ]
        }
      ]
    },
    {
      id: "home-loan-for-women",
      sections: [
        {
          title: "Why a Home Loan for Women?",
          description: "Government and banks incentivize women home ownership:",
          items: [
            "To encourage financial independence",
            "Lower borrowing costs",
            "To increase asset holding among women"
          ]
        },
        {
          title: "Exclusive Benefits",
          description: "Financial perks specifically for women applicants:",
          items: [
            "Interest Rate Concession: Typically 0.05% (5 bps) lower than standard rates",
            "Stamp Duty Discount: Many states (like Delhi, Haryana) offer 1-2% lower stamp duty charges",
            "Tax Benefits: Standard benefits apply (up to Rs 3.5 Lakh deduction potential)",
            "PMAY: Mandatory female ownership required for certain PMAY subsidies"
          ]
        },
        {
          title: "Eligibility & Rules",
          description: "To avail the benefits:",
          items: [
            "Sole or Joint Owner: Woman must be the sole or first co-applicant",
            "Co-borrower: Adding an earning husband/father can boost eligibility",
            "Income: Can be a homemaker (if co-applicant is earner) or working professional"
          ]
        },
        {
          title: "Impact on Savings",
          description: "Small rate differences add up:",
          items: [
            "EMI Savings: Lower rate reduces monthly outflow",
            "Total Interest: Significant savings over a 20-30 year tenure",
            "Registration Cost: 1% stamp duty saving on a 50 Lakh property = Rs. 50,000 saved instantly"
          ]
        }
      ]
    }
  ];

  // Logic to find the specific object based on pageId
  const content = loanData.find((data) => data.id === pageId);

  // If no matching ID is found, return null (or a fallback message)
  if (!content) return null;

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      <div className="space-y-10">
        {content.sections.map((section, index) => (
          <div key={index} className="space-y-4">
            {/* Section Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {section.title}
            </h2>

            {/* Section Description */}
            {section.description && (
              <p className="text-lg text-gray-700">
                {section.description}
              </p>
            )}

            {/* List Items */}
            <ul className="space-y-3 mt-4">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {/* teal Check Icon */}
                  <div className="shrink-0 mt-1">
                    <svg 
                      className="w-6 h-6 text-teal-600 fill-current" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  
                  {/* Text Logic: Check for colon to bold the key (e.g., "Age:") */}
                  <span className="text-lg leading-relaxed text-gray-700">
                    {item.includes(':') ? (
                      <>
                        <span className="font-bold text-gray-900">
                          {item.split(':')[0]}:
                        </span>
                        {item.substring(item.indexOf(':') + 1)}
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLoanGuide;