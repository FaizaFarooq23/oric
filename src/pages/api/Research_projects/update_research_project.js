import prisma from "@/lib/prisma";

// pages/api/register.js
export default async function handler(req, res) {
    // Update the contact info of the user

    const { username, contact_number, address , designation, department} = req.body;

    try {
        const user = await prisma.faculty.update({
            where: {
                username: username,
            },
            data: {
              
                contact_number: contact_number,
                address: address,
                designation: designation,
                department: department,

            },
        });

        return res.status(200).json({ message: 'Faculty Updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating faculty' });
    }
}
