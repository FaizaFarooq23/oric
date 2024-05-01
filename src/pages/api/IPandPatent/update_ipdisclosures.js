import prisma from "@/lib/prisma";


export default async function handler(req, res) {

    const {Status_of_patent} = req.body;
    const { id } = req.query;
    try {
        const user = await prisma.IPandPatent.update({
            where: {
                id: parseInt(id),
            },
            data: {
            Status_of_patent:Status_of_patent,
           



            },
        });

        return res.status(200).json({ message: 'Data Updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating Data' });
    }
}
