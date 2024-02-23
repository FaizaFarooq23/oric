import prisma from "@/lib/prisma";

// pages/api/education.js
export default async function handler(req, res){

    const { account_number, education_id, degree, institude, completion_year, cgpa, field_of_study } = req.body;
    try{

        const education = await prisma.education.update({
            where: {
        account_number: account_number,
            },
            data: {
                education_id: education_id,
                degree: degree === "" ? null: degree,
                institude: institude === "" ? null: institude,
                year: completion_year === "" ? null: completion_year,
                cgpa: cgpa === "" ? null: cgpa,
                field_of_study: field_of_study === "" ? null: field_of_study,
            },
         
        });

        return res.status(200).json({ message: 'Education Updated' });

    }

catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating education' });
    }

}
