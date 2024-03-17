import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Type_of_Linkage,
    Feild_of_Study,
    Nationality,
    Name_of_Research_Grant,
    Date_of_Agreement,
    Name_of_Host_Institute,
    Address_of_Host_Institute,
    Collaborating_Agency,
    Collaborating_Agency_Address,
    Scope,
    Features,
  } = req.body;
  try {
    const research_linkage = await prisma.Research_Linkage.create({
      data: {
        username: username,
        Type_of_Linkage: Type_of_Linkage,
        Feild_of_Study: Feild_of_Study,
        Nationality: Nationality,
        Name_of_Research_Grant: Name_of_Research_Grant,
        Date_of_Agreement: Date_of_Agreement,
        Name_of_Host_Institute: Name_of_Host_Institute,
        Address_of_Host_Institute: Address_of_Host_Institute,
        Collaborating_Agency: Collaborating_Agency,
        Collaborating_Agency_Address: Collaborating_Agency_Address,
        Scope: Scope,
        Features: Features,
      },
    });
    res.status(200).json(research_linkage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while research linkage" });
  }
}
