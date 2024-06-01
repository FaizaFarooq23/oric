import React, { useState } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import VisitDataDisplay from "./VisitsData";
import DataDisplayModal from "@/components/FacultyDashboard/Profile/components/Common/FeildsData";

export default function VisitsFields({ data, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgendaExpanded, setIsAgendaExpanded] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Extracting only the first three lines of agenda
  const truncatedAgenda = data.Agenda_of_Visit.split("\n").slice(0, 2).join("\n");

  // Flag to determine if agenda is truncated
  const isAgendaTruncated = data.Agenda_of_Visit !== truncatedAgenda;

  const formattedData = [
    { label: 'Name of Visitor', value: data.Name_of_Visitor },
    { label: 'Date of Visit', value: data.Date_of_Visit.split("T")[0] },
    { label: 'Agenda of Visit', value: isAgendaTruncated && !isAgendaExpanded ? truncatedAgenda : data.Agenda_of_Visit },
    // Add more fields as needed
  ];

  return (
    <div className={`flex flex-col  shadow-lg rounded-md m-4`}>
      <div className="flex justify-end items-center mr-6 mt-4">
        <button onClick={() => onDelete(data.id)}>
          <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
        </button>
      </div>
      <div>
        <div className="p-4">
          <h1 className="text-blue-900 font-serif font-bold text-xl border-black">
            Visitor Information
          </h1>
          <DataDisplayModal data={formattedData} />
          {/* Display Read More button only if agenda is truncated */}
          {isAgendaTruncated && !isAgendaExpanded ? (
            <div className="flex justify-end">
            <button className=" text-gray-500 hover:underline mt-2 " onClick={() => setIsAgendaExpanded(true)}>
              Read More
            </button>
            </div>
          ) : isAgendaExpanded ? (
            <div className="flex justify-end">
            <button className="text-gray-500 hover:underline mt-2" onClick={() => setIsAgendaExpanded(false)}>
              Read Less
            </button>
            </div>
          ) : null}
          
        </div>
      </div>
    </div>
  );
}
