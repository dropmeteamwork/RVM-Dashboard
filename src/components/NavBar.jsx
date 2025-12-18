// src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import dropmeLogo from "../assets/images/dropme-logo.png";
import SvgIcon from "./SvgIcon";
import {NavLink, useNavigate } from "react-router";

export default function NavBar() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();

      const dateOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };

      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const formattedDate = today.toLocaleDateString("en-US", dateOptions);
      const formattedTime = today.toLocaleTimeString("en-US", timeOptions);

      setCurrentDateTime(`${formattedDate}, ${formattedTime}`);
    };

    updateDateTime();

    // const intervalId = setInterval(updateDateTime, 60 * 1000);
    // return () => clearInterval(intervalId);
  }, []);

  const iconPaths = {
    refresh:
      "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
    export:
      "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3",
    alerts:
      "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0",
    privacy:
      "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    login:
      "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9",
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 navbar bg-base-100 shadow-sm px-4 z-50">
        <div className="flex-1 flex items-center gap-4">
          <img src={dropmeLogo} alt="dropme logo" className="w-24 md:w-32" />
          <span className="hidden lg:block text-sm lg:text-base text-gray-600">
            {currentDateTime}
          </span>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 flex flex-nowrap items-center">
            {/* Refresh Button */}
            <li>
              <button className="btn btn-ghost font-normal flex items-center gap-2">
                <SvgIcon
                  pathD={iconPaths.refresh}
                  className="size-4 md:size-5"
                />
                <span className="hidden md:inline text-sm md:text-base">
                  {" "}
                  Refresh
                </span>
              </button>
            </li>

            {/* Export Button */}
            <li>
              <button className="btn btn-ghost font-normal flex items-center gap-2">
                <SvgIcon
                  pathD={iconPaths.export}
                  className="size-4 md:size-5"
                />
                <span className="hidden md:inline text-sm md:text-base">
                  Export
                </span>
              </button>
            </li>

            {/* Privacy Button */}
            <li>
              <NavLink to="https://privacy-policy-seven-azure.vercel.app/" className="hover:bg-transparent">
              <button className="btn btn-ghost font-normal flex items-center gap-2">
                <SvgIcon
                  pathD={iconPaths.privacy}
                  className="size-4 md:size-5"
                />
                <span className="hidden md:inline text-sm md:text-base">
                  Privacy
                </span>
              </button>
              </NavLink>
            </li>

            {/* Login Button */}
            <li>
              <button onClick={()=>navigate("/")} className="btn btn-ghost font-normal flex items-center gap-2">
                <SvgIcon pathD={iconPaths.login} className="size-4 md:size-5" />
                <span className="hidden md:inline text-sm md:text-base">
                  Login
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
