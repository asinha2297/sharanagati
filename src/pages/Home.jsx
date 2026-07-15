import React from "react";
import MarqueeBanner from "../components/MarqueeBanner";
import Carousel from "../components/Carousel";
import UpcomingEvents from "../components/UpcomingEvents";

const Home = () => {
  return (
    <div>
      <MarqueeBanner />
      <Carousel />
      <UpcomingEvents />
    </div>
  );
};

export default Home;
