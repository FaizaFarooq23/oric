import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export default function MonthlyChart({ initialData }) {
  
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
            <Tooltip/>
            <Legend  />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Bar type="monotone" dataKey="Submitted" fill="#0D47A1" activeBar={<Rectangle fill="#0D47A1"/>} />
            <Bar type="monotone" dataKey="Approved" fill="#3e92cc" activeBar={<Rectangle fill="#3e92cc"/>} />
          
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
