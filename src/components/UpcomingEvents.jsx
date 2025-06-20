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

      {/* <div className="min-h-screen text-orange-900 p-8 flex justify-center"> */}
      <div className="min-h-screen text-orange-900 p-8 flex justify-center bg-gradient-to-b from-[#fdf6e3] via-[#f5e1c9] to-[#ede0d4]">
        <div className="w-full max-w-6xl flex justify-start">
          <div className="w-full md:w-1/2 h-[500px] rounded-xl shadow-2xl bg-gradient-to-b from-gray-100 to-gray-200 p-6 overflow-hidden relative">
            <h2 className="text-3xl font-bold text-center mb-6">
              Ekadashi Calendar 2025
            </h2>

            <div className="overflow-y-auto h-[400px] pr-2 scroll-smooth custom-scrollbar">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 mb-[3px] p-3 rounded-xl ${
                    index % 2 === 0 ? "bg-orange-200/50" : "bg-gray-200/80"
                  }`}
                >
                  <div
                    className={`w-16 h-16 flex flex-col items-center justify-center font-bold text-white text-sm ${
                      index % 2 === 0 ? "bg-orange-500" : "bg-gray-500"
                    }`}
                    style={{ borderRadius: "50%" }}
                  >
                    <span>{event.month}</span>
                    <span className="text-lg">{event.date}</span>
                  </div>
                  <div className="text-orange-900">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-800">{event.description}</p>
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
