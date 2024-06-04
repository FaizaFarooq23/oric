import ResetPassword from "@/components/FacultyDashboard/Login/ForgotPassword";
import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <div className="flex items-center justify-center bg-blue-900">
      <div className="flex justify-between items-center px-10 ">
        <Link href="/">
          {" "}
          <div className="flex justify-center ">
            <img src="images/white-logo.png" alt="logo" className="" />
          </div>
        </Link>
      </div>
      <ResetPassword />
    </div>
  );
}
