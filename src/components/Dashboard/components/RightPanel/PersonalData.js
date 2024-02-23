import React from "react";

export default function PersonalData({ completed,inProgress }) {
  return (
    <div className="flex items-center justify-between gap-x-4 ">
      <div className="flex items-center gap-x-2 bg-div-gray py-2 px-4 rounded-lg">
        <span className="text-4xl font-bold ">{completed}</span>
        <span>Researches Completed</span>
      </div>
      <div className="flex items-center gap-x-2 bg-div-gray py-2 px-4 rounded-lg">
        <span className="text-4xl  font-bold">{inProgress}</span>
        <span className="">Researches in  Progress</span>
      </div>
    </div>
  );
}
