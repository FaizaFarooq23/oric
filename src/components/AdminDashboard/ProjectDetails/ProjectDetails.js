import React from "react";

export default function ProjectDetails({ projectData }) {
  if (!projectData) {
    return <p>Loading...</p>;
  }

  const formatDate = (date) => date ? date.split("T")[0] : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center font-bold pt-6 pb-10">
        {projectData.title}
      </h1>
      <div className="grid grid-cols-3 gap-y-8 gap-x-4">
        {projectData.Name_of_pi && (
          <p>
            <strong>Name of PI:</strong> {projectData.Name_of_pi}
          </p>
        )}
        {projectData.Designation_of_Pi && (
          <p>
            <strong>Designation of PI:</strong> {projectData.Designation_of_Pi}
          </p>
        )}
        {projectData.Department_of_Pi && (
          <p>
            <strong>Department of PI:</strong> {projectData.Department_of_Pi}
          </p>
        )}
        {projectData.username && (
          <p>
            <strong>Email of PI:</strong> {projectData.username}
          </p>
        )}
        {projectData.Thematic_Area && (
          <p>
            <strong>Thematic Area:</strong> {projectData.Thematic_Area}
          </p>
        )}
        {projectData.Name_of_Research_Grant && (
          <p>
            <strong>Name of Research Grant:</strong>{" "}
            {projectData.Name_of_Research_Grant}
          </p>
        )}
        {projectData.category && (
          <p>
            <strong>Category:</strong> {projectData.category}
          </p>
        )}
        {projectData.Status_of_proposal && (
          <p>
            <strong>Status of Proposal:</strong> {projectData.Status_of_proposal}
          </p>
        )}
        {projectData.Status_of_project && (
          <p>
            <strong>Status of Project:</strong> {projectData.Status_of_project}
          </p>
        )}
        {projectData.Date_of_Contract && (
          <p>
            <strong>Date of Contract:</strong> {formatDate(projectData.Date_of_Contract)}
          </p>
        )}
        {projectData.Date_of_ContractSigned && (
          <p>
            <strong>Date of Contract Signed:</strong> {formatDate(projectData.Date_of_ContractSigned)}
          </p>
        )}
        {projectData.Date_of_Approval && (
          <p>
            <strong>Date of Approval:</strong> {formatDate(projectData.Date_of_Approval)}
          </p>
        )}
        {projectData.Date_of_Submission && (
          <p>
            <strong>Date of Submission:</strong> {formatDate(projectData.Date_of_Submission)}
          </p>
        )}
        {projectData.Date_of_Completion && (
          <p>
            <strong>Date of Completion:</strong> {formatDate(projectData.Date_of_Completion)}
          </p>
        )}
        {projectData.start_Date && (
          <p>
            <strong>Start Date:</strong> {formatDate(projectData.start_Date)}
          </p>
        )}
        {projectData.end_Date && (
          <p>
            <strong>End Date:</strong> {formatDate(projectData.end_Date)}
          </p>
        )}
        {projectData.Name_of_Copi && (
          <p>
            <strong>Name of Co-PI:</strong> {projectData.Name_of_Copi}
          </p>
        )}
        {projectData.University_of_CoPi && (
          <p>
            <strong>University of Co-PI:</strong> {projectData.University_of_CoPi}
          </p>
        )}
        {projectData.Department_of_CoPi && (
          <p>
            <strong>Department of Co-PI:</strong> {projectData.Department_of_CoPi}
          </p>
        )}
        {projectData.Designation_of_CoPi && (
          <p>
            <strong>Designation of Co-PI:</strong> {projectData.Designation_of_CoPi}
          </p>
        )}
        {projectData.funding_agency && (
          <p>
            <strong>Funding Agency:</strong> {projectData.funding_agency}
          </p>
        )}
        {projectData.funding_requested && (
          <p>
            <strong>Funding Requested:</strong> {projectData.funding_requested}
          </p>
        )}
        {projectData.funding_approved && (
          <p>
            <strong>Funding Approved:</strong> {projectData.funding_approved}
          </p>
        )}
        {projectData.funding_realesed && (
          <p>
            <strong>Funding Released:</strong> {projectData.funding_realesed}
          </p>
        )}
        {projectData.funding_utilized && (
          <p>
            <strong>Funding Utilized:</strong> {projectData.funding_utilized}
          </p>
        )}
        {projectData.Collaborating_Partner && (
          <p>
            <strong>Collaborating Partner:</strong> {projectData.Collaborating_Partner}
          </p>
        )}
        {projectData.Cofunding_Partner && (
          <p>
            <strong>Cofunding Partner:</strong> {projectData.Cofunding_Partner}
          </p>
        )}
        {projectData.Remarks && (
          <p>
            <strong>Remarks:</strong> {projectData.Remarks}
          </p>
        )}
        {projectData.delivery && (
          <p>
            <strong>Delivery:</strong> {projectData.delivery}
          </p>
        )}
        {projectData.type_of_research && (
          <p>
            <strong>Type of Research:</strong> {projectData.type_of_research}
          </p>
        )}
        {projectData.Counterparts && (
          <p>
            <strong>Counterparts:</strong> {projectData.Counterparts}
          </p>
        )}
        {projectData.Sponcering_Agency_Name && (
          <p>
            <strong>Sponsoring Agency Name:</strong> {projectData.Sponcering_Agency_Name}
          </p>
        )}
        {projectData.Sponcering_Agency_Country && (
          <p>
            <strong>Sponsoring Agency Country:</strong> {projectData.Sponcering_Agency_Country}
          </p>
        )}
        {projectData.Sponcering_Agency_Address && (
          <p>
            <strong>Sponsoring Agency Address:</strong> {projectData.Sponcering_Agency_Address}
          </p>
        )}
        {projectData.ORIC_Overhead && (
          <p>
            <strong>ORIC Overhead:</strong> {projectData.ORIC_Overhead}
          </p>
        )}
        {projectData.Nationality && (
          <p>
            <strong>Nationality:</strong> {projectData.Nationality}
          </p>
        )}
      </div>
    </div>
  );
}
