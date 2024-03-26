import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Name_of_leadInventor,
    Designation_of_leadInventor ,
    Department_of_leadInventor ,
    Title ,
    Category,
    Feild_of_use,
    KeyAspects,
    Nationality,
    Status_of_Negotiations,
    start_Date  ,
    end_Date , 
    Date_of_Agreement,
    Status_of_Licensee ,
    Licensee_Name,
    Licensee_Organization,
    Licensee_Type,
    Development_Status,
  } = req.body;
  try {
    const IPlicensing = await prisma.IP_Licensing.create({
      data: {
        username: username,
        Name_of_leadInventor : Name_of_leadInventor,
        Designation_of_leadInventor  :Designation_of_leadInventor,
        Department_of_leadInventor  :Department_of_leadInventor,
        Title :Title,
        Category :Category,
        Development_Status :Development_Status,
        KeyAspects:KeyAspects ,
        Nationality:Nationality ,
        Status_of_Negotiations:Status_of_Negotiations,
       start_Date  :start_Date ,
       end_Date :end_Date,
       Date_of_Agreement:Date_of_Agreement,
        Status_of_Licensee  :Status_of_Licensee ,
        Feild_of_use:Feild_of_use,
        Licensee_Name:Licensee_Name,
        Licensee_Organization:Licensee_Organization,
        Licensee_Type:Licensee_Type
      },
    });
    res.status(200).json(IPlicensing);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while saving information" });
  }
}
