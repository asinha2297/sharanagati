import React from "react";

const events = [
  {
    date: "14",
    month: "JAN",
    title: "Sat Tila Ekadashi",
    description: "Worship for strength and health.",
  },
  {
    date: "29",
    month: "JAN",
    title: "Bhaimi Ekadashi",
    description: "Destroys miseries and grants liberation.",
  },
  {
    date: "13",
    month: "FEB",
    title: "Vijaya Ekadashi",
    description: "Helps overcome enemies and achieve victory.",
  },
  {
    date: "27",
    month: "FEB",
    title: "Amalaki Ekadashi",
    description: "Purity through worship of the amla tree and Vishnu.",
  },
  {
    date: "15",
    month: "MAR",
    title: "Papamochani Ekadashi",
    description: "Washes away sins and grants divine forgiveness.",
  },
  {
    date: "29",
    month: "MAR",
    title: "Kamada Ekadashi",
    description: "Fulfills desires and removes curses.",
  },
  {
    date: "13",
    month: "APR",
    title: "Varuthini Ekadashi",
    description: "Brings prosperity and spiritual upliftment.",
  },
  {
    date: "27",
    month: "APR",
    title: "Mohini Ekadashi",
    description: "Eliminates delusion and ego, invoking divine wisdom.",
  },
  {
    date: "13",
    month: "MAY",
    title: "Apara Ekadashi",
    description: "Removes sins and grants salvation.",
  },
  {
    date: "27",
    month: "MAY",
    title: "Padmini Ekadashi",
    description: "Washes away sins and grants spiritual merit.",
  },
  {
    date: "11",
    month: "JUN",
    title: "Parama Ekadashi",
    description: "Cleanses past sins and grants liberation from the cycle of birth and death.",
  },
  {
    date: "26",
    month: "JUN",
    title: "Pandava Nirjala Ekadashi",
    description: "Strict fasting without water for ultimate spiritual benefit.",
  },
  {
    date: "11",
    month: "JUL",
    title: "Yogini Ekadashi",
    description: "Cleanses sins and leads towards moksha.",
  },
  {
    date: "25",
    month: "JUL",
    title: "Sayana/Devshayani Ekadashi",
    description: "Marks the beginning of Chaturmasya; worship Vishnu.",
  },
  {
    date: "09",
    month: "AUG",
    title: "Kamika Ekadashi",
    description: "Fasting for farming prosperity and nature's welfare.",
  },
  {
    date: "24",
    month: "AUG",
    title: "Pavitropana Ekadashi",
    description: "Protects devotees and restores sacred bonds.",
  },
  {
    date: "07",
    month: "SEP",
    title: "Annada Ekadashi",
    description: "Grants freedom from sins and fear.",
  },
  {
    date: "22",
    month: "SEP",
    title: "Parshva Ekadashi",
    description: "Promises liberation and ancestral blessings.",
  },
  {
    date: "06",
    month: "OCT",
    title: "Indira Ekadashi",
    description: "Fasting honors Lord Indra and grants power.",
  },
  {
    date: "22",
    month: "OCT",
    title: "Pashankusha Ekadashi",
    description: "Removes grave sins and offers purification.",
  },
  {
    date: "05",
    month: "NOV",
    title: "Rama Ekadashi",
    description: "Devotion to Lord Rama, grants liberation.",
  },
  {
    date: "21",
    month: "NOV",
    title: "Utthana Ekadashi",
    description: "Marks end of Chaturmasya; Vishnu awakens.",
  },
  {
    date: "05",
    month: "DEC",
    title: "Utpanna Ekadashi",
    description: "Celebrates the rising of the Ekadashi goddess.",
  },
  {
    date: "20",
    month: "DEC",
    title: "Mokshada Ekadashi",
    description: "Fasting for moksha and spiritual upliftment.",
  },
];

const vaishnavaEvents = [
  {
    date: "03",
    month: "JAN",
    title: "Shri Krishna Pushya Abhisheka",
    description: "A special abhishek for Lord Krishna with various items.",
  },
  {
    date: "08",
    month: "JAN",
    title: "Shri Ramchandra Kaviraja - Disappearance",
    description: "Commemoration of the disappearance of Shri Ramchandra Kaviraja",
  },
  {
    date: "08",
    month: "JAN",
    title: "Shrila Gopala Bhatta Gosvami - Appearance",
    description: "Celebration of the appearance of Shrila Gopala Bhatta Gosvami",
  },
  {
    date: "23",
    month: "JAN",
    title: "Vasanta Panchami, Saraswati Puja",
    description: "Celebration of the goddess of knowledge and arts.",
  },
  {
    date: "25",
    month: "JAN",
    title: "Sri Advaita Acharya - Appearance",
    description: "Celebration of the appearance of Advaita Acharya",
  },
  {
    date: "26",
    month: "JAN",
    title: "Bhishmashatami",
    description: "Commemoration of Bhishma's vow; fasting and prayers.",
  },
  {
    date: "30",
    month: "JAN",
    title: "Varaha Dwadashi",
    description: "Appearance of Lord Varahadeva.",
  },
  {
    date: "31",
    month: "JAN",
    title: "Nityananda Trayodashi",
    description: "Appearance of Sri Nityananda Prabhu.",
  },
  {
    date: "06",
    month: "FEB",
    title: "Srila Bhaktisiddhanta Sarasvati Thakura - Appearance",
    description: "Celebration of the appearance of Srila Bhaktisiddhanta Sarasvati Thakura.",
  },
  {
    date: "16",
    month: "FEB",
    title: "Shiva Ratri",
    description: "Great night of Shiva; fasting and night vigil.",
  },
  {
    date: "18",
    month: "FEB",
    title: "Srila Jagannatha Dasa Babaji - Disappearance",
    description: "Commemoration of the disappearance of Srila Jagannatha Dasa Babaji.",
  },
  {
    date: "03",
    month: "MAR",
    title: "Gaura Purnima",
    description: "Commemoration of the appearance of Lord Chaitanya Mahaprabhu.",
  },
  {
    date: "04",
    month: "MAR",
    title: "Festival of Jagannatha Mishra",
    description: "Celebration of Lord Chaitanya's father",
  },
  {
    date: "11",
    month: "MAR",
    title: "Shri Shrivas Pandita - Appearance",
    description: "Celebration of the appearance of Shrivas Pandita",
  },
  {
    date: "27",
    month: "MAR",
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
    date: "17",
    month: "APR",
    title: "Shri Gadadhar Pandita - Appearance",
    description: "Celebration of the appearance of Gadadhar Pandita",
  },
  {
    date: "20",
    month: "APR",
    title: "Akshaya Tritiya",
    description: "Chandan Yatra Starts Continues for 21 days",
  },
  {
    date: "25",
    month: "APR",
    title: "Shrimati Sita Devi - Appearance",
    description: "Celebration of the appearance of Sita Devi.",
  },
  {
    date: "27",
    month: "APR",
    title: "Rukmini Dwadashi",
    description: "Celebration of the appearance of Rukmini Devi.",
  },
  {
    date: "30",
    month: "APR",
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
    date: "29",
    month: "JUN",
    title: "Snana Yatra",
    description: "Bathing ceremony of Lord Jagannath; begins the Ratha Yatra festival.",
  },
  {
    date: "10",
    month: "JUL",
    title: "Shri Shrivas Pandita - Disappearance",
    description: "Commemoration of the disappearance of Shrivas Pandita",
  },
  {
    date: "14",
    month: "JUL",
    title: "Shrila Bhaktivinoda Thakura - Disappearance",
    description: "Commemoration of the disappearance of Shrila Bhaktivinoda Thakura",
  },
  {
    date: "14",
    month: "JUL",
    title: "Sri Gadadhar Pandita - Disappearance",
    description: "Commemoration of the disappearance of Gadadhar Pandita",
  },
  {
    date: "15",
    month: "JUL",
    title: "Gundica Marjana",
    description: "Cleaning of the Gundica temple; preparation for Ratha Yatra.",
  },
  {
    date: "16",
    month: "JUL",
    title: "Jagannath Ratha Yatra",
    description: "Festival of chariots; celebration of Lord Jagannath.",
  },
  {
    date: "20",
    month: "JUL",
    title: "Hera Panchami",
    description: "Celebration of playful rituals associated with Lord Jagannath.",
  },
  {
    date: "24",
    month: "JUL",
    title: "Return Ratha Yatra",
    description: "Festival celebrating the return of Lord Jagannath's chariot; marks the end of the Ratha Yatra festival.",
  },
  {
    date: "29",
    month: "JUL",
    title: "First Month of Caturmasya Begins",
    description: "Beginning of the first month of Caturmasya; period of austerity and spiritual practices.",
  },
  {
    date: "03",
    month: "AUG",
    title: "Srila Gopala Bhatta Gosvami - Disappearance",
    description: "Commemoration of the disappearance of Srila Gopala Bhatta Gosvami.",
  },
  {
    date: "23",
    month: "AUG",
    title: "Radha Govinda Jhulana Yatra",
    description: "Celebration of the swinging festival of Radha and Govinda.",
  },
  {
    date: "28",
    month: "AUG",
    title: "Lord Balarama - Appearance",
    description: "Commemoration of the appearance of Lord Balarama.",
  },
  {
    date: "29",
    month: "AUG",
    title: "Srila Prabhupada's Departure for US",
    description: "Srila Prabhupada's departure for the United States.",
  },
  {
    date: "04",
    month: "SEP",
    title: "Sri Krishna Janmashtami",
    description: "Celebration of Lord Krishna's birth; night vigil and fasting.",
  },
  {
    date: "05",
    month: "SEP",
    title: "Nandotsava, Srila Prabhupada Appearance",
    description: "Celebration of the festival following Krishna Janmashtami; festivities and rituals.",
  },
  {
    date: "19",
    month: "SEP",
    title: "Radhastami",
    description: "Celebration of the appearance of Srimati Radharani.",
  },
  {
    date: "23",
    month: "SEP",
    title: "Sri Vamana Dwadashi",
    description: "Celebration of the appearance of Sri Vamanadeva.",
  },
  {
    date: "24",
    month: "SEP",
    title: "Srila Bhaktivinoda Thakura - Disappearance",
    description: "Commemoration of the disappearance of Srila Bhaktivinoda Thakura.",
  },
  {
    date: "26",
    month: "SEP",
    title: "Bhadra Purnima, Acceptance of Sannyas by Srila Prabhupada",
    description: "Commemoration of the acceptance of sannyas by Srila Prabhupada.",
  },
  {
    date: "03",
    month: "OCT",
    title: "Srila Prabhupada's Arrival in the US",
    description: "Commemoration of Srila Prabhupada's arrival in the United States.",
  },
  {
    date: "26",
    month: "OCT",
    title: "Sri Krishna Sharadiya Rasayatra, Lakshami Puja",
    description: "Celebration of the Sri Krishna Sharadiya Rasayatra and Lakshami Puja.",
  },
  {
    date: "02",
    month: "NOV",
    title: "Bahulashtami",
    description: "Celebration of Bahulashtami.",
  },
  {
    date: "09",
    month: "NOV",
    title: "Deep Daan, Dipavali",
    description: "Celebration of Deep Daan and Dipavali.",
  },
  {
    date: "10",
    month: "NOV",
    title: "Go Puja, Govardhan Puja",
    description: "Celebration of Go Puja and Govardhan Puja.",
  },
  {
    date: "13",
    month: "NOV",
    title: "Srila Prabhupada Disappearance",
    description: "Commemoration of the disappearance of Srila Prabhupada.",
  },
  {
    date: "17",
    month: "NOV",
    title: "Gopashtami",
    description: "Celebration of Gopashtami.",
  },
  {
    date: "24",
    month: "NOV",
    title: "Sri Krishna Rasayatra, Tulasi Shaligrama Vivaha",
    description: "Celebration of the Sri Krishna Rasayatra and Tulasi Shaligrama Vivaha.",
  },
  {
    date: "27",
    month: "DEC",
    title: "Srila Bhaktisiddhanta Sarasvati Thakura - Disappearance",
    description: "Commemoration of the disappearance of Srila Bhaktisiddhanta Sarasvati Thakura.",
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
              Ekadashi Calendar 2026
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
              Vaishnava Calendar 2026
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
