import prisma from "@/lib/prisma";

// pages/api/project.js
export default async function handler(req, res) {
  const username = req.query.username;

  try {
    const liasen = await prisma.Consultancy_Contract.findMany({
      where: {
        username: username,
      },
    });
    res.status(200).json(liasen);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
