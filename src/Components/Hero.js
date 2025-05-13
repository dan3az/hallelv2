import React from "react";
/*import { Button } from "@/components/ui/button";*/
import logo from '../img/logo.PNG';
import { Calendar, Book, ChevronLeft } from "lucide-react";
import '../index.css';
export default function Hero({ scrollToContact, scrollToHotels }) {
  return (
    <section className="relative w-full h-screen md:h-[60vh] overflow-hidden">
      <div className="absolute top-4 right-4 text-white text-sm z-30 font-medium">
  בס״ד
</div>
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
        alt="נופש" 
        className="absolute w-full h-full object-cover object-center"
      />
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
        <div className="w-full max-w-3xl text-center">

   <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight text-center">
  <span className="block">
    הללויה הפקות תיירות ונופש בארץ ובעולם מזמינים אתכם להצטרף לחוויה ייחודית ומרעננת!
  </span>
  <span className="block text-base md:text-lg lg:text-xl font-normal mt-2">
    בואו לגלות את כל המלונות והאירועים הקרובים לשבתות ולחגים – לבילוי קסום ומלא תוכן.
  </span>
</h1>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <button 
              onClick={scrollToHotels}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 text-lg px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2  md:w-auto"
            >
              צפייה במלונות
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={scrollToContact}
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2  md:w-auto"
            >
              צור קשר
              <ChevronLeft className="w-5 h-5" />
            </button>
            
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
}