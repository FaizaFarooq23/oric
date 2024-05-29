import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useModal } from "react-simple-modal-provider";
import { useSession } from "next-auth/react";
import axios from "axios";
import CivilEventsModal from "../components/Events/Events";
import EventFields from "../components/Events/EventFields";
import SuccessModal from "../../ResearchExcellence/components/UI/SuccessMessage";
import { deleteFile } from "../../ResearchExcellence/Utility/Deleteimage";
export default function Event() {
  const { open: openModal } = useModal("CivilEventsModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const [eventData, seteventData] = useState([]); // [{},{}
  const { data: session } = useSession();
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility
  const fetcheventData = async () => {
    try {
      const res = await axios.get(`/api/faculty/Events/fetch`, {
        params: {
          username: session.user.username,
        },
      });

      console.log(res);

      seteventData(res.data);
    } catch (error) {
      console.error("Error fetching  information:", error);
    }
  };

  useEffect(() => {
    // fetch data from db
    if (session) {
      fetcheventData();
    }
    // setEducationalData(data)
  }, [session]);
  const handleDeleteProject = async (id,filename) => {
    try {
      await deleteFile(
        session.user.username,
        "civil_engagement_events", // or any other table name relevant to your project
          filename, // The filename you want to delete
        `/api/Imagesfeilds/filedelete`
      );
      alert("Project and associated file deleted successfully");
    
      await axios.delete(`/api/faculty/Events/Delete_event?id=${id}`);
      console.log('Project deleted successfully');
      setShowDeleteSuccessModal(true);     } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      {" "}
      <div className="flex justify-end items-center gap-x-8 text-2xl">
        <FiPlusCircle className="text-blue-900" onClick={openModal} />
      </div>
      {isFormVisible && <CivilEventsModal />}
      {
          showDeleteSuccessModal &&
          (
            <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data has been deleted `} onClose={()=>{
              setShowDeleteSuccessModal(false)
            }}/>
          )
        }
      
      {eventData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        eventData.length>0 && 
      eventData.map((events, index) => (
        <EventFields key={index} data={events} onDelete={handleDeleteProject} />
          ))
      )}
    </div>
  );
}
