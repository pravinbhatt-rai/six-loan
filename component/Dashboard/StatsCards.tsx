import React from 'react';
import { Users, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface StatsProps {
  stats: {
    totalUsers: number;
    totalLoans: number;
    totalCreditCards: number;
    totalApplications: number;
    userTrend?: string;
    appTrend?: string;
  }
}

const StatsCards: React.FC<StatsProps> = ({ stats }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
      trend: stats.userTrend ? `${stats.userTrend} from last month` : "Loading...",
      link:"/dashboard/users"
    },
    {
      title: "Active Loans",
      value: stats.totalLoans,
      icon: DollarSign,
      color: "bg-green-500",
      trend: "Updated just now",
      link:"/dashboard/loans"
    },
    {
      title: "Credit Cards",
      value: stats.totalCreditCards,
      icon: CreditCard,
      color: "bg-purple-500",
      trend: "Updated just now",
      link:"/dashboard/credit-cards"
    },
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: TrendingUp,
      color: "bg-orange-500",
      trend: stats.appTrend ? `${stats.appTrend} from last month` : "Loading...",
      link:"/dashboard/applications"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <Link href={card.link} >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${card.color} bg-opacity-10`}>
              <card.icon size={20} className={card.color.replace('bg-', 'text-')} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-green-500">
            <TrendingUp size={14} className="mr-1" />
            <span>{card.trend}</span>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
