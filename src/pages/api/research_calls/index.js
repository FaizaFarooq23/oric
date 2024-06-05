import prisma from "@/lib/prisma";

// pages/api/genrate_call.js
export default async function handler(req, res) {
  // This API will be used to generate a call by the admin. It is a POST request



  try {
    
    const calls = await prisma.Research_Calls.findMany();

    res.status(200).json({ calls });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate call" });
  }
}