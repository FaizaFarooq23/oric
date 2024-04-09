import AdminLayout from "@/components/AdminDashboard/AdminLayout/AdminLayout";
import Grid from "@/components/AdminDashboard/Grid/Grid";
import React, { useEffect, useState } from "react";

export default function index() {
  const [data, setData] = useState();

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

  return (
    <AdminLayout>
      <div className="flex flex-col py-8 gap-y-6">
        <div className="w-[90vw]">{data && <Grid data={data} />}</div>
      </div>
    </AdminLayout>
  );
}
