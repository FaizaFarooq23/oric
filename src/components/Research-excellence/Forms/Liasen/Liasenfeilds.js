import React from "react";
export default function Liasenfeilds({data}) {
  return (
    <div className={`flex flex-row justify-between bg-white shadow-lg rounded-md px-10 py-8 mt-4 `}>
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
          <span className="text-black ">{data.Date_of_exceution}</span>
        </div>
      </div>
  

      
    </div>
  );
}
