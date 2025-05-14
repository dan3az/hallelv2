import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ShareButtons from "./ShareButtons";
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
// ודא שאתה מייבא את Skeleton אם אתה משתמש בו
// import Skeleton from "react-loading-skeleton";

const MainHotel = ({ hotel, isLoading, onBookClick }) => {
  const hotelMedia = [
    {
      type: "video",
      src: "https://haifacp.co.il/content/dam/mano/hotels/mirabelle/homepage/Crowne%20Haifa%20v3.mp4"
    },
    {
      type: "image",
      src: "https://haifacp.co.il/content/dam/mano/hotels/mirabelle/srvices/WhatsApp%20Image%202025-03-07%20at%2009.07.21.jpeg"
    },
    {
      type: "image",
      src: "https://haifacp.co.il/content/dam/mano/hotels/mirabelle/srvices/%D7%9E%D7%91%D7%A6%D7%A2%20%D7%90%D7%A8%D7%95%D7%97%D7%AA%20%D7%A2%D7%A8%D7%91%20%D7%91%D7%9E%D7%AA%D7%A0%D7%94%20%D7%9C%D7%99%D7%95%D7%9D%20%D7%A9%D7%99%D7%A9%D7%99.jpg"
    }
  ];
const featureIcons = [
  { key: "pool", icon: Waves, label: "בריכת שחייה" },
  { key: "parking", icon: Car, label: "חניה במלון" },
  { key: "synagogue", icon: Building, label: "בית כנסת" },
  { key: "balcony", icon: Sun, label: "מרפסת" },
  { key: "breakfast", icon: Coffee, label: "ארוחת בוקר כלולה" },
  { key: "cleaning", icon: Sparkles, label: "ניקיון יומי" },
  { key: "comfyBeds", icon: Bed, label: "מיטות נוחות במיוחד" }
];
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
  let timer;

  if (hotelMedia[activeSlide].type === "video") {
    // פשוט טען את הוידאו - לא צריך observer
    setVideoLoaded(true);
  } else {
    // עבור תמונות - העבר אוטומטית לשקופית הבאה
    timer = setTimeout(() => {
      setActiveSlide(prev => (prev + 1) % hotelMedia.length);
    }, 6000);
  }

  return () => clearTimeout(timer);
}, [activeSlide]);

  const handlePrev = () => {
    setActiveSlide(prev => (prev - 1 + hotelMedia.length) % hotelMedia.length);
    setVideoLoaded(false);
  };

  const handleNext = () => {
    setActiveSlide(prev => (prev + 1) % hotelMedia.length);
    setVideoLoaded(false);
  };
function formatDateRange(start, end) {
  if (!start || !end) return "";

  const [startDay, startMonth, startYear] = start.split("-"); // dd-mm-yyyy
  const [endDay, endMonth, endYear] = end.split("-");

  return `${endYear}/${endMonth}/${endDay} - ${startYear}/${startMonth}/${startDay}`;
}
  

  // תנאי ראשון – עדיין טוען => הצג שלד
  if (isLoading) {
    return (
      <section className="w-full px-4 py-8">
        <div className="max-w-screen-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">האירוע המרכזי</h2>
          <Skeleton height={400} />
          <div className="mt-6 text-right space-y-2">
            <Skeleton height={30} width="50%" />
            <Skeleton height={20} width="30%" />
            <Skeleton height={20} width="40%" />
            <Skeleton height={20} width="60%" />
            <Skeleton height={20} width="35%" />
            <Skeleton height={40} width="25%" />
          </div>
        </div>
      </section>
    );
  }

  // תנאי שני – לא טוען אבל גם אין מלון תקף
  if (!hotel || Object.keys(hotel).length === 0) {
    return null;
  }

  // תצוגת קומפוננטת המלון
  return (
    <section className="w-full px-4 py-8">
      <div className="max-w-screen-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">האירוע המרכזי</h2>

        {/* קרוסלה */}
        <div className="relative h-[60vh] lg:h-screen overflow-hidden">
            <ShareButtons hotel={hotel} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F5F1] via-transparent to-transparent z-10 lg:block hidden"></div>
<div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#F8F5F1]/50 via-transparent to-transparent z-10 lg:hidden block"></div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-3 z-20 shadow-md"
            aria-label="הקודם"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-3 z-20 shadow-md"
            aria-label="הבא"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          {hotelMedia.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.type === "video" ? (
 <video
  id={`video-${index}`}
  src={item.src}
  className="w-full h-full object-cover sm:object-cover object-contain"
  autoPlay
  muted
  loop
  playsInline
/>
              ) : (
                <img
                  src={item.src}
                  alt={`מדיה ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}

          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            {hotelMedia.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeSlide ? "bg-white w-6" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
 
        {/* פרטי המלון */}
        <div className="p-6 text-right">
          <h3 className="text-2xl font-bold mb-2">{hotel.title}</h3>
       {hotel.startDate && hotel.endDate && (
  <div className="text-sm text-gray-700 mt-2">
    <div className="inline-flex items-center">
      <Calendar className="w-5 h-5 ml-2 text-blue-500" /> 
      {formatDateRange(hotel.startDate, hotel.endDate)}
    </div>

    {/* ירידת שורה בין תאריכים לפרשה */}
    <br />

    <div className="inline-flex items-center mt-1">
      <Book className="w-5 h-5 ml-2 text-blue-500" /> 
      פרשת "{hotel.parasha}"
    </div>
  </div>
)}

          {hotel.halfBoard && <p className="mb-1">🍽️ חצי פנסיון</p>}
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
          <button
            onClick={() => onBookClick(hotel.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            לפרטים והזמנה
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainHotel;
