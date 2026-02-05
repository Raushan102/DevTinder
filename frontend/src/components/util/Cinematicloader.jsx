import React, { useState, useEffect } from "react";

/**
 * Cinematic Loader Component - Full Screen Horizontal Expansion
 * Thick line that expands from left to right across entire screen
 *
 * @param {number} duration - Duration in milliseconds (default: 2800)
 * @param {function} onComplete - Callback when loading completes
 */
const CinematicLoader = ({ duration = 2800, onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-start bg-black overflow-hidden">
      {/* Full-width horizontal expanding line */}
      <div
        className="bg-white/20 shadow-2xl"
        style={{
          width: "0%",
          height: "1px", // Thick line for better visibility
          transformOrigin: "left",
          animation: `expandLineFullWidth ${duration * 0.7}ms cubic-bezier(0.65, 0, 0.35, 1) forwards`,
        }}
      />

      {/* Animation styles */}
      <style>{`
        @keyframes expandLineFullWidth {
          0% {
            width: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CinematicLoader;
