import prisma from "@/lib/prisma";

// pages/api/register.js
export default async function handler(req, res) {
      // Extract data from the request body
    const admin = await prisma.admin.findFirst({
        where: {
          email: req.query.username,
          designation:req.query.designation
        },
    })     
    if (admin) {
        return res.status(200).json({ message: 'Admin found', admin: admin });
    } else {
        return res.status(404).json({ error: 'Admin not found' });
    }
}
  