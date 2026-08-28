import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Testimonials.css";

const testimonials = [
  {
    name: "Srabani Mataji",
    role: "MBBS, Coochbehar Medical College",
    quote:
      "Tamanna mataji is a beautiful soul and a divine healer. I am extremely grateful and fortunate to get her association. I was feeling extremely stuck and was merely not being able to figure out where was I actually going wrong. She held my hands when I was going through mental turmoil and gave me the Supreme guidance. The solutions that the Akashic reading provided was an eye opener and helped me rectify the small to the bigger causes of my problems. The insights and vision I have gotten gave me profound clarity and a sense of security. I feel much lighter now and am slowly being able to release the baggage of trauma, guilt, complaints and grudges that I had held for many many lifetimes. Thank you for everything.",
  },
  {
    name: "Sinjini Mataji",
    role: "NEET Aspirant",
    quote:
      "Tamanna Mataji is truly a beautiful soul. Her knowledge, genuineness and humility truly translate through the way she explains and puts together everything she has received in the guidance while doing akashic. Being in touch with her and having her do the Akashic reading for me has helped me a lot. Ever since our conversation about the Akashic Report, I feel less burdened by unwanted emotions, less scared of the future, and less guilty about the past. I feel truly blessed and grateful to have the good fortune of being in touch with such a great soul. Thank you Mataji, Thank you Prabhuji.",
  },
  {
    name: "Annu Sinha",
    role: "Assistant Manager, EY",
    quote:
      "I feel Tamanna Mataji's association is a blessing for me. She is a compassionate soul whose sincerity, humility, and depth of understanding are deeply reflected in the way she conducts the Akashic reading and explains the guidance received. When I approached her, I was carrying many unanswered questions, emotional burdens, and personal struggles that I could not fully understand on my own. The reading gave me a completely different perspective, helping me gain clarity about the deeper roots of my challenges and how to consciously deal with them. The guidance helped me become more aware of my thoughts, responses, emotions, attachments, and past patterns, and encouraged me to consciously work towards releasing what was no longer serving me. I feel much more peaceful, lighter, and guided after the session. There is a greater sense of acceptance within me, along with a clearer understanding of the path I need to walk forward. Thank you so much, Mataji, for everything. Hari Bol. Hare Krishna.",
  },
];

const NextArrow = ({ onClick }) => (
  <div className="testimonial-arrow next" onClick={onClick} role="button" aria-label="Next testimonial">
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="testimonial-arrow prev" onClick={onClick} role="button" aria-label="Previous testimonial">
    ❮
  </div>
);

const Testimonials = () => {
  const slidesToShow = Math.min(2, testimonials.length);

  const settings = {
    dots: true,
    infinite: testimonials.length > slidesToShow,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: testimonials.length > slidesToShow,
    autoplaySpeed: 6000,
    arrows: testimonials.length > slidesToShow,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  return (
    <div className="testimonials-wrapper">
      <Slider {...settings}>
        {testimonials.map((item) => (
          <div key={item.name} className="testimonial-slide-outer">
            <article className="testimonial-card">
              <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{item.name}</span>
                <span className="testimonial-role">{item.role}</span>
              </div>
            </article>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
