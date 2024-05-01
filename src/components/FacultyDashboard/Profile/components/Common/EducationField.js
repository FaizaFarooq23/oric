import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function EducationField({ data ,onDelete}) {
  return (
    <div>
    <div className="flex justify-end items-center mr-6 mt-4">
        <button onClick={() => onDelete(data.education_id)}>
          <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
        </button>
      </div>
 <div className="flex  flex-row  justify-between px-10 py-8">
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Degree</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.degree}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Field of Study</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.field_of_study}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Institute</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.institute}</span>
        </div>
      </div>
      
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Registration Number</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.registration_number}</span>
        </div>
      </div>
      
      
      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">CGPA</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.cgpa}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 flex-wrap gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Graduation Year</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.year}</span>
        </div>
      </div>

      

      

    </div>
    </div>
   
  );
}
