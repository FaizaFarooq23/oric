import React from 'react'
import Search from './components/RightPanel/Search'
import Chart from './components/RightPanel/Chart'
import PersonalData from './components/RightPanel/PersonalData'

export default function RightPanel() {
  return (
    <div className='flex flex-col  mt-8 gap-y-4 pr-6'>
        <Search/>
        <PersonalData completed={11} inProgress={4} />
        <Chart/>
    </div>
  )
}
