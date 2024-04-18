import prisma from "@/lib/prisma";
export default async function handler(req, res) {
  const username = req.query.username;

  try {
    const Awards = await prisma.Awards.findMany({
      where: {
        username: username,
      },
    });
    res.status(200).json(Awards);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

