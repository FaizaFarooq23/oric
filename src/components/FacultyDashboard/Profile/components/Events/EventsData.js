import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '../Common/Imagedisplay';

const Eventsdata = ({ isOpen, closeModal, data }) => {
  const formattedEventDataStage1 = [
    { label: 'Title of Event', value: data.Title_of_Event },
    { label: 'Date of Event', value: data.Date_of_Event.split("T")[0]  },
    { label: 'Venue of Event', value: data.Venue },
    { label: 'Community Addressed', value: data.Community },
    { label: 'Role', value: data.Role },
    { label: 'Sponsored Event', value: data.Sponcerned },
    ...(data.Sponcerned === 'Yes'
      ? [
          { label: 'Name of Sponsoring Agency', value: data.Name_of_Sponcoring_agency },
          { label: 'Grant Value', value: data.Grant_Value },
        ]
      : []),
   
  ];
  const formattedEventDataStage2 = [
  
    { label: 'Outcome', value: data.Outcome },
    { label: 'Collaborated/Developed', value: data.Collaboration_Developed },
    { label: 'Organization Involved', value: data.Name_of_Collaborating_org },
    { label: 'Remarks', value: data.Remarks || 'N/A' },
    { label: 'Outcome Material', isLink:true ,value: data.Outcome_Material },
  ];

  const imageData = [
    {
      label: 'Event Report /Bonchure Copy',
      value: `/uploadFile/${data.username}/civil_engagement_events/${data.id}_Eventreport_bonchures.png`,
    },
    // Add more image data as needed
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel={"Event Details"}
      className="flex gap-y-8 flex-col bg-white w-screen max-h-screen shadow-lg ml-auto overflow-y-auto mr-auto rounded-md border-4 p-10 "
    >
      <div className='flex  flex-col'>
        <div className="flex justify-end items-end gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={closeModal} />
        </div>
        <DataDisplayModal
          title="Event Details"
          gridClassName="grid-cols-2"
          data={formattedEventDataStage1}
        />
         <DataDisplayModal
          title="Additional Details"
          gridClassName=""
          data={formattedEventDataStage2}
        />
        <ImageDisplay title="Event Report/Brochures" data={imageData} />
      </div>
    </Modal>
  );
}

export default Eventsdata;
