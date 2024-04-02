import { CiSearch } from "react-icons/ci";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";

const AdminHeader = () => {
  return (
    <header className="fixed top-0 z-30 flex w-full bg-white drop-shadow">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center justify-start gap-x-8">
          <img src="/images/oric-logo.png" alt="logo" className="h-12 w-16" />
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="flex items-center justify-center gap-x-2">
              <button className=" cursor-pointer">
                <CiSearch className="text-2xl" />
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent   focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
