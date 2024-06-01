import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import RevenueByORICDataDisplay from "./RevenueByORICdata";

export default function RevenueByORICFields({ data, onDelete }) {
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
        <button onClick={() => onDelete(data.id, `${data.Title_of_ResearchProposal}_AuditedStatement.png`)}>
          <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
        </button>
      </div>
      <div className="flex flex-row justify-between px-10 py-8">
        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">Research Grant</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{`${data.Name_of_Research_Grant.split(" ").slice(0, 4).join(" ")}...`}</span>
          </div>
        </div>

        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">PI</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.Name_of_PI}</span>
          </div>
        </div>

        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">Funding Approved</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.Total_Funding_Approved}</span>
          </div>
        </div>
        
        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">Funding Released</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.Total_Funding_Released}</span>
          </div>
        </div>

        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">ORIC Overhead Approved</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.ORIC_Overhead_in_Approved_Funding}</span>
          </div>
        </div>
        
        <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
          <div className="flex items-start justify-start">
            <span className="text-gray-500 font-medium">ORIC Overhead Released</span>
          </div>
          <div className="flex items-end justify-center">
            <span className=" text-black text-base font-semibold ">{data.ORIC_Overhead_in_Released_Funding}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-6">
        <button onClick={openModal}>Click to View Full Details</button>
      </div>
      <RevenueByORICDataDisplay isOpen={isModalOpen} closeModal={closeModal} data={data} />
    </div>
  );
}
