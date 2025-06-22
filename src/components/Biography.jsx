import React from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ggd from "../assets/ggd.jpeg";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../styles/Biography.css";

const paragraphVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.6,
      duration: 1.2,
      ease: "easeOut",
    },
  }),
};

const Biography = () => {
  const paragraphs = [
    `Sharanagati is a dedicated spiritual and educational initiative under ISKCON Newtown Kolkata, aiming to make Vedic knowledge, Bhagavad Gita teachings, and spiritual science accessible in modern life. It is led by Shri Govind Ghosh Das (formerly Dr. Shrikanta Ghosh), a medical doctor turned monk, who blends deep spiritual insight with a scientific temperament.`,
    `Shri Govind Ghosh Das completed his MBBS from Calcutta Medical College (2006–2011). A former district school topper and top-100 WBJEE rank holder, he encountered ISKCON teachings in 2005 during medical entrance preparation. He completed the Bhagavad Gita even before entering medical school.`,
    `After years in medical practice, specializing in Surgical Gastroenterology and Intensive Care (including at KPC Medical College), he chose a path of spiritual dedication. In 2014, he formally accepted the brahmacharya order and became a full-time monk with ISKCON Kolkata.`,
    `He is especially admired for his ability to connect ancient scriptural wisdom with modern-day challenges, making him a beloved speaker among students, professionals, and spiritual seekers.`,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6 md:p-12 poppins-font">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          Shri Govind Ghosh Das
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Spiritual Leader • Monk • Educator • Medical Doctor
        </p>

        <div className="flex justify-center mb-12">
          <LazyLoadImage
            src={ggd}
            alt="Shri Govind Ghosh Das"
            className="rounded-full shadow-2xl hover:scale-105 transition-transform duration-500"
            effect="blur"
            width={220}
            height={220}
          />
        </div>

        <div className="space-y-6 text-left text-gray-700 leading-relaxed">
          {paragraphs.map((text, index) => (
            <motion.p
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={paragraphVariants}
              viewport={{ once: true, amount: 0.5 }}
            >
              {text}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: paragraphs.length * 0.6 + 0.4, duration: 1.2 }}
            viewport={{ once: true }}
            className="bg-orange-100 p-6 rounded-xl shadow-md mt-10"
          >
            <h2 className="text-xl font-semibold text-orange-700 mb-2">
              Mission & Activities
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              <li>
                Disseminating teachings of the Bhagavad Gita and Srimad
                Bhagavatam
              </li>
              <li>Promoting value-based education for all age groups</li>
              <li>
                Conducting Bhakti-vriksha programs for spiritual communities
              </li>
              <li>Guiding spiritual tours to holy places in India</li>
              <li>Teaching Vedic Cosmology in relation to modern science</li>
              <li>
                Encouraging congregational chanting (kirtan) and devotional
                practices
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
