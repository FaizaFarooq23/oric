import prisma from "@/lib/prisma";

// pages/api/project.js

export default async function handler(req, res) {
    const username = req.query.username;
 
  try {
    const projects = await prisma.Research_Project.findMany({
        where: {
          username: username,
        },
      });

    let ongoing_projects = 0;
    let complete_projects = 0;
    let funding = 0;
    let research_in_a_fiscal_year = 0;


    const month_researches = [
        { month: "Jan", Researches: 0 ,Submitted:0,Approved:0},
        { month: "Feb", Researches: 0,Submitted:0,Approved:0 },
        { month: "Mar", Researches: 0,Submitted:0,Approved:0 },
        { month: "April",Researches: 0,Submitted:0,Approved:0 },
        { month: "May", Researches: 0,Submitted:0,Approved:0 },
        { month: "June", Researches: 0,Submitted:0,Approved:0 },
        { month: "July", Researches: 0,Submitted:0,Approved:0 },
        { month: "Aug", Researches: 0,Submitted:0,Approved:0 },
        { month: "Sep", Researches: 0,Submitted:0,Approved:0 },
        { month: "Oct", Researches: 0,Submitted:0,Approved:0 },
        { month: "Nov", Researches: 0,Submitted:0,Approved:0 },
        { month: "Dec", Researches: 0,Submitted:0,Approved:0 },
    ]

    for (let i = 0; i < projects.length; i++) {
        
        const Date_of_Submission = new Date(projects[i].Date_of_Submission);
        if (Date_of_Submission) {
          const month = Date_of_Submission.getMonth();
          month_researches[month].Researches++;
  
          if (projects[i].Status_of_proposal === "Submitted") {
            month_researches[month].Submitted++;
          }
  
          if (projects[i].Status_of_proposal === "Approved") {
            month_researches[month].Approved++;
          }
        }
      }
  
      res.status(200).json({
       
        month_researches,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong" });
  
  }
}
