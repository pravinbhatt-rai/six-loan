'use client';
import React from 'react';
import { Headset, Lock } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-start h-full">
      {/* Icon Container */}
      <div className="bg-blue-50 p-2.5 rounded-lg mb-6 text-gray-800">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-black mb-4">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-500 leading-relaxed text-base">
        {description}
      </p>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Headset size={24} strokeWidth={1.5} />,
      title: "Flexible",
      description: "Our loan options are designed to adapt to your financial situation. Choose flexible repayment terms and loan amounts that work for you."
    },
    {
      icon: <Headset size={24} strokeWidth={1.5} />,
      title: "Simple, Fast, and Secure",
      description: "Get instant credit score updates and apply for loans with confidence. We ensure a smooth, secure, and reliable experience."
    },
    {
      icon: <Lock size={24} strokeWidth={1.5} />, // Using Lock icon for 'Personalized' based on context (though image shows lock, text implies security elsewhere, sticking to visual cue)
      title: "Personalized",
      description: "Loans designed to match your unique financial needs. Enjoy flexible options, fast approvals, and a borrowing experience tailored just for you."
    }
  ];

  return (
    <section className="w-full py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-black mb-6">
            Why Do your Choose Us?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Flexible loans, instant credit score checks, and fast approvals. We make borrowing easy, transparent, and tailored to your needs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;