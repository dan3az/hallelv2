import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MainHotel = ({ hotel ,onBookClick}) => {
  if (!hotel) return null;

  // מערך מדיה: וידאו ראשון, תמונות אחר כך
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

    if (hotelMedia[activeSlide].type === "video" && !videoLoaded) {
      // Lazy Load: נחכה שהוידאו ייכנס לתצוגה לפני שנטען אותו
      const videoElement = document.querySelector(`#video-${activeSlide}`);
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !videoLoaded) {
            setVideoLoaded(true); // נטען את הסרטון כאשר הוא בתצוגה
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });

      if (videoElement) {
        observer.observe(videoElement);
      }

      return () => observer.disconnect();
    } else if (hotelMedia[activeSlide].type === "image") {
      // תמונה – נעבור אוטומטית אחרי 6 שניות
      timer = setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % hotelMedia.length);
      }, 6000);
    }

    return () => clearTimeout(timer);
  }, [activeSlide, videoLoaded]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + hotelMedia.length) % hotelMedia.length);
    setVideoLoaded(false); // Reset for lazy loading
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % hotelMedia.length);
    setVideoLoaded(false); // Reset for lazy loading
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
    <section className="w-full px-4 py-8">
      <div className="max-w-screen-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">האירוע המרכזי</h2>

        {/* קרוסלה עם וידאו ותמונות */}
        <div className="relative h-[60vh] lg:h-screen overflow-hidden">
          {/* שכבות הצללה */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F5F1] via-transparent to-transparent z-10 lg:block hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5F1] via-transparent to-transparent z-10 lg:hidden block"></div>

          {/* כפתורים */}
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

          {/* שקפים */}
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
                  src={videoLoaded ? item.src : ""}
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

          {/* נקודות ניווט */}
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            
            לפרטים והזמנה
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainHotel;
