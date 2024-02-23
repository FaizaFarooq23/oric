import React, { useState } from "react";
import Dropdown from "../Common/Dropdown";
import Modal, { useModalState } from "react-simple-modal-provider";

export default function AwardsModal({ children }) {
  const [isOpen, setOpen] = useModalState();

  const [title, setTitle] = useState("Copley");
  const [type, setType] = useState("National");
  const [category, setCategory] = useState("Best Researcher");
  const [sponser, setSponser] = useState("Royal Society");
  const [field, setField] = useState("Science");
  const [year, setYear] = useState("2020");


  const dropdowns = [
    {
      label: "Title",
      option: [
        "Copley",
        "Japan Prize",
        " Nobel Prize ",
        "Turing Award",
        "Fields Medal",
        "Abel Prize",
        "Crafoord Prize",
        "Kyoto Prize",
        "Lasker Award",
        "Pulitzer Prize",
        "Turing Award",
        "Wolf Prize",
        "Wollaston Medal",
        "Wright Brothers Medal",
        "Zayed International Prize for the Environment",
        "Zayed International Prize for the Environme",
      ],
      selectedValue: "",
    },
    {
      label: "Type",
      option: ["National", "International"],
      selectedValue: "",
    },

    {
      label: "Category",
      option: ["Best Researcher", "Best Young Researcher", "Best Publication "],
        selectedValue: "",
    },
    {
      label: "Sponser",
      option: [
        "Royal Society",
        "Japan Prize Foundation",
        "The Royal Swedish Academy of Sciences",
        "Welch Foundation",
      ],
      selectedValue: "",
    },
    {
      label: "Field ",
      option: ["Science", "Technology", "Engineering", "Mathematics"],
      selectedValue: "",
    },
    {
      label: "Year",
      option: [
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
      ],
      selectedValue: "",
    },
  ];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const handleSponserChange = (e) => {
    setSponser(e.target.value);
  }

  const handleFieldChange = (e) => {
    setField(e.target.value);
  }

  const handleYearChange = (e) => {
    setYear(e.target.value);
  }



  const handleSubmit = async () => {
    console.log(title, type, category, sponser, field, year)
    setOpen(false);
  }




  return (
    <Modal
      id={"AwardsModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}

    >
        <div className="flex items-center justify-center">
      <div className=" w-[70%] flex flex-col  gap-y-8  bg-white shadow-lg rounded-md px-10 py-8 ">
        <div className=" grid grid-cols-2 gap-y-8 gap-x-20 ">
          <Dropdown
            label={"Title"}
            dropdownOptions={dropdowns[0].option}
            value={title}
            handleOptionChange={handleTitleChange}
          />

          <Dropdown
          label={"Type"}
          dropdownOptions={dropdowns[1].option}
          value={type}
          handleOptionChange={handleTypeChange}
          />

          <Dropdown
          label={"Category"}
          dropdownOptions={dropdowns[2].option}
          value={category}
          handleOptionChange={handleCategoryChange}
          />

          <Dropdown
          label={"Sponser"}
          dropdownOptions={dropdowns[3].option}
          value={sponser}
          handleOptionChange={handleSponserChange}
          />

          <Dropdown
          label={"Field"}
          dropdownOptions={dropdowns[4].option}
          value={field}
          handleOptionChange={handleFieldChange}
          />

          <Dropdown
          label={"Year"}
          dropdownOptions={dropdowns[5].option}
          value={year}
          handleOptionChange={handleYearChange}
          />


          
        </div>
        <div className="flex items-center justify-center w-full">
          <button onClick={handleSubmit} className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4">
            Save
          </button>
        </div>
      </div>
      </div>
    </Modal>
  );
}
