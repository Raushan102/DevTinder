import React, { useState, useEffect } from "react";
import CinematicLoader from "./Cinematicloader";

const GlassmorphismLayout = ({
  backgroundImage,
  mobileBackgroundImage,
  children,
  loaderDuration = 2800,
  overlayStyle = "editorial",
  showShutterEffect = true,
  className = "",
}) => {
  const [loading, setLoading] = useState(true);
  const [shutterOpen, setShutterOpen] = useState(false);

  // 🛠️ Handle transition with a slight buffer for mobile browser rendering
  const handleLoadComplete = () => {
    setLoading(false);
    if (showShutterEffect) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          setShutterOpen(true);
        }, 50);
      });
    }
  };

  const overlayConfigs = {
    editorial: {
      desktop: (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 mix-blend-overlay" />
        </>
      ),
      mobile: <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />,
    },
  };

  const selectedOverlay = overlayConfigs[overlayStyle] || overlayConfigs.editorial;

  return (
    <div className={`relative min-h-screen w-full bg-neutral-900 ${className}`}>
      {/* 🔍 LOADER */}
      {loading && <CinematicLoader duration={loaderDuration} onComplete={handleLoadComplete} />}

      {!loading && (
        <>
          {/* 🛠️ SHUTTER ANIMATION */}
          {showShutterEffect && (
            <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full bg-black"
                style={{
                  height: "50.2vh",
                  transform: shutterOpen ? "translateY(-100%)" : "translateY(0)",
                  transition: "transform 1.1s cubic-bezier(0.7, 0, 0.2, 1)",
                  willChange: "transform",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-full bg-black"
                style={{
                  height: "50.2vh",
                  transform: shutterOpen ? "translateY(100%)" : "translateY(0)",
                  transition: "transform 1.1s cubic-bezier(0.7, 0, 0.2, 1)",
                  willChange: "transform",
                }}
              />
            </div>
          )}

          {/* 📌 BACKGROUND LAYER */}
          <div
            className="fixed inset-0 w-full h-full z-0 overflow-hidden"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Desktop Background */}
            <div
              className={`absolute inset-0 w-full h-full bg-center bg-cover ${mobileBackgroundImage ? 'hidden sm:block' : 'block'}`}
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundAttachment: 'fixed',
                filter: 'brightness(1.1) contrast(1.1) saturate(1.15)',
              }}
            />

            {/* Mobile Background - Subtle Blur Applied */}
            {mobileBackgroundImage && (
              <div
                className="block sm:hidden absolute inset-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage: `url(${mobileBackgroundImage})`,
                  backgroundAttachment: 'scroll',
                  // Added blur for mobile focus and scale to prevent white edges
                  filter: 'brightness(1.05) contrast(1.1) saturate(1.1) blur(3px)',
                  transform: 'scale(1.1)',
                }}
              />
            )}

            {/* Overlays */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="hidden sm:block">{selectedOverlay.desktop}</div>
              <div className="block sm:hidden">{selectedOverlay.mobile}</div>
            </div>
          </div>

          {/* 📌 CONTENT LAYER */}
          <main className="relative z-10">
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default GlassmorphismLayout;
