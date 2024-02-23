import React, { useEffect } from "react";

export default function Dropdown({
  label,
  name,
  value,
  handleOptionChange,
  dropdownOptions,
}) {
  return (
    <div  className=" grid grid-cols-2  ">
      <label className="text-black text-base font-medium">
        {label}
        </label>
        <select name={name} defaultValue={value} onChange={handleOptionChange} className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm">
          {dropdownOptions.map((item) => (
            <option key={item} className="text-black " value={item}> {item}</option>
          ))}
        </select>

    </div>
  );
}
