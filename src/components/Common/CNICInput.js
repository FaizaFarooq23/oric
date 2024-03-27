// CnicInput.js
import React, { useState } from "react";

const CnicInput = ({ value, onChange, error,label }) => {
  // Function to format CNIC dynamically (e.g., 12345-1234567-8)
  const formatCnic = (inputCnic) => {
    // Remove all non-numeric characters
    inputCnic = inputCnic.replace(/\D/g, "");

    // Insert dashes in the appropriate places
    let formattedCnic = "";
    for (let i = 0; i < inputCnic.length; i++) {
      if (i === 5 || i === 12) {
        formattedCnic += "-";
      }
      formattedCnic += inputCnic.charAt(i);
    }
    return formattedCnic;
  };

  const handleCnicChange = (e) => {
    const inputCnic = e.target.value;
    const formattedCnic = formatCnic(inputCnic);
    onChange(formattedCnic);
  };

  return (
    <div className="w-full">
                <label
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      <input
        type="text"
        value={value}
        onChange={handleCnicChange}
        placeholder="xxxxx-xxxxxxx-x"
        className="w-full appearance-none rounded-lg 
       bg-gray-100 py-2 px-3 text-black placeholder-gray-500 focus:z-10 focus:border-mustard-yellow  focus:ring-slate-100  focus:outline-none  sm:text-sm"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default CnicInput;
