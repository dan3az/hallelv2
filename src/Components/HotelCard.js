// src/components/HotelCard.jsx

import React from "react";
import {
  Coins,
  Calendar,
  Book,
  Waves,
  Car,
  Building,
  Sun,
  Coffee,
  Sparkles,
  Bed
} from "lucide-react";
import ShareButtons from "./ShareButtons";

// פונקציה לעיצוב טווח תאריכים
function formatDateRange(start, end) {
  if (!start || !end) return "";

  const [startDay, startMonth, startYear] = start.split("-"); // dd-mm-yyyy
  const [endDay, endMonth, endYear] = end.split("-");

  return `${endYear}/${endMonth}/${endDay} - ${startYear}/${startMonth}/${startDay}`;
}

// מיפוי של הפיצ'רים לאייקונים
const featureIcons = [
  { key: "pool", icon: Waves, label: "בריכת שחייה" },
  { key: "parking", icon: Car, label: "חניה במלון" },
  { key: "synagogue", icon: Building, label: "בית כנסת" },
  { key: "balcony", icon: Sun, label: "מרפסת" },
  { key: "breakfast", icon: Coffee, label: "ארוחת בוקר כלולה" },
  { key: "cleaning", icon: Sparkles, label: "ניקיון יומי" },
  { key: "comfyBeds", icon: Bed, label: "מיטות נוחות במיוחד" }
];

export default function HotelCard({ hotel, onBookClick }) {
  return (
    <div className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer border rounded-lg flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.title} 
          className="w-full h-full object-cover"
        />

        {/* תוויות */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          {hotel.lastRooms && (
            <div className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
              חדרים אחרונים
            </div>
          )}
          {hotel.bestValue && (
            <div className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
              הכי משתלם
            </div>
          )}
          {hotel.mostPopular && (
            <div className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
              הנמכר ביותר
            </div>
          )}
        </div>

        <ShareButtons hotel={hotel} />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white">{hotel.title}</h3>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
            <Coins className="w-5 h-5" />
            <span>החל מ-₪{hotel.minPrice}</span>
          </div>

          {hotel.halfBoard && (
            <div className="text-sm text-green-700 font-semibold">
              כולל חצי פנסיון 🍽️
            </div>
          )}

          {/* תאריכים ופרשה */}
          {hotel.startDate && hotel.endDate && (
            <div className="text-sm text-gray-700 mt-2">
              <div className="inline-flex items-center">
                <Calendar className="w-5 h-5 ml-2 text-blue-500" /> 
                {formatDateRange(hotel.startDate, hotel.endDate)}
              </div>
              <div className="inline-flex items-center mt-1">
                <Book className="w-5 h-5 ml-2 text-blue-500" /> 
                פרשת "{hotel.parasha}"
              </div>
            </div>
          )}

          {/* תצוגת פיצ'רים */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {featureIcons.map(({ key, icon: Icon, label }) =>
              hotel.features?.includes(key) ? (
                <div key={key} className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon className="w-4 h-4 text-blue-500" />
                  <span>{label}</span>
                </div>
              ) : null
            )}
          </div>
        </div>

        <button 
          onClick={() => onBookClick(hotel.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4"
        >
          לפרטים והזמנה
        </button>
      </div>
    </div>
  );
}
