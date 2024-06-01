import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Title_of_Training,
    Date_of_Event,
    No_of_Participants,
    Category,
    Outcomes,
    Audience_Type,
    Arranged_by,
    Name_of_ORICPersonal,
    Organizer,
    Type_of_Event,
  } = req.body;

  try {
    const trainingEvent = await prisma.Training_Events.create({
      data: {
        username: username,
        Title_of_Training: Title_of_Training,
        Date_of_Event: Date_of_Event,
        No_of_Participants: No_of_Participants,
        Category: Category,
        Outcomes: Outcomes,
        Audience_Type: Audience_Type,
        Arranged_by: Arranged_by,
        Name_of_ORICPersonal: Name_of_ORICPersonal,
        Organizer: Organizer,
        Type_of_Event: Type_of_Event,
      },
    });
    res.status(200).json(trainingEvent);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while saving information" });
  }
}
