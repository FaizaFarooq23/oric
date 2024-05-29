import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';
const IPLicensingdata = ({ isOpen, closeModal, data }) => {
  // Define the data for different sections
  const inventionData = [
    { label: 'Title of Invention', value: data.Title },
    { label: 'Status of Licensee', value: data.Status_of_Licensee },
    { label: 'Category', value: data.Category },
    { label: 'Nationality', value: data.Nationality },
    { label: 'Development Status', value: data.Development_Status },
  ];

  const signedLicenseeData = data.Status_of_Licensee === "Signed" ? [
    { label: 'Type of Licensee', value: data.Licensee_Type },
    { label: 'Date of Agreement', value: data.Date_of_Agreement.split("T")[0] },
  ] : [
    { label: 'Status of Negotiation', value: data.Status_of_Negotiations },
  ];

  const inventorData = [
    { label: 'Name of Lead Inventor', value: data.Name_of_leadInventor },
    { label: 'Department of Lead Inventor', value: data.Department_of_leadInventor },
    { label: 'Designation of Lead Inventor', value: data.Designation_of_leadInventor },
  ];

  const licenseeData = [
    { label: 'Name of Licensee', value: data.Licensee_Name },
    { label: 'Organization of Licensee', value: data.Licensee_Organization },
  ];

  const durationData = [
    { label: 'Start Date', value: data.start_Date.split("T")[0] },
    { label: 'End Date', value: data.end_Date.split("T")[0] },
  ];

  const additionalData = [
    { label: 'Field of Use', value: data.Feild_of_use },
    { label: 'Key Aspects', value: data.KeyAspects },
  ];
  const imageData = data.Status_of_Licensee === "Signed"?[
    {
      label: 'Licensee Agreement Copy',
      value: `/uploadFile/${data.username}/ip_licensing/${data.Title}_LicenseAgreementCopy.png`,
    },
    {
      label: 'Neogitation Copy',
      value: `/uploadFile/${data.username}/ip_licensing/${data.Title}_NegotationCopy.png`,
    },
  ]:[
    {
      label: 'Neogitation Copy',
      value: `/uploadFile/${data.username}/ip_licensing/${data.Title}_NegotationCopy.png`,
    },
  ];
// Determine divClassName based on Status_of_Licensee
const divClassName = data.Status_of_Licensee === "Signed" ? "grid-cols-2" : "";
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="IP Licensing Data"
      className="flex gap-y-8 flex-col bg-white shadow-lg w-full  h-screen pb-8 mb-4 ml-auto max-h-screen overflow-y-auto mr-auto rounded-md w-4/5 border-4 p-10"
    >
      <div>
        <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
        <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">IP Disclosures and Patent Information</h1>
        <DataDisplayModal title="Invention Information" data={inventionData} gridClassName="grid-cols-2"  />
        {signedLicenseeData.length > 0 && <DataDisplayModal title="Licensee Information" data={signedLicenseeData} gridClassName="grid-cols-2" />}
        <DataDisplayModal title="Details of Inventor" data={inventorData} gridClassName="grid-cols-2" />
        <DataDisplayModal title="Details of Licensee" data={licenseeData} gridClassName="grid-cols-2" />
        <DataDisplayModal title="Duration of Agreement" data={durationData} gridClassName="grid-cols-2" />
        <DataDisplayModal title="Additional Details" data={additionalData} />
        <ImageDisplay title="Documents Copy " data={imageData} divClassName={divClassName}
           />
      
        
      </div>
    
    </Modal>
  );
};

export default IPLicensingdata;
