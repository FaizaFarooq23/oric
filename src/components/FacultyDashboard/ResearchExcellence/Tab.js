import React, { useState } from "react";
import CaseStudy from "./components/CaseStudy/CaseStudy";
import ResearchLinks from "./components/ResearchLinks/ResearchLinks";
import RD from "./components/LiasenDeveloped/RD";
import Consultancy_contract from "./components/ConsultacyContract/Consultancy_contract";
import Modal from "./components/UI/selectionmodal";
import IPDisclosure from "./components/IPDisclosure/IPDisclosure";
import IP_Licensing from "./components/IP_Licensing/IP_Licensing";
import Product_to_industry from "./components/Product_to_Industry/Product_to_industry";
import ResearchProjectsForms from "./components/ResearchProjectsForm/ResearchProjectsForms";
import Product_Displayed from "./components/Product_displaued/Product_Displayed";

export default function Tabs() {
  const [selectionTab, setSelectionTab] = useState("");
  const [showModal, setShowModal] = useState(false); // Set showModal to true by default
  const [isIPMode, setIsIPMode] = useState(false); // State to manage IP mode
  const tabs = [
    {
      name: "Research Projects",
      component: <ResearchProjectsForms />,
    },
    {
      name: "Case Study",
      component: <CaseStudy />,
    },
    {
      name: "Research Links",
      component: <ResearchLinks />,
    },
    {
      name: "Liasen Development ",
      component: <RD />,
    },
    {
      name: "Consultancy Contract ",
      component: <Consultancy_contract />,
    },
  ];
  const IPtab = [
    {
      name: "IP Disclosures",
      component: <IPDisclosure />,
    },
    {
      name: "Product Displayed",
      component: <Product_Displayed />,
    },
    {
      name: "Agreement Signed ",
      component: <ResearchLinks />,
    },
    {
      name: "IP Licensing ",
      component: <IP_Licensing />,
    },
    {
      name: "Product Gone to Industry ",
      component: <Product_to_industry />,
    },
  ];
  const [activeTab, setActiveTab] = useState("Research Projects");
  const [activeIPTab, setActiveIPTab] = useState("IP Disclosures");

  const handleTabChange = (tab) => {
    setActiveTab(tab.name);
  };

  const handleIPTabChange = (IPtab) => {
    setActiveIPTab(IPtab.name);
  };

  return (
    <>
      <Modal isOpen={showModal}>
        <div className="flex flex-row -z-40">
          <div>
            <h1 className="text-lg m-4 text-center font-semibold">
              Select type of information you want to provide
            </h1>
            <div className="flex flex-row gap-x-10 justify-between m-4 items-center py-4">
              <button
                className="bg-blue-900 text-white px-4 m-auto py-2 text-center rounded-md"
                onClick={() => {
                  setSelectionTab("Research Excellence");
                  setShowModal(false);
                  setIsIPMode(false); // Set IP mode to false
                }}
              >
                Research Excellence
              </button>
              <button
                className="bg-blue-900 text-white px-4  m-auto  text-center py-2 rounded-md"
                onClick={() => {
                  setSelectionTab("IP and commercialization");
                  setShowModal(false);
                  setIsIPMode(true); // Set IP mode to true
                }}
              >
                Innovation & Commercialization
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex justify-end  ">
        <label className="flex items-center cursor-pointer ">
          {!isIPMode ? (
            <span className="mr-2 p-2">Research Excellence</span>
          ) : (
            <span className="ml-2 p-2">IP and Commercialization</span>
          )}
          <div
            className={`${
              isIPMode ? "bg-blue-600" : "bg-gray-200"
            } relative inline-block w-10 h-6 rounded-full transition duration-200 ease-in-out`}
            onClick={() => setIsIPMode(!isIPMode)}
          >
            <div
              className={`${
                isIPMode ? "translate-x-6" : "translate-x-0"
              } inline-block w-4 h-4 transform bg-white rounded-full shadow-lg transition duration-200 ease-in-out`}
            ></div>
          </div>
         
        </label>
      </div>

      {isIPMode ? (
        <div className="flex flex-col text-[#D8D8D8] text-sm font-medium pt-2 ">
          <div className="flex items-start justify-start gap-x-28 text-sm">
            {IPtab.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleIPTabChange(tab)}
                className={`${
                  activeIPTab === tab.name
                    ? " border-blue-900 text-blue-900 border-b-[3px]"
                    : "border-none"
                } flex items-center justify-center h-12 cursor-pointer hover:text-blue-900`}
              >
                {tab.name}
              </div>
            ))}
          </div>
          <div className="w-full">
            {IPtab.map((tab, index) => (
              <div key={index}>
                {activeIPTab === tab.name && tab.component}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-[#D8D8D8] text-sm font-medium pt-8 ">
          <div className="flex items-start justify-start gap-x-28 text-sm">
            {tabs.map((tab, index) => (
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
      )}
    </>
  );
}
