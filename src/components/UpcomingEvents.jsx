import React from "react";

const events = [
  {
    date: "10",
    month: "JAN",
    title: "Putrada Ekadashi",
    description: "Fasting to bless families with progeny.",
  },
  {
    date: "25",
    month: "JAN",
    title: "Shattila Ekadashi",
    description: "Worship for strength and health.",
  },
  {
    date: "08",
    month: "FEB",
    title: "Bhaimi Ekadashi",
    description: "Destroys miseries and grants liberation.",
  },
  {
    date: "24",
    month: "FEB",
    title: "Vijaya Ekadashi",
    description: "Helps overcome enemies and achieve victory.",
  },
  {
    date: "10",
    month: "MAR",
    title: "Amalaki Ekadashi",
    description: "Purity through worship of the amla tree and Vishnu.",
  },
  {
    date: "26",
    month: "MAR",
    title: "Papamochani Ekadashi",
    description: "Washes away sins and grants divine forgiveness.",
  },
  {
    date: "09",
    month: "APR",
    title: "Kamada Ekadashi",
    description: "Fulfills desires and removes curses.",
  },
  {
    date: "24",
    month: "APR",
    title: "Varuthini Ekadashi",
    description: "Brings prosperity and spiritual upliftment.",
  },
  {
    date: "08",
    month: "MAY",
    title: "Mohini Ekadashi",
    description: "Eliminates delusion and ego, invoking divine wisdom.",
  },
  {
    date: "23",
    month: "MAY",
    title: "Apara Ekadashi",
    description: "Removes sins and grants salvation.",
  },
  {
    date: "07",
    month: "JUN",
    title: "Pandava Nirjala Ekadashi",
    description: "Strict fasting without water for ultimate spiritual benefit.",
  },
  {
    date: "22",
    month: "JUN",
    title: "Yogini Ekadashi",
    description: "Cleanses sins and leads towards moksha.",
  },
  {
    date: "06",
    month: "JUL",
    title: "Sayana/Devshayani Ekadashi",
    description: "Marks the beginning of Chaturmasya; worship Vishnu.",
  },
  {
    date: "21",
    month: "JUL",
    title: "Kamika Ekadashi",
    description: "Fasting for farming prosperity and nature's welfare.",
  },
  {
    date: "05",
    month: "AUG",
    title: "Pavitropana Ekadashi",
    description: "Protects devotees and restores sacred bonds.",
  },
  {
    date: "19",
    month: "AUG",
    title: "Annada Ekadashi",
    description: "Grants freedom from sins and fear.",
  },
  {
    date: "04",
    month: "SEP",
    title: "Parshva Ekadashi",
    description: "Promises liberation and ancestral blessings.",
  },
  {
    date: "17",
    month: "SEP",
    title: "Indira Ekadashi",
    description: "Fasting honors Lord Indra and grants power.",
  },
  {
    date: "03",
    month: "OCT",
    title: "Papankusha Ekadashi",
    description: "Removes grave sins and offers purification.",
  },
  {
    date: "17",
    month: "OCT",
    title: "Rama Ekadashi",
    description: "Devotion to Lord Rama, grants liberation.",
  },
  {
    date: "02",
    month: "NOV",
    title: "Devutthana Ekadashi",
    description: "Marks end of Chaturmasya; Vishnu awakens.",
  },
  {
    date: "15",
    month: "NOV",
    title: "Utpanna Ekadashi",
    description: "Celebrates the rising of the Ekadashi goddess.",
  },
  {
    date: "01",
    month: "DEC",
    title: "Mokshada Ekadashi",
    description: "Fasting for moksha and spiritual upliftment.",
  },
  {
    date: "16",
    month: "DEC",
    title: "Saphala Ekadashi",
    description: "Brings success and fulfills desires.",
  },
];

const vaishnavaEvents = [
  {
    date: "02",
    month: "JAN",
    title: "Shri Jagadisha Pandita - Disappearance",
    description: "Commemoration of the disappearance of Jagadisha Pandita",
  },
  {
    date: "11",
    month: "JAN",
    title: "Shri Jagadisha Pandita - Appearance",
    description: "Celebration of the appearance of Jagadisha Pandita",
  },
  {
    date: "13",
    month: "JAN",
    title: "Shri Krishna Pushya Abhisheka",
    description: "A special abhishek for Lord Krishna with various items.",
  },
  {
    date: "14",
    month: "JAN",
    title: "Gangasagar Mela",
    description: "A grand festival at the confluence of the Ganges and the sea.",
  },
  {
    date: "18",
    month: "JAN",
    title: "Shri Ramchandra Kaviraja - Disappearance, Shrila Gopala Bhatta Gosvami - Appearance",
  },
  {
    date: "20",
    month: "JAN",
    title: "Shri Jayadeva Gosvami - Disappearance",
    description: "Commemoration of the disappearance of Jayadeva Gosvami",
  },
  {
    date: "21",
    month: "JAN",
    title: "Shri Lochana Dasa Thakura - Disappearance",
    description: "Commemoration of the disappearance of Lochana Dasa Thakura",
  },
  {
    date: "03",
    month: "FEB",
    title: "Vasanta Panchami, Saraawati Puja",
    description: "Celebration of the goddess of knowledge and arts.",
  },
  {
    date: "04",
    month: "FEB",
    title: "Shri Advaita Acharya - Appearance",
    description: "Celebration of the appearance of Advaita Acharya",
  },
  {
    date: "05",
    month: "FEB",
    title: "Bhishmashatami",
    description: "Commemoration of Bhishma's vow; fasting and prayers.",
  },
  {
    date: "09",
    month: "FEB",
    title: "Varaha Dwadashi",
    description: "Appearance of Lord Varahadeva.",
  },
  {
    date: "10",
    month: "FEB",
    title: "Nityananda Trayodashi",
    description: "Appearance of Sri Nityananda Prabhu.",
  },
  {
    date: "17",
    month: "FEB",
    title: "Srila Bhaktisiddhanta Sarasvati Thakura - Appearance",
    description: "Celebration of the founder of the Gaudiya Math.",
  },
  {
    date: "26",
    month: "FEB",
    title: "Shiva Ratri",
    description: "Great night of Shiva; fasting and night vigil.",
  },
  {
    date: "01",
    month: "MAR",
    title: "Shrila Jagannatha Dasa Babaji - Disappearance",
    description: "Commemoration of the disappearance of Jagannatha Dasa Babaji",
  },
  {
    date: "14",
    month: "MAR",
    title: "Gaur Purnima",
    description: "Appearance of Lord Chaitanya Mahaprabhu.",
  },
  {
    date: "15",
    month: "MAR",
    title: "Festival of Jagannatha Mishra",
    description: "Celebration of Lord Chaitanya's father",
  },
  {
    date: "22",
    month: "MAR",
    title: "Shri Shrivas Pandita - Appearance",
    description: "Celebration of the appearance of Shrivas Pandita",
  },
  {
    date: "06",
    month: "APR",
    title: "Rama Navami",
    description: "Celebration of Lord Sri Ramachandra's birth.",
  },
  {
    date: "14",
    month: "APR",
    title: "Beginning of Tulasi Jala Daan",
    description: "Start of the sacred ritual of offering water to Tulasi.",
  },
  {
    date: "27",
    month: "APR",
    title: "Shri Gadadhar Pandita - Appearance",
    description: "Celebration of the appearance of Gadadhar Pandita",
  },
  {
    date: "30",
    month: "APR",
    title: "Akshaya Tritiya",
    description: "Chandan Yatra Starts Continues for 21 days",
  },
  {
    date: "06",
    month: "MAY",
    title: "Shrimati Sita Devi - Appearance",
    description: "Celebration of the appearance of Sita Devi.",
  },
  {
    date: "11",
    month: "MAY",
    title: "Narasimha Chaturdashi",
    description: "Celebration of Lord Narasimha's appearance.",
  },
  {
    date: "14",
    month: "MAY",
    title: "End of Tulasi Jala Daan",
    description: "Completion of the sacred ritual of offering water to Tulasi.",
  },
  {
    date: "09",
    month: "JUN",
    title: "Panihati Chida Dahi Utsava",
    description: "Celebration of the festival of chipped rice and yogurt.",
  },
  {
    date: "11",
    month: "JUN",
    title: "Snana Yatra",
    description: "Bathing ceremony of Lord Jagannath; begins the Ratha Yatra festival.",
  },
  {
    date: "21",
    month: "JUN",
    title: "Shri Shrivas Pandita - Disappearance",
    description: "Commemoration of the disappearance of Shrivas Pandita",
  },
  {
    date: "25",
    month: "JUN",
    title: "Shrila Bhaktivinoda Thakura - Disappearance",
    description: "Commemoration of the disappearance of Shrila Bhaktivinoda Thakura",
  },
  {
    date: "26",
    month: "JUN",
    title: "Gundica Marjana",
    description: "Cleaning of the Gundica temple; preparation for Ratha Yatra.",
  },
  {
    date: "27",
    month: "JUN",
    title: "Jagannath Ratha Yatra",
    description: "Festival of chariots; celebration of Lord Jagannath.",
  },
  {
    date: "06",
    month: "JUL",
    title: "Kanha Jayanti",
    description: "Celebration of Lord Krishna's birth; fasting and prayers.",
  },
  {
    date: "21",
    month: "JUL",
    title: "Hariyali Teej",
    description: "Festival celebrating monsoon and fertility; fasting by women.",
  },
  {
    date: "05",
    month: "AUG",
    title: "Raksha Bandhan",
    description: "Celebration of the bond between brothers and sisters.",
  },
  {
    date: "19",
    month: "AUG",
    title: "Janmashtami",
    description: "Celebration of Lord Krishna's birth; night vigil and fasting.",
  },
  {
    date: "04",
    month: "SEP",
    title: "Ganesh Chaturthi",
    description: "Celebration of Lord Ganesha's birth; idol immersion.",
  },
  {
    date: "17",
    month: "SEP",
    title: "Navaratri Begins",
    description: "Nine nights of worshiping the divine feminine.",
  },
  {
    date: "03",
    month: "OCT",
    title: "Dussehra",
    description: "Victory of Rama over Ravana; symbolizing the triumph of good over evil.",
  },
  {
    date: "17",
    month: "OCT",
    title: "Karva Chauth",
    description: "Fasting by women for the well-being of their husbands.",
  },
  {
    date: "02",
    month: "NOV",
    title: "Diwali",
    description: "Festival of lights; celebration of the return of Rama and Sita.",
  },
  {
    date: "15",
    month: "NOV",
    title: "Bhagavad Gita Jayanti",
    description: "Celebration of the day the Bhagavad Gita was spoken.",
  },
  {
    date: "01",
    month: "DEC",
    title: "Vaikuntha Ekadashi",
    description: "Fasting and prayers for entry into Vaikuntha, Lord Vishnu's abode.",
  },
  {
    date: "16",
    month: "DEC",
    title: "Christmas",
    description: "Celebration of the birth of Jesus Christ.",
  },
];

export default function UpcomingSection() {
  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }
        `}
      </style>

      <div className="min-h-screen text-[#1E3A8A] p-8 flex justify-center bg-[#FFF7E0]">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-start gap-8">
          {/* First Calendar */}
          <div className="w-full lg:w-1/2 h-[420px] lg:h-[500px] rounded-xl border border-[#D4AF37]/20 bg-white p-6 overflow-hidden relative shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#1E3A8A]">
              Ekadashi Calendar 2025
            </h2>
            <div className="overflow-y-auto h-[340px] lg:h-[400px] pr-2 scroll-smooth custom-scrollbar">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 mb-[3px] p-3 rounded-xl ${
                    index % 2 === 0 ? "bg-[#FEF3C7]" : "bg-white/90"
                  }`}
                >
                  <div
                    className={`w-16 h-16 flex flex-col items-center justify-center font-bold text-white text-sm ${
                      index % 2 === 0 ? "bg-[#F59E0B]" : "bg-[#1E3A8A]"
                    }`}
                    style={{ borderRadius: "50%" }}
                  >
                    <span>{event.month}</span>
                    <span className="text-lg">{event.date}</span>
                  </div>
                  <div className="text-[#1E3A8A]">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-[#475569]">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Second Calendar */}
          <div className="w-full lg:w-1/2 h-[420px] lg:h-[500px] rounded-xl border border-[#D4AF37]/20 bg-white p-6 overflow-hidden relative shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#1E3A8A]">
              Vaishnava Calendar 2025
            </h2>
            <div className="overflow-y-auto h-[340px] lg:h-[400px] pr-2 scroll-smooth custom-scrollbar">
              {vaishnavaEvents.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 mb-[3px] p-3 rounded-xl ${
                    index % 2 === 0 ? "bg-[#FEF3C7]" : "bg-white/90"
                  }`}
                >
                  <div
                    className={`w-16 h-16 flex flex-col items-center justify-center font-bold text-white text-sm ${
                      index % 2 === 0 ? "bg-[#F59E0B]" : "bg-[#1E3A8A]"
                    }`}
                    style={{ borderRadius: "50%" }}
                  >
                    <span>{event.month}</span>
                    <span className="text-lg">{event.date}</span>
                  </div>
                  <div className="text-[#1E3A8A]">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-[#475569]">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
