import React from 'react'
import Modal from 'react-modal';
import { FaTimes, FaEdit } from 'react-icons/fa';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '../Common/Imagedisplay';
const Awardsdata = ({ isOpen, closeModal, data }) => {
  const formattedDataStage1= [
    { label: 'Title of award', value: data.Title_of_award},
    { label: 'Organization Name', value: data.Name_of_organization },
    { label: 'Relevant Awards', value: data.Relevant_Award },
    { label: 'Amount of Prize', value: data.Amount_of_prize },
  
  ];
  const formattedDataStage2= [
    { label: 'Name of Winner', value: data.Name_of_winner},
    { label: 'Designation of Winner', value: data. Designation_of_winner },
    { label: 'Deprtment of Winner', value: data.Department_of_Winner }, 
  ];
  const imageData = [
    { label: 'MoU Copy', 
    value: `/uploadFile/${data.username}/awards/${data.Title_of_award}_MoUcopy.png`
},
    // Add more image data as needed
  ];
  const formattedDataStage3 = [
    { label: 'Detail of Work Honoured', value: data.Breif_Details },
    ...(data.Remarks !== 0 ? [{ label: 'Remarks', value: data.Remarks }] : []),
  ];
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel={"Case Study/Policy Advocacy Data"}
    className="flex gap-y-8 flex-col bg-white w-screen max-h-screen shadow-lg ml-auto overflow-y-auto mr-auto rounded-md  border-4 p-10 "
  >
    <div className='flex  flex-col'>
            <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
    <DataDisplayModal
      title="Infromation about National or International Honors or
      Awards Won"
      gridClassName="grid-cols-2" 
      data={formattedDataStage1}
    />
    <DataDisplayModal
      title="Infromation about Winner "
      gridClassName="grid-cols-2" 
      data={formattedDataStage2}
    />
    <DataDisplayModal
      title="Additional Detail "
      data={formattedDataStage3}
    />

     <ImageDisplay title="MoU Copy" data={imageData} />
    </div>
    </Modal>
  );
}

export default Awardsdata;
