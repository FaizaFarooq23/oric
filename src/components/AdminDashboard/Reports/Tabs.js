import React, { useState } from "react";
import Grid from "../Grid/Grid";
import CaseStudyGrid from "../Grid/CaseStudyGrid";
import LiaisonGrid from "../Grid/LiaisonGrid";
import LinkageGrid from "../Grid/LinkageGrid";
import ConsultancyGrid from "../Grid/ConsultancyGrid";
import IpDisclosureGrid from "../Grid/IpDisclosureGrid";
import DeployedProjectsGrid from "../Grid/DeployedProjectsGrid";
import LicensingGrid from "../Grid/LicensingGrid";
import IndustrialGrid from "../Grid/IndustrialGrid";

export default function ResearchTabs({ data, }) {
  const [ipActiveTab, setIpActiveTab] = useState(false);
  const [activeTab, setActiveTab] = useState("Research Project Reports");
  const researchTabs = [
    {
      tabTitle: "Research Project Reports",
      component: <Grid data={data} />,
    },
    {
      tabTitle: "Case Studies",
      component: <CaseStudyGrid />,
    },
    {
      tabTitle: "Liaison Development",
      component: <LiaisonGrid />,
    },
    {
      tabTitle: "Research Links",
      component: <LinkageGrid/>,
    },
    {
      tabTitle: "Consaltancy Contracts",
      component: <ConsultancyGrid />,
    },
  ];

  const ipTabs = [
    {
      tabTitle: "IP Disclosures",
      component: <IpDisclosureGrid />,
    },
    {
      tabTitle: "Projects Deployed",
      component: <DeployedProjectsGrid/>,
    },
    {
      tabTitle: "IP Licensing",
      component: <LicensingGrid />,
    },
    {
      tabTitle: "Industrial Products",
      component: <IndustrialGrid/>,
    },
  ];

  const handleTabChange = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  const handleIpTabs = () => {
    setIpActiveTab(!ipActiveTab);
    setActiveTab(ipActiveTab ? "Research Project Reports" : "IP Disclosures");
  };

  const tabs = ipActiveTab ? ipTabs : researchTabs;

  return (
    <div className="flex flex-col items-center justify-center gap-y-8 w-full">
      <div className="flex flex-col items-center gap-y-10 research-shadow px-4 pb-10 pt-5 rounded-[10px] bg-white w-full">
        <div className="flex items-center justify-between w-full">
          <span className="text-xl text-blue-900 font-bold">
            {ipActiveTab
              ? "IP and Commercialization Reports"
              : "Research Reports"}
          </span>
          <div className="flex items-center">
            <button
              onClick={handleIpTabs}
              className="bg-blue-900 text-white rounded-full font-bold text-xs leading-[22px] py-1 w-40 2xl:w-56"
            >
              {ipActiveTab ? "Research Excellence" : "IP and Commercialization"}
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center w-full gap-x-4">
          {tabs.map((item, index) => (
            <div
              key={index}
              className={`${
                activeTab === item.tabTitle
                  ? "text-white bg-blue-900"
                  : "bg-white text-blue-900"
              } cursor-pointer rounded-full tab-shadow font-bold text-base leading-[22px] px-8 py-1`}
              onClick={() => handleTabChange(item.tabTitle)}
            >
              {item.tabTitle}
            </div>
          ))}
        </div>
        <div className="w-full">
          {tabs.find((item) => item.tabTitle === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}
