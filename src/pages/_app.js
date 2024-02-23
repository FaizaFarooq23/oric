import AwardsModal from '@/components/Profile/components/Awards/Awards';
import EducationFormModal from '@/components/Profile/components/Education/EducationForm';
import { UserProvider } from '@/context/UserContext/GlobalProvider';
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from 'react-simple-modal-provider';
import ResearchProjectModal from '@/components/Profile/components/ResearchProjects/Researches';


export default function App({ Component, session, pageProps }) {
  return (

    <SessionProvider session={session}>
      <ModalProvider value={[EducationFormModal, AwardsModal, ResearchProjectModal]}>

        <UserProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </UserProvider>
      </ModalProvider>

    </SessionProvider>

  )
}
