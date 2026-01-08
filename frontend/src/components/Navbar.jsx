import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Flame, Compass, Users, UserCheck, Bell } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import Avatar from "./Avatar";

export default function Navbar() {
  const user = useSelector((store) => store.user);
  // Assuming you have requests in your store, otherwise hardcode for now
  const requestCount = 2;

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 border-b border-base-300/50 shadow-sm">
      <div className="navbar-start">
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <div className="p-2 bg-primary/10 rounded-lg">
            <Flame className="text-primary" size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic hidden sm:block">
            Dev<span className="text-primary">Tinder</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-2">
          <li>
            <Link
              to="/feed"
              className="font-bold text-xs uppercase tracking-widest rounded-xl"
            >
              <Compass size={16} /> Feed
            </Link>
          </li>
          <li>
            <Link
              to="/connections"
              className="font-bold text-xs uppercase tracking-widest rounded-xl"
            >
              <Users size={16} /> Connections
            </Link>
          </li>
          <li>
            <Link
              to="/requests"
              className="font-bold text-xs uppercase tracking-widest rounded-xl"
            >
              <div className="indicator">
                <span className="indicator-item badge badge-secondary badge-sm border-2 border-base-100 font-black h-5 w-5 p-0 text-[10px]">
                  {requestCount}
                </span>
                <UserCheck size={18} />
              </div>
              <span className="ml-1">Requests</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <ThemeSwitcher />

        <Avatar />
      </div>
    </div>
  );
}
