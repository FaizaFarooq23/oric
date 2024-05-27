import prisma from "@/lib/prisma";

// pages/api/project.js

export default async function handler(req, res) {

    try {
        const projects = await prisma.Research_Project.findMany();

        let ongoing_projects = 0;
        let complete_projects = 0;
        let funding = 0;
        let maxFunding = 0;
        let research_in_a_fiscal_year = 0;
        let popular_category = null;
        let popular_categories = {};
        let top_departments = {};

        const month_researches = [
            { month: "Jan", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "Feb", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "Mar", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "April", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "May", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "June", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "July", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "Aug", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "Sep", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "Oct", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "Nov", Researches: 0, Submitted: 0, Approved: 0 },
            { month: "Dec", Researches: 0, Submitted: 0, Approved: 0 },
        ]

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].Status_of_project === "Ongoing") {
                ongoing_projects++;
            } else {
                complete_projects++;
            }
            if (projects[i].funding_approved !== '') {
                funding += parseFloat(projects[i].funding_approved);
            }
            // Check if the start date is between June of Last year and June of this year
            const start_date = new Date(projects[i].start_Date);
            // Check if start date is between June of last year and June of this year
            if (start_date.getMonth() >= 6 && start_date.getFullYear() === new Date().getFullYear() - 1) {
                research_in_a_fiscal_year++;
            } else if (start_date.getMonth() < 6 && start_date.getFullYear() === new Date().getFullYear()) {
                research_in_a_fiscal_year++;
            }

            // Check for popular category
            let category = projects[i].category;
            if (popular_categories[category]) {
                popular_categories[category]++;
            } else {
                popular_categories[category] = 1;
            }

            // Check for top 5 popular departments
            let department = projects[i].Department_of_Pi;

            if (top_departments[department]) {
                top_departments[department]++;
            } else {
                top_departments[department] = 1;
            }
            // Check the researches submission date
            const Date_of_Submission = new Date(projects[i].Date_of_Submission);
            if (Date_of_Submission) {
                const month = Date_of_Submission.getMonth();
                month_researches[month].Researches++;
            }
            // fetch researches having status of proposal submitted or approved with in months 
            if (projects[i].Status_of_proposal === "Submitted") {
                const Date_of_Submission = new Date(projects[i].Date_of_Submission);
                if (Date_of_Submission) {
                    const month = Date_of_Submission.getMonth();
                    month_researches[month].Submitted++;
                }
            }

            if (projects[i].Status_of_proposal === "Approved") {
                const Date_of_Submission = new Date(projects[i].Date_of_Submission);
                if (Date_of_Submission) {
                    const month = Date_of_Submission.getMonth();
                    month_researches[month].Approved++;
                }
            }
        }



        // Get the popular category
        let max = 0;
        for (let key in popular_categories) {
            if (popular_categories[key] > max) {
                max = popular_categories[key];
                popular_category = key;
            }
        }

        res.status(200).json({ ongoing_projects, complete_projects, funding, research_in_a_fiscal_year, popular_category, top_departments, month_researches });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something went wrong" });
    }
}
