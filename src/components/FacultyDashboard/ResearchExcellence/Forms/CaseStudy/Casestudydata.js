import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; 
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';
const Casestudydata = ({ isOpen, closeModal, data }) => {
  const formattedData = [
    { label: 'Government Body', value: data.Name_of_Government_Body },
    { label: 'Coalition Partners', value: data.Coalation_Partner },
    { label: 'Area Advocated', value: data.Area_advocated },
    { label: 'Date Of Presentation', value: data.Date_of_presentation.split("T")[0] },
    { label: 'Issue Verification', value: data.Issue_verification },
    { label: 'Banking Research Status', value: data.Banking_research_status },
    { label: 'Advocacy Tools', value: data.Advocacy_tools },
    { label: 'Brief Details', value: data.Breif_Details }
  ];
  const imageData = [
    {
      label: 'Policy Advocacy/Case Study Copy',
      value: `/uploadFile/${data.username}/policy_casestudy/${data.id}_policyorCasestudycopy.png`,
    },
  ]

  return (

    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel={"Case Study/Policy Advocacy Data"}
    className="flex gap-y-8 flex-col bg-white w-screen max-h-screen shadow-lg ml-auto overflow-y-auto mr-auto rounded-md  w-4/5 border-4 p-10 "
  >
    <div className='flex  flex-col'>
            <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
    <DataDisplayModal
      title="Case Study Details"
      data={formattedData}
    />
    </div>
    <ImageDisplay title="Policy Advocay/Case Study Copy" data={imageData} />
    </Modal>
  );
}

export default Casestudydata;
