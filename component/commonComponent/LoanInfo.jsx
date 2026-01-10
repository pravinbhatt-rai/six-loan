"use client";
import React from "react";
import {
  Info,
  Banknote,
  Calendar,
  CheckCircle,
  Home,
  Briefcase,
  Zap,
  GraduationCap,
  ArrowRightLeft,
  Building,
  BookOpen,
  CarFront,
  PieChart,
  Car,
  Bike,
} from "lucide-react";
import { loanData } from "@/public/jsonData/loanInfo/loanInfoJson";

// 1. Icon Mapping
const iconMap = {
  Info,
  Banknote,
  Calendar,
  CheckCircle,
  Home,
  Briefcase,
  Zap,
  GraduationCap,
  ArrowRightLeft,
  Building,
  BookOpen,
  CarFront,
  PieChart,
  Car,
  Bike,
};

// 2. Color Mapping
const colorMap = {
  teal: {
    bg: "bg-teal-50",
    icon: "text-teal-600",
    border: "border-teal-100",
  },
  blue: {
    // Added example blue to replace duplicate teal if needed
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "border-blue-100",
  },
  default: {
    bg: "bg-gray-50",
    icon: "text-gray-600",
    border: "border-gray-100",
  },
};

const InfoCard = ({ loanId }) => {
  const data = loanData.find((item) => item.id === loanId);

  if (!data) {
    console.warn(`InfoCard: No data found for loanId: "${loanId}"`);
    return null;
  }

  // Helper to resolve Icons
  const MainIcon = iconMap[data.icon] || Info;
  const DefIcon = iconMap[data.sections.definition.icon] || Banknote;
  const RepayIcon = iconMap[data.sections.repayment.icon] || Calendar;
  const EligIcon = iconMap[data.sections.eligibility.icon] || CheckCircle;

  // Helper to resolve Colors
  const theme = colorMap[data.themeColor] || colorMap.default;

  return (
    // UPDATED CONTAINER CLASSES:
    // 1. border-0 for mobile, md:border for desktop
    // 2. shadow-none for mobile, md:shadow-md for desktop
    // 3. rounded-none for mobile, md:rounded-xl for desktop
    <div
      className="max-w-6xl mx-auto mb-8 bg-white text-gray-800
      font-serif
      border-0 md:border md:border-gray-200
      rounded-none md:rounded-3xl
      shadow-none md:shadow-sm
    "
    >
      {/* UPDATED PADDING: p-4 for mobile, p-8 for desktop */}
      <div className="p-4 md:p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 rounded-lg ${theme.bg}`}>
            <MainIcon className={`w-6 h-6 ${theme.icon}`} />
          </div>
          {/* Adjusted text size for mobile */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {data.title}
          </h2>
        </div>

        {/* Content Section */}
        <div className="space-y-6 text-gray-600 leading-relaxed">
          {/* Definition */}
          {/* Added items-start ensures icon stays at top if text wraps */}
          <div className="flex items-start gap-4">
            <DefIcon className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <div
              dangerouslySetInnerHTML={{
                __html: data.sections.definition.content,
              }}
            />
          </div>

          {/* Repayment */}
          <div className="flex items-start gap-4">
            <RepayIcon className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <div
              dangerouslySetInnerHTML={{
                __html: data.sections.repayment.content,
              }}
            />
          </div>

          {/* Eligibility */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-start gap-4">
              <EligIcon className="w-5 h-5 text-green-500 shrink-0 mt-1" />
              <div className="w-full">
                <p className="mb-2 font-medium text-gray-900">
                  {data.sections.eligibility.title}
                </p>
                <ul className="list-disc list-inside space-y-1 ml-1 text-sm text-gray-700">
                  {data.sections.eligibility.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm italic text-gray-500">
                  {data.sections.eligibility.footerNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
