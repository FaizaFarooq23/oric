import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';

const Linkdata = ({ isOpen, closeModal, data }) => {
  const formattedLinkDataStage1 = [
    { label: 'Type of Linkage', value: data.Type_of_Linkage },
    { label: 'Date of Agreement', value: data.Date_of_Agreement.split("T")[0] },
    { label: 'Field of Study', value: data.Field_of_Study },
    { label: 'Nationality', value: data.Nationality },
    { label: 'Name of Research Grant', value: data.Name_of_Research_Grant },
  ];

  const formattedLinkDataStage2 = [
    { label: 'Name of Host Institute', value: data.Name_of_Host_Institute },
    { label: 'Address of Host Institute', value: data.Address_of_Host_Institute },
  ];

  const formattedLinkDataStage3 = [
    { label: 'Collaborating Agency Name', value: data.Collaborating_Agency },
    { label: 'Collaborating Agency Address', value: data.Collaborating_Agency_Address },
  ];
  const formattedLinkDataStage4 = [
    { label: 'Scope of Collaboration', value: data.Scope },
    { label: 'Salient Features of Linkage', value: data.Features },
  ];
  const imageData = [
    {
      label: 'MoU Copy',
      value: `/uploadFile/${data.username}/research_linkage/${data.id}_MoUcopy.png`,
    },
  ]
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Case Study Details"
      className="flex gap-y-8 flex-col bg-white shadow-lg h-screen w-screen pb-8 max-h-screen overflow-y-auto rounded-md w-4/5 border-4 p-10 "
    >
      <div>
        <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
        
        <DataDisplayModal
          title="Research Linkage Details"
          gridClassName="grid-cols-2"
          data={formattedLinkDataStage1}
        />
        
        <DataDisplayModal
          title="Host Institute Detail"
          gridClassName="grid-cols-2"
          data={formattedLinkDataStage2}
        />
       
        <DataDisplayModal
          title="Collaborating Agency Detail"
          gridClassName="grid-cols-2"
          data={formattedLinkDataStage3}
        />
        
        <DataDisplayModal
          title="Additional Details"
          data={formattedLinkDataStage4}
        />
      </div>
      <ImageDisplay title="MoU Copy" data={imageData} />
      
    </Modal>
  );
}

export default Linkdata;
