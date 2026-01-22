// lib/data/creditCardCategories.ts

import { CategoryCard } from "@/component/creditcards/CategorySection";
import { getCreditCardImage } from "@/lib/utils/imageUtils";
import { 
  DollarSign, 
  Fuel, 
  Plane, 
  ShoppingBag, 
  Award, 
  Crown,
  type LucideIcon
} from "lucide-react";

// Unified modern color theme
const modernTheme = {
  cashback: {
    gradient: "from-teal-500 to-teal-600",
    light: "bg-teal-50",
    border: "border-teal-200",
    iconComponent: DollarSign
  },
  fuel: {
    gradient: "from-amber-500 to-amber-600",
    light: "bg-amber-50",
    border: "border-amber-200",
    iconComponent: Fuel
  },
  travel: {
    gradient: "from-blue-500 to-blue-600",
    light: "bg-blue-50",
    border: "border-blue-200",
    iconComponent: Plane
  },
  shopping: {
    gradient: "from-purple-500 to-purple-600",
    light: "bg-purple-50",
    border: "border-purple-200",
    iconComponent: ShoppingBag
  },
  rewards: {
    gradient: "from-indigo-500 to-indigo-600",
    light: "bg-indigo-50",
    border: "border-indigo-200",
    iconComponent: Award
  },
  premium: {
    gradient: "from-gray-700 to-gray-800",
    light: "bg-gray-50",
    border: "border-gray-300",
    iconComponent: Crown
  }
} as const;

export interface CategoryData {
  id: string;
  title: string;
  description?: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconComponent: LucideIcon;
  cards: CategoryCard[];
}

// Helper to create card with proper image
const createCard = (
  id: string,
  name: string,
  bank: string,
  joiningFee: string,
  annualFee: string,
  keyFeatures: string[],
  whyWeLikeIt: string,
  rating?: number
): CategoryCard => ({
  id,
  name,
  bank,
  joiningFee,
  annualFee,
  image: getCreditCardImage(bank, name),
  keyFeatures,
  whyWeLikeIt,
  rating
});

// Cashback Cards Data
export const cashbackCards: CategoryData = {
  id: "best-cashback",
  title: "Best Cashback Credit Cards in India",
  description: "Most credit cards offer value-back in the form of reward points. However, some cards come with a good base reward rate along with substantial savings on select categories through accelerated earning.",
  color: modernTheme.cashback.gradient,
  bgColor: modernTheme.cashback.light,
  borderColor: modernTheme.cashback.border,
  iconComponent: modernTheme.cashback.iconComponent,
  cards: [
    createCard(
      "yes-paisasave",
      "YES BANK Paisabazaar PaisaSave Credit Card",
      "YES BANK",
      "Nil",
      "₹499 + Taxes",
      [
        "6% cashback on all dining & travel spends",
        "Unlimited 1% cashback on all other spends, including UPI",
        "Annual fee waiver on ₹1.2 Lakh annual spends"
      ],
      "High cashback without any merchant restrictions",
      4.7
    ),
    createCard(
      "cashback-sbi",
      "Cashback SBI Card",
      "SBI",
      "₹1999",
      "₹1999",
      [
        "5% cashback on all online spends",
        "1% cashback across all offline spends",
        "Cashback directly credited to card account"
      ],
      "High cashback rate for online transactions with no merchant restrictions",
      4.6
    )
  ]
};

// Fuel Cards Data
export const fuelCards: CategoryData = {
  id: "best-fuel",
  title: "Best Fuel Credit Cards in India",
  description: "To begin your credit card comparison to find the best fuel credit card, below is a list of best credit cards in India that offer fuel benefits in the form of fuel surcharge waiver and co-branded discounts.",
  color: modernTheme.fuel.gradient,
  bgColor: modernTheme.fuel.light,
  borderColor: modernTheme.fuel.border,
  iconComponent: modernTheme.fuel.iconComponent,
  cards: [
    createCard(
      "iocl-rbl",
      "IndianOil RBL Bank XTRA Credit Card",
      "RBL Bank",
      "₹1,500 + Taxes",
      "₹1,500 + Taxes",
      [
        "Highest fuel savings of 8.5% at IOCL pumps",
        "3,000 bonus Fuel Points as welcome benefit",
        "1,000 Fuel Points per quarter on ₹75,000 spends"
      ],
      "Highest value-backs across all fuel credit cards",
      4.7
    ),
    createCard(
      "bpcl-sbi-octane",
      "BPCL SBI Card Octane",
      "SBI",
      "₹1,499 + Taxes",
      "₹1,499 + Taxes",
      [
        "7.25% value back on fuel purchases at BPCL pumps",
        "6,000 bonus reward points as welcome benefit",
        "Instant reward redemption at select BPCL petrol pumps"
      ],
      "Benefits on other categories as well",
      4.6
    )
  ]
};

// Travel Cards Data
export const travelCards: CategoryData = {
  id: "best-travel",
  title: "Best Travel Credit Cards in India",
  description: "This list includes the best credit cards in India that would help you save more on your travel expenses in the form of air miles, complimentary memberships, co-branded benefits, and more.",
  color: modernTheme.travel.gradient,
  bgColor: modernTheme.travel.light,
  borderColor: modernTheme.travel.border,
  iconComponent: modernTheme.travel.iconComponent,
  cards: [
    createCard(
      "axis-atlas",
      "Axis Atlas Credit Card",
      "Axis Bank",
      "₹5,000 + Taxes",
      "₹5,000 + Taxes",
      [
        "Up to 12 international lounge access per year",
        "Redemption of EDGE Miles across 10+ airlines",
        "Up to 5 EDGE Miles per ₹100 spent on travel"
      ],
      "One of the most rewarding credit cards for Air Miles",
      4.8
    ),
    createCard(
      "hsbc-travelone",
      "HSBC TravelOne Credit Card",
      "HSBC",
      "₹4,999 + Taxes",
      "₹4,999 + Taxes",
      [
        "4 reward points per ₹100 spent on flights and travel",
        "Up to 15% discount on popular travel platforms",
        "6 complementary domestic lounge visits every year"
      ],
      "Airline-agnostic credit card designed for frequent travelers",
      4.7
    )
  ]
};

// Shopping Cards Data
export const shoppingCards: CategoryData = {
  id: "best-shopping",
  title: "Best Shopping Credit Cards in India",
  description: "Here are the top credit cards in India that offer substantial value on shopping across select brands as well as on general online spending, in the form of cashback.",
  color: modernTheme.shopping.gradient,
  bgColor: modernTheme.shopping.light,
  borderColor: modernTheme.shopping.border,
  iconComponent: modernTheme.shopping.iconComponent,
  cards: [
    createCard(
      "tata-neu-infinity",
      "Tata Neu Infinity HDFC Bank Credit Card",
      "HDFC Bank",
      "₹1,499 + Taxes",
      "₹1,499 + Taxes",
      [
        "Up to 10% value-back on Tata Neu spends",
        "5% back on partner Tata brands",
        "8 domestic and 4 international Priority Pass lounge access"
      ],
      "Covers multiple brands across different spending categories",
      4.7
    ),
    createCard(
      "axis-select",
      "Axis Bank SELECT Credit Card",
      "Axis Bank",
      "₹19,999",
      "₹19,999",
      [
        "Up to 20 EDGE Reward Points per ₹200 spent",
        "10,000 EDGE Reward Points welcome benefit",
        "Shopping rewards across multiple categories"
      ],
      "Excellent shopping benefits",
      4.6
    )
  ]
};

// Rewards Cards Data
export const rewardsCards: CategoryData = {
  id: "best-rewards",
  title: "Best Rewards Credit Cards in India",
  description: "Discover credit cards that offer exceptional reward points across multiple spending categories, perfect for those who want maximum value from every purchase.",
  color: modernTheme.rewards.gradient,
  bgColor: modernTheme.rewards.light,
  borderColor: modernTheme.rewards.border,
  iconComponent: modernTheme.rewards.iconComponent,
  cards: [
    createCard(
      "hdfc-regalia-gold",
      "HDFC Regalia Gold Credit Card",
      "HDFC Bank",
      "₹2,500 + Taxes",
      "₹2,500 + Taxes",
      [
        "20 reward points per ₹150 spent at Nykaa, Myntra, etc.",
        "Reward points on insurance and utility payments",
        "Complimentary Priority Pass Membership"
      ],
      "Accelerated rewards on popular brands",
      4.7
    )
  ]
};

// Premium Cards Data
export const premiumCards: CategoryData = {
  id: "best-premium",
  title: "Best Premium Credit Cards in India",
  description: "Experience luxury and exclusive benefits with these premium credit cards designed for high-net-worth individuals seeking superior rewards and privileges.",
  color: modernTheme.premium.gradient,
  bgColor: modernTheme.premium.light,
  borderColor: modernTheme.premium.border,
  iconComponent: modernTheme.premium.iconComponent,
  cards: [
    createCard(
      "hdfc-diners-black",
      "HDFC Diners Club Black Credit Card",
      "HDFC Bank",
      "₹10,000 + Taxes",
      "₹10,000 + Taxes",
      [
        "Up to 3.33% reward rate across multiple categories",
        "Unlimited complimentary international & domestic airport lounge access",
        "Complimentary membership of Amazon Prime, Club Marriott, etc."
      ],
      "One of the highest reward rates available",
      4.9
    )
  ]
};

// All categories array
export const allCategories = [
  cashbackCards,
  fuelCards,
  travelCards,
  shoppingCards,
  rewardsCards,
  premiumCards
];