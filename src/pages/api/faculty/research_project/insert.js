import prisma from "@/lib/prisma";

// pages/api/project.js
export default async function handler(req, res){

    const { username, title, category, type_of_research, funding_agency, funded_project, funding_received, funding_utilized, ip_disclosure, submission_date, start_date, end_date, status } = req.body;
    
    
    try{
    const project = await prisma.researchProject.create({
        data: {
          username: username,
            title: title,
            category: category,
            type_of_research: type_of_research,
            funding_agency: funding_agency,
            funded_project: funded_project,
            funding_received: funding_received,
            funding_utilized: funding_utilized,
            ip_disclosure: ip_disclosure,
            submission_date: submission_date,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            status: status,
        },
    });
    res.status(200).json(project);
} catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });  
}
    
}