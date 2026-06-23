import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";
import { UserButton } from "@clerk/react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-8xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to={"/"}
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-primary-content to-primary flex items-center justify-center shadow-lg">
            <SparklesIcon className="size-6 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-xl bg-gradient-to-r from-primary to-primary-content bg-clip-text text-transparent font-serif tracking-wider">
              Coding Interview
            </span>

            <span className="text-xs text-base-content/80 font-medium -mt-0.5">
              Let's code together
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {/* PROBLEM PAGE LINK */}
          <Link
            to={"/problems"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive("/problems") ? "bg-primary/70 text-base-200 hover:bg-primary/85" : "hover:bg-base-200 text-base-content/70 hover:text-base-content"}`}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Problems</span>
            </div>
          </Link>

          {/* DASHBOARD PAGE LINK */}
          <Link
            to={"/dashboard"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard") ? "bg-primary-content" : "hover:bg-base-200 text-base-content/70 hover:text-base-content"}`}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Dashboard</span>
            </div>
          </Link>
          <div className="ml-4">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
