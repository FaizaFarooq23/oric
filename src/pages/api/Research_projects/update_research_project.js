import prisma from "@/lib/prisma";


export default async function handler(req, res) {

    const {Status_of_proposal,Status_of_project,ORIC_Overhead,Date_of_Approval,funding_approved,funding_utilized,funding_realesed,funding_agency,Date_of_Completion,delivery} = req.body;
    const { projectId } = req.query;
    try {
        const user = await prisma.Research_Project.update({
            where: {
                project_id: parseInt(projectId),
            },
            data: {
            Status_of_proposal:Status_of_proposal,
            Status_of_project:Status_of_project,
            ORIC_Overhead:ORIC_Overhead,
            Date_of_Approval:Date_of_Approval,
            funding_approved:funding_approved,
            funding_realesed:funding_realesed,
            funding_utilized:funding_utilized,
            funding_agency:funding_agency,
            Date_of_Completion:Date_of_Completion,
            delivery:delivery,
            },
        });

        return res.status(200).json({ message: 'Data Updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating Data' });
    }
}
