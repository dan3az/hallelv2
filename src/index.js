import React, { useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import Hero from "./Components/Hero";
import HotelCard from "./Components/HotelCard";
import ContactForm from "./Components/ContactForm";
import Footer from "./Components/Footer";
import WhatsAppButton from "./Components/WhatsAppButton";
import Testimonials from "./Components/Testimonials";
import MainHotel from "./Components/MainHotel";
import fetchHotels from "./hotels";
import CompanyStats from "./Components/CompanyStats";
import WhatsAppGroups from "./Components/WhatsAppGroups";
import AccessibilityWidget from "./Components/AccessibilityWidget";

export default function App() {
  const [mainHotel, setMainHotel] = useState(null);
  const [otherHotels, setOtherHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const contactRef = useRef(null);
  const hotelsRef = useRef(null);

  const handleHotelSelect = (hotelId) => {
    setSelectedHotel(hotelId);
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

useEffect(() => {
  fetchHotels()
    .then((data) => {
      console.log("הנתונים שהתקבלו מהשרת:", data);

      const main = data.find(h => h.isMainEvent);
      const others = data.filter(h => h !== main);

      console.log("אירוע מרכזי:", main);
      console.log("שאר האירועים:", others);

      setMainHotel(main);
      setOtherHotels(others);
    })
    .catch(err => console.error("שגיאה בטעינת המלונות:", err));

    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&family=Rubik:wght@400;500;600;700&display=swap');
      
      :root {
        --font-heading: 'Assistant', sans-serif;
        --font-body: 'Rubik', sans-serif;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
      }
      
      body {
        font-family: var(--font-body);
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode === document.head) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      <Hero 
        scrollToContact={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
        scrollToHotels={() => hotelsRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

   <div className="bg-white py-12 px-6 text-center">
  <h2 className="text-3xl font-bold text-blue-900 mb-4">אודותינו</h2>
  <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
    ב־<span className="font-semibold text-blue-800">הללויה</span> אנחנו יוצרים חיבורים של לבבות. אנו מתמחים בהפקת <strong>שבתות חתן, סופי שבוע ואירועים</strong> לקהל הדתי, עם דגש על אווירה חמה, תכנים מעוררי השראה, ולוגיסטיקה מוקפדת עד הפרט האחרון. מעבר להפקה – אנחנו רואים את עצמנו כשליחים של חיבורים אמיתיים בין אנשים. רבים מהמשתתפים שלנו יוצאים מהאירועים עם קשרים חדשים – חברויות, שידוכים, ואפילו אהבות שנרקמות.
    <br /><br />
    אנו שמים דגש על <strong>קהילתיות, איכות, והזדמנויות להיכרות באווירה מכובדת ומותאמת לערכים שלנו</strong>. השאיפה שלנו היא שכל אורח יצא עם חוויה בלתי נשכחת – ולעיתים גם עם התחלה של פרק חדש בחיים.
  </p>
</div>

      {/* הצגת האירוע המרכזי */}
      <MainHotel hotel={mainHotel} />

      {/* רשימת שאר המלונות */}
      <section ref={hotelsRef} id="hotels" className="py-12 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">
            המלונות שלנו לסופש הקרוב
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherHotels.map((hotel) => (
              <HotelCard 
                key={hotel.id}
                hotel={hotel}
                onBookClick={handleHotelSelect}
              />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <WhatsAppGroups />
      <ContactForm 
        contactRef={contactRef}
        hotels={otherHotels}
        selectedHotel={selectedHotel}
        onHotelSelect={setSelectedHotel}
      />
      <Footer />
      <WhatsAppButton selectedHotel={selectedHotel} hotels={otherHotels} />
      <AccessibilityWidget />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
