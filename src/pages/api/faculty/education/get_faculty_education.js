import prisma from "@/lib/prisma";

// pages/api/education.js

export default async function handler(req, res) {
  const account_number = req.query.account_number;

  try {
    const education = await prisma.education.findMany({
      where: {
        account_number: parseInt(account_number),
      },
    });
    res.status(200).json(education);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
