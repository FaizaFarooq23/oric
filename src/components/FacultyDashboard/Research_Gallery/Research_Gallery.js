import React, { useEffect, useState } from "react";

function Research_Gallery() {
  const data = [
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

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <div className="flex flex-wrap  mx-4 w-auto  gap-x-20 gap-y-8">
        {data.map((data, index) => (
          <div
            className={`w-80 h-auto mt-8 bg-white shadow-lg rounded transition-transform transform hover:scale-x-110 hover:scale-y-110 ${
              expanded ? "h-auto" : "h-96"
            }`}
          >
            <div className="flex flex-row gap-x-8">
              <img
                className="b-2 b-black h-15 w-20 rounded-full"
                src={data.img}
              />
              <div>
                <h1 className="mt-4">{data.username}</h1>
                <h1 className="text-base">{data.email}</h1>
              </div>
            </div>
            <div className="b-4 mt-2">
              <hr className="border-t-2 border-blue-900" />
            </div>
            <div className="flex flex-col px-4 py-2">
              <h3 className="text-lg font-semibold">
                Title: {data.title}
              </h3>
              <h3 className="text-base">
                Thematic Area : {data.thematic_area}
              </h3>
              <h3>Description</h3>
              <p
                className={`text-justify py-2 ${
                  expanded ? "" : "max-h-20 overflow-hidden"
                }`}
              >
                {data.des}
              </p>
            </div>
            <div className="flex justify-end items-end px-2 ">
              {expanded ? (
                <button className="text-gray-500" onClick={toggleExpand}>
                  Read Less
                </button>
              ) : (
                <button className="text-gray-500" onClick={toggleExpand}>
                  Read More
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Research_Gallery;
