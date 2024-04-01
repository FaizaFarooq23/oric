import prisma from "@/lib/prisma";

// pages/api/project.js

export default async function handler(req, res) {
 
  try {
    const projects = await prisma.Research_Project.findMany();

    let ongoing_projects = 0;
    let complete_projects = 0;
    let funding = 0;
    let research_in_a_fiscal_year = 0;
    let popular_category = null;
    let top_departments = {};

    const month_researches = [
        { month: "January", researches: 0 },
        { month: "February", researches: 0 },
        { month: "March", researches: 0 },
        { month: "April", researches: 0 },
        { month: "May", researches: 0 },
        { month: "June", researches: 0 },
        { month: "July", researches: 0 },
        { month: "August", researches: 0 },
        { month: "September", researches: 0 },
        { month: "October", researches: 0 },
        { month: "November", researches: 0 },
        { month: "December", researches: 0 },
    ]

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].Status_of_project=== "Ongoing") {
            ongoing_projects++;
        } else {
            complete_projects++;
        }
        funding += parseFloat(projects[i].funding_approved);
        // Check if the start date is between June of Last year and June of this year
        const start_date = new Date(projects[i].start_Date);
        // Check if start date is between June of last year and June of this year
        if (start_date.getMonth() >= 6 && start_date.getFullYear() === new Date().getFullYear() - 1) {
            research_in_a_fiscal_year++;
        } else if (start_date.getMonth() < 6 && start_date.getFullYear() === new Date().getFullYear()) {
            research_in_a_fiscal_year++;
        }

        // Check for top 5 popular departments
        let department = projects[i].Department_of_Pi;

        if (top_departments[department]) {
            top_departments[department]++;
        } else {
            top_departments[department] = 1;
        }
        // Check the researchhes of the start date
        if (start_date){
            const month = start_date.getMonth();
            month_researches[month].researches++;
        }


        
    }


    res.status(200).json({ ongoing_projects, complete_projects,funding,research_in_a_fiscal_year ,popular_category,top_departments, month_researches});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
