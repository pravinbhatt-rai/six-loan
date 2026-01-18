import React from 'react';

const LoanInfoSection = ({ pageId }: { pageId: string }) => {
  // data array embedded inside the component
  const loanData = [
    {
      id: "10-lakh",
      sections: [
        {
          title: "Why Opt for a Personal Loan of Rs. 10 Lakh?",
          description: "A Rs. 10 lakh personal loan can be a flexible financing option for:",
          items: [
            "Wedding costs or home renovations",
            "Treatment costs and medical emergencies",
            "Debt consolidation or refinancing",
            "Funding your higher education in India or abroad"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 10 Lakh Personal Loan",
          description: "Eligibility criteria for a Rs. 10 lakh loan, most banks and NBFCs generally require:",
          items: [
            "Age: 21 to 60 years",
            "EMI to Income Ratio: Lenders usually consider applicants with a ratio below 50-55%. For larger loan amounts, the required income is usually higher.",
            "Credit Score: 750+ is ideal",
            "Employment: Salaried or self-employed with stable income",
            "Work experience: 1-2 years minimum"
          ]
        },
        {
          title: "Documents Required",
          description: "Here are the basic documents needed to apply for a Personal loan of Rs. 10 lakh:",
          items: [
            "PAN card & Aadhaar card",
            "Salary slips (last 3 months) or ITR (for self-employed)",
            "Bank statements (last 6 months)",
            "Address proof (electricity bill, rent agreement, etc.)",
            "Employment proof or business proof"
          ]
        },
        {
          title: "Interest Rate on Rs. 10 Lakh Loan",
          description: "Interest rates for Rs. 10 lakh personal loans in India typically start from 9.98% p.a. However, your final interest rate will depend on factors like your credit score, employer category, loan tenure, and existing debts. (Note: A credit score of 750+ can help you secure the lowest personal interest rates).",
          items: [
            "Your credit score",
            "Employer category (for salaried)",
            "Loan tenure",
            "Existing debts"
          ]
        },
        {
          title: "Fees & Charges for 10 Lakh Loan",
          description: "Apart from the interest rate, standard fees applicable include:",
          items: [
            "Processing Fee: Ranges from 0.5% to 4% of the loan amount",
            "Stamp Duty: Applicable as per actual",
            "Late EMI Charges: Approximately 24% p.a.",
            "Legal Charges: Levied as per actuals"
          ]
        },
        // --- NEW SECTION ADDED ---
        {
          title: "How a ₹10 Lakh Loan Impacts Your Credit Score",
          description: "Your credit score may be greatly impacted by taking out a large loan, such as Rs. 10 lakh, in both positive and negative ways, based on how you handle it. Here’s how:",
          items: [
            "Timely EMI Payments = Boosted Score: If you pay your EMIs regularly and on time, your credit history will become strong with a robust repayment track record.",
            "Demonstrates Creditworthiness: Responsibly handling a Rs. 10 lakh loan demonstrates your ability to manage large credit, which boosts lender confidence.",
            "Missed or Late EMIs = Lower Score: A single late payment can have a negative impact on your credit report and severely lower your score.",
            "Hard Enquiries from Multiple Applications: If you apply to many lenders at once, it triggers multiple credit checks, which may slightly lower your score."
          ]
        },
        // -------------------------
        {
          title: "Tips to Get Approved for a Personal Loan of Rs. 10 Lakh",
          description: "You can increase your chances of approval with these simple practices:",
          items: [
            "Maintain a high credit score (750+)",
            "Avoid multiple loan applications at once",
            "Choose a longer tenure to reduce EMI burden",
            "Provide accurate income proof",
            "Add a co-applicant (if needed) for better eligibility"
          ]
        },
        {
          title: "Benefits of Choosing a Rs 10 Lakh Loan",
          description: "Enjoy a seamless borrowing experience with features such as:",
          items: [
            "Hassle Free Experience",
            "Access to 30+ Lenders",
            "Collateral-Free Loan Offers",
            "Free Credit Score",
            "Pre-approved Loan Offers",
            "Attractive Interest Rates",
            "Easy EMI Options",
            "Quick Approvals & Disbursal",
            "End-to-End Assistance"
          ]
        }
      ]
    },
    {
      id: "5-lakh",
      sections: [
        {
          title: "Why Opt for a Personal Loan of Rs. 5 Lakh?",
          description: "A Rs. 5 lakh personal loan is ideal for smaller, immediate financial needs such as:",
          items: [
            "Family vacations or international travel",
            "Buying high-end electronics or gadgets",
            "Minor home repairs or painting",
            "Two-wheeler purchase or down payment for a car"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 5 Lakh Personal Loan",
          description: "Since the amount is lower, eligibility is generally more accessible:",
          items: [
            "Age: 21 to 60 years",
            "Minimum Income: Usually Rs. 20,000 - Rs. 25,000 per month depending on the city",
            "Credit Score: 700+ is often accepted, though 750+ is preferred",
            "Employment: Minimum 1 year of total work experience",
            "FOIR: Existing EMI obligations should not exceed 50% of income"
          ]
        },
        {
          title: "Documents Required",
          description: "The documentation for a Rs. 5 lakh loan is standard and minimal:",
          items: [
            "KYC Documents (PAN, Aadhaar/Voter ID)",
            "Salary slips (last 3 months)",
            "Bank account statements (last 3-6 months)",
            "Rent agreement or electricity bill (Current address proof)"
          ]
        },
        {
          title: "Interest Rate on Rs. 5 Lakh Loan",
          description: "Interest rates for Rs. 5 lakh personal loans typically start from 10.25% p.a. However, your final interest rate will depend on factors like your credit score, employer category, and loan tenure. (Note: A credit score of 750+ is recommended for the best rates).",
          items: [
            "Your credit score",
            "Employer category (for salaried)",
            "Loan tenure",
            "Existing debts"
          ]
        },
        {
          title: "Fees & Charges for 5 Lakh Loan",
          description: "Standard fees applicable for this loan amount include:",
          items: [
            "Processing Fee: Ranges from 0.5% to 4% of the loan amount",
            "Stamp Duty: Applicable as per state laws",
            "Late EMI Charges: Approximately 24% p.a.",
            "Foreclosure Charges: May apply if closed before tenure"
          ]
        },
        // --- NEW SECTION ADDED ---
        {
          title: "How a ₹5 Lakh Loan Impacts Your Credit Score",
          description: "Your credit score may be greatly impacted by taking out a Rs. 5 lakh loan, both positively and negatively, based on how you handle it:",
          items: [
            "Timely EMI Payments = Boosted Score: If you pay your EMIs regularly and on time, your credit history will become strong with a robust repayment track record.",
            "Demonstrates Creditworthiness: Responsibly handling a Rs. 5 lakh loan demonstrates your ability to manage credit, which boosts lender confidence.",
            "Missed or Late EMIs = Lower Score: A single late payment can have a negative impact on your credit report and severely lower your score.",
            "Hard Enquiries from Multiple Applications: If you apply to many lenders at once, it triggers multiple credit checks, which may slightly lower your score."
          ]
        },
        // -------------------------
        {
          title: "Tips to Get Approved for a Personal Loan of Rs. 5 Lakh",
          description: "Increase your chances of approval for a smaller loan with these tips:",
          items: [
            "Ensure your credit score is healthy (700+)",
            "Do not have too many active loans",
            "Show stable monthly income",
            "Provide accurate current address proof",
            "Apply with a lender where you have an existing relationship"
          ]
        },
        {
          title: "Benefits of Choosing a Rs 5 Lakh Loan",
          description: "Key benefits of opting for a Rs. 5 Lakh personal loan:",
          items: [
            "Quick processing and disbursal",
            "Minimal documentation required",
            "No collateral needed",
            "Flexible repayment tenures",
            "Ideal for short-term financial goals",
            "Competitive interest rates for salaried individuals"
          ]
        }
      ]
    },
    {
      id: "20-lakh",
      sections: [
        {
          title: "Why Opt for a Personal Loan of Rs. 20 Lakh?",
          description: "A Rs. 20 lakh loan covers substantial expenses and major life events:",
          items: [
            "Grand wedding expenses (venue, catering, jewelry)",
            "Higher education tuition fees for abroad studies",
            "Extensive home renovation or adding a new floor",
            "Down payment for a new property or luxury car"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 20 Lakh Personal Loan",
          description: "For this amount, lenders look for higher income stability:",
          items: [
            "Age: 23 to 58 years (varies by bank)",
            "Minimum Income: Typically Rs. 40,000+ per month",
            "Credit Score: 750+ is highly recommended for approval",
            "Employment Stability: At least 2-3 years total experience",
            "Employer Reputation: Working for MNCs or listed companies can help approval"
          ]
        },
        {
          title: "Documents Required",
          description: "Lenders may require slightly more detailed financial proofs:",
          items: [
            "Identity & Address Proof (Aadhaar, Passport, etc.)",
            "Salary slips (last 3-6 months)",
            "Form 16 or ITR for the last 1-2 years",
            "Bank statements showing salary credit (last 6 months)",
            "Employment continuity proof (Relieving letter from previous job if new)"
          ]
        },
        {
          title: "Interest Rate on Rs. 20 Lakh Loan",
          description: "Interest rates for high-value loans like Rs. 20 lakh often start from 10.50% p.a., depending on the lender's policy and your profile. A higher income and excellent credit score are key to negotiating lower rates.",
          items: [
            "Your credit score (750+ preferred)",
            "Employer reputation (MNC/Public Sector)",
            "Loan tenure selected",
            "Debt-to-income ratio"
          ]
        },
        {
          title: "Fees & Charges for 20 Lakh Loan",
          description: "Applicable fees for a Rs. 20 Lakh loan generally include:",
          items: [
            "Processing Fee: Up to 3-4% of loan amount (often negotiable)",
            "Stamp Duty: As per actual state regulations",
            "Penal Interest: ~2% per month on overdue amount",
            "Legal/Incidental Charges: As applicable"
          ]
        },
        // --- NEW SECTION ADDED ---
        {
          title: "How a ₹20 Lakh Loan Impacts Your Credit Score",
          description: "Your credit score may be greatly impacted by taking out a large loan, such as Rs. 20 lakh, in both positive and negative ways. Here’s how:",
          items: [
            "Timely EMI Payments = Boosted Score: If you pay your EMIs regularly and on time, your credit history will become strong with a robust repayment track record.",
            "Demonstrates Creditworthiness: Responsibly handling a Rs. 20 lakh loan demonstrates your ability to manage large credit, which boosts lender confidence.",
            "Missed or Late EMIs = Lower Score: A single late payment can have a negative impact on your credit report and severely lower your score.",
            "Hard Enquiries from Multiple Applications: If you apply to many lenders at once, it triggers multiple credit checks, which may slightly lower your score."
          ]
        },
        // -------------------------
        {
          title: "Tips to Get Approved for a Personal Loan of Rs. 20 Lakh",
          description: "To secure approval for a higher amount, follow these practices:",
          items: [
            "Maintain a pristine credit repayment history",
            "Close smaller existing debts to improve eligibility",
            "Opt for a co-borrower with good income if needed",
            "Ensure your employment details are updated",
            "Avoid job hopping immediately before applying"
          ]
        },
        {
          title: "Benefits of Choosing a Rs 20 Lakh Loan",
          description: "Advantages of taking a Rs. 20 Lakh personal loan:",
          items: [
            "High loan amount without collateral",
            "Extended repayment tenure up to 60-72 months",
            "Funds available for diverse large expenses",
            "Option for balance transfer to lower rates",
            "Pre-approved offers for select customers",
            "Paperless application process with major banks"
          ]
        }
      ]
    },
    {
      id: "30-lakh",
      sections: [
        {
          title: "Why Opt for a Personal Loan of Rs. 30 Lakh?",
          description: "A Rs. 30 lakh personal loan is suitable for significant capital requirements:",
          items: [
            "Major medical surgeries or prolonged treatments",
            "Business expansion or equipment purchase (for self-employed)",
            "Complete home interiors and furnishing",
            "Debt consolidation of multiple smaller loans"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 30 Lakh Personal Loan",
          description: "Lenders implement stricter checks for high-value loans:",
          items: [
            "Age: 25 to 60 years",
            "Minimum Income: Usually Rs. 60,000 - Rs. 75,000+ per month",
            "Credit Score: 750+ mandatory with a clean repayment history",
            "Debt-to-Income Ratio: Should be strictly below 50%",
            "Employment: Stable tenure at current organization (min 1 year)"
          ]
        },
        {
          title: "Documents Required",
          description: "Comprehensive financial documentation is needed:",
          items: [
            "Standard KYC (PAN, Aadhaar)",
            "Income Proof: Salary slips, Form 16 (2 years), or ITR with computation",
            "Bank Statements: Last 6-12 months",
            "Business ownership proof (if self-employed)",
            "Copy of Degree/License (for professionals like Doctors/CAs)"
          ]
        },
        {
          title: "Interest Rate on Rs. 30 Lakh Loan",
          description: "For a Rs. 30 lakh loan, interest rates are competitive, often starting around 10.50% - 11% p.a. Since the risk is higher for the lender, your financial stability plays a crucial role in the final offer.",
          items: [
            "Credit Score & Repayment History",
            "Annual Income/Turnover",
            "Relationship with the bank",
            "Professional qualification (for self-employed professionals)"
          ]
        },
        {
          title: "Fees & Charges for 30 Lakh Loan",
          description: "Be aware of these charges for a Rs. 30 Lakh loan:",
          items: [
            "Processing Fee: Typically 1% to 3% of the loan amount",
            "GST: Applicable on all fees and charges",
            "Foreclosure Charges: Check lock-in period clauses",
            "Bounce Charges: Penalties for failed EMI payments"
          ]
        },
        // --- NEW SECTION ADDED ---
        {
          title: "How a ₹30 Lakh Loan Impacts Your Credit Score",
          description: "Your credit score may be greatly impacted by taking out a large loan, such as Rs. 30 lakh, in both positive and negative ways. Here’s how:",
          items: [
            "Timely EMI Payments = Boosted Score: If you pay your EMIs regularly and on time, your credit history will become strong with a robust repayment track record.",
            "Demonstrates Creditworthiness: Responsibly handling a Rs. 30 lakh loan demonstrates your ability to manage large credit, which boosts lender confidence.",
            "Missed or Late EMIs = Lower Score: A single late payment can have a negative impact on your credit report and severely lower your score.",
            "Hard Enquiries from Multiple Applications: If you apply to many lenders at once, it triggers multiple credit checks, which may slightly lower your score."
          ]
        },
        // -------------------------
        {
          title: "Tips to Get Approved for a Personal Loan of Rs. 30 Lakh",
          description: "Improve your approval odds for this large sum:",
          items: [
            "Ensure a low Debt-to-Income (DTI) ratio",
            "Maintain a high credit score (750+ is non-negotiable)",
            "Provide all financial documents transparently",
            "Apply with a bank where your salary is credited",
            "Consider a joint loan to boost income eligibility"
          ]
        },
        {
          title: "Benefits of Choosing a Rs 30 Lakh Loan",
          description: "Why this loan is a powerful financial tool:",
          items: [
            "Substantial funding for major life goals",
            "No need to pledge assets or property",
            "Flexible EMI options over 5-6 years",
            "Quick disbursal for emergency needs",
            "Consolidate high-cost debts into one EMI",
            "Special rates for doctors and government employees"
          ]
        }
      ]
    },
    {
      id: "40-lakh",
      sections: [
        {
          title: "Why Opt for a Personal Loan of Rs. 40 Lakh?",
          description: "A Rs. 40 lakh loan is a premium financing option used for:",
          items: [
            "Purchasing expensive plots or land (where home loans don't apply)",
            "Luxury international travel or world tours",
            "Seed funding for a side business venture",
            "Pre-closing other high-interest debts"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 40 Lakh Personal Loan",
          description: "This amount is usually reserved for high-income earners:",
          items: [
            "Age: 25 to 58 years",
            "Minimum Income: Typically Rs. 80,000 - Rs. 1 Lakh per month",
            "Credit Score: Excellent score (775+) preferred",
            "Employer Category: Super-A Category or Fortune 500 companies",
            "Vintage: Long history of credit management"
          ]
        },
        {
          title: "Documents Required",
          description: "Stricter verification of income and employment:",
          items: [
            "KYC and Address Proofs",
            "ITR and Form 16 for the last 2-3 years",
            "Salary slips (last 3-6 months)",
            "Salary account bank statements (last 6-12 months)",
            "Official email verification or employee ID card"
          ]
        },
        {
          title: "Interest Rate on Rs. 40 Lakh Loan",
          description: "Interest rates for a Rs. 40 lakh loan are usually personalized based on the applicant's profile, starting from around 10.75% p.a. High-income individuals with excellent credit scores often negotiate the best rates.",
          items: [
            "Borrower's Income Profile",
            "Employer Category (Cat A/Super A)",
            "Existing Loan Obligations",
            "CIBIL Score (775+ preferred)"
          ]
        },
        {
          title: "Fees & Charges for 40 Lakh Loan",
          description: "Common charges associated with a Rs. 40 Lakh loan:",
          items: [
            "Processing Fee: Usually capped or a percentage (up to 2%)",
            "Insurance Premium: Optional but often recommended for large loans",
            "Part-payment Charges: Varies by lender policy",
            "Documentation Charges: Nominal fee"
          ]
        },
        // --- NEW SECTION ADDED ---
        {
          title: "How a ₹40 Lakh Loan Impacts Your Credit Score",
          description: "Your credit score may be greatly impacted by taking out a large loan, such as Rs. 40 lakh, in both positive and negative ways. Here’s how:",
          items: [
            "Timely EMI Payments = Boosted Score: If you pay your EMIs regularly and on time, your credit history will become strong with a robust repayment track record.",
            "Demonstrates Creditworthiness: Responsibly handling a Rs. 40 lakh loan demonstrates your ability to manage large credit, which boosts lender confidence.",
            "Missed or Late EMIs = Lower Score: A single late payment can have a negative impact on your credit report and severely lower your score.",
            "Hard Enquiries from Multiple Applications: If you apply to many lenders at once, it triggers multiple credit checks, which may slightly lower your score."
          ]
        },
        // -------------------------
        {
          title: "Tips to Get Approved for a Personal Loan of Rs. 40 Lakh",
          description: "Strategies to secure approval for Rs. 40 Lakh:",
          items: [
            "Showcase a strong career trajectory and stability",
            "Clear existing credit card dues before applying",
            "Ensure no discrepancies in your credit report",
            "Apply when you have a good vintage in your current job",
            "Leverage pre-approved offers if available"
          ]
        },
        {
          title: "Benefits of Choosing a Rs 40 Lakh Loan",
          description: "Benefits of this premium loan category:",
          items: [
            "Access to large funds without liquidating investments",
            "Potential for lower rates due to premium profile",
            "Customized repayment schedules",
            "Dedicated relationship manager support",
            "Complete digital processing for select customers",
            "Usage flexibility for any legitimate purpose"
          ]
        }
      ]
    },
    {
      id: "50-lakh",
      sections: [
        {
          title: "Why Opt for a Personal Loan of Rs. 50 Lakh?",
          description: "Rs. 50 lakh is generally the upper limit for personal loans, used for:",
          items: [
            "Premium home automation and structural changes",
            "Overseas relocation expenses (Visa, travel, initial setup)",
            "High-end weddings or events",
            "Bridge financing for property purchase"
          ]
        },
        {
          title: "Eligibility Criteria for a Rs. 50 Lakh Personal Loan",
          description: "Eligibility is restricted to High Net-worth Individuals (HNIs):",
          items: [
            "Age: 28 to 60 years",
            "Minimum Income: Rs. 1 Lakh to 1.5 Lakh+ per month",
            "Credit Score: 780+ with zero recent defaults",
            "FOIR: Very low existing obligations required",
            "Sector: Stable sectors like IT, BFSI, or Govt. services"
          ]
        },
        {
          title: "Documents Required",
          description: "Detailed documentation to establish repayment capacity:",
          items: [
            "Complete KYC package",
            "Last 3 years ITR and Form 16",
            "Bank statements reflecting high liquidity (6-12 months)",
            "Proof of other assets (sometimes requested for borderline cases)",
            "Office address proof and employment verification"
          ]
        },
        {
          title: "Interest Rate on Rs. 50 Lakh Loan",
          description: "For the maximum bracket of Rs. 50 lakh, interest rates are highly competitive for eligible HNIs, often starting from 10.99% p.a. The rate is heavily influenced by the borrower's net worth and credit history.",
          items: [
            "Net Monthly Income",
            "Credit Score (780+ essential)",
            "Professional Qualification",
            "Banking Relationship Value"
          ]
        },
        {
          title: "Fees & Charges for 50 Lakh Loan",
          description: "Charges for a Rs. 50 Lakh personal loan:",
          items: [
            "Processing Fee: Negotiable for high-value customers (0.5% - 2%)",
            "Pre-payment Charges: Check if zero foreclosure options exist",
            "Stamp Duty: Higher for larger loan amounts",
            "Statement Charges: Usually nil for digital statements"
          ]
        },
        // --- NEW SECTION ADDED ---
        {
          title: "How a ₹50 Lakh Loan Impacts Your Credit Score",
          description: "Your credit score may be greatly impacted by taking out a large loan, such as Rs. 50 lakh, in both positive and negative ways. Here’s how:",
          items: [
            "Timely EMI Payments = Boosted Score: If you pay your EMIs regularly and on time, your credit history will become strong with a robust repayment track record.",
            "Demonstrates Creditworthiness: Responsibly handling a Rs. 50 lakh loan demonstrates your ability to manage large credit, which boosts lender confidence.",
            "Missed or Late EMIs = Lower Score: A single late payment can have a negative impact on your credit report and severely lower your score.",
            "Hard Enquiries from Multiple Applications: If you apply to many lenders at once, it triggers multiple credit checks, which may slightly lower your score."
          ]
        },
        // -------------------------
        {
          title: "Tips to Get Approved for a Personal Loan of Rs. 50 Lakh",
          description: "Critical steps for approval of Rs. 50 Lakh:",
          items: [
            "Demonstrate high disposable income",
            "Maintain a flawless repayment track record",
            "Avoid recent hard inquiries on your credit report",
            "Apply with your primary banking partner first",
            "Ensure all tax documents (ITR) are perfectly in order"
          ]
        },
        {
          title: "Benefits of Choosing a Rs 50 Lakh Loan",
          description: "Exclusive benefits for Rs. 50 Lakh borrowers:",
          items: [
            "Maximum unsecured funding available",
            "Priority processing and disbursal",
            "Personalized interest rates and terms",
            "Long tenure options to manage cash flow",
            "No collateral risk to personal assets",
            "Doorstep service for documentation"
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

export default LoanInfoSection;