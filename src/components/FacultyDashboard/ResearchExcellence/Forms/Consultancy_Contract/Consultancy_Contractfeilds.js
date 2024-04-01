import DataDisplay from "@/components/Profile/components/Common/DataDisplay";
import React ,{useState} from "react";
import { RiDeleteBin6Line } from 'react-icons/ri';
import Consultancy_data from "./Consultancy_data";
export default function ConsultacyContractfield({data ,onDelete}) {
  const [showMore, setShowMore] = useState(false);
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
    <div className="flex flex-col bg-white shadow-lg  h-48 rounded-md   ">
       <div className="flex justify-end items-center mr-6 mt-2">
          <button onClick={() => onDelete(data.id)}>
            <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
          </button>
        </div>
    <div className={`flex  flex-row  h-36 justify-between px-10 py-8  `}>
      <div className={`flex flex-col gap-y-4  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">SN</span>
        </div>
        <div className="flex justify-center ">
          <span className="text-black ">{data.id}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Title of ProjectS</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Title}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Type of Consultancy Services</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Type_of_ConsultancyServices}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Date of Execution</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Date_of_Execution}</span>
        </div>
      </div>
      </div>

<div className="flex justify-end mr-6">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  
<Consultancy_data isOpen={isModalOpen} closeModal={closeModal} data={data}/>

  
</div>
  );
}
