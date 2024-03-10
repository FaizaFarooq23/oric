import prisma from "@/lib/prisma";

// pages/api/liasen.js
export default async function handler(req, res){
        const { username,Liasen_developed_with , Date_of_exceution } = req.body;
    try{
    const liasen = await prisma.liasen.create({
        data: {
             username: username,
            Liasen_developed_with:Liasen_developed_with,
            Date_of_exceution:new Date(Date_of_exceution),
        },

    });
    res.status(200).json(liasen);
} catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });  
}
    
}