"use client";
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface DashboardChartsProps {
  data?: any[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  const chartData = data || [
    { name: 'Jan', loans: 4000, cards: 2400, amt: 2400 },
    { name: 'Feb', loans: 3000, cards: 1398, amt: 2210 },
    { name: 'Mar', loans: 2000, cards: 9800, amt: 2290 },
    { name: 'Apr', loans: 2780, cards: 3908, amt: 2000 },
    { name: 'May', loans: 1890, cards: 4800, amt: 2181 },
    { name: 'Jun', loans: 2390, cards: 3800, amt: 2500 },
    { name: 'Jul', loans: 3490, cards: 4300, amt: 2100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Application Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCards" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip />
              <Area type="monotone" dataKey="loans" stroke="#3B82F6" fillOpacity={1} fill="url(#colorLoans)" />
              <Area type="monotone" dataKey="cards" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorCards)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="loans" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cards" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
