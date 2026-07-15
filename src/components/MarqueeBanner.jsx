import React from "react";

const MarqueeBanner = () => {
  return (
    <>
      <div className="overflow-hidden whitespace-nowrap bg-[#1E3A8A] text-[#FFF7E0] border-b-2 border-[#F59E0B] py-2">
        <div className="inline-block px-4 text-lg font-semibold marquee hover:paused">
          || Hare Kṛṣṇa Hare Kṛṣṇa Kṛṣṇa Kṛṣṇa Hare Hare Hare Rāma Hare Rāma
          Rāma Rāma Hare Hare ||
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0%   { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          .marquee {
            display: inline-block;
            animation: marquee 15s linear infinite;
            animation-play-state: running;
          }

          .marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </>
  );
};

export default MarqueeBanner;
