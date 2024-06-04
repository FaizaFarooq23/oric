import prisma from "@/lib/prisma";

// pages/api/project.js

export default async function handler(req, res) {
    const username = req.query.username;
 
  try {
    const projects = await prisma.IPandPatent.findMany({
        where: {
          username: username,
        },
      });

   


    const month_projects = [
        { month: "Jan", Projects: 0 ,Filed:0,Granted:0},
        { month: "Feb", Projects: 0,Filed:0,Granted:0 },
        { month: "Mar", Projects: 0,Filed:0,Granted:0 },
        { month: "April",Projects: 0,Filed:0,Granted:0 },
        { month: "May", Projects: 0,Filed:0,Granted:0 },
        { month: "June", Projects: 0,Filed:0,Granted:0 },
        { month: "July", Projects: 0,Filed:0,Granted:0 },
        { month: "Aug", Projects: 0,Filed:0,Granted:0 },
        { month: "Sep", Projects: 0,Filed:0,Granted:0 },
        { month: "Oct", Projects: 0,Filed:0,Granted:0 },
        { month: "Nov", Projects: 0,Filed:0,Granted:0 },
        { month: "Dec", Projects: 0,Filed:0,Granted:0 },
    ]

    for (let i = 0; i < projects.length; i++) {
        
        const Date_of_filing = new Date(projects[i].Date_of_filing);
        if (Date_of_filing) {
          const month = Date_of_filing.getMonth();
          month_projects[month].Projects++;
  
          if (projects[i].Status_of_patent === "Filed") {
            month_projects[month].Filed++;
          }
  
          if (projects[i].Status_of_patent === "Granted") {
            month_projects[month].Granted++;
          }
        }
      }
  
      res.status(200).json({
       
        month_projects,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong" });
  
  }
}