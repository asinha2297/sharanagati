import React from "react";
import "../styles/AboutUs.css";
import AnimatedParagraph from "./AnimatedParagraph";

const paragraphs = [
  "Rooted in the teachings of His Divine Grace A.C. Bhaktivedanta Swami Shrila Prabhupada, and inspired by the mercy of Sri Sri Nitai Gauranga and Lord Narasimhadeva, Sarnagati department serves as a bridge between Vedic knowledge and modern life.\nThe Sarnagati Department, led by Dr. Govind Ghosh Das Prabhuji under the divine guidance of ISKCON Newtown, is dedicated to spreading the timeless wisdom of the Bhagavad-gita and nurturing spiritual values across all sections of society.",
  "Gurukul Programs: Cultivating character, values, and devotion in children through structured spiritual and value-based education.",
  "Medical Student Programs: Equipping future doctors with inner strength and clarity through Bhagavad-gita wisdom, supporting their mental and emotional well-being.",
  "Elderly & Youth Classes: Engaging senior citizens and young individuals with practical teachings to lead a meaningful, Krishna-conscious life.",
  "Online Courses: Reaching hearts far and wide through virtual classes, allowing anyone to access authentic spiritual education from the comfort of their home.",
  "Spiritual Yatras: Organizing devotional pilgrimages and yatras that deepen spiritual connection and build strong devotional communities.",
  "Our mission is to cultivate a Krishna-conscious society by developing inner transformation through the Bhagavad-gita, fostering compassion, responsibility, and devotion. Through personal guidance and group study, we strive to plant the seeds of surrender (śaraṇāgati) and bhakti in every heart.\nJoin us in this divine journey toward eternal knowledge, peace, and spiritual upliftment.",
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="page-title">About Us</h1>
      {paragraphs.map((text, index) => (
        <AnimatedParagraph key={index} text={text} index={index} />
      ))}
    </div>
  );
};

export default AboutUs;
