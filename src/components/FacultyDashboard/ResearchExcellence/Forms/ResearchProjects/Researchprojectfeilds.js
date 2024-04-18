import React ,{useState} from "react";
import Modal from 'react-modal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Researchprojectdata from "./Researchprojectdata";
export default function Researchprojectfeilds({data,onDelete}) {
  const [isformVisible, setisformVisible] = useState(false);  
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
    < div className="flex flex-col bg-white shadow-lg rounded-md  m-4 ">
      <div className="flex justify-end items-center mr-6 mt-4">
          <button onClick={() => onDelete(data.project_id)}>
            <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
          </button>
        </div>
    <div className={`flex  flex-row  justify-between px-10 py-8  `}>
     
      <div className={`flex flex-col w-60  gap-y-4 m-3  gap-x-8`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Title of Research Project</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{data.title}</span>
        </div>
      </div>
      <div className={`flex flex-col w-56 gap-y-4 m-3 gap-x-8`}>
        <div className=" flex items-start justify-start w-40"> <span className="text-gray-500  font-medium">Thematic Area</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{data.Thematic_Area}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4  w-56 m-3 gap-x-8`}>
          <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Status of Proposal</span>
          </div>
          
          <div className="flex justify-start ">
            <span className="text-black ">{data.Status_of_proposal}</span>
          </div>
        </div>
      <div className={`flex flex-col w-56 gap-y-4 m-3   gap-x-8`}>
        <div className=" flex items-start justify-start w-56"> <span className="text-gray-500  font-medium">Name of Research Grant</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{data.Name_of_Research_Grant}</span>
        </div>
      </div>
    
     <div className={`flex flex-col gap-y-4  w-56 m-3 gap-x-8`}>
          <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Type of Research</span>
          </div>
          
          <div className="flex justify-start ">
            <span className="text-black ">{data.type_of_research}</span>
          </div>
        </div>
     
     
      </div>

     
<div className="flex justify-end mr-6">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  
<Researchprojectdata isOpen={isModalOpen} closeModal={closeModal} data={data}/>
  
</div>
  );
}
