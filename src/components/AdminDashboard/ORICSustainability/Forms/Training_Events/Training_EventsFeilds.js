import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import TrainingEventsDataDisplay from "./Trainings_Events_Data";

export default function TrainingEventsField({ data, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`flex flex-col bg-white shadow-lg rounded-md m-4`}>
      <div className="flex justify-end items-center mr-6 mt-4">
        <button onClick={() => onDelete(data.id)}>
          <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
        </button>
      </div>
      <div className="flex flex-row justify-between px-10 py-8">
        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">Category</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.Category}</span>
          </div>
        </div>
        
        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">Title of Training</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{`${data.Title_of_Training.split(" ").slice(0, 4).join(" ")}...`}</span>
          </div>
        </div>
        
        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">Date of Event</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.Date_of_Event.split("T")[0]}</span>
          </div>
        </div>

        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">No. of Participants</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.No_of_Participants}</span>
          </div>
        </div>

        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">Arranged By</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.Arranged_by}</span>
          </div>
        </div>

        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">Audience Type</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.Audience_Type}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-6">
        <button onClick={openModal}>Click to View Full Details</button>
      </div>
      <TrainingEventsDataDisplay isOpen={isModalOpen} closeModal={closeModal} data={data} />
      
    </div>
  );
}
