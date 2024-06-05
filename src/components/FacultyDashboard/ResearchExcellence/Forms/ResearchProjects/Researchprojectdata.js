import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; 
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';

const Researchprojectdata = ({ isOpen, closeModal, data, admin }) => {
  // Define data for different sections
  const projectDetails = [
    { label: 'Title of Research Project', value: data.title },
    { label: 'Thematic Area', value: data.Thematic_Area },
    { label: 'Type of Research', value: data.type_of_research },
    ...(data.type_of_research === 'Solo Project' ? [{ label: 'Category', value: data.category }] : []),
    ...(data.type_of_research !== "Contract Research" ? [{ label: 'Name of Research Grant', value: data.Name_of_Research_Grant }] : []),
    { label: 'Nationality', value: data.Nationality },
    ...(data.type_of_research !== "Contract Research" ? [{ label: 'Status of Proposal', value: data.Status_of_proposal }] : []),
    ...(data.Status_of_project === 'Completed' ? [{ label: 'Date of Completion', value: data.Date_of_Completion.split("T")[0] || 'Nill' }] : []),
    { label: 'Start Date', value: data.start_Date.split("T")[0] },
    { label: 'End Date', value: data.end_Date.split("T")[0] }
  ]

  const contractDetails = data.type_of_research === 'Contract' ? [
    { label: 'Date of contract signed', value: data.Date_of_ContractSigned.split("T")[0] },
    { label: 'Date of contract', value: data.Date_of_Contract.split("T")[0] },
    { label: 'Counter Parts from Industry', value: data.Counterparts }
  ] : [];

  const submissionDetails =data.type_of_research!=="Contract Research"? [
    { label: 'Date of Submission', value: data.Date_of_Submission.split("T")[0] },
    ...(data.Status_of_proposal === 'Approved' && data.Date_of_Approval ? [
      { label: 'Date of Approval', value: data.Date_of_Approval.split("T")[0] }
    ] : []),
    
    ...(data.Status_of_proposal === 'Approved' ? [
      { label: 'Status of Project', value: data.Status_of_project }
    ] : [])
  ]:[];

  const piDetails = [
    { label: 'Name of Pi', value: data.Name_of_pi },
    { label: 'Department of Pi', value: data.Department_of_Pi },
    { label: 'Designation of Pi', value: data.Designation_of_Pi },
    ...((data.Status_of_proposal !== 'Submitted') && (data.type_of_research === 'Solo Project') && (data.category === 'Non-HEC') ? [
      { label: 'ORIC Overhead', value: data.ORIC_Overhead }
    ] : []),
  ];

  const copiDetails = data.type_of_research === 'Joint Research' ? [
    { label: 'Name of CoPi', value: data.Name_of_Copi },
    { label: 'Department of CoPi', value: data.Department_of_CoPi },
    { label: 'Designation of CoPi', value: data.Designation_of_CoPi },
    { label: 'University of CoPi', value: data.University_of_CoPi }
  ] : [];

  const sponsorDetails = data.type_of_research === 'Contract Research' ? [
    { label: 'Name of Sponsoring Agency', value: data.Sponcering_Agency_Name },
    { label: 'Sponsoring Agency Country', value: data.Sponcering_Agency_Country },
    { label: 'Sponsoring Agency Address', value: data.Sponcering_Agency_Address }
  ] : [];

  const irbDetails = data.type_of_research!=="Contract Research "?[
    { label: 'Reviewed By IRB', value: data.reviwedbyIRB },
    ...(data.reviwedbyIRB === 'Yes' ? [
      { label: 'Date of Review', value: data.Date_of_review.split("T")[0] },
      { label: 'Meeting Decision', value: data.meetingdecision }
    ] : [])
  ]:[]

  const fundingDetails = [
    ...(data.type_of_research !== 'Contract Research' ? [
      { label: 'Total Funding Requested', value: data.funding_requested }
    ] : []),
    ...(data.Status_of_proposal === 'Approved' || data.type_of_research==="Contract Research" ? [
      { label: 'Total Funding Approved', value: data.funding_approved }
    ] : []),
    ...(data.Status_of_project === 'Completed' ? [
      { label: 'Total Funding Utilized', value: data.funding_utilized?data.funding_utilized:"N/A" }
    ] : []),
    ...(data.Status_of_project === 'Completed' ? [
      { label: 'Total Funding Realesed', value: data.funding_realesed }
    ] : [])
  ];

  const partnerDetails = data.type_of_research!=="Contract Research"? [
    { label: 'Collaborating Partner', value: data.Collaborating_Partner ?data.Collaborating_Partner:"N/A"},
    { label: 'Co-funding Partner', value: data.Cofunding_Partner ?data.Cofunding_Partner:"N/A"}
  ]:[];



  const remarks = [
    { label: 'Remarks', value: data.Remarks?data.Remarks:"N/A" }
  ];

  const deliverables = data.Status_of_project === 'Completed' ? [
    { label: 'Key Project Deliverables', value: data.delivery }
  ] : [];

  const imageData = [];
  if(data.type_of_research!=="Contract Research"){
    if (data.Status_of_proposal === "Approved") {
      imageData.push({
        label: 'Award Letter Copy',
        value: `/uploadFile/${data.username}/research_project/${data.title}_AwardLetterCopy.png`
      });
    
  } 
  if (data.Status_of_project === "Completed") {
    
    imageData.push({
      label: 'Completion Letter Copy',
      value: `/uploadFile/${data.username}/research_project/${data.title}_Completionlettercopy.png`
    });
    
  } 
  
  if (data.reviwedbyIRB === "Yes") {
      imageData.push({
        label: 'Meeting Minutes Copy',
        value: `/uploadFile/${data.username}/research_project/${data.title}_meetingminutes.png`
      });
    
  }
  if(data.Status_of_proposal === "Approved"||data.Status_of_proposal === "Submitted"){
    imageData.push({
      label: 'Submission Email Copy',
      value: `/uploadFile/${data.username}/research_project/${data.title}_SubmissionEmailcopy.png`
    });
  }
  }
  if (data.type_of_research === "Contract Research") {
    imageData.push({
      label: 'Contract Agreement Copy',
      value: `/uploadFile/${data.username}/research_project/${data.title}_ContractAgreementCopy.png`
    });
  
} 
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Research Project Details"
      className={`flex gap-y-8 flex-col bg-white shadow-lg  overflow-y-auto  rounded-md border-4 p-12 ${admin ? 'w-4/5 h-[85vh] mt-[80px]' : 'w-full h-screen'}`}
    >
      <div className="flex justify-end items-end gap-x-6">
        <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
      </div>
      <h1 className="text-blue-900   font-bold text-xl py-2 border-black">Research Project Details</h1>
      
      <DataDisplayModal title="Project Details" data={projectDetails} gridClassName="grid-cols-2" />
      {contractDetails.length > 0 && <DataDisplayModal title="Contract Details" data={contractDetails} gridClassName="grid-cols-2" />}
      {submissionDetails.length > 0 && <DataDisplayModal title="Submission Details" data={submissionDetails} gridClassName="grid-cols-2" />}
      <DataDisplayModal title="Details of Pi" data={piDetails} gridClassName="grid-cols-2" />
      {copiDetails.length > 0 && <DataDisplayModal title="Details of CoPi" data={copiDetails} gridClassName="grid-cols-2" />}
      {sponsorDetails.length > 0 && <DataDisplayModal title="Details of Sponsoring Agency" data={sponsorDetails} gridClassName="grid-cols-2" />}
      <DataDisplayModal title="Details of IRB Review" data={irbDetails} gridClassName="grid-cols-2" />
      <DataDisplayModal title="Details of Funding (PKR Million)" data={fundingDetails} gridClassName="grid-cols-2" />
     {
 data.type_of_research!=="Contract Research" &&
 <DataDisplayModal title="Details of Partners" data={partnerDetails} gridClassName="grid-cols-2" />
     }
      <DataDisplayModal title="Remarks" data={remarks}  />
      {deliverables.length > 0 && <DataDisplayModal title="Key Project Deliverables" data={deliverables}  />}
      {imageData.length > 0 && (
          <ImageDisplay title="Document Copies" data={imageData} />
        )}
    </Modal>

  );
};

export default Researchprojectdata;