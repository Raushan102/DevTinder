// Navbar.jsx - Fashion Editorial Glassmorphism Design
// Features: Premium glass effect, refined spacing, responsive white/black text
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Flame, Compass, Users, UserCheck, Menu, X } from "lucide-react";
import axios from "axios";
import ThemeSwitcher from "../util/ThemeSwitcher";
import Avatar from "./Avatar";
import { BASE_URL } from "../util/constent";
import ErrorModal from "../util/ErrorModal";
import { addConnectionRequest } from "../../store/ConnectionRequestSlice";

export default function Navbar() {
  const user = useSelector((store) => store.user);
  let requestCount = useSelector((store) => store.connectionRequests);

  const dispatcher = useDispatch();
  const lastFetchedUserIdRef = useRef(null);
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function fetchAllConnectionRequest() {
    try {
      const connectionRequest = await axios.get(
        `${BASE_URL}/user/requests/receive`,
        { withCredentials: true }
      );

      if (connectionRequest?.data?.data) {
        dispatcher(addConnectionRequest(connectionRequest.data.data));
      }
    } catch (error) {
      setShowModal({
        open: true,
        errorMessage:
          error?.data?.message || "Error while fetching the connection request",
      });
    }
  }

  useEffect(() => {
    if (user && user._id !== lastFetchedUserIdRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchAllConnectionRequest();
      lastFetchedUserIdRef.current = user._id;
    }

    if (!user) {
      lastFetchedUserIdRef.current = null;
      dispatcher(addConnectionRequest([]));
    }
  }, [user]);

  return (
    <>
      {/* ========================================
          NAVBAR - Glassmorphism with premium blur
          ======================================== */}
      <nav className="sticky top-0 z-50 sm:px-6 md:px-8 sm:py-4">
        <div
          className="w-full backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
          }}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">

            {/* ========================================
                LOGO SECTION
                ======================================== */}
            <Link
              to="/feed"
              className="flex items-center gap-2 sm:gap-2.5 group"
            >
              <div className="text-xl sm:text-2xl transition-transform group-hover:scale-110">
                🔥
              </div>
              <h1 className="text-white sm:text-black text-xl sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] font-bold uppercase drop-shadow-lg">
                DEVTINDER
              </h1>
            </Link>

            {/* ========================================
                DESKTOP NAVIGATION
                ======================================== */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/feed"
                className="px-5 py-2.5 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold
                         transition-all duration-300 hover:bg-white/30 backdrop-blur-sm
                         flex items-center gap-2"
              >
                <Compass size={14} strokeWidth={2.5} />
                <span>Feed</span>
              </Link>

              <Link
                to="/connections"
                className="px-5 py-2.5 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold
                         transition-all duration-300 hover:bg-white/30 backdrop-blur-sm
                         flex items-center gap-2"
              >
                <Users size={14} strokeWidth={2.5} />
                <span>Connections</span>
              </Link>

              <Link
                to="/requests"
                className="px-5 py-2.5 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold
                         transition-all duration-300 hover:bg-white/30 backdrop-blur-sm
                         flex items-center gap-2 relative"
              >
                <div className="relative">
                  <UserCheck size={14} strokeWidth={2.5} />
                  {requestCount.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white rounded-full h-4 w-4 flex items-center justify-center text-[8px] font-black shadow-lg">
                      {requestCount.length > 99 ? "99" : requestCount.length}
                    </span>
                  )}
                </div>
                <span>Requests</span>
              </Link>
            </div>

            {/* ========================================
                RIGHT SECTION - Theme + Avatar + Mobile Menu
                ======================================== */}
            <div className="flex items-center gap-2 sm:gap-3">

              <Avatar />

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 text-white sm:text-black hover:bg-white/30 transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ========================================
          MOBILE MENU DROPDOWN - Glassmorphism
          ======================================== */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden sticky top-20 z-40 mx-4 mb-4 backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/feed"
              className="block px-4 py-3 text-white sm:text-black text-xs uppercase tracking-[0.15em] font-bold
                       hover:bg-white/30 backdrop-blur-sm transition-all
                       flex items-center gap-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Compass size={16} strokeWidth={2.5} />
              <span>Feed</span>
            </Link>

            <Link
              to="/connections"
              className="block px-4 py-3 text-white sm:text-black text-xs uppercase tracking-[0.15em] font-bold
                       hover:bg-white/30 backdrop-blur-sm transition-all
                       flex items-center gap-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users size={16} strokeWidth={2.5} />
              <span>Connections</span>
            </Link>

            <Link
              to="/requests"
              className="block px-4 py-3 text-white sm:text-black text-xs uppercase tracking-[0.15em] font-bold
                       hover:bg-white/30 backdrop-blur-sm transition-all
                       flex items-center gap-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative">
                <UserCheck size={16} strokeWidth={2.5} />
                {requestCount.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white rounded-full h-4 w-4 flex items-center justify-center text-[8px] font-black shadow-lg">
                    {requestCount.length > 99 ? "99" : requestCount.length}
                  </span>
                )}
              </div>
              <span>Requests</span>
            </Link>
          </div>
        </div>
      )}

      {/* ========================================
          ERROR MODAL
          ======================================== */}
      <ErrorModal
        title="Unauthorized"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
      />

      {/* ========================================
          ANIMATIONS
          ======================================== */}
      <style>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
