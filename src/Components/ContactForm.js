import React, { useState, useEffect } from "react";
import { User, Phone, Mail, Building } from "lucide-react";

export default function ContactForm({ contactRef, hotels, selectedHotel, onHotelSelect }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    hotel: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

useEffect(() => {
  if (selectedHotel) {
    const selected = hotels.find((hotel) => hotel.id === selectedHotel);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        hotel: selected,
      }));
    }
  }
}, [selectedHotel, hotels]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleHotelChange = (hotelId) => {
  const selected = hotels.find((hotel) => hotel.id === hotelId);
  setFormData((prev) => ({
    ...prev,
    hotel: selected || "",
  }));
  onHotelSelect(hotelId);
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const payload = {
    ...formData,
    hotel: formData.hotel || null, // אובייקט מלא
  };

  try {
    const response = await fetch('https://hook.eu2.make.com/3sncfmuct8l6mlw6zcej3f4yxpr2qdln', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    setIsSubmitted(true);
    setFormData({ name: "", phone: "", email: "", hotel: "" });
    onHotelSelect("");

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section ref={contactRef} id="contact" className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-5 text-white">
            <h2 className="text-2xl font-bold">השאירו פרטים ונחזור אליכם</h2>
            <p className="mt-2 opacity-90">נשמח לענות על כל שאלה ולספק מידע נוסף</p>
          </div>

          <div className="p-6">
            {isSubmitted ? (
              <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg">
                <svg className="w-5 h-5 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p>תודה! ניצור איתכם קשר בקרוב</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2 md:col-span-1">
                  <label htmlFor="name" className="text-blue-900 font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    שם מלא
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="שם מלא"
                    required
                    className="w-full p-3 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-1">
                  <label htmlFor="phone" className="text-blue-900 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    טלפון
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="מספר טלפון"
                    required
                    className="w-full p-3 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-1">
                  <label htmlFor="email" className="text-blue-900 font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    אימייל
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="כתובת אימייל"
                    required
                    className="w-full p-3 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-1">
                  <label htmlFor="hotel" className="text-blue-900 font-medium flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    באיזה מלון אתם מעוניינים?
                  </label>
                 <select
  value={formData.hotel?.id || ""}
  onChange={(e) => handleHotelChange(e.target.value)}
  className="w-full p-3 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500"
>
  <option value="">בחרו מלון</option>
  {hotels.map((hotel) => (
    <option key={hotel.id} value={hotel.id}>{hotel.title}</option>
  ))}
</select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium py-3 px-6 rounded-lg transition-all duration-300 md:col-span-2 mt-4"
                >
                  {isSubmitting ? "...שולח" : "שלחו לי פרטים"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
