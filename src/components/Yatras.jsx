import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ContactUs.css";
import Y1Img1 from "../assets/Ekachakra.jpg";
import Y3Img1 from "../assets/Medicos.jpg";
import Y4Img1 from "../assets/Snehodiya.jpg";
import Y5Img1 from "../assets/Dwarka.jpg";
import Y6Img1 from "../assets/Malda.jpg";

const Yatras = () => {
  const navigate = useNavigate();

  const upcomingYatra = {
    intro: [
      "We are very happy to let you know that we are having this year's Durga Puja yatra from 16-10-2026 to 20-10-2026.",
      "Shri Ahobilam Dham is the holy place where Lord Narasimha appeared to protect His dear devotee Prahlad. We will take darshan of 9 special forms of Sri Nrsimhadev there.",
      "Along with darshan of Panaka Nrsimha at Vijayawada, devotees can offer panakam (gur water) and also take darshan of Sri Lakshmi Narasimha established by the Pandavas, with a visit to Vedadri Nrsimhadev.",
    ],
    itinerary: [
      "16-10-2026: Train departs from Kolkata to Vijayawada.",
      "17-10-2026: Arrival at Vijayawada and hotel accommodation.",
      "17-10-2026 (after lunch, by bus): Departure for Vedadri.",
      "18-10-2026 (early morning, by bus): Darshan at Panakala Lakshmi Narasimha Swamy Temple, Mangalagiri.",
      "18-10-2026 afternoon (by train): Vijayawada to Nandyal departure at 13:10.",
      "18-10-2026 night (by bus): Arrival at Nandyal; onward drive to Ahobilam and guest house check-in.",
      "19-10-2026 and 20-10-2026: Lower and Upper Ahobilam darshan; Ugra Stambha trekking on 20th Oct.",
      "20-10-2026 night: Ahobilam to Nandyal by bus and night train onward journey.",
    ],
    trainDetails: [
      {
        title: "Kolkata to Vijayawada",
        date: "Friday 16-10-2026",
        notes: [
          "Daily trains: From Howrah 12841 (15:10 - 10:10 next day), From Shalimar 18045 (11:15 - 10:30 next day).",
          "Weekly Friday train: From Howrah 22817 (16:00 - 11:50 next day).",
          "Recommended: Star-marked option can better match yatra start timings.",
        ],
      },
      {
        title: "Vijayawada to Nandyal",
        date: "Sunday 18-10-2026",
        notes: ["17330 (13:10 - 20:10 same day)."],
      },
      {
        title: "Nandyal to Kolkata",
        date: "Tuesday 20-10-2026",
        notes: [
          "18048 (20:25 - 23:45 next day).",
          "As there is only one train from Nandyal, tickets should be booked quickly.",
          "Possible advance booking stations: VSG, UBL, HPT, BAY (boarding point can later be updated to Nandyal).",
        ],
      },
    ],
    fareDetails: [
      {
        title: "Kolkata to Vijayawada",
        booking: "Booking opens 17-08-2026 at 8:00 AM IST",
        fares: ["SL: 620", "3E: 1475", "3A: 1575", "2A: 2230", "1A: 3735"],
      },
      {
        title: "Vijayawada to Nandyal",
        booking: "Booking opens 19-08-2026 at 8:00 AM IST",
        fares: ["SL: 210", "3A: 520", "2A: 725"],
      },
      {
        title: "Nandyal to Kolkata",
        booking: "Booking opens 21-08-2026 at 8:00 AM IST",
        fares: ["SL: 670", "3A: 1735", "2A: 2480"],
      },
    ],
    hotelCategories: [
      "Category A - AC Double Bed Rooms: 8300",
      "Category B - AC Triple Bed Rooms: 7800",
      "Children below 3 years: No charges",
      "Children 3-17 years (till class 12): 5000 per child",
      "Above 17 years: Full charges",
      "Charges include pickup/drop from station, prasadam during yatra, accommodation, and internal travel.",
      "Train journey fare and train prasadam charges are not included.",
      "Room allotment is first-come, first-served. Early registration gets priority at the main hotel.",
      "After first hotel fills up, nearby hotels will be allotted.",
    ],
    registrationGuidelines: [
      "Registration begins online from 12-07-2026.",
      "Registration amount per devotee: Category A 4000, Category B 3800, Child 2500 (adjusted in total amount).",
      "Last Date of Registration: 31-07-2026.",
      "Last Date of Full Payment: 01-09-2026.",
      "Only registered devotees (with registration payment) will be added to the yatra WhatsApp group for updates.",
    ],
    cancellationPolicy:
      "Any cancellation made after 15-08-2026 will incur a deduction of 50% of the total amount per person.",
  };

  return (
    <div className="contact-us-container px-4 py-10 bg-[#FFF7E0] min-h-screen">
      <h1 className="page-title text-center text-4xl font-bold text-[#1E3A8A] mb-10">
        Yatra
      </h1>
      <div>
      <h1 className="page-title !text-left text-4xl !font-normal text-[#1E3A8A] mb-10">
        Upcoming Yatra
      </h1>
      <div className="max-w-full mx-auto bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-6 md:p-8 text-center">
        <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
          Ahobilam-Vijayawada Dhaam Yatra
        </h2>

        <div className="text-gray-700 text-left space-y-6 mb-6">
          <div className="space-y-2">
            {upcomingYatra.intro.map((line) => (
              <p key={line} className="leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
            <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3">Tentative Itinerary</h3>
            <ul className="space-y-2 text-sm md:text-base">
              {upcomingYatra.itinerary.map((item) => (
                <li key={item} className="leading-relaxed">• {item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-[#1E3A8A]">Train Details</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {upcomingYatra.trainDetails.map((section) => (
                <div key={section.title} className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
                  <h4 className="font-semibold text-[#1E3A8A] mb-2">{section.title}</h4>
                  <p className="text-md font-medium text-[#1E3A8A] mb-3">{section.date}</p>
                  <ul className="space-y-1 text-sm leading-relaxed">
                    {section.notes.map((note) => (
                      <li key={note}>• {note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-[#1E3A8A]">Train Fare Details and Booking Dates</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {upcomingYatra.fareDetails.map((fare) => (
                <div key={fare.title} className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
                  <h4 className="font-semibold text-[#1E3A8A]">{fare.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{fare.booking}</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {fare.fares.map((entry) => (
                      <li key={entry}>• {entry}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3">Hotel Categories and Notes</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                {upcomingYatra.hotelCategories.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3">Registration Guidelines</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                {upcomingYatra.registrationGuidelines.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="rounded-xl border border-red-200 bg-red-50 p-4">
            <h3 className="text-lg font-semibold text-red-700 mb-2">Cancellation Policy</h3>
            <p className="text-sm text-red-700 leading-relaxed">{upcomingYatra.cancellationPolicy}</p>
          </section>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="bounce-pulse px-6 py-3 bg-[#F59E0B] hover:bg-[#d97706] text-white font-semibold rounded-md shadow-md transition duration-300 cursor-pointer"
        >
          Register for Yatra
        </button>
      </div>
      </div>
      <h1 className="page-title !text-left text-4xl !font-normal text-[#1E3A8A] mt-10 mb-10">
        Previous Yatra
      </h1>
      <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y1Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-full max-w-md h-auto object-cover" />
        </div>
      </div>
      {/* Write-up Section */}
      <div className="w-full md:w-1/2">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#1E3A8A]">Ekachakra Dhaam Yatra</h2>
          <p className="text-gray-700 text-justify">
            The Ekachakra Dham Yatra was held from March 21st to 23rd, 2025, with the participation of approximately 180 to 200 devotees. During the pilgrimage, devotees visited several spiritually significant sites associated with the pastimes of Sri Nityananda Prabhu.
          </p>
          <p className="text-gray-700 text-justify">
            These included Sri Nityananda Prabhu’s birthplace and residence, Bakultala, Nabhipota, Pandava Tala, Kadamba Khandi, Sri Bankim Raya Temple, ISKCON Temple and Padmavati Kunda.
          </p>
          <p className="text-gray-700 text-justify">
            The yatra offered a deeply devotional experience, allowing participants to immerse themselves in the sacred atmosphere of Ekachakra Dham.
          </p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
    {/* Write-up Section */}
    <div className="w-full md:w-1/2">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#1E3A8A]">Gangasagar Dhaam Yatra</h2>
        <p className="text-gray-700 text-justify">
          The Gangasagar Dham Yatra was held from December 14th to 16th, 2024, a spiritually enriching pilgrimage to the sacred confluence of the Ganga River and the Bay of Bengal, a site revered for its purifying and liberating energies. This yatra attracted approx. 150-180 devotees, all united in their aspiration for spiritual upliftment and blessings.
        </p>
        <p className="text-gray-700 text-justify">
          Pilgrims visited the holy Kapil Muni Ashram, where Sage Kapil performed his penance, as well as the Gangasagar Sangam, where a holy dip is believed to absolve lifetimes of sins. The yatra also included kirtan, satsang, and devotional gatherings that deepened the spiritual atmosphere.
        </p>
        <p className="text-gray-700 text-justify">
          With hearts filled with devotion, participants returned with lasting impressions of divine grace, sacred memories, and a renewed commitment to their spiritual path.
        </p>
      </div>
    </div>
    {/* Carousel Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y1Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-full max-w-md h-auto object-cover" />
      </div>
    </div>
    </div>
      <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y3Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-full max-w-md h-auto object-cover" />
        </div>
      </div>
      {/* Write-up Section */}
      <div className="w-full md:w-1/2">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#1E3A8A]">Sri Mayapur Dhaam Yatra for Medicos</h2>
          <p className="text-gray-700 text-justify">
            From 26th to 29th November 2024, a special yatra to Sri Mayapur Dhaam was organized exclusively for medical professionals. Over the course of four days, the participating medicos immersed themselves in devotional practices, including mangalarati, japa meditation, kirtan, and scriptural discourses.
          </p>
          <p className="text-gray-700 text-justify">
            Key sites visited during the yatra included: Yogpeeth, Srila, Prabhupada’s Pushpa Samadhi Mandir, ISKCON Mayapur Mandir, Rajapur Jagannath Mandir, Goshala, Ganga Safari.
          </p>
          <p className="text-gray-700 text-justify">
            The participants returned uplifted and spiritually nourished, carrying the divine impressions of Mayapur Dhaam in their hearts.
          </p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
    {/* Write-up Section */}
    <div className="w-full md:w-1/2">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#1E3A8A]">Sri Mayapur Dhaam Yatra for Seniors</h2>
        <p className="text-gray-700 text-justify">
          A special Sri Mayapur Dham Yatra was organized for senior devotees, offering them a peaceful and spiritually uplifting retreat in the holy land of Sri Chaitanya Mahaprabhu.
        </p>
        <p className="text-gray-700 text-justify">
          The yatra provided a serene opportunity to reconnect with the sacred through daily temple darshans, kirtans, scriptural classes and japa sessions.
        </p>
        <p className="text-gray-700 text-justify">
          Time was also set aside for rest, reflection, and association, ensuring a balanced and fulfilling experience for the seniors.
        </p>
        <p className="text-gray-700 text-justify">
          The senior devotees returned home not only spiritually rejuvenated but also with hearts filled with gratitude and joy, carrying the holy vibrations of Mayapur Dham into their daily lives.
        </p>
      </div>
    </div>
    {/* Carousel Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y4Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-full max-w-md h-auto object-cover" />
      </div>
    </div>
    </div>
    <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y5Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-full max-w-md h-auto object-cover" />
        </div>
      </div>
      {/* Write-up Section */}
      <div className="w-full md:w-1/2">
        <div className="p-4 md:p-6">
          <h2 className="mx-auto mb-4 max-w-md text-xl font-semibold leading-tight text-[#1E3A8A] text-balance sm:text-2xl md:max-w-none md:text-3xl">
            <span className="block">Dakor / Somnath / Dwarka</span>
            <span className="block">Srinath-Jee Dhaam Yatra</span>
          </h2>
          <p className="text-gray-700 text-justify">
            A sacred and soul-enriching yatra to four prominent Vaishnava pilgrimage sites—Dakor, Somnath, Dwarka, and Srinathji (Nathdwara)—was held from 9th to 15th October 2024.
          </p>
          <p className="text-gray-700 text-justify">
            The yatra began at Dakor Dham, the abode of Sri Ranchhodrai. From there, devotees proceeded to the Somnath Jyotirlinga, one of the twelve sacred Shiva temples.
          </p>
          <p className="text-gray-700 text-justify">
            The yatra continued to Dwarka, the legendary city of Lord Krishna, where pilgrims visited: Dwarkadhish Temple, Rukmini Devi Temple, Bet Dwarka, Gopi Talab, Nageshwar Jyotirlinga.
          </p>
          <p className="text-gray-700 text-justify">
            Finally, the yatra concluded with darshan at Srinathji Temple in Nathdwara, Udaipur.
          </p>
          <p className="text-gray-700 text-justify">
            Throughout the pilgrimage, devotees engaged in bhajans, kirtans, satsangs, and daily scriptural reflections, which elevated the collective consciousness of the group.
          </p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
    {/* Write-up Section */}
    <div className="w-full md:w-1/2">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#1E3A8A]">Malda Yatra</h2>
        <p className="text-gray-700 text-justify">
          The Malda Dham Yatra held in August 2024 was a spiritually enriching pilgrimage. Key places visited included Kanai Natshala, where Mahaprabhu had a divine vision of Lord Krishna, and Ramkeli, the historic meeting place of Rupa and Sanatana Goswamis with the Lord.
        </p>
        <p className="text-gray-700 text-justify">
          A special highlight was the theatrical drama performed by the devotees, beautifully depicting the life and teachings of Sri Chaitanya Mahaprabhu.
        </p>
        <p className="text-gray-700 text-justify">
          The atmosphere was filled with joy, devotion, and heartfelt association, allowing participants to deepen their connection to Mahaprabhu’s mission and mood. The yatra left devotees spiritually nourished and inspired, carrying the blessings and divine impressions of Malda Dham and its sacred surroundings.
        </p>
      </div>
    </div>
    {/* Carousel Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y6Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-full max-w-md h-auto object-cover" />
      </div>
    </div>
    </div>
    </div>
  );
};

export default Yatras;
