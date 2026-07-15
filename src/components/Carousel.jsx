import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carousel.css";
import Image1 from "../assets/NP-5.png";
import Image2 from "../assets/IMG-20240911-WA0005.jpg";
import Image3 from "../assets/IMG-20250119-WA0005.jpg";
import Image4 from "../assets/IMG-20250119-WA0010.jpg";

const images = [
  {
    src: Image1,
    caption: "",
  },
  {
    src: Image2,
    caption: "",
  },
  {
    src: Image3,
    caption: "",
  },
  {
    src: Image4,
    caption: "",
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
