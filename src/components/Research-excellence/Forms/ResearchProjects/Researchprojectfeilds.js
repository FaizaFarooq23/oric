import DataDisplay from "@/components/Profile/components/Common/DataDisplay";
import React ,{useState} from "react";
import Modal from 'react-modal';
import Researchprojectdata from "./Researchprojectdata";
export default function Researchprojectfeilds({data}) {
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
    <>
    <div className={`flex  flex-row  bg-white  justify-between shadow-lg rounded-md px-10 py-8 mt-4  `}>
      <div className={`flex flex-col gap-y-4  w-auto m-4 gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">SN</span>
        </div>
        <div className="flex justify-center ">
          <span className="text-black ">{data.project_id}</span>
        </div>
      </div>

      <div className={`flex flex-col w-auto  gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Title of Research Project</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.title}</span>
        </div>
      </div>
      <div className={`flex flex-col w-auto gap-y-4 m-3 gap-x-10`}>
        <div className=" flex items-start justify-start w-40"> <span className="text-gray-500  font-medium">Thematic Area</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{data.Thematic_Area}</span>
        </div>
      </div>
      <div className={`flex flex-col w-auto gap-y-4 m-3   gap-x-10`}>
        <div className=" flex items-start justify-center w-56"> <span className="text-gray-500  font-medium">Name of Research Grant</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Name_of_Research_Grant}</span>
        </div>
      </div>
      </div>
     
<div className="flex justify-end">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  
<Researchprojectdata isOpen={isModalOpen} closeModal={closeModal} data={data}/>
  
</>
  );
}
