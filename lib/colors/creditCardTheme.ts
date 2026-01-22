// lib/colors/creditCardTheme.ts

import { 
  DollarSign, 
  Fuel, 
  Plane, 
  ShoppingBag, 
  Award, 
  Crown 
} from "lucide-react";
import React from "react";

// Unified Modern Color Theme
export const modernTheme = {
  primary: {
    gradient: "from-teal-600 to-teal-700",
    light: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-600"
  },
  categories: {
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
  }
};

// Helper function to get category theme
export const getCategoryTheme = (categoryId: string) => {
  const category = modernTheme.categories[categoryId as keyof typeof modernTheme.categories];
  return category || modernTheme.categories.cashback;
};