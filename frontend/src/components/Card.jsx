import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./constent";
import {
  X,
  Heart,
  MapPin,
  Terminal,
  Briefcase,
} from "lucide-react";

function Card({ profile, onSwipe, isTopCard }) {
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

    if (Math.abs(diff) > 130) {
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
    try {
      await axios.post(
        `${BASE_URL}/request/send/interested/${profile._id}`,
        {},
        { withCredentials: true }
      );
      onSwipe("interested", profile._id);
    } catch (error) {
      console.error("Right swipe error:", error);
      onSwipe("interested", profile._id);
    }
  };

  const handleLeftSwipe = async () => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/ignored/${profile._id}`,
        {},
        { withCredentials: true }
      );
      onSwipe("ignored", profile._id);
    } catch (error) {
      console.error("Left swipe error:", error);
      onSwipe("ignored", profile._id);
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
  const rotation = diff / 22;

  return (
    <div
      ref={cardRef}
      style={{
        width: '380px',
        height: '640px',
        transform:
          isDragging && isTopCard
            ? `translateX(${diff}px) rotate(${rotation}deg) scale(1.05)`
            : "translateX(0) rotate(0) scale(1)",
        transition: isDragging ? "none" : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      className={`relative bg-base-300 rounded-[2.5rem] overflow-hidden border border-base-content/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] ${
        isTopCard
          ? "cursor-grab active:cursor-grabbing"
          : "blur-md brightness-75 pointer-events-none"
      }`}
    >
      {/* SWIPE INDICATORS */}
      {isTopCard && isDragging && Math.abs(diff) > 30 && (
        <div
          className={`absolute inset-0 z-40 flex items-center justify-center transition-all ${
            diff > 0 ? "bg-success/20" : "bg-error/20"
          }`}
        >
          <div
            className={`p-8 rounded-full border-4 border-white shadow-2xl animate-bounce text-white ${
              diff > 0 ? "bg-success" : "bg-error"
            }`}
          >
            {diff > 0 ? (
              <Heart size={48} fill="currentColor" />
            ) : (
              <X size={48} />
            )}
          </div>
        </div>
      )}

      {/* VISUAL LAYER */}
      <div className="absolute inset-0 w-full h-full bg-base-200">
        {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt={profile.firstName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl font-black text-base-content/10">
            {profile.firstName?.[0]}{profile.lastName?.[0]}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
      </div>

      {/* TOP TAGS */}
      <div className="absolute top-8 left-8 z-30 flex flex-col gap-2">
        <span className="badge badge-primary badge-lg font-black uppercase tracking-wider shadow-lg">
          {profile.gender}
        </span>
      </div>

      {/* INFO PANEL */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-30 text-white">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-1 drop-shadow-lg">
          {profile.firstName}{" "}
          <span className="text-primary">{profile.lastName}</span>
        </h2>

        <div className="flex items-center gap-3 text-[11px] font-bold tracking-wider uppercase opacity-70 mb-5">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} /> Remote
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Briefcase size={13} /> {profile.age} Years
          </span>
        </div>

        <p className="text-sm font-medium leading-relaxed text-white/90 line-clamp-2 mb-6 italic border-l-4 border-primary pl-4 drop-shadow">
          "{profile.about || "Building the future, one commit at a time."}"
        </p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mb-8">
          {profile.skills?.slice(0, 3).map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-wide shadow-lg"
            >
              <Terminal size={11} className="text-primary" /> {skill}
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="btn btn-lg btn-outline btn-error rounded-2xl border-2 hover:scale-105 active:scale-95 transition-transform shadow-lg"
            onClick={isTopCard ? handleLeftSwipe : undefined}
            disabled={!isTopCard}
          >
            <X size={32} strokeWidth={2.5} />
          </button>
          <button
            className="btn btn-lg btn-primary rounded-2xl border-2 hover:scale-105 active:scale-95 transition-transform shadow-xl"
            onClick={isTopCard ? handleRightSwipe : undefined}
            disabled={!isTopCard}
          >
            <Heart size={32} fill="currentColor" strokeWidth={0} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
