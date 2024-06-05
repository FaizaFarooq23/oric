import { useState } from "react";

export default function ResearchCallForm() {
  const [formData, setFormData] = useState({
    thematicArea: "",
    researchLink: "",
    mailingAddress: "",
    contactDetails: "",
    funding: "",
    donorAgency: "",
    deadline: "",
    eligibilityCriteria: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = confirm("Are you sure you want to submit?");
    if (!result) return;

    if (
      !formData.thematicArea ||
      !formData.researchLink ||
      !formData.mailingAddress ||
      !formData.contactDetails ||
      !formData.funding ||
      !formData.donorAgency ||
      !formData.deadline ||
      !formData.eligibilityCriteria
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/admin/generate_call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit research call");
      }

      const data = await response.json();
      console.log("Research call submitted:", data);

    } catch (error) {
      console.error("Error submitting research call:", error);

    }

    console.log(formData);
  };

  return (
    <div className="w-1/2 my-8 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        Generate Research Call
      </h2>
      <form onSubmit={handleSubmit}>
     <div className="grid grid-cols-2 gap-x-5">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="thematicArea"
          >
            Thematic Area
          </label>
          <input
            type="text"
            name="thematicArea"
            id="thematicArea"
            value={formData.thematicArea}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-900"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="researchLink"
          >
            Research Link
          </label>
          <input
            type="url"
            name="researchLink"
            id="researchLink"
            value={formData.researchLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 outline-blue-900 rounded-md"
            required
          />
        </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="mailingAddress"
          >
            Mailing Address
          </label>
          <input
            type="email"
            name="mailingAddress"
            id="mailingAddress"
            value={formData.mailingAddress}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 outline-blue-900 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="contactDetails"
          >
            Contact Details
          </label>
          <input
            type="text"
            name="contactDetails"
            id="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 outline-blue-900 rounded-md"
            required
          />
        </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="funding"
          >
            Funding required
          </label>
          <input
            type="number"
            name="funding"
            id="funding"
            value={formData.funding}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 outline-blue-900 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="donorAgency"
          >
            Donor Agency
          </label>
          <input
            type="text"
            name="donorAgency"
            id="donorAgency"
            value={formData.donorAgency}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 outline-blue-900 rounded-md"
            required
          />
        </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="deadline"
          >
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 outline-blue-900 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="researchLink"
          >
            Eligibility criteria
          </label>
          <input
            type="text"
            name="eligibilityCriteria"
            id="eligibilityCriteria"
            value={formData.eligibilityCriteria}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 outline-blue-900 rounded-md"
            required
          />
        </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 px-4 rounded-md  hover:bg-gradient-to-r from-blue-900 to-[#3e92cc] "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
