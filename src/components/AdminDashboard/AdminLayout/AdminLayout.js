import React from "react";
import AdminHeader from "../Header/AdminHeader";
import AdminBar from "../AdminBar/AdminBar";

export default function AdminLayout({ children }) {
 
  return (
    <div className="w-full">
      <div>
        {" "}
        <AdminHeader sidebarOpen={true} />
      </div>
      <div className="flex ">
        <div className=" relative w-16 flex h-screen items-center z-50">
          <AdminBar/>
        </div>

        <div className="flex justify-center items-start w-full py-[5%] px-10">{children}</div>
      </div>
    </div>
  );
}
