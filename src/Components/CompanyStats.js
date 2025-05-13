import React from "react";
import { BriefcaseBusiness, Hotel, Heart } from "lucide-react";

export default function CompanyStats() {
  const stats = [
    {
      id: 1,
      icon: BriefcaseBusiness,
      value: "+91",
      label: "משפחות וקבוצות שהצלחנו להתאים למלון המושלם",
    },
    {
      id: 2,
      icon: Hotel,
      value: "+60",
      label: "מלונות שותפים ברחבי הארץ",
    },
    {
      id: 3,
      icon: Heart,
      value: "אלפי",
      label: "לקוחות מרוצים",
    },
  ];

  return (
    <section className="py-10 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center">
              <stat.icon className="w-12 h-12 mb-3 text-yellow-300" />
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}