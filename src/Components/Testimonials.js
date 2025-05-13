import React, { useState, useEffect } from "react";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDisplayCount(3);
      } else if (window.innerWidth >= 768) {
        setDisplayCount(2);
      } else {
        setDisplayCount(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "שרון כהן",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "נהנינו מאוד מהחופשה שלנו במלון אקוודוקט. השירות היה מעולה והכל היה מאורגן בצורה מושלמת. בהחלט נחזור גם בפעם הבאה!"
    },
    {
      id: 2,
      name: "אבי לוי",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 4,
      text: "חופשה מושלמת למשפחה. הילדים נהנו מהבריכה ומהפעילויות, ואנחנו נהנינו מהשקט והשלווה. מומלץ בחום!"
    },
    {
      id: 3,
      name: "מיכל ברנר",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "הזמנו חופשה עם יומיים התראה והכל היה מוכן בצורה מושלמת. השירות של דניאל היה יוצא מן הכלל. ממליצה בחום!"
    },
    {
      id: 4,
      name: "דוד אברהם",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "הנוף מהחדר היה מדהים והאוכל היה מצוין. המחירים הוגנים ומשתלמים מאוד למשפחות. נחזור בהחלט!"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % (testimonials.length - displayCount + 1)
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - displayCount : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">
          הלקוחות שלנו מספרים
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${activeIndex * 100 / displayCount}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className={`w-full shrink-0 px-4`}
                  style={{ flex: `0 0 ${100 / displayCount}%` }}
                >
                  <div className="bg-blue-50 p-6 rounded-xl shadow-sm h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mr-4">
                        <h3 className="font-bold text-lg">{testimonial.name}</h3>
                        <div className="flex items-center gap-1">
                          {renderStars(testimonial.rating)}
                          <span className="text-gray-600 text-sm mr-1">{testimonial.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 flex-grow">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handlePrev}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white text-blue-700 rounded-full h-10 w-10 shadow-md p-0"
            size="icon"
            variant="outline"
            disabled={activeIndex === 0}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button 
            onClick={handleNext}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white text-blue-700 rounded-full h-10 w-10 shadow-md p-0"
            size="icon"
            variant="outline"
            disabled={activeIndex === testimonials.length - displayCount}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}