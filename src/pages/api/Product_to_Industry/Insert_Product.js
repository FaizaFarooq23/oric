import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Name_of_leadInventor ,
    Designation_of_leadInventor ,
    Department_of_leadInventor ,
    Title_of_Invention,
    Category ,
    Feild_of_use,
    Development_Status ,
    KeyAspects,
    Name_of_partner ,
    Detail_of_partner ,
    Financial_support  ,
    Nationality ,
    Remarks ,
   
  } = req.body;
  try {
    const product_to_industry = await prisma.Product_to_Industry.create({
      data: {
        username: username,
        Name_of_leadInventor: Name_of_leadInventor,
        Designation_of_leadInventor  :Designation_of_leadInventor,
        Department_of_leadInventor  :Department_of_leadInventor,
        Title_of_Invention :Title_of_Invention,
        Category :Category,
        Development_Status :Development_Status ,
        KeyAspects:  KeyAspects,
        Feild_of_use:Feild_of_use,
       Name_of_partner:Name_of_partner ,
        Detail_of_partner:Detail_of_partner  ,
        Financial_support :Financial_support ,
        Nationality:Nationality ,
        Remarks:Remarks ,
       
      },
    });
    res.status(200).json(product_to_industry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while saving information" });
  }
}
