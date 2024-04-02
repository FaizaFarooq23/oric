import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MonthlyChart({ initialData }) {
  // Sample data
  console.log(initialData);

  const [data, setData] = useState(initialData);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={520}
            height={250}
            data={initialData}
            className="-ml-10 mt-2"
          >
            <XAxis dataKey="month" axisLine={false} />
            <YAxis axisLine={false} />
            <Tooltip />
            <Legend values="Monthly Researhces" />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Bar type="monotone" dataKey="researches" fill="#0D47A1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
