import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const {
    username,
    Name_of_lead ,
    Designation_of_lead ,
    Department_of_lead ,
    Title,
    Category ,
    Feild_of_use,
    Name_of_Forum ,
    Detail_of_Forum ,
    Financial_support  ,
    Nationality ,
    Status ,
   
  } = req.body;
  try {
    const product_displayed = await prisma.Product_Displayed.create({
      data: {
        username: username,
        Name_of_lead: Name_of_lead,
        Designation_of_lead  :Designation_of_lead,
        Department_of_lead  :Department_of_lead,
        Title :Title,
        Category :Category,
        Feild_of_use:Feild_of_use,
       Name_of_Forum:Name_of_Forum ,
        Detail_of_Forum:Detail_of_Forum  ,
        Financial_support :Financial_support ,
        Nationality:Nationality ,
        Status:Status ,
       
      },
    });
    res.status(200).json(product_displayed);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while saving information" });
  }
}
