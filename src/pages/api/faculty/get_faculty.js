import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    try {
        // Extract data from the request query parameters
        const { username } = req.query;
        
        if (!username) {
            return res.status(400).json({ error: 'Email is required in query parameters' });
        }

        // Find faculty by email
        const faculty = await prisma.faculty.findFirst({
            where: {
                email: username,
            },
        });

        if (faculty) {
            return res.status(200).json({ message: 'Faculty found', faculty });
        } else {
            return res.status(404).json({ error: 'Faculty not found' });
        }
    } catch (error) {
        console.error('Error in API register handler:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
