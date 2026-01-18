import React from 'react';

interface ContentItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    eligibility?: string[];
    documents?: string[];
}

interface DynamicContentCardProps {
    pageId: string;
}

const DynamicContentCard: React.FC<DynamicContentCardProps> = ({ pageId }) => {

    const contentData: ContentItem[] = [
        // 1. Existing: Salaried
        {
            id: "personal-loan-salaried",
            title: "Personal Loan for Salaried Employees",
            subtitle: "Instant loans up to ₹40 Lakhs starting at 9.98%",
            description: "Salaried individuals ke liye instant personal loans bina kisi end usage restriction ke available hain. Aap processing fee waivers aur pre-approved offers ka laabh bhi utha sakte hain.",
            features: [
                "Interest Rates starting at 9.98% onwards",
                "Maximum loan amount up to ₹40 Lakh",
                "Flexible tenure up to 60 months",
                "Processing fee usually up to 4%",
                "No end usage restriction (except speculation)",
                "Pre-approved offers based on credit profile"
            ],
            eligibility: [
                "Age: 21 years to 60 years",
                "Nationality: Indian Resident",
                "Profession: Employee of Pvt Ltd or Public Sector (min 1 year exp)",
                "Minimum Monthly Income: At least ₹15,000",
                "Credit Score: 700+ preferred"
            ],
            documents: [
                "ID Proof, Address Proof & PAN Card",
                "Employee ID Card",
                "Last 3 months' salary slips",
                "Bank statements for past 6 months",
                "Latest ITR / Form 16"
            ]
        },

        // 2. New: Self-Employed
        {
            id: "personal-loan-self-employed",
            title: "Personal Loan for Self-Employed",
            subtitle: "Flexible funding for business owners & freelancers",
            description: "Agar aap apna business chalate hain ya freelancer hain, toh aap apni ITR ke basis par personal loan le sakte hain. Business expansion ya personal use ke liye funds turant payein.",
            features: [
                "Loan amount based on Business Income/Turnover",
                "Quick approval based on ITR analysis",
                "Overdraft facility available for interest saving",
                "Flexible tenure up to 5 years",
                "Minimal documentation process"
            ],
            eligibility: [
                "Age: 25 years to 65 years",
                "Business Continuity: Min. 3 years in current business",
                "Minimum Annual Income: ₹2.5 Lakhs per annum",
                "CIBIL Score: 720 and above"
            ],
            documents: [
                "KYC Documents (PAN, Aadhar, Address Proof)",
                "Business Proof (GST Registration, License)",
                "ITR of last 2 years with Computation of Income",
                "Balance Sheet & Profit/Loss Account (Audited if applicable)",
                "Current Account Bank Statement (Last 6-12 months)"
            ]
        },

        // 3. New: Doctors (Professional Loan)
        {
            id: "personal-loan-doctor",
            title: "Personal Loan for Doctors",
            subtitle: "Exclusive high-value loans for medical professionals",
            description: "Doctors ke liye specially curated loans jisme high loan limits aur lowest interest rates offer kiye jaate hain. Clinic setup ya equipment purchase ke liye ideal choice.",
            features: [
                "High Loan Amount (Up to ₹50 Lakhs or more)",
                "Special Low Interest Rates for Professionals",
                "Simple Eligibility based on Degree",
                "Part-payment and foreclosure benefits",
                "Doorstep service available"
            ],
            eligibility: [
                "Degree: MBBS, BDS, MD, MS, or Super Specialist",
                "Experience: Minimum 2-3 years post-qualification",
                "Age: 25 years to 70 years",
                "Residence: Owner of residence or clinic preferred"
            ],
            documents: [
                "KYC Documents",
                "Medical Registration Certificate (IMA/MCI)",
                "Degree Certificates",
                "Bank Statement (Last 6 months)",
                "ITR (if available, mostly optional for smaller amounts)"
            ]
        },

        // 4. New: Senior Citizens (Pensioners)
        {
            id: "personal-loan-senior-citizen",
            title: "Personal Loan for Senior Citizens",
            subtitle: "Financial freedom in your golden years",
            description: "Retirement ke baad medical expenses, travel, ya ghar ki renovation ke liye pension-based loans available hain. Senior citizens ke liye hassle-free process.",
            features: [
                "Loan against Pension",
                "Lower Processing Fees",
                "Tenure up to 5 years (adjusted with age)",
                "Includes Insurance cover options",
                "Priority processing"
            ],
            eligibility: [
                "Age: Up to 75 years (at loan maturity)",
                "Status: Must be a Pensioner drawing regular pension",
                "Account: Pension must be credited to the lending bank",
                "Spouse can be a co-applicant"
            ],
            documents: [
                "Pension Payment Order (PPO)",
                "Identity & Address Proof",
                "Bank Passbook showing pension credit (last 6 months)",
                "Retirement Proof"
            ]
        },

        // 5. New: Women
        {
            id: "personal-loan-women",
            title: "Personal Loan for Women",
            subtitle: "Empowering women with special interest rates",
            description: "Mahilaon ke liye banks special schemes offer karte hain jisme interest rates standard rates se kam hote hain. Working women ke liye fast-track approval process.",
            features: [
                "Concessional Interest Rates (usually 0.5% lower)",
                "Flexible Repayment Options",
                "Exclusive offers on processing fees",
                "Women-centric insurance add-ons",
                "Minimal paperwork"
            ],
            eligibility: [
                "Age: 21 years to 58 years",
                "Employment: Salaried or Self-Employed",
                "Income: Minimum Net Monthly Income ₹15,000",
                "Work Experience: At least 1 year"
            ],
            documents: [
                "Identity Proof (Aadhar/PAN/Voter ID)",
                "Address Proof",
                "Income Proof (Salary Slips or ITR)",
                "Bank Statements (Last 3-6 months)",
                "Employment Proof"
            ]
        }
    ];

    const data = contentData.find((item) => item.id === pageId);

    if (!data) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
            {/* Header Section */}
            <div className="mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                    {data.title}
                </h2>
                <p className="text-lg text-gray-500 italic">
                    {data.subtitle}
                </p>
            </div>

            {/* Description */}
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
                <p>{data.description}</p>
            </div>

            {/* Grid Layout for Features, Eligibility & Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* Features Section */}
                <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4 text-blue-900">Features</h3>
                    <ul className="space-y-3">
                        {data.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm md:text-base">
                                <span className="text-blue-600 mt-1">✓</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Eligibility Section (Render only if exists) */}
                {data.eligibility && (
                    <div className="bg-green-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 text-green-900">Eligibility Criteria</h3>
                        <ul className="space-y-3">
                            {data.eligibility.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm md:text-base">
                                    <span className="text-green-600 mt-1">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Documents Section (Full Width) */}
            {data.documents && (
                <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Required Documents</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.documents.map((doc, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-700">
                                <span className="text-gray-400">•</span>
                                {doc}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DynamicContentCard;