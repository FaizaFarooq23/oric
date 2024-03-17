import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Name_of_Government_Body,
    Advocacy_tools,
    Area_advocated,
    Date_of_presentation,
    Banking_research_status,
    Coalation_Partner,
    Breif_Details,
    Issue_verification,
  } = req.body;
  try {
    const policy_casestudy = await prisma.Policy_CaseStudy.create({
      data: {
        username: username,
        Name_of_Government_Body: Name_of_Government_Body,
        Advocacy_tools: Advocacy_tools,
        Area_advocated: Area_advocated,
        Date_of_presentation: new Date(Date_of_presentation).toISOString(),
        Banking_research_status: Banking_research_status,
        Coalation_Partner: Coalation_Partner,
        Breif_Details: Breif_Details,
        Issue_verification: Issue_verification,
      },
    });
    res.status(200).json(policy_casestudy);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error occurred while creating policy casestudy" });
  }
}
