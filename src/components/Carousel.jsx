import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carousel.css";

const images = [
  {
    src: "https://iskconnewtown.com/wp-content/uploads/2024/01/nitai-gauranga-iskconnewtown.jpg",
    caption: "",
  },

  {
    src: "https://iskconnewtown.com/wp-content/uploads/2024/02/ISKCON-Newtown-Mayapur-Kolkata-12-e1743884678688.jpeg",
    caption: "",
  },
  {
    src: "https://iskconnewtown.com/wp-content/uploads/2024/01/nitai-gauranga-iskconnewtown.jpg",
    caption: "",
  },
  {
    src: "https://iskconnewtown.com/wp-content/uploads/2024/02/ISKCON-Newtown-Mayapur-Kolkata-12-e1743884678688.jpeg",
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
