import React from "react";

export default async function InsuranceCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let insurances = [];
  let categoryName = slug;

  try {
    const res = await fetch(`/api/insurance/by-category/${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      categoryName = data.category.name;
      insurances = data.category.insurances;
    }
  } catch (error) {
    console.error("Failed to fetch insurance", error);
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{categoryName} Insurance</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insurances.map((ins: any) => (
            <div key={ins.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                {ins.logoUrl && <img src={ins.logoUrl} alt={ins.provider} className="w-12 h-12 object-contain" />}
                <div>
                  <h3 className="font-bold text-lg">{ins.name}</h3>
                  <p className="text-sm text-gray-500">{ins.provider}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{ins.description}</p>
              <div className="flex justify-between items-center">
                <div>
                   <p className="text-xs text-gray-500">Coverage</p>
                   <p className="font-semibold">{ins.coverage || 'N/A'}</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
          {insurances.length === 0 && <p>No insurance products found in this category.</p>}
        </div>
      </div>
    </div>
  );
}
