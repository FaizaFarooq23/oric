import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
const Slideshow = () => {
  const images = [
    "images/imagallery4.jpg",
    "images/imagegallery5.jpg",
    "images/imagegallery2.jpg",
    "images/imagegallery6.jpg",
    
    // Add more image paths as needed
  ];
  const goToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
    <div className="flex transition-transform duration-500 ease-in-out h-90 w-full rounded-lg  ">
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        className="slideshow-image h-2/4 w-screen"
       
      />
    
   </div>
    </div>
  );
};

export default Slideshow;
