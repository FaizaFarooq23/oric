import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
  Name_of_Visitor,                    
  Date_of_Visit,                       
  Agenda_of_Visit ,
  } = req.body;

  try {
    const VisitsByRepresentatives = await prisma.VisitsByRepresentatives.create({
      data: {
        username:username,
        Name_of_Visitor:Name_of_Visitor,                    
        Date_of_Visit:Date_of_Visit,                       
        Agenda_of_Visit:Agenda_of_Visit ,
      },
    });
    res.status(200).json(VisitsByRepresentatives);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while saving information" });
  }
}
