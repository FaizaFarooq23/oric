import prisma from "@/lib/prisma";

// pages/api/check_existing_fields.js
export default async function handler(req, res) {
  const { username, email, cnic, name } = req.body;

  try {
    const existingFields = {};

    // Check if username already exists
    const existingUsername = await prisma.faculty.findFirst({
      where: {
        username: username
      }
    });
    if (existingUsername) {
      existingFields.username = true;
    }

    // Check if email already exists
    const existingEmail = await prisma.faculty.findFirst({
      where: {
        email: email
      }
    });
    if (existingEmail) {
      existingFields.email = true;
    }

    // Check if CNIC already exists
    const existingCnic = await prisma.faculty.findFirst({
      where: {
        cnic: cnic
      }
    });
    if (existingCnic) {
      existingFields.cnic = true;
    }

    // Check if name already exists
    const existingName = await prisma.faculty.findFirst({
      where: {
        name: name
      }
    });
    if (existingName) {
      existingFields.name = true;
    }

    return res.status(200).json(existingFields);
  } catch (error) {
    console.error("Error checking existing fields:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
