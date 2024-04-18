import React from "react";
import { RiDeleteBin6Line } from 'react-icons/ri';
export default function Liasenfeilds({data,onDelete}) {
  return (
    <div className="lex flex-col bg-white shadow-lg  h-30 rounded-md ">
 <div className="flex justify-end items-center mr-6  p-2 mt-4">
          <button onClick={() => onDelete(data.Liasen_id)}>
            <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
          </button>
        </div>
        <div className={`flex  flex-row  h-36 justify-between px-10 py-8 `}>
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">SN</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Liasen_id}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Liasen Develpoed With</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data. Liasen_developed_with}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Date of Execution</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Date_of_exceution.split("T")[0]}</span>
        </div>
      </div>
  

      
    </div>
    </div>
  
  );
}
