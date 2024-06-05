import { UserContext } from '@/context/UserContext/GlobalProvider';
import React, { useContext } from 'react'

export default function Welcome({ notice }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="flex justify-between items-center w-50% bg-red-200 p-2 mt-8 rounded-lg">
        {notice &&
          <div className="flex flex-col" >
            <span className="text-xl font-bold">Highlights</span>
            <span className="text-sm font-semibold">
              Dear Faculty, Please submit your researches related to {notice.Thematic_Area} by {notice.Deadline}.
              &nbsp;{notice.Eligibility_Criteria} are eligible to submit the researches. The minimum funding amount is {notice.Funding}.<br />
              For more details, please contact {notice.Mailing_Address} or {notice.Contact_Details}.
            </span>
          </div>
        }
      </div>
      <div className="flex justify-between items-center w-50% bg-div-gray px-4 mt-8 rounded-lg">
        {user &&
          <div className="flex flex-col" >

            <span className="text-2xl font-bold">Hello {user.name}!</span>
            <span className="text-xl font-semibold">{user.designation}</span>

            <span>Its good to see you again.</span>
          </div>
        }
        <div className="mr-4">
          <img
            src="images/illustration.svg"
            alt="logo"
            className="h-32 z-10 -mt-6 "
          />
        </div>
      </div>
    </div>
  )
}
