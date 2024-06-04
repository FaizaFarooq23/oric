import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const projects = await prisma.IP_Licensing.findMany();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
