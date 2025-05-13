// src/hotels.js

/*const hotels = [
  {
    id: "aqueduct",
    title: "מלון אקוודוקט | רגבה",
    image: "https://www.bgalil.co.il/files/tinymceuploads/DSC_9529_copy.jpg._1565688455",
    minPrice: 1400,
    lastRooms: false,
    bestValue: false,
    mostPopular: true,
    halfBoard: true,
    startDate: "2025-05-16",
    endDate: "2025-05-18",
    parasha: "בחוקותי",
    features: ["pool", "parking", "synagogue", "breakfast", "cleaning", "comfyBeds"]
  },
  {
    id: "nofHaifa",
    title: "מלון נוף | חיפה",
    image: "https://booking.simplex-ltd.com/octopus/Upload/images/Chain_11488/Images/Resorts/outside-areas-1-1-.jpg",
    minPrice: 950,
    lastRooms: false,
    bestValue: true,
    mostPopular: false,
    halfBoard: true,
    startDate: "2025-05-23",
    endDate: "2025-05-25",
    parasha: "נשא",
    features: ["parking", "balcony", "breakfast", "comfyBeds"]
  },
  {
    id: "elyam",
    title: "מלון אל ים | נתניה",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/c9/8e/09/paradiso-lifestyle-resort.jpg?w=900&h=500&s=1",
    minPrice: 1380,
    lastRooms: true,
    bestValue: false,
    mostPopular: false,
    halfBoard: false,
    startDate: "2025-05-30",
    endDate: "2025-06-01",
    parasha: "בהעלותך",
    features: ["pool", "parking", "synagogue", "balcony", "breakfast", "cleaning", "comfyBeds"]
  },
  {
    id: "residance",
    title: "מלון רזידנס | נתניה",
    image: "https://netanya-hotelz.co.il/wp-content/uploads/2016/07/rez7.jpg",
    minPrice: 1500,
    lastRooms: false,
    bestValue: false,
    mostPopular: false,
    halfBoard: false,
    startDate: "2025-06-06",
    endDate: "2025-06-08",
    parasha: "שלח",
    features: ["parking", "synagogue", "cleaning", "comfyBeds"]
  },
  {
    id: "tveria",
    title: "מלון רויאל פלאזה | טבריה",
    image: "https://royalplaza.co.il/wp-content/uploads/2020/06/%D7%A8%D7%95%D7%99%D7%90%D7%9C-%D7%A4%D7%9C%D7%90%D7%96%D7%94-%D7%98%D7%91%D7%A8%D7%99%D7%94.jpg",
    minPrice: 950,
    lastRooms: true,
    bestValue: false,
    mostPopular: true,
    halfBoard: false,
    startDate: "2025-06-13",
    endDate: "2025-06-15",
    parasha: "קורח",
    features: ["pool", "synagogue", "breakfast", "comfyBeds"]
  }
];


export default hotels;*/
// src/hotels.js
export default async function fetchHotels() {
  const response = await fetch("https://airtable-api-zeta.vercel.app/api/events");
  const data = await response.json();
  console.log(data);

  return data.map(hotel => ({
    ...hotel,
    features: Array.isArray(hotel.features)
      ? hotel.features
      : typeof hotel.features === "string"
      ? hotel.features.split(",").map(f => f.trim())
      : []
  }));
}
