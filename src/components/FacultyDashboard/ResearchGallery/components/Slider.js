import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Slider({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerPage = 3;

  const nextSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === data.length - slidesPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === 0 ? data.length - slidesPerPage : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <FaChevronLeft
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-blue-500 text-3xl cursor-pointer"
        onClick={prevSlide}
      />
      <FaChevronRight
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-blue-500 text-3xl cursor-pointer"
        onClick={nextSlide}
      />
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * (100 / slidesPerPage)}%)` }}>
          {data.map((item, index) => (
            <div key={index} className="w-1/3 px-4">
              <div className="bg-white shadow-lg rounded-lg">
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <img
                      className="border-2 border-black h-15 w-20 rounded-full mr-4"
                      src={item.img}
                      alt="Profile"
                    />
                    <div>
                      <h1 className="mt-1 text-lg font-semibold">{item.username}</h1>
                      <h1 className="text-base">{item.email}</h1>
                    </div>
                  </div>
                  <hr className="border-t-2 border-blue-900 mb-2" />
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Title: {item.title}</h3>
                    <h3 className="text-base">Thematic Area: {item.thematic_area}</h3>
                  </div>
                  <div className="overflow-hidden" style={{ maxHeight: "5rem" }}>
                    <p className="text-sm text-justify">{item.des}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
