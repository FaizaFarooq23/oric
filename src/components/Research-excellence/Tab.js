import React, { useState } from "react";
import CaseStudy from "./components/CaseStudy/CaseStudy";
import ResearchLinks from "./components/ResearchLinks/ResearchLinks";
import RD from "./components/LiasenDeveloped/RD";
import Research_Projects from "./components/Research_Projects/Research_Projects";

export default function Tabs() {
  const tabs = [
    {
        name: "Research Projects",
        component: <Research_Projects/>
      },
   
    {
      name: "Case Study",
      component: <CaseStudy/>,
    },
    {
        name: "Research Links",
        component: <ResearchLinks/>,
      },
      {
        name: "Liasen Development ",
        component: <RD/>,
      },
    
    
  
  ];

  const [activeTab, setActiveTab] = useState("Personal");

  const handleTabChange = (tab) => {
    setActiveTab(tab.name);
  };

  return (
    <div className="flex flex-col text-[#D8D8D8] text-sm font-medium pt-8 ">
      <div className=" flex  items-start justify-start gap-x-28 text-sm">{tabs.map((tab, index) => (
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
  );
}
