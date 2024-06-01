import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Name_of_Lead_Inventor,
    Designation_of_Lead_Inventor,
    Department_of_Lead_Inventor,
    Title_of_Invention,
    Nationality,
    Date_of_Agreement,
    StartDate,
    EndDate,
    Licensee_Name,
    Licensee_Organization,
    Fee_Royalty_Share_Percentages,
    Total_Amount,
    ORIC_Approved_Share,
    ORIC_Received_Share,
    Remarks,
  } = req.body;
  try {
    const RevenueByHEI = await prisma.RevenueByHEI.create({
      data: {
        username: username,
        Name_of_Lead_Inventor: Name_of_Lead_Inventor,
        Designation_of_Lead_Inventor: Designation_of_Lead_Inventor,
        Department_of_Lead_Inventor: Department_of_Lead_Inventor,
        Title_of_Invention: Title_of_Invention,
        Nationality: Nationality,
        Date_of_Agreement: Date_of_Agreement,
        StartDate: StartDate,
        EndDate: EndDate,
        Licensee_Name: Licensee_Name,
        Licensee_Organization: Licensee_Organization,
        Fee_Royalty_Share_Percentages: Fee_Royalty_Share_Percentages,
        Total_Amount: Total_Amount,
        ORIC_Approved_Share: ORIC_Approved_Share,
        ORIC_Received_Share: ORIC_Received_Share,
        Remarks: Remarks,
      },
    });
    res.status(200).json(RevenueByHEI);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error occurred while saving information" });
  }
}
