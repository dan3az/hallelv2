import React, { useState, useRef, useEffect } from "react";
import { Share2, Facebook, Mail } from "lucide-react";

export default function ShareButtons({ hotel }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const shareUrl = window.location.href;
  const shareTitle = `חופשה במלון ${hotel.title}`;
  const shareMessage = `היי! מצאתי חופשה מעולה במלון ${hotel.title}. מחיר החל מ-${hotel.minPrice} ש"ח לזוג. בואו תצטרפו!`;

  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareMessage} ${shareUrl}`)}`, "_blank");
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`, "_blank");
  };

  const shareViaEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareMessage}\n\n${shareUrl}`)}`, "_blank");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute top-1 left-1 z-20">
      <button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white bg-opacity-80 rounded-full p-1.5 shadow-md absolute top-3 left-3 z-20  "
      >
        <Share2 className="h-4 w-4 text-blue-600" />
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 text-sm"
        >
          <button
            onClick={shareViaWhatsApp}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
          >
     <svg viewBox="0 0 24 24" className="h-4 w-4 fill-green-600">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
</svg>
            WhatsApp
          </button>
          <button
            onClick={shareViaFacebook}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
          >

            <Mail className="h-4 w-4 text-gray-600" />
            אימייל
          </button>
        </div>
      )}
    </div>
  );
}
