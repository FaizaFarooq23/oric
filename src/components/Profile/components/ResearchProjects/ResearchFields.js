import React from "react";
export default function ResearchFields({ data }) {
  console.log(data);
  return (
    <div className={` flex justify-between bg-white shadow-lg rounded-md px-10 py-8 gap-y-10 mt-4 `}>
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Title</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.title}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Start Date</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.start_date.split("T")[0]}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">End Date</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.end_date.split("T")[0]}</span>
        </div>
      </div>
      
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Status</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.status}</span>
        </div>
      </div>
      
      
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Category</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.category}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Type of Research</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.type_of_research}</span>
        </div>
      </div>
    </div>
  );
}
