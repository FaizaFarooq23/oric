import prisma from "@/lib/prisma";

// pages/api/register.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Extract data from the request body
      const {
        name,
        email,
        password,
        phoneNumber,
        confirmPassword,
        username,
        department,
        dateOfBirth,
        qualification,
        designation,
        cnic,
      } = req.body;
  
      // Perform any necessary validation
  
      // Example: Check if the password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      // TODO: Add your registration logic here
      // Example: Save user data to a database
      const result = await prisma.Faculty.create(
        {
          data: {
            name: name,
            email: email,
            password: password,
            contact_number: phoneNumber,
            username: username,
            department: department,
            date_of_birth: new Date(dateOfBirth).toISOString(),
            qualification: qualification,
            designation: designation,
            cnic: cnic,
            updated_at: new Date(),
          }
        }
      )
      // Return a success response
      return res.status(200).json({ message: 'Registration successful' });
    } else {
      // Return a 405 Method Not Allowed error if the request method is not POST
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  