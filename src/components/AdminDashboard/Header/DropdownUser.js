import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { TbSettings } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { UserContext } from "@/context/UserContext/GlobalProvider";
import { signOut } from "next-auth/react";

const DropdownUser = () => {
  const [userEmail, setUserEmail] = useState(null);
  const { user } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
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

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);


  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

 const {logoutUser} = useContext(UserContext)
  const handleLogout = () => {
    logoutUser();
    signOut({ callbackUrl: "http://localhost:3000/" });
  };

  return (
    <div className="">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black ">
            Faiza Farooq
          </span>
          <span className="block text-xs">Oric Head</span>
        </span>
        <div className="flex items-center justify-center gap-x-2">
          <span className="h-12 w-12 rounded-full">
            {userEmail ?
              <img
                src={`/uploads/${userEmail}.png`}
                className="rounded-full"
                alt="User"
              /> : <img
                src="/images/profile.png"
                className="rounded-full"
                alt="User Default"
              />

            }

          </span>

          <IoIosArrowDown className="text-gray-500" />
        </div>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-2 mt-4 flex w-[16%] flex-col rounded-b-md border border-stroke bg-white shadow-default ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        <ul className="flex w-full flex-col gap-5 border-b border-stroke p-4">
          <li className="flex items-center ">
            <Link
              href="/profile"
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out hover:text-blue-900 lg:text-base"
            >
              <BsPerson className="text-xl " />
              Profile
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-4 text-sm font-medium duration-300 ease-in-out hover:text-blue-900 lg:text-base">
          <BiLogOut className="text-xl" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
