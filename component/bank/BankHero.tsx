import React from 'react';

const BankHero: React.FC = () => {
  return (
    <section className="relative w-full bg-white px-6 py-12 md:px-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
        
        {/* Left Side: Isometric Illustration */}
        <div className="flex w-full justify-center lg:w-1/2">
          <div className="relative max-w-[500px]">
            {/* Note: Replace the src with your actual image path. 
               The 'drop-shadow' adds that clean floating look.
            */}
            <img 
              src="/bank.png" 
              alt="Isometric Bank Illustration" 
              
            />
          </div>
        </div>

        {/* Right Side: Content Block */}
        <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-end lg:text-right">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Smart Net Banking. <br />
            <span className="text-gray-800">Smarter Savings</span>
          </h1>
          
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600">
            SIX Finance is a platform that helps you save more on every online 
            payment using the best net banking offers available. From shopping 
            discounts and bill payment cashback to government and education 
            fee benefits, SIX finds the right bank option for you instantly. 
            Just enter where you’re paying and the amount.
          </p>

          <button 
            className="rounded-lg bg-[#666666] px-8 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95"
          >
            Know More
          </button>
        </div>

      </div>
    </section>
  );
};

export default BankHero;