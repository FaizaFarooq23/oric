import React ,{useState} from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Eventsdata from "./EventsData";
import DataDisplayModal from "../Common/FeildsData";
export default function EventFields({ data,onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
   // Function to open the modal
   const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const formattedData = [
    { label: 'Title of Event', value:data.Title_of_Event },
    { label: 'Date of Event', value:data.Date_of_Event.split("T")[0] },
  ];

  return (
    <div  className={`flex flex-col bg-white h-68 shadow-xl rounded-md   border-2  my-4 `}>
            <div className="flex justify-end items-center mr-6 mt-2">
        <button onClick={() => onDelete(data.id,`${data.Title_of_Event}_Eventreport_bonchures.png`)}>
          <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
        </button>
      </div>
  
      <div className="px-2">
          <h1 className="text-blue-900   font-semibold text-lg border-black">
            Event Information
          </h1>
          <div >

            <div>

            
          <DataDisplayModal data={formattedData} />
          </div>
          </div>
        </div>
    <div className="flex justify-end  mr-6">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  
<Eventsdata isOpen={isModalOpen} closeModal={closeModal} data={data}/>
    </div>
  );
}
