import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import DataDisplayModal from '@/components/FacultyDashboard/Profile/components/Common/FeildsData';
import ImageDisplay from '@/components/FacultyDashboard/Profile/components/Common/Imagedisplay';

const TrainingEventsDataDisplay = ({ isOpen, closeModal, data }) => {
    const { Category, Title_of_Training, Type_of_Event, Arranged_by, Organizer, Date_of_Event, No_of_Participants, Audience_Type, Name_of_ORICPersonal, Outcomes, Remarks } = data;
  
    const formattedDataStage1 = [
      { label: 'Category', value: Category },
      ...(Category === "Trainings / Workshops / Seminars / Conferences" ? [{ label: 'Title of Training', value: Title_of_Training }] : []),
      ...(Category === "Exhibitions / Showcasing Events / Industry Linkages Fair" ? [{ label: 'Type of Event', value: Type_of_Event }] : []),
      { label: 'Arranged By', value: Arranged_by },
      ...(Arranged_by === "Other HEIs" ? [{ label: 'Organizer', value: Organizer }] : []),
    ];
  
    const formattedDataStage2 = [
      { label: 'Date of Event', value: new Date(Date_of_Event).toLocaleDateString() },
      { label: 'Number of Participants', value: No_of_Participants },
      { label: 'Audience Type', value: Audience_Type },
      ...(Audience_Type === "ORIC Personal" ? [{ label: 'Name of ORIC Personal', value: Name_of_ORICPersonal }] : []),
    ];
  
    const formattedDataStage3 = [
      ...(Outcomes ? [{ label: 'Outcomes', value: Outcomes }] : []),
      ...(Remarks ? [{ label: 'Remarks', value: Remarks }] : []),
    ];
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Training Event Data"
        className="flex gap-y-8 flex-col bg-white w-full h-screen shadow-lg ml-auto overflow-y-auto mr-auto rounded-md border-4 p-10"
      >
        <div className='flex flex-col pl-10'>
          <div className="flex justify-end items-end gap-x-6">
            <FaTimes className="text-red-500 text-xl cursor-pointer mt-8" onClick={closeModal} />
          </div>
          <DataDisplayModal
            title="Training Event Details"
            gridClassName="grid-cols-2"
            data={formattedDataStage1}
          />
          <DataDisplayModal
            title="Event Information"
            gridClassName="grid-cols-2"
            data={formattedDataStage2}
          />
          <DataDisplayModal
            title="Additional Details"
            data={formattedDataStage3}
          />
        </div>
      </Modal>
    );
  }
  
 
  
export default TrainingEventsDataDisplay;
