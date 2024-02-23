import React, { useContext, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { PiHouse } from "react-icons/pi";
import {
  IoLogOutOutline,
  IoPersonOutline,
  IoPerson,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";
import { useRouter } from "next/router";
import {
  MdImageSearch,
  MdOutlineImageSearch,
  MdOutlineSmartToy,
  MdSmartToy,
} from "react-icons/md";
import { UserContext } from "@/context/UserContext/GlobalProvider";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();
  const { logoutUser } = useContext(UserContext);
  const handleProfileClick = () => {
    router.push("/profile");
  };


  const handleResearchExcellence = () => {
    router.push("/research-excellence");
  };

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  const handleLogout = () => {
    logoutUser();

    signOut({ callbackUrl: "http://localhost:3000/" });
  };

  return (
    <div className="ml-2 h-[98vh] fixed  flex flex-col items-center justify-between bg-blue-900 rounded-lg shadow-left">
      <div className="flex flex-col gap-y-12">
        <div>
          <img src="images/white-logo.png" alt="logo" className="h-20 w-32" />
        </div>
        <div className="flex flex-col items-center gap-y-10">
          {router.pathname === "/dashboard" ? (
            <Link href="/dashboard">
            <FaHouse
              className="h-6 w-6 text-white cursor-pointer"
            />
            </Link>
          ) : (
            <Link href="/dashboard">
            <PiHouse
              className="h-6 w-6 text-white cursor-pointer"
            />
            </Link>
          )}
          {router.pathname !== "/profile" ? (
            <IoPersonOutline
              className="h-6 w-6 text-white cursor-pointer"
              onClick={handleProfileClick}
            />
          ) : (
            <IoPerson
              className="h-6 w-6 text-white cursor-pointer"
              onClick={handleProfileClick}
            />
          )}
          {router.pathname !== "/research-gallery" ? (
            <Link href="/research-gallery">
              <MdOutlineImageSearch className="h-6 w-6 text-white cursor-pointer" />
            </Link>
          ) : (
            <MdImageSearch className="h-6 w-6 text-white cursor-pointer" />
          )}
          {router.pathname !== "/research-excellence" ? (
            <MdOutlineSmartToy className="h-6 w-6 text-white cursor-pointer"
            onClick={handleResearchExcellence}
            />
          ) : (
            <MdSmartToy
              className="h-6 w-6 text-white cursor-pointer"
            />
          )}
          {router.pathname !== "/settings" ? (
            <IoSettingsOutline className="h-6 w-6 text-white cursor-pointer"
            onClick={handleSettingsClick}

            />
          ) : (
            <IoSettings
              className="h-6 w-6 text-white cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="pb-6">
        <IoLogOutOutline
          className="h-7 w-7 text-white cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
