
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function PersonalData({ username }) {
  const [completed, setCompleted] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  useEffect(() => {
    // Fetch data from the backend
    async function fetchData() {
      try {
        const response = await axios.get(`/api/Research_projects/get_research_project?username=${username}`);
        const researchProjects = response.data;

        // Process the received data to calculate completed and in-progress projects
        let completedCount = 0;
        let inProgressCount = 0;
        researchProjects.forEach((project) => {
          if (project.Status_of_project === "Completed") {
            completedCount++;
          } else if (project.Status_of_project === "Ongoing") {
            inProgressCount++;
          }
        });

        // Update state variables with the counts
        setCompleted(completedCount);
        setInProgress(inProgressCount);
      } catch (error) {
        console.error("Error fetching research projects:", error);
      }
    }

    // Call the fetchData function
    fetchData();
  }, [username]); // Fetch data whenever username changes
  return (
    <div className="flex items-center justify-between gap-x-4 ">
      <div className="flex items-center gap-x-2 bg-div-gray py-2 px-4 rounded-lg">
        <span className="text-4xl font-bold ">{completed}</span>
        <span>Researches Completed</span>
      </div>
      <div className="flex items-center gap-x-2 bg-div-gray py-2 px-4 rounded-lg">
        <span className="text-4xl  font-bold">{inProgress}</span>
        <span className="">Researches in  Progress</span>
      </div>
    </div>
  );
}
