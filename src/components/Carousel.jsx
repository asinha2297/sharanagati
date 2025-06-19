import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carousel.css";

const images = [
  {
    src: "https://images.unsplash.com/photo-1604014238170-7ec19bde58ee?auto=format&fit=crop&w=1400&q=80",
    caption: "Explore the Red Horizon",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    caption: "Black Serenity Ocean",
  },
  {
    src: "https://images.unsplash.com/photo-1604079628049-9434c3e92d19?auto=format&fit=crop&w=1400&q=80",
    caption: "Blue Skies Calling",
  },
];

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {images.map((item, idx) => (
          <div key={idx} className="carousel-slide">
            <img src={item.src} alt={item.caption} className="carousel-img" />
            <div className="carousel-caption">
              <h2>{item.caption}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = ({ onClick }) => (
  <div className="arrow next" onClick={onClick}>
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="arrow prev" onClick={onClick}>
    ❮
  </div>
);

export default Carousel;
