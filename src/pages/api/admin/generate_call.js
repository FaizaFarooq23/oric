import prisma from "@/lib/prisma";

// pages/api/genrate_call.js
export default async function handler(req, res) {
  // This API will be used to generate a call by the admin. It is a POST request

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {thematicArea, deadline, researchLink, contactDetails, mailingAddress, 
    donorAgency, funding, eligibilityCriteria} = req.body;

  try {
    const call = await prisma.Research_Calls.create({
      data: {
        Thematic_Area: thematicArea,
        Deadline: deadline,
        Research_link: researchLink,
        Contact_Details: contactDetails,
        Mailing_Address: mailingAddress,
        Donor_Agency: donorAgency,
        Funding: parseFloat(funding),
        Eligibility_Criteria: eligibilityCriteria,
      },
    });

    res.status(201).json({ message: "Call generated", call });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate call" });
  }
}