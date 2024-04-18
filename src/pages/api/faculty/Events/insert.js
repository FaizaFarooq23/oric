import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const { 
        username,
        Title_of_Event,
        Date_of_Event ,
        Community,
        Remarks ,
        Breif_report,
        Outcome ,
        Collaboration_Developed,
        Name_of_Collaborating_org,
        Sponcerned,
        Name_of_Sponcoring_agency,
        Grant_Value,
        Role,
        Venue,
        Outcome_Material,
        event_detail,
     } = req.body;
    

  try {
    const events = await prisma.Civil_Engagement_Events.create({
        data: {
            username: username,
            Title_of_Event :Title_of_Event ,
            Date_of_Event : Date_of_Event ,
            Community : Community,
            Remarks : Remarks ,
            Breif_report :Breif_report ,
            Outcome : Outcome ,
            Collaboration_Developed :Collaboration_Developed ,
            Name_of_Collaborating_org :Name_of_Collaborating_org ,
            Sponcerned : Sponcerned,
            Name_of_Sponcoring_agency :Name_of_Sponcoring_agency ,
            Grant_Value :Grant_Value ,
            Role : Role,
            Venue : Venue,
            Outcome_Material :Outcome_Material ,
            event_detail : event_detail,
          },
    });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while saving information" });
  }
}
