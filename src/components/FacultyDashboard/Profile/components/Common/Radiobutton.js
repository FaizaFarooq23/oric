import React from "react";

const RadioButtonGroup = ({ label, options, value, handleChange }) => {
  return (
    <div className="flex items-center mb-4"> {/* Apply Tailwind CSS classes for flex layout and margin-bottom */}
      <label className="mr-2 text-black text-base font-medium gap-x-16">{label}</label> {/* Apply Tailwind CSS className for margin-right */}
      {options.map((option) => (
        <div key={option} className="mr-2"> {/* Apply Tailwind CSS className for margin-right */}
          <input
            type="radio"
            id={option}
            name={label}
            value={option}
            checked={value === option}
            onChange={() => handleChange(option)}
            className="mr-1" 
          />
          <label  htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
