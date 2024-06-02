import {React,useState, useEffect} from "react";
import Welcome from "./components/HamburgarComponents/Welcome";
import ProjectStatus from "./components/HamburgarComponents/ProjectStatus";
import Awards from "../FacultyDashboard/Profile/Tabs/Awards";
import Event from "../FacultyDashboard/Profile/Tabs/Events";
import Chart from "@/components/AdminDashboard/Chart/Chart";

export default function Hamburgar() {
  const [monthlyResearches, setMonthlyResearches] = useState();

  

    const tabs = [
      {
        name: "Civil Enagement Events",
        component: <Event/>,
      },
    
    ];
  
    const [activeTab, setActiveTab] = useState("Civil Enagement Events");
  
    const handleTabChange = (tab) => {
      setActiveTab(tab.name);
    };
  
  return (
    <div className="mx-16 w-5/12 flex flex-col gap-y-6">
     <Welcome/>
     {/* <ProjectStatus/> */}
     {/* <div className="text-xl font-bold">
      Researches
     </div> */}
     <div className="flex flex-col text-[#D8D8D8] text-sm font-medium ">
      <div className=" flex  items-start justify-start gap-x-10">{tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => handleTabChange(tab)}
          className={`${
            activeTab === tab.name
              ? " border-blue-900 text-blue-900 border-b-[3px]"
              : "border-none"
          } flex items-center justify-center h-12 cursor-pointer hover:text-blue-900`}
        >
          {tab.name}
        </div>

      ))}
      </div>
      <div className="w-full">
        {tabs.map((tab, index) => (
          <div key={index}>
            {activeTab === tab.name && tab.component}
          </div>
        ))}
        </div>
    </div>
    
    </div>
  );
}
