import prisma from "@/lib/prisma";

// pages/api/register.js
export default async function handler(req, res) {
      // Extract data from the request body
    const faculty = await prisma.faculty.findFirst({
        where: {
          email: req.query.username,
        },
    })     
    if (faculty) {
        return res.status(200).json({ message: 'Faculty found', faculty: faculty });
    } else {
        return res.status(404).json({ error: 'Faculty not found' });
    }
}
  