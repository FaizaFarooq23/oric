import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';

const VisitDataDisplay = ({ isOpen, closeModal, data }) => {
  const formattedData = [
    { label: 'Name of Visitor', value: data.Name_of_Visitor },
    { label: 'Date of Visit', value: data.Date_of_Visit },
    { label: 'Agenda of Visit', value: data.Agenda_of_Visit },
    // Add more fields as needed
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Visit Data"
      className="flex flex-col bg-white w-full h-screen shadow-lg ml-auto overflow-y-auto mr-auto rounded-md border-4 p-10"
    >
       
      <div className="flex justify-end items-end gap-x-6">
        <FaTimes className="text-red-500 text-xl cursor-pointer mt-8" onClick={closeModal} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Visit Details</h2>
        <DataDisplayModal data={formattedData} />
      </div>
    </Modal>
  );
}

export default VisitDataDisplay;
