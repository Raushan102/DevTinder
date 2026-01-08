import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, Users, LogOut, ChevronDown } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "./constent";
import ErrorModal from "./ErrorModal";
import { useState } from "react";
import { removeUser } from "../util/userSlice";

function Avatar() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  async function handleLogOut() {
    console.log("logout ");

    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);

      setShowModal({
        open: true,
        errorMessage: error.response.data.message,
      });
    }
  }

  if (!user) return null;

  return (
    <div className="dropdown dropdown-end">
      {/* TRIGGER BUTTON */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost flex items-center gap-2 px-2 rounded-2xl hover:bg-primary/5 transition-all"
      >
        <div className="avatar">
          <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
            <img alt="User avatar" src={user.photoUrl} />
          </div>
        </div>
        <ChevronDown size={14} className="opacity-50 hidden sm:block" />
      </div>

      {/* DROPDOWN MENU */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-md rounded-2xl z-[50] mt-4 w-64 p-3 shadow-2xl border border-base-300/50"
      >
        {/* USER INFO HEADER */}
        <li className="mb-2 p-2 bg-base-200/50 rounded-xl">
          <div className="flex flex-col gap-0 pointer-events-none">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
              Logged in as
            </span>
            <span className="font-bold text-primary truncate">
              {user.firstName} {user.lastName}
            </span>
          </div>
        </li>

        {/* LINKS */}
        <li>
          <Link
            to="/profile"
            className="py-3 rounded-xl gap-3 flex items-center hover:bg-primary/10 active:bg-primary/20"
          >
            <User size={18} className="text-primary" />
            <span className="font-semibold">My Profile</span>
            <span className="badge badge-secondary badge-sm ml-auto font-bold uppercase text-[9px]">
              New
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/connections"
            className="py-3 rounded-xl gap-3 flex items-center"
          >
            <Users size={18} className="text-secondary" />
            <span className="font-semibold">Connections</span>
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className="py-3 rounded-xl gap-3 flex items-center"
          >
            <Settings size={18} className="opacity-70" />
            <span className="font-semibold">Account Settings</span>
          </Link>
        </li>

        <div className="divider my-2 opacity-50"></div>

        {/* LOGOUT */}
        <li>
          <Link
            onClick={handleLogOut}
            className="py-3 rounded-xl gap-3 flex items-center text-error hover:bg-error/10"
          >
            <LogOut size={18} />
            <span className="font-bold uppercase tracking-widest text-[11px]">
              Logout
            </span>
          </Link>
        </li>
      </ul>
      <ErrorModal
        title="error"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
        redirect="/login"
      />
    </div>
  );
}

export default Avatar;
