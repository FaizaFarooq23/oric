import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';

const IPdata = ({ isOpen, closeModal, data }) => {
  const generalData = [
    { label: 'Title of Invention', value: data.Title_of_Invention },
    { label: 'Type of IP', value: data.Type },
  ];

  const patentData = data.Type !== "IP disclosures" ? [
    { label: 'Status of Patent', value: data.Status_of_patent },
    { label: 'Date of Filing', value: data.Date_of_filing.split("T")[0] },
  ] : [];

  const disclosureData = data.Type === "IP disclosures" ? [
    { label: 'Previous Disclosure', value: data.Previous_disclosure },
    { label: 'Date of Disclosure', value: data.Date_of_disclosure.split("T")[0] },
  ] : [];

  const inventorData = [
    { label: 'Name of Lead Inventor', value: data.Name_of_leadInventor },
    { label: 'Department of Lead Inventor', value: data.Department_ofleadInventor },
    { label: 'Designation of Lead Inventor', value: data.Designation_of_leadInventor },
  ];

  const patentAuthorityData = [
    { label: 'Name of Patent Authority', value: data.Name_of_patentdept },
    { label: 'Details of Patent Authority', value: data.Detail_of_patentdept },
  ];

  const additionalData = [
        { label: 'Financial Support', value: data.Financial_support },
    { label: 'Commercial Partner', value: data.Commercial_partner },
    { label: 'Key Aspects', value: data.KeyAspects },
  ];

  const imageData =data.Type !== "IP disclosures" ? [
    {
      label: 'Filing Copy',
      value: `/uploadFile/${data.username}/ipandpatent/${data.Title_of_Invention}_filingcopy.png`,
    },
    {
      label: 'Granting Copy',
      value: `/uploadFile/${data.username}/ipandpatent/${data.Title_of_Invention}_grantingcopy.png`,
    },
  ]: [];
  const DisclosureimageData =data.Type === "IP disclosures" ? [
    { label: 'Disclosure Copy', 
    value: `/uploadFile/${data.username}/ipandpatent/${data.Title_of_Invention}_Disclosurecopy.png`,   
    },
   
  ] : [];
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="IP Data"
      className="flex gap-y-8 flex-col bg-white shadow-lg w-full  h-screen pb-8 mb-4 ml-auto max-h-screen overflow-y-auto mr-auto rounded-md w-4/5 border-4 p-10"
    >
      <div>
        <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
        <DataDisplayModal title="IP Disclosures and Patent Information" data={generalData} />
        {patentData.length > 0 && <DataDisplayModal title="Patent Information" data={patentData} />}
        {disclosureData.length > 0 && <DataDisplayModal title="Disclosure Information" data={disclosureData} gridClassName="grid-cols-2" />}
        <DataDisplayModal title="Details of Inventor" data={inventorData} gridClassName="grid-cols-2" />
        <DataDisplayModal title="Details of Patent Authority or Department" data={patentAuthorityData} />
        <DataDisplayModal title="Additional Details" data={additionalData} />
        {patentData.length > 0 && <ImageDisplay title="Patent Documents" data={imageData} />}
        {disclosureData.length>0 && <ImageDisplay title="IP Disclosure Documents" data={DisclosureimageData} />}

      </div>
   
    </Modal>
  );
}

export default IPdata;
