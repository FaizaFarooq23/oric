import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; 
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';
const Casestudydata = ({ isOpen, closeModal, data, admin }) => {
  const formattedData = [
   
    { label: 'Banking Research Status', value: data.Banking_research_status },
    { label: 'Advocacy Tools', value: data.Advocacy_tools ,isLink: true},
    { label: 'Brief Details', value: data.Breif_Details }
  ];
  const piDetails = [
    { label: 'Name of Pi', value: data.Name_of_pi },
    { label: 'Department of Pi', value: data.Department_of_Pi },
    { label: 'Designation of Pi', value: data.Designation_of_Pi },
    
  ];
  const casestudyDetails = [
    { label: 'Government Body', value: data.Name_of_Government_Body },
    { label: 'Coalition Partners', value: data.Coalation_Partner?data.Coalation_Partner:"N/A" },
    { label: 'Area Advocated', value: data.Area_advocated },
    { label: 'Date Of Presentation', value: data.Date_of_presentation.split("T")[0] },
    { label: 'Issue Verification', value: data.Issue_verification },
    
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
    className={`flex gap-y-8 flex-col bg-white  shadow-lg mx-auto overflow-y-auto mr-auto rounded-md border-4 p-10 ${admin ? 'w-4/5 h-[85vh] mt-[80px]' :'w-screen max-h-screen'} `}
  >
    <div className='flex  flex-col'>
            <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
              <h1 className="text-blue-900   font-bold text-xl  border-black">Details of Case Study/Policy Advocacy</h1>
       <DataDisplayModal
      title="Pi Details"
      data={piDetails}
      gridClassName="grid-cols-2"
    />
    <DataDisplayModal
      title="Case Study Details"
      data={casestudyDetails}
      gridClassName="grid-cols-2"
    />
     <DataDisplayModal
      title="Additional  Details"
      data={formattedData}
      
    />
    </div>
    <ImageDisplay title="Policy Advocay/Case Study Copy" data={imageData} />
    </Modal>
  );
}

export default Casestudydata;
