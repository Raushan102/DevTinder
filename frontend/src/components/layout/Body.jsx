// Body.jsx - Main Layout with Integrated Loader & Background
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

  // 📱 DETECT MOBILE CHAT VIEW
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const isConnectionsPage = location.pathname === '/connections';

    if (isMobile && isConnectionsPage) {
      const handleChatOpen = (e) => setHideNavbar(e.detail.showChat);
      window.addEventListener('chatWindowToggle', handleChatOpen);
      return () => window.removeEventListener('chatWindowToggle', handleChatOpen);
    } else {
      setHideNavbar(false); // Reset when navigating away
    }
  }, [location.pathname]);

  // 📥 FETCH USER
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
    if (!userData) fetchUser();
  }, []);

  return (
    /* 🛠️ KEY={LOCATION.KEY} is crucial here.
       It resets the GlassmorphismLayout state (and the loader)
       whenever the URL changes.
    */
    <GlassmorphismLayout
      key={location.key}
      backgroundImage="assets/hero-bg.jpg"
      mobileBackgroundImage="assets/c1.jpg"
      overlayStyle="editorial"
      loaderDuration={1200}
      showShutterEffect={true}
    >
      <div className="flex flex-col min-h-screen">
        {/* NAVBAR */}
        {!hideNavbar && (
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow">
          <Outlet context={{ setHideNavbar }} />
        </main>

        {/* FOOTER */}
        {!hideNavbar && <Footer />}

        {/* MODALS */}
        <ErrorModal
          isOpen={showModal.open}
          message={showModal.errorMessage}
          onClose={() => setShowModal({ open: false, errorMessage: null })}
        />
      </div>
    </GlassmorphismLayout>
  );
}

export default Body;
