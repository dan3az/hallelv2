import React from "react";

export default function WhatsAppGroups() {
  const groups = [
    { id: 1, name: "היכרויות גילאי 20-30", link: "https://chat.whatsapp.com/DhhIpGI3wNtAS0u8vgsHPw" },
    { id: 2, name: "היכרויות גילאי 30-40", link: "https://chat.whatsapp.com/JtJE3em89WeLFxNG8MZHVM" },
    { id: 3, name: "היכרויות גילאי 40-50", link: "https://chat.whatsapp.com/LjLktrsmMLEGPAGp6VeQOT" },
    { id: 4, name: "היכרויות גילאי 50-60", link: "https://chat.whatsapp.com/FFht8p0N9JXGgPemWqkpVJ" },
    { id: 5, name: "היכרויות גילאי 60+", link: "https://chat.whatsapp.com/DRmTcQFa5SvJD5DqZF0yxo" },
    { id: 6, name: "שיח ותקשורת לפנויים פנויות דתיים", link: "https://chat.whatsapp.com/HS99yYEba2l9j7xIUddvrM" },
    { id: 7, name: "הפלגות ליעדים קסומים", link: "https://chat.whatsapp.com/GMuCzYAJDUE3e1D59lunwe" },
    { id: 8, name: "חוגגים שבועות ביחד", link: "https://chat.whatsapp.com/GFAkThgSDZdAL46gAXwUj7" }
  ];

  return (
    <section className="pb-10 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">הצטרפו לקהילות שלנו בווצאפ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {groups.map(group => (
            <a
              key={group.id}
              href={group.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full transition"
              aria-label={`${group.name}`}
            >
              <WhatsAppIcon />
              <span>{`${group.name}`}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
