import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';

const Product_to_Industrydata = ({ isOpen, closeModal, data, admin }) => {
  // Define data arrays
  const inventionData = [
    { label: 'Title of Invention', value: data.Title_of_Invention },
    { label: 'Category', value: data.Category },
    { label: 'Nationality', value: data.Nationality },
    { label: 'Development Status', value: data.Development_Status },
  ];

  const leadInventorData = [
    { label: 'Name of Lead', value: data.Name_of_leadInventor },
    { label: 'Department of Lead', value: data.Department_of_leadInventor },
    { label: 'Designation of Lead', value: data.Designation_of_leadInventor },
  ];

  const partnerData = [
    { label: 'Name of Partner', value: data.Name_of_partner },
    { label: 'Details of Partner', value: data.Detail_of_partner },
  ];

  const additionalData = [
    { label: 'Fields of Use', value: data.Feild_of_use },
    { label: 'Financial Support', value: data.Financial_support },
    { label: 'Key Aspects', value: data.KeyAspects },
    { label: 'Remarks', value: data.Remarks },
  ];
  const imageData = [
    {
      label: 'PD Proof',
      value: `/uploadFile/${data.username}/product_to_industry/${data.Title_of_Invention}_PdProof.png`,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Case Study Details"
      className={`flex gap-y-8 flex-col bg-white shadow-lg  pb-8 max-h-screen overflow-y-auto mx-auto rounded-md border-4 p-10 ${admin ? 'h-[85vh] w-4/5 mt-[80px]' : 'h-screen w-screen'} `}
    >
      <div>
        <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
        <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
          Research products / process / prototype gone into prefeasibility / industrial scale testing or prototype development
        </h1>
     
        <DataDisplayModal title="Invention Information" data={inventionData} />
        <DataDisplayModal title="Details of Lead Inventor" data={leadInventorData} gridClassName="grid-cols-2"/>
        <DataDisplayModal title="Details of Collaborating Industry Partner" data={partnerData} gridClassName="grid-cols-2" />
        <DataDisplayModal title="Additional Details" data={additionalData} />

        
      </div>
    </Modal>
  );
};

export default Product_to_Industrydata;
