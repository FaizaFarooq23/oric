import React, { useEffect, useState } from "react";
import StatusChart from "@/components/AdminDashboard/Chart/StatusChart";
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function Chart() {
  const {data: session} = useSession();
  const [monthlyResearches, setMonthlyResearches] = useState();

  const fetchMonthlyResearches = async () => {
    try {
      const res = await axios.get(`/api/Research_projects/faculty_stats`, {
        params: {
          username: session.user.username,
        }
      });
      setMonthlyResearches(res.data.month_researches);
    } catch (error) {
      console.error("Error fetching monthly researches:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyResearches();
  }, []);

  return (
    <div className="flex flex-col   gap-y-4">
      <div className="text-xl font-bold">Statistics</div>
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <span className="font-bold text-blue-900">Researches in progress </span>
        </div>
        <div className="bg-div-gray rounded-lg px-2 py-1 flex items-center gap-x-2 font-semibold text-sm">
          Monthly
        </div>
      </div>
      <div>
        <div className="w-full">
          <StatusChart initialData={monthlyResearches} />
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}
