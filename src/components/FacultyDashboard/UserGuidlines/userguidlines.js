import React from "react";

function UserSupport() {
  const content = [
    {
      heading:
        "Introducing Offices of Research, Innovation, and Commercialization (ORIC):",
      paragraph:
        "The Higher Education Commission (HEC) is spearheading a transformative initiative aimed at elevating research endeavors within our esteemed academic institutions. This initiative entails the establishment of specialized centers known as Offices of Research, Innovation, and Commercialization (ORICs) within universities nationwide. ORICs serve as the nexus for advancing research initiatives, facilitating innovation, and fostering collaboration between academia and industry. They are meticulously designed to streamline the research lifecycle, from the inception of pioneering concepts to the realization of tangible outcomes with commercial viability.",
    },
    {
      heading: "ORIC's Mission:",
      paragraph:
        "At the core of ORICs' mission is the promotion of a culture of research excellence, where scholarly pursuits are seamlessly integrated with practical applications that address societal challenges. These centers provide strategic guidance and operational support to researchers, enabling them to translate theoretical knowledge into impactful solutions that benefit communities and contribute to national development. Through ORICs, universities are empowered to harness the full potential of their research capabilities, driving sustainable economic growth and positioning themselves as hubs of innovation and intellectual advancement. In essence, ORICs represent a cornerstone of our collective commitment to fostering a vibrant research ecosystem that not only generates new knowledge but also catalyzes its transformation into tangible innovations with real-world impact.",
    },
  ];

  const documents = [
    {
      title: "ORIC Policy 2021 by HEC",
      url: "https://www.hec.gov.pk/english/services/universities/ORICs/Documents/ORICs%20Policy%202021.pdf",
    },
    {
      title: "ORIC Scorecard Guidelines",
      url: "https://www.hec.gov.pk/english/services/universities/ORICs/Documents/Guidelines%20for%20ORIC%20Scorecard.pdf",
    },
    {
      title: "ORIC Scorecard Guidelines",
      url: "https://www.hec.gov.pk/english/services/universities/ORICs/Documents/Guidelines%20for%20ORIC%20Scorecard.pdf",
    },
  ];

  return (
    <>
      <div className="text-2xl m-4 items-center flex flex-row  text-center font-base  justify-center align-center  font-sans ">
        <h1 className="text-3xl">ORIC :</h1>
        <h1 className="italic">
          {" "}
          Office of Research, Innovation And Commercialization
        </h1>
        <img
          src="images/usersupport.jpg"
          className="b-2 b-black h-24 ml-4 w-24 "
          alt="ORIC"
        />
      </div>
      <hr className="my-4 border-t-2 color-black border-black-300 " />
      {content.map((section, index) => (
        <div key={index}>
          <h1 className="text-xl font-bold font-base pl-8">
            {section.heading}
          </h1>
          <div className="flex justify-center align-center mr-4">
            <p className="text-justify pl-8">{section.paragraph}</p>
          </div>
        </div>
      ))}
      <div className=" ">
        <h1 className="text-2xl font-bold font-base pl-8">
          Documents:
        </h1>
        <div className="pl-8 mt-2">
          <ul className="list-disc text-blue-900">
            {documents.map((document, index) => (
              <li key={index}>
                <a
                  href={document.url}
                  className="text-blue-900 font-bold text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {document.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserSupport;
