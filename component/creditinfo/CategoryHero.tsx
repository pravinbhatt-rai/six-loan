"use client";
import React from "react";
import { CreditCard, Gift, Plane, Coffee, Shield, Globe, DollarSign, Lock, Zap } from "lucide-react";

interface CategoryHeroProps {
  category: string;
  title: string;
  description: string;
  benefits: string[];
  icon?: React.ReactNode;
  gradient?: string;
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  cashback: <DollarSign className="w-12 h-12 text-teal-600" />,
  rewards: <Gift className="w-12 h-12 text-purple-600" />,
  lounge: <Plane className="w-12 h-12 text-blue-600" />,
  onecard: <Zap className="w-12 h-12 text-orange-600" />,
  fuel: <Coffee className="w-12 h-12 text-amber-600" />,
  travel: <Globe className="w-12 h-12 text-indigo-600" />,
  international: <Globe className="w-12 h-12 text-cyan-600" />,
  forex: <DollarSign className="w-12 h-12 text-green-600" />,
  secured: <Shield className="w-12 h-12 text-emerald-600" />,
};

const categoryGradients: { [key: string]: string } = {
  cashback: "from-teal-50 via-emerald-50 to-white",
  rewards: "from-purple-50 via-pink-50 to-white",
  lounge: "from-blue-50 via-sky-50 to-white",
  onecard: "from-orange-50 via-amber-50 to-white",
  fuel: "from-amber-50 via-yellow-50 to-white",
  travel: "from-indigo-50 via-blue-50 to-white",
  international: "from-cyan-50 via-teal-50 to-white",
  forex: "from-green-50 via-emerald-50 to-white",
  secured: "from-emerald-50 via-teal-50 to-white",
};

export default function CategoryHero({ category, title, description, benefits, icon, gradient }: CategoryHeroProps) {
  const defaultIcon = categoryIcons[category.toLowerCase()] || <CreditCard className="w-12 h-12 text-teal-600" />;
  const defaultGradient = categoryGradients[category.toLowerCase()] || "from-teal-50 via-blue-50 to-white";

  return (
    <div className={`relative bg-gradient-to-br ${gradient || defaultGradient} py-12 md:py-16 lg:py-20 overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Icon */}
          <div className="shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              {icon || defaultIcon}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl">
              {description}
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 text-sm md:text-base font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  ✓ {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
