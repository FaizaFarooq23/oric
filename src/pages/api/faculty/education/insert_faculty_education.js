import prisma from "@/lib/prisma";

// pages/api/education.js
export default async function handler(req, res){

    const { account_number, degree, institute, cgpa, year, field_of_study, registration_number } = req.body;
    
    try{
    const education = await prisma.education.create({
        data: {
            account_number: account_number,
            registration_number: registration_number,
            degree: degree,
            institute: institute,
            cgpa: cgpa,
            year: year,
            field_of_study: field_of_study,
        },

    });
    res.status(200).json(education);
} catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });  
}
    
}