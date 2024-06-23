import React, { useState, useEffect } from "react";
import Slideshow from "./components/Slideshow";
import axios from 'axios';
import { signIn, signOut, useSession } from "next-auth/react";

function Research_Gallery() {
  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
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
          signOut({ callbackUrl: "http://localhost:3000/" });
          return;
        }
        const response = await axios.get("/api/Research_Gallery/research_gallery");
        setInitialData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery === "") {
        setFilteredData(initialData);
      } else {
        const filtered = initialData.filter(item => {
          const searchValue = item.title.toLowerCase();
          return searchValue.includes(searchQuery.toLowerCase());
        });
        setFilteredData(filtered);
      }
    };

    handleSearch();
  }, [searchQuery, initialData]);

  return (
    <>
      <div className="container">
        <Slideshow />
      </div>
      <div>
        <hr className="my-4 border-t-2 color-black border-black-300" />
        <div className="flex flex-col justify-between">
        <div className="flex justify-end items-end my-4">
          <div className="relative w-1/3 flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword"
              className="w-full px-4 py-2 border rounded-l-lg bg-white focus:outline-2 focus:outline-blue-900"
            />
          </div>
        </div>
        <div className="text-2xl m-2 items-center text-center font-bold text-blue-900 justify-center align-center">
          <h1>Research Projects</h1>
        </div>
      
        </div>
      </div>
      <div className="grid grid-cols-2 my-2 mx-4 w-auto gap-x-20 gap-y-8">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className={`h-auto mt-8 bg-white shadow-lg rounded ${expandedCards[index] ? "h-auto" : "h-96"}`}
          >
            <div>
              <div className="px-4 py-2">
                <hr className="border-t-2 border-blue-900" />
                <h3 className="text-lg font-semibold">Title: {item.title}</h3>
                <hr className="border-t-2 border-blue-900" />
                <h3 className="text-base">Thematic Area: {item.Thematic_Area}</h3>
                <h3 className="text-base">Department: {item.Department_of_Pi}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Research_Gallery;
