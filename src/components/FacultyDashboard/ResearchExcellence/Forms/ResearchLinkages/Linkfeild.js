import React ,{useState} from "react";
import Linkdata from "./Linkdata";
import { RiDeleteBin6Line } from 'react-icons/ri';
export default function Linkfield({data ,onDelete}) {
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
    <div className="flex flex-col bg-white shadow-lg mt-4 h-48 rounded-md   ">
       <div className="flex justify-end items-center mr-6 mt-2">
          <button onClick={() => onDelete(data.id,`${data.id}_MoUcopy.png`)}>
            <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
          </button>
        </div>
    <div className={`flex  flex-row  h-36 justify-between px-10 py-8  `}>
      <div className={`flex flex-col gap-y-4  w-52 m-4 gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Name of Research Grant</span>
        </div>
        <div className="flex justify-start ">
          <span className="text-black ">{data.Name_of_Research_Grant}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4  w-48 m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Type of LinkageS</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{data.Type_of_Linkage}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4  w-48 m-4  gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Feild Of Study</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{data.Feild_of_Study}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4  w-48  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Date of Agreement</span>
        </div>
        <div className="flex items-end justify-start ">
          <span className="text-black ">{data.Date_of_Agreement.split("T")[0]}</span>
        </div>
      </div>
      </div>

<div className="flex justify-end mr-6">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  
<Linkdata isOpen={isModalOpen} closeModal={closeModal} data={data}/>
  
</div>
  );
}
