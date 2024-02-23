import Baselayout from '@/components/Baselayout/Baselayout'
import Hamburgar from '@/components/Dashboard/Hamburgar'
import RightPanel from '@/components/Dashboard/RightPanel'
import { UserContext } from '@/context/UserContext/GlobalProvider'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useContext, useEffect } from 'react'

export default function dashboard() {
  const {data: session} = useSession();
  const { updateUser } = useContext(UserContext); 
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/faculty/get_faculty` , {
          params: {
            username: session.user.username,
          }
        });
        console.log(res)
        updateUser(res.data.faculty);
      } catch (error) {
        console.error("Error fetching personal information:", error);
      }
    };
    if(session){
      console.log(session)
      fetchData();
    }
  }, [session]);


  return (
      <Baselayout >
        <div className='flex justify-center gap-x-6'>
          <Hamburgar />
          <RightPanel />
        </div>
      </Baselayout>

  )
}
