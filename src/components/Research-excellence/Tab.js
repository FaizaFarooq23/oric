import React, { useState, useEffect } from "react";
import CaseStudy from "./components/CaseStudy/CaseStudy";
import ResearchLinks from "./components/ResearchLinks/ResearchLinks";
import RD from "./components/LiasenDeveloped/RD";
import Research_Projects from "./components/Research_Projects/Research_Projects";
import Consultancy_contract from "./components/ConsultacyContract/Consultancy_contract";
import Modal from "./components/UI/selectionmodal";
import IPDisclosure from "./components/IPDisclosure/IPDisclosure";
import { Product_Displayed } from "./components/Product_displaued/Product_Displayed";
import IP_Licensing from "./components/IP_Licensing/IP_Licensing";
import Product_to_industry from "./components/Product_to_Industry/Product_to_industry";
export default function Tabs() {
  const [selectionTab, setSelectionTab] = useState("");
  const [showModal, setShowModal] = useState(true); // Set showModal to true by default
  const tabs = [
    {
      name: "Research Projects",
      component: <Research_Projects />,
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
      component:<IPDisclosure/>
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
      component: <IP_Licensing/>,
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
// Close the modal after selection
  };
  const handleIPTabChange = (IPtab) => {
    setActiveIPTab(IPtab.name);
// Close the modal after selection
  };


  return (
    <>
      <Modal isOpen={showModal}>
        <div className="flex flex-row">
        <div>
        <h1 className="text-lg m-4  text-center font-semibold">
          Select type of information you want to provide
        </h1>
        <div className="flex flex-row gap-x-10 justify-between m-4 items-center py-4">
          <button
            className="bg-blue-900 text-white px-4 m-auto py-2 text-center rounded-md"
            onClick={() => {
              setSelectionTab("Research Excellence");
              setShowModal(false); // Close the modal after selection
            }}
          >
            Research Excellence
          </button>
          <button
            className="bg-blue-900 text-white px-4  m-auto  text-center py-2 rounded-md"
            onClick={() => {
              setSelectionTab("IP and commercialization");
              setShowModal(false); // Close the modal after selection
            }}
          >
            Innovation & Commercialization
          </button>
        </div>
        </div>
        </div>
        
      
      </Modal>
    
      {selectionTab === "Research Excellence" ? (
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
              <div key={index}>{activeTab === tab.name && tab.component}</div>
            ))}
          </div>
        </div>
      ): <div className="flex flex-col text-[#D8D8D8] text-sm font-medium pt-8 ">
      <div className="flex items-start justify-start gap-x-28 text-sm">
        {IPtab.map((IPtab, index) => (
          <div
            key={index}
            onClick={() => handleIPTabChange(IPtab)}
            className={`${
              activeIPTab === IPtab.name
                ? " border-blue-900 text-blue-900 border-b-[3px]"
                : "border-none"
            } flex items-center justify-center h-12 cursor-pointer hover:text-blue-900`}
          >
            {IPtab.name}
          </div>
        ))}
      </div>
      <div className="w-full">
        {IPtab.map((IPtab, index) => (
          <div key={index}>{activeIPTab === IPtab.name && IPtab.component}</div>
        ))}
      </div>
    </div>}
    </>
  );
}
