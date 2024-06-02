import AdminLayout from "@/components/AdminDashboard/AdminLayout/AdminLayout";
import ResearchTabs from "@/components/AdminDashboard/Reports/Tabs";
import React, { useEffect, useState } from "react";

export default function Index() {
  const [data, setData] = useState(null);
  const [caseStudyData, setCaseStudyData] = useState(null);
  const [liaisonData, setLiaisonData] = useState(null);
  const [linkageData, setLinkageData] = useState(null);
  const [consultancyData, setConsultancyData] = useState(null);

  const fetchData = async (endpoint, setData) => {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error(`Failed to fetch from ${endpoint}, status: ${res.status}`);
      }
      const data = await res.json();
      console.log(`Data fetched from ${endpoint}:`, data);
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    fetchData("/api/stats/reports", setData);
    fetchData("/api/stats/research-excellence-api/case-study/get_case_study", setCaseStudyData);
    fetchData("/api/stats/research-excellence-api/liaison_development", setLiaisonData);
    fetchData("/api/stats/research-excellence-api/get-research-links", setLinkageData);
    fetchData("/api/stats/research-excellence-api/git-consultancy-contract", setConsultancyData);
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col py-8 gap-y-6">
      <div className="w-[90vw]">
          {data ? (
            <ResearchTabs data={data} />
          ) : caseStudyData ? (
            <ResearchTabs caseStudyData={caseStudyData} />
          ) : liaisonData ? (
            <ResearchTabs liaisonData={liaisonData} />
          ) : linkageData ? (
            <ResearchTabs linkageData={linkageData} />
          ) : consultancyData ? (
            <ResearchTabs consultancyData={consultancyData} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
