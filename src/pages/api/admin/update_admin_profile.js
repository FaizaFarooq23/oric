import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    // Update the profile  of the admin

    const { username, designation, email, password} = req.body;

    try {
        const user = await prisma.admin.update({
            where: {
                username: username,
            },
            data: {
                designation: designation,
                email: email,
                password: password,
            },
        });

        return res.status(200).json({ message: 'Admin Updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating admin' });
    }
}