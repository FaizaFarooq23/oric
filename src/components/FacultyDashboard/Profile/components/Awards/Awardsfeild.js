import React ,{useState} from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import Awardsdata from "./AwardsData";
export default function AwardsFields({ data ,onDelete}) {
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
    <div className={`flex flex-col bg-white shadow-lg rounded-md  m-4 `}>
            <div className="flex justify-end items-center mr-6 mt-4">
        <button onClick={() => onDelete(data.id ,`${data.Title_of_award}_MoUcopy.png`)}>
          <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
        </button>
      </div>
      <div className="flex  flex-row  justify-between px-10 py-8">
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>

        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Title</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Title_of_award}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Name of Organization</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Name_of_organization}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Prize Amount</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Amount_of_prize}</span>
        </div>
      </div>
      </div>
      <div className="flex justify-end  mr-6">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  
<Awardsdata isOpen={isModalOpen} closeModal={closeModal} data={data}/>
    </div>
  );
}
