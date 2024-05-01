import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function EventFields({ data,onDelete }) {
  console.log(data);
  return (
    <div  className={`flex flex-col bg-white shadow-lg rounded-md  m-4 `}>
            <div className="flex justify-end items-center mr-6 mt-4">
        <button onClick={() => onDelete(data.id)}>
          <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
        </button>
      </div>
  
    <div  className="flex  flex-row  justify-between px-10 py-8">
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
          <span className="text-black ">{data.Sponcerned}</span>
        </div>
      </div>
      
    </div>
    </div>
  );
}
