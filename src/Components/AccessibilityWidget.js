import React, { useState } from "react";

import { 
  Accessibility, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon,
  X,
  Volume2
} from "lucide-react";

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const increaseFont = () => {
    if (fontSize < 24) {
      const newSize = fontSize + 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  };

  const decreaseFont = () => {
    if (fontSize > 14) {
      const newSize = fontSize - 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  };

 const toggleContrast = () => {
  setHighContrast(!highContrast);
  if (!highContrast) {
    document.body.classList.add('high-contrast');  // להוסיף את קלאס הניגודיות הגבוהה
  } else {
    document.body.classList.remove('high-contrast');  // להסיר את קלאס הניגודיות הגבוהה
  }
};


  return (
    <div className="fixed bottom-24 left-6 z-50 flex flex-col items-end">
      <button
        onClick={toggleWidget}
        className="bg-blue-700 hover:bg-blue-800 rounded-full p-3 shadow-lg"
        size="icon"
        aria-label="הפעל/הסתר תפריט נגישות"
      >
        <Accessibility className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-xl p-4 w-64 border border-gray-200 rtl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">הגדרות נגישות</h3>
            <button 
              variant="ghost" 
              size="icon" 
              onClick={toggleWidget}
              className="h-8 w-8 rounded-full"
              aria-label="סגור תפריט נגישות"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">גודל טקסט</p>
              <div className="flex justify-between">
                <button 
                  onClick={decreaseFont} 
                  variant="outline" 
                  size="sm"
                  className="flex-1 mr-2"
                  aria-label="הקטן את גודל הטקסט"
                >
                  <ZoomOut className="h-4 w-4 mr-1" /> הקטן
                </button>
                <button 
                  onClick={increaseFont} 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  aria-label="הגדל את גודל הטקסט"
                >
                  <ZoomIn className="h-4 w-4 mr-1" /> הגדל
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm">ניגודיות</p>
              <button 
                onClick={toggleContrast} 
                variant={highContrast ? "default" : "outline"} 
                className="w-full"
                aria-label={highContrast ? "הפעל ניגודיות רגילה" : "הפעל ניגודיות גבוהה"}
              >
                {highContrast ? (
                  <>
                    <Moon className="h-4 w-4 mr-1" /> ניגודיות רגילה
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4 mr-1" /> ניגודיות גבוהה
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
