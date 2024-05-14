import React, { useState ,useEffect } from "react";
import Slideshow from "./components/Slideshow";
import axios from 'axios';
import { signIn, signOut, useSession } from "next-auth/react";
function Research_Gallery() {
  // const initialData = [
  //   {
  //     img: "images/profile.png",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  //   {
  //     img: "images/imagegallery6.jpg",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  //   {
  //     img: "images/profile.png",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  //   {
  //     img: "images/profile.png",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  //   {
  //     img: "images/profile.png",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  //   {
  //     img: "images/profile.png",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  //   {
  //     img: "images/profile.png",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  //   {
  //     img: "images/profile.png",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  //   {
  //     img: "images/profile.png",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  //   {
  //     img: "images/profile.png",
  //     username: "Dr. John Doe",
  //     email: "johndoe@gmail.com",
  //     title: "Evaluation of Imapct of AI on Cybersecurity",
  //     thematic_area: "AI",
  //     des: `Lorem ipsum dolor sit amet consectet  Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectetLorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectet`,
  //   },
  // ];
  const [initialData, setInitialData] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  useEffect(() => {
    const fetchData = async () => {
      try {
          // Check if the user is authenticated
      if (!session || !session.user || !session.user.username) {
        alert("Please log in to continue");
        signOut();
        return;
      }
        const response = await axios.get("/api/Research_Gallery/research_gallery");
        setInitialData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
      <div className="container">
        <Slideshow />
      </div>
      <div>
      <hr className="my-4 border-t-2 color-black border-black-300 " />
      <div className="text-2xl m-2 items-center text-center font-base  justify-center align-center italic font-sans ">
        <h1>Research Projects</h1>
      </div>
      </div>
      <div className="grid grid-cols-2 my-2 mx-4 w-auto  gap-x-20 gap-y-8">
        {initialData.map((item, index) => (
          <div
            key={index}
            className={`h-auto mt-8 bg-white shadow-lg rounded  ${
              expandedCards[index] ? "h-auto" : "h-96"
            }`}
          >
            <div >
                <div className="px-4 py-2">
               <hr className="border-t-2 border-blue-900" />           
                <h3 className="text-lg font-semibold">Title: {item.title}</h3>
                <hr className="border-t-2 border-blue-900" />
                <h3 className="text-base">
                  Thematic Area : {item.thematic_area}
                </h3>
                <h3 className="text-base">
                  Department : {item.Department_of_Pi}
                </h3>
                
               
              </div>
              </div>
             
            </div>
        ))}
      </div>
    </>
  );
}

export default Research_Gallery;
