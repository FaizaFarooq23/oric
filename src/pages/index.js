import Login from '@/components/FacultyDashboard/Login/Login'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <div className='flex flex-col justify-between items-center bg-blue-900 h-full'>
      <div className='z-50'>
      <Login />
      </div>
      <img src="images/rectangle_box.svg" alt="" className="absolute bottom-0 right-0 h-96 z-10 " />
    </div>
  )
}
