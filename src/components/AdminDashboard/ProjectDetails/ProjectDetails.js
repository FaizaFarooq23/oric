import React from "react";

export default function ProjectDetails({ projectData }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-4">
      {/* {projectData.title}*/}     </h1> 
      {projectData ? (
        <div className="grid grid-cols-3 gap-y-8 gapy-x-4">
          <p>
            <strong>Username:</strong> {projectData.username}
          </p>
          <p>
            <strong>Thematic Area:</strong> {projectData.Thematic_Area}
          </p>
          <p>
            <strong>Name of Research Grant:</strong>{" "}
            {projectData.Name_of_Research_Grant}
          </p>
          <p>
            <strong>Category:</strong> {projectData.category}
          </p>
          <p>
            <strong>Status of Proposal:</strong>{" "}
            {projectData.Status_of_proposal}
          </p>
          <p>
            <strong>Status of Project:</strong> {projectData.Status_of_project}
          </p>
          <p>
            <strong>Date of Contract:</strong> {projectData.Date_of_Contract}
          </p>
          <p>
            <strong>Date of Contract Signed:</strong>{" "}
            {projectData.Date_of_ContractSigned}
          </p>
          <p>
            <strong>Date of Approval:</strong> {projectData.Date_of_Approval}
          </p>
          <p>
            <strong>Date of Submission:</strong>{" "}
            {projectData.Date_of_Submission}
          </p>
          <p>
            <strong>Date of Completion:</strong>{" "}
            {projectData.Date_of_Completion}
          </p>
          <p>
            <strong>Start Date:</strong> {projectData.start_Date}
          </p>
          <p>
            <strong>End Date:</strong> {projectData.end_Date}
          </p>
          <p>
            <strong>Name of PI:</strong> {projectData.Name_of_pi}
          </p>
          <p>
            <strong>Designation of PI:</strong> {projectData.Designation_of_Pi}
          </p>
          <p>
            <strong>Department of PI:</strong> {projectData.Department_of_Pi}
          </p>
          <p>
            <strong>Name of Co-PI:</strong> {projectData.Name_of_Copi}
          </p>
          <p>
            <strong>University of Co-PI:</strong>{" "}
            {projectData.University_of_CoPi}
          </p>
          <p>
            <strong>Department of Co-PI:</strong>{" "}
            {projectData.Department_of_CoPi}
          </p>
          <p>
            <strong>Designation of Co-PI:</strong>{" "}
            {projectData.Designation_of_CoPi}
          </p>
          <p>
            <strong>Funding Agency:</strong> {projectData.funding_agency}
          </p>
          <p>
            <strong>Funding Requested:</strong> {projectData.funding_requested}
          </p>
          <p>
            <strong>Funding Approved:</strong> {projectData.funding_approved}
          </p>
          <p>
            <strong>Funding Released:</strong> {projectData.funding_realesed}
          </p>
          <p>
            <strong>Funding Utilized:</strong> {projectData.funding_utilized}
          </p>
          <p>
            <strong>Collaborating Partner:</strong>{" "}
            {projectData.Collaborating_Partner}
          </p>
          <p>
            <strong>Cofunding Partner:</strong> {projectData.Cofunding_Partner}
          </p>
          <p>
            <strong>Remarks:</strong> {projectData.Remarks}
          </p>
          <p>
            <strong>Delivery:</strong> {projectData.delivery}
          </p>
          <p>
            <strong>Type of Research:</strong> {projectData.type_of_research}
          </p>
          <p>
            <strong>Counterparts:</strong> {projectData.Counterparts}
          </p>
          <p>
            <strong>Sponsoring Agency Name:</strong>{" "}
            {projectData.Sponcering_Agency_Name}
          </p>
          <p>
            <strong>Sponsoring Agency Country:</strong>{" "}
            {projectData.Sponcering_Agency_Country}
          </p>
          <p>
            <strong>Sponsoring Agency Address:</strong>{" "}
            {projectData.Sponcering_Agency_Address}
          </p>
          <p>
            <strong>ORIC Overhead:</strong> {projectData.ORIC_Overhead}
          </p>
          <p>
            <strong>Nationality:</strong> {projectData.Nationality}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
