import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFirePreset } from "tsparticles-preset-fire";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../util/constent";
import { addUser } from "../../store/userSlice";
import ErrorModal from "../util/ErrorModal";


const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      if (res) {
        navigate("/feed");
      }

      dispatch(addUser(res.data.data));
    } catch (error) {
      if (error.response?.status === 401) {
        return;
      }

      setShowModal({
        open: true,
        errorMessage: error.response?.data?.message,
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUser();
  });
  const particlesInit = useCallback(async (engine) => {
    await loadFirePreset(engine);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* 🔥 Fire Background */}
      <Particles
        id="fire"
        init={particlesInit}
        options={{
          preset: "fire",
          fullScreen: { enable: true, zIndex: 0 },
          background: { color: "#000000" },
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6">
        {/* Logo */}
        <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mb-3">
          🔥 DevTinder
        </h2>

        {/* Main Heading */}
        <h1
          className="font-bold text-white leading-tight
                       text-3xl sm:text-4xl md:text-6xl"
        >
          Stop Committing Alone.
          <br className="hidden sm:block" />
          Build Together.
        </h1>

        {/* Description */}
        <p
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg
                      text-gray-300 max-w-md sm:max-w-xl md:max-w-2xl"
        >
          Explore the exciting world of developers. Connect with like-minded
          builders, collaborate on projects, and grow together — not alone.
        </p>

        {/* Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            className="btn btn-error w-full sm:btn-wide"
            onClick={() => navigate("/signUp")}
          >
            Create Account
          </button>

          <button
            className="btn btn-outline w-full sm:btn-wide text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        {/* Tagline */}
        <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-gray-400">
          Connect • Collaborate • Code
        </p>
      </div>

      <ErrorModal
        title="Error"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
        redirect="/login"
      />
    </div>
  );
};

export default LandingPage;
