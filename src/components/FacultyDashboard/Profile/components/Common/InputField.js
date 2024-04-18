import React,{useState} from "react";

export default function InputField({ label, value, setVal, type ,required}) {
 

  return (
    <div className="grid grid-cols-2 gap-x-3   text-black">
      {
        required ?(
        <label className="text-base font-medium">
        {label} <span className="text-red-500">*</span>
      </label>):(
      <label className="text-base font-medium">
      {label}
    </label>)
      }
   

      <input
        className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
        type={type}
        defaultValue={value}
        onChange={(e) => setVal(e.target.value)}
        required ={required}
     
      />
 
    </div>
  );
}
