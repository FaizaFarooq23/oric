import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Name_of_leadInventor ,
    Designation_of_leadInventor  ,
    Department_ofleadInventor  ,
    Title_of_Invention ,
    Category ,
    Development_Status ,
    KeyAspects ,
    Commercial_partner ,
    Name_of_patentdept ,
    Detail_of_patentdept  ,
    Financial_support  ,
    Date_of_disclosure   ,
    Previous_disclosure  ,
    Date_of_filing ,
    Nationality ,
    Status_of_patent ,
    Type  ,
  } = req.body;
  try {
    const ipdisclosure_patent = await prisma.IPandPatent.create({
      data: {
        username: username,
        Name_of_leadInventor : Name_of_leadInventor,
        Designation_of_leadInventor  :Designation_of_leadInventor,
        Department_ofleadInventor  :Department_ofleadInventor,
        Title_of_Invention :Title_of_Invention,
        Category :Category,
        Development_Status :Development_Status,
        KeyAspects:KeyAspects ,
        Commercial_partner :Commercial_partner,
       Name_of_patentdept:Name_of_patentdept ,
        Detail_of_patentdept:Detail_of_patentdept  ,
        Financial_support :Financial_support ,
        Date_of_disclosure  :Date_of_disclosure ,
        Previous_disclosure  :Previous_disclosure,
        Date_of_filing:Date_of_filing ,
        Nationality:Nationality ,
        Status_of_patent:Status_of_patent ,
        Type :Type,
      },
    });
    res.status(200).json(ipdisclosure_patent);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while saving information" });
  }
}
