
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    
    try {
        const researchLinks = await prisma.Research_Linkage.findMany();
        res.status(200).json(researchLinks);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something went wrong" });
    }
    }