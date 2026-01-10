import React from 'react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface Testimonial {
  name: string;
  reason: string;
  content: string;
}

interface SuccessStoryData {
  id: string; // The lookup key
  title: string;
  stories: Testimonial[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const SUCCESS_STORIES_DATA: SuccessStoryData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    title: "Success Stories by Verified Six Loan Borrowers",
    stories: [
      {
        name: "Priya Shukla",
        reason: "For Medical Emergency",
        content: "Two years ago I faced a medical emergency at my home. I had an emergency fund but soon I ran short of it. I applied for a personal loan through Six Loan and got an instant reply. They guided me through the entire process and helped me get the loan in time."
      },
      {
        name: "Manish Singh",
        reason: "For Home Renovation",
        content: "I have a 20-year-old home which required immediate repair. I applied for a personal loan of Rs. 10 lakh for 5 years. The team was extremely cooperative and helped me get the lowest interest rates possible with disbursal in 24 hours."
      },
      {
        name: "Manoj Sharma",
        reason: "Pre-approved Offer",
        content: "When I checked the Six Loan app, I found myself eligible for a pre-approved loan from a top bank with zero documentation. The process was hassle-free, quick, and the money was in my account within minutes."
      }
    ]
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    title: "Real Home Loan Journeys",
    stories: [
      {
        name: "Aditya Roy",
        reason: "First Home Buyer",
        content: "Buying my first flat in Mumbai seemed impossible until I compared rates on Six Loan. I found a lender offering 8.35% interest linked to Repo Rate. The legal verification support was a lifesaver."
      },
      {
        name: "Sneha & Varun",
        reason: "Joint Home Loan",
        content: "We wanted a larger apartment. Applying jointly helped us increase our eligibility. Six Loan helped us compare processing fees, saving us almost Rs. 25,000 upfront."
      }
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    title: "Business Growth Stories",
    stories: [
      {
        name: "Rajesh Gupta",
        reason: "Inventory Expansion",
        content: "Diwali season was approaching, and I needed stock. My bank asked for collateral I didn't have. Six Loan connected me with an NBFC that sanctioned Rs. 15 Lakhs based purely on my GST returns within 48 hours."
      },
      {
        name: "Kavita Menen",
        reason: "New Machinery",
        content: "To scale my textile unit, I needed imported machinery. The Equipment Finance option suggested by Six Loan helped me get funding where the machine itself was the collateral."
      }
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    title: "Savings via Balance Transfer",
    stories: [
      {
        name: "Vikram Sethi",
        reason: "Reduced Interest Rate",
        content: "I was paying 18% on my old loan. Six Loan showed me an offer for 11.5% from another bank. The balance transfer reduced my EMI by Rs. 4,500 per month instantly."
      },
      {
        name: "Ankit Verma",
        reason: "Consolidation",
        content: "I had 3 different loans and 2 credit cards maxed out. I used the Balance Transfer + Top Up facility to close everything and now I pay just one manageable EMI."
      }
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    title: "Professionals We Assisted",
    stories: [
      {
        name: "Dr. A. K. Singh",
        reason: "Clinic Setup",
        content: "As a doctor, time is luxury. Six Loan's Green Channel process for professionals was impressive. I got Rs. 40 Lakhs for my new clinic equipment with just my KYC and Medical Registration certificate."
      },
      {
        name: "CA Riya Desai",
        reason: "Office Expansion",
        content: "I needed funds to renovate my office. Being a CA, I got a special rate of 10.50% without any collateral. The process was entirely digital."
      }
    ]
  },
  // 6. Loan Against Property
  {
    id: 'loan-against-property',
    title: "Unlocking Property Value",
    stories: [
      {
        name: "Suresh Patel",
        reason: "Business Emergency",
        content: "I needed a large sum of Rs. 2 Cr for my factory. Personal loans were too small. I mortgaged my residential property through Six Loan and got funds at just 9.5% interest for 15 years."
      },
      {
        name: "Meera Joshi",
        reason: "Child's Marriage",
        content: "Instead of breaking my FDs, I took a Loan Against Property. It was cheaper than a personal loan and gave me the flexibility to pay over a longer tenure."
      }
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    title: "Smart Mortgage Switches",
    stories: [
      {
        name: "Rohan Das",
        reason: "Rate Reduction",
        content: "I was stuck at 9.5% with my old bank. Switched to a Repo Linked Loan at 8.40% via Six Loan. The calculation showed I would save nearly Rs. 12 Lakhs in interest over the next 15 years."
      },
      {
        name: "Amitabh K.",
        reason: "Top-Up for Renovation",
        content: "While transferring my home loan, I also availed a Top-Up of Rs. 10 Lakhs for renovation at home loan rates, which is much cheaper than a personal loan."
      }
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    title: "Student Success Stories",
    stories: [
      {
        name: "Ishaan Malhotra",
        reason: "MS in USA",
        content: "My visa interview was in 10 days and I needed a sanction letter. Six Loan helped me connect with a lender who provided a Pre-Visa Disbursement letter based on my GRE score."
      },
      {
        name: "Sanya Mir",
        reason: "MBA in India",
        content: "I got into a premier institute. The loan covered 100% of my tuition and hostel fees. The best part is the moratorium period where I don't have to pay EMIs until I get a job."
      }
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    title: "Liquidity Without Selling",
    stories: [
      {
        name: "Karan Johar",
        reason: "Market Volatility",
        content: "The market was down, and I didn't want to sell my portfolio at a loss. I pledged my mutual funds digitally and got an overdraft limit in 4 hours to manage my cash crunch."
      },
      {
        name: "Deepa S.",
        reason: "Short Term Need",
        content: "I needed funds for just 2 months. LAS was perfect because I only paid interest on the amount I used, not the whole limit. Much cheaper than a personal loan."
      }
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    title: "Drive Your Dream",
    stories: [
      {
        name: "Rahul T.",
        reason: "First Car",
        content: "I found a great deal on a 3-year-old Swift. Six Loan helped me get 80% funding on the valuation. They even handled the RC transfer paperwork."
      },
      {
        name: "Simran Kaur",
        reason: "Upgrade",
        content: "Wanted an SUV but new ones were too expensive. Bought a used Creta with a loan at reasonable rates. The process was smooth despite buying from an individual seller."
      }
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    title: "Two-Wheeler Stories",
    stories: [
      {
        name: "Vijay Kumar",
        reason: "Daily Commute",
        content: "Public transport was taking too long. I bought a used bike for Rs. 60,000. The loan was approved instantly with just my Aadhaar and Pan card."
      },
      {
        name: "Arjun R.",
        reason: "College Ride",
        content: "Got a second-hand bike for college. My father was the co-applicant. The EMI is very low, around Rs. 2000, which fits my pocket money."
      }
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    title: "New Car Owners",
    stories: [
      {
        name: "Mr. & Mrs. Iyer",
        reason: "Family Car",
        content: "The dealer quoted 10% interest. I checked Six Loan and got an offer from a PSU bank at 8.75% with zero processing fee. Saved a lot of money."
      },
      {
        name: "Gaurav B.",
        reason: "On-Road Funding",
        content: "I didn't have much cash for down payment. Found a lender who funded 100% of the On-Road price including insurance. Drove my new Nexon home the next day."
      }
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    title: "Rider Stories",
    stories: [
      {
        name: "Siddharth M.",
        reason: "Superbike Dream",
        content: "Buying a Kawasaki was my dream. The loan process for high-end bikes is different, but Six Loan guided me to the right lender who understood the asset value."
      },
      {
        name: "Nikhil P.",
        reason: "Zero Down Payment",
        content: "Got a 100% funding offer for a scooter. The EMI scheme was very flexible, allowing me to pay over 3 years."
      }
    ]
  }
];

// ==========================================
// 3. The Presentational Component
// ==========================================

interface SuccessStoriesProps {
  data: SuccessStoryData;
}

const SuccessStories: React.FC<SuccessStoriesProps> = ({ data }) => {
  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-teal-500 pb-3 inline-block">
          {data.title}
        </h2>
      </div>

      <div className="space-y-8 md:space-y-10">
        {data.stories.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 md:gap-3">
            <h3 className="text-lg md:text-xl font-bold">
              <span className="text-gray-900">{item.name}</span>
              <span className="text-teal-600"> — {item.reason}</span>
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              "{item.content}"
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

// ==========================================
// 4. The Container Component (Use this)
// ==========================================

interface SuccessStoriesContainerProps {
  id: string; // The ID to look up in the array
}

export const SuccessStoriesContainer: React.FC<SuccessStoriesContainerProps> = ({ id }) => {
  // 1. Find Data
  const data = SUCCESS_STORIES_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`SuccessStoriesContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return <SuccessStories data={data} />;
};

export default SuccessStoriesContainer;