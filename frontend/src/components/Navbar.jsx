import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Flame, Compass, Users, UserCheck } from "lucide-react";
import axios from "axios";
import ThemeSwitcher from "./ThemeSwitcher";
import Avatar from "./Avatar";
import { BASE_URL } from "./constent";
import ErrorModal from "./ErrorModal";
import { addConnectionRequest } from "../util/ConnectionRequestSlice";


export default function Navbar() {
  const user = useSelector((store) => store.user);
  let requestCount=useSelector((store) => store.connectionRequests)

  const dispatcher = useDispatch();
  const lastFetchedUserIdRef = useRef(null);
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

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
    // Fetch if user exists AND (no previous fetch OR different user)
    if (user && user._id !== lastFetchedUserIdRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchAllConnectionRequest();
      lastFetchedUserIdRef.current = user._id;
    }

    // Reset when user logs out
    if (!user) {
      lastFetchedUserIdRef.current = null;
      dispatcher(addConnectionRequest([]));
    }
  }, [user]);

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
              to="/"
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
              className="font-bold text-xs uppercase tracking-widest rounded-xl relative"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <UserCheck size={18} />
                  {requestCount.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-secondary-content rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-black border-2 border-base-100 shadow-lg">
                      {requestCount.length > 99 ? "99+" : requestCount.length}
                    </span>
                  )}
                </div>
                <span>Requests</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <ThemeSwitcher />
        <Avatar />
      </div>

      <ErrorModal
        title="Unauthorized"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
      />
    </div>
  );
}
