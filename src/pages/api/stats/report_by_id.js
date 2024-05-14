import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    const { project_id } = req.query;
    
    try {
        const projects = await prisma.Research_Project.findUnique({
            where: {
                project_id: parseInt(project_id),
            },
        });
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Something went wrong' });
    }
    }
    