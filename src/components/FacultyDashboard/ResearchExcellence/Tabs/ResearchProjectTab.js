import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Researchprojectfeilds from '../Forms/ResearchProjects/Researchprojectfeilds';

export default function ResearchProjectTab() {
  const { open: openModal } = useModal("ResearchProjectFormModal");
  const { data: session } = useSession();
  const [research_projectData, setresearch_projectData] = useState([]);
  const [filterOption, setFilterOption] = useState('all'); // Default filter option is 'all'
  const [researchTypeOption, setResearchTypeOption] = useState('all'); // Default research type option is 'all'

  useEffect(() => {
    const fetchResearch_ProjectData = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/Research_projects/get_research_project`, {
            params: {
              username: session.user.username,
            }
          });
          setresearch_projectData(res.data);
        }
      } catch (error) {
        console.error("Error fetching Research Project  information:", error);
      }
    };

    fetchResearch_ProjectData();
  }, [session]);
  const handleDeleteProject = async (project_id) => {
    try {
      await axios.delete(`/api/Research_projects/delete_research_project?projectId=${project_id}`);
      console.log('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  // Filter function based on the selected options
  const filterData = (data) => {
    const statusFilter =
      filterOption === 'all' || data.Status_of_proposal === filterOption;

    const researchTypeFilter =
      researchTypeOption === 'all' ||
      data.category === researchTypeOption ||
      data.type_of_research === researchTypeOption;

    return statusFilter && researchTypeFilter;
  };

  return (
    <div>
      <div className='grid grid-cols-2'>
      {/* Dropdown for filter options */}
      <div className="flex m-4 ">
        <div className="mr-4 ">
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="border border-gray-300 rounded-md p-2 outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black"
          >
            <option value="all">Show All</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
            {/* Add more filter options as needed */}
          </select>
        </div>
       
        <div>
          <select
            value={researchTypeOption}
            onChange={(e) => setResearchTypeOption(e.target.value)}
            className="border border-gray-300 rounded-md p-2 outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black"
          >
            <option value="all">All Research Types</option>
            <option value="Solo Project">Solo</option>
            <option value="Joint Research">Joint</option>
            <option value="Contract Research">Contract</option>
            {/* Add more research type options as needed */}
          </select>
        </div>

      </div>
 <div className='flex justify-end items-center gap-x-8 text-2xl m-4'>
        <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
      </div>
      </div>
    
      {/* Render research projects based on the filtered data */}
      {research_projectData.filter(filterData).map((data, index) => (
        <div className="flex flex-col" key={index}>
          <Researchprojectfeilds data={data} onDelete={handleDeleteProject} />
        </div>
      ))}
    </div>
  );
}
