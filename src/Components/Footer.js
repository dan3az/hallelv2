import React , { useState } from "react";
/*import { Link } from "react-router-dom";*/
import TermsModal from "./TermsModal";
import { Phone, Youtube, Instagram, Facebook } from "lucide-react";


export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("terms");

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
   <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="py-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <p className="text-xl">להזמנות חייגו: 054-7260002 | 054-6729040</p>
              <p className="mt-2">שבתות חתן, שבתות בר מצווה, קבוצות גיבוש משפחתיות</p>
              <p className="text-sm mt-4 opacity-80">דניאל מינס – באהבה ובשמחה</p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="tel:0547260002" 
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="py-4 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-70">
              © {new Date().getFullYear()} הללויה הפקות. כל הזכויות שמורות.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button onClick={() => openModal("terms")} className="hover:underline">תנאי שימוש</button>
              <button className="hover:underline">מדיניות פרטיות</button>
              <button onClick={() => openModal("accessibility")} className="hover:underline">הצהרת נגישות</button>
            </div>
          </div>
        </div>
      </div>

      <TermsModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        type={modalType} 
      />
    </footer>
  );
}