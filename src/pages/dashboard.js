import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import Baselayout from "@/components/FacultyDashboard/Baselayout/Baselayout";
import Hamburgar from "@/components/Dashboard/Hamburgar";
import RightPanel from "@/components/Dashboard/RightPanel";
import { UserContext } from "@/context/UserContext/GlobalProvider";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const { updateUser } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/faculty/get_faculty`, {
          params: {
            username: session.user.username,
          }, 
        });
        console.log(username)
        console.log(res);
        updateUser(res.data.faculty);
        setIsAdmin(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching personal information:", error);
      }
    };
    if (session && session.user.username !== "admin@email.com") {
      fetchData();
    }
  }, [session]);

  
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(`/api/admin/get_admin`, {
          params: {
            username: session.user.username,
            designation: session.user.designation,
          },
        });
        console.log(res);
        updateUser(res.data.admin);
        setIsAdmin(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching personal information:", error);
      }
    };
    if (session && session.user.username === "admin@email.com" && isAdmin === false) {
      console.log("Calling admin")  
      fetchAdminData();
    }

  }, [session]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {!isAdmin ? (
        <Baselayout>
          <div className="flex justify-center gap-x-6">
           <Hamburgar />
            <RightPanel /> 
          </div>
        </Baselayout>
      ) : (
        <div>
          <AdminDashboard />
        </div>
      )}
    </div>
  );
}
