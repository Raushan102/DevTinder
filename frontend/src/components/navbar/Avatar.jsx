import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, Users, LogOut, ChevronDown, Crown, ShieldCheck } from "lucide-react";
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

  const isPremium = user?.isPremium;

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
      {/* 🔘 TRIGGER */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 group p-1 transition-all"
      >
        <div className="relative">
          <div className={`w-10 h-10 border transition-all duration-300 overflow-hidden rounded-[8px]
            ${isPremium ? 'border-amber-500 shadow-lg shadow-amber-500/20' : 'border-white/20'}`}>
            <img alt="User" src={user.photoUrl} className="w-full h-full object-cover" />
          </div>
          {isPremium && (
            <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-0.5 border border-black shadow-sm">
              <Crown size={8} className="text-black" />
            </div>
          )}
        </div>
        <ChevronDown
          size={14}
          className={`text-black transition-transform duration-500 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* 🧊 GLASS DROPDOWN + CLICK OUTSIDE */}
      {dropdownOpen && (
        <>
          {/* 🛠️ THE CLICK OUTSIDE OVERLAY */}
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setDropdownOpen(false)}
          />

          <div
            className="absolute right-0 mt-4 w-72 backdrop-blur-xl bg-white/95 md:bg-white/40 border border-black/10 md:border-white/30 rounded-[8px] shadow-2xl z-50 overflow-hidden text-black"
            style={{
              animation: 'dropdownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* HEADER - MATCHING SUCCESS CARD STYLE */}
            <div className="px-6 py-6 border-b border-white/10">
              <div className="flex items-center gap-2 mb-2">
                {isPremium ? (
                  <span className="text-[8px] font-black tracking-[0.2em] text-amber-500 uppercase">Elite Member</span>
                ) : (
                  <div className="flex items-center gap-1 opacity-40">
                    <ShieldCheck size={10} className="text-black" />
                    <span className="text-[9px] font-black tracking-[0.3em] text-black uppercase">Verified</span>
                  </div>
                )}
              </div>
              <p className="text-lg font-black text-black uppercase tracking-tighter leading-none">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] font-bold text-black/50 truncate mt-2 tracking-widest uppercase">
                {user.email}
              </p>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="p-1.5">
              {[
                { to: "/profile", icon: <User size={16} />, label: "Profile" },
                { to: "/connections", icon: <Users size={16} />, label: "Network" },
                { to: "/settings", icon: <Settings size={16} />, label: "Settings" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 text-black hover:bg-black/10 transition-all duration-200 rounded-[4px] group"
                >
                  <span className="opacity-40 group-hover:opacity-100">{item.icon}</span>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* LOGOUT */}
            <div className="p-1.5 border-t border-white/10">
              <button
                onClick={() => {
                  handleLogOut();
                  setDropdownOpen(false);
                }}
                className="w-full flex items-center gap-4 px-4 py-4 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-200 rounded-[4px]"
              >
                <LogOut size={16} strokeWidth={3} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                  Terminate
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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Avatar;
