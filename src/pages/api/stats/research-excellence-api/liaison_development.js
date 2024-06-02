import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const liaisons = await prisma.liaison.findMany();
    res.status(200).json(liaisons);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
