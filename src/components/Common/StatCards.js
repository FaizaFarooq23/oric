import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

export default function StatCards({ icon, total, description, color }) {
  console.log(description);
  return (
    <div className="w-1/4  flex items-center gap-x-8 px-5 py-4 custom-shadow bg-white rounded-md">
      <div className="w-full flex flex-col gap-y-4">
        <div className="w-full flex justify-between">
          <div className="flex flex-col ">
            <span className="text-gray-600 text-lg">{description}</span>
            <span className="text-blue-900 text-3xl font-bold">{total}</span>
          </div>{" "}
          <div
            className="rounded-full text-3xl p-2 w-10 h-10 flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
        </div>
        {total >= 40 ?   (
          <div className="flex items-center gap-x-2">
          <div className={` flex items-center  text-green-700 gap-x-1`}>
            <FaArrowUp className="" />
            <span>{total}%</span>
            </div>
            <span>Since Last Month</span>
          </div>
        ):(
          <div className="flex items-center gap-x-2">
            <div className={` flex items-center  text-red-700 gap-x-1`}>
              <FaArrowDown className="" />
              <span>{total}%</span>
            </div>
            <span>Since Last Month</span>
          </div>
        )}
      </div>
    </div>
  );
}
