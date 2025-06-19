import React from "react";
import { useInView } from "react-intersection-observer";

const AnimatedParagraph = ({ text, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const animationClass = inView
    ? index % 2 === 0
      ? "slide-in-left"
      : "slide-in-right"
    : "";

  return (
    <div ref={ref} className={`paragraph ${animationClass}`}>
      <p>
        {text.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < text.split("\n").length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default AnimatedParagraph;
