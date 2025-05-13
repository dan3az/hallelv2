import React from "react";
import { Dialog } from "@headlessui/react"; // ייבוא מהספריה החדשה
import { X } from "lucide-react";

export default function TermsModal({ isOpen, onClose, type }) {
  const content =
    type === "terms"
      ? {
          title: "תנאי שימוש",
          content: ` 
            <h3 class="text-lg font-bold mb-2">1. כללי</h3>
            <p class="mb-4">ברוכים הבאים לאתר האינטרנט של הללויה הפקות תיירות ונופש. השימוש באתר זה כפוף לתנאי השימוש המפורטים להלן.</p>
            <h3 class="text-lg font-bold mb-2">2. הזמנות ותשלומים</h3>
            <p class="mb-4">הזמנות באתר מתבצעות בכפוף לזמינות. התשלום עבור ההזמנה יתבצע באמצעות כרטיס אשראי או בהעברה בנקאית. במקרה של ביטול הזמנה, יחולו דמי ביטול בהתאם למדיניות הביטולים המפורטת באתר.</p>
            <h3 class="text-lg font-bold mb-2">3. אחריות</h3>
            <p class="mb-4">החברה אינה אחראית לנזקים ישירים או עקיפים שעלולים להיגרם כתוצאה משימוש באתר או מהסתמכות על המידע המופיע בו.</p>
            <h3 class="text-lg font-bold mb-2">4. קניין רוחני</h3>
            <p class="mb-4">כל התכנים המופיעים באתר, לרבות טקסטים, תמונות, סרטונים וסימנים מסחריים, הינם קניינה הרוחני של החברה ואין לעשות בהם שימוש ללא אישור מפורש בכתב.</p>
          `
        }
      : {
          title: "הצהרת נגישות",
          content: `
            <h3 class="text-lg font-bold mb-2">אתר מונגש לאנשים עם מוגבלויות</h3>
            <p class="mb-4">אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.</p>
            <h3 class="text-lg font-bold mb-2">התאמות הנגישות באתר כוללות:</h3>
            <ul class="list-disc pr-5 mb-4">
              <li>אפשרות לשינוי גודל הטקסט</li>
              <li>אפשרות לשינוי ניגודיות צבעים</li>
              <li>תיאורי תמונות עבור קוראי מסך</li>
              <li>ניווט מלא באמצעות המקלדת</li>
              <li>תמיכה בתוכנות הקראה</li>
            </ul>
            <h3 class="text-lg font-bold mb-2">דרכי פנייה בנושא נגישות</h3>
            <p class="mb-4">אם נתקלתם בבעיית נגישות או שיש לכם הצעות לשיפור נגישות האתר, אנא פנו אלינו בטלפון 054-7260002 או באימייל.</p>
          `
        };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto shadow-xl">
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-t-lg sticky top-0 z-10 bg-white">
            <h2 className="text-xl font-bold">{content.title}</h2>
            <button
              onClick={onClose}
              className="bg-gray-200 rounded-full p-1 text-gray-600 hover:text-gray-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div
            className="mt-4 text-right p-4"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
