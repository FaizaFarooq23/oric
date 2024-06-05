import prisma from "@/lib/prisma";

export default async function handler(req, res) {
 

  const { username, email, cnic, name } = req.body;

  try {
    const existingFields = {
      username: false,
      email: false,
      cnic: false,
      name: false,
    };

    // Check if username already exists
    const existingUsername = await prisma.faculty.findUnique({
      where: { username }
    });
    if (existingUsername) existingFields.username = true;

    // Check if email already exists
    const existingEmail = await prisma.faculty.findUnique({
      where: { email }
    });
    if (existingEmail) existingFields.email = true;

    // Check if CNIC already exists
    const existingCnic = await prisma.faculty.findUnique({
      where: { cnic }
    });
    if (existingCnic) existingFields.cnic = true;

    // Check if name already exists
    const existingName = await prisma.faculty.findUnique({
      where: { name }
    });
    if (existingName) existingFields.name = true;

    return res.status(200).json(existingFields);
  } catch (error) {
    console.error('Error checking existing fields:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
