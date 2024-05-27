import React, { useState } from "react";
import Grid from "../AdminDashboard/Grid/Grid";

export default function ResearchTabs({ data }) {
  const researchTabs = [
    {
      tabTitle: "Research Project Reports",
      component: <Grid data={data} />,
    },
    {
      tabTitle: "Case Studies",
    },
    {
      tabTitle: "Liasen Development",
    },
    {
      tabTitle: "Research Links",
    },
    {
      tabTitle: "Consaltancy Contracts",
    },
  ];

  const ipTabs = [
    {
      tabTitle: "IP Disclosures",
    },
    {
      tabTitle: "Projects Deployed",
    },
    {
      tabTitle: "Agreements Signed",
    },
    {
      tabTitle: "IP Licensing",
    },
    {
      tabTitle: "Industrial Products",
    },
  ];

  const [activeTab, setActiveTab] = useState("Research Project Reports");
  const [ipActiveTab, setIpActiveTab] = useState("IP Disclosures");

  const handleIpTabs = () => {
    setIpActiveTab(!ipActiveTab);
  };

  const handleTabChange = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-8 w-full">
      <div className="flex flex-col items-center gap-y-10 research-shadow px-4 pb-10 pt-5 rounded-[10px] bg-white w-full">
        <div className="flex items-center justify-between w-full">
          <span className="text-xl text-blue-900 font-bold">
          {ipActiveTab
                ? "Research Reports "
                : "Ip and Commercialization Reports "}
          </span>
          <div className="flex items-center">
            <button
              onClick={handleIpTabs}
              className="bg-blue-900 text-white rounded-full font-bold text-xs leading-[22px] py-1 w-40 2xl:w-56"
            >
              {ipActiveTab
                ? "IP and Commercialization"
                : "Research Excellence "}
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center w-full gap-x-4">
          {!ipActiveTab
            ? researchTabs.map((item, index) => (
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
              ))
            : ipTabs.map((item, index) => (
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
          {researchTabs.find((item) => item.tabTitle === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}
