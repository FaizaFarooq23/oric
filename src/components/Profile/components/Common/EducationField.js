import React from "react";
export default function EducationField({ data }) {
  return (
    <div className={` flex justify-between bg-white shadow-lg rounded-md px-10 py-8 gap-y-10 mt-4 `}>
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
          <span className="text-black ">{data.year.split("-")[0]}</span>
        </div>
      </div>

      

      

    </div>
  );
}
