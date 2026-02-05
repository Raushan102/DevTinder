import ConnectionList from "./ConnectionList";
import ChartWindow from "./ChartWindow";
import ErrorModal from "../util/ErrorModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../util/constent";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../store/ConnectionsLayer";
import Loader from "../util/Loader";
import GlassmorphismLayout from "../util/Glassmorphismlayout";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  // ============================
  // 📱 STATE FOR MOBILE VIEW
  // ============================
  const [currentChatProfile, setCurrentChatProfile] = useState();
  const [showChatWindow, setShowChatWindow] = useState(false);

  // ============================
  // 📥 FETCH CONNECTIONS
  // ============================
  async function fetchConnections() {
    try {
      setLoading(true);
      const profiles = await axios(`${BASE_URL}/request/connectedDeveloper`, {
        withCredentials: true,
      });

      // Set first profile as default for desktop
      if (profiles.data.data.length > 0) {
        handleChartProfileClick(profiles.data.data[0]);
      }

      dispatch(addConnections(profiles.data.data));
    } catch (error) {
      setShowModal({
        open: true,
        errorMessage:
          error?.data?.message ||
          `Something went wrong while fetching the connections request`,
      });
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // 👆 HANDLE PROFILE CLICK
  // ============================
  function handleChartProfileClick(profile) {
    setCurrentChatProfile(profile);
    setShowChatWindow(true);

    // Emit custom event to hide navbar on mobile
    if (window.innerWidth < 640) {
      window.dispatchEvent(new CustomEvent('chatWindowToggle', {
        detail: { showChat: true }
      }));
    }
  }

  // ============================
  // 🔙 BACK TO CONNECTION LIST (Mobile)
  // ============================
  function handleBackToList() {
    setShowChatWindow(false);

    // Emit custom event to show navbar on mobile
    if (window.innerWidth < 640) {
      window.dispatchEvent(new CustomEvent('chatWindowToggle', {
        detail: { showChat: false }
      }));
    }
  }

  // ============================
  // 🚀 INITIAL FETCH
  // ============================
  useEffect(() => {
    fetchConnections();
  }, [user]);

  return (
    <GlassmorphismLayout
      backgroundImage="/assets/hero-bg.jpg"
      mobileBackgroundImage="/assets/c1.jpg"
      overlayStyle="editorial"
      loaderDuration={1000}
      showShutterEffect={true}
    >
      <main
        className={`
          w-full h-[85vh] flex overflow-hidden gap-0 sm:px-6 md:px-8
          ${showChatWindow ? 'sm:h-[87vh]' : 'sm:h-[87vh]'}
        `}
        style={{
          maxHeight: '88vh',
        }}
      >
        {/* ============================
            📋 CONNECTION LIST SIDEBAR
            - Hidden on mobile when chat is open
            - Always visible on desktop (sm and above)
            ============================ */}
        <aside
          className={`
            w-full sm:w-72 lg:w-80
            backdrop-blur-xl bg-white/10 border-r border-white/20
            h-full shadow-2xl overflow-y-auto
            transition-all duration-300 ease-out
            flex flex-col flex-shrink-0
            ${showChatWindow ? 'hidden sm:flex' : 'flex'}
          `}
          style={{
            opacity: 1,
          }}
        >
          <ConnectionList
            profiles={connections}
            loading={loading}
            onSelectprofile={handleChartProfileClick}
            currentChatProfile={currentChatProfile}
          />
        </aside>

        {/* ============================
            💬 CHAT WINDOW SECTION
            - Full screen on mobile when profile is selected
            - Alongside sidebar on desktop (sm and above)
            ============================ */}
        <section
          className={`
            flex-1 backdrop-blur-xl bg-white/5
            h-full
            transition-all duration-300 ease-out
            flex flex-col flex-shrink-0 min-w-0
            ${showChatWindow ? 'fixed sm:relative inset-0 sm:inset-auto w-full sm:w-auto z-50 sm:z-auto' : 'hidden sm:flex'}
          `}
          style={{
            opacity: 1,
          }}
        >
          {loading && <Loader />}

          {connections.length > 0 && currentChatProfile && (
            <ChartWindow
              currentChatProfile={currentChatProfile}
              connections={true}
              loading={loading}
              onBack={handleBackToList}
            />
          )}
        </section>

        {/* ============================
            ⚠️ ERROR MODAL
            ============================ */}
        <ErrorModal
          title="error"
          message={showModal.errorMessage}
          type="error"
          isOpen={showModal.open}
          onClose={() => setShowModal({ open: false, errorMessage: null })}
          redirect="/requests"
        />
      </main>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(251, 146, 60, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.7);
        }
      `}</style>
    </GlassmorphismLayout>
  );
}

export default Connections;
