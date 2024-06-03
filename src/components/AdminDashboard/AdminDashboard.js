import React, { useEffect, useState } from "react";
import StatCards from "../Common/StatCards";
import AdminLayout from "./AdminLayout/AdminLayout";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { FaResearchgate } from "react-icons/fa6";
import { MdOutlineQueryStats } from "react-icons/md";
import MonthlyChart from "./Chart/Chart";
import StatusChart from "./Chart/StatusChart";
const statsCardData = [
  {
    icon: <FaResearchgate />,
    total: 86,
    description: "Ongoing Researches ",
    key: "ongoing_researches",
    color: "#004b93",
    funding: false,
  },

  {
    icon: <CiMoneyCheck1 />,
    total: 30,
    description: "Funding",
    key: "funding",
    color: "#c9002b",
    funding: true,
  },
  {
    icon: <IoCalendarOutline />,
    total: 400,
    description: "Yearly Researches",
    key: "yearly_researches",
    color: "#219ebc",
    funding: false,
  },
  {
    icon: <MdOutlineQueryStats />,
    total: 120,
    description: "Popular Category",
    key: "popular_category",
    color: "#FFC42A",
    funding: false,
  },
];
export default function AdminDashboard() {
  const [data, setData] = useState();
  const [monthly_researches, setMonthlyResearches] = useState();
  const [statsData, setStatsData] = useState();
  const fetch_monthly_researches = async () => {
    const res = await fetch("/api/stats/research_stats");
    const data = await res.json();
    setMonthlyResearches(data.month_researches);
    const my_stats_data = {
      ongoing_researches: data.ongoing_projects,
      funding: data.funding,
      yearly_researches: data.research_in_a_fiscal_year,
      popular_category: data.popular_category,
    }
    console.log("My Stats", my_stats_data);
    setStatsData(my_stats_data);
  };

  const getData = async () => {
    const res = await fetch("/api/stats/reports");
    const data = await res.json();
    return data;
  };
  useEffect(() => {
    getData().then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);
  
  useEffect(() => {
    fetch_monthly_researches();
  }, []);




  return (
    <div className=" overflow-hidden">
      <AdminLayout>
        <div className="flex flex-col w-full px-6 gap-y-8 py-6 ">
          <div className="flex items-center justify-between gap-x-4 w-full">
            {statsCardData.map((item, index) => (
              <StatCards
                stats_data={statsData}
                icon={item.icon}
                total={item.total}
                description={item.description}
                color={item.color}
                item_key={item.key}
                key={index}
                funding={item.funding}
              />
            ))}
          </div>
          <div className="flex items-center">
            <div className=" w-full ">
              <MonthlyChart initialData={monthly_researches} />
            </div>
            <div className=" w-full ">
              <StatusChart initialData={monthly_researches} />
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
