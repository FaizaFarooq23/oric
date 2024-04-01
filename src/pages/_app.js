
import EducationFormModal from "@/components/FacultyDashboard/Profile/components/Education/EducationForm";
import { UserProvider } from "@/context/UserContext/GlobalProvider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "react-simple-modal-provider";
import ResearchProjectModal from "@/components/FacultyDashboard/Profile/components/ResearchProjects/Researches";
import LiasendevelopedFormModal from "@/components/FacultyDashboard/ResearchExcellence/Forms/Liasen/Liasendeveloped";
import ResearchProjectFormModal from "@/components/FacultyDashboard/ResearchExcellence/Forms/ResearchProjects/Researchprojectform";
import CasestudyFormModal from "@/components/FacultyDashboard/ResearchExcellence/Forms/CaseStudy/CasestudyForm";
import ResearchLinkageFormModal from "@/components/FacultyDashboard/ResearchExcellence/Forms/ResearchLinkages/ResearchLinkageForm";
import ConsultancyContractFormModal from "@/components/FacultyDashboard/ResearchExcellence/Forms/Consultancy_Contract/Consultancy_ContractForm";
import IPandPatentFormModal from "@/components/FacultyDashboard/ResearchExcellence/Forms/IPDisclosure/IPform";
import Product_DisplayedFormModal from "@/components/FacultyDashboard/ResearchExcellence/Forms/ResearchProducts/ProductDisplayedform";
import IPLicensingModal from "@/components/FacultyDashboard/ResearchExcellence/Forms/IP_Licensing/IP_LicensingForm";
import Product_to_IndustryFormModal from "@/components/FacultyDashboard/ResearchExcellence/Forms/Product_to_Industry/Product_to_industryForm";
import AwardsModal from "@/components/FacultyDashboard/Profile/components/Awards/Awards";
// import ResearchLinkageFormModal from "@/components/Research-excellence/Forms/ResearchLinkages/ResearchLinkageForm";
export default function App({ Component, session, pageProps }) {
  return (
    
    <SessionProvider session={session}>
      <ModalProvider
        value={[
          EducationFormModal,
          AwardsModal,
          ResearchProjectModal,
          LiasendevelopedFormModal,
          ResearchProjectFormModal,
          CasestudyFormModal,
          IPLicensingModal,
          ResearchLinkageFormModal,
          ConsultancyContractFormModal,
          IPandPatentFormModal,
          Product_DisplayedFormModal,
          Product_to_IndustryFormModal       
        ]}
      >
        
        <UserProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </UserProvider>
      </ModalProvider>
    </SessionProvider>
  );
}
