import React, { useState, useEffect } from "react";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagePaths = [
    "./public/assets/deal_1.png",
    "./public/assets/deal_2.png",
    "./public/assets/deal_3.png",
    "./public/assets/deal_4.png",
    "./public/assets/deal_5.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % imagePaths.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [imagePaths.length]);

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
    </div>
  );
};

export default Carousel;
