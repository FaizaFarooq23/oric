import React from "react";
export default function EventFields({ data }) {
  console.log(data);
  return (
    <div className={` flex justify-between bg-white shadow-lg rounded-md px-10 py-8 gap-y-10 mt-4 `}>
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Title</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Title_of_Event}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Start Date</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Date_of_Event.split("T")[0]}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Adressed To</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Community}</span>
        </div>
      </div>
      
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Venue</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Venue}</span>
        </div>
      </div>
      
      
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Soceity</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Name_of_Collaborating_org}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Sponcerned</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Sponcerened}</span>
        </div>
      </div>
      
    </div>
  );
}
