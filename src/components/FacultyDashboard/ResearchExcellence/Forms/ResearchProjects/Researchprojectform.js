import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal, { useModalState } from "react-simple-modal-provider";
import SuccessModal from "../../components/UI/SuccessMessage";
import { uploadFile } from "../../Utility/Saveimagefiles";
import useFieldCheck from "../../Utility/CheckExsistingFeilds";
import RadioButtonGroup from "@/components/FacultyDashboard/Profile/components/Common/Radiobutton";
function Researchprojectform({ children }) {
  const [isOpen, setOpen] = useModalState();
  
  const [TitleofResearch, setTitleofResearch] = useState("");
  const [ThematicArea, setThematicArea] = useState("");
  const [NameResearchGrant, setNameResearchGrant] = useState("");
  const [category, setcategory] = useState("HEC");
  const [Status_of_proposal, setStatus_of_proposal] = useState("Submitted");
  const [Status_of_project, setStatus_of_project] = useState("Ongoing");
  const [DateofContract, setDateofContract] = useState("");
  const [DateofContractSigned, setDateofContractSigned] = useState("");
  const [DateofApproval, setDateofApproval] = useState("");
  const [DateofSubmission, setDateofSubmission] = useState("");
  const [DateofCompletion, setDateofCompletion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Nameofpi, setNameofPi] = useState("");
  const [DesignationofPi, setDesignationofPi] = useState("");
  const [DepartmentofPi, setDepartmentofPi] = useState("");
  const [NameofCopi, setNameofCoPi] = useState("");
  const [UniversityofCoPi, setUniversityofCoPi] = useState("");
  const [DepartmentofCoPi, setDepartmentofCoPi] = useState("");
  const [DesignationofCoPi, setDesignationofCoPi] = useState("");
  const [fundingRequested, setFundingRequested] = useState("");
  const [fundingRealesed, setFundingRealesed] = useState("");
  const [fundingApproved, setFundingApproved] = useState("");
  const [funding_nationality, setfunding_nationality] = useState("National");
  const [fundingUtilized, setFundingUtilized] = useState("");
  const [CollaboratingPartner, setCollaboratingPartner] = useState("");
  const [CofundingPartner, setCofundingPartner] = useState("");
  const [fundingagency, setfundingagency] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [delivery, setdelivery] = useState("");
  const [typeofresearch, settypeofresearch] = useState("Solo Project");
  const [Counterparts, setCounterparts] = useState("");
  const [SponceringAgencyName, setSponceringAgencyName] = useState("");
  const [Sponcering_Agency_Country, setSponceringAgencyCountry] = useState("");
  const [SponceringAgencyAddress, setSponceringAgencyAdress] = useState("");
  const [SubmissionEmailCopy, setSubmissionEmailCopy] = useState("");
  const [AwardLetterCopy, setAwardLetterCopy] = useState("");
  const [CompletionLetterCopy, setCompletionLetterCopy] = useState("");
  const [ContractAgreementCopy, setContractAgreementCopy] = useState("");
  const [ORIC_overhead, setORIC_overhead] = useState("");
  const [stage, setStage] = useState(1);
  const [reviwedbyIRB, setreviwedbyIRB] = useState("");
  const [Date_of_review, setDate_of_review] = useState("");
  const [meetingdecision, setmeetingdecision] = useState("Approved");
  const [meetingminutes, setmeetingminutes] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setshowSuccessSuccessModal] = useState(false); // State to control SuccessModal visibility // State to control SuccessModal visibility
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    console.log(session);
  }, [session]);
 
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  const handlecategoryChange = (e) => {
    setcategory(e.target.value);
  };
  const handleReveiwedBYIRBChange = (e) => {
    setreviwedbyIRB(e);
  };
  const handleStatus_of_proposalChange = (e) => {
    setStatus_of_proposal(e.target.value);
  };
  const handleProjectStatus = (e) => {
    setStatus_of_project(e.target.value);
  };
  const handleTypeofresearchChange = (e) => {
    settypeofresearch(e.target.value);
  };
  const handleRemarkschange = (e) => {
    setRemarks(e.target.value);
  };
  const handledeliverychange = (e) => {
    setdelivery(e.target.value);
  };
  const handleagnecynationalitychange = (e) => {
    setfunding_nationality(e.target.value);
  };
  const handlemeetingdecisionchange = (e) => {
    setmeetingdecision(e.target.value);
  };
  // Define a function to handle moving to the next stage
  const nextStage = async () => {
    switch (stage) {
      case 1:
        if (await validateFormStage1()) {
          setStage(stage + 1);
        }
        break;
      case 2:
        if (validateFormStage2()) {
          setStage(stage + 1);
        }
        break;
      case 3:
        if (validateFormStage3()) {
          setStage(stage + 1);
        }
        break;
      case 4:
        if (validateFormStage4()) {
          setStage(stage + 1);
        }
        break;
      case 5:
        if (validateFormStage5()) {
          setStage(stage + 1);
        }
        break;
        case 6:
        if (validateFormStage6()) {
          setStage(stage + 1);
        }
        break;
      default:
        setStage(stage + 1);
    }
   
    
  };

  const prevStage = () => {
    setStage(stage - 1);
    if (stage === 0) {
      setStage(1);
    }
  };
  const handlestate = () => {
    setStage(1);
    setOpen(false);
    setTitleofResearch("");
    setThematicArea("");
    setNameResearchGrant("");
    setcategory("HEC");
    setStatus_of_proposal("Submitted");
    setStatus_of_project("Ongoing");
    setDateofContract("");
    setDateofContractSigned("");
    setDateofApproval("");
    setDateofSubmission("");
    setDateofCompletion("");
    setStartDate("");
    setEndDate("");
    setNameofPi("");
    setDesignationofPi("");
    setDepartmentofPi("");
    setNameofCoPi("");
    setUniversityofCoPi("");
    setDepartmentofCoPi("");
    setDesignationofCoPi("");
    setFundingRequested("");
    setFundingRealesed("");
    setFundingApproved("");
    setfunding_nationality("National");
    setFundingUtilized("");
    setCollaboratingPartner("");
    setCofundingPartner("");
    setfundingagency("");
    setRemarks("");
    setdelivery("");
    settypeofresearch("Solo Project");
    setCounterparts("");
    setSponceringAgencyName("");
    setSponceringAgencyCountry("");
    setSponceringAgencyAdress("");
    setSubmissionEmailCopy("");
    setAwardLetterCopy("");
    setCompletionLetterCopy("");
    setContractAgreementCopy("");
    setORIC_overhead("");
    setreviwedbyIRB("");
    setDate_of_review("");
    setmeetingdecision("");
    setmeetingminutes("");
    
  };
  const { isExisting: isExistingProject, loading: loadingProjectCheck } = useFieldCheck(
    session?.user?.username,
    'title',
    TitleofResearch,
    '/api/Research_projects/get_research_project'
  );
  const textAndSymbolPattern = /^[A-Za-z\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/;
    const percentagePattern = /^100%?$|^(\d{1,2}(\.\d+)?%)$/;
    const numericPattern = /\d/;
  const validateFormStage1 = async () => {
    let valid = true;
    const newErrors = {};
    
    if (TitleofResearch.trim() === "") {
      newErrors.TitleofResearch = "Title of Research Proposal is required";
      valid = false;
    } else if (isExistingProject) {
      newErrors.TitleofResearch = "A Project with this title already exists for you";
      valid = false;
    } else if (!textAndSymbolPattern.test(TitleofResearch)) {
      newErrors.TitleofResearch = "Title of Research Proposal can only contain letters and symbols";
      valid = false;
    } else {
      newErrors.TitleofResearch = "";
    }
  
    if (ThematicArea.trim() === "") {
      newErrors.ThematicArea = "Thematic Area is required";
      valid = false;
    } else if (!textAndSymbolPattern.test(ThematicArea)) {
      newErrors.ThematicArea = "Title of Research Proposal can only contain letters and symbols";
      valid = false;
    } else {
      newErrors.ThematicArea = "";
    }
    if (
      typeofresearch === "Solo Project" &&
      category === "HEC" &&
      Status_of_proposal === "Approved"
    ) {
      if (ORIC_overhead.trim() === "") {
        newErrors.ORIC_overhead = "Oric Overhead is required";
        valid = false;
      } else if (!numericPattern.test(ORIC_overhead)) {
        newErrors.ORIC_overhead = "ORIC Overhead must be a valid percentage (e.g., 15% or 100%)";
        valid = false;
      } else {
        newErrors.ORIC_overhead = "";
      }
    }
  
    if (typeofresearch !== "Contract Research") {
      if (NameResearchGrant.trim() === "") {
        newErrors.NameResearchGrant = "Name of Research Grant is required";
        valid = false;
      } else if (!textAndSymbolPattern.test(NameResearchGrant)) {
        newErrors.NameResearchGrant = "Name of Research Grant can only contain letters and symbols";
        valid = false;
      } else {
        newErrors.NameResearchGrant = "";
      }
    } else {
      if (Counterparts.trim() === "") {
        newErrors.Counterparts = "Counter Parts from Industry is required";
        valid = false;
      } else if (!textAndSymbolPattern.test(Counterparts)) {
        newErrors.Counterparts = "Counter Parts from Industry can only contain letters and symbols";
        valid = false;
      } else {
        newErrors.Counterparts = "";
      }
    }
  
    
  
    setErrors(newErrors);
    return valid;
  };
  const validateFormStage2 = () => {
    let valid = true;
    const newErrors = {};
    if(typeofresearch==="Contract Research"){
      if (
        DateofContractSigned.trim() === "" 
      ) {
        newErrors.DateofContractSigned = "Date of contract signed is required";
        valid = false;
      } else {
        newErrors.DateofContractSigned = "";
      }
      if (
        DateofContract.trim() === "" &&
        typeofresearch === "Contract Research"
      ) {
        newErrors.DateofContract = "Date of contract  is required";
        valid = false;
      } else {
        newErrors.DateofContract = "";
      }
    }
    else{
      if (
        DateofSubmission.trim() === "" &&
        typeofresearch !== "Contract Research"
      ) {
        newErrors.DateofSubmission = "Date of Submission  is required";
        valid = false;
      } else {
        newErrors.DateofSubmission = "";
      }
      if (DateofCompletion.trim() === "" && Status_of_project === "Completed") {
        newErrors.DateofCompletion = "Date of Completion  is required";
        valid = false;
      } else {
        newErrors.DateofCompletion = "";
      }
      if (
        DateofApproval.trim() === "" &&
        Status_of_proposal === "Approved" &&
        typeofresearch !== "Contract Research"
      ) {
        newErrors.DateofApproval = "Date of Approval  is required";
        valid = false;
      } else {
        newErrors.DateofApproval = "";
      }
    }
   
    if (startDate.trim() === "") {
      newErrors.startDate = "Start Date is required";
      valid = false;
    } else {
      newErrors.startDate = "";
    }
    if (endDate.trim() === "") {
      newErrors.endDate = "End Date is required";
      valid = false;
    } else {
      newErrors.endDate = "";
    }
    // Check if both start date and end date are not empty
    if (startDate.trim() !== "" && endDate.trim() !== "") {
      // Convert the date strings to Date objects
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      // Compare the dates
      if (startDateObj > endDateObj) {
        newErrors.endDate = "Please Enter correct Information";
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };
  const validateFormStage3 = () => {
    let valid = true;
    const newErrors = {};

    if (Nameofpi.trim() === "") {
      newErrors.Nameofpi = "Name of Pi is required";
      valid = false;
    }else if (!textAndSymbolPattern.test(Nameofpi)) {
      newErrors.Nameofpi = "Name of Pi must not contain numeric values";
      valid = false;
    }  else {
      newErrors.Nameofpi = "";
    }
    if (DepartmentofPi.trim() === "") {
      newErrors.DepartmentofPi = "Department of Pi is required";
      valid = false;
    } 
    else if (!textAndSymbolPattern.test(DepartmentofPi)) {
      newErrors.DepartmentofPi = "Department of Pi must not contain numeric values";
      valid = false;
    } else {
      newErrors.DepartmentofPi = "";
    }

    if (DesignationofPi.trim() === "") {
      newErrors.DesignationofPi = "Designation of Pi is required";
      valid = false;
    } 
    else if (!textAndSymbolPattern.test(DesignationofPi)) {
      newErrors.DesignationofPi = "DesignationofPi must not contain numeric values";
      valid = false;
    } 
    else {
      newErrors.DesignationofPi = "";
    }
    if (typeofresearch === "Joint Research") {
      if (NameofCopi.trim() === "") {
        newErrors.NameofCopi = "Name of CoPi is required";
        valid = false;
      } else if (!textAndSymbolPattern.test(NameofCopi)) {
        newErrors.NameofCopi = "Name of CoPi must not contain numeric values";
        valid = false;
      } else {
        newErrors.NameofCopi = "";
      }
  
      if (DepartmentofCoPi.trim() === "") {
        newErrors.DepartmentofCoPi = "Department of CoPi is required";
        valid = false;
      } else if (!textAndSymbolPattern.test(DepartmentofCoPi)) {
        newErrors.DepartmentofCoPi = "Department of CoPi must not contain numeric values";
        valid = false;
      } else {
        newErrors.DepartmentofCoPi = "";
      }
      if (UniversityofCoPi.trim() === "") {
        newErrors.UniversityofCoPi = "University of CoPi is required";
        valid = false;
      } else if (!textAndSymbolPattern.test(UniversityofCoPi)) {
        newErrors.UniversityofCoPi = "University of CoPi must not contain numeric values";
        valid = false;
      } else {
        newErrors.DesignationofCoPi = "";
      }
      if (DesignationofCoPi.trim() === "") {
        newErrors.DesignationofCoPi = "Designation of CoPi is required";
        valid = false;
      } else if (!textAndSymbolPattern.test(DesignationofCoPi)) {
        newErrors.DesignationofCoPi = "Designation of CoPi must not contain numeric values";
        valid = false;
      } else {
        newErrors.DesignationofCoPi = "";
      }
    }
  
   
  
    if (typeofresearch === "Contract Research") {
      if (SponceringAgencyName.trim() === "") {
        newErrors.SponceringAgencyName = "Name of Sponcering Agency is required";
        valid = false;
      } else if (!textAndSymbolPattern.test(SponceringAgencyName)) {
        newErrors.SponceringAgencyName = "Name of Sponcering Agency must not contain numeric values";
        valid = false;
      } else {
        newErrors.SponceringAgencyName = "";
      }
  
      if (SponceringAgencyAddress.trim() === "") {
        newErrors.SponceringAgencyAddress = "Name of Sponcering Address is required";
        valid = false;
      } else if (!textAndSymbolPattern.test(SponceringAgencyAddress)) {
        newErrors.SponceringAgencyAddress = "Name of Sponcering Address must not contain numeric values";
        valid = false;
      } else {
        newErrors.SponceringAgencyAddress = "";
      }
      if (Sponcering_Agency_Country.trim() === "") {
        newErrors.Sponcering_Agency_Country = "Name of Sponcering country is required";
        valid = false;
      } else if (!textAndSymbolPattern.test(Sponcering_Agency_Country)) {
        newErrors.Sponcering_Agency_Country = "Name of Sponcering country must not contain numeric values";
        valid = false;
      } else {
        newErrors.Sponcering_Agency_Country = "";
      }
     
    }
  
    setErrors(newErrors);
    return valid;
  };

  const validateFormStage4 = () => {
    let valid = true;
    const newErrors = {};
    const textAndSymbolPattern = /^[A-Za-z\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/;
  
    if (
      typeofresearch !== "Contract Research" &&
      Status_of_project === "Completed" &&
      fundingagency.trim() === ""
    ) {
      newErrors.fundingagency = "Funding agency is required";
      valid = false;
    } else if (fundingagency && !textAndSymbolPattern.test(fundingagency)) {
      newErrors.fundingagency = "Funding agency must not contain numeric values";
      valid = false;
    } else {
      newErrors.fundingagency = "";
    }
  
    if (fundingRequested.trim() === "" && typeofresearch !== "Contract Research") {
      newErrors.fundingRequested = "Funding Requested is required";
      valid = false;
    } else if (fundingRequested && !/^\d+$/.test(fundingRequested)) {
      newErrors.fundingRequested = "Funding Requested must contain only numeric digits";
      valid = false;
    } else {
      newErrors.fundingRequested = "";
    }
  
    if (Status_of_proposal === "Approved" || typeofresearch === "Contract Research") {
      if (fundingApproved.trim() === "") {
        newErrors.fundingApproved = "Funding Approved is required";
        valid = false;
      } else if (!/^\d+$/.test(fundingApproved)) {
        newErrors.fundingApproved = "Funding Approved must contain only numeric digits";
        valid = false;
      } else {
        newErrors.fundingApproved = "";
      }
    }
  
    if (Status_of_project === "Completed" && typeofresearch !== "Contract Research") {
      if (fundingUtilized.trim() === "") {
        newErrors.fundingUtilized = "Funding Utilized is required";
        valid = false;
      } else if (fundingUtilized && !/^\d+$/.test(fundingUtilized)) {
        newErrors.fundingUtilized = "Funding Utilized must contain only numeric digits";
        valid = false;
      } else {
        newErrors.fundingUtilized = "";
      }
  
      if (fundingRealesed.trim() === "") {
        newErrors.fundingRealesed = "Funding Released is required";
        valid = false;
      } else if (fundingRealesed && !/^\d+$/.test(fundingRealesed)) {
        newErrors.fundingRealesed = "Funding Released must contain only numeric digits";
        valid = false;
      } else {
        newErrors.fundingRealesed = "";
      }
    }
  
    if (CollaboratingPartner && !textAndSymbolPattern.test(CollaboratingPartner)) {
      newErrors.CollaboratingPartner = "Collaborating Partner must not contain numeric values";
      valid = false;
    }
  
    if (CofundingPartner && !textAndSymbolPattern.test(CofundingPartner)) {
      newErrors.CofundingPartner = "Cofunding Partner must not contain numeric values";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  

  const validateFormStage5 = () => {
    let valid = true;
    const newErrors = {};
    if (reviwedbyIRB.trim() === "") {
      newErrors.reviwedbyIRB = "Reviewed By IRB is required";
      valid = false;
    } else {
      newErrors.reviwedbyIRB = "";
    }

    if (
      reviwedbyIRB === "Yes" &&
      Status_of_proposal === "Submitted" &&
      typeofresearch !== "Contract Research"
    ) {
      if (Date_of_review.trim() === "") {
        newErrors.Date_of_review = "Date of Review is required";
        valid = false;
      } else {
        newErrors.Date_of_review = "";
      }
      if (meetingdecision.trim() === "") {
        newErrors.meetingdecision = "Meeting Decision is required";
        valid = false;
      } else {
        newErrors.meetingdecision = "";
      }
      if (!meetingminutes) {
        newErrors.meetingminutes = "Meeting minutes is required";
        valid = false;
      } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(meetingminutes.type)) {
        newErrors.meetingminutes = "Only jpg, jpeg, and png files are allowed";
        valid = false;
      }else {
        newErrors.meetingminutes = "";
      }
    }

    setErrors(newErrors);
    return valid;
  };
  const validateFormStage6 = () => {
    let valid = true;
    const newErrors = {};
    if(typeofresearch!=="Contract Research"){
      if (!SubmissionEmailCopy) {
        newErrors.SubmissionEmailCopy = "Email Copy is required";
        valid = false;
      } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(SubmissionEmailCopy.type)) {
        newErrors.SubmissionEmailCopy = "Only jpg, jpeg, and png files are allowed";
        valid = false;
      } else {
        newErrors.SubmissionEmailCopy = "";
      }
    
      if (Status_of_proposal !== "Submitted") {
        if (!AwardLetterCopy) {
          newErrors.AwardLetterCopy = "Award Letter is required";
          valid = false;
        } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(AwardLetterCopy.type)) {
          newErrors.AwardLetterCopy = "Only jpg, jpeg, and png files are allowed";
          valid = false;
        } else {
          newErrors.AwardLetterCopy = "";
        }
      }
    
      if (Status_of_project === "Completed") {
        if (!CompletionLetterCopy) {
          newErrors.CompletionLetterCopy = "Completion Letter is required";
          valid = false;
        } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(CompletionLetterCopy.type)) {
          newErrors.CompletionLetterCopy = "Only jpg, jpeg, and png files are allowed";
          valid = false;
        } else {
          newErrors.CompletionLetterCopy = "";
        }
      }

    }
   else{
    if (typeofresearch === "Contract Research") {
      if (!ContractAgreementCopy) {
        newErrors.ContractAgreementCopy = "Contract Agreement is required";
        valid = false;
      } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(ContractAgreementCopy.type)) {
        newErrors.ContractAgreementCopy = "Only jpg, jpeg, and png files are allowed";
        valid = false;
      } else {
        newErrors.ContractAgreementCopy = "";
      }
    }

   }
    setErrors(newErrors);
    return valid;
  };
  
  const validateFormStage7 = () => {
    let valid = true;
    const newErrors = {};
    // Split the delivery string into words
    const deliveryWords = delivery.trim().split(/\s+/);
    // Count the number of words
    const DeliverywordCount = deliveryWords.length;
{
if(Status_of_project === "Completed"){
  if (delivery.trim() === "" ) {
    newErrors.delivery =
      "Key Project Deleiverables are required  is required";
    valid = false;
  }
  // Check if word count exceeds 1500
  else if (DeliverywordCount > 1500) {
    newErrors.delivery =
      "Key Project Deliverables should contain no more than 1500 words";
    valid = false;
  }if (!textAndSymbolPattern.test(delivery) ) {
    newErrors.delivery = "Key Project delievery must not contain numeric values";
    valid = false;
  } else {
    newErrors.delivery = "";
  }
}
}
    
    // Check if word count exceeds 1500
    const RemarksWords = Remarks.trim().split(/\s+/);
    // Count the number of words
    const RemarkswordCount = RemarksWords.length;
    if (RemarkswordCount > 1500) {
      newErrors.Remarks = "Remarks should contain no more than 1500 words";
      valid = false;
    }if (!textAndSymbolPattern.test(Remarks) ) {
      newErrors.Ramarks = "Remarks must not contain numeric values";
      valid = false;
    }
     else {
      newErrors.delivery = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const UploadFile = async () => {
  if (typeofresearch == "Contract Research") {
      try {
        if (ContractAgreementCopy) {
          await uploadFile(
            ContractAgreementCopy,
            session.user.username,
            `/api/Imagesfeilds/fileupload`,
            `${id}_ContractAgreementCopy`,
            "research_project"
          );
        } else {
          alert("Please upload Contract Agreement Copy");
          return;
        }
      } else {
        let fileUploaded = false;
  
        if (Status_of_proposal === "Approved" || Status_of_project === "Completed") {
          if (AwardLetterCopy) {
            await uploadFile(
              AwardLetterCopy,
              session.user.username,
              `/api/Imagesfeilds/fileupload`,
              `${id}_AwardLetterCopy`,
              "research_project"
            );
            fileUploaded = true;
          } else {
            alert("Please upload Award Letter Copy");
            return;
          }
        }
  
        if (Status_of_project === "Completed") {
          if (CompletionLetterCopy) {
            await uploadFile(
              CompletionLetterCopy,
              session.user.username,
              `/api/Imagesfeilds/fileupload`,
              `${id}_CompletionLetterCopy`,
              "research_project"
            );
            fileUploaded = true;
          } else {
            alert("Please upload Completion Letter Copy");
            return;
          }
        }
  
        if (reviwedbyIRB === "Yes") {
          if (meetingminutes) {
            await uploadFile(
              meetingminutes,
              session.user.username,
              `/api/Imagesfeilds/fileupload`,
              `${id}_meetingminutes`,
              "research_project"
            );
            fileUploaded = true;
          } else {
            alert("Please upload meeting minutes Copy");
            return;
          }
        }
         catch (error) {
          console.error("Error saving image:", error);
          alert("error");
          setSubmitting(false);
        }
      } 
      
        try {
          if (SubmissionEmailCopy) {
            await uploadFile(
              SubmissionEmailCopy,
              session.user.username,
              `/api/Imagesfeilds/fileupload`,
              `${TitleofResearch}_SubmissionEmailcopy`,
              "research_project"
            );
          } else {
            alert("Please upload CaseStudy Copy");
          }
        } catch (error) {
          console.error("Error saving image:", error);
          alert("error");
          setSubmitting(false);
        }
        
    }
    
    
  };
  
  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    try {
      // Validate required fields
      if (!validateFormStage7()) {
        setSubmitting(false);
        return;
      }

      // Check if the user is authenticated
      if (!session || !session.user || !session.user.username) {
        alert("Please log in to continue");
        signOut({ callbackUrl: "http://localhost:3000/" });;
        return;
      }
      
      // Construct the data object based on the conditions
      const data = {
        username: session.user.username,
        title: TitleofResearch,
        Thematic_Area: ThematicArea,
        type_of_research: typeofresearch,
        Name_of_Research_Grant: NameResearchGrant,
        category: category,
        Status_of_proposal: Status_of_proposal,
        Status_of_project: Status_of_project,
        Date_of_Contract: DateofContract ? new Date(DateofContract) : null,
        Date_of_ContractSigned: DateofContractSigned
          ? new Date(DateofContractSigned)
          : null,
        Date_of_Approval: DateofApproval ? new Date(DateofApproval) : null,
        Date_of_Submission: DateofSubmission
          ? new Date(DateofSubmission)
          : null,
        Date_of_Completion: DateofCompletion
          ? new Date(DateofCompletion)
          : null,
        start_Date: startDate ? new Date(startDate) : null,
        end_Date: endDate ? new Date(endDate) : null,
        Name_of_pi: Nameofpi,
        Designation_of_Pi: DesignationofPi,
        Department_of_Pi: DepartmentofPi,
        Name_of_Copi: NameofCopi,
        University_of_CoPi: UniversityofCoPi,
        Department_of_CoPi: DepartmentofCoPi,
        Designation_of_CoPi: DesignationofCoPi,
        funding_agency: fundingagency,
        funding_requested: fundingRequested,
        funding_realized: fundingRealesed,
        funding_approved: fundingApproved,
        funding_utilized: fundingUtilized,
        Collaborating_Partner: CollaboratingPartner,
        Cofunding_Partner: CofundingPartner,
        Remarks: Remarks,
        delivery: delivery,
        Counterparts: Counterparts,
        Sponcering_Agency_Name: SponceringAgencyName,
        Sponcering_Agency_Country: Sponcering_Agency_Country,
        Sponcering_Agency_Address: SponceringAgencyAddress,
        ORIC_Overhead: ORIC_overhead,
        Nationality: funding_nationality,
        reviwedbyIRB: reviwedbyIRB,
        Date_of_review: new Date(Date_of_review),
        meetingdecision: meetingdecision,
      };

      // Make the POST request to save the data
      const res = await axios.post(
        `/api/Research_projects/insert_research_project`,
        data
      );

      console.log(res);
const {id}=res.data;
if(id){
  await UploadFile();
}
else{
  console.log("Error in saving data");
  setSubmitting(false);
}
      handlestate();
      setOpen(false);
      setshowSuccessSuccessModal(true)
    } catch (error) {
      console.error("Error inserting information:", error);
    }finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        id={"ResearchProjectFormModal"}
        consumer={children}
        isOpen={isOpen}
        setOpen={setOpen}
      >
        <div>
          {stage === 1 && (
            <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
              <div>
                <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
                  Research Project Information
                </h1>
              </div>
              <div>
                <InputField
                  label={"Title of Research Proposal"}
                  value={TitleofResearch}
                  setVal={setTitleofResearch}
                  required
                />
                {errors.TitleofResearch && (
                  <span className="text-red-500">{errors.TitleofResearch}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                <div>
                  <InputField
                    label={"Thematic Area"}
                    value={ThematicArea}
                    setVal={setThematicArea}
                    required
                  />
                  {errors.ThematicArea && (
                    <span className="text-red-500">{errors.ThematicArea}</span>
                  )}
                </div>
                <Dropdown
                  label={"Type of Research"}
                  dropdownOptions={[
                    "Solo Project",
                    "Contract Research",
                    "Joint Research",
                  ]}
                  value={typeofresearch}
                  handleOptionChange={handleTypeofresearchChange}
                  required
                />
                {typeofresearch === "Solo Project" &&
                  category === "HEC" &&
                  Status_of_proposal === "Approved" && (
                    <div>
                      <InputField
                        label={"ORIC Overhead "}
                        value={ORIC_overhead}
                        setVal={setORIC_overhead}
                        type={"text"}
                        required
                      />
                      {errors.ORIC_overhead && (
                        <span className="text-red-500">
                          {errors.ORIC_Overhead}
                        </span>
                      )}
                    </div>
                  )}
                  {
                    typeofresearch!=="Contract Research" &&
                    <div>
                  <InputField
                    label={"Name of Research Grant"}
                    value={NameResearchGrant}
                    setVal={setNameResearchGrant}
                    required
                  />
                  {errors.NameResearchGrant && (
                    <span className="text-red-500">
                      {errors.NameResearchGrant}
                    </span>
                  )}
                </div>
                  }
                

                
                {typeofresearch === "Solo Project" && (
                  <Dropdown
                    label={"category"}
                    dropdownOptions={["HEC", "Non-HEC"]}
                    value={category}
                    handleOptionChange={handlecategoryChange}
                    required
                  />
                )}
                { typeofresearch!=="Contract Research" && (
                  <>
                  <Dropdown
                  label={"Status_of_proposal"}
                  dropdownOptions={["Submitted", "Approved"]}
                  value={Status_of_proposal}
                  handleOptionChange={handleStatus_of_proposalChange}
                  required

                />
                {
                  Status_of_proposal === "Approved" &&
                  <Dropdown
                  label={"Status of project"}
                  dropdownOptions={["Ongoing", "Delayed", "Completed"]}
                  value={Status_of_project}
                  handleOptionChange={handleProjectStatus}
                  required
                />
                }

                
                  </>
                  
                  
                )}
                <Dropdown
                  label={"Nationality"}
                  dropdownOptions={["National", "International"]}
                  value={funding_nationality}
                  handleOptionChange={handleagnecynationalitychange}
                  required
                />
              </div>
              {typeofresearch === "Contract Research" && (
                <div>
                  <InputField
                    label={"Counterparts from industry(Adress with country)"}
                    value={Counterparts}
                    setVal={setCounterparts}
                    type={"text"}
                    required
                  />
                  {errors.Counterparts && (
                    <span className="text-red-500">{errors.Counterparts}</span>
                  )}
                </div>
              )}
              <div className="flex flex-row   ml-auto ">
                <button
                  onClick={nextStage}
                  className="bg-blue-900 text-white px-4 py-2  w-40 rounded-md mt-4 w-1/4"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {stage === 2 && (
            <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
              <div>
                <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
                  Chronological Details
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                {typeofresearch === "Contract Research" ? (
                  <>
                    <div>
                      <InputField
                        label={"Date of Contract Signed"}
                        value={DateofContractSigned}
                        setVal={setDateofContractSigned}
                        type={"date"}
                        required
                      />
                      {errors.DateofContractSigned && (
                        <span className="text-red-500">
                          {errors.DateofContractSigned}
                        </span>
                      )}
                    </div>
                    <div>
                      <InputField
                        label={"Date of Contract"}
                        value={DateofContract}
                        setVal={setDateofContract}
                        type={"date"}
                        required
                      />
                      {errors.DateofContract && (
                        <span className="text-red-500">
                          {errors.DateofContract}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <InputField
                        label={"Date of Submission"}
                        value={DateofSubmission}
                        setVal={setDateofSubmission}
                        type={"date"}
                        required
                      />
                      {errors.DateofSubmission && (
                        <span className="text-red-500">
                          {errors.DateofSubmission}
                        </span>
                      )}
                    </div>
                    {Status_of_proposal === "Approved" && (
                      <div>
                        <InputField
                          label={"Date of Approval"}
                          value={DateofApproval}
                          setVal={setDateofApproval}
                          type={"date"}
                          required
                        />
                        {errors.DateofApproval && (
                          <span className="text-red-500">
                            {errors.DateofApproval}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
                <div>
                  <InputField
                    label={"Start Date"}
                    value={startDate}
                    setVal={setStartDate}
                    type={"date"}
                    required
                  />
                  {errors.startDate && (
                    <span className="text-red-500">{errors.startDate}</span>
                  )}
                </div>
                <div>
                  <InputField
                    label={"End Date"}
                    value={endDate}
                    setVal={setEndDate}
                    type={"date"}
                    required
                  />
                  {errors.endDate && (
                    <span className="text-red-500">{errors.endDate}</span>
                  )}
                </div>
                {Status_of_project === "Completed" && typeofresearch!=="Contract Research" && (
                  <div>
                    <InputField
                      label={"Date of Completion"}
                      value={DateofCompletion}
                      setVal={setDateofCompletion}
                      type={"date"}
                      required
                    />
                    {errors.DateofCompletion && (
                      <span className="text-red-500">
                        {errors.DateofCompletion}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 justify-between items-end ">
                <button
                  onClick={prevStage}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
                >
                  Previous
                </button>
                <button
                  onClick={nextStage}
                  className="bg-blue-900 ml-auto text-white px-4 py-2 rounded-md mt-4 w-1/4"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {stage === 3 && (
            <div className=" flex gap-y-8 flex-col h-900  bg-white shadow-lg rounded-md px-10 py-8 ">
              <div>
                <h1 className="text-blue-900   font-bold text-xl py-2  border-black">
                  Details of Pi
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                <div>
                  <InputField
                    label={"Name of Pi"}
                    value={Nameofpi}
                    setVal={setNameofPi}
                    required
                  />
                  {errors.Nameofpi && (
                    <span className="text-red-500">{errors.Nameofpi}</span>
                  )}
                </div>
                <div>
                  <InputField
                    label={"Department of Pi"}
                    value={DepartmentofPi}
                    setVal={setDepartmentofPi}
                    required
                  />
                  {errors.DepartmentofPi && (
                    <span className="text-red-500">
                      {errors.DepartmentofPi}
                    </span>
                  )}
                </div>
                <div>
                  <InputField
                    label={"Designation of Pi"}
                    value={DesignationofPi}
                    setVal={setDesignationofPi}
                    required
                  />
                  {errors.DesignationofPi && (
                    <span className="text-red-500">
                      {errors.DesignationofPi}
                    </span>
                  )}
                </div>
              </div>
              {typeofresearch == "Joint Research" && (
                <>
                  <div>
                    <h1 className="text-blue-900   font-bold text-xl py-2 border-black">
                      Details of CoPi
                    </h1>
                  </div>
                  <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                    <div>
                      <InputField
                        label={"Name of CoPi"}
                        value={NameofCopi}
                        setVal={setNameofCoPi}
                        required
                      />
                      {errors.NameofCopi && (
                        <span className="text-red-500">
                          {errors.NameofCopi}
                        </span>
                      )}
                    </div>
                    <div>
                      <InputField
                        label={"Department of CoPi"}
                        value={DepartmentofCoPi}
                        setVal={setDepartmentofCoPi}
                        required
                      />
                      {errors.DepartmentofCoPi && (
                        <span className="text-red-500">
                          {errors.DepartmentofCoPi}
                        </span>
                      )}
                    </div>
                    <div>
                    <InputField
                      label={"Designation of CoPi"}
                      value={DesignationofCoPi}
                      setVal={setDesignationofCoPi}
                      required
                    />
                    {errors.DesignationofCoPi && (
                      <span className="text-red-500">
                        {errors.DesignationofCoPi}
                      </span>
                    )}
                     </div>
                     <div>
                    <InputField
                      label={"University of CoPi"}
                      value={UniversityofCoPi}
                      setVal={setUniversityofCoPi}
                      required
                    />
                    {errors.UniversityofCoPi && (
                      <span className="text-red-500">
                        {errors.UniversityofCoPi}
                      </span>
                    )}
                   </div>
                  </div>
                </>
              )}
              {typeofresearch == "Contract Research" && (
                <>
                  <div>
                    <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
                      Details of Sponcering Agency
                    </h1>
                  </div>
                  <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                    <div>
                      <InputField
                        label={"Sponcering Agency Name"}
                        value={SponceringAgencyName}
                        setVal={setSponceringAgencyName}
                        required
                      />
                      {errors.SponceringAgencyName && (
                        <span className="text-red-500">
                          {errors.SponceringAgencyName}
                        </span>
                      )}
                    </div>
                    <div>
                      <InputField
                        label={"Sponcering Agency Country "}
                        value={Sponcering_Agency_Country}
                        setVal={setSponceringAgencyCountry}
                        required
                      />
                      {errors.Sponcering_Agency_Country && (
                        <span className="text-red-500">
                          {errors.Sponcering_Agency_Country}
                        </span>
                      )}
                    </div>
                    <div>
                      <InputField
                        label={"Sponcering Agency Adress"}
                        value={SponceringAgencyAddress}
                        setVal={setSponceringAgencyAdress}
                        required
                      />
                      {errors.SponceringAgencyAddress && (
                        <span className="text-red-500">
                          {errors.SponceringAgencyAddress}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className="grid grid-cols-2 justify-between items-end ">
                <button
                  onClick={prevStage}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
                >
                  Previous
                </button>
                <button
                  onClick={nextStage}
                  className="bg-blue-900 ml-auto text-white px-4 py-2 rounded-md mt-4 w-1/4"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {stage === 4 && (
            <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
              <div>
                <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
                  Details of Funding(PKR Million)
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                {typeofresearch !== "Contract Research" &&
                <>
                { Status_of_project === "Completed" && (
                    <div>
                      <InputField
                        label={"Funding Agency/Body"}
                        value={fundingagency}
                        setVal={setfundingagency}
                        required
                      />
                      {errors.fundingagency && (
                        <span className="text-red-500">
                          {errors.fundingagency}
                        </span>
                      )}
                    </div>
                  )}
                <div>
                  <InputField
                    label={"Total Funding Requested"}
                    value={fundingRequested}
                    setVal={setFundingRequested}
                    required
                  />
                  {errors.fundingRequested && (
                    <span className="text-red-500">
                      {errors.fundingRequested}
                    </span>
                  )}
                </div>
                {Status_of_project == "Completed" && (
                  <>
                    <div>
                      <InputField
                        label={"Total Funding Realesed(PKR)"}
                        value={fundingRealesed}
                        setVal={setFundingRealesed}
                        required
                      />
                      {errors.fundingRealesed && (
                        <span className="text-red-500">
                          {errors.fundingRealesed}
                        </span>
                      )}
                    </div>
                    <div>
                      <InputField
                        label={"Total Funding Utilized(PKR)"}
                        value={fundingUtilized}
                        setVal={setFundingUtilized}
                        required
                      />
                      {errors.fundingUtilized && (
                        <span className="text-red-500">
                          {errors.fundingUtilized}
                        </span>
                      )}
                    </div>
                  </>
                )}
</>
          }
              {((Status_of_proposal === "Approved") || (typeofresearch === "Contract Research")) && (
  <div>
    <InputField
      label={"Total Funding Approved(PKR)"}
      value={fundingApproved}
      setVal={setFundingApproved}
      required
    />
    {errors.fundingApproved && (
      <span className="text-red-500">
        {errors.fundingApproved}
      </span>
    )}
  </div>
)}

               
              </div>
              <div>
                <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
                  Details of Partners
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                <div>
                <InputField
                  label={"Collaborating Partners(if any)"}
                  value={CollaboratingPartner}
                  setVal={setCollaboratingPartner}
                />
<span className="text-red-500">
                      {errors.CollaboratingPartner}
                    </span>
                    </div>
                    <div>
                <InputField
                  label={"Co-funding Partners(if any)"}
                  value={CofundingPartner}
                  setVal={setCofundingPartner}
                />
                {
                  <span className="text-red-500">
                  {errors.CofundingPartner}
                </span>
                }
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                <button
                  onClick={prevStage}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
                >
                  Previous
                </button>
                <button
                  onClick={nextStage}
                  className=" ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {stage === 5 && (
            <>
              <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
                <h1 className="text-blue-900   font-bold text-xl py-2 border-black">
                  Details of Reviwed By IRB
                </h1>
                <div>
                  <RadioButtonGroup
                    label={"Reviewd BY IRB before Submission"}
                    options={["Yes", "No"]}
                    value={reviwedbyIRB}
                    handleChange={handleReveiwedBYIRBChange}
                    required
                  />
                  {errors.reviwedbyIRB && (
                    <span className="text-red-500">{errors.reviwedbyIRB}</span>
                  )}
                </div>
                {reviwedbyIRB === "Yes" && (
                  <div className="grid grid-cols-2 gap-y-8 gap-x-16  ">
                    <div>
                      <InputField
                        label={"Date of Review"}
                        value={Date_of_review}
                        setVal={setDate_of_review}
                        type={"date"}
                        required
                      />
                      {errors.Date_of_review && (
                        <span className="text-red-500">
                          {errors.Date_of_review}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-3   text-black">
                    <label className="text-base font-medium">
                      Meeting minutes
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                      type="file"
                      defaultValue={meetingminutes}
                      onChange={(e) => {
                        console.log("File selected:", e.target.files[0]);
                        setmeetingminutes(e.target.files[0]);
                      }}
                      required
                    />
                    {errors.meetingminutes && (
                      <span className="text-red-500">
                        {errors.meetingminutes}
                      </span>
                    )}
                  </div>
                    <div>
                      <Dropdown
                        label={"Meeting Decision"}
                        dropdownOptions={[
                          "Approved",
                          "Require Modification",
                          "Deferred",
                          "Disapproved",
                        ]}
                        value={meetingdecision}
                        handleOptionChange={handlemeetingdecisionchange}
                        required
                      />
                      {errors.meetingdecision && (
                        <span className="text-red-500">
                          {errors.meetingdecision}
                        </span>
                      )}
                    </div>
                  
                  </div>
                )}

                <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                  <button
                    onClick={prevStage}
                    className="bg-blue-900 text-white px-4 py-2 w-4/5 rounded-md "
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextStage}
                    className="bg-blue-900 text-white px-4 py-2 w-4/5  rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
          {stage === 6 && (
            <>
              <div className="flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ml-auto mr-auto w-5/6 ">
                <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
                  Additional Details
                </h1>
                <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                  <div className="grid grid-cols-2 gap-x-3   text-black">
                    <label className="text-base font-medium">
                      Proposal Submission Copy{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                      type="file"
                      defaultValue={SubmissionEmailCopy}
                      onChange={(e) => {
                        console.log("File selected:", e.target.files[0]);
                        setSubmissionEmailCopy(e.target.files[0]);
                      }}
                      required
                    />
                    {errors.SubmissionEmailCopy && (
                      <span className="text-red-500">
                        {errors.SubmissionEmailCopy}
                      </span>
                    )}
                  </div>

                  {(Status_of_proposal === "Approved" ||
                    Status_of_project === "Completed") && (
                      <div className="grid grid-cols-2 gap-x-3   text-black">
                        <label className="text-base font-medium">
                          Award Letter Copy{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                          type="file"
                          defaultValue={AwardLetterCopy}
                          onChange={(e) => {
                            console.log("File selected:", e.target.files[0]);
                            setAwardLetterCopy(e.target.files[0]);
                          }}
                          required
                        />
                        {errors.AwardLetterCopy && (
                          <span className="text-red-500">
                            {errors.AwardLetterCopy}
                          </span>
                        )}
                      </div>
                    )}
                  {Status_of_project === "Completed" && (
                    <div className="grid grid-cols-2 gap-x-3   text-black">
                      <label className="text-base font-medium">
                        Completion Letter Copy{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                        type="file"
                        defaultValue={CompletionLetterCopy}
                        onChange={(e) => {
                          console.log("File selected:", e.target.files[0]);
                          setCompletionLetterCopy(e.target.files[0]);
                        }}
                        required
                      />
                      {errors.CompletionLetterCopy && (
                        <span className="text-red-500">
                          {errors.CompletionLetterCopy}
                        </span>
                      )}
                    </div>
                  )}

                  {typeofresearch === "Contract Research" && (
                    <>
                      <div className="grid grid-cols-2 gap-x-3   text-black">
                        <label className="text-base font-medium">
                          Contract Agreement Copy{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                          type="file"
                          defaultValue={ContractAgreementCopy}
                          onChange={(e) => {
                            console.log("File selected:", e.target.files[0]);
                            setContractAgreementCopy(e.target.files[0]);
                          }}
                          required
                        />
                        {errors.ContractAgreementCopy && (
                          <span className="text-red-500">
                            {errors.ContractAgreementCopy}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                  <button
                    onClick={prevStage}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextStage}
                    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
          {stage === 7 && (
            <>
              <div className="grid gap-y-8 grid-col bg-white max-h-screen overflow-scroll shadow-lg rounded-md px-6 py-2 w-[60rem] mt-4 max-h-full">
                <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
                  Additional Details
                </h1>

                <>
                  <label
                    htmlFor="textarea"
                    className="text-base font-medium text-black"
                  >
                    Write Remarks
                  </label>
                  <textarea
                    className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                    rows="5"
                    cols="50"
                    id="Textarea"
                    value={Remarks}
                    onChange={handleRemarkschange}
                    required
                  />
                  {errors.Remarks && (
                    <span className="text-red-500">{errors.Remarks}</span>
                  )}
                </>
                {Status_of_project === "Completed" && (
                  <>
                    <label
                      htmlFor="textarea"
                      className="text-base font-medium text-black"
                    >
                      Write key project deliverables
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                      rows="5"
                      cols="50"
                      id="Textarea"
                      value={delivery}
                      required
                      onChange={handledeliverychange}
                    />
                    {errors.delivery && (
                      <span className="text-red-500">{errors.delivery}</span>
                    )}
                  </>
                )}
                <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                  <button
                    onClick={prevStage}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4 "
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 ">
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {showSuccessModal && (
          <SuccessModal
            isOpen={showSuccessModal}
            p={`Your Data has been saved Successfully`}
            onClose={handleCloseSuccessModal}
          />
        )}
      </Modal>
      {
            showSuccessModal &&
            (
          
              <SuccessModal isOpen={showSuccessModal} p={`Your Data has been Saved `} onClose={()=>{
                setshowSuccessSuccessModal(false)
              }}/>
            )
          }
    </>
  );
}

export default Researchprojectform;