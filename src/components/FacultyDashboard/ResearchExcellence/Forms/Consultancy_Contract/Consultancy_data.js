import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';

const Consultancy_data = ({ isOpen, closeModal, data, admin }) => {
  const formattedConsultancyDataStage1 = [
    { label: 'Title of Project', value: data.Title },
    { label: 'Type of Consultancy Services', value: data.Type_of_ConsultancyServices },
    { label: 'Date of Execution', value: data.Date_of_Execution.split("T")[0] },
    { label: 'Contract Value', value: `${data.Contract_Value} PKR Million` },
    { label: 'Start Date', value: data.start_Date.split("T")[0] },
    { label: 'End Date', value: data.end_Date.split("T")[0] },
    { label: 'Oric Percentage', value: `${data.ORIC_percentage} %` },
  ];

  const formattedConsultancyDataStage2 = [
    { label: 'Name of Pi', value: data.Name_of_Pi },
    { label: 'Department of Pi', value: data.Department_of_Pi },
    { label: 'Designation of Pi', value: data.Designation_of_Pi },
  ];

  const formattedConsultancyDataStage3 = [
    { label: 'Name of Company', value: data.Company_Name },
    { label: 'Country of Company', value: data.Company_Address },
  ];
  const formattedConsultancyDataStage4=[
  
    { label: 'Remarks', value: data.Remarks?data.Remarks:"N/A" },
    { label: 'Key Deliverables', value: data.deliverables },
  ];
  const imageData = [
    {
      label: 'Contract Copy',
      value: `/uploadFile/${data.username}/consultancy_contract/${data.id}_Contractcopy.png`,
    },
  ]
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Case Study Details"
      className={`flex gap-y-8 flex-col bg-white shadow-lg pb-8 mb-4 mx-auto  overflow-y-auto mr-auto rounded-md  border-4 p-10  ${admin ? 'w-4/5 h-[85vh] mt-[80px]' : 'w-screen h-screen'}`}
    >
      <div className='m-4'>
        <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
        
        <DataDisplayModal
          title="Consultancy Contract Details"
          gridClassName="grid-cols-2"
          
          data={formattedConsultancyDataStage1}
        />
        
        <DataDisplayModal
          title="Details of Pi"
          gridClassName="grid-cols-2"
          data={formattedConsultancyDataStage2}
        />
       
        <DataDisplayModal
          title="Details Of Company"
          gridClassName="grid-cols-2"
          data={formattedConsultancyDataStage3}
        />
       
        <DataDisplayModal
          title="Additional Details"
          gridClassName=""
          data={formattedConsultancyDataStage4}
        />
      </div>
      <ImageDisplay title="Contract Copy" data={imageData} />
   
   
    </Modal>

  );
}

export default Consultancy_data;
