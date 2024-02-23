import React from "react";
import ProgressBar from "react-customizable-progressbar";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
export default function ProjectStatus() {
  return (
    <div className="flex items-center justify-between w-full">
    <div className="bg-div-gray rounded-lg flex w-full items-center justify-between px-4 py-1 gap-x-2 ">
     <div className="flex items-center w-full gap-x-4">
      <div className="bg-white rounded-lg p-2">
        <img src="images/pencil.svg" alt="logo" className="" />
      </div>
      <div className="flex flex-col">
        <span className=" font-bold">Research Project </span>
        <span>Project category</span>
      </div>
      </div>
      <div className="flex items-center w-full justify-end">
        <ProgressBar
          progress={50}
          strokeWidth={6}
          trackStrokeWidth={6}
          radius={18}
          strokeColor="#0D47A1"
          children={
            <div className="indicator">
              50%
            </div>
          }
        />
      <div>
        <button className="bg-blue-900 text-white font-semibold rounded-md px-4 py-2">
          Continue
        </button>
      </div>
      </div>

    </div>
    <div className="flex pl-2 gap-x-1">   <IoArrowBackCircleOutline  className="h-10 w-10 cursor-pointer"/>
    <IoArrowForwardCircleOutline className="h-10 w-10 cursor-pointer" /></div>
  
    </div>
  );
}
