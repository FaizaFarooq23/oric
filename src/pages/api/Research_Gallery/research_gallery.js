import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    try {
        const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
        const currentYear = new Date().getFullYear();
        
        // Find projects with status of proposal as 'Approved'
        const approvedProjects = await prisma.Research_Project.findMany({
            where: {
                Status_of_proposal: 'Approved'
            }
        });

        // Find projects going on in the current month
        const projectsGoingOnThisMonth = approvedProjects.filter(project => {
            const startDate = new Date(project.start_Date);
            const endDate = new Date(project.end_Date);

            // Check if the project's start date is in the past and end date is in the future of the current month
            return startDate.getMonth() + 1 <= currentMonth && endDate.getMonth() + 1 >= currentMonth && startDate.getFullYear() === currentYear && endDate.getFullYear() === currentYear;
        });

        res.status(200).json(projectsGoingOnThisMonth);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
