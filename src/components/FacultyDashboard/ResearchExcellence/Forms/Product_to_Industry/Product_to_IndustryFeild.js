import React ,{useState} from "react";

import { RiDeleteBin6Line } from 'react-icons/ri';
import Product_to_Industrydata from "./Product_to_industryData";

export default function Product_to_IndustryFeilds({data ,onDelete}) {
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
    <div className="flex flex-col bg-white shadow-lg m-4 h-48 rounded-md   ">
       <div className="flex justify-end items-center mr-6 mt-2">
          <button onClick={() => onDelete(data.id,`${data.id}_PdProof.png`)}>
            <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
          </button>
        </div>
    <div className={`flex  flex-row  h-36 justify-between px-10 py-8  `}>
      <div className={`flex flex-col gap-y-4  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Title of Invention</span>
        </div>
        <div className="flex justify-center ">
        <span className="text-black ">{`${data.Title_of_Invention
              .split(" ")
              .slice(0, 4)
              .join(" ")}...`}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Category </span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Category}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Development Status</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Development_Status}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Name of Lead Inventor</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Name_of_leadInventor}</span>
        </div>
      </div>
      </div>

<div className="flex justify-end mr-6">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  

<Product_to_Industrydata isOpen={isModalOpen} closeModal={closeModal} data={data}/>
  
</div>
  );
}
