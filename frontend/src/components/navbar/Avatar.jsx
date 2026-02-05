import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, Users, LogOut, ChevronDown, Shield } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../util/constent";
import ErrorModal from "../util/ErrorModal";
import { removeUser } from "../../store/userSlice";

function Avatar() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState({ open: false, errorMessage: null });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function handleLogOut() {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      setShowModal({ open: true, errorMessage: error.response?.data?.message || "Logout failed" });
    }
  }

  if (!user) return null;

  return (
    <div className="relative">
      {/* 🔘 TRIGGER: EDITORIAL STYLE */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3 group px-2 py-1 transition-all"
      >
        <div className="relative">
          <div className={`w-10 h-10 border-2 transition-all duration-300 overflow-hidden ${dropdownOpen ? 'border-black scale-105 shadow-xl' : 'border-black/20 shadow-sm'}`}>
            <img
              alt="User"
              src={user.photoUrl}
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-black border border-white rounded-full"></div>
        </div>
        <ChevronDown
          size={14}
          className={`text-black transition-transform duration-500 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* 🧊 GLASS DROPDOWN */}
      {dropdownOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />

          <div
            className="absolute right-0 mt-4 w-72 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
              animation: 'dropdownFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* USER PROFILE HEADER */}
            <div className="px-6 py-6 border-b border-black/5 bg-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={10} className="text-black" />
                <span className="text-[9px] font-black tracking-[0.3em] text-black/40 uppercase">Verified Member</span>
              </div>
              <p className="text-lg font-black text-black uppercase tracking-tighter leading-none">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] font-bold text-black/50 truncate mt-1 tracking-widest uppercase">
                {user.email}
              </p>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="p-2">
              {[
                { to: "/profile", icon: <User size={16} />, label: "Profile", badge: "Live" },
                { to: "/connections", icon: <Users size={16} />, label: "Network" },
                { to: "/settings", icon: <Settings size={16} />, label: "Settings" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 text-black hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ml-auto text-[7px] font-black px-1.5 py-0.5 border border-black group-hover:border-white transition-colors">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* LOGOUT ACTION */}
            <div className="p-2 border-t border-black/5 bg-black/5">
              <button
                onClick={() => {
                  handleLogOut();
                  setDropdownOpen(false);
                }}
                className="w-full flex items-center gap-4 px-4 py-4 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                <LogOut size={16} strokeWidth={3} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                  Terminate Session
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      <ErrorModal
        title="Session Error"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
        redirect="/login"
      />

      <style>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(15px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default Avatar;
