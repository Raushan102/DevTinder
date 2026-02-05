// Card.jsx - Premium Glassmorphism Card (Compact)
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../util/constent";
import { X, Heart } from "lucide-react";
import ErrorModal from "../util/ErrorModal";

function Card({ profile, onSwipe, isTopCard, unDoFeed }) {
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const handleStart = (clientX) => {
    if (!isTopCard) return;
    setStartX(clientX);
    setCurrentX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX) => {
    if (!isDragging || !isTopCard) return;
    setCurrentX(clientX);
  };

  const handleEnd = async () => {
    if (!isDragging) return;
    const diff = currentX - startX;

    if (Math.abs(diff) > 100) {
      if (diff > 0) {
        await handleRightSwipe();
      } else {
        await handleLeftSwipe();
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const handleRightSwipe = async () => {
    const previousState = profile;
    try {
      onSwipe("interested", profile._id);
      await axios.post(
        `${BASE_URL}/request/send/interested/${profile._id}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      setShowModal({
        open: true,
        errorMessage:
          error?.response?.data?.message ||
          `Something went wrong while sending connection request`,
      });
      unDoFeed(previousState);
    }
  };

  const handleLeftSwipe = async () => {
    const previousState = profile;

    try {
      onSwipe("ignored", profile._id);
      await axios.post(
        `${BASE_URL}/request/send/ignored/${profile._id}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      setShowModal({
        open: true,
        errorMessage:
          error?.response?.data?.message ||
          `Something went wrong while ignoring the profile`,
      });
      unDoFeed(previousState);
    }
  };

  const onMouseDown = (e) => handleStart(e.clientX);
  const onMouseMove = (e) => handleMove(e.clientX);
  const onTouchStart = (e) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    const handleGlobalUp = () => {
      if (isDragging) handleEnd();
    };

    window.addEventListener("mouseup", handleGlobalUp);
    window.addEventListener("touchend", handleGlobalUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [isDragging, currentX, startX]);

  const diff = currentX - startX;
  const rotation = diff / 25;

  return (
    <div
      ref={cardRef}
      style={{
        width: "100%",
        height: "100%",
        transform:
          isDragging && isTopCard
            ? `translateX(${diff}px) rotate(${rotation}deg) scale(1.02)`
            : "translateX(0) rotate(0) scale(1)",
        transition: isDragging
          ? "none"
          : "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      className={`relative overflow-hidden rounded shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 ${
        isTopCard
          ? "cursor-grab active:cursor-grabbing"
          : "opacity-60 pointer-events-none"
      }`}
    >
      {/* Swipe Indicators */}
      {isTopCard && isDragging && Math.abs(diff) > 30 && (
        <div
          className={`absolute inset-0 z-40 flex items-center justify-center backdrop-blur-md ${
            diff > 0 ? "bg-green-500/30" : "bg-red-500/30"
          }`}
        >
          <div
            className={`p-6 rounded-full ${
              diff > 0 ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {diff > 0 ? (
              <Heart size={32} className="text-white" fill="currentColor" />
            ) : (
              <X size={32} className="text-white" strokeWidth={3} />
            )}
          </div>
        </div>
      )}

      {/* Background Image - Fully Visible */}
      <div className="absolute inset-0 w-full h-full">
        {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt={profile.firstName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="text-6xl font-bold text-gray-400">
              {profile.firstName?.[0]}
              {profile.lastName?.[0]}
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70"></div>
      </div>

      {/* Glassmorphism Info Panel - Like Navbar/Footer */}
      <div className="absolute bottom-0 left-0 w-full z-30">
        <div className="backdrop-blur-xl bg-white/10 border-t border-white/20">
          <div className="p-4 space-y-2.5">

            {/* Name */}
            <h2 className="text-white text-xl font-bold tracking-tight drop-shadow-lg">
              {profile.firstName} {profile.lastName}
            </h2>

            {/* Profession */}
            {profile.profession && (
              <p className="text-white/90 text-sm font-medium">
                {profile.profession}
              </p>
            )}

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.skills.slice(0, 7).map((skill, i) => (
                  <div
                    key={i}
                    className="px-2.5 py-1 backdrop-blur-md bg-white/20 border border-white/30 rounded-full"
                  >
                    <span className="text-white text-xs font-semibold">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                className="px-5 py-2.5 backdrop-blur-md bg-red-600 hover:bg-red-700
                         border border-white/30
                         transition-all duration-300
                         hover:scale-105 active:scale-95
                         disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={isTopCard ? handleLeftSwipe : undefined}
                disabled={!isTopCard}
              >
                <X size={22} className="text-black mx-auto" strokeWidth={2.5} />
              </button>
              <button
                className="px-5 py-2.5 bg-white hover:bg-white/90
                         border border-white
                         transition-all duration-300 shadow-lg
                         hover:scale-105 active:scale-95
                         disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={isTopCard ? handleRightSwipe : undefined}
                disabled={!isTopCard}
              >
                <Heart
                  size={22}
                  className="text-red-600 mx-auto"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ErrorModal
        title="error"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
        redirect="/requests"
      />
    </div>
  );
}

export default Card;
