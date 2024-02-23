import React from "react";
import Welcome from "./components/HamburgarComponents/Welcome";
import ProjectStatus from "./components/HamburgarComponents/ProjectStatus";

export default function Hamburgar() {
  return (
    <div className="mx-12  flex flex-col gap-y-6">
     <Welcome/>
     <ProjectStatus/>
     <div className="text-xl font-bold">
      Researches
     </div>
     <div className="flex items-center justify-between text-gray-300 font-medium ">
      <span className="text-blue-900 " >
        All Researches
      </span>
      <span className="cursor-pointer hover:text-blue-900">
        Newest
      </span>
      <span className="cursor-pointer hover:text-blue-900">
        Top Rated
      </span>
      <span className="cursor-pointer hover:text-blue-900">
        Most Popular
      </span>

     </div>
    </div>
  );
}
