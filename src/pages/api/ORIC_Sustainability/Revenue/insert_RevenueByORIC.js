import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Name_of_Research_Grant,
    Nationality,
    Title_of_ResearchProposal,
    Name_of_PI,
    Designation_of_Pi,
    Department_of_Pi,
    StartDate,
    EndDate,
    Total_Funding_Approved,
    Total_Funding_Released,
    ORIC_Overhead_in_Approved_Funding,
    ORIC_Overhead_in_Released_Funding,
    Remarks,
    Collaborating_Partner,
  } = req.body;
  try {
    const RevenueByORIC = await prisma.RevenueByORIC.create({
      data: {
        username: username,
        Name_of_Research_Grant: Name_of_Research_Grant,
        Nationality: Nationality,
        Title_of_ResearchProposal: Title_of_ResearchProposal,
        Name_of_PI: Name_of_PI,
        Designation_of_Pi: Designation_of_Pi,
        Department_of_Pi: Department_of_Pi,
        StartDate: StartDate,
        EndDate: EndDate,
        Total_Funding_Approved: Total_Funding_Approved,
        Total_Funding_Released: Total_Funding_Released,
        ORIC_Overhead_in_Approved_Funding: ORIC_Overhead_in_Approved_Funding,
        ORIC_Overhead_in_Released_Funding: ORIC_Overhead_in_Released_Funding,
        Remarks: Remarks,
        Collaborating_Partner: Collaborating_Partner,
      },
    });
    res.status(200).json(RevenueByORIC);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error occurred while saving information" });
  }
}
