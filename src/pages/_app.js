import AwardsModal from "@/components/Profile/components/Awards/Awards";
import EducationFormModal from "@/components/Profile/components/Education/EducationForm";
import { UserProvider } from "@/context/UserContext/GlobalProvider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "react-simple-modal-provider";
import ResearchProjectModal from "@/components/Profile/components/ResearchProjects/Researches";
import LiasendevelopedFormModal from "@/components/Research-excellence/Forms/Liasen/Liasendeveloped";
import ResearchProjectFormModal from "@/components/Research-excellence/Forms/ResearchProjects/Researchprojectform";
import CasestudyFormModal from "@/components/Research-excellence/Forms/CaseStudy/CasestudyForm";
import ResearchLinkageFormModal from "@/components/Research-excellence/Forms/ResearchLinkages/ResearchLinkageForm";
import ConsultancyContractFormModal from "@/components/Research-excellence/Forms/Consultancy_Contract/Consultancy_ContractForm";
import IPandPatentFormModal from "@/components/Research-excellence/Forms/IPDisclosure/IPform";
import Product_DisplayedFormModal from "@/components/Research-excellence/Forms/ResearchProducts/ProductDisplayedform";
import IPLicensingModal from "@/components/Research-excellence/Forms/IP_Licensing/IP_LicensingForm";
import Product_to_IndustryFormModal from "@/components/Research-excellence/Forms/Product_to_Industry/Product_to_industryForm";
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
