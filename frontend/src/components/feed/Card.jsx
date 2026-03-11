// Card.jsx - Premium Glassmorphism Card (Compact)
import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../util/constent";
import { X, Heart, Crown, CheckCircle } from "lucide-react";
import ErrorModal from "../util/ErrorModal";

function Card({ profile, onSwipe, isTopCard, unDoFeed }) {
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null); // 'horizontal', 'vertical', or null
  const cardRef = useRef(null);

  const handleStart = (clientX, clientY) => {
    if (!isTopCard) return;
    setStartX(clientX);
    setStartY(clientY || 0);
    setCurrentX(clientX);
    setIsDragging(true);
    setDragDirection(null);
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging || !isTopCard) return;

    if (dragDirection === "vertical") return;

    if (!dragDirection && clientY !== undefined) {
      const dx = Math.abs(clientX - startX);
      const dy = Math.abs(clientY - startY);

      if (dy > 10 && dy > dx) {
        setDragDirection("vertical");
        return;
      } else if (dx > 10) {
        setDragDirection("horizontal");
      } else {
        return; // Wait for more movement
      }
    }

    setCurrentX(clientX);
  };

  const handleRightSwipe = useCallback(async () => {
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
  }, [profile, onSwipe, unDoFeed]);

  const handleLeftSwipe = useCallback(async () => {
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
  }, [profile, onSwipe, unDoFeed]);

  const handleEnd = useCallback(async () => {
    if (!isDragging) return;

    if (dragDirection === "horizontal") {
      const diff = currentX - startX;
      if (Math.abs(diff) > 100) {
        if (diff > 0) {
          await handleRightSwipe();
        } else {
          await handleLeftSwipe();
        }
      }
    }

    setIsDragging(false);
    setStartX(0);
    setStartY(0);
    setCurrentX(0);
    setDragDirection(null);
  }, [isDragging, dragDirection, currentX, startX, handleRightSwipe, handleLeftSwipe]);

  const onMouseDown = (e) => handleStart(e.clientX, e.clientY);
  const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
  const onTouchStart = (e) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY);

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
  }, [isDragging, currentX, startX, handleEnd]);

  const diff = currentX - startX;
  const rotation = diff / 25;

  return (
    <div
      ref={cardRef}
      style={{
        width: "100%",
        height: "100%",
        transform:
          isDragging && isTopCard && dragDirection === "horizontal"
            ? `translateX(${diff}px) rotate(${rotation}deg) scale(1.02)`
            : "translateX(0) rotate(0) scale(1)",
        transition: isDragging && dragDirection === "horizontal"
          ? "none"
          : "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        touchAction: "pan-y",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${isTopCard ? "cursor-grab active:cursor-grabbing" : "opacity-60 pointer-events-none"
        }`}
    >
      {/* --- ULTRA PREMIUM ANIMATED BORDER --- */}
      {profile.isPremium && (
        <div className="absolute -inset-[2px] z-0">
          <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,#fbbf24_50%,transparent_70%,transparent_100%)] animate-[spin_3s_linear_infinite]"></div>
          <div className="absolute inset-[2px] bg-black rounded-2xl z-10"></div>
        </div>
      )}

      {/* --- MAIN CARD CONTENT --- */}
      <div className={`relative z-10 w-full h-full overflow-hidden rounded-2xl border backdrop-blur-xl flex flex-col ${profile.isPremium
        ? "border-amber-500/30 bg-black/40 shadow-[0_0_40px_rgba(245,158,11,0.2)]"
        : "border-white/20 bg-white/10 shadow-2xl"
        }`}>

        {/* Swipe Indicators */}
        {isTopCard && isDragging && dragDirection === "horizontal" && Math.abs(diff) > 30 && (
          <div className={`absolute inset-0 z-40 flex items-center justify-center backdrop-blur-md ${diff > 0 ? "bg-green-500/30" : "bg-red-500/30"}`}>
            <div className={`p-6 rounded-full ${diff > 0 ? "bg-green-500" : "bg-red-500"}`}>
              {diff > 0 ? <Heart size={32} className="text-white" fill="currentColor" /> : <X size={32} className="text-white" strokeWidth={3} />}
            </div>
          </div>
        )}

        {/* VIP Premium Badge */}
        {profile.isPremium && (
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full
                        bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600
                        shadow-[0_0_20px_rgba(245,158,11,0.6)] border border-white/40
                        animate-[pulse_2s_infinite]">
            <Crown size={18} className="text-white fill-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">VIP Premium</span>
            <div className="flex gap-0.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Image Section */}
        <div className="absolute inset-0 w-full h-full">
          {profile.photoUrl ? (
            <img src={profile.photoUrl} alt={profile.firstName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-6xl font-bold text-white/20">
              {profile.firstName?.[0]}{profile.lastName?.[0]}
            </div>
          )}

          {/* Overlays */}
          <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 ${profile.isPremium ? 'mix-blend-overlay' : ''}`}></div>

          {profile.isPremium && (
            <>
              {/* Golden Aura */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.2),transparent_70%)] pointer-events-none"></div>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-200%] animate-[shimmer_5s_infinite]"></div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Info Panel */}
        <div className="absolute bottom-0 left-0 w-full z-30">
          <div className="p-5 pt-10 bg-gradient-to-t from-black via-black/60 to-transparent backdrop-blur-[2px]">
            <div className="space-y-4">
              <div>
                <h2 className={`text-2xl font-black tracking-tight drop-shadow-2xl ${profile.isPremium ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-200' : 'text-white'}`}>
                  {profile.firstName} {profile.lastName}
                </h2>
                {profile.profession && <p className="text-white/80 text-sm font-bold mt-1 tracking-wide uppercase italic">{profile.profession}</p>}
              </div>

              {profile.skills && profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.slice(0, 5).map((skill, i) => (
                    <div key={i} className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${profile.isPremium ? 'bg-amber-500/20 border-amber-500/40 text-amber-200' : 'bg-white/10 border-white/20 text-white'}`}>
                      {skill}
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={isTopCard ? handleLeftSwipe : undefined}
                  disabled={!isTopCard}
                  className="flex-1 py-3 rounded-2xl bg-white/10 border border-white/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all active:scale-95 group"
                >
                  <X size={24} className="mx-auto text-white group-hover:text-red-400 transition-colors" />
                </button>
                <button
                  onClick={isTopCard ? handleRightSwipe : undefined}
                  disabled={!isTopCard}
                  className={`flex-[2] py-3 rounded-2xl border transition-all active:scale-95 flex items-center justify-center gap-2 group ${profile.isPremium ? 'bg-gradient-to-r from-amber-500 to-yellow-600 border-white/40 shadow-lg shadow-amber-500/20' : 'bg-white border-white'}`}
                >
                  <Heart size={20} className={`${profile.isPremium ? 'text-white' : 'text-red-600'} group-hover:scale-110 transition-transform`} fill="currentColor" />
                  <span className={`text-xs font-black uppercase tracking-widest ${profile.isPremium ? 'text-white' : 'text-black'}`}>Interested</span>
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

        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-150%) skewX(-12deg); }
            30% { transform: translateX(150%) skewX(-12deg); }
            100% { transform: translateX(150%) skewX(-12deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Card;
