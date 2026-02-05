// Body.jsx - Main Layout with Mobile Chat Support
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../../store/userSlice";
import { BASE_URL } from "../util/constent";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ErrorModal from "../util/ErrorModal";
import GlassmorphismLayout from "../util/Glassmorphismlayout";

function Body() {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState({ open: false, errorMessage: null });
  const [hideNavbar, setHideNavbar] = useState(false);

  // ============================
  // 📱 DETECT MOBILE CHAT VIEW
  // ============================
  useEffect(() => {
    // Hide navbar on mobile when on connections page
    const isMobile = window.innerWidth < 640; // sm breakpoint
    const isConnectionsPage = location.pathname === '/connections';

    if (isMobile && isConnectionsPage) {
      // Listen for custom event from Connections component
      const handleChatOpen = (e) => {
        setHideNavbar(e.detail.showChat);
      };

      window.addEventListener('chatWindowToggle', handleChatOpen);
      return () => window.removeEventListener('chatWindowToggle', handleChatOpen);
    }
  }, [location.pathname]);

  // ============================
  // 📥 FETCH USER
  // ============================
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      dispatch(addUser(res.data.data));
    } catch (error) {
      if (error.response?.status === 401) return navigate("/login");
      setShowModal({ open: true, errorMessage: error.response?.data?.message });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!userData) fetchUser();
  }, []);

  return (
    <GlassmorphismLayout
      backgroundImage="/assets/hero-bg.jpg"
      mobileBackgroundImage="/assets/c1.jpg"
      overlayStyle="dark"
      loaderDuration={1500}
      showShutterEffect={true}
    >
      {/* ============================
          NAVBAR - Hidden on mobile chat
          ============================ */}
      {!hideNavbar && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}

      {/* ============================
          MAIN CONTENT
          ============================ */}
      <main className="h-auto lg:min-h-screen">
        <Outlet context={{ setHideNavbar }} />
      </main>

      {/* ============================
          FOOTER - Hidden on mobile chat
          ============================ */}
      {!hideNavbar && (
        <Footer />
      )}

      {/* ============================
          ERROR MODAL
          ============================ */}
      <ErrorModal
        isOpen={showModal.open}
        message={showModal.errorMessage}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
      />
    </GlassmorphismLayout>
  );
}

export default Body;
