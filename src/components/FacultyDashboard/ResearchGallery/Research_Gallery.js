import React, { useState } from "react";
import Slideshow from "./components/Slideshow";
import Slider from "./components/Slider";

function Research_Gallery() {
  const initialData = [
    {
      img: "images/profile.png",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
    {
      img: "images/imagegallery6.jpg",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
    {
      img: "images/profile.png",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
    {
      img: "images/profile.png",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
    {
      img: "images/profile.png",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
    {
      img: "images/profile.png",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
    {
      img: "images/profile.png",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
    {
      img: "images/profile.png",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
    {
      img: "images/profile.png",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
    {
      img: "images/profile.png",
      username: "Dr. John Doe",
      email: "johndoe@gmail.com",
      title: "Evaluation of Imapct of AI on Cybersecurity",
      thematic_area: "AI",
      des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
    },
  ];

  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (index) => {
    setExpandedCards((prevExpandedCards) => {
      return {
        ...prevExpandedCards,
        [index]: !prevExpandedCards[index],
      };
    });
  };

  return (
    <>
      <div className="container">
        <Slideshow />
      </div>
      <hr className="my-4 border-t-2 color-black border-black-300 " />
      <div className="text-2xl m-2 items-center text-center font-base  justify-center align-center italic font-sans ">
        <h1>Research Projects</h1>
      </div>
      {/* <div>
        <Slider data={initialData}/>
        </div> */}
      <div className="flex flex-wrap mt-8 mx-4 w-auto  gap-x-20 gap-y-8">
        {initialData.map((item, index) => (
          <div
            key={index}
            className={`w-72 h-auto mt-8 bg-white shadow-lg rounded transition-transform transform hover:scale-x-110 hover:scale-y-110 ${
              expandedCards[index] ? "h-auto" : "h-96"
            }`}
          >
            <div className="flex flex-row gap-x-8">
              <img
                className="b-2 b-black h-15 w-20 rounded-full"
                src={item.img}
              />
              <div>
                <h1 className="mt-4">{item.username}</h1>
                <h1 className="text-base">{item.email}</h1>
              </div>
            </div>
            <div className="b-4 mt-2">
              <hr className="border-t-2 border-blue-900" />
            </div>
            <div>
              <div className="flex flex-col px-4 py-2">
                <h3 className="text-lg font-semibold">Title: {item.title}</h3>
                <h3 className="text-base">
                  Thematic Area : {item.thematic_area}
                </h3>
                <h3>Description</h3>
                <p
                  className={`text-justify py-2 ${
                    expandedCards[index] ? "" : "max-h-20 overflow-hidden"
                  }`}
                >
                  {item.des}
                </p>
              </div>
              <div className="flex justify-end items-end px-2 ">
                <button
                  className="text-gray-500"
                  onClick={() => toggleExpand(index)}
                >
                  {expandedCards[index] ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Research_Gallery;
