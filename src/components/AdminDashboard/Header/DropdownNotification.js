import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import axios from "axios";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [researchCalls, setResearchCalls] = useState([]);
  const trigger = useRef(null);
  const dropdown = useRef(null);


  const getResearchCalls = async () => {
    try {
      const res = await axios.get("/api/research_calls");
      const calls = res.data.calls;
      console.log("Research Calls", calls);
      for (let i = 0; i < calls.length; i++) {
        // Check if calls.Deadline is greater than today's date
        let deadline = new Date(calls[i].Deadline);
        console.log("Deadline", deadline);
        let today = new Date();
        console.log("Today", today);
        if (today < deadline) {
          calls[i]["days_left"] = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
          setResearchCalls((researchCalls) => [...researchCalls, calls[i]]);
        }
      }


    } catch (error) {
      console.error("Error fetching research calls:", error);
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    console.log("Research Calls", researchCalls);
    if (researchCalls.length <= 0) {
      getResearchCalls()
    }
  }, [])


  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-blue-900"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75 ">
            
          </span>
        </span>

        <IoMdNotificationsOutline className="text-xl" />

      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default  sm:right-0 sm:w-80 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium ">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto p-4 ">
        
          <li>
            {researchCalls.length > 0 ? (
              researchCalls.map((call, index) => (
                <Link href={`/research-excellence`} key={index}>
                  <div className="flex items-center gap-2 py-2 hover:bg-gray-100">
                    <span className="text-sm font-medium">Submit your researches for {call.Thematic_Area}. {call.days_left} days left</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm font-medium">No new notifications</p>
            )}
          </li>
        
     
     </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
