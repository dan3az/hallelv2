import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

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
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F5F1] via-transparent to-transparent z-10 lg:block hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5F1] via-transparent to-transparent z-10 lg:hidden block"></div>

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
  className="w-full h-full object-cover"
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
          <p className="mb-1">📅 תאריכים: {formatDate(hotel.startDate)} - {formatDate(hotel.endDate)}</p>
          <p className="mb-1">📖 פרשת השבוע: {hotel.parasha}</p>
          <p className="mb-1">💰 מחיר: החל מ-{hotel.minPrice}₪</p>
          {hotel.halfBoard && <p className="mb-1">🍽️ חצי פנסיון</p>}
          <p className="mb-1">
            {hotel.features.includes("pool") && "🏊‍♂️ בריכה "}
            {hotel.features.includes("synagogue") && "🕍 בית כנסת "}
            {hotel.features.includes("cleaning") && "🧼 ניקיון "}
            {hotel.features.includes("balcony") && "🌅 מרפסת "}
            {hotel.features.includes("comfyBeds") && "🛏️ מיטות נוחות "}
            {hotel.features.includes("breakfast") && "🍳 ארוחת בוקר "}
            {hotel.features.includes("parking") && "🅿️ חניה "}
          </p>
          <p className="mb-4">🏖️ נופש כשר ומותאם למשפחות ולציבור הדתי</p>
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
