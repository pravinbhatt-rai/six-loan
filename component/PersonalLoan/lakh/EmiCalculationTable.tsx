import React from 'react';

const EmiCalculationTable = ({ pageId }: { pageId: string }) => {
  // Comprehensive Data Array
  const emiData = [
    {
      id: "5-lakh",
      title: "EMI Calculation for Rs. 5 Lakh Personal Loan",
      description: "Here's a sample EMI calculation for a loan of Rs. 5 lakh:",
      headers: ["Tenure", "11%", "13%", "15%"],
      rows: [
        { tenure: "1", rate1: "Rs. 44,191", rate2: "Rs. 44,658", rate3: "Rs. 45,129" },
        { tenure: "2", rate1: "Rs. 23,304", rate2: "Rs. 23,771", rate3: "Rs. 24,243" },
        { tenure: "3", rate1: "Rs. 16,369", rate2: "Rs. 16,847", rate3: "Rs. 17,332" },
        { tenure: "4", rate1: "Rs. 12,923", rate2: "Rs. 13,413", rate3: "Rs. 13,915" },
        { tenure: "5", rate1: "Rs. 10,871", rate2: "Rs. 11,376", rate3: "Rs. 11,895" },
        { tenure: "6", rate1: "Rs. 9,517", rate2: "Rs. 10,037", rate3: "Rs. 10,572" },
      ]
    },
    {
      id: "10-lakh",
      title: "EMI Calculation for Rs. 10 Lakh Personal Loan",
      description: "Here's a sample EMI calculation for a loan of Rs. 10 lakh:",
      headers: ["Tenure", "11%", "13%", "15%"],
      rows: [
        { tenure: "1", rate1: "Rs. 88,382", rate2: "Rs. 89,317", rate3: "Rs. 90,258" },
        { tenure: "2", rate1: "Rs. 46,608", rate2: "Rs. 47,542", rate3: "Rs. 48,487" },
        { tenure: "3", rate1: "Rs. 32,739", rate2: "Rs. 33,694", rate3: "Rs. 34,665" },
        { tenure: "4", rate1: "Rs. 25,846", rate2: "Rs. 26,827", rate3: "Rs. 27,831" },
        { tenure: "5", rate1: "Rs. 21,742", rate2: "Rs. 22,753", rate3: "Rs. 23,790" },
        { tenure: "6", rate1: "Rs. 19,034", rate2: "Rs. 20,074", rate3: "Rs. 21,145" },
      ]
    },
    {
      id: "20-lakh",
      title: "EMI Calculation for Rs. 20 Lakh Personal Loan",
      description: "Here's a sample EMI calculation for a loan of Rs. 20 lakh:",
      headers: ["Tenure", "11%", "13%", "15%"],
      rows: [
        { tenure: "1", rate1: "Rs. 1,76,764", rate2: "Rs. 1,78,634", rate3: "Rs. 1,80,516" },
        { tenure: "2", rate1: "Rs. 93,216", rate2: "Rs. 95,084", rate3: "Rs. 96,974" },
        { tenure: "3", rate1: "Rs. 65,478", rate2: "Rs. 67,388", rate3: "Rs. 69,330" },
        { tenure: "4", rate1: "Rs. 51,692", rate2: "Rs. 53,654", rate3: "Rs. 55,662" },
        { tenure: "5", rate1: "Rs. 43,484", rate2: "Rs. 45,506", rate3: "Rs. 47,580" },
        { tenure: "6", rate1: "Rs. 38,068", rate2: "Rs. 40,148", rate3: "Rs. 42,290" },
      ]
    },
    {
      id: "30-lakh",
      title: "EMI Calculation for Rs. 30 Lakh Personal Loan",
      description: "Here's a sample EMI calculation for a loan of Rs. 30 lakh:",
      headers: ["Tenure", "11%", "13%", "15%"],
      rows: [
        { tenure: "1", rate1: "Rs. 2,65,146", rate2: "Rs. 2,67,951", rate3: "Rs. 2,70,774" },
        { tenure: "2", rate1: "Rs. 1,39,824", rate2: "Rs. 1,42,626", rate3: "Rs. 1,45,461" },
        { tenure: "3", rate1: "Rs. 98,217", rate2: "Rs. 1,01,082", rate3: "Rs. 1,03,995" },
        { tenure: "4", rate1: "Rs. 77,538", rate2: "Rs. 80,481", rate3: "Rs. 83,493" },
        { tenure: "5", rate1: "Rs. 65,226", rate2: "Rs. 68,259", rate3: "Rs. 71,370" },
        { tenure: "6", rate1: "Rs. 57,102", rate2: "Rs. 60,222", rate3: "Rs. 63,435" },
      ]
    },
    {
      id: "40-lakh",
      title: "EMI Calculation for Rs. 40 Lakh Personal Loan",
      description: "Here's a sample EMI calculation for a loan of Rs. 40 lakh:",
      headers: ["Tenure", "11%", "13%", "15%"],
      rows: [
        { tenure: "1", rate1: "Rs. 3,53,528", rate2: "Rs. 3,57,268", rate3: "Rs. 3,61,032" },
        { tenure: "2", rate1: "Rs. 1,86,432", rate2: "Rs. 1,90,168", rate3: "Rs. 1,93,948" },
        { tenure: "3", rate1: "Rs. 1,30,956", rate2: "Rs. 1,34,776", rate3: "Rs. 1,38,660" },
        { tenure: "4", rate1: "Rs. 1,03,384", rate2: "Rs. 1,07,308", rate3: "Rs. 1,11,324" },
        { tenure: "5", rate1: "Rs. 86,968", rate2: "Rs. 91,012", rate3: "Rs. 95,160" },
        { tenure: "6", rate1: "Rs. 76,136", rate2: "Rs. 80,296", rate3: "Rs. 84,580" },
      ]
    },
    {
      id: "50-lakh",
      title: "EMI Calculation for Rs. 50 Lakh Personal Loan",
      description: "Here's a sample EMI calculation for a loan of Rs. 50 lakh:",
      headers: ["Tenure", "11%", "13%", "15%"],
      rows: [
        { tenure: "1", rate1: "Rs. 4,41,910", rate2: "Rs. 4,46,585", rate3: "Rs. 4,51,290" },
        { tenure: "2", rate1: "Rs. 2,33,040", rate2: "Rs. 2,37,710", rate3: "Rs. 2,42,435" },
        { tenure: "3", rate1: "Rs. 1,63,695", rate2: "Rs. 1,68,470", rate3: "Rs. 1,73,325" },
        { tenure: "4", rate1: "Rs. 1,29,230", rate2: "Rs. 1,34,135", rate3: "Rs. 1,39,155" },
        { tenure: "5", rate1: "Rs. 1,08,710", rate2: "Rs. 1,13,765", rate3: "Rs. 1,18,950" },
        { tenure: "6", rate1: "Rs. 95,170", rate2: "Rs. 1,00,370", rate3: "Rs. 1,05,725" },
      ]
    }
  ];

  // Logic to find the specific object
  const data = emiData.find((item) => item.id === pageId);

  // Return null if no matching ID is found
  if (!data) {
    return <div className="p-4 text-red-500">Error: No data found for ID "{pageId}"</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      {/* Title Section */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
        {data.title}
      </h2>
      <p className="mb-6 text-gray-700">
        {data.description}
      </p>

      {/* Table Section */}
      <div className="overflow-x-auto border border-teal-100 rounded-lg">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-teal-50 border-b border-teal-100">
              {data.headers.map((header, index) => (
                <th key={index} className="p-4 font-semibold text-gray-900">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-gray-700">{row.tenure}</td>
                <td className="p-4 text-gray-700">{row.rate1}</td>
                <td className="p-4 text-gray-700">{row.rate2}</td>
                <td className="p-4 text-gray-700">{row.rate3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Disclaimer */}
      <div className="mt-6 text-gray-700 text-sm md:text-base">
        Use an <a href="#" className="text-teal-600 font-medium hover:underline">online personal loan EMI calculator</a> to plan better.
      </div>
    </div>
  );
};

export default EmiCalculationTable;