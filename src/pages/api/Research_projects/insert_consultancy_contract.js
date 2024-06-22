import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Type_of_ConsultancyServices,
    Title ,
    Name_of_Pi  ,
     Designation_of_Pi ,
    Department_of_Pi ,
    Date_of_Execution  ,
    Company_Name ,
    Company_Address ,
    start_Date  ,
    end_Date ,
    Contract_Value ,
    ORIC_percentage ,
    Remarks ,
    deliverables
  } = req.body;
  try {
    const consultancy_contract = await prisma.Consultancy_Contract.create({
      data: {
    username:username,
    Type_of_ConsultancyServices:Type_of_ConsultancyServices,
    Title :Title,
    Name_of_Pi  :Name_of_Pi,
    Designation_of_Pi :Designation_of_Pi,
    Department_of_Pi :Department_of_Pi,
    Date_of_Execution  :Date_of_Execution,
    Company_Name :Company_Name,
    Company_Address :Company_Address,
    start_Date  :start_Date,
    end_Date :end_Date,
    Contract_Value :Contract_Value,
    ORIC_percentage :ORIC_percentage,
    Remarks :Remarks,
    deliverables:deliverables
      },
    });
    res.status(200).json({ 
      message: "IP disclosure created successfully", 
consultancy_contract,
      id:consultancy_contract.id // Explicitly include the id in the response
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error occurred while creating policy casestudy" });
  }
}
