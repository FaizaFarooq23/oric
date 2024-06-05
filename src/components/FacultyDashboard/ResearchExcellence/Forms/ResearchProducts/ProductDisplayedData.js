import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';

const Product_Displayeddata = ({ isOpen, closeModal, data, admin }) => {
  const generalData = [
    { label: 'Title', value: data.Title },
    { label: 'Category', value: data.Category },
    { label: 'Nationality', value: data.Nationality },
    { label: 'Status', value: data.Status },
  ];
  const leadData = [
    { label: 'Name of Lead', value: data.Name_of_lead },
    { label: 'Department of Lead', value: data.Department_of_lead },
    { label: 'Designation of Lead', value: data.Designation_of_lead },
  ];

  const forumData = [
    { label: 'Name of Forum', value: data.Name_of_Forum },
    { label: 'Details of Forum', value: data.Detail_of_Forum },
  ];

  const additionalData = [
    { label: 'Fields of Use', value: data.Feild_of_use },
       { label: 'Financial Support', value: data.Financial_support },
  ];

  const imageData = [
    {
      label: 'Breif Copy',
      value: `/uploadFile/${data.username}/product_displayed/${data.Title}_BreifCopy.png`,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Product Display Data"
      className={`flex gap-y-8 flex-col bg-white shadow-lg  pb-8 max-h-screen overflow-y-auto  rounded-md border-4 p-10 ${admin ? 'h-[85vh] w-4/5 mt-[80px]' : 'h-screen w-screen'} `}
    >
      <div>
        <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
        <DataDisplayModal title="Product Displayed At National or International Level Information" data={[
         { label: 'Title', value: data.Title }
          ]}
          />
        <DataDisplayModal  data={generalData} gridClassName="grid-cols-2"/>
        <DataDisplayModal title="Details of Lead" data={leadData} gridClassName="grid-cols-2"/>
        <DataDisplayModal title="Details of Forum" data={forumData} />
        <DataDisplayModal title="Additional Details" data={additionalData} />
        <ImageDisplay title="Breif Copy " data={imageData} />
      </div>
    </Modal>
  );
}

export default Product_Displayeddata;
