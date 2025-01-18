import React, { useState, useEffect } from "react";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagePaths = [
    "/assets/deal_1.png",
    "/assets/deal_2.png",
    "/assets/deal_3.png",
    "/assets/deal_4.png",
    "/assets/deal_5.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % imagePaths.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [imagePaths.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease",
        }}
      >
        {imagePaths.map((path, index) => (
          <div className="slides" key={index}>
            <img src={path} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {imagePaths.map((_, index) => (
          <button
            key={index}
            className={`indicator ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
