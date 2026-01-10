import React from "react";

const ALL_PARTNERS = [
  { name: "SBI", logo: "/creditcard/image 1-2.png" },
  { name: "Kotak", logo: "/creditcard/image 1-3.png" },
  { name: "PNB", logo: "/creditcard/image 2-2.png" },
  { name: "HDFC", logo: "/creditcard/image 2.png" },
  { name: "HSBC", logo: "/creditcard/image 3-2.png" },
  { name: "Axis", logo: "/creditcard/image 3.png" },
  { name: "ICICI", logo: "/creditcard/image 4-2.png" },
  { name: "IDBI", logo: "/creditcard/image 4.png" },
  { name: "Bajaj", logo: "/creditcard/image 5.png" },
  { name: "Baroda", logo: "/creditcard/image 6-2.png" },
  { name: "UCO", logo: "/creditcard/image 6.png" },
  { name: "IndusInd", logo: "https://placehold.co/200x60/7f1d1d/white?text=IndusInd" },
  { name: "Yes Bank", logo: "https://placehold.co/200x60/2563eb/white?text=Yes+Bank" },
  { name: "Canara", logo: "https://placehold.co/200x60/f59e0b/white?text=Canara" },
];

export default function LoanPartners() {
  return (
    <section className="w-full py-4 md:py-12 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 36s linear infinite;
        }
        .marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 36s linear infinite;
        }
        .marquee-container:hover .marquee-left,
        .marquee-container:hover .marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-4 mb-6 text-center">
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900">
          Six Loans <span className="text-blue-600">Partners</span>
        </h2>
      </div>

      <div className="marquee-container relative flex flex-col gap-3 md:gap-5">
        <div className="absolute left-0 top-0 h-full w-14 md:w-20 bg-linear-to-r from-[#F5F7FA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-14 md:w-20 bg-linear-to-l from-[#F5F7FA] to-transparent z-10 pointer-events-none" />

        <div className="marquee-left">
          <div className="flex gap-2 md:gap-4 px-2">
            {ALL_PARTNERS.map((p, i) => (
              <PartnerCard key={`l1-${i}`} partner={p} />
            ))}
          </div>
          <div className="flex gap-2 md:gap-4 px-2">
            {ALL_PARTNERS.map((p, i) => (
              <PartnerCard key={`l2-${i}`} partner={p} />
            ))}
          </div>
        </div>

        <div className="marquee-right">
          <div className="flex gap-2 md:gap-4 px-2">
            {ALL_PARTNERS.map((p, i) => (
              <PartnerCard key={`r1-${i}`} partner={p} />
            ))}
          </div>
          <div className="flex gap-2 md:gap-4 px-2">
            {ALL_PARTNERS.map((p, i) => (
              <PartnerCard key={`r2-${i}`} partner={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PartnerCard = ({ partner }: { partner: { name: string; logo: string } }) => {
  return (
    <div className="flex h-9 w-22 md:h-13 md:w-34 shrink-0 items-center justify-center rounded-md bg-white p-1 md:p-2 border border-gray-200">
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
      />
    </div>
  );
};
