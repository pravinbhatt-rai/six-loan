export type RecommendedType = "top" | "best" | null;

export type CardRecord = {
  id: string;
  name: string;
  image: string;
  bullets: string[];
  bank: string;
  category?: string; // Single category field from database
  categories: string[]; // e.g., Cashback, Online Shopping, Travel, Utilities
  fee: "Lifetime free" | "1st year free only";
  cardType: "UPI Rupay" | "Visa/Mastercard";
  effectiveFree?: boolean; // for Trending: Effective Free Card
  recommended: RecommendedType;
  slug?: string; // URL slug for the card
  firstYearFee?: number | null;
  secondYearFee?: number | null;
  rating?: number; // Star rating (0-5)
};

export const CARDS: CardRecord[] = [
  {
    id: "sbm-zet-top",
    name: "SBM ZET Credit Card",
    image: "/creditcard/image 666.png",
    bullets: [
      "20% off on Swiggy, Zomato and BMS",
      "5% cashback on Amazon and Flipkart",
      "Lifetime Free",
      "4 Domestic Lounge Access",
    ],
    bank: "SBI",
    categories: ["Cashback", "Online Shopping"],
    fee: "Lifetime free",
    cardType: "Visa/Mastercard",
    effectiveFree: true,
    recommended: "top",
  },
  {
    id: "axis-best",
    name: "Axis Neo Credit Card",
    image: "/creditcard/image 666.png",
    bullets: [
      "Extra cashback on online shopping",
      "Welcome benefits",
      "1st year free",
      "Fuel surcharge waiver",
    ],
    bank: "Axis Bank",
    categories: ["Online Shopping"],
    fee: "1st year free only",
    cardType: "Visa/Mastercard",
    effectiveFree: false,
    recommended: "best",
  },
  {
    id: "hdfc-best",
    name: "HDFC Millennia Credit Card",
    image: "/creditcard/image 666.png",
    bullets: [
      "5% cashback on Amazon & Flipkart",
      "Dining & movies discounts",
      "Lifetime free",
      "Domestic lounge access",
    ],
    bank: "HDFC Bank",
    categories: ["Cashback", "Online Shopping"],
    fee: "Lifetime free",
    cardType: "Visa/Mastercard",
    effectiveFree: true,
    recommended: "best",
  },
  {
    id: "icici-travel",
    name: "ICICI Coral Credit Card",
    image: "/creditcard/image 666.png",
    bullets: ["Travel benefits", "Movie BOGO", "Dining offers", "Reward points"],
    bank: "ICICI Bank",
    categories: ["Travel", "Utilities"],
    fee: "1st year free only",
    cardType: "Visa/Mastercard",
    effectiveFree: false,
    recommended: null,
  },
  {
    id: "kotak-upi",
    name: "Kotak UPI Rupay Card",
    image: "/creditcard/image 666.png",
    bullets: ["UPI linked", "Fuel surcharge waiver", "Bill payments", "Cashback"],
    bank: "Kotak",
    categories: ["Utilities", "Cashback"],
    fee: "Lifetime free",
    cardType: "UPI Rupay",
    effectiveFree: true,
    recommended: null,
  },
  {
    id: "pnb-shop",
    name: "PNB Shopping Card",
    image: "/creditcard/image 666.png",
    bullets: ["Online deals", "Reward points", "Partner offers", "Dining perks"],
    bank: "PNB",
    categories: ["Online Shopping"],
    fee: "1st year free only",
    cardType: "Visa/Mastercard",
    effectiveFree: false,
    recommended: null,
  },
];
