import { CiSearch } from "react-icons/ci";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminHeader = () => {
  const [researches, setResearches] = useState([]);
  const [filteredResearches, setFilteredResearches] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/stats/reports");
      
      const research_titles = res.data.map((research) => ({
        title: research.title,
        id: research.project_id,
      }));
      console.log("Researches", research_titles);
      setResearches(research_titles);
      setFilteredResearches(research_titles);
    } catch (error) {
      console.error("Error fetching researches:", error);
    }
  };

  useEffect(() => {
    if (researches.length > 0) return;
    fetchData();
  }, []);

  const handleSearch = (event) => {
    if (!event.target.value) {
      setFilteredResearches(researches);
      setDropdownOpen(false);
      return;
    }

    setDropdownOpen(true);
    const query = event.target.value;
    const filtered = researches.filter((research) =>
      research.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered", filtered);
    setFilteredResearches(filtered);
  }


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
                onChange={handleSearch}
              />
            </div>
            {dropdownOpen &&
            <div className="absolute mt-3 bg-[#fafafa] w-[400px] rounded-lg shadow-xl py-4 ">
              <div className="flex w-full justify-end px-5">
                <span className="text-[#6e6e6e] text-lg cursor-pointer" onClick={()=>setDropdownOpen(false)}>x</span>
              </div>
              {filteredResearches.map((research, index) => (
                <a href={`/project/${research.id}/${research.title}`} key={index} className="flex cursor-pointer items-center gap-x-2 py-4 px-5 hover:bg-[#ededed]">
                  <span>{research.title}</span>
                </a>
              ))}
            </div>
          }
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
