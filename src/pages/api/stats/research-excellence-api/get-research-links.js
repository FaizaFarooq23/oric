
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const { project_id } = req.query;
    
    try {
        const researchLinks = await prisma.Research_Linkage.findMany({
        where: {
            project_id: parseInt(project_id),
        },
        });
        res.status(200).json(researchLinks);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something went wrong" });
    }
    }