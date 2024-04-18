import prisma from "@/lib/prisma";
export default async function handler(req, res) {
  const {
    username,
    Title_of_award,
    Name_of_organization,
    Relevant_Award,
    Breif_Details,
    Amount_of_prize,
    Name_of_winner,
    Designation_of_winner,
    Department_of_winer,
    Remarks,
  } = req.body;
  try {
    const awards = await prisma.Awards.create({
      data: {
        username: username,
        Title_of_award: Title_of_award,
        Name_of_organization: Name_of_organization,
        Relevant_Award: Relevant_Award,
        Breif_Details: Breif_Details,
        Amount_of_prize: Amount_of_prize,
        Name_of_winner: Name_of_winner,
        Designation_of_winner: Designation_of_winner,
        Department_of_winer: Department_of_winer,
        Remarks: Remarks,
      },
    });
    res.status(200).json(awards);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error occurred while saving information" });
  }
}
