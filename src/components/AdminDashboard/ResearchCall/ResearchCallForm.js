import { useState } from 'react';

export default function ResearchCallForm() {
  const [formData, setFormData] = useState({
    thematicArea: '',
    researchLink: '',
    researchStartDate: '',
    researchEndDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (

        <div className="w-1/2 my-8 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Generate Research Call</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="thematicArea">
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="researchLink">
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
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="researchStartDate">
            Research Start Date
          </label>
          <input
            type="date"
            name="researchStartDate"
            id="researchStartDate"
            value={formData.researchStartDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="researchEndDate">
            Research End Date
          </label>
          <input
            type="date"
            name="researchEndDate"
            id="researchEndDate"
            value={formData.researchEndDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 outline-blue-900 rounded-md"
            required
          />
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
