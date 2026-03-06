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

  return (
    <div className="contact-us-container px-4 py-10 bg-gray-100 min-h-screen">
      <h1 className="page-title text-center text-4xl font-bold text-gray-800 mb-10">
        Yatra
      </h1>
      <div>
      <h1 className="page-title !text-left text-4xl !font-normal text-gray-800 mb-10">
        Upcoming Yatra
      </h1>
      <div className="max-w-md mx-auto bg-orange-100 rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ayodhya-Chitrakut Dham Yatra
        </h2>

        <p className="text-gray-600 mb-6">
          Join the spiritual journey to Ayodhya and Chitrakut in 2025.
          Experience peace, devotion, and culture.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bounce-pulse px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition duration-300 cursor-pointer"
        >
          Register for Yatra
        </button>
      </div>
      </div>
      <h1 className="page-title !text-left text-4xl !font-normal text-gray-800 mt-10 mb-10">
        Previous Yatra
      </h1>
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y1Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
        </div>
      </div>
      {/* Write-up Section */}
      <div className="w-full md:w-1/2">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ekachakra Dhaam Yatra</h2>
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
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
    {/* Write-up Section */}
    <div className="w-full md:w-1/2">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gangasagar Dhaam Yatra</h2>
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
          <img src={Y1Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
      </div>
    </div>
    </div>
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y3Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
        </div>
      </div>
      {/* Write-up Section */}
      <div className="w-full md:w-1/2">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sri Mayapur Dhaam Yatra for Medicos</h2>
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
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
    {/* Write-up Section */}
    <div className="w-full md:w-1/2">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sri Mayapur Dhaam Yatra for Seniors</h2>
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
          <img src={Y4Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
      </div>
    </div>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y5Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
        </div>
      </div>
      {/* Write-up Section */}
      <div className="w-full md:w-1/2">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dakor/Somnath/Dwarka/Srinath-Jee Dhaam Yatra</h2>
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
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-stretch mt-10">
    {/* Write-up Section */}
    <div className="w-full md:w-1/2">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Malda Yatra</h2>
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
          <img src={Y6Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
      </div>
    </div>
    </div>
    </div>
  );
};

export default Yatras;
