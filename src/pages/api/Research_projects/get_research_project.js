import prisma from "@/lib/prisma";

// pages/api/project.js
export default async function handler(req, res) {
  const username = req.query.username;

  try {
    const research_project = await prisma.Research_Project.findMany({
      where: {
        username: username,
      },
    });
    res.status(200).json(research_project);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

