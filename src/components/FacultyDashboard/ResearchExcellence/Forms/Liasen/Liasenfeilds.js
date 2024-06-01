import DataDisplayModal from "@/components/FacultyDashboard/Profile/components/Common/FeildsData";
import React from "react";
import { RiDeleteBin6Line } from 'react-icons/ri';
export default function Liasenfeilds({data,onDelete}) {
  
  const formattedData = [
    { label: 'Liasen Developed', value:data.Liasen_developed_with },
    { label: 'Date of Execution', value:data.Date_of_exceution.split("T")[0] },
    
    // Add more fields as needed
  ];

  return (
    <div className="flex flex-col bg-white shadow-lg  my-2 h-30 rounded-md ">
 <div className="flex justify-end items-center mr-6  p-2 mt-4">
          <button onClick={() => onDelete(data.Liasen_id)}>
            <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
          </button>
        </div>
        <div className="p-4">
          <h1 className="text-blue-900 font-serif font-bold text-xl border-black">
            Liasen Information
          </h1>
          <div >
          <DataDisplayModal data={formattedData} />
          </div>
          
        
          
        </div>
    </div>
  
  );
}
