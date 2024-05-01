import prisma from "@/lib/prisma";


export default async function handler(req, res) {

    const {Date_of_Agreement,Licensee_Type,Status_of_Licensee} = req.body;
    const {id } = req.query;
    try {
        const user = await prisma.IP_Licensing.update({
            where: {
                id: parseInt(id),
            },
            data: {
                Status_of_Licensee:Status_of_Licensee,
           Date_of_Agreement:Date_of_Agreement,
           Licensee_Type:Licensee_Type
            },
        });

        return res.status(200).json({ message: 'Data Updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating Data' });
    }
}
