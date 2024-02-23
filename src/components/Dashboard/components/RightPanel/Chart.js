import React, { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Chart() {
  // Sample data
  const initialData = [
    { name: "Jan", uv: 500, pv: 2400 },
    { name: "Feb", uv: 800, pv: 4567 },
    { name: "Mar", uv: 600, pv: 1398 },
    { name: "April", uv: 700, pv: 2600 },
    { name: "May", uv: 200, pv: 4167 },
    { name: "June", uv: 100, pv: 1698 },
    // Add more data points as needed
  ];

  const [data, setData] = useState(initialData);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl font-bold">Statistics</div>
      <div className="flex justify-between ">
      <div className="flex  gap-x-4"> <span className=" font-bold text-blue-900">Researches in progress </span>
        <span>category </span>
        </div> 
        <div className="bg-div-gray rounded-lg px-2 py-1 flex items-center gap-x-2 font-semibold text-sm">
          Monthly
          <MdKeyboardArrowDown />
        </div>
      </div>
      <div className="">
      <LineChart width={520} height={250} data={data} className="-ml-6 mt-2">
        <XAxis dataKey="name" axisLine={false} />
        <YAxis axisLine={false}/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#1d51ab" />
        <Line type="monotone" dataKey="pv" stroke="#ccaf00" />
      </LineChart>
      </div>
    </div>
  );
}
