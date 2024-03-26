import prisma from "@/lib/prisma";

// pages/api/project.js
export default async function handler(req, res) {
  const username = req.query.username;

  try {
    const Product_Displayed = await prisma.Product_Displayed.findMany({
      where: {
        username: username,
      },
    });
    res.status(200).json(Product_Displayed);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

