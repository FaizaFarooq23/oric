import React from "react";
export default function AwardsFields({ data }) {
  console.log(data);
  return (
    <div className={` flex justify-between bg-white shadow-lg rounded-md px-10 py-8 gap-y-10 mt-4 `}>
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
          <span className="text-black ">{data.Name_of_Organization}</span>
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
  );
}
