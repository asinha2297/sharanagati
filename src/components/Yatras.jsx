import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ContactUs.css";
import Y1Img1 from "../assets/Ekachakra.jpg";
import Y2Img1 from "../assets/IMG_20241215_114935.jpg";
import Y3Img1 from "../assets/Medicos.jpg";
import Y4Img1 from "../assets/Snehodiya.jpg";
import Y5Img1 from "../assets/Dwarka.jpg";
import Y6Img1 from "../assets/Malda.jpg";
import Y7Img1 from "../assets/IMG_0880.jpg";
import Y8Img1 from "../assets/IMG_0535.jpg";
import Y9Img1 from "../assets/IMG_8725.jpg";
import Y10Img1 from "../assets/IMG_20240127_141036.jpg"; //Sri Remuna Khirchor Gopinath Yatra 2024
import Y11Img1 from "../assets/20231026_115857.jpg"; //Sri Jaipur Yatra 2023
import Y12Img1 from "../assets/20221003_090827.jpg"; //Sri Vrindavan Dhaam Yatra 2022


const Yatras = () => {
  const navigate = useNavigate();

  const upcomingYatra = {
    intro: [
      "We are very happy to let you know that we are having this year's Durga Puja yatra from 16-10-2026 to 20-10-2026.",
      "Shri Ahobilam Dham is the holy place where Lord Narasimha appeared to protect His dear devotee Prahlad. We will take darshan of 9 special forms of Sri Nrsimhadev there.",
      "Along with darshan of Panaka Nrsimha at Vijayawada, where devotees can offer panakam/gur water to Sri Nrsimhadev, we will also take darshan of Sri Lakshmi Narsimha established by the Pandavas and visit Vedadri Nrsimhadev (around 80 kms one way).",
    ],
    itinerary: [
      "16-10-2026: Train will depart from Kolkata to Vijayawada.",
      "17-10-2026: Arrival at Vijayawada and hotel accommodation.",
      "17-10-2026 (After lunch prasadam; by bus): Leaving for Vedadri.",
      "18-10-2026 (Early morning by bus): Visit to the sacred Panakala Lakshmi Narasimha Swamy Temple, Mangalagiri, for divine darshan.",
      "18-10-2026 afternoon (By train): Departure for Nandyal Station from Vijayawada at 13:10 hrs.",
      "18-10-2026 night (By bus): Arrival at Nandyal Railway Station.",
      "Upon arrival, devotees will board buses for Ahobilam (1 hour drive). On reaching Ahobilam, room check-in to guest house.",
      "19-10-2026 and 20-10-2026: Darshan of Lower Ahobilam and Upper Ahobilam temples. Trekking to Ugra6 stambha on 20th Oct.",
      "20-10-2026 (Night): Leave from Ahobilam to Nandyal by 1 hour bus drive and then take train at night.",
    ],
    trainDetails: [
      {
        title: "Kolkata to Vijayawada",
        date: "Friday 16-10-2026",
        notes: [
          "Daily trains: From Howrah 12841 (15:10pm --> 10:10am next day), From Shalimar 18045 (11:15am --> 10:30 AM next day).",
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
          "18048 (20:25pm --> 23:45 pm next day).",
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
      "Category A - AC Double Bed Rooms: 8000",
      "Category B - AC Triple Bed Rooms: 7500",
      "Children below 3 years: No charges",
      "Children 3-17 years (till class 12): 5000 per child",
      "Above 17 years: Full charges",
      "Charges include pickup/drop from station, prasadam during yatra, accommodation, and internal travel.",
      "Train journey fare and train prasadam charges are not included.",
      "Room allotment will be first-come, first-served. We can take only 80 devotees in the first hotel.",
      "Those who register earlier will be given priority in room allocation at the hotel where the programs, classes, and kirtans will be held (no changes in any condition).",
      "Priority will be given to those who attend classes on a regular basis.",
      "After first hotel fills up, nearby hotels will be allotted.",
    ],
    registrationGuidelines: [
      "Registration begins online from 15-07-2026.",
      "Registration amount per devotee: Category A 4000, Category B 3800, Child 2500 (adjusted in total amount).",
      "Last Date of Registration: 31-07-2026.",
      "After 31st July - Late registration fee Rs 500 per person extra.",
      "Last Date of Full Payment: 01-09-2026.",
      "Advance booking will open on 19-08-2026 at 8:00 AM IST.",
      "Only registered devotees (with registration payment) will be added to the yatra WhatsApp group for updates.",
    ],
    cancellationPolicy: [
      "02-09-2026 to 14-09-2026 = 25% of total amount per person",
      "15-09-2026 to 08-10-2026 = 50% of total amount per person",
      "After 09-10-2026 = No refund",
    ],
    contactDetails: [
      { name: "Rounak Ranjan Singh", phone: "7972185705" },
      { name: "Pritam Saha", phone: "7980949913" },
    ],
  };

  const jaipurYatra = {
    places: [
      "Pushkar (150 km): Brahma Ji Temple and Savitri Devi Temple.",
      "Karauli (180 km): Sri Sri Radha Madan Mohan, originally served by Srila Sanatana Gosvami in Vrindavan.",
      "Jaipur temples: Sri Sri Radha Govind Dev (originally served by Srila Rupa Goswami), Radha Gopinath (Madhu Pandit), Radha Vinodilal (Srila Lokanath Goswami), and Radha Madhava at Kanak Vrindavan (Srila Jayadeva Goswami).",
      "Sightseeing: City Palace, Jantar Mantar, Amer Fort, Jal Mahal, Kanak Vrindavan, Jaigarh Fort, Nahargarh Fort, Galtaji, and Hawa Mahal.",
    ],
    itinerary: [
      "03 Dec: Depart Kolkata for Jaipur by train.",
      "04 Dec: Arrive in Jaipur; hotel check-in, katha, darshan of Radha Govind Dev, Radha Damodar, and Radha Vinodilal, followed by kirtan and prasadam.",
      "05 Dec (Utpanna Ekadashi): Mangala Aarti and japa; parikrama and dancing kirtan at Radha Govind Dev; Radha Gopinath darshan, local sightseeing, classes, kirtan, and prasadam.",
      "06 Dec (fast breaking): After Mangala Aarti, travel to Karauli for Radha Madan Mohan darshan; Galtaji if time permits, then Radha Gopinath darshan.",
      "07 Dec: Mangala Aarti, japa, classes, Kanak Vrindavan, Amer Fort, and Jaipur sightseeing.",
      "08 Dec: Mangala Aarti, japa, depart for Pushkar, classes, and kirtan.",
      "09 Dec: Galtaji, Jaigarh Fort, and Nahargarh Fort.",
      "10 Dec: Depart Jaipur by train. Arrival in Kolkata is expected on 11 Dec.",
    ],
    trains: [
      [
        "First preference, Thu 03 Dec: Ananya Express (12315), Kolkata 13:10 to Jaipur 15:55 next day (26h 45m).",
        "Alternative: HWH BKN Express (22307), Howrah 23:30 to Jaipur 23:35 next day.",
        "Alternative: SDAH-ALL SF Express (12987), Sealdah 22:55 to Jaipur 23:15 next day.",
        "Star-marked trains are preferred to match the yatra schedule.",
      ],
      [
        "Thu 10 Dec: Pratap SF Express (12495), departure 11:35, arrival 13:05.",
        "ALL-SDAH SF Express (12988), departure 14:40, arrival 15:50 next day (25h 10m).",
        "JU HWH SF Express (12308), departure 04:40, arrival 04:55 next day (24h 15m).",
      ],
      [
        "Approximate one-way fares: Sleeper ₹700; 3E ₹1,680; 3A ₹1,780; 2A ₹2,530; 1A ₹4,250.",
        "Outbound booking opens 04 Oct 2026 at 8:00 AM IST.",
        "Return booking opens 10 or 11 Oct, depending on the train.",
      ],
    ],
    expenses: [
      "Hotel: AC double sharing ₹9,500 per person; AC triple sharing ₹8,800 per person.",
      "Children below 5: no charge. Ages 5–10: ₹4,700. Ages 10–17 and medical students: ₹6,800.",
      "Registration deposit: double sharing ₹4,800; triple sharing ₹4,400; child/medical student ₹3,800. Deposit is adjusted against the total.",
      "Registration opens online 28 Sep. Registration closes 01 Oct; full payment is due 21 Oct 2026.",
      "Train tickets and train prasadam, station pickup/drop, journey prasadam, local temple transport, sightseeing entry tickets, and the Pushkar ropeway are not included. Budget approximately ₹1,250 per adult or ₹500–₹600 per student for entry and local travel; carry student ID for discounts.",
      "Indicative entry fees: Amer Fort ₹200 adult/₹50 student; Jantar Mantar and Hawa Mahal ₹100/₹20; Nahargarh Fort ₹100/₹20; City Palace ₹300 adult/₹150 student or child; Jaigarh Fort ₹150 adult/₹50 student/₹75 child; Savitri Temple ropeway ₹180 adult/₹140 child (ages 3–10).",
      "Room capacity at the first hotel is 75. Allocation is first-come, first-served; early registrants receive priority at the program hotel. After checkout on 10 Dec, further stay is self-arranged.",
    ],
    guidelines: [
      "Children below 5 are free; children aged 5–10 pay ₹4,700; ages 10–17 and medical students pay ₹6,800.",
      "Students with at least 75% class attendance receive first priority. Medical-student sponsorship is subject to at least 75% attendance and room availability; otherwise full payment applies.",
      "This is a spiritual yatra. Participants are expected to attend lectures, follow the schedule, and maintain the devotional mood. Failure to follow the yatra expectations may result in being asked to leave the hotel.",
      "Only devotees who pay the registration deposit will be added to the yatra WhatsApp group for updates.",
    ],
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
      <section className="mb-10 max-w-full rounded-2xl border border-[#D4AF37]/20 bg-white p-6 text-center shadow-lg md:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#B45309]">December 2026</p>
        <h2 className="mb-4 text-2xl font-semibold text-[#1E3A8A] md:text-3xl">Journey to Gupta Vrindavan: Jaipur Yatra</h2>
        <p className="mb-6 text-left leading-relaxed text-gray-700">The important deities of Vrindavan were moved to Jaipur and Karauli around 300 years ago. Join us for darshan, katha, kirtan, and a journey through these sacred places.</p>

        <div className="mb-6 space-y-6 text-left text-gray-700">
          <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
            <h3 className="mb-3 text-lg font-semibold text-[#1E3A8A]">Sacred Places and Sightseeing</h3>
            <ul className="space-y-2 text-sm leading-relaxed md:text-base">
              {jaipurYatra.places.map((place) => <li key={place}>• {place}</li>)}
            </ul>
          </section>

          <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
            <h3 className="mb-3 text-lg font-semibold text-[#1E3A8A]">Tentative Itinerary</h3>
            <ol className="space-y-2 text-sm leading-relaxed md:text-base">
              {jaipurYatra.itinerary.map((item) => <li key={item}>• {item}</li>)}
            </ol>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-[#1E3A8A]">Train Details and Booking</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {jaipurYatra.trains.map((item, index) => (
                <div key={item} className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4 text-left">
                  <h4 className="mb-2 font-semibold text-[#1E3A8A]">{["Kolkata to Jaipur", "Jaipur to Kolkata", "Train Fares and Booking Dates"][index]}</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
                    {item.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
              <h3 className="mb-3 text-lg font-semibold text-[#1E3A8A]">Stay, Registration, and Room Allocation</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                {[...jaipurYatra.expenses.slice(0, 4), jaipurYatra.expenses[6]].map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </section>

            <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
              <h3 className="mb-3 text-lg font-semibold text-[#1E3A8A]">Registration Guidelines</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                {jaipurYatra.guidelines.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </section>
          </div>

          <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
            <h3 className="mb-3 text-lg font-semibold text-[#1E3A8A]">Travel Exclusions and Sightseeing Fees</h3>
            <ul className="space-y-2 text-sm leading-relaxed">
              {jaipurYatra.expenses.slice(4, 6).map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </section>

          <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
            <h3 className="mb-2 text-lg font-semibold text-[#1E3A8A]">Contact Details</h3>
            <p className="text-sm leading-relaxed">Rounak prabhu: +91 79721 85705</p>
          </section>
        </div>

        <button onClick={() => navigate("/register/jaipur")} className="rounded-md bg-[#F59E0B] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#D97706]">
          Register for Jaipur Yatra
        </button>
      </section>
      <div className="max-w-full mx-auto bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-6 md:p-8 text-center">
        <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
          Ahobilam-Vijayawada Dhaam Yatra
        </h2>

        <h3 className="text-xl font-semibold text-red-600 mb-4">
          🔔 Please Note: The new registration for the Yatra has now been closed.
        </h3>

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
            <ul className="space-y-1 text-sm text-red-700 leading-relaxed">
              {upcomingYatra.cancellationPolicy.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4">
            <h3 className="text-lg font-semibold text-[#1E3A8A] mb-2">Contact Details</h3>
            <ul className="space-y-1 text-sm leading-relaxed">
              {upcomingYatra.contactDetails.map((contact) => (
                <li key={contact.phone}>
                  • {contact.name}: {contact.phone}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* <button
          disabled
          style={{ cursor: "not-allowed" }}
          className="px-6 py-3 bg-[#808080] text-red-500 font-semibold rounded-md shadow-md
                    opacity-70"
        >
          Registration closed
        </button> */}

        <button
          onClick={() => navigate("/register")}
          className="bounce-pulse px-6 py-3 bg-[#F59E0B] hover:bg-[#d97706] text-white font-semibold rounded-md shadow-md transition duration-300 cursor-pointer"
        >
          Resume existing registration
        </button>
      </div>
      </div>
      <h1 className="page-title !text-left text-4xl !font-normal text-[#1E3A8A] mt-10 mb-10">
        Previous Yatra
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y7Img1} alt="Medicos Ekachakra Yatra 2026" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Medicos Ekachakra Yatra 2026</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y8Img1} alt="Tirupati Kanchipuram Srirangam Yatra 2025" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Tirupati Kanchipuram Srirangam Yatra 2025</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y9Img1} alt="Sri Chitrakoot Ayodhya Yatra 2025" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Sri Chitrakoot Ayodhya Yatra 2025</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y1Img1} alt="Ekachakra Dhaam Yatra" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Ekachakra Dhaam Yatra</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y2Img1} alt="Gangasagar Dhaam Yatra" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Gangasagar Dhaam Yatra</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y3Img1} alt="Sri Mayapur Dhaam Yatra for Medicos" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Sri Mayapur Dhaam Yatra for Medicos</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y4Img1} alt="Sri Mayapur Dhaam Yatra for Seniors" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Sri Mayapur Dhaam Yatra for Seniors</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y5Img1} alt="Dakor / Somnath / Dwarka / Srinath-Jee Dhaam Yatra" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="mx-auto max-w-xs text-sm font-semibold leading-tight text-[#1E3A8A] text-center text-balance sm:max-w-sm sm:text-base md:max-w-md md:text-lg">
              <span className="block">Dakor / Somnath / Dwarka</span>
              <span className="block">Srinath-Jee Dhaam Yatra</span>
            </h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y6Img1} alt="Malda Yatra" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Malda Yatra</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y10Img1} alt="Sri Remuna Khirchor Gopinath Yatra 2024" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Sri Remuna Khirchor Gopinath Yatra 2024</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y11Img1} alt="Sri Jaipur Yatra 2023" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Sri Jaipur Yatra 2023</h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#D4AF37]/20 shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <img src={Y12Img1} alt="Sri Vrindavan Dhaam Yatra 2022" className="h-56 w-full rounded-lg object-cover shadow sm:h-64 lg:h-72" />
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Sri Vrindavan Dhaam Yatra 2022</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yatras;
