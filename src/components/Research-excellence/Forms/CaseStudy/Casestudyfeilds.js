
import React ,{useState} from "react";
import Casestudydata from "./Casestudydata";
export default function Casestudyfeilds({data}) {
  const [showMore, setShowMore] = useState(false);
  const [isformVisible, setisformVisible] = useState(false);
  const handleToggleShowMore = () => {
    setShowMore(!showMore);
    setisformVisible(true)
  };
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
      <div className={`flex flex-col gap-y-4  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">SN</span>
        </div>
        <div className="flex justify-center ">
          <span className="text-black ">{data.id}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Name of Government Body</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Name_of_Government_Body}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Area Advocated</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Area_advocated}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Date of Presentation</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Date_of_presentation}</span>
        </div>
      </div>
      
      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Research Backing Status</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Banking_research_status}</span>
        </div>
      </div>
   

      </div>
      <div className="flex justify-end">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  
<Casestudydata isOpen={isModalOpen} closeModal={closeModal} data={data}/>
  
</>
  );
}
