import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import EditableField from "./EditableField";


export default function DataDisplay({data,heading, updateInfo , isEditable}) {


  const [isEditingValue, setIsEditingValue] = useState(false);

  const handleValueClick = () => {
    setIsEditingValue((prevIsEditing) => !prevIsEditing);
  };

  return (
    <div className="w-[50%]  flex flex-col bg-white shadow-lg rounded-md px-10 py-4 gap-y-4  mt-4">
      <div className="flex items-center justify-between">
        <span className="text-blue-900 text-base font-semibold">{heading}</span>
        {isEditable? 
        <span>
          <FaPencil
            className="text-base text-blue-900 cursor-pointer"
            onClick={handleValueClick}
          />
        </span>
        :
        <span></span>
        }

      </div>
      {data.map((item, index) => (
  <EditableField key={index} label={item.label} data={data} updateInfo={updateInfo} isEditingValue={isEditingValue} editedValue={item.value} handleValueClick={handleValueClick} />
))}
</div>

  
  );
}
