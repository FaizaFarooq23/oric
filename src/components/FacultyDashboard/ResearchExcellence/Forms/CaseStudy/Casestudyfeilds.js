
import React ,{useState} from "react";
import Casestudydata from "./Casestudydata";
import { RiDeleteBin6Line } from 'react-icons/ri';
export default function Casestudyfeilds({data,onDelete}) {
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    
    < div className="flex flex-col h-48 bg-white shadow-lg rounded-md  m-4">
        <div className="flex justify-end items-center mr-6 mt-2">
          <button onClick={() => onDelete(data.id,`${data.id}_policyorCasestudycopy.png`)}>
            <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
          </button>
        </div>
    <div className={`flex  flex-row h-36 justify-between px-10 py-8  `}>
    <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start  w-62 "> <span className="text-gray-500  font-medium">Research Backing Status</span>
        </div>
        <div className="flex items-end justify-start ">
        <span className="text-black ">{`${data.Banking_research_status
              .split(" ")
              .slice(0, 2)
              .join(" ")}...`}</span>
        </div>
      </div>
     
      <div className={`flex flex-col gap-y-4  m-3 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Name of Government Body</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{`${data.Name_of_Government_Body
              .split(" ")
              .slice(0, 2)
              .join(" ")}...`}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3 m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Area Advocated</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{data.Area_advocated}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3 m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Date of Presentation</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{data.Date_of_presentation.split("T")[0]}</span>
        </div>
      </div>
      

   

      </div>
      <div className="flex justify-end  mr-6">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  
<Casestudydata isOpen={isModalOpen} closeModal={closeModal} data={data}/>
  
</div>
  );
}
