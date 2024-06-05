import React , {useEffect} from 'react'
import Search from './components/RightPanel/Search'
import Chart from './components/RightPanel/Chart'
import PersonalData from './components/RightPanel/PersonalData'
import { signIn, signOut, useSession } from "next-auth/react";
export default function RightPanel() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <div className='flex flex-col mt-4 gap-y-4 pr-6'>
        <Search/>
        <PersonalData username={session.user.username} />
        <Chart/>
    </div>
  )
}
