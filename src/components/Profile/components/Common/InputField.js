import React from "react";

export default function InputField({ label, value, setVal }) {
  return (
    <div className="grid grid-cols-2 ">
      <label className=" text-base font-medium">{label}</label>

      <input className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm" type="text" defaultValue={value} onChange={(e)=>setVal(e.target.value)} />
    </div>
  );
}
