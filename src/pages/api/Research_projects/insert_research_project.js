
import prisma from "@/lib/prisma";

// pages/api/Research_project.js
export default async function handler(req, res){
    const { username,
        title ,
        Thematic_Area ,
         Name_of_Research_Grant ,
        category ,
        Status_of_proposal ,
        Status_of_project ,
        Date_of_Contract ,    
        Date_of_ContractSigned ,
        Date_of_Approval ,
        Date_of_Submission ,
        Date_of_Completion ,
        start_Date  ,
        end_Date ,
        Name_of_pi ,
        Designation_of_Pi ,
        Department_of_Pi ,
        Name_of_Copi ,
        University_of_CoPi ,
        Department_of_CoPi ,
        Designation_of_CoPi ,
        funding_agency ,
        funding_requested ,
        funding_received ,
        funding_utilized ,
        Collaborating_Partner  ,
        Cofunding_Partner ,
        Remarks ,
        delivery ,
        type_of_research ,
        Counterparts ,
         Sponcering_Agency_Name ,
        Sponcering_Agency_Country ,
        Sponcering_Agency_Address , } = req.body;
    try{
    const research_project = await prisma.Research_Project.create({
        data: {
            username:username,
            title:title ,
            Thematic_Area :Thematic_Area,
            type_of_research :type_of_research,
            Name_of_Research_Grant :Name_of_Research_Grant,
            category :category,
            Status_of_proposal :Status_of_proposal,
            Status_of_project :Status_of_project,
            Date_of_Contract :   Date_of_Contract, 
            Date_of_ContractSigned :Date_of_ContractSigned,
            Date_of_Approval :Date_of_Approval,
            Date_of_Submission :Date_of_Submission,
            Date_of_Completion :Date_of_Completion,
            start_Date  :start_Date,
            end_Date :end_Date,
            Name_of_pi :Name_of_pi,
            Designation_of_Pi :Designation_of_Pi,
            Department_of_Pi :Department_of_Pi,
            Name_of_Copi :Name_of_Copi,
            University_of_CoPi :University_of_CoPi,
            Department_of_CoPi :Department_of_CoPi,
            Designation_of_CoPi :Designation_of_CoPi,
            funding_agency :funding_agency,
            funding_requested :funding_requested,
            funding_received :funding_received,
            funding_utilized :funding_utilized,
            Collaborating_Partner  :Collaborating_Partner,
            Cofunding_Partner :Cofunding_Partner,
            Remarks :Remarks,
            delivery :delivery,
            Counterparts :Counterparts,
             Sponcering_Agency_Name :Sponcering_Agency_Name,
            Sponcering_Agency_Country :Sponcering_Agency_Country,
            Sponcering_Agency_Address :Sponcering_Agency_Address ,
        },

    });
    res.status(200).json(research_project);
} catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });  
}
    
}